import type { Locale } from "@/lib/i18n";
import { SECTIONS, type SectionId } from "@/lib/constants";

/**
 * Affiliate monetization registry (Fase 2).
 *
 * Pure module (no fs/server-only imports) so it can be used from server routes,
 * RSC and the MDX component map. No tracking IDs are hardcoded — they come from
 * environment variables at runtime via {@link buildAffiliateUrl}, so the repo
 * never ships personal affiliate credentials.
 *
 * Two link strategies, both correct and non-breaking:
 *   1. Param-based networks (Amazon, some direct programs): we append the
 *      tracking param from env when present, otherwise leave the URL untouched.
 *   2. Redirect/deep-link networks (Awin, Impact, AvantLink, CJ): the writer
 *      pastes the network-generated deep link as the product/link `url`; we use
 *      it verbatim.
 */

export type AffiliateCategory =
  | "bikes"
  | "components"
  | "apparel"
  | "nutrition"
  | "accessories"
  | "tech"
  | "marketplace";

export interface AffiliatePartner {
  /** Stable kebab-case id. */
  id: string;
  /** Brand/store display name. */
  name: string;
  category: AffiliateCategory;
  /** Affiliate network the program runs on (where Yerko applies). */
  network: string;
  /** Commission, for internal reference. Null when unknown. */
  commission: string | null;
  /** Cookie window, for internal reference. Null when unknown. */
  cookieWindow: string | null;
  /** Where to sign up for the affiliate program. */
  signupUrl: string;
  /** Brand homepage (default link destination until a deep link is provided). */
  homepageUrl: string;
  region: string;
  blurb: Record<Locale, string>;
  /**
   * Tracking configuration. For param-based networks set `trackParam` (the query
   * key) and `envKey` (the env var holding the value). Amazon is handled via the
   * shared NEXT_PUBLIC_AMAZON_TAG. Leave undefined for redirect-link networks.
   */
  trackParam?: string;
  envKey?: string;
}

export interface AffiliateProduct {
  id: string;
  partnerId: string;
  name: string;
  /** Section the product is most relevant to (for in-article suggestions). */
  sectionId: SectionId;
  /** Tags used to match the product to article tags. */
  tags: string[];
  blurb: Record<Locale, string>;
  /** Optional display price (already formatted, e.g. "US$ 4,50/gel"). */
  price?: Record<Locale, string>;
  /**
   * Destination URL. Either a brand product page (param-tracking will be added
   * when configured) or a full network deep link (used verbatim).
   */
  url: string;
  /** Optional product image (CDN/brand URL). Card degrades gracefully without it. */
  image?: string;
}

/* ------------------------------------------------------------------ */
/* Registry — researched catalog (2025-2026). Real signup URLs; no       */
/* tracking baked in. Commission/cookie data is for internal reference   */
/* only and may change — verify on each program before relying on it.    */
/* ------------------------------------------------------------------ */

