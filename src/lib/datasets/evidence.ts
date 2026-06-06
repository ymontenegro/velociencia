/**
 * Endurance-supplement evidence explorer — types, helpers and pure filtering.
 *
 * Second curated data asset (after gels). Pure module — no fs/server-only
 * imports — so it can be consumed from server routes, RSC and client
 * components alike, mirroring the gels dataset.
 *
 * Editorial model is **dual-axis**: `evidence_level` (how solid the evidence
 * is) is kept separate from `evidence_direction` (which way the effect points).
 * A supplement can have strong evidence that it does NOT work (e.g. glutamine)
 * or that it actively harms adaptation (high-dose antioxidants). The two axes
 * must never be collapsed into one badge in the UI.
 *
 * The curated rows live in `evidence-data.ts` (generated from the verified
 * research). Localized prose is stored as `{ es, en }` records.
 */

import type { Locale } from "@/lib/i18n";
import { EVIDENCE } from "@/lib/datasets/evidence-data";

/**
 * ISO YYYY-MM the dataset was last reviewed against the sources. Single shared
 * date (the rows are consolidated, not per-entry-dated) — surfaced as the
 * "last reviewed" trust badge.
 */
export const EVIDENCE_LAST_REVIEWED = "2026-06";

/** Localized string pair. */
export type LocalizedText = Record<Locale, string>;

/** Mechanistic/functional family. Drives grouping and the category filter. */
export type EvidenceCategory =
  | "estimulante_snc"
  | "nitrico_vasodilatador"
  | "tampon_ph"
  | "metabolico_energetico"
  | "recuperacion_antioxidante"
  | "aminoacido"
  | "micronutriente"
  | "otro";

/** How solid the evidence is — NOT the size or direction of the effect. */
export type EvidenceLevel = "fuerte" | "moderada" | "limitada" | "en_contra";

/** Which way the effect points for endurance/cycling. */
export type EvidenceDirection =
  | "ergogenico"
  | "contextual"
  | "nulo"
  | "perjudicial";

export type Confidence = "alta" | "media";

/** How well the cited population matches road cyclists. */
export type PopulationMatch =
  | "ciclistas"
  | "resistencia_general"
  | "extrapolado_otros_deportes";

export type SexEvidence = "mixto" | "mayormente_hombres" | "mayormente_mujeres";

/** Anti-doping status. `matiz` = allowed orally but with an IV/threshold caveat. */
export type WadaStatus = "permitido" | "monitoreo" | "matiz";

/** Australian Institute of Sport ABCD framework group. */
export type AisGroup = "A" | "B" | "C" | "no_verificado";

export interface EvidenceCitation {
  title: string;
  first_author: string;
  year: number;
  journal: string;
  /** Free-text study design, e.g. "Meta-análisis", "ECA cruzado…". */
  study_type: string;
  /** PubMed id; null when the source has no PMID (consensus statements, etc.). */
  pmid: string | null;
  doi: string | null;
  url: string;
  /** One-line verified finding, localized. */
  key_finding: LocalizedText;
}

export interface SupplementEntry {
  id: string;
  name: LocalizedText;
  category: EvidenceCategory;
  evidence_level: EvidenceLevel;
  evidence_direction: EvidenceDirection;
  confidence: Confidence;
  /** What it does for endurance performance. */
  performance_effect: LocalizedText;
  /** Magnitude with the numbers behind it. */
  effect_size: LocalizedText;
  mechanism: LocalizedText;
  dosage: LocalizedText;
  timing: LocalizedText;
  who_benefits: LocalizedText;
  population_match: PopulationMatch;
  sex_evidence: SexEvidence;
  caveats: LocalizedText;
  side_effects: LocalizedText;
  wada_status: WadaStatus;
  /** True when the WADA status was checked against the official list. */
  wada_verified: boolean;
  ais_group: AisGroup;
  /** True when the AIS group was confirmed in an official source. */
  ais_verified: boolean;
  citations: EvidenceCitation[];
}

