import { getAllArticles } from "@/lib/markdown";
import { ArticleCard } from "@/components/articles/article-card";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function HeroSection() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const articles = getAllArticles(undefined, locale);
  const featured = articles.slice(0, 3);

  if (featured.length === 0) {
    return (
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl font-bold tracking-[0.06em] uppercase text-[var(--color-text)] sm:text-7xl lg:text-8xl">
            {dict.siteName}
          </h1>
          <div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <span
              className="inline-block h-[2px] w-10 rounded-full"
              style={{ backgroundColor: "var(--color-nutricion)" }}
            />
            <span
              className="inline-block h-[2px] w-10 rounded-full"
              style={{ backgroundColor: "var(--color-ciencia)" }}
            />
            <span
              className="inline-block h-[2px] w-10 rounded-full"
              style={{ backgroundColor: "var(--color-entrenamiento)" }}
            />
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm text-[var(--color-text-muted)]">
            {dict.home.comingSoon}
          </p>
        </div>
      </section>
    );
  }

  const heroArticle = featured[0];
  const sideArticles = featured.slice(1);

  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Section label */}
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          {dict.home.latest}
        </p>

        {/* Article grid: 2/3 hero + 1/3 stacked */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {/* Main hero article */}
          <div className="lg:col-span-2">
            <ArticleCard
              title={heroArticle.title}
              excerpt={heroArticle.excerpt ?? ""}
              date={heroArticle.date}
              readingTime={heroArticle.readingTime}
              slug={heroArticle.slug}
              section={heroArticle.section}
              coverImage={heroArticle.coverImage}
              variant="hero"
              author={SECTIONS_I18N[locale][heroArticle.section as SectionId].journalist}
              authorColor={SECTIONS[heroArticle.section as SectionId].color}
              locale={locale}
              byLabel={dict.article.by}
              minReadLabel={dict.article.minRead}
            />
          </div>

          {/* Side articles */}
          <div className="flex h-full flex-col gap-4 lg:gap-6">
            {sideArticles.map((article) => (
              <div key={article.slug} className="flex-1">
                <ArticleCard
                  title={article.title}
                  excerpt={article.excerpt ?? ""}
                  date={article.date}
                  readingTime={article.readingTime}
                  slug={article.slug}
                  section={article.section}
                  coverImage={article.coverImage}
                  variant="standard"
                  author={SECTIONS_I18N[locale][article.section as SectionId].journalist}
                  authorColor={SECTIONS[article.section as SectionId].color}
                  locale={locale}
                  byLabel={dict.article.by}
                  minReadLabel={dict.article.minRead}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
