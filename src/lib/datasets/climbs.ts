/**
 * World climbs database — types, helpers and pure filtering.
 *
 * Third curated data asset. Pure module — no fs/server-only imports — so it can
 * be consumed from server routes, RSC and client components alike, mirroring the
 * gels and evidence datasets.
 *
 * The differentiator (the anti-AI "moat") is the **computed elevation profile**:
 * each climb's `profile` is sampled from open DEMs (SRTM/Copernicus) along the
 * road geometry, not copied from a third party. The headline metric is the
 * **FIETS difficulty index**, derived from the curated figures (analogous to the
 * gels' cost-per-gram-of-carb).
 *
 * The curated rows live in `climbs-data.ts`. Numeric facts are universal and
 * shared across locales; only prose (region, famous_for, notes) is localized.
 */

import type { Locale } from "@/lib/i18n";
import { CLIMBS } from "@/lib/datasets/climbs-data";

/** ISO YYYY-MM the dataset was last reviewed against the sources. */
export const CLIMBS_LAST_REVIEWED = "2026-06";

/** Localized string pair. */
export type LocalizedText = Record<Locale, string>;

/** Continent — drives the primary geographic filter. */
export type Continent =
  | "europa"
  | "norteamerica"
  | "sudamerica"
  | "oceania"
  | "asia"
  | "africa";

/** Road surface of the climb. */
export type ClimbSurface = "asfalto" | "gravel" | "mixto";

/**
 * Difficulty band derived from the FIETS index. Kept as a small, stable set so
 * the UI legend and the filter stay in sync. See `difficultyBand()`.
 */
export type DifficultyBand = "exigente" | "muy_dura" | "extrema" | "mitica";

/** One sampled point of the elevation profile (the computed moat). */
export interface ClimbProfilePoint {
  /** Distance from the foot of the climb, in km. */
  d: number;
  /** Elevation at that point, in m. */
  e: number;
}

/**
 * A per-kilometre gradient segment, used to colour the profile and the
 * gradient strip. Derived from `profile` during generation.
 */
export interface GradientSegment {
  /** Segment start distance from the foot, in km. */
  from_km: number;
  /** Segment end distance from the foot, in km. */
  to_km: number;
  /** Average gradient of the segment, in %. */
  gradient: number;
}

export interface ClimbEntry {
  /** Stable kebab-case id, e.g. "alpe-dhuez", "passo-dello-stelvio-prato". */
  id: string;
  /** Proper name — not localized (e.g. "Alpe d'Huez", "Passo dello Stelvio"). */
  name: string;
  /** Name of the side/approach when the climb has several, e.g. "desde Prato". */
  ascent_name?: LocalizedText;
  /** ISO 3166-1 alpha-2 country code (drives the flag + country filter). */
  country: string;
  /** Mountain range / area, localized (e.g. "Alpes franceses" / "French Alps"). */
  region: LocalizedText;
  continent: Continent;

  /* --- Curated figures (universal, shared across locales) --- */
  /** Elevation at the foot of the climb, in m. */
  start_elevation_m: number;
  /** Elevation at the summit, in m. */
  summit_elevation_m: number;
  /** Length of the climb, in km. */
  length_km: number;
  /** Positive elevation gain over the climb, in m (handles flat/false-flat). */
  elevation_gain_m: number;
  /** Average gradient over the climb, in %. */
  avg_gradient: number;
  /** Maximum sustained gradient (steepest ramp), in %. */
  max_gradient: number;
  surface: ClimbSurface;

  /* --- Geo (for the DEM pipeline + map display) --- */
  start_lat: number;
  start_lng: number;
  summit_lat: number;
  summit_lng: number;

  /* --- Computed moat (filled by the DEM pipeline) --- */
  /** Sampled elevation profile from the foot to the summit. */
  profile?: ClimbProfilePoint[];
  /** Per-km gradient segments derived from `profile`. */
  gradient_segments?: GradientSegment[];

  /* --- Editorial --- */
  /** What makes it iconic — grand-tour history, milestones. Localized. */
  famous_for: LocalizedText;
  /** Optional extra notes (season, road condition, traffic). Localized. */
  notes?: LocalizedText;
  /** When the road/pass is realistically rideable. Localized, optional. */
  best_season?: LocalizedText;
  /** Filter tags, e.g. "grand-tour", "hors-categorie", "+2000m", "gravel". */
  tags: string[];

  /* --- Provenance (the trust layer) --- */
  source_url: string;
  source_name: string;
  /** ISO YYYY-MM of the last verification of the figures. */
  last_verified: string;
}

