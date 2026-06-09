import Link from "next/link";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import type { AuthorInfo, EditorialMemberInfo } from "@/lib/authors";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n";

interface AuthorWithCount extends AuthorInfo {
  articleCount: number;
}

interface AuthorsIndexProps {
  authors: AuthorWithCount[];
  editorialTeam: EditorialMemberInfo[];
  dict: Dictionary;
  locale: Locale;
}

export function AuthorsIndex({ authors, editorialTeam, dict, locale }: AuthorsIndexProps) {
  const authorBase = locale === "en" ? "author" : "autor";

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
          {/* Eyebrow with live dot */}
          <div className="flex items-center gap-2">
            <span
              className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.authors.title}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {dict.authors.title}
          </h1>

          {/* Accent rule */}
          <div className="mt-4 h-[2px] w-8 bg-[var(--color-border)]" />

          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            {dict.authors.subtitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* ── Section bylines ──────────────────────────────────────────── */}
        <section>
          <div className="mb-8 border-t-[3px] border-[var(--color-text)] pt-4">
            <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.authors.bylineAuthors}
            </h2>
          </div>

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
                  {/* Section accent rule — expands on hover */}
                  <div
                    className="mb-5 h-[3px] rounded-full transition-all duration-200 group-hover:w-14"
                    style={{ backgroundColor: sectionConfig.color, width: "2.5rem" }}
                  />

                  {/* Avatar */}
                  <AuthorAvatar name={author.name} color={author.color} size="lg" />

                  {/* Name */}
                  <p className="mt-4 font-serif text-lg font-bold leading-snug text-[var(--color-text)]">
                    {author.name}
                  </p>

                  {/* Section name — mono + section-dot */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className="section-dot flex-shrink-0"
                      style={{ backgroundColor: sectionConfig.color }}
                      aria-hidden="true"
                    />
                    <p
                      className="font-mono text-[9px] font-medium uppercase tracking-[0.16em]"
                      style={{ color: sectionConfig.color }}
                    >
                      {sectionI18n.name}
                    </p>
                  </div>

                  {/* Specialty */}
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {author.specialty}
                  </p>

                  {/* Article count — mono readout */}
                  <p className="mt-auto pt-4 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {countLabel}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Editorial team ───────────────────────────────────────────── */}
        <section>
          <div className="mb-8 border-t-[3px] border-[var(--color-text)] pt-4">
            <h2 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.authors.editorialTeam}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editorialTeam.map((member) => (
              <div
                key={member.name}
                className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
              >
                {/* Neutral accent rule */}
                <div className="mb-5 h-[3px] w-10 rounded-full bg-[var(--color-border)]" />

                {/* Avatar */}
                <AuthorAvatar name={member.name} color={member.color} size="lg" />

                {/* Name */}
                <p className="mt-4 font-serif text-lg font-bold leading-snug text-[var(--color-text)]">
                  {member.name}
                </p>

                {/* Role — mono label */}
                <p className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {member.role}
                </p>

                {/* Specialty */}
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {member.specialty}
                </p>

                {/* Bio */}
                <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
