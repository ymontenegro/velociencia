import Link from "next/link";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { toolHref, toolColor } from "@/lib/tools";
import type { ToolInfo } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";

interface ToolsIndexProps {
  tools: ToolInfo[];
  locale: Locale;
  indexTitle: string;
  indexSubtitle: string;
  openTool: string;
}

/**
 * Server Component — index page for /herramientas and /tools.
 * Receives data + i18n strings from the route page; renders a
 * 1→2→3 column grid of tool cards with section accent colors.
 */
export function ToolsIndex({
  tools,
  locale,
  indexTitle,
  indexSubtitle,
  openTool,
}: ToolsIndexProps) {
  const navLabel = locale === "en" ? "Tools" : "Herramientas";

  return (
    <div>
      {/* Page header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {navLabel}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {indexTitle}
          </h1>
          <div className="mt-4 h-[2px] w-12 bg-[var(--color-border)]" />
          <p className="mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
            {indexSubtitle}
          </p>
        </div>
      </div>

      {/* Tool cards grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {tools.length === 0 ? (
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {locale === "en" ? "No tools available." : "Sin herramientas disponibles."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const color = toolColor(tool);
              const sectionConfig = SECTIONS[tool.sectionId];
              const sectionName = SECTIONS_I18N[locale][tool.sectionId].name;
              const href = toolHref(tool, locale);

              return (
                <Link
                  key={tool.id}
                  href={href}
                  className="group block h-full"
                >
                  <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                    {/* Section accent top border */}
                    <div
                      className="h-[3px] w-full flex-none"
                      style={{ backgroundColor: color }}
                    />

                    {/* Gradient visual strip */}
                    <div
                      className="h-16 w-full flex-none"
                      style={{
                        background: `linear-gradient(135deg, var(${sectionConfig.colorVar}-dark) 0%, ${color} 50%, var(${sectionConfig.colorVar}-light) 100%)`,
                        opacity: 0.85,
                      }}
                    />

                    {/* Card content */}
                    <div className="flex flex-1 flex-col p-5 pt-4">
                      {/* Section badge */}
                      <span
                        className="inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
                        style={{ backgroundColor: color }}
                      >
                        {sectionName}
                      </span>

                      {/* Title */}
                      <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-text-secondary)]">
                        {tool.title[locale]}
                      </h2>

                      {/* Tagline */}
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {tool.tagline[locale]}
                      </p>

                      {/* CTA */}
                      <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--color-border-light)] pt-4">
                        <span
                          className="text-sm font-semibold transition-colors duration-200"
                          style={{ color }}
                        >
                          {openTool}
                        </span>
                        <svg
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke={color}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
