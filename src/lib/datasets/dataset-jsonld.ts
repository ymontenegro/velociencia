/**
 * Shared JSON-LD builder for dataset tools (kind: "dataset" in TOOLS).
 *
 * Pure module — no fs, no server-only. Produces an ItemList object for each
 * known dataset, or null for unknown toolIds. The pages call this instead of
 * inlining the ItemList logic.
 */

import type { Locale } from "@/lib/i18n";
import { getAllGels, getLastUpdated } from "@/lib/datasets/gels";
import {
  getAllSupplements,
  EVIDENCE_LAST_REVIEWED,
} from "@/lib/datasets/evidence";
import type { EvidenceLevel, EvidenceDirection } from "@/lib/datasets/evidence";

/* ------------------------------------------------------------------ */
/* Small local label maps — avoids pulling in the full i18n dictionary  */
/* from an async server call. Only the values needed for JSON-LD.       */
/* ------------------------------------------------------------------ */

const LEVEL_LABELS: Record<EvidenceLevel, Record<Locale, string>> = {
  fuerte: { es: "fuerte", en: "strong" },
  moderada: { es: "moderada", en: "moderate" },
  limitada: { es: "limitada", en: "limited" },
  en_contra: { es: "en contra", en: "against" },
};

const DIRECTION_LABELS: Record<EvidenceDirection, Record<Locale, string>> = {
  ergogenico: { es: "ergogénico", en: "ergogenic" },
  contextual: { es: "contextual", en: "contextual" },
  nulo: { es: "sin efecto", en: "no effect" },
  perjudicial: { es: "perjudicial", en: "harmful" },
};

/* ------------------------------------------------------------------ */

export interface DatasetJsonLdOpts {
  name: string;
  description: string;
  url: string;
  siteUrl: string;
  publisherName: string;
}

/**
 * Builds the JSON-LD `ItemList` object for a known dataset tool, or returns
 * `null` if the toolId is not a recognized dataset.
 */
export function buildDatasetJsonLd(
  toolId: string,
  locale: Locale,
  opts: DatasetJsonLdOpts,
): object | null {
  const publisher = {
    "@type": "Organization",
    name: opts.publisherName,
    url: opts.siteUrl,
  };

  switch (toolId) {
    case "gel-comparator": {
      const gels = getAllGels();
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: opts.name,
        description: opts.description,
        url: opts.url,
        numberOfItems: gels.length,
        dateModified: getLastUpdated(),
        publisher,
        itemListElement: gels.map((gel, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${gel.brand} ${gel.product_name} ${gel.variant[locale]}`.trim(),
          url: gel.source_url,
          description:
            locale === "es"
              ? `${gel.carbs_g}g carbo/ración, ${gel.sodium_mg}mg sodio${
                  gel.caffeine_mg > 0 ? `, ${gel.caffeine_mg}mg cafeína` : ""
                }`
              : `${gel.carbs_g}g carbs/serving, ${gel.sodium_mg}mg sodium${
                  gel.caffeine_mg > 0 ? `, ${gel.caffeine_mg}mg caffeine` : ""
                }`,
        })),
      };
    }

    case "evidence-explorer": {
      const supplements = getAllSupplements();
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: opts.name,
        description: opts.description,
        url: opts.url,
        numberOfItems: supplements.length,
        dateModified: EVIDENCE_LAST_REVIEWED,
        publisher,
        itemListElement: supplements.map((supplement, i) => {
          const levelLabel = LEVEL_LABELS[supplement.evidence_level][locale];
          const dirLabel =
            DIRECTION_LABELS[supplement.evidence_direction][locale];
          const description =
            locale === "es"
              ? `Nivel de evidencia: ${levelLabel}; dirección: ${dirLabel}.`
              : `Evidence level: ${levelLabel}; direction: ${dirLabel}.`;
          const url =
            supplement.citations[0]?.url ?? `${opts.url}#${supplement.id}`;
          return {
            "@type": "ListItem",
            position: i + 1,
            name: supplement.name[locale],
            url,
            description,
          };
        }),
      };
    }

    default:
      return null;
  }
}
