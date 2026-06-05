/**
 * Shared types for all filterable datasets (gels, glossary, climbs, …).
 *
 * Pure module — no fs/server-only imports — so it can be consumed from server
 * routes, RSC and client components alike. This is the single type layer the
 * five data assets share.
 */

export type Market = "EU" | "US" | "CL" | "Latam";

export interface MarketEntry {
  market: Market;
  /** Formatted price: "US$ 3.80", "€ 3.50", "$ 3.200". */
  price: string;
  /** Numeric value used to derive cost_per_g_carb. */
  price_num: number;
  currency: string;
  /** ISO YYYY-MM of the last price check. */
  price_date: string;
  retailer: string;
  /** FK → id in AFFILIATE_PARTNERS. Empty string when no viable partner. */
  affiliate_partner_id: string;
  /** Verbatim deep-link or manufacturer URL (fallback without tracking). */
  affiliate_url: string;
  available: boolean;
}
