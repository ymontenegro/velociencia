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
