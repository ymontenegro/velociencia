import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getAllTools, toolHref, toolColor } from "@/lib/tools";

interface ToolsHighlightProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Homepage tools teaser — compact single-strip bar that surfaces all tools
 * as lightweight chips in a horizontally-scrollable row.
 * The full experience lives at /herramientas (ES) · /tools (EN).
 * Race Telemetry: mono eyebrow, live dot, per-section accent dots.
 */
export function ToolsHighlight({ locale, dict }: ToolsHighlightProps) {
  const allTools = getAllTools();
  if (allTools.length === 0) return null;

  const allToolsHref = locale === "en" ? "/tools" : "/herramientas";

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Eyebrow: live dot + section label */}
          <div className="flex flex-none items-center gap-2">
            <span
              aria-hidden="true"
              className="tool-live-dot inline-block h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-text-muted)]"
            />
            <span className="whitespace-nowrap font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {dict.tools.nav}
            </span>
          </div>

          {/* Vertical separator */}
          <div aria-hidden="true" className="h-4 w-px flex-none bg-[var(--color-border)]" />

          {/* Tool chips — single horizontally-scrollable row */}
          <div
            role="list"
            className="flex flex-1 items-center gap-2 overflow-x-auto py-1"
          >
            {allTools.map((tool) => {
              const color = toolColor(tool);
              const href = toolHref(tool, locale);
              const isDataset = tool.kind === "dataset";
              return (
                <Link
                  key={tool.id}
                  href={href}
                  role="listitem"
                  style={{ "--tool-accent": color } as CSSProperties}
                  className="tool-scope group flex-none inline-flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 transition-colors hover:border-[var(--tool-accent)]"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-none rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="whitespace-nowrap font-mono text-[10px] font-medium text-[var(--color-text)]">
                    {tool.title[locale]}
                  </span>
                  <span className="ml-0.5 whitespace-nowrap font-mono text-[8.5px] text-[var(--color-text-muted)]">
                    {isDataset ? dict.home.toolsDatasets : dict.home.toolsCalculators}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA — "Ver todas las herramientas →" */}
          <Link
            href={allToolsHref}
            className="group ml-2 inline-flex flex-none items-center gap-1.5 whitespace-nowrap font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors hover:text-[var(--color-text-secondary)]"
          >
            {dict.home.toolsViewAll}
            <svg
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
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
      </div>
    </section>
  );
}
