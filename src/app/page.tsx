import Link from "next/link";
import { SECTION_IDS, SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { getAllArticles } from "@/lib/markdown";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingBar } from "@/components/layout/trending-bar";
import { HeroSection } from "@/components/home/hero-section";
import { ArticleCard } from "@/components/articles/article-card";
import { MostRead } from "@/components/home/most-read";
import { AdUnit } from "@/components/ads/ad-unit";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const allArticles = getAllArticles(undefined, locale);

  // Slugs used in the hero (top 3 most recent) — exclude from sections
  const heroSlugs = new Set(allArticles.slice(0, 3).map((a) => a.slug));

  // Group articles by section, excluding hero articles
  const articlesBySection: Record<SectionId, typeof allArticles> = {
    nutricion: [],
    ciencia: [],
    entrenamiento: [],
    competencia: [],
  };

  for (const article of allArticles) {
    if (article.section in articlesBySection && !heroSlugs.has(article.slug)) {
      articlesBySection[article.section].push(article);
    }
  }

  // Sort sections by most recent article date
  const sortedSectionIds = [...SECTION_IDS].sort((a, b) => {
    const aDate = articlesBySection[a][0]?.date;
    const bDate = articlesBySection[b][0]?.date;
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });


  return (
    <>
      <Header />
      <TrendingBar />
      <main className="flex-1">
        {/* Hero — 3 most recent articles */}
        <HeroSection />

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-[var(--color-border)]" />
        </div>

        {/* By Section + Featured sidebar */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-10">
            {/* Main content: articles by section */}
            <div className="space-y-16 lg:col-span-3">
              {sortedSectionIds.map((sectionId) => {
                const section = SECTIONS[sectionId];
                const sectionI18n = SECTIONS_I18N[locale][sectionId];
                const sectionArticles = articlesBySection[sectionId].slice(0, 6);

                if (sectionArticles.length === 0) return null;

                const leadArticle = sectionArticles[0];
                const headlineArticles = sectionArticles.slice(1);

                return (
                  <div key={sectionId}>
                    {/* Section header with thick colored border */}
                    <div
                      className="mb-5 border-t-[6px] pt-4"
                      style={{ borderColor: section.color }}
                    >
                      <div className="flex items-baseline justify-between">
                        <h2
                          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: section.color }}
                        >
                          {sectionI18n.name}
                        </h2>
                        <Link
                          href={`/${sectionI18n.slug}`}
                          className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                        >
                          {dict.home.viewAll} &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Lead article + headline list */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Lead article with image */}
                      <ArticleCard
                        key={leadArticle.slug}
                        title={leadArticle.title}
                        excerpt={leadArticle.excerpt ?? ""}
                        date={leadArticle.date}
                        readingTime={leadArticle.readingTime}
                        slug={leadArticle.slug}
                        section={leadArticle.section}
                        coverImage={leadArticle.coverImage}
                        variant="standard"
                        author={sectionI18n.journalist}
                        authorColor={section.color}
                        locale={locale}
                        byLabel={dict.article.by}
                        minReadLabel={dict.article.minRead}
                        className="animate-fade-in-up stagger-1"
                      />

                      {/* Headline list */}
                      {headlineArticles.length > 0 && (
                        <div className="flex flex-col divide-y divide-[var(--color-border-light)] animate-fade-in-up stagger-2">
                          {headlineArticles.map((article) => (
                            <ArticleCard
                              key={article.slug}
                              title={article.title}
                              excerpt={article.excerpt ?? ""}
                              date={article.date}
                              readingTime={article.readingTime}
                              slug={article.slug}
                              section={article.section}
                              coverImage={article.coverImage}
                              variant="headline"
                              locale={locale}
                              minReadLabel={dict.article.minRead}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar: Most Read */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <MostRead
                  allArticles={allArticles}
                  label={dict.home.mostRead}
                  locale={locale}
                />

                {/* Ad: sidebar */}
                <AdUnit slot="5236372234" className="mt-8" />
              </div>
            </aside>
          </div>
        </section>

        {/* Editorial note */}
        <section className="border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                  {dict.home.editorialNote}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {locale === "es"
                    ? "Cada artículo es investigado, redactado y verificado utilizando modelos de lenguaje avanzados con fuentes científicas reales. Contenido impulsado por inteligencia artificial, revisado con rigor."
                    : "Every article is researched, written and verified using advanced language models with real scientific sources. Content powered by artificial intelligence, reviewed with rigor."}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
