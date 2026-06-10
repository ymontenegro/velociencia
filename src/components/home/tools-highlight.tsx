import type { CSSProperties } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import {
  getAllTools,
  toolHref,
  toolColor,
  toolsIndexHref,
  type ToolInfo,
} from "@/lib/tools";

interface ToolsHighlightProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Homepage tools teaser.
 *
 * Mobile (< md): protagonist block — HUD header, 2×2 grid of 4 featured tools
 * each with Race Telemetry mini-readout (sampleStat), remaining 5 as a
 * horizontally-scrollable chip row, and a full-width split HUD CTA.
 *
 * Desktop (md+): two panels side-by-side inside max-w-7xl — CALCULADORAS (5)
 * and DATOS (4) — each with a HUD header (live-dot + eyebrow + count), tool
 * rows (section-dot + title 13px + sampleStat.value right-aligned), and a
 * footer CTA link. No horizontal scroll; left-border accent on hover.
 *
 * Race Telemetry: mono eyebrow, live dot, per-section accent dots.
 */
export function ToolsHighlight({ locale, dict }: ToolsHighlightProps) {
  const allTools = getAllTools();
  if (allTools.length === 0) return null;

  const calcHref = toolsIndexHref(locale, "calculator");
  const dataHref = toolsIndexHref(locale, "dataset");

  // Desktop panels: split by kind
  const calculators = allTools.filter((t) => !t.kind || t.kind === "calculator");
  const datasets = allTools.filter((t) => t.kind === "dataset");

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

        {/* Split HUD CTA — Calculadoras (primary) + Datos (secondary) */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={calcHref}
            className="group flex items-center justify-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors hover:border-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]"
          >
            {dict.home.toolsViewCalc}
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
          <Link
            href={dataHref}
            className="group flex items-center justify-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            {dict.home.toolsViewData}
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

      {/* ── DESKTOP (md+) — two panels side-by-side ───────────────────── */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 py-4">

            {/* ── Panel CALCULADORAS ── */}
            <div className="flex flex-col rounded border border-[var(--color-border)]">
              {/* Panel header */}
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2">
                <span
                  aria-hidden="true"
                  className="tool-live-dot inline-block h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-text-muted)]"
                />
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {dict.home.toolsCalculators}
                </span>
                <span className="ml-auto font-mono text-[9px] tabular-nums text-[var(--color-text-muted)]">
                  {calculators.length}
                </span>
              </div>

              {/* Tool rows */}
              <div className="flex flex-1 flex-col">
                {calculators.map((tool) => {
                  const color = toolColor(tool);
                  const href = toolHref(tool, locale);
                  return (
                    <Link
                      key={tool.id}
                      href={href}
                      style={{ "--tool-accent": color } as CSSProperties}
                      className="tool-scope group flex items-center gap-2.5 border-b border-l-2 border-b-[var(--color-border)] border-l-transparent px-3 py-2 transition-colors last:border-b-0 hover:border-l-[var(--tool-accent)] hover:bg-[color-mix(in_srgb,var(--tool-accent)_4%,transparent)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 flex-none rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="flex-1 font-mono text-[13px] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-text-secondary)]">
                        {tool.title[locale]}
                      </span>
                      {tool.sampleStat && (
                        <span
                          className="font-mono text-[11px] tabular-nums"
                          style={{ color }}
                        >
                          {tool.sampleStat.value[locale]}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* CTA footer */}
              <Link
                href={calcHref}
                className="group flex items-center justify-center gap-1.5 border-t border-[var(--color-border)] px-3 py-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text)] transition-colors hover:text-[var(--color-text-secondary)]"
              >
                {dict.home.toolsViewCalc}
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

            {/* ── Panel DATOS ── */}
            <div className="flex flex-col rounded border border-[var(--color-border)]">
              {/* Panel header */}
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-text-muted)]"
                />
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {dict.home.toolsDatasets}
                </span>
                <span className="ml-auto font-mono text-[9px] tabular-nums text-[var(--color-text-muted)]">
                  {datasets.length}
                </span>
              </div>

              {/* Tool rows */}
              <div className="flex flex-1 flex-col">
                {datasets.map((tool) => {
                  const color = toolColor(tool);
                  const href = toolHref(tool, locale);
                  return (
                    <Link
                      key={tool.id}
                      href={href}
                      style={{ "--tool-accent": color } as CSSProperties}
                      className="tool-scope group flex items-center gap-2.5 border-b border-l-2 border-b-[var(--color-border)] border-l-transparent px-3 py-2 transition-colors last:border-b-0 hover:border-l-[var(--tool-accent)] hover:bg-[color-mix(in_srgb,var(--tool-accent)_4%,transparent)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 flex-none rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="flex-1 font-mono text-[13px] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-text-secondary)]">
                        {tool.title[locale]}
                      </span>
                      {tool.sampleStat && (
                        <span
                          className="font-mono text-[11px] tabular-nums"
                          style={{ color }}
                        >
                          {tool.sampleStat.value[locale]}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* CTA footer */}
              <Link
                href={dataHref}
                className="group flex items-center justify-center gap-1.5 border-t border-[var(--color-border)] px-3 py-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {dict.home.toolsViewData}
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
      </div>
    </section>
  );
}
