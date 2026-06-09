import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { TagInfo } from "@/lib/tags";
import type { Locale } from "@/lib/i18n";

interface TopicsIndexProps {
  tags: TagInfo[];
  locale: Locale;
}

/**
 * Scale font size for a tag cloud: tags with more articles appear slightly
 * larger. We clamp to 3 tiers to stay legible and editorial.
 */
function tagSizeClass(count: number, maxCount: number): string {
  if (maxCount <= 1) return "text-sm";
  const ratio = count / maxCount;
  if (ratio >= 0.6) return "text-base font-semibold";
  if (ratio >= 0.3) return "text-sm font-medium";
  return "text-xs font-normal";
}

export async function TopicsIndex({ tags, locale }: TopicsIndexProps) {
  const dict = await getDictionary(locale);
  const base = locale === "en" ? "topic" : "tema";
  const maxCount = tags.length > 0 ? tags[0].count : 1;

  const countLabel = (count: number) =>
    count === 1
      ? `1 ${dict.topics.articleCount}`
      : `${count} ${dict.topics.articlesCount}`;

  return (
    <div>
      {/* ── HUD header ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        {/* Faint telemetry grid — HUD depth cue */}
        <div
          className="tool-scope tool-grid-bg pointer-events-none absolute inset-0 opacity-25"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Eyebrow row — mono, HUD signal */}
          <div className="flex items-center gap-2">
            <span
              className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.topics.topic}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {dict.topics.allTitle}
          </h1>

          {/* Accent rule */}
          <div className="mt-4 h-[2px] w-8 bg-[var(--color-border)]" />

          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            {dict.topics.allSubtitle}
          </p>
        </div>
      </div>

      {/* ── Tag cloud ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {tags.length === 0 ? (
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {dict.topics.notFound}
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tagInfo) => (
              <Link
                key={tagInfo.slug}
                href={`/${base}/${tagInfo.slug}`}
                className={`tag-chip inline-flex items-baseline gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-1.5 text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-text-muted)] hover:bg-[var(--color-border-light)] hover:text-[var(--color-text)] ${tagSizeClass(tagInfo.count, maxCount)}`}
              >
                <span>{tagInfo.tag}</span>
                {/* Article count in mono — telemetry readout */}
                <span className="font-mono text-[9px] font-normal text-[var(--color-text-muted)]">
                  {countLabel(tagInfo.count)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
