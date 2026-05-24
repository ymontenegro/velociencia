import Link from "next/link";
import { getAuthorByName } from "@/lib/authors";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import type { Locale } from "@/lib/i18n";

interface AuthorBioProps {
  authorName: string;
  locale: Locale;
  color?: string;
  label: string;
  /** When provided, renders a "View all articles by {name}" link to the author page. */
  viewAllLabel?: string;
}

export function AuthorBio({ authorName, locale, color, label, viewAllLabel }: AuthorBioProps) {
  const author = getAuthorByName(authorName, locale);
  if (!author) return null;

  const accentColor = color ?? author.color;
  const authorBase = locale === "en" ? "author" : "autor";

  return (
    <section className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
        {/* Section label */}
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: accentColor }}
        >
          {label}
        </p>

        {/* Color divider */}
        <div className="mt-1 h-[2px] w-8" style={{ backgroundColor: accentColor }} />

        {/* Author row */}
        <div className="mt-5 flex items-start gap-4">
          <AuthorAvatar name={author.name} color={accentColor} size="md" />

          <div className="min-w-0 flex-1">
            <p className="font-serif text-base font-bold text-[var(--color-text)]">
              {author.name}
            </p>
            <p
              className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: accentColor }}
            >
              {author.specialty}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {author.bio}
            </p>

            {viewAllLabel && (
              <Link
                href={`/${authorBase}/${author.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
                style={{ color: accentColor }}
              >
                {viewAllLabel} {author.name}
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
