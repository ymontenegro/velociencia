import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface TopicCloudProps {
  locale: Locale;
  dict: Dictionary;
}

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
      {/* Section heading — same editorial style as home sections */}
      <div className="mb-8 border-t-[6px] border-[var(--color-text)] pt-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            {dict.home.exploreTopics}
          </h2>
          <Link
            href={`/${base}`}
            className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {dict.home.allTopics} &rarr;
          </Link>
        </div>
      </div>

      {/* Tag cloud */}
      <div className="flex flex-wrap items-center gap-2">
        {tags.map(({ tag, slug, count }) => (
          <Link
            key={slug}
            href={`/${base}/${slug}`}
            className="tag-chip rounded-full border border-[var(--color-border)] px-3 py-1 font-medium text-[var(--color-text-secondary)] transition-colors duration-150 hover:border-[var(--color-border-light)] hover:bg-[var(--color-bg-card)] hover:text-[var(--color-text)]"
            style={{ fontSize: fontSize(count) }}
            title={`${count} ${count === 1 ? (locale === "en" ? "article" : "artículo") : (locale === "en" ? "articles" : "artículos")}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
