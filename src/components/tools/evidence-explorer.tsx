"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useDictionary } from "@/components/locale-provider";
import {
  getAllSupplements,
  getPresentCategories,
  getCitationCount,
  filterEvidence,
  sortByEditorialRank,
  DEFAULT_EVIDENCE_FILTERS,
  EVIDENCE_LAST_REVIEWED,
  EVIDENCE_LEVEL_ORDER,
  EVIDENCE_DIRECTION_ORDER,
  type SupplementEntry,
  type EvidenceFilterState,
  type EvidenceLevel,
  type EvidenceDirection,
  type EvidenceCategory,
} from "@/lib/datasets/evidence";
import { getToolById, toolHref } from "@/lib/tools";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Local strings not in the shared dictionary                          */
/* ------------------------------------------------------------------ */

const LOCAL_STRINGS = {
  es: {
    ctaGels: "¿Buscas geles? Compara precio por gramo de carbohidrato",
  },
  en: {
    ctaGels: "Looking for gels? Compare cost per gram of carb",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Semantic badge colour palette (fixed, theme-neutral)                */
/* Low-opacity bg + strong same-hue text → readable on dark + light.  */
/* ------------------------------------------------------------------ */

type BadgeStyle = { backgroundColor: string; color: string };

/** `fuerte` = emerald, `moderada` = sky, `limitada` = amber,
 *  `en_contra` = dark-slate bg + red text (its own special tier). */
const LEVEL_BADGE: Record<EvidenceLevel, BadgeStyle> = {
  fuerte:    { backgroundColor: "rgba(16,185,129,0.14)",  color: "#059669" },
  moderada:  { backgroundColor: "rgba(14,165,233,0.14)",  color: "#0284c7" },
  limitada:  { backgroundColor: "rgba(245,158,11,0.14)",  color: "#b45309" },
  en_contra: { backgroundColor: "rgba(71,85,105,0.20)",   color: "#dc2626" },
};

/** `ergogenico` = emerald, `contextual` = amber,
 *  `nulo` = slate/grey, `perjudicial` = rose. */
const DIRECTION_BADGE: Record<EvidenceDirection, BadgeStyle> = {
  ergogenico:  { backgroundColor: "rgba(16,185,129,0.14)",  color: "#059669" },
  contextual:  { backgroundColor: "rgba(245,158,11,0.14)",  color: "#b45309" },
  nulo:        { backgroundColor: "rgba(100,116,139,0.14)", color: "#64748b" },
  perjudicial: { backgroundColor: "rgba(244,63,94,0.14)",   color: "#e11d48" },
};

/** `permitido` = green tint, `monitoreo`/`matiz` = amber tint. */
const WADA_BADGE: Record<string, BadgeStyle> = {
  permitido: { backgroundColor: "rgba(22,163,74,0.13)",    color: "#15803d" },
  monitoreo: { backgroundColor: "rgba(245,158,11,0.14)",   color: "#b45309" },
  matiz:     { backgroundColor: "rgba(245,158,11,0.14)",   color: "#b45309" },
};

/** A/B/C grey chip (letter distinguishes them); `no_verificado` = lighter. */
const AIS_BADGE: Record<string, BadgeStyle> = {
  A:             { backgroundColor: "rgba(100,116,139,0.18)", color: "#475569" },
  B:             { backgroundColor: "rgba(100,116,139,0.18)", color: "#475569" },
  C:             { backgroundColor: "rgba(100,116,139,0.18)", color: "#475569" },
  no_verificado: { backgroundColor: "rgba(100,116,139,0.10)", color: "#94a3b8" },
};

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function EvidenceExplorer({ color }: { color?: string }) {
  const locale = useLocale();
  const dict = useDictionary();
  const e = dict.evidence;
  const t = LOCAL_STRINGS[locale];
  const accent = color ?? "var(--color-nutricion)";

  /** Returns `color` + hex-alpha (e.g. "22") or a `color-mix` fallback. */
  const colorAlpha = (alphaHex: string) => {
    if (color) return color + alphaHex;
    const pct = Math.round((parseInt(alphaHex, 16) / 255) * 100);
    return `color-mix(in srgb, var(--color-nutricion) ${pct}%, transparent)`;
  };

  /* State ----------------------------------------------------------- */
  const [filters, setFilters] = useState<EvidenceFilterState>(DEFAULT_EVIDENCE_FILTERS);
  /** IDs of cards with their full detail expanded. */
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  /** IDs of cards with their citations block expanded. */
  const [expandedCitationIds, setExpandedCitationIds] = useState<Set<string>>(new Set());

  /* Memos ----------------------------------------------------------- */
  const categories = useMemo(() => getPresentCategories(), []);
  const totalCitations = useMemo(() => getCitationCount(), []);

  const gelComparatorHref = useMemo(() => {
    const tool = getToolById("gel-comparator");
    return tool ? toolHref(tool, locale) : null;
  }, [locale]);

  const entries = useMemo<SupplementEntry[]>(() => {
    const filtered = filterEvidence(getAllSupplements(), filters, locale);
    return sortByEditorialRank(filtered);
  }, [filters, locale]);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_EVIDENCE_FILTERS),
    [filters],
  );

  /* Handlers -------------------------------------------------------- */
  function toggleCard(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCitations(id: string) {
    setExpandedCitationIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* Label helpers (cast for safe enum-key indexing) ----------------- */
  const levelLabel = (v: string) => (e.levelLabels as Record<string, string>)[v] ?? v;
  const dirLabel = (v: string) => (e.directionLabels as Record<string, string>)[v] ?? v;
  const catLabel = (v: string) => (e.categoryLabels as Record<string, string>)[v] ?? v;
  const confLabel = (v: string) => (e.confidenceLabels as Record<string, string>)[v] ?? v;
  const popLabel = (v: string) => (e.populationLabels as Record<string, string>)[v] ?? v;
  const sexLabel = (v: string) => (e.sexLabels as Record<string, string>)[v] ?? v;
  const wadaLabel = (v: string) => (e.wadaLabels as Record<string, string>)[v] ?? v;
  const aisLabel = (v: string) => (e.aisLabels as Record<string, string>)[v] ?? v;
  const levelDescLabel = (v: string) => (e.levelDesc as Record<string, string>)[v] ?? v;
  const dirDescLabel = (v: string) => (e.directionDesc as Record<string, string>)[v] ?? v;

  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-6">

      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 space-y-4">

        {/* Search */}
        <input
          type="search"
          placeholder={e.searchPlaceholder}
          value={filters.query}
          onChange={(ev) => setFilters((f) => ({ ...f, query: ev.target.value }))}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1"
          style={{ accentColor: accent }}
          aria-label={e.searchPlaceholder}
        />

        {/* Category select */}
        <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
          {e.filterCategory}
          <select
            value={filters.category}
            onChange={(ev) =>
              setFilters((f) => ({
                ...f,
                category: ev.target.value as EvidenceCategory | "",
              }))
            }
            className="min-w-[12rem] self-start rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            style={{ accentColor: accent }}
          >
            <option value="">{e.filterAll}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {catLabel(cat)}
              </option>
            ))}
          </select>
        </label>

        {/* Evidence-level chips */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            {e.filterLevel}
          </p>
          <div className="flex flex-wrap gap-2">
            {EVIDENCE_LEVEL_ORDER.map((lvl) => (
              <FilterToggle
                key={lvl}
                label={levelLabel(lvl)}
                active={filters.level === lvl}
                accent={accent}
                onClick={() =>
                  setFilters((f) => ({ ...f, level: f.level === lvl ? "" : lvl }))
                }
              />
            ))}
          </div>
        </div>

        {/* Direction chips */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            {e.filterDirection}
          </p>
          <div className="flex flex-wrap gap-2">
            {EVIDENCE_DIRECTION_ORDER.map((dir) => (
              <FilterToggle
                key={dir}
                label={dirLabel(dir)}
                active={filters.direction === dir}
                accent={accent}
                onClick={() =>
                  setFilters((f) => ({ ...f, direction: f.direction === dir ? "" : dir }))
                }
              />
            ))}
          </div>
        </div>

        {/* WADA permitted toggle + clear */}
        <div className="flex flex-wrap items-center gap-3">
          <FilterToggle
            label={e.filterPermitted}
            active={filters.permittedOnly}
            accent={accent}
            onClick={() => setFilters((f) => ({ ...f, permittedOnly: !f.permittedOnly }))}
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_EVIDENCE_FILTERS)}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            >
              {e.filterReset}
            </button>
          )}
        </div>
      </div>

      {/* ── Legend (dual axis, collapsible) ──────────────────────── */}
      <details className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <summary
          className="flex cursor-pointer select-none list-none items-center justify-between px-4 py-3 text-sm font-semibold"
          style={{ color: accent }}
        >
          <span>{e.legendTitle}</span>
          <span
            aria-hidden="true"
            className="text-[var(--color-text-secondary)] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>

        <div className="border-t border-[var(--color-border)] px-4 pb-4 pt-3 space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Evidence-level axis */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                {e.legendAxisLevel}
              </p>
              <ul className="space-y-2">
                {EVIDENCE_LEVEL_ORDER.map((lvl) => (
                  <li key={lvl} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={LEVEL_BADGE[lvl]}
                    >
                      {levelLabel(lvl)}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {levelDescLabel(lvl)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direction axis */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                {e.legendAxisDirection}
              </p>
              <ul className="space-y-2">
                {EVIDENCE_DIRECTION_ORDER.map((dir) => (
                  <li key={dir} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={DIRECTION_BADGE[dir]}
                    >
                      {dirLabel(dir)}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {dirDescLabel(dir)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cross-axis note */}
          <p className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
            {e.legendNote}
          </p>
        </div>
      </details>

      {/* ── Summary strip ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[var(--color-text)]">
            {e.supplementCount.replace("{n}", String(entries.length))}
          </span>
          <span aria-hidden="true" className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-secondary)]">
            {e.citationCount.replace("{n}", String(totalCitations))}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: colorAlpha("22"), color: accent }}
        >
          {e.lastReviewed} {EVIDENCE_LAST_REVIEWED}
        </span>
      </div>

      {/* ── Card list ────────────────────────────────────────────── */}
      {entries.length === 0 ? (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
          <p className="text-[var(--color-text-muted)]">{e.noResults}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => {
            const isExpanded = expandedIds.has(entry.id);
            const isCitationsExpanded = expandedCitationIds.has(entry.id);

            return (
              <article
                key={entry.id}
                className="rounded-lg border bg-[var(--color-bg-card)] overflow-hidden transition-colors"
                style={{
                  borderColor: isExpanded ? colorAlpha("55") : "var(--color-border)",
                }}
              >
                {/* ── Collapsed header (always visible) ─────────── */}
                <div className="p-4">

                  {/* Name + category */}
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="text-base font-semibold text-[var(--color-text)]">
                      {entry.name[locale]}
                    </h3>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {catLabel(entry.category)}
                    </span>
                  </div>

                  {/* Badge row — two visual groups: evidence (level · direction ·
                      confidence) and regulatory (WADA · AIS). The larger gap-x
                      between groups replaces the loose "·" separator and keeps
                      the row legible even at five chips. */}
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    {/* Evidence group */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={LEVEL_BADGE[entry.evidence_level]}
                      >
                        {levelLabel(entry.evidence_level)}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={DIRECTION_BADGE[entry.evidence_direction]}
                      >
                        {dirLabel(entry.evidence_direction)}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-secondary)]"
                        style={{ backgroundColor: "rgba(100,116,139,0.10)" }}
                      >
                        {e.confidencePrefix}: {confLabel(entry.confidence)}
                      </span>
                    </div>
                    {/* Regulatory group (secondary) */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={WADA_BADGE[entry.wada_status] ?? WADA_BADGE.permitido}
                      >
                        {e.wadaPrefix}: {wadaLabel(entry.wada_status)}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={AIS_BADGE[entry.ais_group] ?? AIS_BADGE.no_verificado}
                      >
                        {e.aisPrefix} {aisLabel(entry.ais_group)}
                      </span>
                    </div>
                  </div>

                  {/* Performance effect — clamped when collapsed */}
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-[var(--color-text-secondary)]",
                      !isExpanded && "line-clamp-3",
                    )}
                  >
                    {entry.performance_effect[locale]}
                  </p>

                  {/* Expand/collapse button */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? e.hideDetail : e.showDetail} — ${entry.name[locale]}`}
                    onClick={() => toggleCard(entry.id)}
                    className="mt-3 text-xs font-medium transition-colors hover:underline"
                    style={{ color: accent }}
                  >
                    {isExpanded ? e.hideDetail : e.showDetail}
                  </button>
                </div>

                {/* ── Expanded detail section ────────────────────── */}
                {isExpanded && (
                  <div
                    className="border-t px-4 py-4 space-y-4"
                    style={{ borderTopColor: colorAlpha("33") }}
                  >
                    {/* Effect size + Mechanism */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <DetailField label={e.fieldEffectSize}>
                        {entry.effect_size[locale]}
                      </DetailField>
                      <DetailField label={e.fieldMechanism}>
                        {entry.mechanism[locale]}
                      </DetailField>
                    </div>

                    {/* Dosage + Timing */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <DetailField label={e.fieldDosage}>
                        {entry.dosage[locale]}
                      </DetailField>
                      <DetailField label={e.fieldTiming}>
                        {entry.timing[locale]}
                      </DetailField>
                    </div>

                    {/* Who benefits */}
                    <DetailField label={e.fieldWhoBenefits}>
                      {entry.who_benefits[locale]}
                    </DetailField>

                    {/* Population + Sex */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <DetailField label={e.fieldPopulation}>
                        {popLabel(entry.population_match)}
                      </DetailField>
                      <DetailField label={e.fieldSex}>
                        {sexLabel(entry.sex_evidence)}
                      </DetailField>
                    </div>

                    {/* Caveats + Side effects */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <DetailField label={e.fieldCaveats}>
                        {entry.caveats[locale]}
                      </DetailField>
                      <DetailField label={e.fieldSideEffects}>
                        {entry.side_effects[locale]}
                      </DetailField>
                    </div>

                    {/* Regulatory status detail row */}
                    <div
                      className="flex flex-wrap gap-x-4 gap-y-1 rounded-md border border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-secondary)]"
                      style={{ backgroundColor: colorAlpha("0A") }}
                    >
                      <span>
                        {e.wadaPrefix}:{" "}
                        <strong>{wadaLabel(entry.wada_status)}</strong>{" "}
                        <span
                          className={
                            entry.wada_verified
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-[var(--color-text-muted)]"
                          }
                        >
                          ({entry.wada_verified ? e.verified : e.notVerified})
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
                        ·
                      </span>
                      <span>
                        {e.aisPrefix} {aisLabel(entry.ais_group)}{" "}
                        <span
                          className={
                            entry.ais_verified
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-[var(--color-text-muted)]"
                          }
                        >
                          ({entry.ais_verified ? e.verified : e.notVerified})
                        </span>
                      </span>
                    </div>

                    {/* ── Citations block (collapsible) ────────────── */}
                    {entry.citations.length > 0 && (
                      <div className="border-t border-[var(--color-border)] pt-3 space-y-3">
                        <button
                          type="button"
                          aria-expanded={isCitationsExpanded}
                          onClick={() => toggleCitations(entry.id)}
                          className="text-xs font-medium transition-colors hover:underline"
                          style={{ color: accent }}
                        >
                          {isCitationsExpanded
                            ? e.hideCitations
                            : e.showCitations.replace(
                                "{n}",
                                String(entry.citations.length),
                              )}
                        </button>

                        {isCitationsExpanded && (
                          <ul className="space-y-2">
                            {entry.citations.map((cit, idx) => {
                              const pmidUrl = cit.pmid
                                ? `https://pubmed.ncbi.nlm.nih.gov/${cit.pmid}/`
                                : null;
                              const doiUrl = cit.doi
                                ? `https://doi.org/${cit.doi}`
                                : null;

                              return (
                                <li
                                  key={idx}
                                  className="rounded-md border border-[var(--color-border-light)] bg-[var(--color-bg)] p-3 text-xs space-y-1.5"
                                >
                                  {/* Author + year */}
                                  <p className="font-semibold tabular-nums text-[var(--color-text)]">
                                    {cit.first_author} {cit.year}
                                  </p>
                                  {/* Title linked to source */}
                                  <p>
                                    <a
                                      href={cit.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-medium hover:underline"
                                      style={{ color: accent }}
                                    >
                                      {cit.title}
                                    </a>
                                  </p>
                                  {/* Journal · study type */}
                                  <p className="text-[var(--color-text-muted)]">
                                    {cit.journal} · {cit.study_type}
                                  </p>
                                  {/* Key finding */}
                                  <p className="italic text-[var(--color-text-secondary)]">
                                    {cit.key_finding[locale]}
                                  </p>
                                  {/* PMID or DOI */}
                                  {(pmidUrl ?? doiUrl) && (
                                    <p>
                                      {pmidUrl ? (
                                        <a
                                          href={pmidUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="underline decoration-dotted text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                                        >
                                          PMID: {cit.pmid}
                                        </a>
                                      ) : (
                                        <a
                                          href={doiUrl!}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="underline decoration-dotted text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                                        >
                                          DOI: {cit.doi}
                                        </a>
                                      )}
                                    </p>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ── Cross-link to gel comparator ─────────────────────────── */}
      {gelComparatorHref && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
          <Link
            href={gelComparatorHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: accent }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaGels}
          </Link>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

/** Chip-style toggle button — reuses the exact pattern from gel-comparator. */
function FilterToggle({
  label,
  active,
  accent,
  onClick,
}: {
  label: string;
  active: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "text-white"
          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]",
      )}
      style={
        active ? { backgroundColor: accent, borderColor: accent } : undefined
      }
    >
      {label}
    </button>
  );
}

/** Label + prose field for the expanded card detail. */
function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-text)]">{children}</p>
    </div>
  );
}
