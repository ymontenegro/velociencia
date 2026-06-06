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
  /**
   * Discriminates interactive calculators from curated data tables. Absent =
   * 'calculator' (default behaviour); 'dataset' entries render a comparator
   * table and surface a different CTA. All registry helpers are agnostic to it.
   */
  kind?: "calculator" | "dataset";
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
    id: "training-load",
    slug: { es: "carga-de-entrenamiento", en: "training-load" },
    title: {
      es: "Calculadora de carga de entrenamiento",
      en: "Training load calculator",
    },
    tagline: {
      es: "Sube tus archivos de Strava o Garmin y obtén tu TSS, NP, IF y tu curva de forma.",
      en: "Upload your Strava or Garmin files and get your TSS, NP, IF and fitness curve.",
    },
    description: {
      es: "Sube tus salidas de Strava o Garmin (.fit, .tcx, .gpx) y calcula su carga real —TSS, potencia normalizada (NP) e intensidad (IF)— para construir tu Performance Management Chart con fechas reales: condición física (CTL), fatiga (ATL) y forma (TSB). Todo se procesa en tu navegador: tus archivos nunca se suben a ningún servidor. También incluye un modo manual para planificar tu carga a futuro.",
      en: "Upload your Strava or Garmin rides (.fit, .tcx, .gpx) and compute their real load —TSS, normalized power (NP) and intensity factor (IF)— to build your Performance Management Chart over real dates: fitness (CTL), fatigue (ATL) and form (TSB). Everything runs in your browser: your files never leave your device. A manual mode is also included to plan future load.",
    },
    sectionId: "entrenamiento",
    relatedTag: "carga de entrenamiento",
  },
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
    id: "gel-comparator",
    kind: "dataset",
    slug: { es: "comparador-geles", en: "gel-comparator" },
    title: {
      es: "Comparador de geles energéticos",
      en: "Energy gel comparator",
    },
    tagline: {
      es: "Precio por gramo de carbohidrato, sodio y ratio G:F en un solo vistazo.",
      en: "Cost per gram of carb, sodium and G:F ratio at a glance.",
    },
    description: {
      es: "Compara los geles energéticos más usados en ciclismo: carbohidratos por ración, ratio glucosa:fructosa, sodio, cafeína y precio por gramo de carbohidrato. Datos verificados de fuentes oficiales de cada fabricante.",
      en: "Compare the most popular cycling energy gels: carbs per serving, glucose:fructose ratio, sodium, caffeine and cost per gram of carbohydrate. Data verified from each manufacturer's official sources.",
    },
    sectionId: "nutricion",
    relatedTag: "geles",
  },
  {
    id: "evidence-explorer",
    kind: "dataset",
    slug: { es: "evidencia-suplementos", en: "supplement-evidence" },
    title: {
      es: "Explorador de evidencia de suplementos",
      en: "Supplement evidence explorer",
    },
    tagline: {
      es: "Qué funciona y qué no en 19 suplementos para ciclismo, con su nivel de evidencia.",
      en: "What works and what doesn't across 19 cycling supplements, with their evidence level.",
    },
    description: {
      es: "Explora la evidencia científica de 19 suplementos y ayudas ergogénicas para ciclismo y resistencia con un modelo de doble eje —cuán sólida es la evidencia y hacia dónde apunta el efecto—, además de dosis, mecanismo, estatus WADA/AIS y 123 citas verificadas.",
      en: "Explore the scientific evidence for 19 supplements and ergogenic aids for cycling and endurance with a dual-axis model —how solid the evidence is and which way the effect points— plus dosage, mechanism, WADA/AIS status and 123 verified citations.",
    },
    sectionId: "nutricion",
    relatedTag: "suplementos",
  },
];

export function getAllTools(): ToolInfo[] {
  return TOOLS;
}

/**
 * Curated subset for the homepage highlight band. Picks tools from distinct
 * sections (different accent colors) so the band reads as a colorful sampler
 * rather than a single-hue block. Falls back to the first `limit` tools.
 */
export function getFeaturedTools(limit = 3): ToolInfo[] {
  const featuredIds = ["training-load", "carb-intake", "vo2max-estimator"];
  const curated = featuredIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is ToolInfo => Boolean(t));
  // Top up with any remaining tools if the curated list is short.
  for (const tool of TOOLS) {
    if (curated.length >= limit) break;
    if (!curated.includes(tool)) curated.push(tool);
  }
  return curated.slice(0, limit);
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
