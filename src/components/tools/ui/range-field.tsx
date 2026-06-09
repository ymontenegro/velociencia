import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RangeFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Formatted current value shown in the readout pill (e.g. "2 h 30 min"). */
  display: ReactNode;
  /** Left/right scale captions under the track. */
  minLabel?: string;
  maxLabel?: string;
  id?: string;
  className?: string;
}

/**
 * Instrument dial slider: mono eyebrow label, an accent value pill, and the
 * custom `.tool-range` track whose filled portion is driven by the
 * `--tool-range-fill` percentage. Reads like a bike-computer setting.
 */
export function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
  minLabel,
  maxLabel,
  id,
  className,
}: RangeFieldProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const style = { "--tool-range-fill": `${pct}%` } as CSSProperties;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
        <span
          className="rounded-md px-2 py-0.5 font-mono text-sm font-medium tabular-nums"
          style={{
            color: "var(--tool-accent)",
            backgroundColor: "color-mix(in srgb, var(--tool-accent) 12%, transparent)",
          }}
        >
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="tool-range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={style}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {(minLabel || maxLabel) && (
        <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
