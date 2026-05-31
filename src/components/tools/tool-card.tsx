import Link from "next/link";
import { SECTIONS_I18N } from "@/lib/constants";
import { toolHref, toolColor } from "@/lib/tools";
import type { ToolInfo } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ToolIcon } from "./tool-icon";

interface ToolCardProps {
  tool: ToolInfo;
  locale: Locale;
  openTool: string;
  className?: string;
}

/**
 * Reusable calculator card — shared by the /herramientas (·/tools) index and the
 * homepage highlight band. Editorial / minimal treatment matching
 * `section-preview.tsx`: the section color appears only as restrained accents
 * (icon, thin top line, faint corner glow + icon watermark), never as a heavy
 * gradient block. The textual content sits in a `relative z-10` wrapper so it
 * always paints above the absolutely-positioned decorations.
 */
export function ToolCard({ tool, locale, openTool, className }: ToolCardProps) {
  const color = toolColor(tool);
  const sectionName = SECTIONS_I18N[locale][tool.sectionId].name;
  const href = toolHref(tool, locale);

  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl sm:p-7">
        {/* Soft corner glow in the section color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.14]"
          style={{ backgroundColor: color }}
        />

        {/* Large faint icon watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-7 -right-5 opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{ color }}
        >
          <ToolIcon toolId={tool.id} className="h-32 w-32" />
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Accent line */}
          <div
            className="h-[2px] w-8 transition-all duration-500 ease-out group-hover:w-14"
            style={{ backgroundColor: color }}
          />

          {/* Icon */}
          <span className="mt-6 block" style={{ color }}>
            <ToolIcon toolId={tool.id} className="h-8 w-8" />
          </span>

          {/* Section label */}
          <span
            className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color }}
          >
            {sectionName}
          </span>

          {/* Title */}
          <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-[var(--color-text)] transition-colors duration-300">
            {tool.title[locale]}
          </h2>

          {/* Tagline */}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {tool.tagline[locale]}
          </p>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-1.5 border-t border-[var(--color-border-light)] pt-4">
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
}
