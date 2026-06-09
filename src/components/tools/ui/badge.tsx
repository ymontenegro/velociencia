import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { accentAlpha } from "./colors";

interface MetaBadgeProps {
  children: ReactNode;
  /** Show a leading live dot. */
  live?: boolean;
  className?: string;
}

/**
 * Accent-tinted status pill — "Actualizado: …", result counts, etc. Mono type
 * for the telemetry feel.
 */
export function MetaBadge({ children, live = false, className }: MetaBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tabular-nums",
        className,
      )}
      style={{ backgroundColor: accentAlpha(13), color: "var(--tool-accent)" }}
    >
      {live && (
        <span
          aria-hidden="true"
          className="tool-live-dot h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "var(--tool-accent)" }}
        />
      )}
      {children}
    </span>
  );
}
