import { slugify } from "@/lib/utils";

/**
 * Build a stable slug for a tag, folding accents, subscripts/superscripts and
 * casing so variants (Pogačar / pogacar, clásicas / clasicas, VO₂max / VO2max)
 * collapse into a single topic page.
 *
 * This lives in its own module — with no `fs`/server-only imports — so it can be
 * used from both server code (@/lib/tags) and client components (search palette,
 * section toolbar) without pulling the markdown loader into the browser bundle.
 */
export function tagToSlug(tag: string): string {
  const normalized = tag
    .replace(/[₀-₉]/g, (d) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(d)))
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(d)));
  return slugify(normalized, "es");
}
