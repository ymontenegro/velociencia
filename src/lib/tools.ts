import type { Locale } from "@/lib/i18n";
import { SECTIONS, type SectionId } from "@/lib/constants";

/**
 * Registry of interactive calculators and curated datasets (Pilar 4 del plan
 * de interfaz v2).
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
   * table and surface a different CTA.
   *
   * Routing split (since 2026-06):
   * - calculator → /herramientas/<slug> (ES) | /tools/<slug> (EN)
   * - dataset    → /datos/<slug>        (ES) | /data/<slug>  (EN)
   *
   * Use `toolHref()` to build hrefs — never hardcode the base.
   */
  kind?: "calculator" | "dataset";
  /**
   * URL slug per locale. The base path depends on `kind` — use `toolHref()` to
   * build the full href; do NOT assume /herramientas or /tools universally.
   */
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
  /**
   * Optional pre-computed mini-result shown as a Race Telemetry readout at the
   * bottom of the ToolCard. Label describes the input context; value is the
   * result. Both must be verified against the component's actual calculation
   * logic — a wrong sample stat is worse than none.
   *
   * @example
   *   { label: { es: "FTP 250 W → Z2", en: "FTP 250 W → Z2" },
   *     value: { es: "140–188 W", en: "140–188 W" } }
   */
  sampleStat?: {
    label: Record<Locale, string>;
    value: Record<Locale, string>;
  };
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
    // TSS = IF² × 100; 1 h @ IF 0.85 → 0.85² × 100 = 72.25 ≈ 72
    // Source: src/lib/training/metrics.ts tssFromPower (durationSec * np * IF) / (ftp * 3600) * 100
    sampleStat: {
      label: { es: "1 h @ IF 0.85", en: "1 h @ IF 0.85" },
      value: { es: "≈72 TSS", en: "≈72 TSS" },
    },
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
    // Z2 pctLow=56, pctHigh=75 → Math.round(56/100*250)=140, Math.round(75/100*250)=188
    // Source: src/lib/training/zones.ts POWER_ZONES + power-zones-calculator.tsx computeZones()
    sampleStat: {
      label: { es: "FTP 250 W → Z2", en: "FTP 250 W → Z2" },
      value: { es: "140–188 W", en: "140–188 W" },
    },
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
    // zone4 (>2.5 h): [65, 90]; high intensity factor=1 → Math.round(65+(90-65)*1) = 90
    // Source: carb-intake-calculator.tsx getRecommendation() / ZONE_RANGES / intensityFactor()
    sampleStat: {
      label: { es: "3 h · alta intensidad", en: "3 h · high intensity" },
      value: { es: "90 g/h", en: "90 g/h" },
    },
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
    // 250/70 = 3.5714... → toFixed(2) = "3.57"; men 3.0–3.9 = "Entrenado"
    // Source: power-to-weight-calculator.tsx CATEGORIES_MEN + wkg.toFixed(2)
    sampleStat: {
      label: { es: "250 W / 70 kg", en: "250 W / 70 kg" },
      value: { es: "3.57 W/kg", en: "3.57 W/kg" },
    },
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
    // Storer men: 10.51×300 + 6.35×70 − 10.49×35 + 519.3 = 3749.65 ml/min ÷ 70 = 53.566 → "53.6"
    // Source: vo2max-estimator-calculator.tsx computeVo2() with defaults wmax=300, weight=70, age=35, m
    sampleStat: {
      label: { es: "300 W · 70 kg · 35 a", en: "300 W · 70 kg · 35 y" },
      value: { es: "53.6 ml/kg/min", en: "53.6 ml/kg/min" },
    },
  },
  {
    id: "ftp-test",
    slug: { es: "ftp-test-20min", en: "ftp-20min-test" },
    title: {
      es: "Calculadora de FTP (test de 20 minutos)",
      en: "FTP calculator (20-minute test)",
    },
    tagline: {
      es: "Tu FTP a partir de la potencia media de un test de 20 minutos.",
      en: "Your FTP from the average power of a 20-minute test.",
    },
    description: {
      es: "Calcula tu FTP (potencia funcional umbral) a partir de la potencia media de un test de 20 minutos a máximo esfuerzo, con la fórmula de Andrew Coggan (95% de la media). Añade tu peso para obtener también tu FTP en vatios por kilo.",
      en: "Work out your FTP (functional threshold power) from the average power of an all-out 20-minute test using Andrew Coggan's formula (95% of the average). Add your weight to also get your FTP in watts per kilo.",
    },
    sectionId: "entrenamiento",
    relatedTag: "FTP",
    // FTP = round(260 × 0.95) = 247
    // Source: ftp-test-calculator.tsx FTP_FACTOR = 0.95
    sampleStat: {
      label: { es: "260 W en 20 min", en: "260 W over 20 min" },
      value: { es: "FTP 247 W", en: "FTP 247 W" },
    },
  },
  {
    id: "vam",
    slug: { es: "calculadora-vam", en: "vam-calculator" },
    title: {
      es: "Calculadora de VAM (ritmo de escalada)",
      en: "VAM calculator (climbing pace)",
    },
    tagline: {
      es: "Tus metros de ascensión por hora y tu nivel de escalador.",
      en: "Your vertical metres per hour and your climber level.",
    },
    description: {
      es: "Calcula tu VAM (velocidad de ascensión media, en metros de desnivel por hora) a partir del desnivel y el tiempo de subida, compárala con las referencias por nivel y estima tu potencia relativa en W/kg con la fórmula de Ferrari.",
      en: "Calculate your VAM (average climbing speed, in vertical metres per hour) from elevation gain and climb time, compare it against reference levels and estimate your relative power in W/kg with the Ferrari formula.",
    },
    sectionId: "entrenamiento",
    relatedTag: "escalada",
    // 1000 m en 45 min → round(1000 / (45/60)) = 1333 m/h → banda "Élite amateur"
    // Source: vam-calculator.tsx vam = round(gain / (timeMin/60))
    sampleStat: {
      label: { es: "1000 m en 45 min", en: "1000 m in 45 min" },
      value: { es: "1333 m/h", en: "1333 m/h" },
    },
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
    // 15 gels in GELS array; carbs_g range: min 21 (GU Roctane), max 90 (PF90)
    // Source: src/lib/datasets/gels.ts GELS[] — all entries with format "gel"
    sampleStat: {
      label: { es: "15 geles · carbohidratos", en: "15 gels · carbohydrates" },
      value: { es: "21–90 g / gel", en: "21–90 g / gel" },
    },
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
    // EVIDENCE.length = 19, getCitationCount() = 123 (verified: running reduce over evidence-data.ts)
    // Source: src/lib/datasets/evidence.ts getCitationCount() + evidence-data.ts EVIDENCE array
    sampleStat: {
      label: { es: "19 suplementos", en: "19 supplements" },
      value: { es: "123 citas verificadas", en: "123 verified citations" },
    },
  },
  {
    id: "climbs-database",
    kind: "dataset",
    slug: { es: "puertos", en: "climbs" },
    title: {
      es: "Base de datos de puertos del mundo",
      en: "World climbs database",
    },
    tagline: {
      es: "51 puertos icónicos con su índice FIETS y perfil de altitud calculado desde el DEM.",
      en: "51 iconic climbs with their FIETS index and a DEM-computed elevation profile.",
    },
    description: {
      es: "Explora 51 puertos icónicos del ciclismo de todo el mundo —de los Alpes y Dolomitas a los Andes, Norteamérica, Asia y Oceanía— con su índice FIETS de dificultad, datos verificados (longitud, desnivel, pendiente, altitud) y un perfil de altitud calculado punto a punto desde el modelo digital de elevación abierto SRTM 30 m sobre el trazado real de la carretera. Filtra por continente, país, dificultad, longitud y pendiente.",
      en: "Explore 51 iconic cycling climbs from around the world —from the Alps and Dolomites to the Andes, North America, Asia and Oceania— with their FIETS difficulty index, verified data (length, gain, gradient, altitude) and an elevation profile sampled point by point from the open SRTM 30 m digital elevation model along the real road geometry. Filter by continent, country, difficulty, length and gradient.",
    },
    sectionId: "entrenamiento",
    relatedTag: "puertos",
    // Alpe d'Huez: length_km=13.8, avg_gradient=8.1; FIETS=9.9 (base=1120²/(13800×10)+altBonus)
    // Source: climbs-data.ts alpe-dhuez entry + climbs.ts fietsIndex() formula
    sampleStat: {
      label: { es: "Alpe d'Huez", en: "Alpe d'Huez" },
      value: { es: "13,8 km · 8,1% · FIETS 9,9", en: "13.8 km · 8.1% · FIETS 9.9" },
    },
  },
  {
    id: "race-calendar",
    kind: "dataset",
    slug: { es: "calendario", en: "calendar" },
    title: {
      es: "Calendario UCI 2026",
      en: "2026 UCI calendar",
    },
    tagline: {
      es: "111 carreras de la temporada 2026: WorldTour, ProSeries y continentales, masculino y femenino.",
      en: "111 races of the 2026 season: WorldTour, ProSeries and continental, men's and women's.",
    },
    description: {
      es: "El calendario internacional de ciclismo en ruta 2026: 111 carreras del UCI WorldTour y Women's WorldTour, la ProSeries y una selección de pruebas continentales de cada continente, incluida Latinoamérica. Agrupadas por mes, con su clase UCI, género, tipo de prueba y enlace a la web oficial, con badge de carrera en curso o de esta semana. Calendario curado y verificado a mano contra fuentes públicas.",
      en: "The 2026 international road-cycling calendar: 111 races from the UCI WorldTour and Women's WorldTour, the ProSeries and a selection of continental races from every continent, including Latin America. Grouped by month, with their UCI class, gender, race type and a link to the official site, plus an ongoing / this-week badge. Hand-curated and verified against public sources.",
    },
    sectionId: "competencia",
    relatedTag: "calendario",
    // RACES.length = 111 (verified: grep -c '"id"' races-data.ts = 111), RACES_SEASON = 2026
    // Source: src/lib/datasets/races.ts getRaceCount() + races-data.ts RACES array
    sampleStat: {
      label: { es: "Temporada 2026", en: "2026 season" },
      value: { es: "111 carreras", en: "111 races" },
    },
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

/**
 * Returns the locale-aware path for the tools index page of a given kind.
 *
 * | kind          | ES               | EN         |
 * |---------------|------------------|------------|
 * | "dataset"     | /datos           | /data      |
 * | "calculator"  | /herramientas    | /tools     |
 * | undefined     | /herramientas    | /tools     |
 *
 * Use this helper instead of hardcoding base paths in components and sitemaps.
 */
export function toolsIndexHref(
  locale: Locale,
  kind?: ToolInfo["kind"],
): string {
  if (kind === "dataset") {
    return locale === "en" ? "/data" : "/datos";
  }
  return locale === "en" ? "/tools" : "/herramientas";
}

/**
 * Locale-aware href for a tool page. Kind-aware since 2026-06:
 * - calculator → /herramientas/<slug> (ES) | /tools/<slug> (EN)
 * - dataset    → /datos/<slug>        (ES) | /data/<slug>  (EN)
 *
 * Signature unchanged; callers that stored the result will automatically
 * receive the correct new path after this update.
 */
export function toolHref(tool: ToolInfo, locale: Locale): string {
  return `${toolsIndexHref(locale, tool.kind)}/${tool.slug[locale]}`;
}

/** Section accent color for a tool. */
export function toolColor(tool: ToolInfo): string {
  return SECTIONS[tool.sectionId].color;
}
