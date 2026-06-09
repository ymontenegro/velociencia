import type { MetadataRoute } from "next";
import { SECTION_IDS, SECTIONS_I18N } from "@/lib/constants";
import { getAllArticles } from "@/lib/markdown";
import { getAllTools } from "@/lib/tools";

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

  // Articles (ES) — include hreflang alternate for EN pair when translationOf is set
  const esArticles = getAllArticles(undefined, "es");
  for (const article of esArticles) {
    const esSectionSlug = SECTIONS_I18N.es[article.section].slug;
    const enSectionSlug = SECTIONS_I18N.en[article.section].slug;
    const esUrl = `${ES_BASE}/${esSectionSlug}/${article.slug}`;
    entries.push({
      url: esUrl,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      ...(article.translationOf && {
        alternates: {
          languages: {
            es: esUrl,
            en: `${EN_BASE}/${enSectionSlug}/${article.translationOf}`,
          },
        },
      }),
    });
  }

  // Articles (EN) — include hreflang alternate for ES pair when translationOf is set
  const enArticles = getAllArticles(undefined, "en");
  for (const article of enArticles) {
    const esSectionSlug = SECTIONS_I18N.es[article.section].slug;
    const enSectionSlug = SECTIONS_I18N.en[article.section].slug;
    const enUrl = `${EN_BASE}/${enSectionSlug}/${article.slug}`;
    entries.push({
      url: enUrl,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      ...(article.translationOf && {
        alternates: {
          languages: {
            es: `${ES_BASE}/${esSectionSlug}/${article.translationOf}`,
            en: enUrl,
          },
        },
      }),
    });
  }

  // Tools — one entry per ES URL and one per EN URL, each with hreflang alternates
  const tools = getAllTools();
  for (const tool of tools) {
    const esUrl = `${ES_BASE}/herramientas/${tool.slug.es}`;
    const enUrl = `${EN_BASE}/tools/${tool.slug.en}`;
    // ES entry
    entries.push({
      url: esUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          es: esUrl,
          en: enUrl,
        },
      },
    });
    // EN entry
    entries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          es: esUrl,
          en: enUrl,
        },
      },
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

  entries.push({
    url: `${ES_BASE}/terminos`,
    lastModified: new Date("2026-04-01"),
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: {
      languages: {
        es: `${ES_BASE}/terminos`,
        en: `${EN_BASE}/terms`,
      },
    },
  });

  entries.push({
    url: `${ES_BASE}/divulgacion`,
    lastModified: new Date("2026-05-30"),
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: {
      languages: {
        es: `${ES_BASE}/divulgacion`,
        en: `${EN_BASE}/disclosure`,
      },
    },
  });

  return entries;
}
