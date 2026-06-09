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
}

/**
 * Server Component — index page for /herramientas and /tools.
 * Race Telemetry header: mono eyebrow, multi-section instrument bar, decorative
 * glows. Grid renders shared <ToolCard> which handles the per-tool accent.
 */
export function ToolsIndex({
  tools,
  locale,
  indexTitle,
  indexSubtitle,
  openTool,
  openDataset,
}: ToolsIndexProps) {
  const navLabel = locale === "en" ? "Tools" : "Herramientas";

  return (
    <div>
      {/* Page header */}
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

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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

          <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            {indexTitle}
          </h1>

          {/* Multi-section instrument bar */}
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
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                locale={locale}
                openTool={
                  tool.kind === "dataset" && openDataset ? openDataset : openTool
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
