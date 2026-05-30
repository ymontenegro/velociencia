import type { ReactNode } from "react";
import { getPartner, buildAffiliateUrl } from "@/lib/affiliates";

interface GearLinkProps {
  /** Partner id from the affiliate registry (drives tracking). Optional. */
  partner?: string;
  /** Destination URL (brand product page or network deep link). */
  url: string;
  children: ReactNode;
}

/**
 * Inline affiliate link for use inside article prose, e.g.
 *   <GearLink partner="competitive-cyclist" url="https://...">este sillín</GearLink>
 * Always rel="sponsored nofollow" per Google's paid-link guidance.
 */
export function GearLink({ partner, url, children }: GearLinkProps) {
  const href = buildAffiliateUrl(url, partner ? getPartner(partner) : null);
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="font-medium underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]"
    >
      {children}
    </a>
  );
}
