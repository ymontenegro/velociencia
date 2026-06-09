import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  id?: string;
  /** Small helper/hint line under the field. */
  hint?: ReactNode;
  /** Show +/- stepper buttons. Default true. */
  stepper?: boolean;
  readOnly?: boolean;
  className?: string;
}

/**
 * Instrument-style numeric input: mono eyebrow label, inset field that lights
 * up with the section accent on focus, inline unit, and an optional +/- stepper
 * that reads like a bike-computer control. Fully controlled (string value).
 */
export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  placeholder,
  id,
  hint,
  stepper = true,
  readOnly = false,
  className,
}: NumberFieldProps) {
  const clamp = (n: number): number => {
    let r = n;
    if (typeof min === "number") r = Math.max(min, r);
    if (typeof max === "number") r = Math.min(max, r);
    return r;
  };

  const nudge = (dir: 1 | -1) => {
    const current = parseFloat(value);
    const base = Number.isFinite(current) ? current : (min ?? 0);
    const next = clamp(base + dir * step);
    // Preserve integer vs decimal step formatting.
    const decimals = step % 1 === 0 ? 0 : String(step).split(".")[1]?.length ?? 1;
    onChange(next.toFixed(decimals));
  };

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
      >
        {label}
      </label>
      <div className="tool-field flex items-stretch overflow-hidden rounded-lg">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full min-w-0 bg-transparent px-3 py-2.5 font-mono text-base tabular-nums text-[var(--color-text)] outline-none",
            readOnly && "opacity-65",
          )}
        />
        {unit && (
          <span className="flex items-center pr-2 font-mono text-xs text-[var(--color-text-muted)]">
            {unit}
          </span>
        )}
        {stepper && !readOnly && (
          <div className="flex flex-none flex-col border-l border-[var(--color-border)]">
            <StepBtn label="+" onClick={() => nudge(1)} />
            <span className="h-px bg-[var(--color-border)]" />
            <StepBtn label="−" onClick={() => nudge(-1)} />
          </div>
        )}
      </div>
      {hint && (
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  );
}

function StepBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={onClick}
      className="flex h-1/2 w-8 items-center justify-center font-mono text-sm leading-none text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border-light)] hover:text-[var(--tool-accent)]"
    >
      {label}
    </button>
  );
}