/* ------------------------------------------------------------------ */
/* Ordering of the editorial axes (worst → best is intentional here).  */
/* Used both for sorting and for laying out the legend in the UI.      */
/* ------------------------------------------------------------------ */

/** Strong evidence first; "evidence against" is its own tier, not "weak". */
export const EVIDENCE_LEVEL_ORDER: EvidenceLevel[] = [
  "fuerte",
  "moderada",
  "limitada",
  "en_contra",
];

export const EVIDENCE_DIRECTION_ORDER: EvidenceDirection[] = [
  "ergogenico",
  "contextual",
  "nulo",
  "perjudicial",
];

export const CATEGORY_ORDER: EvidenceCategory[] = [
  "estimulante_snc",
  "nitrico_vasodilatador",
  "tampon_ph",
  "metabolico_energetico",
  "recuperacion_antioxidante",
  "aminoacido",
  "micronutriente",
  "otro",
];

/* ------------------------------------------------------------------ */
/* Filtering — pure                                                    */
/* ------------------------------------------------------------------ */

export interface EvidenceFilterState {
  /** "" = all categories. */
  category: EvidenceCategory | "";
  /** "" = all levels. */
  level: EvidenceLevel | "";
  /** "" = all directions. */
  direction: EvidenceDirection | "";
  /** When true, only WADA-permitted entries (excludes monitoreo/matiz). */
  permittedOnly: boolean;
  /** Free-text query matched against the localized name. */
  query: string;
}

export const DEFAULT_EVIDENCE_FILTERS: EvidenceFilterState = {
  category: "",
  level: "",
  direction: "",
  permittedOnly: false,
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

export function filterEvidence(
  entries: SupplementEntry[],
  filters: EvidenceFilterState,
  locale: Locale,
): SupplementEntry[] {
  const q = normalize(filters.query);
  return entries.filter((e) => {
    if (filters.category && e.category !== filters.category) return false;
    if (filters.level && e.evidence_level !== filters.level) return false;
    if (filters.direction && e.evidence_direction !== filters.direction)
      return false;
    if (filters.permittedOnly && e.wada_status !== "permitido") return false;
    if (q) {
      const haystack = `${normalize(e.name.es)} ${normalize(e.name.en)}`;
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Sorting — pure. Default editorial order ranks by evidence then       */
/* direction; this keeps "strong + ergogenic" at the top of the table. */
/* ------------------------------------------------------------------ */

export function sortByEditorialRank(
  entries: SupplementEntry[],
): SupplementEntry[] {
  return entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => {
      const la =
        EVIDENCE_LEVEL_ORDER.indexOf(a.e.evidence_level) -
        EVIDENCE_LEVEL_ORDER.indexOf(b.e.evidence_level);
      if (la !== 0) return la;
      const da =
        EVIDENCE_DIRECTION_ORDER.indexOf(a.e.evidence_direction) -
        EVIDENCE_DIRECTION_ORDER.indexOf(b.e.evidence_direction);
      if (da !== 0) return da;
      return a.i - b.i; // stable tie-break: preserve dataset order
    })
    .map((d) => d.e);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllSupplements(): SupplementEntry[] {
  return EVIDENCE;
}

export function getSupplementById(id: string): SupplementEntry | null {
  return EVIDENCE.find((e) => e.id === id) ?? null;
}

/** Categories actually present in the dataset, in canonical order. */
export function getPresentCategories(): EvidenceCategory[] {
  const present = new Set(EVIDENCE.map((e) => e.category));
  return CATEGORY_ORDER.filter((c) => present.has(c));
}

/** Total verified citations across the dataset — surfaced as a trust signal. */
export function getCitationCount(): number {
  return EVIDENCE.reduce((sum, e) => sum + e.citations.length, 0);
}

/** Counts per evidence level, for the summary strip. */
export function getLevelCounts(): Record<EvidenceLevel, number> {
  const counts: Record<EvidenceLevel, number> = {
    fuerte: 0,
    moderada: 0,
    limitada: 0,
    en_contra: 0,
  };
  for (const e of EVIDENCE) counts[e.evidence_level] += 1;
  return counts;
}
