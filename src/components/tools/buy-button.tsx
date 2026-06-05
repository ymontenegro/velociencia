"use client";

import { resolveMarketLink } from "@/lib/datasets/resolve-market";
import type { MarketEntry } from "@/lib/datasets/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BuyButtonProps {
  markets: MarketEntry[];
  locale: Locale;
  /** Generic "Buy" label (dict.comparator.colBuy) — used as accessible context. */
  label: string;
  /** dict.comparator.priceRef — the "ref." token shown before the price date. */
  priceRef: string;
  /** Fallback URL (gel.source_url) used when no market resolves to a link. */
  noMarketFallbackUrl: string;
  /** Label for the manufacturer fallback link ("Ver en web" / "View product"). */
  noMarketLabel: string;
  /** Product display name, used to build a descriptive aria-label. */
  productName: string;
  /** Section accent color (hex). Used only as a subtle button accent. */
  color?: string;
  className?: string;
}

/**
 * Per-SKU buy button for the gel comparator.
 *
 * Resolves the preferred market for the active locale via {@link resolveMarketLink}.
 * - When the resolved market carries an affiliate partner, the link is rendered
 *   with `rel="sponsored nofollow noopener"` and shows price + retailer +
 *   "(ref. YYYY-MM)" for transparency / E-E-A-T.
 * - When the resolved market has no partner (manufacturer/retailer fallback) it
 *   still shows price + retailer but drops `sponsored` from `rel`.
 * - When no market resolves at all, it falls back to `noMarketFallbackUrl`
 *   (the manufacturer's source page) WITHOUT `rel=sponsored`.
 *
 * Always renders a link — never returns null — so every row has a destination.
 */
export function BuyButton({
  markets,
  locale,
  label,
  priceRef,
  noMarketFallbackUrl,
  noMarketLabel,
  productName,
  color = "var(--color-nutricion)",
  className,
}: BuyButtonProps) {
  const link = resolveMarketLink(markets, locale);

  const baseClasses =
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-medium transition-colors";

  // No resolvable market → manufacturer fallback, no affiliate tracking.
  if (!link) {
    return (
      <a
        href={noMarketFallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${noMarketLabel}: ${productName}`}
        className={cn(
          baseClasses,
          "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]",
          className,
        )}
      >
        {noMarketLabel}
        <ExternalIcon />
      </a>
    );
  }

  // Affiliate links carry sponsored+nofollow; manufacturer fallbacks do not.
  const rel = link.isAffiliate
    ? "sponsored nofollow noopener noreferrer"
    : "noopener noreferrer";

  const ariaLabel = `${label} ${productName} — ${link.retailer}: ${link.price} (${priceRef} ${link.price_date})`;

  return (
    <a
      href={link.href}
      target="_blank"
      rel={rel}
      aria-label={ariaLabel}
      title={`${link.retailer} · ${priceRef} ${link.price_date}`}
      className={cn(
        baseClasses,
        "font-semibold text-white hover:opacity-90",
        className,
      )}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <span className="tabular-nums">{link.price}</span>
      <ExternalIcon />
    </a>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="h-3 w-3 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}
