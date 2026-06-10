import Link from "next/link";
import type { ToolInfo } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";
import { ToolCard } from "./tool-card";

interface ToolsIndexProps {
  tools: ToolInfo[];
  locale: Locale;
  indexTitle: string;
  indexSubtitle: string;
  openTool: string;
  /** CTA label for dataset tools (e.g. "Ver comparador"). Falls back to openTool. */
  openDataset?: string;
  /** Group header for interactive calculators (e.g. "Calculadoras"). */
  groupCalculators?: string;
  /** Group header for data explorer tools (e.g. "Datos"). */
  groupDatasets?: string;
  /**
   * Optional Race Telemetry cross-link block rendered below the tool grid.
   * Guides visitors towards the complementary section (/datos ↔ /herramientas).
   */
  crossCta?: { href: string; label: string };
}

/**
 * Server Component — index page for /herramientas and /tools.
 *
 * Race Telemetry header: mono eyebrow, HUD instrument counters (N CALC · M DATA),
 * multi-section gradient bar, decorative glows. Below the header, tools are split
 * into two groups: interactive calculators and data-explorer datasets. Each group
 * has its own mono eyebrow + section divider line and a sub-grid of ToolCards.
 */
export function ToolsIndex({
  tools,
  locale,
  indexTitle,
  indexSubtitle,
  openTool,
  openDataset,
  groupCalculators = locale === "en" ? "Calculators" : "Calculadoras",
  groupDatasets = locale === "en" ? "Data" : "Datos",
  crossCta,
}: ToolsIndexProps) {
  const calculators = tools.filter((t) => t.kind !== "dataset");
  const datasets = tools.filter((t) => t.kind === "dataset");

  // Auto-detect nav eyebrow: "Datos"/"Data" when showing only datasets.
  const navLabel =
    calculators.length === 0 && datasets.length > 0
      ? locale === "en" ? "Data" : "Datos"
      : locale === "en" ? "Tools" : "Herramientas";

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        {/* Decorative section glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-[0.08] blur-2xl"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-28 top-8 h-44 w-44 rounded-full opacity-[0.07] blur-2xl"
          style={{ background: "radial-gradient(circle, #0891B2, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full opacity-[0.05] blur-2xl"
          style={{ background: "radial-gradient(circle, #0D9488, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {/* Mono eyebrow */}
          <div className="mb-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-text-muted)]"
            />
            <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {navLabel}
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {indexTitle}
          </h1>

          {/* Multi-section gradient instrument bar */}
          <div
            className="mt-4 h-[3px] w-16 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #0D9488 0%, #7C3AED 40%, #0891B2 70%, #E11D48 100%)",
            }}
          />

          <p className="mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
            {indexSubtitle}
          </p>

          {/* HUD instrument counters — only render counts for kinds actually present */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {calculators.length > 0 && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-bold tabular-nums leading-none text-[var(--color-text)]">
                  {calculators.length}
                </span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {groupCalculators}
                </span>
              </div>
            )}
            {calculators.length > 0 && datasets.length > 0 && (
              <span
                aria-hidden="true"
                className="font-mono text-[var(--color-text-muted)] opacity-30 select-none"
              >
                ·
              </span>
            )}
            {datasets.length > 0 && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-bold tabular-nums leading-none text-[var(--color-text)]">
                  {datasets.length}
                </span>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {groupDatasets}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tool groups ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-12 sm:space-y-14 lg:px-8 lg:py-16">
        {tools.length === 0 && (
          <p className="font-serif text-xl italic text-[var(--color-text-muted)]">
            {locale === "en" ? "No tools available." : "Sin herramientas disponibles."}
          </p>
        )}

        {/* Calculators group */}
        {calculators.length > 0 && (
          <section aria-label={groupCalculators}>
            {/* Group eyebrow + extending rule */}
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <div
                className="h-[2px] w-8 flex-none rounded-full"
                style={{
                  background: "linear-gradient(90deg, #0D9488, #7C3AED)",
                }}
              />
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {groupCalculators}
                <span className="ml-2 text-[var(--color-text)]">{calculators.length}</span>
              </span>
              <div className="flex-1 border-t border-[var(--color-border-light)]" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  locale={locale}
                  openTool={openTool}
                />
              ))}
            </div>
          </section>
        )}

        {/* Datasets group */}
        {datasets.length > 0 && (
          <section aria-label={groupDatasets}>
            {/* Group eyebrow + extending rule */}
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <div
                className="h-[2px] w-8 flex-none rounded-full"
                style={{
                  background: "linear-gradient(90deg, #E11D48, #0891B2)",
                }}
              />
              <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                {groupDatasets}
                <span className="ml-2 text-[var(--color-text)]">{datasets.length}</span>
              </span>
              <div className="flex-1 border-t border-[var(--color-border-light)]" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {datasets.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  locale={locale}
                  openTool={openDataset ?? openTool}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Cross-section CTA — Race Telemetry border link ────────────── */}
        {crossCta && (
          <div>
            <Link
              href={crossCta.href}
              className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-4 transition-colors hover:bg-[var(--color-bg-card)]/80"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-[2px] w-6 flex-none rounded-full"
                  style={{ background: "linear-gradient(90deg, #E11D48, #0891B2)" }}
                />
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]">
                  {crossCta.label}
                </span>
              </div>
              <svg
                aria-hidden="true"
                className="h-4 w-4 flex-none text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
