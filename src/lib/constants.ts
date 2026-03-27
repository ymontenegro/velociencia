import type { Locale } from "@/lib/i18n";

export const SECTIONS = {
  nutricion: {
    id: "nutricion",
    name: "Nutrición",
    description: "Alimentación, hidratación y suplementación para ciclistas",
    color: "#0D9488",
    colorVar: "--color-nutricion",
    icon: "🥗",
    slug: "nutricion",
    journalist: "Martín Velasco",
  },
  ciencia: {
    id: "ciencia",
    name: "Ciencia",
    description: "Investigación científica aplicada al ciclismo",
    color: "#7C3AED",
    colorVar: "--color-ciencia",
    icon: "🔬",
    slug: "ciencia",
    journalist: "Sofía Müller",
  },
  entrenamiento: {
    id: "entrenamiento",
    name: "Entrenamiento",
    description: "Metodologías, planes y tendencias de entrenamiento",
    color: "#D97706",
    colorVar: "--color-entrenamiento",
    icon: "🚴",
    slug: "entrenamiento",
    journalist: "Tomás Herrera",
  },
  competencia: {
    id: "competencia",
    name: "Competencia",
    description: "Grandes vueltas, clásicas, monumentos y el pelotón profesional",
    color: "#E11D48",
    colorVar: "--color-competencia",
    icon: "🏆",
    slug: "competencia",
    journalist: "Diego Araya",
  },
} as const;

export type SectionId = keyof typeof SECTIONS;
export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

export const SITE_NAME = "Velociencia";
export const SITE_DESCRIPTION =
  "Ciclismo basado en ciencia: nutrición, fisiología y entrenamiento";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// --- i18n support ---

export const SECTIONS_I18N: Record<Locale, Record<SectionId, { name: string; description: string; slug: string; journalist: string }>> = {
  es: {
    nutricion: { name: "Nutrición", description: "Alimentación, hidratación y suplementación para ciclistas", slug: "nutricion", journalist: "Martín Velasco" },
    ciencia: { name: "Ciencia", description: "Investigación científica aplicada al ciclismo", slug: "ciencia", journalist: "Sofía Müller" },
    entrenamiento: { name: "Entrenamiento", description: "Metodologías, planes y tendencias de entrenamiento", slug: "entrenamiento", journalist: "Tomás Herrera" },
    competencia: { name: "Competencia", description: "Grandes vueltas, clásicas, monumentos y el pelotón profesional", slug: "competencia", journalist: "Diego Araya" },
  },
  en: {
    nutricion: { name: "Nutrition", description: "Nutrition, hydration and supplementation for cyclists", slug: "nutrition", journalist: "Martin Velasco" },
    ciencia: { name: "Science", description: "Scientific research applied to cycling", slug: "science", journalist: "Sofia Muller" },
    entrenamiento: { name: "Training", description: "Training methodologies, plans and trends", slug: "training", journalist: "Tomas Herrera" },
    competencia: { name: "Competition", description: "Grand tours, classics, monuments and the professional peloton", slug: "competition", journalist: "Diego Araya" },
  },
};

export const SITE_NAME_I18N: Record<Locale, string> = { es: "Velociencia", en: "PedalSci" };
export const SITE_DESCRIPTION_I18N: Record<Locale, string> = {
  es: "Ciclismo basado en ciencia: nutrición, fisiología y entrenamiento",
  en: "Science-based cycling: nutrition, physiology and training",
};

export function getSectionBySlug(slug: string, locale: Locale): { sectionId: SectionId; section: typeof SECTIONS_I18N["es"]["nutricion"] } | null {
  const sections = SECTIONS_I18N[locale];
  for (const [id, section] of Object.entries(sections)) {
    if (section.slug === slug) {
      return { sectionId: id as SectionId, section };
    }
  }
  return null;
}

export function getSectionSlug(sectionId: SectionId, locale: Locale): string {
  return SECTIONS_I18N[locale][sectionId].slug;
}
