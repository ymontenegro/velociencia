import { SECTIONS_I18N, SECTION_IDS, type SectionId } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

/**
 * Editorial author profiles — one per section. Each name is the editorial
 * byline under which we publish that specialty: content is AI-assisted and
 * reviewed by the editorial team (see the About page). Bios describe the
 * coverage and approach of each byline, not a fabricated personal biography.
 * Used for author bio blocks on articles and the /autor pages.
 */
interface AuthorProfile {
  sectionId: SectionId;
  /** stable slug for future /autor/[slug] pages */
  slug: string;
  specialty: Record<Locale, string>;
  bio: Record<Locale, string>;
}

const AUTHOR_PROFILES: AuthorProfile[] = [
  {
    sectionId: "nutricion",
    slug: "martin-velasco",
    specialty: {
      es: "Nutrición deportiva y suplementación basada en evidencia",
      en: "Sports nutrition and evidence-based supplementation",
    },
    bio: {
      es: "La firma editorial de Velociencia en nutrición. Cubre alimentación, hidratación y suplementación para ciclistas a partir de estudios revisados por pares, y traduce esa evidencia en pautas concretas para entrenar y competir. Contenido asistido por IA y revisado por el equipo editorial.",
      en: "PedalSci's editorial byline for nutrition. Covers fueling, hydration and supplementation for cyclists from peer-reviewed research, turning the evidence into concrete guidance for training and racing. AI-assisted content reviewed by the editorial team.",
    },
  },
  {
    sectionId: "ciencia",
    slug: "sofia-muller",
    specialty: {
      es: "Fisiología del ejercicio y biomecánica del ciclismo",
      en: "Exercise physiology and cycling biomechanics",
    },
    bio: {
      es: "La firma editorial de ciencia aplicada al rendimiento: VO₂máx, umbrales, cinética del oxígeno y metabolismo. Rigor de laboratorio explicado en lenguaje claro. Contenido asistido por IA y revisado por el equipo editorial.",
      en: "The editorial byline for the science of performance: VO₂max, thresholds, oxygen kinetics and metabolism. Lab-grade rigor explained in plain language. AI-assisted content reviewed by the editorial team.",
    },
  },
  {
    sectionId: "entrenamiento",
    slug: "tomas-herrera",
    specialty: {
      es: "Metodologías y planificación del entrenamiento",
      en: "Training methodology and planning",
    },
    bio: {
      es: "La firma editorial de entrenamiento. Analiza periodización, intervalos, potencia y las tendencias que pasan del pelotón profesional al ciclista de a pie, siempre con base en la evidencia. Contenido asistido por IA y revisado por el equipo editorial.",
      en: "The editorial byline for training. Breaks down periodization, intervals, power and the trends moving from the pro peloton to the everyday cyclist, always grounded in evidence. AI-assisted content reviewed by the editorial team.",
    },
  },
  {
    sectionId: "competencia",
    slug: "diego-araya",
    specialty: {
      es: "Ciclismo profesional, grandes vueltas y clásicas",
      en: "Professional cycling, grand tours and classics",
    },
    bio: {
      es: "La firma editorial de competición. Sigue el pelotón profesional: grandes vueltas, monumentos y la táctica que define cada carrera. Contenido asistido por IA y revisado por el equipo editorial.",
      en: "The editorial byline for racing. Follows the professional peloton: grand tours, monuments and the tactics that decide every race. AI-assisted content reviewed by the editorial team.",
    },
  },
];

export interface AuthorInfo {
  name: string;
  slug: string;
  sectionId: SectionId;
  specialty: string;
  bio: string;
  color: string;
}

/**
 * Editorial team members without a section-specific byline.
 * These appear on the About and Authors hub pages but do not have individual
 * /autor/[slug] archive pages since they don't publish articles under a byline.
 */
export interface EditorialMemberInfo {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  color: string;
}

