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
import { getToolBySlug, toolHref } from "@/lib/tools";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { IMAGES } from "@/lib/images";

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
  return {
    title: dict.tools.indexTitle,
    description: dict.tools.indexSubtitle,
  };
}
