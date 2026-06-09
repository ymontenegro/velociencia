"use client";

import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import { useDictionary, useLocale } from "@/components/locale-provider";
import { tagToSlug } from "@/lib/tag-slug";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/constants";
import { SECTIONS_I18N } from "@/lib/constants";

const PAGE_SIZE = 9;

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  section: SectionId;
  coverImage?: string;
  tags: string[];
  author: string;
}

interface TagOption {
  slug: string;
  display: string;
}

interface ViewRow {
  slug: string;
  section: string;
  views: number;
}

type SortKey = "newest" | "oldest" | "popular";

interface SectionToolbarProps {
  articles: ArticleData[];
  sectionId: SectionId;
  sectionColor: string;
  availableTags: TagOption[];
}

export function SectionToolbar({
  articles,
  sectionId,
  sectionColor,
  availableTags,
}: SectionToolbarProps) {
  const dict = useDictionary();
  const locale = useLocale();

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [viewMap, setViewMap] = useState<Map<string, number>>(new Map());
  const [viewsLoaded, setViewsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Fetch views when "popular" selected
  useEffect(() => {
    if (sort !== "popular" || viewsLoaded) return;
    fetch("/api/views?limit=200")
      .then((r) => {
        if (!r.ok) throw new Error("views fetch failed");
        return r.json();
      })
      .then((rows: unknown) => {
        if (!Array.isArray(rows)) return;
        const map = new Map<string, number>();
        for (const row of rows as ViewRow[]) {
          map.set(`${row.section}/${row.slug}`, row.views);
        }
        setViewMap(map);
        setViewsLoaded(true);
      })
      .catch(() => {
        setViewsLoaded(true); // fall back to newest
      });
  }, [sort, viewsLoaded]);

  // Reset page when filter/sort changes
  function handleTagChange(slug: string | null) {
    setActiveTag(slug);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSortChange(s: SortKey) {
    setSort(s);
    setVisibleCount(PAGE_SIZE);
  }

  // Filter
  const filtered =
    activeTag === null
      ? articles
      : articles.filter((a) =>
          a.tags.some((t) => tagToSlug(t.trim()) === activeTag)
        );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "popular") {
      const aV = viewMap.get(`${a.section}/${a.slug}`) ?? -1;
      const bV = viewMap.get(`${b.section}/${b.slug}`) ?? -1;
      if (bV !== aV) return bV - aV;
      // tie-break: newest
    }
    if (sort === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // newest (default) or tie-break for popular
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const sectionI18n = SECTIONS_I18N[locale][sectionId];
  const authorName = sectionI18n.journalist;

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "newest", label: dict.sections.sortNewest },
    { key: "oldest", label: dict.sections.sortOldest },
    { key: "popular", label: dict.sections.sortPopular },
  ];

  return (
    <div
      className="tool-scope space-y-6"
      style={{ "--tool-accent": sectionColor } as CSSProperties}
    >
      {/* ── Toolbar row ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Topic filter chips */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            {dict.sections.filterByTopic}
          </span>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {/* "All" chip */}
            <button
              onClick={() => handleTagChange(null)}
              className={cn(
                "shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all duration-150",
                activeTag === null
                  ? "border-transparent text-white"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-light)] hover:text-[var(--color-text)]"
              )}
              style={activeTag === null ? { backgroundColor: sectionColor } : {}}
            >
              {dict.sections.allTopicsFilter}
            </button>
            {/* Tag chips */}
            {availableTags.map(({ slug, display }) => (
              <button
                key={slug}
                onClick={() => handleTagChange(slug)}
                className={cn(
                  "shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all duration-150",
                  activeTag === slug
                    ? "border-transparent text-white"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-light)] hover:text-[var(--color-text)]"
                )}
                style={
                  activeTag === slug ? { backgroundColor: sectionColor } : {}
                }
              >
                {display}
              </button>
            ))}
          </div>
        </div>

        {/* Sort segment */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            {dict.sections.sortBy}
          </span>
          <div className="flex overflow-hidden rounded-sm border border-[var(--color-border)]">
            {sortOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key)}
                className={cn(
                  "px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-150",
                  sort === key
                    ? "text-white"
                    : "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                )}
                style={sort === key ? { backgroundColor: sectionColor } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Count readout ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: sectionColor }}
        />
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          {sorted.length} {dict.sections.articlesWord}
        </p>
      </div>

      {/* ── Empty state ─────────────────────────────────────────────── */}
      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {dict.sections.noResults}
          </p>
          <div className="mt-4 h-[1px] w-16 bg-[var(--color-border)]" />
        </div>
      )}

      {/* ── Articles grid ───────────────────────────────────────────── */}
      {visible.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, i) => (
            <ArticleCard
              key={`${article.section}-${article.slug}`}
              {...article}
              variant="standard"
              author={authorName}
              authorColor={sectionColor}
              locale={locale}
              byLabel={dict.article.by}
              minReadLabel={dict.article.minRead}
              className={cn(
                "animate-fade-in-up",
                ["stagger-1", "stagger-2", "stagger-3"][i % 3]
              )}
            />
          ))}
        </div>
      )}

      {/* ── Load more ───────────────────────────────────────────────── */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-sm border border-[var(--color-border)] px-6 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] transition-all duration-150 hover:border-transparent hover:text-white"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                sectionColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
            }}
          >
            {dict.sections.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
