import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ToolPanelProps {
  /** Concrete hex fallback for the section accent (used before CSS var resolves). */
  accent: string;
  /** Section accent CSS var name, e.g. "--color-nutricion". Drives --tool-accent. */
  accentVar: string;
  /** Mono, uppercase technical label above the title (e.g. "NUTRICIÓN · CALCULADORA"). */
  eyebrow?: string;
  /** Display title (serif). Omit to render a header with only the eyebrow/meta. */
  title?: string;
  /** Right-aligned header slot — last-updated badge, live readout, count, etc. */
  meta?: ReactNode;
  /** Blinking "signal" dot next to the eyebrow. Default true. */
  live?: boolean;
  /** HUD corner ticks. Default true. */
  corners?: boolean;
  /** One-time light sweep across the header on reveal. Default true. */
  sweep?: boolean;
  children: ReactNode;
  className?: string;
  /** Padding wrapper around children; pass "" to lay out children edge-to-edge. */
  contentClassName?: string;
}

/**
 * Instrument-panel shell shared by every calculator and data explorer.
 *
 * Renders the "Race Telemetry" frame: gradient-faced card, faint telemetry
 * grid, HUD corner ticks, a mono eyebrow with a live signal dot, and a serif
 * title with an accent rule. Sets `--tool-accent` from the section var (with a
 * hex fallback) so all nested primitives + utilities pick up the section color
 * and adapt to dark mode.
 */
export function ToolPanel({
  accent,
  accentVar,
  eyebrow,
  title,
  meta,
  live = true,
  corners = true,
  sweep = true,
  children,
  className,
  contentClassName = "p-5 sm:p-7",
}: ToolPanelProps) {
  const style = {
    "--tool-accent": `var(${accentVar}, ${accent})`,
  } as CSSProperties;

  return (
    <section
      className={cn(
        "tool-scope tool-panel not-prose relative overflow-hidden rounded-2xl",
        corners && "tool-corners",
        className,
      )}
      style={style}
    >
      {/* Telemetry grid — fades out toward the bottom for depth. */}
      <div
        aria-hidden="true"
        className="tool-grid-bg pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 55%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 55%)",
        }}
      />

      {(eyebrow || title || meta) && (
        <header
          className={cn(
            "relative border-b border-[var(--color-border)] px-5 pb-4 pt-5 sm:px-7",
            sweep && "tool-sweep overflow-hidden",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {eyebrow && (
                <div className="flex items-center gap-2">
                  {live && (
                    <span
                      aria-hidden="true"
                      className="tool-live-dot h-1.5 w-1.5 flex-none rounded-full"
                      style={{ backgroundColor: "var(--tool-accent)" }}
                    />
                  )}
                  <span className="truncate font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {eyebrow}
                  </span>
                </div>
              )}
              {title && (
                <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-[var(--color-text)] sm:text-2xl">
                  {title}
                </h3>
              )}
            </div>
            {meta && <div className="flex-none">{meta}</div>}
          </div>

          {title && (
            <div
              className="mt-3 h-[2px] w-10 rounded-full"
              style={{ backgroundColor: "var(--tool-accent)" }}
            />
          )}
        </header>
      )}

      <div className={cn("relative", contentClassName)}>{children}</div>
    </section>
  );
}
