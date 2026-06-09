"use client";

import { useEffect, useState } from "react";

/**
 * Resolve a CSS custom property (e.g. a section accent var like
 * `--color-nutricion`) to its concrete computed color. Needed by Recharts,
 * which renders to SVG and wants a real color string rather than a `var()`.
 *
 * Returns `fallback` during SSR and first paint (avoids hydration mismatch),
 * then upgrades to the computed value after mount. Re-reads when the `dark`
 * class toggles on <html> so charts follow theme changes live.
 */
export function useAccentColor(varName: string, fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      if (v) setColor(v);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [varName]);

  return color;
}
