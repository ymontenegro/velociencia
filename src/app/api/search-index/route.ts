import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/markdown";
import { SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { getLocalFromHost, type Locale } from "@/lib/i18n";

/**
 * Lightweight client-side search index for the ⌘K command palette.
 * Returns every article for the requested locale with the fields needed to
 * match and link. Proxy doesn't run on /api routes, so locale comes from the
 * ?locale query param (set by the client) with a Host header fallback.
 */
export async function GET(req: NextRequest) {
  try {
    const queryLocale = req.nextUrl.searchParams.get("locale");
    const locale: Locale =
      queryLocale === "en" || queryLocale === "es"
        ? queryLocale
        : getLocalFromHost(req.headers.get("host") ?? "");

    const articles = getAllArticles(undefined, locale).map((a) => {
      const sectionI18n = SECTIONS_I18N[locale][a.section as SectionId];
      return {
        title: a.title,
        subtitle: a.subtitle ?? "",
        excerpt: a.excerpt ?? "",
        slug: a.slug,
        section: a.section,
        sectionName: sectionI18n.name,
        sectionSlug: sectionI18n.slug,
        author: a.author,
        tags: a.tags ?? [],
      };
    });

    return NextResponse.json(articles, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
