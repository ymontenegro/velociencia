"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/articles/article-card";
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
      <div className="mb-6 border-t-[6px] border-[var(--color-text)] pt-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          {label}
        </h2>
      </div>
      <div className="space-y-1">
        {topArticles.map((article, i) => (
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
  );
}
