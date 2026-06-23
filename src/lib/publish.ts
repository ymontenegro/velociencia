import type { ArticleStatus } from "@/types/article";

/**
 * Publication / scheduling helpers.
 *
 * Markdown files are the source of truth for the public site. An article's
 * visibility is derived purely from its frontmatter, with no database or cron
 * involved:
 *
 *   - `draft: true`                  → never public (work in progress)
 *   - `date` in the future           → "scheduled": hidden until that calendar day
 *   - otherwise                      → "published": live
 *
 * Because every public page is rendered per-request (host-based i18n reads
 * `headers()`), a scheduled article becomes visible automatically the moment
 * its `date` arrives — the next request re-evaluates `today`. No rebuild needed,
 * as long as the file is already deployed with its future date.
 *
 * This module is intentionally free of Node-only imports so it can be shared by
 * server code (markdown.ts, sitemap) and client admin components (status badges).
 */

/**
 * Timezone the editorial calendar runs on. The site is Chile-based, so a
 * "publish on 2026-06-30" means the Chilean calendar day, regardless of where
 * the server runs (prod is UTC on Hetzner).
 */
export const SITE_TIMEZONE = "America/Santiago";

/**
 * Today's date as `YYYY-MM-DD` in the site timezone. `en-CA` formats dates in
 * ISO-like `YYYY-MM-DD` order, which sorts and compares lexicographically.
 */
export function siteTodayStr(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * Normalize a frontmatter date to a comparable `YYYY-MM-DD` string, or null if
 * it isn't a valid date. Accepts plain dates and ISO datetimes (takes the date
 * part). Returning null means "treat as undated" (published / always visible).
 */
export function normalizeDateStr(date: unknown): string | null {
  if (typeof date !== "string") {
    // gray-matter may parse an unquoted YAML date into a Date object.
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      return siteTodayStr(date);
    }
    return null;
  }
  const head = date.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(head) ? head : null;
}

type GateInput = { draft?: boolean; date?: unknown };

/**
 * Derive the editorial status of an article from its frontmatter.
 */
export function articleStatus(fm: GateInput, now: Date = new Date()): ArticleStatus {
  if (fm.draft === true) return "draft";
  const d = normalizeDateStr(fm.date);
  if (d && d > siteTodayStr(now)) return "scheduled";
  return "published";
}

/**
 * Whether an article should be visible on the public site right now.
 */
export function isPubliclyVisible(fm: GateInput, now: Date = new Date()): boolean {
  return articleStatus(fm, now) === "published";
}

/** Label + accent color for each status (shared by all admin surfaces). */
export const STATUS_META: Record<ArticleStatus, { label: string; color: string }> = {
  draft: { label: "Borrador", color: "#64748B" }, // slate
  scheduled: { label: "Programado", color: "#D97706" }, // amber
  published: { label: "Publicado", color: "#059669" }, // emerald
};
