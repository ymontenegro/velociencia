import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getFeaturedTools } from "@/lib/tools";
import { ToolCard } from "@/components/tools/tool-card";

interface ToolsHighlightProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Homepage highlight band — surfaces the interactive calculators right below the
 * hero. Shows 3 curated tools (distinct section colors) plus a CTA to the full
 * index. Reuses the shared <ToolCard>; tinted background + border set it apart
 * from the article grid.
 */
export function ToolsHighlight({ locale, dict }: ToolsHighlightProps) {
  const tools = getFeaturedTools(3);
  if (tools.length === 0) return null;

  const allToolsHref = locale === "en" ? "/tools" : "/herramientas";

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {/* Decorative section-color glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full opacity-[0.07] blur-2xl"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
        />

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {dict.tools.nav}
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-[var(--color-text)] sm:text-3xl">
              {dict.tools.homeTitle}
            </h2>
            {/* Multi-section color accent line */}
            <div
              className="mt-3 h-[3px] w-14 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #0D9488 0%, #7C3AED 40%, #0891B2 70%, #E11D48 100%)",
              }}
            />
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {dict.tools.homeSubtitle}
            </p>
          </div>

          <Link
            href={allToolsHref}
            className="group inline-flex flex-none items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] transition-colors hover:text-[var(--color-text-secondary)]"
          >
            {dict.tools.backToTools}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              locale={locale}
              openTool={dict.tools.openTool}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
