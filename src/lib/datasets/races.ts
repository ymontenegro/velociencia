/**
 * World race calendar — types, helpers and pure filtering.
 *
 * Fourth curated data asset. Pure module — no fs/server-only imports — so it can
 * be consumed from server routes, RSC and client components alike, mirroring the
 * other datasets.
 *
 * The value here is recurrence + E-E-A-T, NOT streaming affiliates ("where to
 * watch" was refuted). The moat is a hand-curated, bilingual, verified calendar
 * built from factual, non-copyrightable data (name/date/country/class). We do
 * NOT scrape UCI/PCS; we curate from public sources and cite them.
 *
 * Dates are stored as ISO `YYYY-MM-DD` strings (timezone-free, sortable). The
 * "this week / upcoming" logic takes the reference date from the caller so the
 * module stays pure and deterministic.
 */

import type { Locale } from "@/lib/i18n";
import { RACES } from "@/lib/datasets/races-data";

/** ISO YYYY-MM the calendar was last reviewed against the sources. */
export const RACES_LAST_REVIEWED = "2026-06";
/** Season the dataset covers. */
export const RACES_SEASON = 2026;

/** Localized string pair. */
export type LocalizedText = Record<Locale, string>;

/** UCI registration tier — the primary category filter. */
export type RaceCategory = "worldtour" | "proseries" | "continental";

export type RaceGender = "men" | "women" | "mixed";

/** Stage race vs single-day. */
export type RaceFormat = "stage" | "one_day";

/**
 * Editorial kind — richer than the UCI class, drives badges and a secondary
 * filter. A race is at most one of these (grand tours are also stage races but
 * surface as "grand_tour").
 */
export type RaceKind =
  | "grand_tour"
  | "monument"
  | "classic"
  | "stage_race"
  | "one_day";

export type Continent =
  | "europa"
  | "norteamerica"
  | "sudamerica"
  | "oceania"
  | "asia"
  | "africa";

export interface RaceEntry {
  /** Stable kebab-case id incl. season, e.g. "tour-de-france-2026". */
  id: string;
  /** Official race name — not localized (e.g. "Tour de France", "Milano-Sanremo"). */
  name: string;
  /** Primary host country, ISO 3166-1 alpha-2. */
  country: string;
  /** Extra host countries for multi-country races (ISO alpha-2), optional. */
  extra_countries?: string[];
  continent: Continent;

  category: RaceCategory;
  /** Exact UCI class, e.g. "2.UWT", "1.Pro", "2.1". */
  uci_class: string;
  gender: RaceGender;
  format: RaceFormat;
  kind: RaceKind;

  /** ISO YYYY-MM-DD. For one-day races, equals `end_date`. */
  start_date: string;
  /** ISO YYYY-MM-DD. */
  end_date: string;

  /** Official race website. */
  website?: string;
  /** Optional editorial note (localized). */
  notes?: LocalizedText;

  /* --- Provenance --- */
  source_url: string;
  source_name: string;
  /** ISO YYYY-MM of the last verification. */
  last_verified: string;
}

export const CATEGORY_ORDER: RaceCategory[] = [
  "worldtour",
  "proseries",
  "continental",
];

export const KIND_ORDER: RaceKind[] = [
  "grand_tour",
  "monument",
  "classic",
  "stage_race",
  "one_day",
];

export const CONTINENT_ORDER: Continent[] = [
  "europa",
  "norteamerica",
  "sudamerica",
  "oceania",
  "asia",
  "africa",
];

/* ------------------------------------------------------------------ */
/* Date helpers — pure. Reference date is always passed in so the      */
/* module is deterministic and SSR-safe.                               */
/* ------------------------------------------------------------------ */

/** 0-based month index (0 = January) of a race's start date. */
export function raceMonth(race: RaceEntry): number {
  return Number(race.start_date.slice(5, 7)) - 1;
}

/** True when `today` (YYYY-MM-DD) falls within the race window, inclusive. */
export function isOngoing(race: RaceEntry, today: string): boolean {
  return race.start_date <= today && today <= race.end_date;
}

/** True when the race starts within `days` after `today` (and hasn't started). */
export function isUpcoming(race: RaceEntry, today: string, days = 7): boolean {
  if (race.start_date <= today) return false;
  const start = Date.parse(`${race.start_date}T00:00:00Z`);
  const ref = Date.parse(`${today}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(ref)) return false;
  const diffDays = (start - ref) / 86_400_000;
  return diffDays <= days;
}

/* ------------------------------------------------------------------ */
/* Filtering — pure                                                    */
/* ------------------------------------------------------------------ */

export interface RaceFilterState {
  /** "" = all categories. */
  category: RaceCategory | "";
  /** "" = all genders. */
  gender: RaceGender | "";
  /** "" = all kinds. */
  kind: RaceKind | "";
  /** "" = all continents. */
  continent: Continent | "";
  /** -1 = all months; otherwise 0-based month index. */
  month: number;
  /** Free-text query matched against the name + country. */
  query: string;
}

export const DEFAULT_RACE_FILTERS: RaceFilterState = {
  category: "",
  gender: "",
  kind: "",
  continent: "",
  month: -1,
  query: "",
};

/** Accent-insensitive, lowercased, trimmed — for name search. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function filterRaces(
  entries: RaceEntry[],
  filters: RaceFilterState,
): RaceEntry[] {
  const q = normalize(filters.query);
  return entries.filter((r) => {
    if (filters.category && r.category !== filters.category) return false;
    if (filters.gender && r.gender !== filters.gender) return false;
    if (filters.kind && r.kind !== filters.kind) return false;
    if (filters.continent && r.continent !== filters.continent) return false;
    if (filters.month >= 0 && raceMonth(r) !== filters.month) return false;
    if (q) {
      const haystack = `${normalize(r.name)} ${normalize(r.country)}`;
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Sorting & grouping — pure                                           */
/* ------------------------------------------------------------------ */

/** Chronological by start date, then by name for same-day stability. */
export function sortByDate(entries: RaceEntry[]): RaceEntry[] {
  return [...entries].sort((a, b) => {
    if (a.start_date !== b.start_date)
      return a.start_date < b.start_date ? -1 : 1;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
}

export interface MonthGroup {
  /** 0-based month index. */
  month: number;
  races: RaceEntry[];
}

/** Group chronologically-sorted races by calendar month. */
export function groupByMonth(entries: RaceEntry[]): MonthGroup[] {
  const sorted = sortByDate(entries);
  const groups: MonthGroup[] = [];
  for (const race of sorted) {
    const m = raceMonth(race);
    const last = groups[groups.length - 1];
    if (last && last.month === m) last.races.push(race);
    else groups.push({ month: m, races: [race] });
  }
  return groups;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllRaces(): RaceEntry[] {
  return RACES;
}

export function getRaceById(id: string): RaceEntry | null {
  return RACES.find((r) => r.id === id) ?? null;
}

/** Categories actually present in the dataset, in canonical order. */
export function getPresentCategories(): RaceCategory[] {
  const present = new Set(RACES.map((r) => r.category));
  return CATEGORY_ORDER.filter((c) => present.has(c));
}

/** Continents present in the dataset, in canonical order. */
export function getPresentContinents(): Continent[] {
  const present = new Set(RACES.map((r) => r.continent));
  return CONTINENT_ORDER.filter((c) => present.has(c));
}

/** Total number of curated races — surfaced as a trust signal. */
export function getRaceCount(): number {
  return RACES.length;
}
