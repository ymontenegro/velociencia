import type { CSSProperties } from "react";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import type { Locale } from "@/lib/i18n";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  slug: string;
  section: SectionId;
  coverImage?: string;
  tags?: string[];
  variant?: "hero" | "standard" | "compact" | "headline";
  index?: number;
  className?: string;
  author?: string;
  authorColor?: string;
  locale?: Locale;
  byLabel?: string;
  minReadLabel?: string;
}

const SECTION_GRADIENTS: Record<SectionId, { from: string; to: string }> = {
  nutricion: {
    from: "var(--color-nutricion-dark)",
    to: "var(--color-nutricion-light)",
  },
  ciencia: {
    from: "var(--color-ciencia-dark)",
    to: "var(--color-ciencia-light)",
  },
  entrenamiento: {
    from: "var(--color-entrenamiento-dark)",
    to: "var(--color-entrenamiento-light)",
  },
  competencia: {
    from: "var(--color-competencia-dark)",
    to: "var(--color-competencia-light)",
  },
};

export function ArticleCard({
  title,
  excerpt,
  date,
  readingTime,
  slug,
  section,
  coverImage,
  tags,
  variant = "standard",
  index,
  className,
  author,
  authorColor,
  locale = "es",
  byLabel = "Por",
  minReadLabel = "min de lectura",
}: ArticleCardProps) {
  const sectionConfig = SECTIONS[section];
  const sectionI18n = SECTIONS_I18N[locale][section];
  const sectionSlug = sectionI18n.slug;
  const gradient = SECTION_GRADIENTS[section];

  // ── HERO ────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <div
        className="tool-scope h-full"
        style={{ "--tool-accent": sectionConfig.color } as CSSProperties}
      >
        <Link
          href={`/${sectionSlug}/${slug}`}
          className={cn("group block h-full", className)}
        >
          <article className="relative h-full min-h-[300px] overflow-hidden rounded-lg md:min-h-[400px]">
            {/* Background gradient fallback */}
            <div
              className="article-card-gradient absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${sectionConfig.color} 50%, ${gradient.to} 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
              }}
            />

            {/* Cover image */}
            {coverImage && (
              // eslint-disable-next-line @next/next/no-img-element -- hotlink deliberado a Unsplash CDN (Imgix optimiza); next/image duplicaría coste
              <img
                src={coverImage}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" />

            {/* Accent ring on hover */}
            <div
              className="absolute inset-0 rounded-lg ring-0 transition-all duration-300 group-hover:ring-2"
              style={{ "--tw-ring-color": sectionConfig.color } as CSSProperties}
            />

            {/* HUD corner ticks (manual implementation for z-index over image) */}
            <div
              className="pointer-events-none absolute left-[10px] top-[10px] z-20 h-3 w-3 border-l-[1.5px] border-t-[1.5px]"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            />
            <div
              className="pointer-events-none absolute bottom-[10px] right-[10px] z-20 h-3 w-3 border-b-[1.5px] border-r-[1.5px]"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            />

            {/* HUD kicker badge */}
            <div className="absolute left-4 top-4 z-10 md:left-6 md:top-6">
              <div className="flex items-center gap-2 rounded-sm bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                <span
                  className="tool-live-dot h-1.5 w-1.5 flex-none rounded-full"
                  style={{ backgroundColor: sectionConfig.color }}
                />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
                  {sectionI18n.name}
                </span>
              </div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-5 md:p-8 lg:p-10">
              <h3
                className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </h3>

              <p
                className="mt-3 text-sm leading-relaxed text-white/70 md:text-base"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {excerpt}
              </p>

              {/* Meta row — mono readout */}
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                {author && (
                  <>
                    <AuthorAvatar
                      name={author}
                      color={authorColor ?? sectionConfig.color}
                      size="sm"
                    />
                    <span className="text-[11px] normal-case text-white/60">
                      {byLabel} {author}
                    </span>
                    <span className="font-mono text-[10px] text-white/30">
                      &middot;
                    </span>
                  </>
                )}
                <time className="font-mono text-[10px] font-medium text-white/50">
                  {formatDate(date, locale)}
                </time>
                <span className="font-mono text-[10px] text-white/30">
                  &middot;
                </span>
                <span className="font-mono text-[10px] font-medium text-white/50">
                  {readingTime} {minReadLabel}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  // ── HEADLINE ──────────────────────────────────────────────────────────
  if (variant === "headline") {
    return (
      <div
        className="tool-scope"
        style={{ "--tool-accent": sectionConfig.color } as CSSProperties}
      >
        <Link
          href={`/${sectionSlug}/${slug}`}
          className={cn("group block", className)}
        >
          <article className="relative flex items-start gap-3 border-l-2 border-transparent py-3 pl-3 transition-all duration-200 hover:border-[var(--tool-accent)]">
            {/* Section accent dot */}
            <div
              className="mt-1.5 h-2 w-2 flex-none rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: sectionConfig.color }}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3
                className="font-serif text-[15px] font-semibold leading-snug text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-text-secondary)]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </h3>
              {/* Meta — mono */}
              <div className="mt-1 flex items-center gap-1.5">
                <time className="font-mono text-[10px] text-[var(--color-text-muted)]">
                  {formatDate(date, locale)}
                </time>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                  &middot;
                </span>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                  {readingTime} {minReadLabel}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  // ── COMPACT ──────────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <div
        className="tool-scope"
        style={{ "--tool-accent": sectionConfig.color } as CSSProperties}
      >
        <Link
          href={`/${sectionSlug}/${slug}`}
          className={cn("group block", className)}
        >
          <article className="relative flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-300 hover:bg-[var(--color-border-light)]">
            {/* Position number */}
            {typeof index === "number" && (
              <span className="flex-none font-mono text-xl font-semibold text-[var(--color-text)] opacity-15">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}

            {/* Thumbnail */}
            <div
              className="relative h-[80px] w-[80px] flex-none overflow-hidden rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${sectionConfig.color} 50%, ${gradient.to} 100%)`,
              }}
            >
              {coverImage && (
                // eslint-disable-next-line @next/next/no-img-element -- hotlink deliberado a Unsplash CDN (Imgix optimiza); next/image duplicaría coste
                <img
                  src={coverImage}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3
                className="font-serif text-sm font-semibold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </h3>
              <time className="mt-1 block font-mono text-[10px] text-[var(--color-text-muted)]">
                {formatDate(date, locale)}
              </time>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  // ── STANDARD (default) ───────────────────────────────────────────────
  return (
    <div
      className="tool-scope h-full"
      style={{ "--tool-accent": sectionConfig.color } as CSSProperties}
    >
      <Link
        href={`/${sectionSlug}/${slug}`}
        className={cn("group block h-full", className)}
      >
        {/*
          tool-panel: subtle accent-tinted bg gradient + border + HUD shadow
          tool-corners: L-shaped corner ticks in the accent color
          tool-panel-hover: accent-colored shadow + border tint on hover
          Overflow is NOT on the article (to let pseudo-element corners render),
          only on the image container below.
        */}
        <article className="relative flex h-full flex-col rounded-lg tool-panel tool-corners tool-panel-hover">
          {/* Image area — overflow clipped here only */}
          <div className="relative min-h-[160px] sm:min-h-[120px] flex-1 overflow-hidden rounded-t-lg">
            <div
              className="article-card-gradient absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${sectionConfig.color} 50%, ${gradient.to} 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 60%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
              }}
            />
            {coverImage && (
              // eslint-disable-next-line @next/next/no-img-element -- hotlink deliberado a Unsplash CDN (Imgix optimiza); next/image duplicaría coste
              <img
                src={coverImage}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* Subtle bottom gradient blend */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent opacity-20" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5 pt-4">
            {/* Section kicker — dot + mono label in section color */}
            <div className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 flex-none rounded-full"
                style={{ backgroundColor: sectionConfig.color }}
              />
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: sectionConfig.color }}
              >
                {sectionI18n.name}
              </span>
            </div>

            {/* Title */}
            <h3
              className="mt-2.5 font-serif text-lg font-bold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p
              className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </p>

            {/* Tag chips */}
            {tags && tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="tag-chip rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Meta — mono readout row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[var(--color-border-light)] pt-3">
              {author && (
                <>
                  <AuthorAvatar
                    name={author}
                    color={authorColor ?? sectionConfig.color}
                    size="sm"
                  />
                  <span className="text-[11px] normal-case tracking-normal text-[var(--color-text-secondary)]">
                    {byLabel} {author}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                    &middot;
                  </span>
                </>
              )}
              <time className="font-mono text-[10px] font-medium text-[var(--color-text-muted)]">
                {formatDate(date, locale)}
              </time>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                &middot;
              </span>
              <span className="font-mono text-[10px] font-medium text-[var(--color-text-muted)]">
                {readingTime} {minReadLabel}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
