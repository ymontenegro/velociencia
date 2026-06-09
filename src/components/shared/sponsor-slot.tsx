interface SponsorSlotProps {
  /** "Sponsored by" label (dict.newsletter.sponsoredBy). */
  label: string;
  className?: string;
}

/**
 * Newsletter sponsor slot. Renders only when a sponsor is configured via env
 * (NEXT_PUBLIC_NEWSLETTER_SPONSOR_NAME + _URL), so it stays invisible until
 * there's an actual sponsor to monetize. Styled for the dark newsletter/footer
 * context; reusable in future email templates.
 *
 * Env:
 *   NEXT_PUBLIC_NEWSLETTER_SPONSOR_NAME     — sponsor display name (required)
 *   NEXT_PUBLIC_NEWSLETTER_SPONSOR_URL      — sponsor link (required)
 *   NEXT_PUBLIC_NEWSLETTER_SPONSOR_TAGLINE  — optional one-liner
 */
export function SponsorSlot({ label, className = "" }: SponsorSlotProps) {
  const name = process.env.NEXT_PUBLIC_NEWSLETTER_SPONSOR_NAME;
  const url = process.env.NEXT_PUBLIC_NEWSLETTER_SPONSOR_URL;
  const tagline = process.env.NEXT_PUBLIC_NEWSLETTER_SPONSOR_TAGLINE;

  if (!name || !url) return null;

  return (
    <div
      className={`rounded-sm border border-white/10 bg-white/5 px-3 py-2.5 ${className}`}
    >
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <a
        href={url}
        target="_blank"
        rel="sponsored noopener"
        className="mt-1 block text-sm font-medium text-white/80 transition-colors hover:text-white"
      >
        {name}
        {tagline && (
          <span className="mt-0.5 block font-mono text-[11px] font-normal text-white/40">
            {tagline}
          </span>
        )}
      </a>
    </div>
  );
}