export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: "competitive-cyclist",
    name: "Competitive Cyclist",
    category: "marketplace",
    network: "AvantLink",
    commission: "5–12%",
    cookieWindow: "30 días",
    signupUrl: "https://www.avantlink.com/programs/11465/competitive-cyclist-affiliate-program/",
    homepageUrl: "https://www.competitivecyclist.com/",
    region: "US",
    blurb: {
      es: "Tienda premium de ruta y MTB con ticket promedio sobre USD 250; también está en Impact.",
      en: "Premium road and MTB retailer with $250+ average order value; also available on Impact.",
    },
  },
  {
    id: "jenson-usa",
    name: "Jenson USA",
    category: "marketplace",
    network: "AvantLink",
    commission: "3–6%",
    cookieWindow: "30 días",
    signupUrl: "https://www.avantlink.com/programs/11473/jenson-usa-affiliate-program/",
    homepageUrl: "https://www.jensonusa.com/",
    region: "US",
    blurb: {
      es: "Más de 30.000 productos: bicis, componentes y accesorios con buenos precios; también en Impact.",
      en: "30,000+ products spanning bikes, components and accessories at good prices; also on Impact.",
    },
  },
  {
    id: "backcountry",
    name: "Backcountry",
    category: "marketplace",
    network: "AvantLink",
    commission: "4–12% (8% inicial)",
    cookieWindow: "30 días",
    signupUrl: "https://www.avantlink.com/programs/10060/backcountry-com-affiliate-program/",
    homepageUrl: "https://www.backcountry.com/",
    region: "US",
    blurb: {
      es: "Gran tienda outdoor con surtido de ruta, gravel y MTB; sin mínimo de pago, también en Impact.",
      en: "Large outdoor retailer covering road, gravel and MTB; no minimum payout, also on Impact.",
    },
  },
  {
    id: "worldwide-cyclery",
    name: "Worldwide Cyclery",
    category: "marketplace",
    network: "Direct",
    commission: "4–10% (base 7%)",
    cookieWindow: "30 días",
    signupUrl: "https://worldwidecyclery.com/pages/affiliate-program",
    homepageUrl: "https://worldwidecyclery.com/",
    region: "US",
    blurb: {
      es: "Tienda MTB/ruta enfocada en creadores, gestionada vía Affiliatly con manager dedicado.",
      en: "MTB/road shop that courts creators, run via Affiliatly with a dedicated manager.",
    },
  },
  {
    id: "bike24",
    name: "BIKE24",
    category: "marketplace",
    network: "Awin",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.bike24.com/",
    homepageUrl: "https://www.bike24.com/",
    region: "EU/UK",
    blurb: {
      es: "Gran tienda alemana que envía a toda Europa; programa de afiliados activo (consultar red/comisión en su web).",
      en: "Major German shop shipping across Europe; active affiliate program (check network/rate on their site).",
    },
  },
  {
    id: "bike-components-de",
    name: "bike-components",
    category: "marketplace",
    network: "Awin",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.bike-components.de/en/affiliate-programme/",
    homepageUrl: "https://www.bike-components.de/en/",
    region: "EU/UK",
    blurb: {
      es: "Tienda alemana de componentes y repuestos con programa de afiliados propio para audiencia europea.",
      en: "German components and spares shop with its own affiliate program aimed at European audiences.",
    },
  },
  {
    id: "ican-cycling",
    name: "ICAN Cycling",
    category: "bikes",
    network: "ShareASale",
    commission: "5% (mayor por volumen)",
    cookieWindow: "30 días",
    signupUrl: "https://icancycling.com/pages/affiliate-program",
    homepageUrl: "https://icancycling.com/",
    region: "Global",
    blurb: {
      es: "Bicis y ruedas de carbono directo de fábrica (USD 1.499–3.799); también vía ShareASale o GoAffPro.",
      en: "Direct-to-consumer carbon bikes and wheels ($1,499–3,799); also via ShareASale or GoAffPro.",
    },
  },
  {
    id: "muc-off",
    name: "Muc-Off",
    category: "accessories",
    network: "Impact",
    commission: "7%",
    cookieWindow: null,
    signupUrl: "https://us.muc-off.com/pages/affiliate-program",
    homepageUrl: "https://us.muc-off.com/",
    region: "Global",
    blurb: {
      es: "Limpieza, lubricantes y cuidado de bici; US vía Impact, UK/EU vía Webgains.",
      en: "Bike cleaning, lubes and care; US via Impact, UK/EU via Webgains.",
    },
  },
  {
    id: "muc-off-uk",
    name: "Muc-Off (UK/EU)",
    category: "accessories",
    network: "Webgains",
    commission: "7%",
    cookieWindow: null,
    signupUrl: "https://muc-off.com/pages/affiliate-programme",
    homepageUrl: "https://muc-off.com/",
    region: "EU/UK",
    blurb: {
      es: "Versión europea del programa Muc-Off gestionada por Webgains para tráfico UK/EU.",
      en: "European arm of the Muc-Off program run through Webgains for UK/EU traffic.",
    },
  },
  {
    id: "pearl-izumi",
    name: "PEARL iZUMi",
    category: "apparel",
    network: "Direct",
    commission: "5–10%",
    cookieWindow: "30 días",
    signupUrl: "https://www.pearlizumi.com/pages/affiliate-program",
    homepageUrl: "https://www.pearlizumi.com/",
    region: "US",
    blurb: {
      es: "Ropa técnica de ciclismo (maillots, culottes, calzado); también accesible vía FlexOffers.",
      en: "Technical cycling apparel (jerseys, bibs, footwear); also accessible via FlexOffers.",
    },
  },
  {
    id: "wahoo-fitness",
    name: "Wahoo Fitness",
    category: "tech",
    network: "Refersion",
    commission: "hasta 10% (7,5% en rodillos smart)",
    cookieWindow: "7 días",
    signupUrl: "https://wahoofitness.refersion.com/",
    homepageUrl: "https://www.wahoofitness.com/",
    region: "Global",
    blurb: {
      es: "Ciclocomputadores, rodillos inteligentes y sensores; pago vía PayPal trimestral.",
      en: "Bike computers, smart trainers and sensors; quarterly PayPal payouts.",
    },
  },
  {
    id: "maurten",
    name: "Maurten",
    category: "nutrition",
    network: "addrevenue",
    commission: "14%",
    cookieWindow: "30 días",
    signupUrl: "https://addrevenue.io/en/join/maurten",
    homepageUrl: "https://www.maurten.com/",
    region: "Global",
    blurb: {
      es: "Geles e hidratación de hidrogel usados por el pelotón WorldTour; programa selectivo, sin sitios de cupones.",
      en: "Hydrogel gels and drink mixes used across the WorldTour peloton; selective program, no coupon sites.",
    },
  },
  {
    id: "science-in-sport",
    name: "Science in Sport (SiS)",
    category: "nutrition",
    network: "Awin",
    commission: "8–10%",
    cookieWindow: "30 días",
    signupUrl: "https://www.scienceinsport.com/",
    homepageUrl: "https://www.scienceinsport.com/",
    region: "EU/UK",
    blurb: {
      es: "Nutrición de resistencia (geles Beta Fuel, GO), proveedor de equipos como INEOS Grenadiers; pago en ≤14 días.",
      en: "Endurance nutrition (Beta Fuel, GO gels), supplier to teams like INEOS Grenadiers; payment within 14 days.",
    },
  },
  {
    id: "precision-fuel-hydration",
    name: "Precision Fuel & Hydration",
    category: "nutrition",
    network: "Direct",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.precisionhydration.com/help-center/",
    homepageUrl: "https://www.precisionhydration.com/",
    region: "Global",
    blurb: {
      es: "Geles, mezclas e hidratación personalizada; trabaja con afiliados pero el alta no está publicada (contactar directo).",
      en: "Gels, mixes and personalized hydration; works with affiliates but signup isn't public (contact direct).",
    },
  },
  {
    id: "gu-energy",
    name: "GU Energy Labs",
    category: "nutrition",
    network: "AvantLink",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.avantlink.com/signup/",
    homepageUrl: "https://guenergy.com/",
    region: "US",
    blurb: {
      es: "Geles, masticables y bebidas para resistencia; programa propio dentro de AvantLink.",
      en: "Gels, chews and drink mixes for endurance; custom program hosted in AvantLink.",
    },
  },
  {
    id: "tailwind-nutrition",
    name: "Tailwind Nutrition",
    category: "nutrition",
    network: "AvantLink",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.avantlink.com/programs/16349/tailwind-nutrition-affiliate-program/",
    homepageUrl: "https://tailwindnutrition.com/",
    region: "US",
    blurb: {
      es: "Bebida todo-en-uno de calorías, electrolitos e hidratación, popular en gravel y ultradistancia.",
      en: "All-in-one calorie, electrolyte and hydration drink mix popular in gravel and ultra-distance.",
    },
  },
  {
    id: "the-feed",
    name: "The Feed",
    category: "nutrition",
    network: "CJ",
    commission: "7%",
    cookieWindow: null,
    signupUrl: "https://www.cj.com/",
    homepageUrl: "https://thefeed.com/",
    region: "US",
    blurb: {
      es: "Marketplace de más de 100 marcas de nutrición deportiva; socio oficial de USA Cycling, envío gratis sobre USD 49.",
      en: "Marketplace of 100+ sports nutrition brands; official USA Cycling partner, free shipping over $49.",
    },
  },
  {
    id: "amazon-associates",
    name: "Amazon Associates",
    category: "marketplace",
    network: "Amazon Associates",
    commission: "1–4,5% (Deportes/Outdoor ~3%)",
    cookieWindow: "24 h (90 días si se agrega al carrito)",
    signupUrl: "https://affiliate-program.amazon.com/",
    homepageUrl: "https://www.amazon.com/",
    region: "Global",
    blurb: {
      es: "Marketplace universal para cualquier producto; comisiones bajas pero acepta a todos y convierte bien.",
      en: "Universal marketplace for any product; low commissions but accepts everyone and converts well.",
    },
    trackParam: "tag",
    envKey: "NEXT_PUBLIC_AMAZON_TAG",
  },
  {
    id: "mercado-libre-cl",
    name: "Mercado Libre Chile",
    category: "marketplace",
    network: "Direct",
    commission: "8–15%",
    cookieWindow: null,
    signupUrl: "https://afiliados.mercadolibre.cl/",
    homepageUrl: "https://www.mercadolibre.cl/",
    region: "CL",
    blurb: {
      es: "Marketplace líder en Chile; programa de afiliados activo para la categoría Deporte y Fitness.",
      en: "Leading marketplace in Chile; active affiliate program for the Sports and Fitness category.",
    },
  },
  {
    id: "iherb",
    name: "iHerb",
    category: "nutrition",
    network: "Direct",
    commission: "5–10%",
    cookieWindow: "7 días",
    signupUrl: "https://www.iherb.com/info/affiliates",
    homepageUrl: "https://cl.iherb.com/",
    region: "Global",
    blurb: {
      es: "Suplementos deportivos con envío a Chile; comisión 5% base, hasta 10% en períodos promocionales.",
      en: "Sports supplements shipping to Chile; 5% base commission, up to 10% during promotional periods.",
    },
  },
  {
    id: "sport-live-nutrition",
    name: "Sport Live Nutrition",
    category: "nutrition",
    network: "Direct",
    commission: null,
    cookieWindow: null,
    signupUrl: "https://www.sportlivenutrition.cl/",
    homepageUrl: "https://www.sportlivenutrition.cl/",
    region: "CL",
    blurb: {
      es: "Nutrición deportiva chilena con programa de afiliados directo confirmado.",
      en: "Chilean sports nutrition retailer with a confirmed direct affiliate program.",
    },
  },
];

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: "maurten-gel-100",
    partnerId: "maurten",
    name: "Maurten Gel 100",
    sectionId: "nutricion",
    tags: ["carbohidratos", "geles", "hidratación"],
    blurb: {
      es: "25 g de carbohidratos por gel en formato hidrogel, suave para el estómago.",
      en: "25 g of carbohydrate per gel in a hydrogel format that's easy on the gut.",
    },
    url: "https://www.maurten.com/products/gel-100-box",
  },
  {
    id: "muc-off-bike-cleaner",
    partnerId: "muc-off",
    name: "Muc-Off Nano Tech Bike Cleaner",
    sectionId: "entrenamiento",
    tags: ["mantenimiento", "limpieza"],
    blurb: {
      es: "Limpiador biodegradable para dejar la transmisión como nueva.",
      en: "Biodegradable cleaner that brings your drivetrain back to life.",
    },
    url: "https://muc-off.com/products/nano-tech-bike-cleaner",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllPartners(): AffiliatePartner[] {
  return AFFILIATE_PARTNERS;
}

export function getPartner(id: string): AffiliatePartner | null {
  return AFFILIATE_PARTNERS.find((p) => p.id === id) ?? null;
}

export function getProduct(id: string): AffiliateProduct | null {
  return AFFILIATE_PRODUCTS.find((p) => p.id === id) ?? null;
}

function normalizeTag(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Suggest affiliate products relevant to an article: products whose tags match
 * the article's tags first, then products from the same section. Capped at `limit`.
 */
export function getProductsForArticle(
  sectionId: SectionId,
  tags: string[] = [],
  limit = 2,
): AffiliateProduct[] {
  const tagSet = new Set(tags.map(normalizeTag));
  const byTag = AFFILIATE_PRODUCTS.filter((p) =>
    p.tags.some((t) => tagSet.has(normalizeTag(t))),
  );
  const bySection = AFFILIATE_PRODUCTS.filter(
    (p) => p.sectionId === sectionId && !byTag.includes(p),
  );
  return [...byTag, ...bySection].slice(0, limit);
}

/**
 * Apply the partner's tracking to a URL using env-provided credentials.
 * Never breaks the link: if no credential is configured, the URL is returned
 * unchanged. Redirect-link networks (no trackParam) are also returned as-is.
 */
export function buildAffiliateUrl(rawUrl: string, partner: AffiliatePartner | null): string {
  if (!partner?.trackParam || !partner.envKey) return rawUrl;
  const value = process.env[partner.envKey];
  if (!value) return rawUrl;
  try {
    const url = new URL(rawUrl);
    url.searchParams.set(partner.trackParam, value);
    return url.toString();
  } catch {
    // Relative or malformed URL: leave it untouched.
    return rawUrl;
  }
}

/** Section accent color for a product (via its relevant section). */
export function productColor(product: AffiliateProduct): string {
  return SECTIONS[product.sectionId].color;
}
