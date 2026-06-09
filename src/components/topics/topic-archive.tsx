import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { ArticleCard } from "@/components/articles/article-card";
import type { TagInfo } from "@/lib/tags";
import type { ArticleCard as ArticleCardType } from "@/types/article";
import type { Locale } from "@/lib/i18n";

interface TopicArchiveProps {
  tag: TagInfo;
  articles: ArticleCardType[];
  locale: Locale;
}

export async function TopicArchive({ tag, articles, locale }: TopicArchiveProps) {
  const dict = await getDictionary(locale);
  const base = locale === "en" ? "topic" : "tema";

  const countLabel =
    tag.count === 1
      ? `1 ${dict.topics.articleCount}`
      : `${tag.count} ${dict.topics.articlesCount}`;

  return (
    <div>
      {/* ── HUD header ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        {/* Faint telemetry grid */}
        <div
          className="tool-scope tool-grid-bg pointer-events-none absolute inset-0 opacity-25"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Eyebrow with live dot — telemetry signal */}
          <div className="flex items-center gap-2">
            <span
              className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.topics.topic}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            {tag.tag}
          </h1>

          {/* Accent rule */}
          <div className="mt-4 h-[2px] w-8 bg-[var(--color-border)]" />

          {/* Descriptive line — count as mono readout */}
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            {dict.topics.articlesAbout}{" "}
            <span className="font-semibold text-[var(--color-text)]">{tag.tag}</span>
            {" — "}
            <span className="font-mono text-[var(--color-text-muted)]">{countLabel}</span>
          </p>
        </div>
      </div>

      {/* ── Articles grid ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {articles.length === 0 ? (
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {dict.topics.notFound}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => {
              const sectionConfig = SECTIONS[article.section];
              const journalist = SECTIONS_I18N[locale][article.section].journalist;
              const stagger = i < 3 ? `stagger-${i + 1}` : "";
              return (
                <ArticleCard
                  key={`${article.section}-${article.slug}`}
                  title={article.title}
                  excerpt={article.excerpt ?? ""}
                  date={article.date}
                  readingTime={article.readingTime}
                  slug={article.slug}
                  section={article.section}
                  coverImage={article.coverImage}
                  tags={article.tags}
                  variant="standard"
                  author={journalist}
                  authorColor={sectionConfig.color}
                  locale={locale}
                  byLabel={dict.article.by}
                  minReadLabel={dict.article.minRead}
                  className={`animate-fade-in-up ${stagger}`.trim()}
                />
              );
            })}
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 border-t border-[var(--color-border-light)] pt-8">
          <Link
            href={`/${base}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            {dict.topics.backToTopics}
          </Link>
        </div>
      </div>
    </div>
  );
}
