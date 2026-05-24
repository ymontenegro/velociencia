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
];

export function getAllTools(): ToolInfo[] {
  return TOOLS;
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
