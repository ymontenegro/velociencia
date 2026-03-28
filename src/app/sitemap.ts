import type { MetadataRoute } from "next";
import { SECTION_IDS, SECTIONS_I18N } from "@/lib/constants";
import { getAllArticles } from "@/lib/markdown";

const ES_BASE = "https://velociencia.cl";
const EN_BASE = "https://pedalsci.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: ES_BASE,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
    alternates: {
      languages: { es: ES_BASE, en: EN_BASE },
    },
  });

  // Section pages
  for (const sectionId of SECTION_IDS) {
    const esSlug = SECTIONS_I18N.es[sectionId].slug;
    const enSlug = SECTIONS_I18N.en[sectionId].slug;
    entries.push({
      url: `${ES_BASE}/${esSlug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${ES_BASE}/${esSlug}`,
          en: `${EN_BASE}/${enSlug}`,
        },
      },
    });
  }

  // Articles (ES)
  const esArticles = getAllArticles(undefined, "es");
  for (const article of esArticles) {
    const esSlug = SECTIONS_I18N.es[article.section].slug;
    entries.push({
      url: `${ES_BASE}/${esSlug}/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Articles (EN)
  const enArticles = getAllArticles(undefined, "en");
  for (const article of enArticles) {
    const enSlug = SECTIONS_I18N.en[article.section].slug;
    entries.push({
      url: `${EN_BASE}/${enSlug}/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Static pages
  entries.push({
    url: `${ES_BASE}/privacidad`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: {
      languages: {
        es: `${ES_BASE}/privacidad`,
        en: `${EN_BASE}/privacy`,
      },
    },
  });

  return entries;
}
