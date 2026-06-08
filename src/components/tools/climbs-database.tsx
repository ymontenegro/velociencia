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
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Difficulty badge palette (theme-neutral, low-opacity bg + strong text) */
/* ------------------------------------------------------------------ */

type BadgeStyle = { backgroundColor: string; color: string };

const DIFFICULTY_BADGE: Record<DifficultyBand, BadgeStyle> = {
  exigente: { backgroundColor: "rgba(14,165,233,0.14)", color: "#0284c7" },
  muy_dura: { backgroundColor: "rgba(245,158,11,0.14)", color: "#b45309" },
  extrema: { backgroundColor: "rgba(239,68,68,0.14)", color: "#dc2626" },
  mitica: { backgroundColor: "rgba(124,58,237,0.16)", color: "#7c3aed" },
};

/** Per-km gradient strip colour bands (mirrors road-sign colour coding). */
function gradientColor(g: number): string {
  if (g < 4) return "#22c55e";
  if (g < 7) return "#eab308";
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

export default function ClimbsDatabase({ color }: { color?: string }) {
  const locale = useLocale();
  const dict = useDictionary();
  const t = dict.climbs;
  const accent = color ?? "var(--color-entrenamiento)";

  const colorAlpha = (alphaHex: string) => {
    if (color) return color + alphaHex;
    const pct = Math.round((parseInt(alphaHex, 16) / 255) * 100);
    return `color-mix(in srgb, var(--color-entrenamiento) ${pct}%, transparent)`;
  };

  const [filters, setFilters] = useState<ClimbFilterState>(DEFAULT_CLIMB_FILTERS);
  const [sortKey, setSortKey] = useState<ClimbSortKey>("difficulty");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const continents = useMemo(() => getPresentContinents(), []);
  const countries = useMemo(() => getPresentCountries(), []);
  const demCount = useMemo(() => getDemProfiledCount(), []);

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

  const continentLabel = (v: string) =>
    (t.continentLabels as Record<string, string>)[v] ?? v;
  const difficultyLabel = (v: string) =>
    (t.difficultyLabels as Record<string, string>)[v] ?? v;
  const difficultyDescLabel = (v: string) =>
    (t.difficultyDesc as Record<string, string>)[v] ?? v;
  const surfaceLabel = (v: string) =>
    (t.surfaceLabels as Record<string, string>)[v] ?? v;
  const sortLabel = (k: ClimbSortKey) => {
    const map: Record<ClimbSortKey, string> = {
      difficulty: t.colFiets,
      length: t.fieldLength,
      gain: t.fieldGain,
      avg_gradient: t.fieldAvg,
      max_gradient: t.fieldMax,
      summit: t.fieldSummit,
    };
    return map[k];
  };

  return (
    <div className="space-y-6">
      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 space-y-4">
        <input
          type="search"
          placeholder={t.searchPlaceholder}
          value={filters.query}
          onChange={(ev) => setFilters((f) => ({ ...f, query: ev.target.value }))}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1"
          style={{ accentColor: accent }}
          aria-label={t.searchPlaceholder}
        />

        <div className="flex flex-wrap items-end gap-4">
          {/* Continent */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterContinent}
            <select
              value={filters.continent}
              onChange={(ev) =>
                setFilters((f) => ({
                  ...f,
                  continent: ev.target.value as Continent | "",
                }))
              }
              className="min-w-[10rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              style={{ accentColor: accent }}
            >
              <option value="">{t.filterAll}</option>
              {continents.map((c) => (
                <option key={c} value={c}>
                  {continentLabel(c)}
                </option>
              ))}
            </select>
          </label>

          {/* Country */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterCountry}
            <select
              value={filters.country}
              onChange={(ev) =>
                setFilters((f) => ({ ...f, country: ev.target.value }))
              }
              className="min-w-[8rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              style={{ accentColor: accent }}
            >
              <option value="">{t.filterAll}</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {flagEmoji(c)} {c}
                </option>
              ))}
            </select>
          </label>

          {/* Min length */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterMinLength}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={50}
              value={filters.minLength || ""}
              onChange={(ev) =>
                setFilters((f) => ({ ...f, minLength: Number(ev.target.value) || 0 }))
              }
              className="w-20 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            />
          </label>

          {/* Min gradient */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterMinGradient}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={20}
              value={filters.minGradient || ""}
              onChange={(ev) =>
                setFilters((f) => ({
                  ...f,
                  minGradient: Number(ev.target.value) || 0,
                }))
              }
              className="w-20 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            />
          </label>
        </div>

        {/* Difficulty chips */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterDifficulty}
          </p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_BAND_ORDER.map((band) => (
              <FilterToggle
                key={band}
                label={difficultyLabel(band)}
                active={filters.difficulty === band}
                accent={accent}
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
                className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
              >
                {t.filterReset}
              </button>
            )}
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] pt-3">
          <span className="text-xs font-medium text-[var(--color-text-secondary)]">
            {t.sortBy}:
          </span>
          <select
            value={sortKey}
            onChange={(ev) => setSortKey(ev.target.value as ClimbSortKey)}
            className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            style={{ accentColor: accent }}
          >
            {SORT_KEYS.map((k) => (
              <option key={k} value={k}>
                {sortLabel(k)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            aria-label={sortDir === "asc" ? "asc" : "desc"}
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* ── Difficulty legend (collapsible) ──────────────────────── */}
      <details className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <summary
          className="flex cursor-pointer select-none list-none items-center justify-between px-4 py-3 text-sm font-semibold"
          style={{ color: accent }}
        >
          <span>{t.legendTitle}</span>
          <span
            aria-hidden="true"
            className="text-[var(--color-text-secondary)] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <div className="border-t border-[var(--color-border)] px-4 pb-4 pt-3 space-y-2">
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
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[var(--color-text)]">
            {t.climbCount.replace("{n}", String(entries.length))}
          </span>
          <span aria-hidden="true" className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-secondary)]">
            {t.profiledCount.replace("{n}", String(demCount))}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: colorAlpha("22"), color: accent }}
        >
          {t.lastReviewed} {CLIMBS_LAST_REVIEWED}
        </span>
      </div>

      {/* ── Card list ────────────────────────────────────────────── */}
      {entries.length === 0 ? (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
          <p className="text-[var(--color-text-muted)]">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((climb) => {
            const isExpanded = expandedIds.has(climb.id);
            const band = difficultyBand(climb);
            const fiets = fietsIndex(climb);
            return (
              <article
                key={climb.id}
                className="rounded-lg border bg-[var(--color-bg-card)] overflow-hidden transition-colors"
                style={{
                  borderColor: isExpanded ? colorAlpha("55") : "var(--color-border)",
                }}
              >
                <div className="p-4">
                  {/* Title row */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-base font-semibold text-[var(--color-text)]">
                          <span aria-hidden="true">{flagEmoji(climb.country)}</span>{" "}
                          {climb.name}
                        </h3>
                        {climb.ascent_name && (
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {climb.ascent_name[locale]}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                        {climb.region[locale]}
                      </p>
                    </div>
                    {/* FIETS star metric */}
                    <div
                      className="shrink-0 rounded-md px-3 py-1.5 text-right"
                      style={{ backgroundColor: colorAlpha("14") }}
                    >
                      <div
                        className="text-lg font-bold tabular-nums leading-none"
                        style={{ color: accent }}
                      >
                        {fiets.toFixed(1)}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
                        {t.colFiets}
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
                    <Figure label={t.colLength} value={`${climb.length_km} km`} />
                    <Figure label={t.colGain} value={`${climb.elevation_gain_m} m`} />
                    <Figure label={t.colAvg} value={`${climb.avg_gradient}%`} />
                    <Figure label={t.colMax} value={`${climb.max_gradient}%`} />
                    <Figure label={t.colSummit} value={`${climb.summit_elevation_m} m`} />
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleCard(climb.id)}
                    className="mt-3 text-xs font-medium transition-colors hover:underline"
                    style={{ color: accent }}
                  >
                    {isExpanded ? t.hideProfile : t.showProfile}
                  </button>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div
                    className="border-t px-4 py-4 space-y-4"
                    style={{ borderTopColor: colorAlpha("33") }}
                  >
                    {/* Profile chart */}
                    {climb.profile && climb.profile.length > 1 && (
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                            {t.profileTitle}
                          </p>
                        </div>
                        <ProfileChart climb={climb} accent={accent} dict={t} />
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

                    {/* FIETS explainer */}
                    <div
                      className="rounded-md px-3 py-2 text-xs text-[var(--color-text-secondary)]"
                      style={{ backgroundColor: colorAlpha("0A") }}
                    >
                      <strong style={{ color: accent }}>{t.fietsLabel}:</strong>{" "}
                      {t.fietsExplain}
                    </div>

                    {/* Data grid */}
                    <div className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
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
                        style={{ color: accent }}
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
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
          <Link
            href={racesHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: accent }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaRaces}
          </Link>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function ProfileChart({
  climb,
  accent,
  dict,
}: {
  climb: ClimbEntry;
  accent: string;
  dict: { profileDistance: string; profileElevation: string };
}) {
  const data = (climb.profile ?? []).map((p) => ({ d: p.d, e: p.e }));
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${climb.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.05} />
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
            formatter={(v) => [`${Math.round(Number(v ?? 0))} m`, dict.profileElevation]}
          />
          <Area
            type="monotone"
            dataKey="e"
            stroke={accent}
            strokeWidth={2}
            fill={`url(#grad-${climb.id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-[var(--color-text-secondary)]">
      <span className="text-[var(--color-text-muted)]">{label}</span>{" "}
      <span className="font-medium tabular-nums text-[var(--color-text)]">{value}</span>
    </span>
  );
}

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
      style={active ? { backgroundColor: accent, borderColor: accent } : undefined}
    >
      {label}
    </button>
  );
}

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
