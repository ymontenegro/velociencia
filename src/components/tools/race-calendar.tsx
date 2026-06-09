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
import { cn } from "@/lib/utils";

type BadgeStyle = { backgroundColor: string; color: string };

const CATEGORY_BADGE: Record<RaceCategory, BadgeStyle> = {
  worldtour: { backgroundColor: "rgba(225,29,72,0.14)", color: "#e11d48" },
  proseries: { backgroundColor: "rgba(245,158,11,0.14)", color: "#b45309" },
  continental: { backgroundColor: "rgba(100,116,139,0.16)", color: "#475569" },
};

const GENDER_BADGE: Record<RaceGender, BadgeStyle> = {
  men: { backgroundColor: "rgba(14,165,233,0.14)", color: "#0284c7" },
  women: { backgroundColor: "rgba(217,70,239,0.14)", color: "#c026d3" },
  mixed: { backgroundColor: "rgba(100,116,139,0.14)", color: "#64748b" },
};

const GENDERS: RaceGender[] = ["men", "women"];

/** ISO date YYYY-MM-DD → "D MMM" using the localized month labels. */
function shortDate(iso: string, months: string[]): string {
  const d = Number(iso.slice(8, 10));
  const m = Number(iso.slice(5, 7)) - 1;
  return `${d} ${(months[m] ?? "").slice(0, 3)}`;
}

/** Local YYYY-MM-DD for the client's today (used for ongoing/upcoming badges). */
function localToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function RaceCalendar({ color }: { color?: string }) {
  const locale = useLocale();
  const dict = useDictionary();
  const t = dict.races;
  const accent = color ?? "var(--color-competencia)";

  const colorAlpha = (alphaHex: string) => {
    if (color) return color + alphaHex;
    const pct = Math.round((parseInt(alphaHex, 16) / 255) * 100);
    return `color-mix(in srgb, var(--color-competencia) ${pct}%, transparent)`;
  };

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
          {/* Month */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterMonth}
            <select
              value={filters.month}
              onChange={(ev) =>
                setFilters((f) => ({ ...f, month: Number(ev.target.value) }))
              }
              className="min-w-[8rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              style={{ accentColor: accent }}
            >
              <option value={-1}>{t.filterAll}</option>
              {months.map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          {/* Category */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {t.filterCategory}
            <select
              value={filters.category}
              onChange={(ev) =>
                setFilters((f) => ({
                  ...f,
                  category: ev.target.value as RaceCategory | "",
                }))
              }
              className="min-w-[8rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              style={{ accentColor: accent }}
            >
              <option value="">{t.filterAll}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {catLabel(c)}
                </option>
              ))}
            </select>
          </label>

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
              className="min-w-[8rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
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
        </div>

        {/* Gender + kind chips */}
        <div className="flex flex-wrap items-center gap-2">
          {GENDERS.map((g) => (
            <FilterToggle
              key={g}
              label={genderLabel(g)}
              active={filters.gender === g}
              accent={accent}
              onClick={() =>
                setFilters((f) => ({ ...f, gender: f.gender === g ? "" : g }))
              }
            />
          ))}
          <span aria-hidden="true" className="mx-1 text-[var(--color-text-muted)]">|</span>
          {KIND_ORDER.map((k) => (
            <FilterToggle
              key={k}
              label={kindLabel(k)}
              active={filters.kind === k}
              accent={accent}
              onClick={() =>
                setFilters((f) => ({ ...f, kind: f.kind === k ? "" : k }))
              }
            />
          ))}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_RACE_FILTERS)}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            >
              {t.filterReset}
            </button>
          )}
        </div>
      </div>

      {/* ── Summary strip ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[var(--color-text)]">
            {t.raceCount.replace("{n}", String(filteredCount))}
          </span>
          <span aria-hidden="true" className="text-[var(--color-text-muted)]">·</span>
          <span className="text-[var(--color-text-secondary)]">
            {t.season.replace("{n}", String(RACES_SEASON))} · {total}
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: colorAlpha("22"), color: accent }}
        >
          {t.lastReviewed} {RACES_LAST_REVIEWED}
        </span>
      </div>

      {/* ── Month groups ─────────────────────────────────────────── */}
      {groups.length === 0 ? (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
          <p className="text-[var(--color-text-muted)]">{t.noResults}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.month}>
              <h3
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide"
                style={{ color: accent }}
              >
                <span
                  className="h-3 w-1 rounded-full"
                  style={{ backgroundColor: accent }}
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
                    accent={accent}
                    colorAlpha={colorAlpha}
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
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
          <Link
            href={climbsHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: accent }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaClimbs}
          </Link>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RaceRow({
  race,
  locale,
  today,
  months,
  accent,
  colorAlpha,
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
  accent: string;
  colorAlpha: (a: string) => string;
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
      className="rounded-lg border bg-[var(--color-bg-card)] p-3 transition-colors"
      style={{ borderColor: ongoing ? colorAlpha("66") : "var(--color-border)" }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {/* Date */}
        <span className="w-28 shrink-0 text-xs font-semibold tabular-nums text-[var(--color-text-secondary)]">
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

        {/* Badges */}
        {ongoing && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: accent }}
          >
            {ongoingLabel}
          </span>
        )}
        {!ongoing && upcoming && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: colorAlpha("22"), color: accent }}
          >
            {upcomingLabel}
          </span>
        )}
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
        <span className="hidden text-[11px] text-[var(--color-text-muted)] sm:inline">
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
              style={{ color: accent }}
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
