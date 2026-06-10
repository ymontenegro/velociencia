"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocale, useDictionary } from "@/components/locale-provider";
import {
  getAllClimbs,
  filterClimbs,
  sortClimbs,
  fietsIndex,
  difficultyBand,
  getPresentContinents,
  getPresentCountries,
  getDemProfiledCount,
  DEFAULT_CLIMB_FILTERS,
  DIFFICULTY_BAND_ORDER,
  CLIMBS_LAST_REVIEWED,
  type ClimbEntry,
  type ClimbFilterState,
  type ClimbSortKey,
  type Continent,
  type DifficultyBand,
} from "@/lib/datasets/climbs";
import { getToolById, toolHref } from "@/lib/tools";
import {
  ToolPanel,
  FilterChip,
  SelectField,
  MetaBadge,
  NumberField,
  ReadoutPanel,
  accentAlpha,
  accentSurface,
  useAccentColor,
} from "@/components/tools/ui";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Local strings — eyebrow lives here, not in i18n JSON               */
/* ------------------------------------------------------------------ */

const LOCAL_STRINGS = {
  es: { eyebrow: "Entrenamiento · Explorador" },
  en: { eyebrow: "Training · Explorer" },
} as const;

/* ------------------------------------------------------------------ */
/* Difficulty badge palette (fixed semantic colours — DO NOT CHANGE)  */
/* Low-opacity bg + strong same-hue text → readable on dark + light.  */
/* ------------------------------------------------------------------ */

type BadgeStyle = { backgroundColor: string; color: string };

const DIFFICULTY_BADGE: Record<DifficultyBand, BadgeStyle> = {
  exigente: { backgroundColor: "rgba(14,165,233,0.14)",  color: "#0284c7" },
  muy_dura: { backgroundColor: "rgba(245,158,11,0.14)",  color: "#b45309" },
  extrema:  { backgroundColor: "rgba(239,68,68,0.14)",   color: "#dc2626" },
  mitica:   { backgroundColor: "rgba(124,58,237,0.16)",  color: "#7c3aed" },
};

/** Per-km gradient strip colour bands (mirrors road-sign colour coding). */
function gradientColor(g: number): string {
  if (g < 4)  return "#22c55e";
  if (g < 7)  return "#eab308";
  if (g < 10) return "#f97316";
  if (g < 13) return "#ef4444";
  return "#7f1d1d";
}

