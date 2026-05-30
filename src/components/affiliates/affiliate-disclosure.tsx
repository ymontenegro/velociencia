interface AffiliateDisclosureProps {
  /** Resolved disclosure text (dict.affiliate.disclosure). */
  text: string;
  variant?: "banner" | "inline";
}

/**
 * Affiliate disclosure required by the FTC, Amazon Associates and Google's
 * paid-link policy. Rendered near the top of any article that contains
 * affiliate links (via the `affiliate: true` frontmatter flag).
 */
export function AffiliateDisclosure({ text, variant = "banner" }: AffiliateDisclosureProps) {
  if (variant === "inline") {
    return (
      <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">{text}</p>
    );
  }

  return (
    <div className="not-prose flex items-start gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3">
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 8h.01M11 12h1v4h1" />
      </svg>
      <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">{text}</p>
    </div>
  );
}
