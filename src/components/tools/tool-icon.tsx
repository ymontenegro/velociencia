interface ToolIconProps {
  toolId: string;
  className?: string;
}

/**
 * Hand-drawn line-art icon per calculator, in the same inline-SVG language as
 * `section-preview.tsx`. Uses `currentColor` so callers control the color via
 * text color (e.g. the section accent). 24×24 viewBox, 1.75 stroke.
 *
 * Falls back to a neutral circle for unknown ids — mirrors the existing pattern.
 */
export function ToolIcon({ toolId, className }: ToolIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[toolId] ?? PATHS.__fallback}
    </svg>
  );
}

/**
 * Icon geometry per tool id. Kept as a static map so the component stays a pure,
 * server-renderable function with no per-render branching cost.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Power zones — ascending bars (a mini training-zone chart).
  "power-zones": (
    <>
      <path d="M3 21h18" />
      <rect x="4" y="14" width="3" height="6" rx="0.5" />
      <rect x="9" y="10" width="3" height="10" rx="0.5" />
      <rect x="14" y="6" width="3" height="14" rx="0.5" />
      <rect x="19" y="3" width="1.5" height="17" rx="0.5" />
    </>
  ),

  // Carbohydrate intake — energy gel droplet with a highlight.
  "carb-intake": (
    <>
      <path d="M12 3c3.5 4 5.5 6.8 5.5 9.5a5.5 5.5 0 1 1-11 0C6.5 9.8 8.5 7 12 3z" />
      <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),

  // Power-to-weight — a lightning bolt balanced over a baseline (power ÷ mass).
  "power-to-weight": (
    <>
      <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9z" />
      <path d="M3 22h18" />
    </>
  ),

  // VO2max — a semicircular gauge with a needle.
  "vo2max-estimator": (
    <>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M12 17l4.5-4.5" />
      <circle cx="12" cy="17" r="1.4" />
      <path d="M4 17h1.5M18.5 17H20M12 9v1.5" />
    </>
  ),

  // Training load — a rising wave (CTL/ATL/TSB curve) over axes.
  "training-load": (
    <>
      <path d="M4 4v16h16" />
      <path d="M4 16c3-1 4-6 7-6s4 4 9-2" />
    </>
  ),

  __fallback: <circle cx="12" cy="12" r="8" />,
};
