import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Mono eyebrow label above the control. */
  label?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * Segmented toggle with a sliding accent pill (e.g. intensity, sex). The pill
 * is a single absolutely-positioned element that translates to the active
 * segment — pure CSS, no measurement — giving a smooth instrument-switch feel.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  ariaLabel,
  className,
}: SegmentedProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const n = options.length;

  const pillStyle = {
    width: `calc((100% - 6px) / ${n})`,
    transform: `translateX(${activeIndex * 100}%)`,
    backgroundColor: "var(--tool-accent)",
  } as CSSProperties;

  return (
    <div className={cn("min-w-0", className)}>
      {label && (
        <p className="mb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
          {label}
        </p>
      )}
      <div
        role="radiogroup"
        aria-label={ariaLabel ?? label}
        className="relative flex rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-text)_4%,var(--color-bg-card))] p-[3px]"
      >
        {/* Sliding pill */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[3px] left-[3px] rounded-[7px] shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={pillStyle}
        />
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={cn(
                "relative z-10 flex-1 rounded-[7px] px-2 py-2 text-sm font-medium transition-colors duration-200",
                active
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
