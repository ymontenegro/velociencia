"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS, type SectionId } from "@/lib/constants";
import { STATUS_META } from "@/lib/publish";
import type { ArticleStatus } from "@/types/article";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Severity = "error" | "warning" | "info";

const SEV_META: Record<Severity, { label: string; color: string }> = {
  error: { label: "Errores", color: "#DC2626" },
  warning: { label: "Advertencias", color: "#D97706" },
  info: { label: "Oportunidades", color: "#2563EB" },
};

// Short chip labels (the report carries the full descriptive label too).
const SHORT_LABEL: Record<string, string> = {
  "broken-translation": "Par roto",
  "asymmetric-translation": "Par asimétrico",
  "no-translation": "Sin par",
  "no-author": "Sin autor",
  "no-excerpt": "Sin meta",
  "no-cover": "Sin portada",
  "no-tags": "Sin tags",
  "few-tags": "Pocas tags",
  "no-sources": "Sin fuentes",
  "thin-content": "Contenido breve",
  "long-title": "Título largo",
  "long-meta": "Meta larga",
  "short-meta": "Meta corta",
  "duplicate-cover": "Portada repetida",
  "risky-cover-host": "Host frágil",
};

type Issue = { code: string; severity: Severity; label: string; detail?: string };
type ArticleHealth = {
  ref: string;
  locale: "es" | "en";
  section: SectionId;
  slug: string;
  title: string;
  status: ArticleStatus;
  date: string;
  wordCount: number;
  coverImage: string | null;
  coverHost: string | null;
  issues: Issue[];
  score: number;
};
type Report = {
  generatedAt: number;
  totals: { articles: number; healthy: number; withInfo: number; withWarnings: number; withErrors: number; avgScore: number };
  inventory: { published: number; scheduled: number; draft: number; featured: number };
  pairing: { paired: number; broken: number; asymmetric: number; missing: number };
  coverHosts: { host: string; count: number; stable: boolean }[];
  duplicateCovers: { base: string; count: number; refs: string[] }[];
  issueCounts: { code: string; severity: Severity; label: string; count: number }[];
  articles: ArticleHealth[];
};
type CoverAudit = {
  checkedAt: number;
  total: number;
  ok: number;
  broken: { url: string; refs: string[]; status: number | null }[];
  unknown: { url: string; refs: string[]; status: number | null }[];
};

const REPORT_URL = "/api/admin/seo-health";
const COVERS_URL = "/api/admin/seo-health/covers";

function liveUrl(a: { locale: "es" | "en"; section: SectionId; slug: string }): string {
  const base = a.locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  return `${base}/${SECTIONS_I18N[a.locale][a.section].slug}/${a.slug}`;
}

function scoreColor(score: number): string {
  if (score >= 90) return "#059669";
  if (score >= 70) return "#D97706";
  return "#DC2626";
}

