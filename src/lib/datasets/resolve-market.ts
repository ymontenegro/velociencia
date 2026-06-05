/**
 * Pure locale → market → affiliate-link resolution.
 *
 * The single place where every dataset with a `markets[]` array turns a
 * locale into a buyable link. No server-only imports, so it works in both
 * server and client component contexts.
 */

import type { Locale } from "@/lib/i18n";
import { buildAffiliateUrl, getPartner } from "@/lib/affiliates";
import type { Market, MarketEntry } from "@/lib/datasets/types";

/**
 * Market preference per locale. ES audience (velociencia.cl) is Chile-first;
 * EN audience (pedalsci.com) is US-first. The first market in the list that
 * has an `available` entry wins.
 */
export const MARKET_PRIORITY: Record<Locale, Market[]> = {
  es: ["CL", "Latam", "EU", "US"],
  en: ["US", "EU", "Latam", "CL"],
};

/**
 * First available MarketEntry following the locale's market priority.
 * Returns null when no market entry is marked `available`.
 */
export function resolveMarket(
  markets: MarketEntry[],
  locale: Locale,
): MarketEntry | null {
  const priority = MARKET_PRIORITY[locale];
  for (const market of priority) {
    const entry = markets.find((m) => m.market === market && m.available);
    if (entry) return entry;
  }
  return null;
}

export interface ResolvedLink {
  href: string;
  retailer: string;
  price: string;
  currency: string;
  price_date: string;
  market: Market;
  /** True only when the link carries an affiliate partner (rel=sponsored). */
  isAffiliate: boolean;
}

/**
 * Resolve the buyable link for the active locale.
 *
 * Picks the preferred available market, then runs the partner lookup +
 * tracking. When `affiliate_partner_id` is empty or unknown, `getPartner`
 * returns null and `buildAffiliateUrl` returns the URL verbatim (manufacturer
 * fallback without tracking). Returns null only when no market is available.
 */
export function resolveMarketLink(
  markets: MarketEntry[],
  locale: Locale,
): ResolvedLink | null {
  const entry = resolveMarket(markets, locale);
  if (!entry) return null;

  const partner = entry.affiliate_partner_id
    ? getPartner(entry.affiliate_partner_id)
    : null;
  const href = buildAffiliateUrl(entry.affiliate_url, partner);

  return {
    href,
    retailer: entry.retailer,
    price: entry.price,
    currency: entry.currency,
    price_date: entry.price_date,
    market: entry.market,
    isAffiliate: partner !== null,
  };
}
