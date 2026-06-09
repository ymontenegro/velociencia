import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Instrument-styled native <select>: mono eyebrow label, inset accent-focus
 * field shell, and a custom caret. Used by the data explorers (brand, category).
 */
export function SelectField({
  label,
  value,
  onChange,
  children,
  id,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]"
      >
        {label}
      </label>
      <div className="tool-field relative flex items-center rounded-lg">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="tool-select w-full cursor-pointer rounded-lg py-2.5 pl-3 pr-8 text-sm text-[var(--color-text)]"
        >
          {children}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 text-[var(--color-text-muted)]"
        >
          ▾
        </span>
      </div>
    </div>
  );
}
