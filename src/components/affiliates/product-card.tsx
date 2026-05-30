import { getProduct, getPartner, buildAffiliateUrl, productColor } from "@/lib/affiliates";
import type { Locale } from "@/lib/i18n";

interface ProductCardLabels {
  cta: string;
  disclosureShort: string;
}

interface ProductCardProps {
  /** Product id from the affiliate registry. */
  id?: string;
  locale: Locale;
  labels: ProductCardLabels;
}

/**
 * Affiliate product card for embedding inside an article via MDX:
 *   <ProductCard id="maurten-gel-100" />
 * Renders nothing when the id is unknown, so a typo never shows an empty box.
 * The CTA is rel="sponsored nofollow" per Google's paid-link guidance.
 */
export function ProductCard({ id, locale, labels }: ProductCardProps) {
  const product = id ? getProduct(id) : null;
  if (!product) return null;

  const partner = getPartner(product.partnerId);
  const href = buildAffiliateUrl(product.url, partner);
  const color = productColor(product);
  const price = product.price?.[locale];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="flex gap-4 p-4 sm:p-5">
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 flex-shrink-0 rounded-md object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          {partner && (
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color }}
            >
              {partner.name}
            </p>
          )}
          <h4 className="mt-0.5 font-serif text-base font-bold leading-snug text-[var(--color-text)]">
            {product.name}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {product.blurb[locale]}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              {price ? `${labels.cta} · ${price}` : labels.cta}
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
              </svg>
            </a>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              {labels.disclosureShort}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
