import { getAllArticles } from "@/lib/markdown";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TrendingBarClient } from "@/components/layout/trending-bar-client";
import type { Locale } from "@/lib/i18n";

export interface TrendingArticle {
  slug: string;
  title: string;
  section: SectionId;
  sectionName: string;
  sectionColor: string;
  href: string;
}

function buildArticles(
  articles: ReturnType<typeof getAllArticles>,
  locale: Locale
): TrendingArticle[] {
  return articles.map((article) => {
    const sectionI18n = SECTIONS_I18N[locale][article.section as SectionId];
    const sectionStyle = SECTIONS[article.section as SectionId];
    return {
      slug: article.slug,
      title: article.title,
      section: article.section as SectionId,
      sectionName: sectionI18n.name,
      sectionColor: sectionStyle.color,
      href: `/${sectionI18n.slug}/${article.slug}`,
    };
  });
}

export async function TrendingBar() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  // Fallback: 5 most recent articles
  const recentArticles = getAllArticles(undefined, locale).slice(0, 5);
  const fallback = buildArticles(recentArticles, locale);

  // All articles (for view-count matching) — limit to reasonable window
  const allArticles = buildArticles(
    getAllArticles(undefined, locale).slice(0, 200),
    locale
  );

  return (
    <TrendingBarClient
      fallback={fallback}
      allArticles={allArticles}
      labelLatest={dict.trending.latest}
      labelNow={dict.trending.now}
    />
  );
}
