import { type NextRequest } from "next/server";
import { getAllArticles } from "@/lib/markdown";
import { SECTIONS_I18N, SITE_NAME_I18N, SITE_DESCRIPTION_I18N } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

const RSS_LIMIT = 50;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssFeed(locale: Locale): string {
  const siteUrl = locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const siteName = SITE_NAME_I18N[locale];
  const siteDescription = SITE_DESCRIPTION_I18N[locale];

  const articles = getAllArticles(undefined, locale).slice(0, RSS_LIMIT);

  const items = articles
    .map((article) => {
      const sectionSlug = SECTIONS_I18N[locale][article.section].slug;
      const articleUrl = `${siteUrl}/${sectionSlug}/${article.slug}`;
      const pubDate = new Date(article.date).toUTCString();
      const title = escapeXml(article.title);
      const description = escapeXml(article.excerpt ?? article.title);
      const author = escapeXml(article.author);
      const tags = (article.tags ?? [])
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      const image = article.coverImage
        ? `      <enclosure url="${escapeXml(article.coverImage)}" type="image/jpeg" length="0" />`
        : "";

      return `    <item>
      <title>${title}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
${tags}
${image}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>${locale === "en" ? "en-us" : "es-cl"}</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>${escapeXml(siteName)}</generator>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;
}

export async function GET(request: NextRequest) {
  // Detect locale from x-locale header (set by middleware for both domains)
  const xLocale = request.headers.get("x-locale");
  const locale: Locale = xLocale === "en" ? "en" : "es";

  try {
    const feed = buildRssFeed(locale);
    return new Response(feed, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[rss.xml] Failed to build RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
