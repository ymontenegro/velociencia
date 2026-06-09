"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useDictionary } from "@/components/locale-provider";
import {
  getAllRaces,
  filterRaces,
  groupByMonth,
  getRaceCount,
  getPresentCategories,
  getPresentContinents,
  isOngoing,
  isUpcoming,
  KIND_ORDER,
  RACES_SEASON,
  RACES_LAST_REVIEWED,
  DEFAULT_RACE_FILTERS,
  type RaceEntry,
  type RaceFilterState,
  type RaceCategory,
  type RaceGender,
  type Continent,
} from "@/lib/datasets/races";
import { getToolById, toolHref } from "@/lib/tools";
import {
  ToolPanel,
  FilterChip,
  SelectField,
  MetaBadge,
  accentAlpha,
  accentSurface,
} from "@/components/tools/ui";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";

/* ------------------------------------------------------------------ */
/* Local strings — eyebrow + title.                                    */
/* Per convention: new eyebrow/title strings live here, not in JSON.  */
/* ------------------------------------------------------------------ */

const LOCAL_STRINGS = {
  es: {
    eyebrow: "COMPETENCIA · CALENDARIO",
    title: "Calendario UCI 2026",
  },
  en: {
    eyebrow: "COMPETITION · CALENDAR",
    title: "UCI 2026 Calendar",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Badge palettes (fixed, theme-neutral).                              */
/* Low-opacity bg + same-hue text → readable on dark + light.         */
/* DO NOT CHANGE: these palettes encode classification meaning.        */
/* ------------------------------------------------------------------ */

type BadgeStyle = { backgroundColor: string; color: string };

const CATEGORY_BADGE: Record<RaceCategory, BadgeStyle> = {
  worldtour:   { backgroundColor: "rgba(225,29,72,0.14)",   color: "#e11d48" },
  proseries:   { backgroundColor: "rgba(245,158,11,0.14)",  color: "#b45309" },
  continental: { backgroundColor: "rgba(100,116,139,0.16)", color: "#475569" },
};

const GENDER_BADGE: Record<RaceGender, BadgeStyle> = {
  men:   { backgroundColor: "rgba(14,165,233,0.14)",  color: "#0284c7" },
  women: { backgroundColor: "rgba(217,70,239,0.14)",  color: "#c026d3" },
  mixed: { backgroundColor: "rgba(100,116,139,0.14)", color: "#64748b" },
};

const GENDERS: RaceGender[] = ["men", "women"];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** ISO date YYYY-MM-DD → "D MMM" using the localized month labels. */
function shortDate(iso: string, months: string[]): string {
  const d = Number(iso.slice(8, 10));
  const m = Number(iso.slice(5, 7)) - 1;
  return `${d} ${(months[m] ?? "").slice(0, 3)}`;
}

/** Local YYYY-MM-DD for the client's today (avoids SSR hydration mismatch). */
function localToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function RaceCalendar({
  accent = "#E11D48",
  accentVar = "--color-competencia",
}: ToolComponentProps) {
  const locale = useLocale();
  const dict = useDictionary();
  const t = dict.races;
  const ls = LOCAL_STRINGS[locale];

  const [filters, setFilters] = useState<RaceFilterState>(DEFAULT_RACE_FILTERS);
  // Reference date computed on the client only (avoids SSR hydration mismatch).
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(localToday()), []);

  const categories = useMemo(() => getPresentCategories(), []);
  const continents = useMemo(() => getPresentContinents(), []);
  const total = useMemo(() => getRaceCount(), []);

  const climbsHref = useMemo(() => {
    const tool = getToolById("climbs-database");
    return tool ? toolHref(tool, locale) : null;
  }, [locale]);

  const months = (t.monthLabels as unknown as string[]) ?? [];

  const groups = useMemo(() => {
    const filtered = filterRaces(getAllRaces(), filters);
    return groupByMonth(filtered);
  }, [filters]);

  const filteredCount = useMemo(
    () => groups.reduce((n, g) => n + g.races.length, 0),
    [groups],
  );

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_RACE_FILTERS),
    [filters],
  );

  const catLabel = (v: string) => (t.categoryLabels as Record<string, string>)[v] ?? v;
  const genderLabel = (v: string) => (t.genderLabels as Record<string, string>)[v] ?? v;
  const kindLabel = (v: string) => (t.kindLabels as Record<string, string>)[v] ?? v;
  const continentLabel = (v: string) =>
    (t.continentLabels as Record<string, string>)[v] ?? v;

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={ls.eyebrow}
      title={ls.title}
      meta={
        <MetaBadge>
          {t.lastReviewed} {RACES_LAST_REVIEWED}
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
            htmlFor="race-search"
            className="mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
          >
            {t.searchPlaceholder}
          </label>
          <div className="tool-field flex items-center rounded-lg">
            <input
              id="race-search"
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

        {/* Month + Category + Continent selects */}
        <div className="flex flex-wrap items-end gap-3">
          <SelectField
            id="race-month"
            label={t.filterMonth}
            value={String(filters.month)}
            onChange={(v) =>
              setFilters((f) => ({ ...f, month: Number(v) }))
            }
            className="min-w-[9rem]"
          >
            <option value="-1">{t.filterAll}</option>
            {months.map((m, i) => (
              <option key={i} value={String(i)}>
                {m}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="race-category"
            label={t.filterCategory}
            value={filters.category}
            onChange={(v) =>
              setFilters((f) => ({ ...f, category: v as RaceCategory | "" }))
            }
            className="min-w-[9rem]"
          >
            <option value="">{t.filterAll}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {catLabel(c)}
              </option>
            ))}
          </SelectField>

          <SelectField
            id="race-continent"
            label={t.filterContinent}
            value={filters.continent}
            onChange={(v) =>
              setFilters((f) => ({ ...f, continent: v as Continent | "" }))
            }
            className="min-w-[9rem]"
          >
            <option value="">{t.filterAll}</option>
            {continents.map((c) => (
              <option key={c} value={c}>
                {continentLabel(c)}
              </option>
            ))}
          </SelectField>
        </div>

        {/* Gender + kind chips + clear */}
        <div className="flex flex-wrap items-center gap-2">
          {GENDERS.map((g) => (
            <FilterChip
              key={g}
              label={genderLabel(g)}
              active={filters.gender === g}
              onClick={() =>
                setFilters((f) => ({ ...f, gender: f.gender === g ? "" : g }))
              }
            />
          ))}
          <span aria-hidden="true" className="mx-1 text-[var(--color-border)]">
            |
          </span>
          {KIND_ORDER.map((k) => (
            <FilterChip
              key={k}
              label={kindLabel(k)}
              active={filters.kind === k}
              onClick={() =>
                setFilters((f) => ({ ...f, kind: f.kind === k ? "" : k }))
              }
            />
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_RACE_FILTERS)}
              className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            >
              {t.filterReset}
            </button>
          )}
        </div>
      </div>

      {/* ── Summary strip ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3 sm:px-6">
        <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text)]">
          {t.raceCount.replace("{n}", String(filteredCount))}
        </span>
        <span aria-hidden="true" className="text-[var(--color-text-muted)]">
          ·
        </span>
        <span className="font-mono text-[11px] tabular-nums text-[var(--color-text-secondary)]">
          {t.season.replace("{n}", String(RACES_SEASON))} · {total}
        </span>
      </div>

      {/* ── Month groups ─────────────────────────────────────────── */}
      {groups.length === 0 ? (
        <div className="px-6 pb-12 pt-8 text-center">
          <p className="text-[var(--color-text-muted)]">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-8 p-5 sm:p-6">
          {groups.map((group) => (
            <section key={group.month}>
              {/* Month heading — mono eyebrow with accent rule */}
              <h3
                className="mb-3 flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--tool-accent)" }}
              >
                <span
                  className="h-3 w-1 rounded-full"
                  style={{ backgroundColor: "var(--tool-accent)" }}
                />
                {months[group.month]}
              </h3>
              <ul className="space-y-2">
                {group.races.map((race) => (
                  <RaceRow
                    key={race.id}
                    race={race}
                    locale={locale}
                    today={today}
                    months={months}
                    genderLabel={genderLabel}
                    kindLabel={kindLabel}
                    ongoingLabel={t.badgeOngoing}
                    upcomingLabel={t.badgeUpcoming}
                    officialLabel={t.officialSite}
                    sourceLabel={t.sourceLabel}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* ── Cross-link to climbs database ────────────────────────── */}
      {climbsHref && (
        <div
          className="border-t border-[var(--color-border)] px-5 py-4 sm:px-6"
          style={{ backgroundColor: accentSurface(2) }}
        >
          <Link
            href={climbsHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--tool-accent)" }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaClimbs}
          </Link>
        </div>
      )}
    </ToolPanel>
  );
}

/* ------------------------------------------------------------------ */

function RaceRow({
  race,
  locale,
  today,
  months,
  genderLabel,
  kindLabel,
  ongoingLabel,
  upcomingLabel,
  officialLabel,
  sourceLabel,
}: {
  race: RaceEntry;
  locale: "es" | "en";
  today: string | null;
  months: string[];
  genderLabel: (v: string) => string;
  kindLabel: (v: string) => string;
  ongoingLabel: string;
  upcomingLabel: string;
  officialLabel: string;
  sourceLabel: string;
}) {
  const ongoing = today ? isOngoing(race, today) : false;
  const upcoming = today ? isUpcoming(race, today) : false;
  const dateText =
    race.start_date === race.end_date
      ? shortDate(race.start_date, months)
      : `${shortDate(race.start_date, months)} – ${shortDate(race.end_date, months)}`;

  return (
    <li
      className="relative overflow-hidden rounded-xl border bg-[var(--color-bg-card)] p-3 transition-colors"
      style={{ borderColor: ongoing ? accentAlpha(40) : "var(--color-border)" }}
    >
      {/* Accent tick on the left edge — visible only when the race is ongoing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-l-xl transition-colors"
        style={{
          backgroundColor: ongoing ? "var(--tool-accent)" : accentAlpha(18),
        }}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {/* Date */}
        <span className="w-28 shrink-0 font-mono text-xs tabular-nums text-[var(--color-text-secondary)]">
          {dateText}
        </span>

        {/* Name */}
        <span className="min-w-0 flex-1 font-medium text-[var(--color-text)]">
          {race.name}
          <span className="ml-1.5 text-xs font-normal text-[var(--color-text-muted)]">
            {race.country}
            {race.extra_countries && race.extra_countries.length > 0
              ? `–${race.extra_countries.join("–")}`
              : ""}
          </span>
        </span>

        {/* Status badges */}
        {ongoing && (
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: "var(--tool-accent)" }}
          >
            {ongoingLabel}
          </span>
        )}
        {!ongoing && upcoming && (
          <MetaBadge>{upcomingLabel}</MetaBadge>
        )}

        {/* Classification badges (fixed semantic palettes) */}
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={CATEGORY_BADGE[race.category]}
        >
          {race.uci_class}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={GENDER_BADGE[race.gender]}
        >
          {genderLabel(race.gender)}
        </span>
        <span className="hidden font-mono text-[10.5px] text-[var(--color-text-muted)] sm:inline">
          {kindLabel(race.kind)}
        </span>

        {/* Links */}
        <span className="flex shrink-0 items-center gap-2 text-xs">
          {race.website && (
            <a
              href={race.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "var(--tool-accent)" }}
            >
              {officialLabel}
            </a>
          )}
          <a
            href={race.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] underline decoration-dotted hover:text-[var(--color-text-secondary)]"
          >
            {sourceLabel}
          </a>
        </span>
      </div>

      {race.notes && (
        <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
          {race.notes[locale]}
        </p>
      )}
    </li>
  );
}
