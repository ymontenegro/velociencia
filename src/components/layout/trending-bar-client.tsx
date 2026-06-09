"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TrendingArticle } from "@/components/layout/trending-bar";

interface ViewRow {
  slug: string;
  section: string;
  views: number;
}

interface TrendingBarClientProps {
  fallback: TrendingArticle[];
  allArticles: TrendingArticle[];
  labelLatest: string;
  labelNow: string;
}

export function TrendingBarClient({
  fallback,
  allArticles,
  labelLatest,
  labelNow,
}: TrendingBarClientProps) {
  const [articles, setArticles] = useState<TrendingArticle[]>(fallback);
  const [isTrending, setIsTrending] = useState(false);

  useEffect(() => {
    fetch("/api/views?limit=5")
      .then((r) => {
        if (!r.ok) throw new Error("views fetch failed");
        return r.json();
      })
      .then((rows: unknown) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        const articleMap = new Map(
          allArticles.map((a) => [`${a.section}/${a.slug}`, a]),
        );
        const matched = (rows as ViewRow[])
          .map((r) => articleMap.get(`${r.section}/${r.slug}`))
          .filter((a): a is TrendingArticle => !!a);
        if (matched.length >= 3) {
          setArticles(matched);
          setIsTrending(true);
        }
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 no-scrollbar">
        {/* Label with live dot — Race Telemetry signal */}
        <div className="flex shrink-0 items-center gap-2">
          {isTrending && (
            <span
              className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-competencia)]"
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text)]">
            {isTrending ? labelNow : labelLatest}
          </span>
        </div>

        {/* Vertical divider */}
        <span
          className="h-3 w-px shrink-0 bg-[var(--color-border)]"
          aria-hidden="true"
        />

        {/* Article links */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {articles.map((article, i) => (
            <Link
              key={`${article.section}-${article.slug}`}
              href={article.href}
              className="group flex shrink-0 items-center gap-2 text-[11px] leading-tight text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
            >
              {/* Section badge with section color accent */}
              <span
                className="inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[8.5px] font-medium uppercase tracking-wider text-white"
                style={{ backgroundColor: article.sectionColor }}
              >
                {article.sectionName}
              </span>
              <span className="whitespace-nowrap uppercase tracking-wide">
                {article.title.length > 50
                  ? `${article.title.slice(0, 50)}…`
                  : article.title}
              </span>
              {i < articles.length - 1 && (
                <span
                  className="ml-2 h-3 w-px shrink-0 bg-[var(--color-border-light)]"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
