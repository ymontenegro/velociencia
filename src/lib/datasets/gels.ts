/**
 * Energy gel dataset — source of truth, versioned in git.
 *
 * Nutrition specs are curated manually from each manufacturer's official
 * product page (`source_url`) and cross-checked against retailers / Open Food
 * Facts. Calculated fields (cost per g carb, sodium per g carb, carb density,
 * carbs per 100 kcal) are NEVER stored — they are derived on the fly by
 * {@link computeGelMetrics}. See `.work-datasets/02-design.md` §2.
 */

import type { Locale } from "@/lib/i18n";
import type { MarketEntry } from "@/lib/datasets/types";

export interface GelProduct {
  id: string;
  brand: string;
  product_name: string;
  /** Localized variant name, e.g. { es: "Sin cafeína", en: "Caffeine-free" }. */
  variant: Record<Locale, string>;
  format: "gel" | "bebida-polvo" | "barra" | "chew" | "capsula";
  barcode: string | null;
  /** Official source page — E-E-A-T citation. */
  source_url: string;
  /** ISO YYYY-MM of the last verification. */
  last_verified: string;
  serving_size_g: number;
  servings_per_pack: number | null;
  carbs_g: number;
  sugars_g: number | null;
  protein_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  /** 0 when caffeine-free. */
  caffeine_mg: number;
  sodium_mg: number;
  potassium_mg: number | null;
  calories_kcal: number | null;
  /** Marketing-stated glucose:fructose ratio, e.g. "1:0.8", "2:1". */
  glucose_fructose_ratio: string | null;
  glucose_fructose_ratio_num: number | null;
  carb_sources: string | null;
  vegan: boolean;
  gluten_free: boolean;
  markets: MarketEntry[];
}

export interface GelMetrics {
  /** price_num / carbs_g — the star column. Null when no resolved market. */
  cost_per_g_carb: number | null;
  /** sodium_mg / carbs_g. Null when carbs_g is 0. */
  sodium_per_g_carb: number | null;
  /** carbs_g / serving_size_g. */
  carb_density: number;
  /** (carbs_g / calories_kcal) * 100. Null when calories unknown. */
  carbs_per_100kcal: number | null;
  /** Market resolved for the active locale. */
  preferredMarket: MarketEntry | null;
}

export interface GelFilterState {
  /** "" = all brands. */
  brand: string;
  /** null = indifferent. */
  withCaffeine: boolean | null;
  /** null = indifferent; high = sodium_mg >= 100. */
  highSodium: boolean | null;
  vegan: boolean | null;
  glutenFree: boolean | null;
  /** 0 = no minimum. */
  carbsMin: number;
  /** 999 = no maximum. */
  carbsMax: number;
  /** "" = all formats. */
  format: string;
}

export const DEFAULT_FILTERS: GelFilterState = {
  brand: "",
  withCaffeine: null,
  highSodium: null,
  vegan: null,
  glutenFree: null,
  carbsMin: 0,
  carbsMax: 999,
  format: "",
};

/** Sodium threshold (mg) above which a gel is considered "high sodium". */
export const HIGH_SODIUM_THRESHOLD = 100;

/* ------------------------------------------------------------------ */
/* Calculated fields — pure, never stored                              */
/* ------------------------------------------------------------------ */

/**
 * Derive the calculated metrics for a gel given the market resolved for the
 * active locale. `preferredMarket` may be null when no market is available; in
 * that case cost_per_g_carb is null but the other density metrics still apply.
 */
export function computeGelMetrics(
  gel: GelProduct,
  preferredMarket: MarketEntry | null,
): GelMetrics {
  const cost_per_g_carb =
    preferredMarket && gel.carbs_g > 0
      ? preferredMarket.price_num / gel.carbs_g
      : null;

  const sodium_per_g_carb = gel.carbs_g > 0 ? gel.sodium_mg / gel.carbs_g : null;

  const carb_density =
    gel.serving_size_g > 0 ? gel.carbs_g / gel.serving_size_g : 0;

  const carbs_per_100kcal =
    gel.calories_kcal && gel.calories_kcal > 0
      ? (gel.carbs_g / gel.calories_kcal) * 100
      : null;

  return {
    cost_per_g_carb,
    sodium_per_g_carb,
    carb_density,
    carbs_per_100kcal,
    preferredMarket,
  };
}

/* ------------------------------------------------------------------ */
/* Filtering                                                           */
/* ------------------------------------------------------------------ */

