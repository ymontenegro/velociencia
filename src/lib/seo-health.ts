import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SECTION_IDS, type SectionId } from "@/lib/constants";
import { articleStatus } from "@/lib/publish";
import type { ArticleStatus } from "@/types/article";

/**
 * Server-only SEO / editorial health analysis over the markdown articles.
 *
 * Reads every content/{locale}/{section}/{slug}.md, runs a catalogue of checks
 * (translation pairing, metadata completeness, SERP-truncation lengths, cover
 * image hygiene, thin content) and returns a structured report consumed by the
 * /admin/seo-health panel. Pure filesystem work — fast, no network. The cover
 * reachability (HTTP) audit lives in its own endpoint because it hits the wire.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];

export type Severity = "error" | "warning" | "info";

interface IssueDef {
  severity: Severity;
  label: string;
}

/** Catalogue of checks. Order here is the display order in the breakdown. */
export const ISSUE_DEFS: Record<string, IssueDef> = {
  "broken-translation": { severity: "error", label: "Par de traducción roto (el otro idioma no existe)" },
  "no-author": { severity: "error", label: "Sin autor" },
  "no-excerpt": { severity: "error", label: "Sin meta descripción (excerpt)" },
  "asymmetric-translation": { severity: "warning", label: "Par de traducción asimétrico (no se apuntan mutuamente)" },
  "no-translation": { severity: "warning", label: "Sin par de traducción (translationOf)" },
  "no-cover": { severity: "warning", label: "Sin imagen de portada" },
  "no-tags": { severity: "warning", label: "Sin etiquetas" },
  "no-sources": { severity: "warning", label: "Sin fuentes (E-E-A-T)" },
  "thin-content": { severity: "warning", label: "Contenido breve (<600 palabras)" },
  "duplicate-cover": { severity: "warning", label: "Portada repetida en varios artículos" },
  "long-title": { severity: "info", label: "Título largo: se trunca en Google (>65 car.)" },
  "long-meta": { severity: "info", label: "Meta descripción larga: se trunca (>165 car.)" },
  "short-meta": { severity: "info", label: "Meta descripción muy corta (<70 car.)" },
  "few-tags": { severity: "info", label: "Pocas etiquetas (<3)" },
  "risky-cover-host": { severity: "info", label: "Portada en host frágil (hotlink que puede romperse)" },
};

const SEVERITY_WEIGHT: Record<Severity, number> = { error: 25, warning: 10, info: 3 };

/** Image hosts considered stable enough to hotlink. Anything else is fragile. */
const STABLE_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
  "plus.unsplash.com",
  "upload.wikimedia.org",
]);

const TITLE_MAX = 65;
const META_MAX = 165;
const META_MIN = 70;
const THIN_WORDS = 600;

export interface HealthIssue {
  code: string;
  severity: Severity;
  label: string;
  /** Optional concrete detail, e.g. "88 caracteres" or "usada en 16 artículos". */
  detail?: string;
}

export interface ArticleHealth {
  ref: string;
  locale: Locale;
  section: SectionId;
  slug: string;
  title: string;
  status: ArticleStatus;
  date: string;
  wordCount: number;
  coverImage: string | null;
  coverHost: string | null;
  issues: HealthIssue[];
  /** 0–100; 100 = no issues. */
  score: number;
}

export interface HealthReport {
  generatedAt: number;
  totals: {
    articles: number;
    healthy: number; // no issues at all
    withInfo: number; // only info-level
    withWarnings: number; // has ≥1 warning (and maybe info)
    withErrors: number; // has ≥1 error
    avgScore: number;
  };
  inventory: { published: number; scheduled: number; draft: number; featured: number };
  pairing: { paired: number; broken: number; asymmetric: number; missing: number };
  coverHosts: { host: string; count: number; stable: boolean }[];
  duplicateCovers: { base: string; count: number; refs: string[] }[];
  issueCounts: { code: string; severity: Severity; label: string; count: number }[];
  articles: ArticleHealth[];
}

