import { ArticleCard } from "@/components/articles/article-card";
import { SECTIONS, type SectionId } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

interface ArticleData {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  slug: string;
  section: SectionId;
  coverImage?: string;
}

interface ArticleGridProps {
  articles: ArticleData[];
  locale?: Locale;
  byLabel?: string;
  minReadLabel?: string;
}

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3"] as const;

export function ArticleGrid({
  articles,
  locale = "es",
  byLabel,
  minReadLabel,
}: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <p className="font-serif text-2xl italic text-[var(--color-text-muted)]">
          Los artículos aparecerán aquí pronto.
        </p>
        <div className="mt-4 h-[1px] w-16 bg-[var(--color-border)]" />
      </div>
    );
  }

  const [hero, ...rest] = articles;

  return (
    <div className="space-y-8">
      {/* Hero article: full width, overlay layout */}
      {hero && (
        <ArticleCard
          key={`${hero.section}-${hero.slug}`}
          {...hero}
          variant="hero"
          author={SECTIONS[hero.section].journalist}
          authorColor={SECTIONS[hero.section].color}
          locale={locale}
          byLabel={byLabel}
          minReadLabel={minReadLabel}
          className="animate-fade-in-up"
        />
      )}

      {/* Remaining articles in 3-column grid with stagger */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, i) => (
            <ArticleCard
              key={`${article.section}-${article.slug}`}
              {...article}
              variant="standard"
              author={SECTIONS[article.section].journalist}
              authorColor={SECTIONS[article.section].color}
              locale={locale}
              byLabel={byLabel}
              minReadLabel={minReadLabel}
              className={`animate-fade-in-up ${staggerClasses[i % 3]}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