export function filterGels(
  gels: GelProduct[],
  filters: GelFilterState,
): GelProduct[] {
  return gels.filter((gel) => {
    if (filters.brand && gel.brand !== filters.brand) return false;
    if (filters.format && gel.format !== filters.format) return false;

    if (filters.withCaffeine !== null) {
      const hasCaffeine = gel.caffeine_mg > 0;
      if (filters.withCaffeine !== hasCaffeine) return false;
    }

    if (filters.highSodium !== null) {
      const isHigh = gel.sodium_mg >= HIGH_SODIUM_THRESHOLD;
      if (filters.highSodium !== isHigh) return false;
    }

    if (filters.vegan !== null && gel.vegan !== filters.vegan) return false;
    if (filters.glutenFree !== null && gel.gluten_free !== filters.glutenFree)
      return false;

    if (gel.carbs_g < filters.carbsMin) return false;
    if (gel.carbs_g > filters.carbsMax) return false;

    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllGels(): GelProduct[] {
  return GELS;
}

export function getGelById(id: string): GelProduct | null {
  return GELS.find((g) => g.id === id) ?? null;
}

export function getUniqueBrands(): string[] {
  return Array.from(new Set(GELS.map((g) => g.brand))).sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Most recent YYYY-MM across every market price_date and last_verified. */
export function getLastUpdated(): string {
  let latest = "";
  for (const gel of GELS) {
    if (gel.last_verified > latest) latest = gel.last_verified;
    for (const market of gel.markets) {
      if (market.price_date > latest) latest = market.price_date;
    }
  }
  return latest;
}

/* ------------------------------------------------------------------ */
/* Curated dataset — verify each value against source_url before edit  */
/* ------------------------------------------------------------------ */

export const GELS: GelProduct[] = [
  {
    id: "maurten-gel-100",
    brand: "Maurten",
    product_name: "Gel 100",
    variant: { es: "Sin cafeína", en: "Caffeine-free" },
    format: "gel",
    barcode: null,
    source_url: "https://www.maurten.com/products/gel-100-box",
    last_verified: "2026-06",
    serving_size_g: 40,
    servings_per_pack: 12,
    carbs_g: 25,
    sugars_g: 25,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 20,
    potassium_mg: 0,
    calories_kcal: 100,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources: "Glucosa, fructosa",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 3.75",
        price_num: 3.75,
        currency: "USD",
        price_date: "2026-06",
        retailer: "Maurten (sitio oficial, caja de 12 a US$ 45.00)",
        affiliate_partner_id: "maurten",
        affiliate_url: "https://www.maurten.com/products/gel-100-box",
        available: false,
      },
    ],
  },
  {
    id: "maurten-gel-100-caf-100",
    brand: "Maurten",
    product_name: "Gel 100 CAF 100",
    variant: { es: "Con cafeína (100 mg)", en: "With caffeine (100 mg)" },
    format: "gel",
    barcode: null,
    source_url: "https://www.maurten.com/products/gel-100-caf-100-box",
    last_verified: "2026-06",
    serving_size_g: 40,
    servings_per_pack: 12,
    carbs_g: 25,
    sugars_g: 25,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 100,
    sodium_mg: 20,
    potassium_mg: 0,
    calories_kcal: 100,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources: "Glucosa, fructosa",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 4.33",
        price_num: 4.33,
        currency: "USD",
        price_date: "2026-06",
        retailer: "Maurten (sitio oficial, caja de 12 a US$ 52.00)",
        affiliate_partner_id: "maurten",
        affiliate_url: "https://www.maurten.com/products/gel-100-caf-100-box",
        available: false,
      },
    ],
  },
  {
    id: "precision-pf30",
    brand: "Precision Fuel & Hydration",
    product_name: "PF 30 Gel",
    variant: { es: "Original (sin cafeína)", en: "Original (caffeine-free)" },
    format: "gel",
    barcode: null,
    source_url: "https://www.precisionhydration.com/us/en/products/pf-30-gel/",
    last_verified: "2026-06",
    serving_size_g: 51,
    servings_per_pack: 1,
    carbs_g: 30,
    sugars_g: 12,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 0,
    potassium_mg: null,
    calories_kcal: 120,
    glucose_fructose_ratio: "2:1",
    glucose_fructose_ratio_num: 2,
    carb_sources: "Maltodextrina, fructosa",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 3.10",
        price_num: 3.1,
        currency: "USD",
        price_date: "2026-06",
        retailer: "Precision Fuel & Hydration / retailers (Run Flagstaff)",
        affiliate_partner_id: "precision-fuel-hydration",
        affiliate_url: "https://www.precisionhydration.com/us/en/products/pf-30-gel/",
        available: true,
      },
      {
        market: "CL",
        price: "$ 3.750",
        price_num: 3750,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "Precision Fuel & Hydration Chile (pfandh.cl, ex SportsFuel)",
        affiliate_partner_id: "precision-fuel-hydration",
        affiliate_url: "https://pfandh.cl/products/pf-30-gel",
        available: true,
      },
    ],
  },
  {
    id: "precision-pf90",
    brand: "Precision Fuel & Hydration",
    product_name: "PF 90 Gel",
    variant: { es: "Original (sin cafeína)", en: "Original (caffeine-free)" },
    format: "gel",
    barcode: null,
    source_url: "https://www.precisionhydration.com/us/en/products/pf-90-gel/",
    last_verified: "2026-06",
    serving_size_g: 153,
    servings_per_pack: 1,
    carbs_g: 90,
    sugars_g: 36,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 0,
    potassium_mg: null,
    calories_kcal: 360,
    glucose_fructose_ratio: "2:1",
    glucose_fructose_ratio_num: 2,
    carb_sources: "Maltodextrina, fructosa",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 6.67",
        price_num: 6.67,
        currency: "USD",
        price_date: "2026-06",
        retailer: "Precision Fuel & Hydration / retailers (Aid Station)",
        affiliate_partner_id: "precision-fuel-hydration",
        affiliate_url: "https://www.precisionhydration.com/us/en/products/pf-90-gel/",
        available: true,
      },
      {
        market: "CL",
        price: "$ 8.850",
        price_num: 8850,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "Precision Fuel & Hydration Chile (pfandh.cl, ex SportsFuel)",
        affiliate_partner_id: "precision-fuel-hydration",
        affiliate_url: "https://pfandh.cl/products/pf-90-gel",
        available: true,
      },
    ],
  },
  {
    id: "sis-beta-fuel-gel",
    brand: "Science in Sport (SiS)",
    product_name: "Beta Fuel Energy Gel",
    variant: { es: "Naranja", en: "Orange" },
    format: "gel",
    barcode: "5025324010394",
    source_url: "https://www.scienceinsport.com/eu/beta-fuel-gels-sis",
    last_verified: "2026-06",
    serving_size_g: 60,
    servings_per_pack: 6,
    carbs_g: 40,
    sugars_g: 19,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 30,
    potassium_mg: null,
    calories_kcal: 158,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources: "Maltodextrina (de maíz) y fructosa, ratio 1:0.8",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 2.50",
        price_num: 2.5,
        currency: "USD",
        price_date: "2026-06",
        retailer: "The Feed",
        affiliate_partner_id: "the-feed",
        affiliate_url: "https://thefeed.com/products/sis-beta-fuel-gel-1",
        available: true,
      },
      {
        market: "EU",
        price: "€ 2.92",
        price_num: 2.92,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "Science in Sport (EU)",
        affiliate_partner_id: "science-in-sport",
        affiliate_url: "https://www.scienceinsport.com/eu/beta-fuel-gels-sis",
        available: true,
      },
    ],
  },
  {
    id: "sis-go-isotonic",
    brand: "Science in Sport (SiS)",
    product_name: "GO Isotonic Energy Gel",
    variant: { es: "Naranja", en: "Orange" },
    format: "gel",
    barcode: "5025324010295",
    source_url: "https://www.scienceinsport.com/us/go-isotonic-energy-gels",
    last_verified: "2026-06",
    serving_size_g: 60,
    servings_per_pack: 30,
    carbs_g: 22,
    sugars_g: 0,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 4,
    potassium_mg: null,
    calories_kcal: 87,
    glucose_fructose_ratio: null,
    glucose_fructose_ratio_num: null,
    carb_sources:
      "Maltodextrina (de maíz), fuente única de carbohidrato (sin fructosa añadida)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 1.40",
        price_num: 1.4,
        currency: "USD",
        price_date: "2026-06",
        retailer: "The Feed",
        affiliate_partner_id: "the-feed",
        affiliate_url: "https://thefeed.com/products/science-in-sport-energy-gel",
        available: true,
      },
      {
        market: "EU",
        price: "€ 2.30",
        price_num: 2.3,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "BIKE24",
        affiliate_partner_id: "science-in-sport",
        affiliate_url: "https://www.scienceinsport.com/eu/go-isotonic-energy-gels-sis",
        available: true,
      },
    ],
  },
  {
    id: "neversecond-c30",
    brand: "Neversecond",
    product_name: "C30 Energy Gel",
    variant: { es: "Cítrico", en: "Citrus" },
    format: "gel",
    barcode: "0850024671041",
    source_url: "https://never2.com/products/c30-energy-gel-12ct-60ml",
    last_verified: "2026-06",
    serving_size_g: 60,
    servings_per_pack: 12,
    carbs_g: 30,
    sugars_g: 10,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 200,
    potassium_mg: null,
    calories_kcal: 120,
    glucose_fructose_ratio: "2:1",
    glucose_fructose_ratio_num: 2,
    carb_sources: "Maltodextrina y fructosa, ratio 2:1 (glucosa:fructosa)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "EU",
        price: "€ 3.50",
        price_num: 3.5,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "Neversecond EU",
        affiliate_partner_id: "",
        affiliate_url: "https://eu.never2.com/products/c30-energy-gel-12ct-60ml",
        available: true,
      },
    ],
  },
  {
    id: "gu-original",
    brand: "GU Energy Labs",
    product_name: "GU Original Energy Gel",
    variant: {
      es: "sabores surtidos (con y sin cafeína)",
      en: "assorted flavors (caffeinated and non-caffeinated)",
    },
    format: "gel",
    barcode: null,
    source_url: "https://guenergy.com/products/energy-gel",
    last_verified: "2026-06",
    serving_size_g: 32,
    servings_per_pack: 24,
    carbs_g: 22,
    sugars_g: 6,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 60,
    potassium_mg: 40,
    calories_kcal: 100,
    glucose_fructose_ratio: null,
    glucose_fructose_ratio_num: null,
    carb_sources: "Maltodextrina y fructosa (sistema de doble fuente de carbohidratos)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 2.00",
        price_num: 2,
        currency: "USD",
        price_date: "2026-06",
        retailer: "GU Energy Labs (caja de 24 a US$ 48.00)",
        affiliate_partner_id: "gu-energy",
        affiliate_url: "https://guenergy.com/products/energy-gel",
        available: true,
      },
      {
        market: "CL",
        price: "$ 2.990",
        price_num: 2990,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "A Rueda (arueda.cl)",
        affiliate_partner_id: "",
        affiliate_url:
          "https://www.arueda.cl/products/caja-de-24-geles-gu-energy-gel-original-32g-5-sabores",
        available: true,
      },
    ],
  },
  {
    id: "gu-roctane",
    brand: "GU Energy Labs",
    product_name: "GU Roctane Energy Gel",
    variant: {
      es: "sabores surtidos (con y sin cafeína)",
      en: "assorted flavors (caffeinated and non-caffeinated)",
    },
    format: "gel",
    barcode: "769493105011",
    source_url: "https://guenergy.com/products/roctane-energy-gel",
    last_verified: "2026-06",
    serving_size_g: 32,
    servings_per_pack: 24,
    carbs_g: 21,
    sugars_g: 6,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 125,
    potassium_mg: null,
    calories_kcal: 100,
    glucose_fructose_ratio: null,
    glucose_fructose_ratio_num: null,
    carb_sources:
      "Maltodextrina y fructosa (doble fuente) más aminoácidos (BCAA, taurina, beta-alanina)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 3.00",
        price_num: 3,
        currency: "USD",
        price_date: "2026-06",
        retailer: "GU Energy Labs (caja de 24 a US$ 72.00)",
        affiliate_partner_id: "gu-energy",
        affiliate_url: "https://guenergy.com/products/roctane-energy-gel",
        available: true,
      },
      {
        market: "CL",
        price: "$ 4.990",
        price_num: 4990,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "All Nutrition (allnutrition.cl)",
        affiliate_partner_id: "",
        affiliate_url: "https://allnutrition.cl/products/roctane-gel-32g",
        available: true,
      },
    ],
  },
  {
    id: "carbs-fuel-original",
    brand: "Carbs Fuel",
    product_name: "Carbs Fuel Original 50g Energy Gel",
    variant: { es: "Original 50g", en: "Original 50g" },
    format: "gel",
    barcode: null,
    source_url: "https://carbsfuel.com/products/carbs-fuel-energy-gel",
    last_verified: "2026-06",
    serving_size_g: 55,
    servings_per_pack: 18,
    carbs_g: 50,
    sugars_g: null,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
    caffeine_mg: 0,
    sodium_mg: 105,
    potassium_mg: null,
    calories_kcal: 200,
    glucose_fructose_ratio: "2:1",
    glucose_fructose_ratio_num: 2,
    carb_sources: "Maltodextrina, sucrosa y fructosa",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "US",
        price: "US$ 2.00",
        price_num: 2,
        currency: "USD",
        price_date: "2026-06",
        retailer: "Carbs Fuel (caja de 18 a US$ 36.00)",
        affiliate_partner_id: "",
        affiliate_url: "https://carbsfuel.com/products/carbs-fuel-energy-gel",
        available: true,
      },
      {
        market: "EU",
        price: "£ 2.10",
        price_num: 2.1,
        currency: "GBP",
        price_date: "2026-06",
        retailer: "XMiles (xmiles.co.uk, UK)",
        affiliate_partner_id: "",
        affiliate_url: "https://xmiles.co.uk/products/carbs-fuel-energy-gel",
        available: true,
      },
    ],
  },
  {
    id: "226ers-high-energy",
    brand: "226ERS",
    product_name: "High Energy Gel",
    variant: {
      es: "76 g (sabor neutro/estándar)",
      en: "76 g (neutral/standard flavor)",
    },
    format: "gel",
    barcode: "8436621421856",
    source_url: "https://www.226ers.com/en/high-energy-gel-76g-62291.html",
    last_verified: "2026-06",
    serving_size_g: 76,
    servings_per_pack: 1,
    carbs_g: 50,
    sugars_g: 24.1,
    protein_g: 0,
    fat_g: 0,
    fiber_g: null,
    caffeine_mg: 0,
    sodium_mg: 40,
    potassium_mg: null,
    calories_kcal: 200,
    glucose_fructose_ratio: null,
    glucose_fructose_ratio_num: null,
    carb_sources:
      "Jarabe de glucosa, maltodextrina, sacarosa y dextrina cíclica altamente ramificada (Cluster Dextrin / ciclodextrina)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "CL",
        price: "$ 6.090",
        price_num: 6090,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "MercadoLibre Chile",
        affiliate_partner_id: "mercado-libre-cl",
        affiliate_url:
          "https://articulo.mercadolibre.cl/MLC-2725653824-226ers-gel-high-energy-50-gr-de-carbohidratos-por-gel-_JM",
        available: true,
      },
      {
        market: "CL",
        price: "$ 5.490",
        price_num: 5490,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "The Fuel Place",
        affiliate_partner_id: "",
        affiliate_url: "https://thefuelplace.com/products/high-energy-gel-salty-frutilla",
        available: true,
      },
      {
        market: "EU",
        price: "€ 3,50",
        price_num: 3.5,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "226ers.com",
        affiliate_partner_id: "",
        affiliate_url: "https://www.226ers.com/en/high-energy-gel-76g-62291.html",
        available: true,
      },
    ],
  },
  {
    id: "226ers-high-fructose",
    brand: "226ERS",
    product_name: "High Fructose Gel",
    variant: {
      es: "80 g (55 g de carbohidratos)",
      en: "80 g (55 g carbs)",
    },
    format: "gel",
    barcode: "8436567356557",
    source_url:
      "https://www.226ers.com/en/products/high-fructose-gel-energy-gel-80g-220566",
    last_verified: "2026-06",
    serving_size_g: 80,
    servings_per_pack: 1,
    carbs_g: 55,
    sugars_g: 25.2,
    protein_g: 0,
    fat_g: 0,
    fiber_g: null,
    caffeine_mg: 0,
    sodium_mg: 250,
    potassium_mg: null,
    calories_kcal: 220,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources:
      "Maltodextrina y fructosa en proporción 10:8 (equivalente a 1:0,8 glucosa:fructosa)",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "CL",
        price: "$ 5.990",
        price_num: 5990,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "MercadoLibre Chile",
        affiliate_partner_id: "mercado-libre-cl",
        affiliate_url:
          "https://www.mercadolibre.cl/226ers-gel-high-fructose-55-gr-de-carbohidratos-por-gel-sabor-banana/p/MLC41105417",
        available: true,
      },
      {
        market: "CL",
        price: "$ 3.590",
        price_num: 3590,
        currency: "CLP",
        price_date: "2026-06",
        retailer: "A Rueda",
        affiliate_partner_id: "",
        affiliate_url:
          "https://www.arueda.cl/products/226ers-high-fructose-gel-gel-energetico-con-fructosa-3-formatos-80-g-44-g-y-en-caja-de",
        available: true,
      },
      {
        market: "EU",
        price: "€ 2,80",
        price_num: 2.8,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "226ers.com",
        affiliate_partner_id: "",
        affiliate_url:
          "https://www.226ers.com/en/products/high-fructose-gel-energy-gel-80g-220566",
        available: true,
      },
    ],
  },
  {
    id: "veloforte-gel",
    brand: "Veloforte",
    product_name: "Veloforte Natural Energy Gel",
    variant: {
      es: "Tempo (dátil, limón y jengibre)",
      en: "Tempo (Date, Lemon & Ginger)",
    },
    format: "gel",
    barcode: null,
    source_url: "https://veloforte.com/pages/mixed-energy-gels-nutritionals",
    last_verified: "2026-06",
    serving_size_g: 33,
    servings_per_pack: 12,
    carbs_g: 22,
    sugars_g: 17,
    protein_g: 0.3,
    fat_g: 0.1,
    fiber_g: 0.1,
    caffeine_mg: 0,
    sodium_mg: 110,
    potassium_mg: 20,
    calories_kcal: 89,
    glucose_fructose_ratio: null,
    glucose_fructose_ratio_num: null,
    carb_sources:
      "Jarabe de arroz integral (glucosa) + jarabe de dátil/jugo de fruta (fructosa); sin maltodextrina",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "EU",
        price: "£ 2.20",
        price_num: 2.2,
        currency: "GBP",
        price_date: "2026-06",
        retailer: "Veloforte (web oficial)",
        affiliate_partner_id: "",
        affiliate_url: "https://veloforte.com/products/tempo-natural-energy-sports-gel",
        available: true,
      },
    ],
  },
  {
    id: "styrkr-gel",
    brand: "STYRKR",
    product_name: "STYRKR GEL30 Dual-Carb Energy Gel",
    variant: {
      es: "GEL30 (frambuesa y fresa, dual-carb 1:0,8)",
      en: "GEL30 (Strawberry & Raspberry, dual-carb 1:0.8)",
    },
    format: "gel",
    barcode: null,
    source_url: "https://styrkr.com/products/gel30-dual-carb-gel",
    last_verified: "2026-06",
    serving_size_g: 72,
    servings_per_pack: 12,
    carbs_g: 30,
    sugars_g: 13.3,
    protein_g: 0.01,
    fat_g: 0.01,
    fiber_g: 0.17,
    caffeine_mg: 0,
    sodium_mg: 0,
    potassium_mg: null,
    calories_kcal: 128,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources: "Maltodextrina + fructosa (ratio 1:0,8); incluye L-arginina y L-citrulina",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "EU",
        price: "£ 2.08",
        price_num: 2.08,
        currency: "GBP",
        price_date: "2026-06",
        retailer: "STYRKR (web oficial, caja de 12 a £ 24.99)",
        affiliate_partner_id: "",
        affiliate_url: "https://styrkr.com/products/gel30-dual-carb-gel",
        available: true,
      },
    ],
  },
  {
    id: "amacx-turbo",
    brand: "Amacx",
    product_name: "Amacx Turbo Gel",
    variant: {
      es: "Turbo Gel Citrus (alto en carbohidratos, 40 g, 1:0,8)",
      en: "Turbo Gel Citrus (high-carb, 40 g, 1:0.8)",
    },
    format: "gel",
    barcode: null,
    source_url: "https://amacx.com/products/turbo-gel-citrus",
    last_verified: "2026-06",
    serving_size_g: 60,
    servings_per_pack: 12,
    carbs_g: 40,
    sugars_g: 20.7,
    protein_g: 0,
    fat_g: 0,
    fiber_g: null,
    caffeine_mg: 0,
    sodium_mg: 200,
    potassium_mg: null,
    calories_kcal: 160,
    glucose_fructose_ratio: "1:0.8",
    glucose_fructose_ratio_num: 1,
    carb_sources: "Maltodextrina (glucosa) + fructosa, ratio 1:0,8",
    vegan: true,
    gluten_free: true,
    markets: [
      {
        market: "EU",
        price: "€ 3.58",
        price_num: 3.58,
        currency: "EUR",
        price_date: "2026-06",
        retailer: "Amacx (web oficial, pack de 12 a € 42.95)",
        affiliate_partner_id: "",
        affiliate_url: "https://amacx.com/products/turbo-gel-citrus",
        available: true,
      },
    ],
  },
];
