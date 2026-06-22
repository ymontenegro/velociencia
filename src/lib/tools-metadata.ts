/**
 * Metadata helpers shared by the /tools/[tool] (EN) and
 * /herramientas/[tool] (ES) route pages.
 *
 * buildToolMetadata   — detail page (with alternates.languages, OG image, twitter)
 * buildToolsIndexMetadata — index page (/tools or /herramientas)
 *
 * Neither function calls getLocale() — locale is resolved by the page route
 * (where next/headers is already available) and passed in as a parameter.
 * This keeps the module importable from both server and edge contexts.
 */

import type { Locale } from "@/lib/i18n";
import { getSiteUrl, getOtherLocale } from "@/lib/i18n";
import { getToolBySlug, getToolById, toolHref, toolsIndexHref } from "@/lib/tools";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { IMAGES } from "@/lib/images";
import { getClimbById, fietsIndex } from "@/lib/datasets/climbs";

// ---------------------------------------------------------------------------
// Tool detail page metadata
// ---------------------------------------------------------------------------

/**
 * Returns the full Next.js metadata object for a tool detail page.
 *
 * Adds:
 * - alternates.canonical  — locale-appropriate canonical URL
 * - alternates.languages  — hreflang pair (es / en / x-default)
 * - openGraph.images      — section hero image (1600×600 Unsplash)
 * - twitter               — summary_large_image card
 */
export function buildToolMetadata(toolSlug: string, locale: Locale) {
  const tool = getToolBySlug(toolSlug, locale);
  if (!tool) return {};

  const siteUrl = getSiteUrl(locale);
  const canonical = `${siteUrl}${toolHref(tool, locale)}`;

  const otherLocale = getOtherLocale(locale);
  const otherUrl = `${getSiteUrl(otherLocale)}${toolHref(tool, otherLocale)}`;

  const esUrl = locale === "es" ? canonical : otherUrl;
  const enUrl = locale === "en" ? canonical : otherUrl;

  // Re-use the section hero image (1600×600 Unsplash CDN) as the OG image.
  // Crawlers accept any landscape image — exact 1200×630 is preferred but not required.
  const ogImageUrl = IMAGES.sections[tool.sectionId].primary;

  return {
    title: tool.title[locale],
    description: tool.description[locale],
    alternates: {
      canonical,
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    },
    openGraph: {
      title: tool.title[locale],
      description: tool.description[locale],
      url: canonical,
      images: [{ url: ogImageUrl, width: 1600, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title[locale],
      description: tool.description[locale],
      images: [ogImageUrl],
    },
  };
}

// ---------------------------------------------------------------------------
// Tools index page metadata
// ---------------------------------------------------------------------------

/**
 * Returns the metadata for the tools/herramientas index page.
 * Async because it needs the i18n dictionary.
 */
export async function buildToolsIndexMetadata(locale: Locale) {
  const dict = await getDictionary(locale);
  // Keyword-first <title>/description for SEO; the visible H1 keeps indexTitle.
  return {
    title: dict.tools.indexMetaTitle,
    description: dict.tools.indexMetaDescription,
  };
}

// ---------------------------------------------------------------------------
// Data index page metadata  (/datos ES  /data EN)
// ---------------------------------------------------------------------------

/**
 * Returns the full Next.js metadata object for the /datos (ES) and /data (EN)
 * index pages, including hreflang pair and canonical URL.
 */
export async function buildDataIndexMetadata(locale: Locale) {
  const dict = await getDictionary(locale);
  const siteUrl = getSiteUrl(locale);
  const otherLocale = getOtherLocale(locale);
  const otherSiteUrl = getSiteUrl(otherLocale);

  const canonical = `${siteUrl}${toolsIndexHref(locale, "dataset")}`;
  const esUrl =
    locale === "es"
      ? canonical
      : `${otherSiteUrl}${toolsIndexHref("es", "dataset")}`;
  const enUrl =
    locale === "en"
      ? canonical
      : `${otherSiteUrl}${toolsIndexHref("en", "dataset")}`;

  return {
    // Keyword-first <title>/description for SEO; the visible H1 keeps dataIndexTitle.
    title: dict.tools.dataIndexMetaTitle,
    description: dict.tools.dataIndexMetaDescription,
    alternates: {
      canonical,
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Climb detail page metadata  (/datos/puertos/<id> ES  /data/climbs/<id> EN)
// ---------------------------------------------------------------------------

/**
 * Returns the Next.js metadata object for a single-climb detail page.
 *
 * Title/description are keyword-first ("<name>: perfil, pendiente media…") to
 * match the long-tail intent that lives behind each climb ("alpe d'huez
 * pendiente media", "alpe d'huez profile"). Returns {} when the id is unknown
 * so the route can 404.
 */
export function buildClimbMetadata(climbId: string, locale: Locale) {
  const climb = getClimbById(climbId);
  const tool = getToolById("climbs-database");
  if (!climb || !tool) return {};

  const esUrl = `${getSiteUrl("es")}${toolHref(tool, "es")}/${climb.id}`;
  const enUrl = `${getSiteUrl("en")}${toolHref(tool, "en")}/${climb.id}`;
  const canonical = locale === "es" ? esUrl : enUrl;

  const region = climb.region[locale];
  const fiets = fietsIndex(climb).toFixed(1);

  const title =
    locale === "es"
      ? `${climb.name}: perfil, pendiente media y datos del puerto`
      : `${climb.name}: profile, average gradient and climb data`;

  const description =
    locale === "es"
      ? `${climb.name} (${region}): ${climb.length_km} km al ${climb.avg_gradient}% de media, ${climb.elevation_gain_m} m de desnivel, cima a ${climb.summit_elevation_m} m e índice FIETS ${fiets}. Perfil de altitud calculado desde el modelo digital de elevación SRTM.`
      : `${climb.name} (${region}): ${climb.length_km} km at ${climb.avg_gradient}% average, ${climb.elevation_gain_m} m of gain, summit at ${climb.summit_elevation_m} m and a FIETS index of ${fiets}. Elevation profile computed from the SRTM digital elevation model.`;

  const ogImageUrl = IMAGES.sections[tool.sectionId].primary;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: ogImageUrl, width: 1600, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
