import type { Locale } from "@/lib/i18n";
import { SECTIONS, type SectionId } from "@/lib/constants";

/**
 * Registry of interactive calculators (Pilar 4 del plan de interfaz v2).
 *
 * Pure module (no fs/server-only imports) so it can be used from both server
 * routes and client components. Each tool maps to a self-contained calculator
 * component in `src/components/tools/` keyed by `id`.
 */
export interface ToolInfo {
  /** Stable id — also the key used to render the matching calculator component. */
  id: string;
  /** URL slug per locale (routes live under /herramientas y /tools). */
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  /** Short one-liner for cards. */
  tagline: Record<Locale, string>;
  /** Longer description for the tool page + SEO. */
  description: Record<Locale, string>;
  /** Drives the accent color via the section palette. */
  sectionId: SectionId;
  /** Display tag used to surface related articles on the tool page. */
  relatedTag: string;
}

export const TOOLS: ToolInfo[] = [
  {
    id: "power-zones",
    slug: { es: "zonas-de-potencia", en: "power-zones" },
    title: {
      es: "Calculadora de zonas de potencia",
      en: "Power zones calculator",
    },
    tagline: {
      es: "Tus 7 zonas de entrenamiento a partir del FTP.",
      en: "Your 7 training zones from your FTP.",
    },
    description: {
      es: "Ingresa tu FTP (potencia funcional umbral) y obtén al instante las siete zonas de entrenamiento del modelo clásico de Andrew Coggan, en vatios. Una guía para estructurar sesiones de resistencia, tempo, umbral y VO₂máx.",
      en: "Enter your FTP (functional threshold power) and instantly get the seven training zones from Andrew Coggan's classic model, in watts. A guide to structure endurance, tempo, threshold and VO₂max sessions.",
    },
    sectionId: "entrenamiento",
    relatedTag: "FTP",
  },
  {
    id: "carb-intake",
    slug: { es: "ingesta-de-carbohidratos", en: "carbohydrate-intake" },
    title: {
      es: "Calculadora de carbohidratos",
      en: "Carbohydrate intake calculator",
    },
    tagline: {
      es: "Cuántos gramos por hora según duración e intensidad.",
      en: "How many grams per hour by duration and intensity.",
    },
    description: {
      es: "Calcula cuántos gramos de carbohidratos por hora necesitas según la duración y la intensidad de tu salida, con la pauta de carbohidratos de transporte múltiple (glucosa + fructosa) para los esfuerzos más largos.",
      en: "Work out how many grams of carbohydrate per hour you need based on your ride's duration and intensity, including the multiple-transportable-carbohydrate (glucose + fructose) guidance for the longest efforts.",
    },
    sectionId: "nutricion",
    relatedTag: "carbohidratos",
  },
  {
    id: "power-to-weight",
    slug: { es: "relacion-potencia-peso", en: "power-to-weight" },
    title: {
      es: "Calculadora de relación potencia-peso",
      en: "Power-to-weight calculator",
    },
    tagline: {
      es: "Tus W/kg y dónde te sitúan.",
      en: "Your W/kg and where you stand.",
    },
    description: {
      es: "Divide tu potencia entre tu peso para obtener tu relación potencia-peso (W/kg) y ver dónde te sitúa respecto a las categorías del perfil de potencia, desde aficionado hasta nivel profesional.",
      en: "Divide your power by your weight to get your power-to-weight ratio (W/kg) and see where you stand against power-profile categories, from recreational to professional level.",
    },
    sectionId: "ciencia",
    relatedTag: "potencia",
  },
  {
    id: "vo2max-estimator",
    slug: { es: "estimador-vo2max", en: "vo2max-estimator" },
    title: {
      es: "Estimador de VO₂máx",
      en: "VO₂max estimator",
    },
    tagline: {
      es: "Tu VO₂máx a partir de tu potencia máxima.",
      en: "Your VO₂max from your peak power.",
    },
    description: {
      es: "Estima tu consumo máximo de oxígeno (VO₂máx) a partir de tu potencia aeróbica máxima, peso, edad y sexo con la ecuación de Storer para cicloergómetro, y compáralo con los valores de referencia por edad y sexo.",
      en: "Estimate your maximal oxygen uptake (VO₂max) from your maximal aerobic power, weight, age and sex using Storer's cycle-ergometer equation, and compare it against age- and sex-based reference values.",
    },
    sectionId: "ciencia",
    relatedTag: "VO2max",
  },
  {
    id: "training-load",
    slug: { es: "carga-de-entrenamiento", en: "training-load" },
    title: {
      es: "Calculadora de carga de entrenamiento",
      en: "Training load calculator",
    },
    tagline: {
      es: "Fitness, fatiga y forma (CTL/ATL/TSB) en el tiempo.",
      en: "Fitness, fatigue and form (CTL/ATL/TSB) over time.",
    },
    description: {
      es: "Simula tu curva de carga de entrenamiento —el Performance Management Chart— a partir de tu TSS diario: condición física crónica (CTL), fatiga aguda (ATL) y forma (TSB) a lo largo de las semanas, con la opción de un afinamiento (tapering) final.",
      en: "Simulate your training-load curve —the Performance Management Chart— from your daily TSS: chronic fitness (CTL), acute fatigue (ATL) and form (TSB) across the weeks, with an optional end taper.",
    },
    sectionId: "entrenamiento",
    relatedTag: "carga de entrenamiento",
  },
];

export function getAllTools(): ToolInfo[] {
  return TOOLS;
}

/** Normalize a tag/string for accent- and case-insensitive matching. */
function normalizeTag(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Suggest interactive tools relevant to an article. Prioritizes tools whose
 * `relatedTag` matches one of the article's tags, then falls back to tools from
 * the same section. Used to surface the calculators as original, interactive
 * value inside article pages. Capped at `limit`.
 */
export function getRelatedTools(
  sectionId: SectionId,
  tags: string[] = [],
  limit = 2,
): ToolInfo[] {
  const tagSet = new Set(tags.map(normalizeTag));
  const byTag = TOOLS.filter((t) => tagSet.has(normalizeTag(t.relatedTag)));
  const bySection = TOOLS.filter(
    (t) => t.sectionId === sectionId && !byTag.includes(t),
  );
  return [...byTag, ...bySection].slice(0, limit);
}

export function getToolBySlug(slug: string, locale: Locale): ToolInfo | null {
  return TOOLS.find((t) => t.slug[locale] === slug) ?? null;
}

export function getToolById(id: string): ToolInfo | null {
  return TOOLS.find((t) => t.id === id) ?? null;
}

/** Locale-aware href for a tool (/herramientas/... or /tools/...). */
export function toolHref(tool: ToolInfo, locale: Locale): string {
  const base = locale === "en" ? "tools" : "herramientas";
  return `/${base}/${tool.slug[locale]}`;
}

/** Section accent color for a tool. */
export function toolColor(tool: ToolInfo): string {
  return SECTIONS[tool.sectionId].color;
}
