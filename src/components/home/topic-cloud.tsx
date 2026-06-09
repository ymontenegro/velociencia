import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface TopicCloudProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Topic cloud — restyled as Race Telemetry filter chips.
 * Mono text, defined borders, HUD section heading with thickness proportional
 * to article count per tag (font-size gradient preserved).
 */
export function TopicCloud({ locale, dict }: TopicCloudProps) {
  const tags = getAllTags(locale).slice(0, 24);
  if (tags.length === 0) return null;

  const base = locale === "en" ? "topic" : "tema";

  // Scale font size by frequency: map count range to [0.7rem, 1.05rem]
  const counts = tags.map((t) => t.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);
  const range = maxCount - minCount || 1;

  function fontSize(count: number): string {
    const ratio = (count - minCount) / range;
    const size = 0.7 + ratio * 0.35; // 0.70rem … 1.05rem
    return `${size.toFixed(2)}rem`;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* HUD section heading */}
      <div className="mb-8 border-t-2 border-[var(--color-text)] pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1 w-1 flex-none rounded-full bg-[var(--color-text-muted)]"
            />
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.home.exploreTopics}
            </h2>
          </div>
          <Link
            href={`/${base}`}
            className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {dict.home.allTopics} &rarr;
          </Link>
        </div>
      </div>

      {/* Filter-chip cloud — mono text + defined border on hover */}
      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map(({ tag, slug, count }) => (
          <Link
            key={slug}
            href={`/${base}/${slug}`}
            className="inline-flex items-center rounded border border-[var(--color-border)] bg-[var(--color-bg-card)] px-2.5 py-0.5 font-mono font-medium text-[var(--color-text-secondary)] transition-all duration-150 hover:border-[var(--color-text)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
            style={{ fontSize: fontSize(count) }}
            title={`${count} ${
              count === 1
                ? locale === "en"
                  ? "article"
                  : "artículo"
                : locale === "en"
                  ? "articles"
                  : "artículos"
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
