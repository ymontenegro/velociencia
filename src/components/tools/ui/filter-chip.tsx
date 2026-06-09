import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Pill toggle used across the data explorers' filter rows. Active = filled
 * accent; idle = hairline border. Unifies the duplicated FilterToggle that
 * lived in both gel-comparator and evidence-explorer.
 */
export function FilterChip({ label, active, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-transparent text-white shadow-sm"
          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[color-mix(in_srgb,var(--tool-accent)_45%,var(--color-border))] hover:text-[var(--color-text)]",
        className,
      )}
      style={active ? { backgroundColor: "var(--tool-accent)" } : undefined}
    >
      {label}
    </button>
  );
}
