import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getAllTools, toolHref, toolColor, type ToolInfo } from "@/lib/tools";

interface ToolsHighlightProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Homepage tools teaser.
 *
 * Mobile (< md): protagonist block — HUD header, 2×2 grid of 4 featured tools
 * each with Race Telemetry mini-readout (sampleStat), remaining 5 as a
 * horizontally-scrollable chip row, and a full-width HUD CTA button.
 *
 * Desktop (md+): compact single-strip chip bar — unchanged from original,
 * validated design, DO NOT modify.
 *
 * Race Telemetry: mono eyebrow, live dot, per-section accent dots.
 */
export function ToolsHighlight({ locale, dict }: ToolsHighlightProps) {
  const allTools = getAllTools();
  if (allTools.length === 0) return null;

  const allToolsHref = locale === "en" ? "/tools" : "/herramientas";

  // Mobile grid: 4 curated tools — zonas de potencia, carbohidratos, puertos, potencia-peso
  const mobileFeaturedIds = [
    "power-zones",     // entrenamiento
    "carb-intake",     // nutricion
    "climbs-database", // entrenamiento (puertos — iconic visual anchor)
    "power-to-weight", // ciencia
  ];
  const mobileFeatured = mobileFeaturedIds
    .map((id) => allTools.find((t) => t.id === id))
    .filter((t): t is ToolInfo => Boolean(t));

  // Remaining 5 tools as scrollable chips below the grid
  const mobileChips = allTools.filter((t) => !mobileFeaturedIds.includes(t.id));

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-card)]">
      {/* ── MOBILE (< md) ──────────────────────────────────────────────── */}
      <div className="block px-4 pb-4 pt-3 md:hidden">
        {/* HUD header: live dot + eyebrow mono + rule */}
        <div className="mb-4 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="tool-live-dot inline-block h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-text-muted)]"
          />
          <span className="whitespace-nowrap font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            {dict.tools.nav}
          </span>
          <div
            aria-hidden="true"
            className="ml-1 h-px flex-1 bg-[var(--color-border)]"
          />
        </div>

        {/* 2×2 grid — 4 featured tools with sampleStat mini-readout */}
        <div className="grid grid-cols-2 gap-3">
          {mobileFeatured.map((tool) => {
            const color = toolColor(tool);
            const href = toolHref(tool, locale);
            return (
              <Link
                key={tool.id}
                href={href}
                style={{ "--tool-accent": color } as CSSProperties}
                className="tool-scope group flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 transition-colors hover:border-[var(--tool-accent)]"
              >
                {/* Section dot + title (2-line clamp) */}
                <div className="flex items-start gap-1.5">
                  <span
                    aria-hidden="true"
                    className="mt-[3px] h-1.5 w-1.5 flex-none rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span
                    className="font-mono text-[11px] font-semibold leading-snug text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-text-secondary)]"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {tool.title[locale]}
                  </span>
                </div>

                {/* Sample stat — Race Telemetry mini-readout */}
                {tool.sampleStat && (
                  <div className="mt-auto rounded border border-[color-mix(in_srgb,var(--tool-accent)_18%,transparent)] bg-[color-mix(in_srgb,var(--tool-accent)_6%,transparent)] px-2 py-1.5">
                    <p className="truncate font-mono text-[8.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {tool.sampleStat.label[locale]}
                    </p>
                    <p
                      className="mt-0.5 font-mono text-xs font-semibold tabular-nums leading-none"
                      style={{ color: "var(--tool-accent)" }}
                    >
                      {tool.sampleStat.value[locale]}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Remaining 5 tools — scrollable chip row */}
        <div
          role="list"
          className="mt-3 flex items-center gap-2 overflow-x-auto py-1"
        >
          {mobileChips.map((tool) => {
            const color = toolColor(tool);
            const href = toolHref(tool, locale);
            const isDataset = tool.kind === "dataset";
            return (
              <Link
                key={tool.id}
                href={href}
                role="listitem"
                style={{ "--tool-accent": color } as CSSProperties}
                className="tool-scope group inline-flex flex-none items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 transition-colors hover:border-[var(--tool-accent)]"
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

        {/* Full-width HUD CTA */}
        <Link
          href={allToolsHref}
          className="group mt-3 flex w-full items-center justify-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors hover:border-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]"
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

      {/* ── DESKTOP (md+) — validated, DO NOT modify ───────────────────── */}
      <div className="hidden md:block">
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
                    className="tool-scope group inline-flex flex-none items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 transition-colors hover:border-[var(--tool-accent)]"
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
      </div>
    </section>
  );
}