/** ISO 3166-1 alpha-2 → regional-indicator flag emoji. */
function flagEmoji(cc: string): string {
  if (!cc || cc.length !== 2) return "";
  return cc
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

const SORT_KEYS: ClimbSortKey[] = [
  "difficulty",
  "length",
  "gain",
  "avg_gradient",
  "max_gradient",
  "summit",
];

/* ------------------------------------------------------------------ */

export default function ClimbsDatabase({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: ToolComponentProps) {
  const locale = useLocale();
  const dict = useDictionary();
  const t = dict.climbs;
  const s = LOCAL_STRINGS[locale as keyof typeof LOCAL_STRINGS];

  const [filters, setFilters] = useState<ClimbFilterState>(DEFAULT_CLIMB_FILTERS);
  const [sortKey, setSortKey] = useState<ClimbSortKey>("difficulty");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const continents = useMemo(() => getPresentContinents(), []);
  const countries  = useMemo(() => getPresentCountries(), []);
  const demCount   = useMemo(() => getDemProfiledCount(), []);

  const racesHref = useMemo(() => {
    const tool = getToolById("race-calendar");
    return tool ? toolHref(tool, locale) : null;
  }, [locale]);

  const entries = useMemo<ClimbEntry[]>(() => {
    const filtered = filterClimbs(getAllClimbs(), filters, locale);
    return sortClimbs(filtered, sortKey, sortDir);
  }, [filters, sortKey, sortDir, locale]);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_CLIMB_FILTERS),
    [filters],
  );

  function toggleCard(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* Label helpers --------------------------------------------------- */
  const continentLabel  = (v: string) => (t.continentLabels  as Record<string, string>)[v] ?? v;
  const difficultyLabel = (v: string) => (t.difficultyLabels as Record<string, string>)[v] ?? v;
  const difficultyDescLabel = (v: string) => (t.difficultyDesc as Record<string, string>)[v] ?? v;
  const surfaceLabel    = (v: string) => (t.surfaceLabels    as Record<string, string>)[v] ?? v;
  const sortKeyLabel = (k: ClimbSortKey) => {
    const map: Record<ClimbSortKey, string> = {
      difficulty:    t.colFiets,
      length:        t.fieldLength,
      gain:          t.fieldGain,
      avg_gradient:  t.fieldAvg,
      max_gradient:  t.fieldMax,
      summit:        t.fieldSummit,
    };
    return map[k];
  };

  /* ---------------------------------------------------------------- */
  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={t.title}
      meta={
        <MetaBadge>
          {t.lastReviewed} {CLIMBS_LAST_REVIEWED}
        </MetaBadge>
      }
      contentClassName="p-0"
    >
      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div
        className="space-y-4 border-b border-[var(--color-border)] p-5 sm:p-6"
        style={{ backgroundColor: accentSurface(2) }}
      >
        {/* Search */}
        <div>
          <label
            htmlFor="climbs-search"
            className="mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
          >
            {t.searchPlaceholder}
          </label>
          <div className="tool-field flex items-center rounded-lg">
            <input
              id="climbs-search"
              type="search"
              placeholder={t.searchPlaceholder}
              value={filters.query}
              onChange={(ev) =>
                setFilters((f) => ({ ...f, query: ev.target.value }))
              }
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
              aria-label={t.searchPlaceholder}
            />
          </div>
        </div>

        {/* Continent + Country */}
        <div className="flex flex-wrap gap-4">
          <SelectField
            id="climbs-continent"
            label={t.filterContinent}
            value={filters.continent}
            onChange={(v) =>
              setFilters((f) => ({
                ...f,
                continent: v as Continent | "",
              }))
            }
            className="min-w-[10rem]"
          >
            <option value="">{t.filterAll}</option>
            {continents.map((c) => (
              <option key={c} value={c}>
                {continentLabel(c)}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="climbs-country"
            label={t.filterCountry}
            value={filters.country}
            onChange={(v) => setFilters((f) => ({ ...f, country: v }))}
            className="min-w-[8rem]"
          >
            <option value="">{t.filterAll}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {flagEmoji(c)} {c}
              </option>
            ))}
          </SelectField>
        </div>

        {/* Min Length + Min Gradient */}
        <div className="flex flex-wrap gap-4">
          <NumberField
            id="climbs-min-length"
            label={t.filterMinLength}
            value={filters.minLength > 0 ? String(filters.minLength) : ""}
            onChange={(v) =>
              setFilters((f) => ({ ...f, minLength: Number(v) || 0 }))
            }
            min={0}
            max={50}
            step={1}
            unit="km"
            stepper={false}
            className="w-32"
          />
          <NumberField
            id="climbs-min-gradient"
            label={t.filterMinGradient}
            value={filters.minGradient > 0 ? String(filters.minGradient) : ""}
            onChange={(v) =>
              setFilters((f) => ({ ...f, minGradient: Number(v) || 0 }))
            }
            min={0}
            max={20}
            step={1}
            unit="%"
            stepper={false}
            className="w-28"
          />
        </div>

        {/* Difficulty chips */}
        <div className="space-y-2">
          <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
            {t.filterDifficulty}
          </p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_BAND_ORDER.map((band) => (
              <FilterChip
                key={band}
                label={difficultyLabel(band)}
                active={filters.difficulty === band}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    difficulty: f.difficulty === band ? "" : band,
                  }))
                }
              />
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_CLIMB_FILTERS)}
                className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
              >
                {t.filterReset}
              </button>
            )}
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-wrap items-end gap-3 border-t border-[var(--color-border)] pt-4">
          <SelectField
            id="climbs-sort"
            label={t.sortBy}
            value={sortKey}
            onChange={(v) => setSortKey(v as ClimbSortKey)}
            className="min-w-[10rem]"
          >
            {SORT_KEYS.map((k) => (
              <option key={k} value={k}>
                {sortKeyLabel(k)}
              </option>
            ))}
          </SelectField>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 font-mono text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            aria-label={sortDir === "asc" ? "asc" : "desc"}
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* ── Difficulty legend (collapsible) ──────────────────────── */}
      <details className="group border-b border-[var(--color-border)]">
        <summary
          className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-3 sm:px-6"
          style={{ color: "var(--tool-accent)" }}
        >
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]">
            {t.legendTitle}
          </span>
          <span
            aria-hidden="true"
            className="text-[var(--color-text-secondary)] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div
          className="space-y-3 border-t border-[var(--color-border)] px-5 pb-5 pt-4 sm:px-6"
          style={{ backgroundColor: accentSurface(2) }}
        >
          <ul className="space-y-2">
            {DIFFICULTY_BAND_ORDER.map((band) => (
              <li key={band} className="flex items-start gap-2">
                <span
                  className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={DIFFICULTY_BADGE[band]}
                >
                  {difficultyLabel(band)}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {difficultyDescLabel(band)}
                </span>
              </li>
            ))}
          </ul>
          <p className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
            {t.legendNote}
          </p>
        </div>
      </details>

      {/* ── Summary strip ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 sm:px-6">
        <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text)]">
          {t.climbCount.replace("{n}", String(entries.length))}
        </span>
        <span aria-hidden="true" className="text-[var(--color-text-muted)]">·</span>
        <span className="font-mono text-[11px] tabular-nums text-[var(--color-text-secondary)]">
          {t.profiledCount.replace("{n}", String(demCount))}
        </span>
      </div>

      {/* ── Card list ────────────────────────────────────────────── */}
      {entries.length === 0 ? (
        <div className="px-6 pb-12 pt-8 text-center">
          <p className="text-[var(--color-text-muted)]">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-3 p-5 sm:p-6">
          {entries.map((climb) => {
            const isExpanded = expandedIds.has(climb.id);
            const band = difficultyBand(climb);
            const fiets = fietsIndex(climb);
            return (
              <article
                key={climb.id}
                className="relative overflow-hidden rounded-xl border bg-[var(--color-bg-card)] transition-colors"
                style={{
                  borderColor: isExpanded
                    ? accentAlpha(33)
                    : "var(--color-border)",
                }}
              >
                {/* Accent tick on the left edge — stronger when expanded */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl transition-colors"
                  style={{
                    backgroundColor: isExpanded
                      ? "var(--tool-accent)"
                      : accentAlpha(20),
                  }}
                />

                {/* ── Collapsed header (always visible) ─────────── */}
                <div className="pb-4 pl-5 pr-4 pt-4">
                  {/* Name + region */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-base font-semibold text-[var(--color-text)]">
                          <span aria-hidden="true">{flagEmoji(climb.country)}</span>{" "}
                          {climb.name}
                        </h3>
                        {climb.ascent_name && (
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                            {climb.ascent_name[locale]}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                        {climb.region[locale]}
                      </p>
                    </div>
                    {/* Star metrics: FIETS + Desnivel + Longitud — all text-lg, right-aligned */}
                    <div className="flex flex-wrap items-end justify-end gap-2 shrink-0">
                      {/* FIETS — accent bg, accent text */}
                      <div
                        className="rounded-lg px-3 py-2 text-right"
                        style={{ backgroundColor: accentAlpha(14) }}
                      >
                        <div
                          className="font-mono text-lg font-bold tabular-nums leading-none"
                          style={{ color: "var(--tool-accent)" }}
                        >
                          {fiets.toFixed(1)}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                          {t.colFiets}
                        </div>
                      </div>
                      {/* Elevation gain */}
                      <div
                        className="rounded-lg px-3 py-2 text-right"
                        style={{ backgroundColor: accentAlpha(7) }}
                      >
                        <div className="font-mono text-lg font-semibold tabular-nums leading-none text-[var(--color-text)]">
                          {climb.elevation_gain_m}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                          {t.colGain}
                        </div>
                      </div>
                      {/* Length */}
                      <div
                        className="rounded-lg px-3 py-2 text-right"
                        style={{ backgroundColor: accentAlpha(7) }}
                      >
                        <div className="font-mono text-lg font-semibold tabular-nums leading-none text-[var(--color-text)]">
                          {climb.length_km}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                          {t.colLength}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge + key figures */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-medium"
                      style={DIFFICULTY_BADGE[band]}
                    >
                      {difficultyLabel(band)}
                    </span>
                    <Figure label={t.colLength}  value={`${climb.length_km} km`} />
                    <Figure label={t.colGain}    value={`${climb.elevation_gain_m} m`} />
                    <Figure label={t.colAvg}     value={`${climb.avg_gradient}%`} />
                    <Figure label={t.colMax}     value={`${climb.max_gradient}%`} />
                    <Figure label={t.colSummit}  value={`${climb.summit_elevation_m} m`} />
                  </div>

                  {/* Expand/collapse button */}
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? t.hideProfile : t.showProfile} — ${climb.name}`}
                    onClick={() => toggleCard(climb.id)}
                    className="mt-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] transition-colors hover:underline"
                    style={{ color: "var(--tool-accent)" }}
                  >
                    {isExpanded ? t.hideProfile : t.showProfile}
                  </button>
                </div>

                {/* ── Expanded detail section ────────────────────── */}
                {isExpanded && (
                  <div
                    className="space-y-4 border-t px-5 py-4"
                    style={{
                      borderTopColor: accentAlpha(22),
                      backgroundColor: accentSurface(2),
                    }}
                  >
                    {/* Profile chart */}
                    {climb.profile && climb.profile.length > 1 && (
                      <div>
                        <p className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                          {t.profileTitle}
                        </p>
                        <ProfileChart
                          climb={climb}
                          accent={accent}
                          accentVar={accentVar}
                          dict={t}
                        />
                        {/* Gradient strip */}
                        {climb.gradient_segments &&
                          climb.gradient_segments.length > 0 && (
                            <div className="mt-2 flex h-2.5 w-full overflow-hidden rounded">
                              {climb.gradient_segments.map((seg, i) => (
                                <div
                                  key={i}
                                  title={`${seg.from_km}–${seg.to_km} km · ${seg.gradient}%`}
                                  style={{
                                    flex: seg.to_km - seg.from_km,
                                    backgroundColor: gradientColor(seg.gradient),
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        {/* Provenance note */}
                        <p
                          className={cn(
                            "mt-2 text-xs",
                            climb.profile_source === "synthetic"
                              ? "text-amber-600 dark:text-amber-500"
                              : "text-[var(--color-text-muted)]",
                          )}
                        >
                          {climb.profile_source === "synthetic"
                            ? `⚠ ${t.profileSyntheticNote}`
                            : t.profileDemNote}
                        </p>
                      </div>
                    )}

                    {/* Key metrics — DM Mono readout panel */}
                    <ReadoutPanel className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      <MetricCell label={t.colFiets}   value={fiets.toFixed(1)} primary />
                      <MetricCell label={t.colLength}  value={String(climb.length_km)}          unit="km" />
                      <MetricCell label={t.colGain}    value={String(climb.elevation_gain_m)}   unit="m" />
                      <MetricCell label={t.colAvg}     value={String(climb.avg_gradient)}       unit="%" />
                      <MetricCell label={t.colMax}     value={String(climb.max_gradient)}       unit="%" />
                      <MetricCell label={t.colSummit}  value={String(climb.summit_elevation_m)} unit="m" />
                    </ReadoutPanel>

                    {/* FIETS explainer */}
                    <div
                      className="rounded-lg px-3 py-2 text-xs text-[var(--color-text-secondary)]"
                      style={{ backgroundColor: accentAlpha(8) }}
                    >
                      <strong style={{ color: "var(--tool-accent)" }}>
                        {t.fietsLabel}:
                      </strong>{" "}
                      {t.fietsExplain}
                    </div>

                    {/* Data grid */}
                    <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                      <DetailField label={t.fieldRegion}>
                        {climb.region[locale]}
                      </DetailField>
                      <DetailField label={t.fieldSurface}>
                        {surfaceLabel(climb.surface)}
                      </DetailField>
                      <DetailField label={t.fieldStart}>
                        {climb.start_elevation_m} m
                      </DetailField>
                      <DetailField label={t.fieldSummit}>
                        {climb.summit_elevation_m} m
                      </DetailField>
                      {climb.best_season && (
                        <DetailField label={t.fieldSeason}>
                          {climb.best_season[locale]}
                        </DetailField>
                      )}
                    </div>

                    <DetailField label={t.fieldFamousFor}>
                      {climb.famous_for[locale]}
                    </DetailField>
                    {climb.notes && (
                      <DetailField label={t.fieldNotes}>
                        {climb.notes[locale]}
                      </DetailField>
                    )}

                    {/* Source */}
                    <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
                      {t.sourceLabel}:{" "}
                      <a
                        href={climb.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-dotted hover:text-[var(--color-text-secondary)]"
                        style={{ color: "var(--tool-accent)" }}
                      >
                        {climb.source_name}
                      </a>{" "}
                      · {climb.last_verified}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ── Cross-link to race calendar ──────────────────────────── */}
      {racesHref && (
        <div
          className="border-t border-[var(--color-border)] px-5 py-4 sm:px-6"
          style={{ backgroundColor: accentSurface(2) }}
        >
          <Link
            href={racesHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--tool-accent)" }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaRaces}
          </Link>
        </div>
      )}
    </ToolPanel>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

/**
 * Elevation profile chart. Uses `useAccentColor` to resolve the section accent
 * var to a real hex — Recharts renders to SVG and cannot consume CSS variables
 * in stopColor/stroke/fill attributes.
 */
function ProfileChart({
  climb,
  accent,
  accentVar,
  dict,
}: {
  climb: ClimbEntry;
  accent: string;
  accentVar: string;
  dict: { profileDistance: string; profileElevation: string };
}) {
  // Recharts → SVG: resolve CSS var to computed hex; `accent` is the SSR fallback.
  const chartColor = useAccentColor(accentVar, accent);
  const data = (climb.profile ?? []).map((p) => ({ d: p.d, e: p.e }));
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${climb.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={chartColor} stopOpacity={0.45} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="d"
            type="number"
            domain={[0, "dataMax"]}
            tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
            stroke="var(--color-border)"
            tickFormatter={(v: number) => v.toFixed(0)}
            unit=" km"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
            stroke="var(--color-border)"
            domain={["dataMin", "dataMax"]}
            width={44}
            unit=" m"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: 12,
              color: "var(--color-text)",
            }}
            labelFormatter={(v) => `${Number(v).toFixed(1)} km`}
            formatter={(v) => [
              `${Math.round(Number(v ?? 0))} m`,
              dict.profileElevation,
            ]}
          />
          <Area
            type="monotone"
            dataKey="e"
            stroke={chartColor}
            strokeWidth={2}
            fill={`url(#grad-${climb.id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Compact DM Mono metric cell inside the key-figures ReadoutPanel. */
function MetricCell({
  label,
  value,
  unit,
  primary = false,
}: {
  label: string;
  value: string;
  unit?: string;
  primary?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p
        className="mb-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
        style={{ color: primary ? "var(--tool-accent)" : "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-mono text-xl font-semibold tabular-nums leading-none"
          style={{ color: primary ? "var(--tool-accent)" : "var(--color-text)" }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

/** Inline label + value pair in the card's key-figures row. Mono label. */
function Figure({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-[var(--color-text-secondary)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
        {label}
      </span>{" "}
      <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text)]">
        {value}
      </span>
    </span>
  );
}

/** Label + prose field for the expanded card detail. Mono uppercase label. */
function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-text)]">{children}</p>
    </div>
  );
}
