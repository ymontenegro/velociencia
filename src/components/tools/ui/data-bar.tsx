import { cn } from "@/lib/utils";

interface DataBarProps {
  /** Fill fraction, 0–100. */
  pct: number;
  /** Optional value text rendered above/beside the bar by the caller instead. */
  className?: string;
}

/**
 * Thin inline magnitude bar for ranking tables (e.g. cost-per-carb in the gel
 * comparator). Fills in the section accent so the "best" rows read at a glance.
 */
export function DataBar({ pct, className }: DataBarProps) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-text)_8%,transparent)]",
        className,
      )}
    >
      <div
        className="tool-databar h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
