import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SECTION_IDS, type SectionId } from "@/lib/constants";
import type { ArticleFrontmatter, ArticleStatus } from "@/types/article";
import { articleStatus } from "@/lib/publish";

/**
 * Server-only data layer for managing the markdown articles that ARE the public
 * site (content/{locale}/{section}/{slug}.md). The DB `articles` table is legacy
 * and out of sync; the admin works directly on the markdown source of truth.
 *
 * Used by the /api/admin/content routes. Never import from a client component
 * (it touches the filesystem).
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export const LOCALES = ["es", "en"] as const;
export type ContentLocale = (typeof LOCALES)[number];

export function isLocale(value: string): value is ContentLocale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isSection(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

// Slugs are kebab-case filenames; reject anything that could escape the dir.
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
export function isSlug(value: string): boolean {
  return SLUG_RE.test(value);
}

/** Stable identifier used in URLs and the calendar: `locale/section/slug`. */
export function refOf(locale: ContentLocale, section: SectionId, slug: string): string {
  return `${locale}/${section}/${slug}`;
}

export interface ArticleRef {
  locale: ContentLocale;
  section: SectionId;
  slug: string;
}

/** Parse + validate a `locale/section/slug` ref (or its 3 parts). */
export function resolveRef(parts: string[]): ArticleRef | null {
  if (parts.length !== 3) return null;
  const [locale, section, slug] = parts;
  if (!isLocale(locale) || !isSection(section) || !isSlug(slug)) return null;
  return { locale, section, slug };
}

function filePathFor(ref: ArticleRef): string {
  return path.join(CONTENT_DIR, ref.locale, ref.section, `${ref.slug}.md`);
}

export interface AdminArticle {
  ref: string;
  locale: ContentLocale;
  section: SectionId;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  author: string;
  /** Publication date as `YYYY-MM-DD` (also the scheduling gate). */
  date: string;
  tags: string[];
  coverImage?: string;
  featured: boolean;
  draft: boolean;
  affiliate: boolean;
  translationOf?: string;
  status: ArticleStatus;
  wordCount: number;
  /** File mtime in ms (last edit). */
  updatedAt: number;
}

export interface AdminArticleDetail extends AdminArticle {
  /** Raw markdown body (without frontmatter). */
  content: string;
  /** Full parsed frontmatter (includes fields not surfaced above, e.g. sources). */
  frontmatter: Record<string, unknown>;
}

function toDateStr(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return "";
}

function buildAdminArticle(
  ref: ArticleRef,
  data: Record<string, unknown>,
  content: string,
  mtimeMs: number
): AdminArticle {
  const fm = data as ArticleFrontmatter & Record<string, unknown>;
  return {
    ref: refOf(ref.locale, ref.section, ref.slug),
    locale: ref.locale,
    section: ref.section,
    slug: ref.slug,
    title: typeof fm.title === "string" ? fm.title : ref.slug,
    subtitle: typeof fm.subtitle === "string" ? fm.subtitle : undefined,
    excerpt: typeof fm.excerpt === "string" ? fm.excerpt : undefined,
    author: typeof fm.author === "string" ? fm.author : "",
    date: toDateStr(fm.date),
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
    coverImage: typeof fm.coverImage === "string" ? fm.coverImage : undefined,
    featured: fm.featured === true,
    draft: fm.draft === true,
    affiliate: fm.affiliate === true,
    translationOf: typeof fm.translationOf === "string" ? fm.translationOf : undefined,
    status: articleStatus(fm),
    wordCount: content.trim() ? content.trim().split(/\s+/).length : 0,
    updatedAt: Math.round(mtimeMs),
  };
}

/** List every markdown article across both locales and all sections. */
export function listAdminArticles(): AdminArticle[] {
  const out: AdminArticle[] = [];

  for (const locale of LOCALES) {
    for (const section of SECTION_IDS) {
      const dir = path.join(CONTENT_DIR, locale, section);
      if (!fs.existsSync(dir)) continue;

      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".md")) continue;
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(dir, file);
        try {
          const raw = fs.readFileSync(filePath, "utf-8");
          const { data, content } = matter(raw);
          const mtime = fs.statSync(filePath).mtimeMs;
          out.push(buildAdminArticle({ locale, section, slug }, data, content, mtime));
        } catch {
          // Skip unreadable/corrupt files rather than failing the whole list.
        }
      }
    }
  }

  // Newest publication date first; drafts (no/empty date) sink to the bottom.
  out.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return out;
}

/** Read one article with its full frontmatter + body, or null if missing. */
export function getAdminArticle(ref: ArticleRef): AdminArticleDetail | null {
  const filePath = filePathFor(ref);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const mtime = fs.statSync(filePath).mtimeMs;
  const base = buildAdminArticle(ref, data, content, mtime);
  return { ...base, content, frontmatter: data as Record<string, unknown> };
}

/**
 * Patch an article's frontmatter and/or body, rewriting the markdown file.
 *
 * - `frontmatter`: shallow-merged over existing. A key set to `null` is deleted
 *   (e.g. to clear `coverImage`). Existing keys not mentioned are preserved.
 * - `content`: replaces the body when provided.
 *
 * Returns the refreshed article, or null if it doesn't exist.
 */
export function updateAdminArticle(
  ref: ArticleRef,
  patch: { frontmatter?: Record<string, unknown>; content?: string }
): AdminArticleDetail | null {
  const filePath = filePathFor(ref);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const merged: Record<string, unknown> = { ...(data as Record<string, unknown>) };
  if (patch.frontmatter) {
    for (const [key, value] of Object.entries(patch.frontmatter)) {
      if (value === null || value === undefined) {
        delete merged[key];
      } else {
        merged[key] = value;
      }
    }
  }

  const newContent = patch.content !== undefined ? patch.content : content;
  const serialized = matter.stringify(newContent, merged);
  fs.writeFileSync(filePath, serialized, "utf-8");

  return getAdminArticle(ref);
}

/** Permanently delete an article's markdown file. Returns false if missing. */
export function deleteAdminArticle(ref: ArticleRef): boolean {
  const filePath = filePathFor(ref);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}
