import Link from "next/link";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { ArticleCard } from "@/components/articles/article-card";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import type { AuthorInfo } from "@/lib/authors";
import type { ArticleCard as ArticleCardType } from "@/types/article";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n";

interface AuthorArchiveProps {
  author: AuthorInfo;
  articles: ArticleCardType[];
  dict: Dictionary;
  locale: Locale;
}

export function AuthorArchive({ author, articles, dict, locale }: AuthorArchiveProps) {
  const authorBase = locale === "en" ? "author" : "autor";
  const sectionConfig = SECTIONS[author.sectionId];
  const sectionI18n = SECTIONS_I18N[locale][author.sectionId];

  const countLabel =
    articles.length === 1
      ? `1 ${dict.authors.articleCount}`
      : `${articles.length} ${dict.authors.articlesCount}`;

  return (
    <div>
      {/* ── HUD header ──────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-card)]"
        /* Section-scoped accent drives the grid tint */
        style={{ "--tool-accent": sectionConfig.color } as React.CSSProperties}
      >
        {/* Faint telemetry grid tinted by section color */}
        <div
          className="tool-scope tool-grid-bg pointer-events-none absolute inset-0 opacity-30"
          style={{
            "--tool-accent": sectionConfig.color,
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
          } as React.CSSProperties}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Section eyebrow — mono + section-dot */}
          <div className="flex items-center gap-2">
            <span
              className="section-dot flex-shrink-0"
              style={{ backgroundColor: sectionConfig.color }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[9px] font-medium uppercase tracking-[0.22em]"
              style={{ color: sectionConfig.color }}
            >
              {dict.authors.sectionLabel} · {sectionI18n.name}
            </span>
          </div>

          {/* Avatar + name row */}
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <AuthorAvatar name={author.name} color={author.color} size="lg" />
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
                {author.name}
              </h1>
              {/* Specialty — mono readout */}
              <p
                className="mt-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em]"
                style={{ color: sectionConfig.color }}
              >
                {dict.authors.specialtyLabel} · {author.specialty}
              </p>
            </div>
          </div>

          {/* Section accent rule */}
          <div
            className="mt-5 h-[2px] w-12"
            style={{ backgroundColor: sectionConfig.color }}
          />

          {/* Bio */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            {author.bio}
          </p>

          {/* Article count — mono readout with live dot */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: sectionConfig.color }}
              aria-hidden="true"
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {countLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Articles grid ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Grid heading — mono with section color accent */}
        <div
          className="mb-8 border-t-[3px] pt-4"
          style={{ borderColor: sectionConfig.color }}
        >
          <h2
            className="font-mono text-[9px] font-medium uppercase tracking-[0.22em]"
            style={{ color: sectionConfig.color }}
          >
            {dict.authors.articlesBy} {author.name}
          </h2>
        </div>

        {articles.length === 0 ? (
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {dict.authors.notFound}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => {
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
            href={`/${authorBase}`}
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
            {dict.authors.allColumnists}
          </Link>
        </div>
      </div>
    </div>
  );
}
