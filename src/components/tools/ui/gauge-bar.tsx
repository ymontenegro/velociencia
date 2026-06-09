import { cn } from "@/lib/utils";

export interface GaugeSegment {
  label: string;
  /** Width of this band in domain units (e.g. W/kg or ml/kg/min). */
  width: number;
  color: string;
}

interface GaugeBarProps {
  segments: GaugeSegment[];
  /** User's value, in the same units as segment widths. */
  value: number;
  /** Text shown in the marker pill (already formatted). */
  valueLabel: string;
  /** Whether the marker is shown (hide on invalid input). */
  showMarker?: boolean;
  /** Format a boundary tick value. Defaults to a rounded integer. */
  formatTick?: (n: number) => string;
  className?: string;
}

/**
 * Horizontal category gauge with a value needle — an instrument scale that
 * replaces the stacked-bar Recharts gauges in the W/kg and VO₂max tools.
 * Boundary ticks are derived from the cumulative segment widths; the marker
 * pill rides the accent color and points down to the user's position.
 */
export function GaugeBar({
  segments,
  value,
  valueLabel,
  showMarker = true,
  formatTick = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1)),
  className,
}: GaugeBarProps) {
  const total = segments.reduce((sum, s) => sum + s.width, 0) || 1;

  // Cumulative boundaries: [0, w0, w0+w1, ..., total].
  const boundaries: number[] = [0];
  let acc = 0;
  for (const s of segments) {
    acc += s.width;
    boundaries.push(acc);
  }

  const markerPct = Math.min(100, Math.max(0, (value / total) * 100));

  return (
    <div className={cn("select-none", className)}>
      {/* Marker rail */}
      <div className="relative h-7">
        {showMarker && (
          <div
            className="absolute top-0 -translate-x-1/2"
            style={{ left: `${markerPct}%` }}
          >
            <span
              className="block whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[11px] font-medium tabular-nums text-white shadow-sm"
              style={{ backgroundColor: "var(--tool-accent)" }}
            >
              {valueLabel}
            </span>
            <span
              aria-hidden="true"
              className="mx-auto block h-2 w-px"
              style={{ backgroundColor: "var(--tool-accent)" }}
            />
          </div>
        )}
      </div>

      {/* Segmented track */}
      <div className="relative flex h-3.5 overflow-hidden rounded-full">
        {segments.map((s, i) => (
          <div
            key={i}
            style={{ flexBasis: `${(s.width / total) * 100}%`, backgroundColor: s.color }}
          />
        ))}
        {/* Needle line down through the track */}
        {showMarker && (
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/80 mix-blend-overlay"
            style={{ left: `${markerPct}%` }}
          />
        )}
      </div>

      {/* Boundary ticks */}
      <div className="relative mt-1 h-4">
        {boundaries.map((b, i) => {
          const pct = (b / total) * 100;
          const align =
            i === 0
              ? "translate-x-0 text-left"
              : i === boundaries.length - 1
                ? "-translate-x-full text-right"
                : "-translate-x-1/2 text-center";
          return (
            <span
              key={i}
              className={cn(
                "absolute font-mono text-[10px] tabular-nums text-[var(--color-text-muted)]",
                align,
              )}
              style={{ left: `${pct}%` }}
            >
              {formatTick(b)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

interface GaugeLegendProps {
  segments: GaugeSegment[];
  /** Index of the active band to emphasize, or -1. */
  activeIndex?: number;
  className?: string;
}

/** Wrapping swatch legend for a GaugeBar's category bands. */
export function GaugeLegend({ segments, activeIndex = -1, className }: GaugeLegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1.5", className)}>
      {segments.map((s, i) => {
        const active = i === activeIndex;
        return (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 flex-none rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span
              className={cn(
                "text-xs",
                active
                  ? "font-semibold text-[var(--color-text)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
