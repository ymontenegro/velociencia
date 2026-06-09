/**
 * Color helpers for the tools design language ("Race Telemetry").
 *
 * Primitives read the live section accent from the `--tool-accent` custom
 * property set by <ToolPanel>, so a single property re-themes the whole
 * instrument (and adapts to light/dark automatically). These helpers produce
 * `color-mix()` strings against that property — no hex concatenation, which
 * means tints stay correct when the accent flips in dark mode.
 */

/** Accent mixed toward transparency. `pct` 0–100 = accent strength. */
export function accentAlpha(pct: number): string {
  return `color-mix(in srgb, var(--tool-accent) ${pct}%, transparent)`;
}

/** Accent blended into the card surface — for tinted panels/cells. */
export function accentSurface(pct: number): string {
  return `color-mix(in srgb, var(--tool-accent) ${pct}%, var(--color-bg-card))`;
}

/** Mix an arbitrary CSS color toward transparency (for fixed semantic hues). */
export function mixAlpha(color: string, pct: number): string {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}