interface RawArticle {
  ref: string;
  locale: Locale;
  section: SectionId;
  slug: string;
  data: Record<string, unknown>;
  wordCount: number;
  coverImage: string | null;
  coverBase: string | null;
  coverHost: string | null;
}

function coverParts(cover: unknown): { base: string | null; host: string | null } {
  if (typeof cover !== "string" || !cover) return { base: null, host: null };
  try {
    const u = new URL(cover);
    return { base: u.origin + u.pathname, host: u.hostname };
  } catch {
    return { base: cover, host: null };
  }
}

function readAll(): RawArticle[] {
  const out: RawArticle[] = [];
  for (const locale of LOCALES) {
    for (const section of SECTION_IDS) {
      const dir = path.join(CONTENT_DIR, locale, section);
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".md")) continue;
        const slug = file.replace(/\.md$/, "");
        try {
          const raw = fs.readFileSync(path.join(dir, file), "utf-8");
          const { data, content } = matter(raw);
          const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
          const cover = (data as Record<string, unknown>).coverImage;
          const { base, host } = coverParts(cover);
          out.push({
            ref: `${locale}/${section}/${slug}`,
            locale,
            section,
            slug,
            data: data as Record<string, unknown>,
            wordCount,
            coverImage: typeof cover === "string" ? cover : null,
            coverBase: base,
            coverHost: host,
          });
        } catch {
          // skip unreadable files
        }
      }
    }
  }
  return out;
}

