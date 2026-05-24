import { SECTIONS_I18N, SECTION_IDS, type SectionId } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

/**
 * Editorial author profiles. The names are AI editorial identities (see the
 * About page), one per section. Used for author bio blocks on articles.
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
      es: "Cubre alimentación, hidratación y suplementación para ciclistas, siempre a partir de estudios revisados por pares. Traduce la literatura en pautas concretas para entrenar y competir.",
      en: "Covers fueling, hydration and supplementation for cyclists, always grounded in peer-reviewed research. Turns the literature into concrete guidance for training and racing.",
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
      es: "Explica la investigación científica aplicada al rendimiento: VO₂max, umbrales, cinética del oxígeno y metabolismo. Rigor de laboratorio en lenguaje claro.",
      en: "Explains the science behind performance: VO₂max, thresholds, oxygen kinetics and metabolism. Lab-grade rigor in plain language.",
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
      es: "Ex-ciclista reconvertido en periodista. Analiza periodización, intervalos y las tendencias que llegan del pelotón profesional al ciclista de a pie.",
      en: "A former racer turned journalist. Breaks down periodization, intervals and the trends moving from the pro peloton to the everyday cyclist.",
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
      es: "Periodista deportivo chileno. Sigue el pelotón profesional: grandes vueltas, monumentos y la táctica que define cada carrera.",
      en: "Chilean sports journalist. Follows the professional peloton: grand tours, monuments and the tactics that decide every race.",
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