/* ------------------------------------------------------------------ */
/* FIETS difficulty index — the headline computed metric.              */
/*                                                                     */
/* FIETS = (gain² / (length_m × 10)) + altitude correction, where the  */
/* altitude term adds (summit − 1000) / 1000 for summits above 1000 m. */
/* This is the public, reproducible climb-difficulty formula; computing */
/* it from our curated figures is the analogue of cost_per_g_carb.      */
/* ------------------------------------------------------------------ */

export function fietsIndex(climb: ClimbEntry): number {
  const gain = climb.elevation_gain_m;
  const lengthM = climb.length_km * 1000;
  if (lengthM <= 0) return 0;
  const base = (gain * gain) / (lengthM * 10);
  const altitudeBonus =
    climb.summit_elevation_m > 1000
      ? (climb.summit_elevation_m - 1000) / 1000
      : 0;
  return base + altitudeBonus;
}

/** Difficulty band from the FIETS index. Thresholds tuned to the catalogue. */
export function difficultyBand(climb: ClimbEntry): DifficultyBand {
  const f = fietsIndex(climb);
  if (f >= 9) return "mitica";
  if (f >= 6) return "extrema";
  if (f >= 4) return "muy_dura";
  return "exigente";
}

export const DIFFICULTY_BAND_ORDER: DifficultyBand[] = [
  "exigente",
  "muy_dura",
  "extrema",
  "mitica",
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
/* Filtering — pure                                                    */
/* ------------------------------------------------------------------ */

export interface ClimbFilterState {
  /** "" = all continents. */
  continent: Continent | "";
  /** "" = all countries (ISO alpha-2). */
  country: string;
  /** "" = all difficulty bands. */
  difficulty: DifficultyBand | "";
  /** Minimum length in km (0 = no minimum). */
  minLength: number;
  /** Minimum average gradient in % (0 = no minimum). */
  minGradient: number;
  /** Free-text query matched against the name + region. */
  query: string;
}

export const DEFAULT_CLIMB_FILTERS: ClimbFilterState = {
  continent: "",
  country: "",
  difficulty: "",
  minLength: 0,
  minGradient: 0,
  query: "",
};

/** Accent-insensitive, lowercased, trimmed — for name/region search. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function filterClimbs(
  entries: ClimbEntry[],
  filters: ClimbFilterState,
  locale: Locale,
): ClimbEntry[] {
  const q = normalize(filters.query);
  return entries.filter((c) => {
    if (filters.continent && c.continent !== filters.continent) return false;
    if (filters.country && c.country !== filters.country) return false;
    if (filters.difficulty && difficultyBand(c) !== filters.difficulty)
      return false;
    if (filters.minLength && c.length_km < filters.minLength) return false;
    if (filters.minGradient && c.avg_gradient < filters.minGradient)
      return false;
    if (q) {
      const haystack = `${normalize(c.name)} ${normalize(c.region[locale])}`;
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Sorting — pure. Sortable columns kept in one place so the UI and    */
/* the comparator stay consistent.                                     */
/* ------------------------------------------------------------------ */

export type ClimbSortKey =
  | "difficulty"
  | "length"
  | "gain"
  | "avg_gradient"
  | "max_gradient"
  | "summit";

export function sortClimbs(
  entries: ClimbEntry[],
  key: ClimbSortKey,
  dir: "asc" | "desc" = "desc",
): ClimbEntry[] {
  const value = (c: ClimbEntry): number => {
    switch (key) {
      case "difficulty":
        return fietsIndex(c);
      case "length":
        return c.length_km;
      case "gain":
        return c.elevation_gain_m;
      case "avg_gradient":
        return c.avg_gradient;
      case "max_gradient":
        return c.max_gradient;
      case "summit":
        return c.summit_elevation_m;
    }
  };
  const sign = dir === "asc" ? 1 : -1;
  return entries
    .map((c, i) => ({ c, i }))
    .sort((a, b) => {
      const d = (value(a.c) - value(b.c)) * sign;
      return d !== 0 ? d : a.i - b.i; // stable tie-break
    })
    .map((d) => d.c);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllClimbs(): ClimbEntry[] {
  return CLIMBS;
}

export function getClimbById(id: string): ClimbEntry | null {
  return CLIMBS.find((c) => c.id === id) ?? null;
}

/** Continents actually present in the dataset, in canonical order. */
export function getPresentContinents(): Continent[] {
  const present = new Set(CLIMBS.map((c) => c.continent));
  return CONTINENT_ORDER.filter((c) => present.has(c));
}

/** Country codes present in the dataset, sorted alphabetically. */
export function getPresentCountries(): string[] {
  return [...new Set(CLIMBS.map((c) => c.country))].sort();
}

/** Number of climbs whose elevation profile has been computed. */
export function getProfiledCount(): number {
  return CLIMBS.filter((c) => c.profile && c.profile.length > 0).length;
}
