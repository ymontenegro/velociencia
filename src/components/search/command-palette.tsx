"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/components/locale-provider";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { tagToSlug } from "@/lib/tag-slug";
import type { SectionId } from "@/lib/constants";

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

interface SearchResult {
  title: string;
  subtitle: string;
  excerpt: string;
  slug: string;
  section: string;
  sectionName: string;
  sectionSlug: string;
  author: string;
  tags: string[];
}

interface TopicResult {
  tag: string;
  slug: string;
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Accent-fold + lowercase, matching the spec requirement. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Split query into tokens and return true if every token appears in the haystack. */
function matchesAllTokens(tokens: string[], haystack: string): boolean {
  return tokens.every((t) => haystack.includes(t));
}

interface RankedArticle {
  result: SearchResult;
  rank: number; // lower = better: 0 title, 1 tags/author, 2 subtitle/excerpt
}

function rankResults(index: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return [];

  const tokens = normalize(query)
    .split(/\s+/)
    .filter(Boolean);
  if (tokens.length === 0) return [];

  const ranked: RankedArticle[] = [];

  for (const r of index) {
    const normTitle = normalize(r.title);
    const normTags = normalize(r.tags.join(" "));
    const normAuthor = normalize(r.author);
    const normSubtitle = normalize(r.subtitle);
    const normExcerpt = normalize(r.excerpt);
    const normSectionName = normalize(r.sectionName);

    const inTitle = matchesAllTokens(tokens, normTitle);
    const inTagsOrAuthor = matchesAllTokens(
      tokens,
      normTags + " " + normAuthor + " " + normSectionName
    );
    const inBody = matchesAllTokens(
      tokens,
      normSubtitle + " " + normExcerpt
    );

    if (inTitle) {
      ranked.push({ result: r, rank: 0 });
    } else if (inTagsOrAuthor) {
      ranked.push({ result: r, rank: 1 });
    } else if (inBody) {
      ranked.push({ result: r, rank: 2 });
    }
  }

  ranked.sort((a, b) => a.rank - b.rank);
  return ranked.slice(0, 8).map((x) => x.result);
}

function extractTopics(
  matchedArticles: SearchResult[],
  query: string
): TopicResult[] {
  if (!query.trim()) return [];

  const normQuery = normalize(query);
  const tokens = normQuery.split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const topics: TopicResult[] = [];

  for (const r of matchedArticles) {
    for (const tag of r.tags) {
      const normTag = normalize(tag);
      const matchesQuery = tokens.some((t) => normTag.includes(t));
      if (!matchesQuery) continue;

      const slug = tagToSlug(tag);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      topics.push({ tag, slug });

      if (topics.length >= 6) break;
    }
    if (topics.length >= 6) break;
  }

  return topics;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  locale: "es" | "en";
}

export function CommandPalette({ open, onClose, locale }: CommandPaletteProps) {
  const router = useRouter();
  const dict = useDictionary();

  // Persistent search index — fetched once, cached across open/close cycles
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [indexLoaded, setIndexLoaded] = useState(false);
  const [indexError, setIndexError] = useState(false);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------------------------------------
  // Fetch index once on first open
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!open || indexLoaded || isLoadingIndex) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoadingIndex(true);
    fetch(`/api/search-index?locale=${locale}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<SearchResult[]>;
      })
      .then((data) => {
        setIndex(Array.isArray(data) ? data : []);
        setIndexLoaded(true);
      })
      .catch(() => {
        setIndex([]);
        setIndexError(true);
        setIndexLoaded(true);
      })
      .finally(() => {
        setIsLoadingIndex(false);
      });
  }, [open, indexLoaded, isLoadingIndex, locale]);

  // --------------------------------------------------------------------------
  // Body scroll lock
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // --------------------------------------------------------------------------
  // Reset query + focus on open
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setSelectedIdx(0);
      // Defer focus to let the panel animate in
      const tid = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(tid);
    }
  }, [open]);

  // --------------------------------------------------------------------------
  // Derived results
  // --------------------------------------------------------------------------
  const articleResults = rankResults(index, query);
  const topicResults = extractTopics(articleResults, query);

  // Flat navigation list: articles first, then topics
  const totalItems = articleResults.length + topicResults.length;

  // --------------------------------------------------------------------------
  // Keyboard navigation (scoped to palette when open)
  // --------------------------------------------------------------------------
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev + 1) % Math.max(totalItems, 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) =>
          prev === 0 ? Math.max(totalItems - 1, 0) : prev - 1
        );
        return;
      }

      if (e.key === "Enter" && totalItems > 0) {
        e.preventDefault();
        const clampedIdx = Math.min(selectedIdx, totalItems - 1);
        let href: string;
        if (clampedIdx < articleResults.length) {
          const r = articleResults[clampedIdx];
          href = `/${r.sectionSlug}/${r.slug}`;
        } else {
          const t = topicResults[clampedIdx - articleResults.length];
          const base = locale === "en" ? "topic" : "tema";
          href = `/${base}/${t.slug}`;
        }
        router.push(href);
        onClose();
        return;
      }
    },
    [open, onClose, totalItems, selectedIdx, articleResults, topicResults, locale, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(
      "[data-selected='true']"
    );
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  // --------------------------------------------------------------------------
  // Render helpers
  // --------------------------------------------------------------------------
  function handleArticleClick(r: SearchResult) {
    router.push(`/${r.sectionSlug}/${r.slug}`);
    onClose();
  }

  function handleTopicClick(t: TopicResult) {
    const base = locale === "en" ? "topic" : "tema";
    router.push(`/${base}/${t.slug}`);
    onClose();
  }

  const hasQuery = query.trim().length > 0;
  const showNoResults =
    hasQuery && indexLoaded && !isLoadingIndex && totalItems === 0 && !indexError;

  // --------------------------------------------------------------------------
  // Early return if not open (keeps hooks stable)
  // --------------------------------------------------------------------------
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── HUD Panel ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.search.button}
        className={cn(
          "tool-scope tool-corners cmdk-panel",
          "fixed left-1/2 top-[10vh] z-50 w-full max-w-xl -translate-x-1/2",
          "rounded-xl border border-[var(--color-border)]",
          "bg-[var(--color-bg)] shadow-2xl",
          "flex flex-col overflow-hidden"
        )}
        style={{
          maxHeight: "70vh",
          "--tool-accent": "var(--color-text)",
        } as CSSProperties}
      >
        {/* ── Input row — telemetry grid bg for HUD feel ─────────────── */}
        <div className="relative flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
          {/* Subtle grid overlay on input area */}
          <div className="tool-grid-bg pointer-events-none absolute inset-0 opacity-[0.05]" />

          {/* Magnifier icon */}
          <svg
            className="relative h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder={dict.search.placeholder}
            className="relative min-w-0 flex-1 bg-transparent font-mono text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
            aria-label={dict.search.placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          {/* Dismiss — ESC key visual */}
          <button
            type="button"
            onClick={onClose}
            className="relative flex-shrink-0 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            aria-label="Cerrar"
          >
            <kbd>Esc</kbd>
          </button>
        </div>

        {/* ── Results area ───────────────────────────────────────────── */}
        <div
          ref={listRef}
          className="no-scrollbar flex-1 overflow-y-auto py-2"
        >
          {/* Loading */}
          {isLoadingIndex && (
            <div className="flex items-center justify-center gap-2 px-4 py-8">
              <span className="tool-live-dot h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                {dict.search.loading}
              </p>
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="flex items-center justify-center px-4 py-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                {dict.search.noResults}
              </p>
            </div>
          )}

          {/* Empty state — index ready, no query */}
          {!hasQuery && indexLoaded && !isLoadingIndex && (
            <div className="flex items-center justify-center px-4 py-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                {dict.search.placeholder}
              </p>
            </div>
          )}

          {/* ── Articles group ─────────────────────────────────────── */}
          {articleResults.length > 0 && (
            <div>
              {/* Group header */}
              <p className="px-4 pb-1 pt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {dict.search.sectionsGroup}
              </p>

              {articleResults.map((r, i) => {
                const isSelected = i === selectedIdx;
                const sectionColor =
                  SECTIONS[r.section as SectionId]?.color ?? "#888";

                return (
                  <button
                    key={`${r.section}/${r.slug}`}
                    type="button"
                    data-selected={isSelected}
                    onClick={() => handleArticleClick(r)}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={cn(
                      "flex w-full items-center gap-3 border-l-2 border-transparent pl-3 pr-4 py-2.5 text-left transition-all duration-150",
                      isSelected
                        ? "bg-[var(--color-border-light)]"
                        : "hover:bg-[var(--color-border-light)]"
                    )}
                    style={{
                      borderLeftColor: isSelected ? sectionColor : "transparent",
                    }}
                  >
                    {/* Section kicker — dot + mono label (matches ArticleCard) */}
                    <div className="flex flex-shrink-0 items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 flex-none rounded-full"
                        style={{ backgroundColor: sectionColor }}
                      />
                      <span
                        className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: sectionColor }}
                      >
                        {r.sectionName}
                      </span>
                    </div>

                    {/* Title */}
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--color-text)]">
                      {r.title}
                    </span>

                    {/* Arrow indicator on selection */}
                    {isSelected && (
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Topics group ───────────────────────────────────────── */}
          {topicResults.length > 0 && (
            <div
              className={cn(
                articleResults.length > 0
                  ? "mt-1 border-t border-[var(--color-border-light)] pt-1"
                  : ""
              )}
            >
              {/* Group header */}
              <p className="px-4 pb-1 pt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {dict.search.topicsGroup}
              </p>

              {topicResults.map((t, i) => {
                const flatIdx = articleResults.length + i;
                const isSelected = flatIdx === selectedIdx;

                return (
                  <button
                    key={t.slug}
                    type="button"
                    data-selected={isSelected}
                    onClick={() => handleTopicClick(t)}
                    onMouseEnter={() => setSelectedIdx(flatIdx)}
                    className={cn(
                      "flex w-full items-center gap-2.5 border-l-2 border-transparent pl-3 pr-4 py-2.5 text-left transition-all duration-150",
                      isSelected
                        ? "bg-[var(--color-border-light)]"
                        : "hover:bg-[var(--color-border-light)]"
                    )}
                    style={{
                      borderLeftColor: isSelected
                        ? "var(--color-text-muted)"
                        : "transparent",
                    }}
                  >
                    {/* Tag icon */}
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-text)]">
                      {t.tag}
                    </span>
                    {isSelected && (
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer hints — keyboard shortcuts in mono ──────────────── */}
        <div className="flex items-center gap-4 border-t border-[var(--color-border)] px-4 py-2">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-text-muted)]">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <span className="ml-0.5">{dict.search.hint}</span>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-text-muted)]">
            <kbd>↵</kbd>
            <span className="ml-0.5">
              {dict.search.enterHint}
            </span>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-text-muted)]">
            <kbd>Esc</kbd>
            <span className="ml-0.5">
              {dict.search.escHint}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
