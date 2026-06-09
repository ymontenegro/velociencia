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
import {
  getAllClimbs,
  fietsIndex,
  CLIMBS_LAST_REVIEWED,
} from "@/lib/datasets/climbs";
import { getAllRaces, RACES_LAST_REVIEWED } from "@/lib/datasets/races";

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

    case "climbs-database": {
      const climbs = getAllClimbs();
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: opts.name,
        description: opts.description,
        url: opts.url,
        numberOfItems: climbs.length,
        dateModified: CLIMBS_LAST_REVIEWED,
        publisher,
        itemListElement: climbs.map((climb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: climb.name,
          url: climb.source_url,
          description:
            locale === "es"
              ? `${climb.region.es}. ${climb.length_km} km al ${climb.avg_gradient}% de media, ${climb.elevation_gain_m} m de desnivel; cima a ${climb.summit_elevation_m} m. Índice FIETS ${fietsIndex(climb).toFixed(1)}.`
              : `${climb.region.en}. ${climb.length_km} km at ${climb.avg_gradient}% average, ${climb.elevation_gain_m} m of gain; summit at ${climb.summit_elevation_m} m. FIETS index ${fietsIndex(climb).toFixed(1)}.`,
        })),
      };
    }

    case "race-calendar": {
      const races = getAllRaces();
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: opts.name,
        description: opts.description,
        url: opts.url,
        numberOfItems: races.length,
        dateModified: RACES_LAST_REVIEWED,
        publisher,
        itemListElement: races.map((race, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SportsEvent",
            name: race.name,
            sport: "Cycling",
            startDate: race.start_date,
            endDate: race.end_date,
            ...(race.website ? { url: race.website } : {}),
            location: {
              "@type": "Country",
              address: { "@type": "PostalAddress", addressCountry: race.country },
            },
          },
        })),
      };
    }

    default:
      return null;
  }
}
