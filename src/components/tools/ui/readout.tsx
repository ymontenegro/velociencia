import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { accentAlpha, accentSurface } from "./colors";

interface ReadoutProps {
  /** Mono eyebrow label above the value (e.g. "G/H RECOMENDADOS"). */
  label: string;
  /** The hero value — already formatted. */
  value: ReactNode;
  /** Trailing unit (e.g. "g/h", "W/kg"). */
  unit?: string;
  /** Secondary line under the value (context, range, classification). */
  sub?: ReactNode;
  /** Accent the value + label (primary readout). Default true. */
  primary?: boolean;
  /** Re-key on change to replay the settle-in animation. */
  animateKey?: string | number;
  className?: string;
}

/**
 * The signature element of the toolset: a big DM Mono number that reads like a
 * bike-computer field. `primary` readouts glow in the section accent; secondary
 * ones stay neutral. Re-keying via `animateKey` replays the odometer settle.
 */
export function Readout({
  label,
  value,
  unit,
  sub,
  primary = true,
  animateKey,
  className,
}: ReadoutProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p
        className="mb-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em]"
        style={{ color: primary ? "var(--tool-accent)" : "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-1.5">
        <span
          key={animateKey}
          className="tool-readout-anim font-mono text-5xl font-medium leading-none tabular-nums tracking-tight"
          style={{ color: primary ? "var(--tool-accent)" : "var(--color-text)" }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-base font-medium text-[var(--color-text-secondary)]">
            {unit}
          </span>
        )}
      </div>
      {sub && (
        <div className="mt-1.5 text-sm text-[var(--color-text-muted)]">{sub}</div>
      )}
    </div>
  );
}

interface ReadoutPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Tinted enclosure for one or more <Readout>s — the highlighted result area.
 * Accent-tinted surface + hairline accent border, matching the instrument face.
 */
export function ReadoutPanel({ children, className }: ReadoutPanelProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl p-4 sm:p-5", className)}
      style={{
        backgroundColor: accentSurface(7),
        border: `1px solid ${accentAlpha(28)}`,
      }}
    >
      {children}
    </div>
  );
}
