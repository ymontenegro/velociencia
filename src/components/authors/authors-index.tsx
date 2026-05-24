import Link from "next/link";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import type { AuthorInfo } from "@/lib/authors";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n";

interface AuthorWithCount extends AuthorInfo {
  articleCount: number;
}

interface AuthorsIndexProps {
  authors: AuthorWithCount[];
  dict: Dictionary;
  locale: Locale;
}

export function AuthorsIndex({ authors, dict, locale }: AuthorsIndexProps) {
  const authorBase = locale === "en" ? "author" : "autor";

  return (
    <div>
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {dict.authors.title}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {dict.authors.title}
          </h1>
          <div className="mt-4 h-[2px] w-12 bg-[var(--color-border)]" />
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            {dict.authors.subtitle}
          </p>
        </div>
      </div>

      {/* Authors grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {authors.map((author) => {
            const sectionConfig = SECTIONS[author.sectionId];
            const sectionI18n = SECTIONS_I18N[locale][author.sectionId];
            const countLabel =
              author.articleCount === 1
                ? `1 ${dict.authors.articleCount}`
                : `${author.articleCount} ${dict.authors.articlesCount}`;

            return (
              <Link
                key={author.slug}
                href={`/${authorBase}/${author.slug}`}
                className="group flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-200 hover:border-[var(--color-text-muted)] hover:shadow-sm"
              >
                {/* Section accent rule */}
                <div
                  className="mb-5 h-[3px] w-10 rounded-full transition-all duration-200 group-hover:w-14"
                  style={{ backgroundColor: sectionConfig.color }}
                />

                {/* Avatar */}
                <AuthorAvatar name={author.name} color={author.color} size="lg" />

                {/* Name + specialty */}
                <p className="mt-4 font-serif text-lg font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-text)]">
                  {author.name}
                </p>
                <p
                  className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: sectionConfig.color }}
                >
                  {sectionI18n.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {author.specialty}
                </p>

                {/* Article count */}
                <p className="mt-auto pt-4 text-[11px] font-medium text-[var(--color-text-muted)]">
                  {countLabel}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