const EDITORIAL_TEAM: Array<{
  name: Record<Locale, string>;
  role: Record<Locale, string>;
  specialty: Record<Locale, string>;
  bio: Record<Locale, string>;
  color: string;
}> = [
  {
    name: { es: "Carmen Lagos", en: "Carmen Lagos" },
    role: { es: "Editora jefa", en: "Editor-in-chief" },
    specialty: {
      es: "20+ años en medios deportivos de referencia",
      en: "20+ years in leading sports media",
    },
    bio: {
      es: "Editora jefa de Velociencia. Supervisa la calidad editorial de cada pieza publicada: rigor factual, estilo periodístico y coherencia entre las versiones en español e inglés. Su criterio es el filtro final antes de cualquier publicación.",
      en: "Editor-in-chief of PedalSci. Oversees the editorial quality of every published piece: factual rigour, journalistic style and consistency between the Spanish and English versions. Her judgement is the final filter before any publication.",
    },
    color: "#374151",
  },
  {
    name: { es: "Rodrigo Pizarro", en: "Rodrigo Pizarro" },
    role: { es: "Verificador de fuentes", en: "Fact-checker" },
    specialty: {
      es: "Verificación de fuentes científicas y datos deportivos",
      en: "Scientific source and sports data verification",
    },
    bio: {
      es: "Fact-checker de Velociencia. Confirma que cada cita, PMID y dato en un artículo sea real y verificable antes de la publicación. Si un paper no existe en PubMed o un dato de carrera no aparece en ProCyclingStats, no se publica.",
      en: "PedalSci's fact-checker. Confirms that every citation, PMID and claim in an article is real and verifiable before publication. If a paper isn't on PubMed or a race result isn't on ProCyclingStats, it doesn't get published.",
    },
    color: "#374151",
  },
  {
    name: { es: "Valentina Rosas", en: "Valentina Rosas" },
    role: { es: "Editora visual", en: "Visual editor" },
    specialty: {
      es: "Fotografía deportiva y edición visual",
      en: "Sports photography and visual editing",
    },
    bio: {
      es: "Editora visual de Velociencia. Selecciona y edita las imágenes de portada de cada artículo. Prioriza fotografía específica del corredor o evento cuando existe, y contexto visual relevante cuando no. Cuida que la imagen refuerce el tema del artículo.",
      en: "PedalSci's visual editor. Selects and edits the cover image for every article. Prioritises specific photography of the rider or event when available, and contextually relevant visuals otherwise. Ensures the image reinforces rather than contradicts the subject.",
    },
    color: "#374151",
  },
];

/** Return the full editorial team (Carmen, Rodrigo, Valentina) for a given locale. */
export function getEditorialTeam(locale: Locale = "es"): EditorialMemberInfo[] {
  return EDITORIAL_TEAM.map((m) => ({
    name: m.name[locale],
    role: m.role[locale],
    specialty: m.specialty[locale],
    bio: m.bio[locale],
    color: m.color,
  }));
}

const SECTION_COLORS: Record<SectionId, string> = {
  nutricion: "#0D9488",
  ciencia: "#7C3AED",
  entrenamiento: "#0891B2",
  competencia: "#E11D48",
};

function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Resolve an author by display name (accent/locale tolerant). */
export function getAuthorByName(name: string, locale: Locale = "es"): AuthorInfo | null {
  const target = normalizeName(name);
  for (const profile of AUTHOR_PROFILES) {
    const esName = SECTIONS_I18N.es[profile.sectionId].journalist;
    const enName = SECTIONS_I18N.en[profile.sectionId].journalist;
    if (normalizeName(esName) === target || normalizeName(enName) === target) {
      return toInfo(profile, locale);
    }
  }
  return null;
}

/** Resolve the canonical author for a section. */
export function getAuthorBySection(sectionId: SectionId, locale: Locale = "es"): AuthorInfo {
  const profile = AUTHOR_PROFILES.find((p) => p.sectionId === sectionId)!;
  return toInfo(profile, locale);
}

/** Resolve an author by their URL slug. Returns null if no match. */
export function getAuthorBySlug(slug: string, locale: Locale = "es"): AuthorInfo | null {
  const profile = AUTHOR_PROFILES.find((p) => p.slug === slug);
  return profile ? toInfo(profile, locale) : null;
}

/**
 * Return all authors ordered by the canonical SECTION_IDS order
 * (nutricion → ciencia → entrenamiento → competencia) for consistent display.
 */
export function getAllAuthors(locale: Locale = "es"): AuthorInfo[] {
  return SECTION_IDS.map((sectionId) => {
    const profile = AUTHOR_PROFILES.find((p) => p.sectionId === sectionId)!;
    return toInfo(profile, locale);
  });
}

function toInfo(profile: AuthorProfile, locale: Locale): AuthorInfo {
  return {
    name: SECTIONS_I18N[locale][profile.sectionId].journalist,
    slug: profile.slug,
    sectionId: profile.sectionId,
    specialty: profile.specialty[locale],
    bio: profile.bio[locale],
    color: SECTION_COLORS[profile.sectionId],
  };
}