export function SeoHealthPanel() {
  const { data, isLoading, error } = useSWR<{ data: Report }>(REPORT_URL, fetcher);
  const report = data?.data;

  const [locale, setLocale] = useState<"all" | "es" | "en">("all");
  const [section, setSection] = useState<"all" | SectionId>("all");
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [code, setCode] = useState<string>("");
  const [q, setQ] = useState("");
  const [onlyIssues, setOnlyIssues] = useState(true);

  // Cover reachability audit (on demand).
  const [covers, setCovers] = useState<CoverAudit | null>(null);
  const [coversLoading, setCoversLoading] = useState(false);
  const [coversError, setCoversError] = useState<string | null>(null);

  async function runCoverAudit() {
    setCoversLoading(true);
    setCoversError(null);
    try {
      const res = await fetch(COVERS_URL);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Error");
      setCovers(json.data as CoverAudit);
    } catch (e) {
      setCoversError(e instanceof Error ? e.message : "Error al revisar portadas");
    } finally {
      setCoversLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (!report) return [];
    const needle = q.trim().toLowerCase();
    return report.articles.filter((a) => {
      if (onlyIssues && a.issues.length === 0) return false;
      if (locale !== "all" && a.locale !== locale) return false;
      if (section !== "all" && a.section !== section) return false;
      if (severity !== "all" && !a.issues.some((i) => i.severity === severity)) return false;
      if (code && !a.issues.some((i) => i.code === code)) return false;
      if (needle && !`${a.title} ${a.slug}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [report, onlyIssues, locale, section, severity, code, q]);

  const riskyHosts = report?.coverHosts.filter((h) => !h.stable) ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Salud SEO / editorial</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Revisión automática de los artículos: pares de traducción, metadatos, longitudes para
            Google, portadas y profundidad de contenido.
          </p>
        </div>
        <button
          onClick={() => mutate(REPORT_URL)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1D23] text-white text-sm font-medium hover:bg-[#13151A] transition-colors"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          Error al cargar el reporte.
        </div>
      )}
      {isLoading && (
        <div className="p-8 text-center text-sm text-[var(--color-text-muted)]">Analizando artículos…</div>
      )}

      {report && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <SummaryCard label="Artículos" value={report.totals.articles} />
            <SummaryCard label="Sanos" value={report.totals.healthy} color="#059669" />
            <SummaryCard label="Con advertencias" value={report.totals.withWarnings} color="#D97706" />
            <SummaryCard label="Con errores" value={report.totals.withErrors} color="#DC2626" />
            <SummaryCard label="Score promedio" value={report.totals.avgScore} color={scoreColor(report.totals.avgScore)} suffix="/100" />
          </div>

          {/* Inventory + pairing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <MiniPanel title="Inventario">
              <Stat label="Publicados" value={report.inventory.published} />
              <Stat label="Programados" value={report.inventory.scheduled} color={STATUS_META.scheduled.color} />
              <Stat label="Borradores" value={report.inventory.draft} color={STATUS_META.draft.color} />
              <Stat label="Destacados" value={report.inventory.featured} />
            </MiniPanel>
            <MiniPanel title="Pares de traducción (ES ↔ EN)">
              <Stat label="Correctos" value={report.pairing.paired} color="#059669" />
              <Stat label="Rotos" value={report.pairing.broken} color="#DC2626" />
              <Stat label="Asimétricos" value={report.pairing.asymmetric} color="#D97706" />
              <Stat label="Sin par" value={report.pairing.missing} color="#D97706" />
            </MiniPanel>
          </div>

          {/* Issue breakdown */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[var(--color-text)]">Problemas detectados</h2>
              {code && (
                <button onClick={() => setCode("")} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline">
                  Quitar filtro
                </button>
              )}
            </div>
            {report.issueCounts.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">Sin problemas. 🎉</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {report.issueCounts.map((ic) => (
                  <button
                    key={ic.code}
                    onClick={() => setCode(code === ic.code ? "" : ic.code)}
                    title={ic.label}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      code === ic.code ? "bg-[var(--color-border-light)] border-[var(--color-text-muted)]" : "border-[var(--color-border)] hover:bg-[var(--color-border-light)]/50"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SEV_META[ic.severity].color }} />
                    <span className="text-[var(--color-text)]">{SHORT_LABEL[ic.code] ?? ic.code}</span>
                    <span className="font-mono font-semibold text-[var(--color-text-muted)]">{ic.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cover audit */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] p-5 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-semibold text-[var(--color-text)]">Portadas</h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Las imágenes son hotlinks externos: pueden romperse (Unsplash borra fotos, algunos sitios bloquean).
                </p>
              </div>
              <button
                onClick={runCoverAudit}
                disabled={coversLoading}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border-light)] transition-colors disabled:opacity-50"
              >
                {coversLoading ? "Revisando… (HTTP)" : "Revisar portadas (HTTP)"}
              </button>
            </div>

            {/* Static signals from the report */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                  Hosts frágiles ({riskyHosts.reduce((s, h) => s + h.count, 0)})
                </p>
                {riskyHosts.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-muted)]">Todas en CDNs estables.</p>
                ) : (
                  <ul className="space-y-1">
                    {riskyHosts.map((h) => (
                      <li key={h.host} className="text-xs text-[var(--color-text-secondary)] flex justify-between">
                        <span className="font-mono">{h.host}</span>
                        <span className="font-semibold">{h.count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5">
                  Portadas repetidas ({report.duplicateCovers.length})
                </p>
                {report.duplicateCovers.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-muted)]">Sin repeticiones más allá del par ES/EN.</p>
                ) : (
                  <ul className="space-y-1 max-h-32 overflow-auto pr-1">
                    {report.duplicateCovers.map((d) => (
                      <li key={d.base} className="text-xs text-[var(--color-text-secondary)] flex justify-between gap-2">
                        <a href={d.base} target="_blank" rel="noopener noreferrer" className="font-mono truncate hover:underline">
                          {d.base.replace(/^https?:\/\//, "")}
                        </a>
                        <span className="font-semibold whitespace-nowrap">{d.count}×</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {coversError && <p className="text-xs text-red-600 mt-2">{coversError}</p>}
            {covers && (
              <div className="mt-4 border-t border-[var(--color-border-light)] pt-4">
                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                  Revisadas {covers.total} · <span className="text-emerald-700 font-medium">{covers.ok} OK</span>
                  {covers.broken.length > 0 && <> · <span className="text-red-700 font-medium">{covers.broken.length} rotas</span></>}
                  {covers.unknown.length > 0 && <> · <span className="text-[var(--color-text-muted)]">{covers.unknown.length} sin respuesta</span></>}
                </p>
                {covers.broken.length === 0 && covers.unknown.length === 0 ? (
                  <p className="text-sm text-emerald-700">Todas las portadas responden. ✅</p>
                ) : (
                  <CoverIssueList title="Rotas (4xx/5xx)" color="#DC2626" items={covers.broken} />
                )}
                {covers.unknown.length > 0 && (
                  <CoverIssueList title="Sin respuesta (timeout/DNS)" color="#64748B" items={covers.unknown} />
                )}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar título o slug…"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
            <Select value={locale} onChange={(v) => setLocale(v as typeof locale)} options={[["all", "Ambos idiomas"], ["es", "ES"], ["en", "EN"]]} />
            <Select
              value={section}
              onChange={(v) => setSection(v as typeof section)}
              options={[["all", "Todas las secciones"], ...SECTION_IDS.map((s) => [s, SECTIONS[s].name] as [string, string])]}
            />
            <Select value={severity} onChange={(v) => setSeverity(v as typeof severity)} options={[["all", "Toda severidad"], ["error", "Errores"], ["warning", "Advertencias"], ["info", "Oportunidades"]]} />
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] ml-1">
              <input type="checkbox" checked={onlyIssues} onChange={(e) => setOnlyIssues(e.target.checked)} />
              Solo con problemas
            </label>
            <span className="text-xs text-[var(--color-text-muted)] ml-auto">{filtered.length} artículos</span>
          </div>

          {/* Articles table */}
          <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--color-text-muted)]">No hay artículos que coincidan.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-light)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Artículo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider w-16">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Problemas</th>
                    <th className="px-4 py-3 w-px" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-light)]">
                  {filtered.map((a) => (
                    <tr key={a.ref} className="hover:bg-[var(--color-border-light)]/40 transition-colors align-top">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full flex-none" style={{ backgroundColor: SECTIONS[a.section].color }} />
                          <Link href={`/admin/articles/edit/${a.ref}`} className="text-sm font-medium text-[var(--color-text)] hover:underline line-clamp-1">
                            {a.title || a.slug}
                          </Link>
                          <span className="text-[9px] font-mono font-semibold uppercase px-1 py-0.5 rounded bg-[var(--color-border-light)] text-[var(--color-text-muted)]">{a.locale}</span>
                          <span className="text-[9px] font-mono uppercase px-1 py-0.5 rounded" style={{ color: STATUS_META[a.status].color, backgroundColor: STATUS_META[a.status].color + "1A" }}>
                            {STATUS_META[a.status].label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 font-mono truncate">{a.ref} · {a.wordCount} pal.</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-bold tabular-nums" style={{ color: scoreColor(a.score) }}>{a.score}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {a.issues.map((i) => (
                            <span
                              key={i.code}
                              title={`${i.label}${i.detail ? ` — ${i.detail}` : ""}`}
                              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
                              style={{ color: SEV_META[i.severity].color, backgroundColor: SEV_META[i.severity].color + "14" }}
                            >
                              {SHORT_LABEL[i.code] ?? i.code}
                              {i.detail && <span className="opacity-70">· {i.detail}</span>}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Link href={`/admin/articles/edit/${a.ref}`} className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">Editar</Link>
                        <span className="text-[var(--color-border)] mx-1.5">·</span>
                        <a href={liveUrl(a)} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">Ver</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SummaryCard({ label, value, color, suffix }: { label: string; value: number; color?: string; suffix?: string }) {
  return (
    <div className="bg-white rounded-lg border border-[var(--color-border)] p-4">
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: color ?? "var(--color-text)" }}>
        {value}
        {suffix && <span className="text-sm font-medium text-[var(--color-text-muted)]">{suffix}</span>}
      </p>
    </div>
  );
}

function MiniPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
      <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3">{title}</h2>
      <div className="grid grid-cols-4 gap-3">{children}</div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <p className="text-xl font-bold tabular-nums" style={{ color: color ?? "var(--color-text)" }}>{value}</p>
      <p className="text-[11px] text-[var(--color-text-muted)] leading-tight mt-0.5">{label}</p>
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>{l}</option>
      ))}
    </select>
  );
}

function CoverIssueList({ title, color, items }: { title: string; color: string; items: { url: string; refs: string[]; status: number | null }[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold mb-1.5" style={{ color }}>{title} ({items.length})</p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.url} className="text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold" style={{ color }}>{it.status ?? "—"}</span>
              <a href={it.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[var(--color-text-secondary)] truncate hover:underline">
                {it.url.replace(/^https?:\/\//, "").slice(0, 70)}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5 pl-8">
              {it.refs.map((ref) => (
                <Link key={ref} href={`/admin/articles/edit/${ref}`} className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline font-mono">
                  {ref}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