export function buildHealthReport(): HealthReport {
  const raw = readAll();

  // Cross-locale slug index + translationOf map for pairing checks.
  const slugIndex: Record<Locale, Set<string>> = { es: new Set(), en: new Set() };
  const translationOf = new Map<string, string | null>(); // `${locale}/${slug}` -> target slug
  for (const a of raw) {
    slugIndex[a.locale].add(a.slug);
    const t = a.data.translationOf;
    translationOf.set(`${a.locale}/${a.slug}`, typeof t === "string" ? t : null);
  }

  // Cover base usage (to flag photos shared beyond the legit ES/EN pair).
  const coverUsage = new Map<string, string[]>();
  for (const a of raw) {
    if (!a.coverBase) continue;
    const arr = coverUsage.get(a.coverBase) ?? [];
    arr.push(a.ref);
    coverUsage.set(a.coverBase, arr);
  }

  const articles: ArticleHealth[] = [];
  const pairing = { paired: 0, broken: 0, asymmetric: 0, missing: 0 };

  for (const a of raw) {
    const issues: HealthIssue[] = [];
    const push = (code: string, detail?: string) => {
      const def = ISSUE_DEFS[code];
      issues.push({ code, severity: def.severity, label: def.label, detail });
    };

    // --- Translation pairing ---
    const other: Locale = a.locale === "es" ? "en" : "es";
    const target = a.data.translationOf;
    if (typeof target !== "string" || !target) {
      push("no-translation");
      pairing.missing++;
    } else if (!slugIndex[other].has(target)) {
      push("broken-translation", `apunta a ${other}/…/${target}`);
      pairing.broken++;
    } else {
      const back = translationOf.get(`${other}/${target}`);
      if (back !== a.slug) {
        push("asymmetric-translation", `${other}/…/${target} no apunta de vuelta`);
        pairing.asymmetric++;
      } else {
        pairing.paired++;
      }
    }

    // --- Metadata completeness ---
    if (!a.data.author || typeof a.data.author !== "string") push("no-author");

    const excerpt = typeof a.data.excerpt === "string" ? a.data.excerpt : "";
    if (!excerpt) push("no-excerpt");
    else if (excerpt.length > META_MAX) push("long-meta", `${excerpt.length} caracteres`);
    else if (excerpt.length < META_MIN) push("short-meta", `${excerpt.length} caracteres`);

    if (!a.coverImage) push("no-cover");

    const tags = Array.isArray(a.data.tags) ? a.data.tags : [];
    if (tags.length === 0) push("no-tags");
    else if (tags.length < 3) push("few-tags", `${tags.length}`);

    const sources = Array.isArray(a.data.sources) ? a.data.sources : [];
    if (sources.length === 0) push("no-sources");

    // --- Lengths (SERP) ---
    const title = typeof a.data.title === "string" ? a.data.title : "";
    if (title.length > TITLE_MAX) push("long-title", `${title.length} caracteres`);

    // --- Content depth ---
    if (a.wordCount < THIN_WORDS) push("thin-content", `${a.wordCount} palabras`);

    // --- Cover hygiene ---
    if (a.coverBase) {
      const uses = coverUsage.get(a.coverBase)?.length ?? 1;
      if (uses > 2) push("duplicate-cover", `usada en ${uses} artículos`);
    }
    if (a.coverHost && !STABLE_IMAGE_HOSTS.has(a.coverHost)) {
      push("risky-cover-host", a.coverHost);
    }

    const penalty = issues.reduce((s, i) => s + SEVERITY_WEIGHT[i.severity], 0);
    const score = Math.max(0, 100 - penalty);

    articles.push({
      ref: a.ref,
      locale: a.locale,
      section: a.section,
      slug: a.slug,
      title,
      status: articleStatus(a.data),
      date: typeof a.data.date === "string" ? a.data.date.slice(0, 10) : "",
      wordCount: a.wordCount,
      coverImage: a.coverImage,
      coverHost: a.coverHost,
      issues,
      score,
    });
  }

  // --- Aggregates ---
  const totals = {
    articles: articles.length,
    healthy: 0,
    withInfo: 0,
    withWarnings: 0,
    withErrors: 0,
    avgScore: 0,
  };
  let scoreSum = 0;
  for (const a of articles) {
    scoreSum += a.score;
    const sev = new Set(a.issues.map((i) => i.severity));
    if (a.issues.length === 0) totals.healthy++;
    else if (sev.has("error")) totals.withErrors++;
    else if (sev.has("warning")) totals.withWarnings++;
    else totals.withInfo++;
  }
  totals.avgScore = articles.length ? Math.round(scoreSum / articles.length) : 100;

  const inventory = { published: 0, scheduled: 0, draft: 0, featured: 0 };
  for (const a of raw) {
    const st = articleStatus(a.data);
    inventory[st]++;
    if (a.data.featured === true) inventory.featured++;
  }

  const coverHostMap = new Map<string, number>();
  for (const a of raw) {
    if (!a.coverHost) continue;
    coverHostMap.set(a.coverHost, (coverHostMap.get(a.coverHost) ?? 0) + 1);
  }
  const coverHosts = [...coverHostMap.entries()]
    .map(([host, count]) => ({ host, count, stable: STABLE_IMAGE_HOSTS.has(host) }))
    .sort((a, b) => b.count - a.count);

  const duplicateCovers = [...coverUsage.entries()]
    .filter(([, refs]) => refs.length > 2)
    .map(([base, refs]) => ({ base, count: refs.length, refs }))
    .sort((a, b) => b.count - a.count);

  const issueCountMap = new Map<string, number>();
  for (const a of articles) {
    for (const i of a.issues) issueCountMap.set(i.code, (issueCountMap.get(i.code) ?? 0) + 1);
  }
  const issueCounts = Object.keys(ISSUE_DEFS)
    .map((code) => ({
      code,
      severity: ISSUE_DEFS[code].severity,
      label: ISSUE_DEFS[code].label,
      count: issueCountMap.get(code) ?? 0,
    }))
    .filter((i) => i.count > 0);

  articles.sort((a, b) => a.score - b.score || a.ref.localeCompare(b.ref));

  return {
    generatedAt: Date.now(),
    totals,
    inventory,
    pairing,
    coverHosts,
    duplicateCovers,
    issueCounts,
    articles,
  };
}

/** Unique cover image URLs across all articles, each with the refs that use it. */
export function listCoverImages(): { url: string; refs: string[] }[] {
  const map = new Map<string, string[]>();
  for (const a of readAll()) {
    if (!a.coverImage) continue;
    const arr = map.get(a.coverImage) ?? [];
    arr.push(a.ref);
    map.set(a.coverImage, arr);
  }
  return [...map.entries()].map(([url, refs]) => ({ url, refs }));
}
