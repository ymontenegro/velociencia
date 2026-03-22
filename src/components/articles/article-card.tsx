import Link from "next/link";
import { SECTIONS, type SectionId } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  slug: string;
  section: SectionId;
  coverImage?: string;
  variant?: "hero" | "standard" | "compact";
  index?: number;
  className?: string;
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
  variant = "standard",
  index,
  className,
}: ArticleCardProps) {
  const sectionConfig = SECTIONS[section];
  const gradient = SECTION_GRADIENTS[section];

  if (variant === "hero") {
    return (
      <Link
        href={`/${section}/${slug}`}
        className={cn("group block h-full", className)}
      >
        <article className="relative h-full min-h-[300px] overflow-hidden rounded-lg md:min-h-[400px]">
          {/* Background gradient (fallback) */}
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
            <img src={coverImage} alt={title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" />

          {/* Category badge */}
          <div className="absolute left-4 top-4 md:left-6 md:top-6">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
              style={{ backgroundColor: sectionConfig.color }}
            >
              {sectionConfig.name}
            </span>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 md:p-8 lg:p-10">
            <h3 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {excerpt}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/50">
              <time>{formatDate(date)}</time>
              <span>&middot;</span>
              <span>{readingTime} min de lectura</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/${section}/${slug}`}
        className={cn("group block", className)}
      >
        <article className="relative flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-300 hover:bg-[var(--color-border-light)]">
          {/* Optional position number */}
          {typeof index === "number" && (
            <span className="flex-none font-serif text-xl font-semibold text-[var(--color-text)] opacity-15">
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
              <img src={coverImage} alt={title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3
              className="font-serif text-sm font-semibold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]"
              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {title}
            </h3>
            <time className="mt-1 block text-xs text-[var(--color-text-muted)]">
              {formatDate(date)}
            </time>
          </div>
        </article>
      </Link>
    );
  }

  // variant === "standard"
  return (
    <Link
      href={`/${section}/${slug}`}
      className={cn("group block h-full", className)}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
        {/* Section accent top border */}
        <div
          className="h-[3px] w-full flex-none"
          style={{ backgroundColor: sectionConfig.color }}
        />

        {/* Image area */}
        <div className="relative min-h-[120px] flex-1 overflow-hidden">
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
            <img src={coverImage} alt={title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          )}
          {/* Subtle bottom gradient for blend */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent opacity-30" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 pt-4">
          {/* Category badge */}
          <span
            className="inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
            style={{ backgroundColor: sectionConfig.color }}
          >
            {sectionConfig.name}
          </span>

          {/* Title */}
          <h3
            className="mt-2.5 font-serif text-lg font-bold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p
            className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {excerpt}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-border-light)] pt-3 text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
            <time>{formatDate(date)}</time>
            <span>&middot;</span>
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
