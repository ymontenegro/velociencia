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

  // Featured: skip the 3 hero articles to avoid repetition
  const featured = allArticles.slice(3, 8);

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
              {SECTION_IDS.map((sectionId) => {
                const section = SECTIONS[sectionId];
                const sectionI18n = SECTIONS_I18N[locale][sectionId];
                const sectionArticles = articlesBySection[sectionId].slice(0, 3);

                if (sectionArticles.length === 0) return null;

                return (
                  <div key={sectionId}>
                    {/* Section header with thick colored border */}
                    <div
                      className="mb-6 border-t-[6px] pt-4"
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

                    {/* Articles grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {sectionArticles.map((article, i) => (
                        <ArticleCard
                          key={article.slug}
                          title={article.title}
                          excerpt={article.excerpt ?? ""}
                          date={article.date}
                          readingTime={article.readingTime}
                          slug={article.slug}
                          section={article.section}
                          coverImage={article.coverImage}
                          variant="standard"
                          author={sectionI18n.journalist}
                          authorColor={section.color}
                          locale={locale}
                          byLabel={dict.article.by}
                          minReadLabel={dict.article.minRead}
                          className={`animate-fade-in-up stagger-${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar: Featured */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="mb-6 border-t-[6px] border-[var(--color-text)] pt-4">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {dict.home.featured}
                  </h2>
                </div>

                <div className="space-y-1">
                  {featured.map((article, i) => (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      excerpt={article.excerpt ?? ""}
                      date={article.date}
                      readingTime={article.readingTime}
                      slug={article.slug}
                      section={article.section}
                      coverImage={article.coverImage}
                      variant="compact"
                      index={i}
                      locale={locale}
                    />
                  ))}
                </div>
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
