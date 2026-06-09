"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import type { ArticleCard as ArticleCardType } from "@/types/article";
import type { Locale } from "@/lib/i18n";

interface MostReadProps {
  allArticles: ArticleCardType[];
  label: string;
  locale: Locale;
}

interface ViewRow {
  slug: string;
  section: string;
  views: number;
}

/**
 * Most-read sidebar widget — restyled as a Race Telemetry leaderboard.
 * Position numbers in DM Mono, section-colored accent bars behind each row,
 * HUD header treatment.
 */
export function MostRead({ allArticles, label, locale }: MostReadProps) {
  const fallback = allArticles.slice(0, 5);
  const [topArticles, setTopArticles] = useState<ArticleCardType[]>(fallback);

  useEffect(() => {
    fetch("/api/views?limit=5")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch views");
        return r.json();
      })
      .then((rows: unknown) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        const articleMap = new Map(allArticles.map((a) => [`${a.section}/${a.slug}`, a]));
        const matched = (rows as ViewRow[])
          .map((r) => articleMap.get(`${r.section}/${r.slug}`))
          .filter((a): a is ArticleCardType => !!a);
        if (matched.length > 0) setTopArticles(matched);
      })
      .catch(() => {});
  }, [allArticles]);

  return (
    <div>
      {/* HUD header — thicker rule at top, mono label */}
      <div className="mb-5 border-t-2 border-[var(--color-text)] pt-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1 w-1 flex-none rounded-full bg-[var(--color-text-muted)]"
          />
          <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            {label}
          </h2>
        </div>
      </div>

      {/* Leaderboard */}
      <ol className="space-y-0" aria-label={label}>
        {topArticles.map((article, i) => {
          const sectionColor =
            SECTIONS[article.section as SectionId]?.color ?? "#8A8E96";
          const sectionSlug =
            SECTIONS_I18N[locale][article.section as SectionId]?.slug ??
            article.section;
          // Bar width decreases from ~90% (rank 1) to ~40% (rank 5)
          const barWidth = Math.round(90 - i * 10);

          return (
            <li
              key={article.slug}
              className="group relative border-b border-[var(--color-border-light)] py-3 last:border-b-0"
            >
              {/* Background accent bar — section color, fades with rank */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 rounded-r-sm opacity-[0.055] transition-opacity duration-300 group-hover:opacity-[0.11]"
                style={{
                  width: `${barWidth}%`,
                  backgroundColor: sectionColor,
                }}
              />

              <div className="relative flex items-start gap-3">
                {/* Rank number — DM Mono, section colored */}
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] font-bold leading-5 tabular-nums flex-none w-5 text-right"
                  style={{ color: sectionColor }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Article title + reading time */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${sectionSlug}/${article.slug}`}
                    className="block text-[13px] font-semibold leading-snug text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-text-secondary)] line-clamp-2"
                  >
                    {article.title}
                  </Link>
                  {article.readingTime != null && (
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                      {article.readingTime}&thinsp;min
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
