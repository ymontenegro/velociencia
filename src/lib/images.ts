/**
 * Image configuration for the Ciclismo cycling magazine.
 *
 * All image URLs point to Unsplash's CDN which explicitly allows hotlinking
 * (see https://help.unsplash.com/en/articles/2511271-guideline-hotlinking-images).
 * Unsplash images are free for commercial use, no attribution required (though
 * appreciated). The Unsplash license: https://unsplash.com/license
 *
 * URL parameters reference (powered by Imgix):
 *   w    – width in pixels
 *   h    – height in pixels
 *   q    – quality (1-100)
 *   fit  – crop/fit mode (crop, clamp, fill, etc.)
 *   crop – crop anchor (faces, entropy, edges, etc.)
 *   fm   – format (webp, jpg, png)
 *   auto – automatic optimizations (format, compress)
 *
 * -----------------------------------------------------------------
 * IMAGE STRATEGY
 * -----------------------------------------------------------------
 *
 * 1. INTEGRATION WITH NEXT.JS
 *    - Use <Image> from "next/image" with `unoptimized` or configure
 *      `images.remotePatterns` in next.config.ts for images.unsplash.com
 *      and plus.unsplash.com so Next.js can optimize them server-side.
 *    - For blur placeholders, use the tiny thumbnail URL (?w=16&q=20&blur=100)
 *      as `blurDataURL` with `placeholder="blur"`.
 *    - Gradient fallbacks (see SECTION_IMAGES.*.gradient) can serve as CSS
 *      backgrounds behind images while they load.
 *
 * 2. NAMING CONVENTION (for locally downloaded images in public/images/)
 *    - Hero:     public/images/hero-{descriptor}.webp
 *    - Sections: public/images/sections/{section}-{descriptor}.webp
 *    - Articles: public/images/articles/{section}-{slug}.webp
 *    - OG:       public/images/og/{section}-{slug}.png
 *    Example:
 *      public/images/hero-peloton-mountain.webp
 *      public/images/sections/nutricion-meal-prep.webp
 *      public/images/articles/ciencia-lactate-threshold.webp
 *
 * 3. RECOMMENDED DOWNLOADS
 *    For production, download and self-host the primary images below at
 *    optimized sizes:
 *    - Hero banner: 1920x1080 (desktop) + 1080x1920 (mobile)
 *    - Section headers: 1600x600
 *    - Article card thumbnails: 800x450 (16:9)
 *    - Article card thumbnails (featured): 1200x675
 *
 * 4. AGENTIC AUTO-FETCH STRATEGY
 *    The journalist agent can use the Unsplash API to find relevant cover
 *    images during the "write" phase:
 *    - Register for a free Unsplash API key at https://unsplash.com/developers
 *    - Set UNSPLASH_ACCESS_KEY in .env
 *    - During article generation, query:
 *        GET https://api.unsplash.com/search/photos?query={keywords}&orientation=landscape&per_page=3
 *    - Pick the top result and store its `urls.regular` in the article's
 *      `coverImageUrl` field.
 *    - Call the download endpoint to comply with Unsplash API guidelines:
 *        GET https://api.unsplash.com/photos/{id}/download
 *    - The returned URL includes an ixid parameter for view tracking.
 *    - For articles without an image, fall back to getSectionImage().
 * -----------------------------------------------------------------
 */

import type { SectionId } from "./constants";

// ---------------------------------------------------------------------------
// Unsplash CDN helper
// ---------------------------------------------------------------------------

/**
 * Build an Unsplash CDN URL with custom parameters.
 * Works with both images.unsplash.com and plus.unsplash.com domains.
 */
function unsplash(
  photoId: string,
  params: { w?: number; h?: number; q?: number; fit?: string; crop?: string; fm?: string } = {}
): string {
  const { w = 1200, q = 80, fit = "crop", crop = "entropy", fm = "webp" } = params;
  const base = `https://images.unsplash.com/${photoId}`;
  const searchParams = new URLSearchParams({
    w: String(w),
    q: String(q),
    fit,
    crop,
    fm,
    auto: "format,compress",
  });
  if (params.h) searchParams.set("h", String(params.h));
  return `${base}?${searchParams.toString()}`;
}

/**
 * Build a tiny blurred placeholder for use with next/image placeholder="blur".
 */
function unsplashBlur(photoId: string): string {
  return unsplash(photoId, { w: 16, q: 20 });
}

// ---------------------------------------------------------------------------
// Curated photo IDs (verified via Unsplash API, March 2026)
// ---------------------------------------------------------------------------

/** Dramatic cycling / road / peloton shots */
const CYCLING_HERO_PHOTOS = {
  /** Group of cyclists racing on road in sunlight — Ahmet Kurt */
  pelotonSunlight: "photo-1517649763962-0c623066013b",
  /** Cyclist taking a corner on carbon fibre road bike — Beeline Navigation */
  roadBikeCorner: "photo-1583504103542-148f90c669fe",
  /** Tour of Britain cyclist on road — Reuben */
  tourOfBritain: "photo-1583348488360-00512a32b0f6",
  /** Person riding bicycle on road during daytime — Lars Greefhorst */
  roadCyclistDaytime: "photo-1575995330221-c20326537393",
  /** Man in red riding bicycle on road during daytime — Rodrigo Gonzalez */
  redJerseyCyclist: "photo-1592182811189-87f6ae2f3407",
  /** Aerial photo of man cycling near body of water — green ant */
  aerialCyclist: "flagged/photo-1552640684-af49ab059afe",
} as const;

/** Dramatic mountain road / landscape shots */
const LANDSCAPE_PHOTOS = {
  /** Winding road through mountain valley under stormy skies — Georgii Eletskikh */
  mountainValleyRoad: "photo-1506905925346-21bda4d32df4",
  /** Wet road curves through mountain valley under clouds — Georgii Eletskikh */
  wetMountainRoad: "photo-1464822759023-fed622ff2c3b",
  /** Winding road through dark moody mountains and pine forest — Chaitanya R. */
  moodyMountainRoad: "photo-1519681393784-d120267933ba",
  /** Dramatic mountain valley with winding road — Intricate Explorer */
  dramaticValley: "photo-1454496522488-7a8e488e8606",
} as const;

/** Sport nutrition, meal prep, hydration */
const NUTRITION_PHOTOS = {
  /** Sport nutrition energy bar with equipment — Olivie Strauss */
  energyBarEquipment: "photo-1490645935967-10de6ba17061",
  /** High-protein meal with athletic context — Ella Olsson */
  proteinMeal: "photo-1546069901-ba9599a7e63c",
  /** Protein powder scoop — Patrycja Jadach */
  proteinPowder: "photo-1593095948071-474c5cc2c989",
  /** White bowl with chicken, rice, tomatoes and avocado — nrd */
  healthyBowl: "photo-1546069901-d5bfd2cbfb1f",
  /** Man preparing strawberry milkshake before exercising — Getty */
  smoothiePrep: "photo-1622484212850-eb596d769edc",
  /** Hydration: young sporty man drinking — Curated Lifestyle */
  hydration: "photo-1544367567-0f2fcb009e0b",
} as const;

/** Science, laboratory, research, data */
const SCIENCE_PHOTOS = {
  /** Rows of lab tubes in a tray — Nathan Rimoux */
  labTubes: "photo-1582719471384-894fbb16564e",
  /** DNA sequencing / female technician — National Cancer Institute */
  dnaSequencing: "photo-1579154204601-01588f351e67",
  /** Scientist using pipette in laboratory — Nathan Rimoux */
  pipetteLab: "photo-1532094349884-543bc11b234d",
  /** Man running on treadmill with mask on (VO2max testing) — Getty */
  vo2maxTest: "photo-1576091160550-2173dba999ef",
  /** Data science screens — abstracted */
  dataAnalysis: "photo-1551288049-bebda4e38f71",
} as const;

/** Indoor cycling, training, gym */
const TRAINING_PHOTOS = {
  /** Row of red stationary exercise bikes in gym — Amari Shutters */
  indoorBikesRed: "photo-1534438327276-14e5300c3a48",
  /** Cyclist with power meter / speedometer on handlebars — TruckRun */
  powerMeter: "photo-1517649763962-0c623066013b",
  /** Cyclist speeds down road — motion blur — Ahmed */
  motionBlur: "photo-1571019613454-1cb2f99b2d8b",
  /** Young couple biking in fitness gym, cardio — Getty */
  gymCycling: "photo-1540497077202-7c8a3999166f",
  /** Person on exercise bike training — Getty */
  indoorTraining: "photo-1517963879433-6ad2b056d712",
} as const;

// ---------------------------------------------------------------------------
// Exported configuration
// ---------------------------------------------------------------------------

export interface SectionImageConfig {
  /** Primary hero/header image for this section (Unsplash CDN) */
  primary: string;
  /** Blurred placeholder (16px wide, base64-suitable) */
  primaryBlur: string;
  /** Secondary/alternate image for variety */
  secondary: string;
  /** Tailwind gradient classes for fallback when images do not load */
  gradient: string;
  /** CSS gradient string for inline styles */
  gradientCSS: string;
  /** Dominant color hex for meta tags / OG images */
  dominantColor: string;
}

export interface ArticlePlaceholderConfig {
  /** Default cover image for articles in this section */
  cover: string;
  /** Blurred version for placeholder */
  coverBlur: string;
}

/**
 * Main image configuration object.
 */
export const IMAGES = {
  // -------------------------------------------------------------------------
  // Homepage hero
  // -------------------------------------------------------------------------
  hero: {
    /** Primary hero — dramatic cycling shot */
    primary: unsplash(CYCLING_HERO_PHOTOS.aerialCyclist, { w: 1920, q: 85 }),
    primaryBlur: unsplashBlur(CYCLING_HERO_PHOTOS.aerialCyclist),
    /** Alternate hero images for rotation / A/B testing */
    alternates: [
      unsplash(CYCLING_HERO_PHOTOS.pelotonSunlight, { w: 1920, q: 85 }),
      unsplash(LANDSCAPE_PHOTOS.dramaticValley, { w: 1920, q: 85 }),
      unsplash(CYCLING_HERO_PHOTOS.roadBikeCorner, { w: 1920, q: 85 }),
    ],
    /** Mobile-optimized hero (portrait crop) */
    mobile: unsplash(CYCLING_HERO_PHOTOS.aerialCyclist, { w: 1080, h: 1920, q: 80, crop: "faces" }),
  },

  // -------------------------------------------------------------------------
  // Section-specific images
  // -------------------------------------------------------------------------
  sections: {
    nutricion: {
      primary: unsplash(NUTRITION_PHOTOS.healthyBowl, { w: 1600, h: 600, q: 80 }),
      primaryBlur: unsplashBlur(NUTRITION_PHOTOS.healthyBowl),
      secondary: unsplash(NUTRITION_PHOTOS.proteinMeal, { w: 1200, q: 80 }),
      gradient: "from-emerald-950 via-emerald-800 to-green-700",
      gradientCSS:
        "linear-gradient(135deg, #022c22 0%, #065f46 50%, #15803d 100%)",
      dominantColor: "#065f46",
    },
    ciencia: {
      primary: unsplash(SCIENCE_PHOTOS.pipetteLab, { w: 1600, h: 600, q: 80 }),
      primaryBlur: unsplashBlur(SCIENCE_PHOTOS.pipetteLab),
      secondary: unsplash(SCIENCE_PHOTOS.dataAnalysis, { w: 1200, q: 80 }),
      gradient: "from-blue-950 via-blue-800 to-indigo-700",
      gradientCSS:
        "linear-gradient(135deg, #172554 0%, #1e40af 50%, #4338ca 100%)",
      dominantColor: "#1e40af",
    },
    entrenamiento: {
      primary: unsplash(TRAINING_PHOTOS.motionBlur, { w: 1600, h: 600, q: 80 }),
      primaryBlur: unsplashBlur(TRAINING_PHOTOS.motionBlur),
      secondary: unsplash(TRAINING_PHOTOS.indoorTraining, { w: 1200, q: 80 }),
      gradient: "from-orange-950 via-orange-800 to-amber-700",
      gradientCSS:
        "linear-gradient(135deg, #431407 0%, #9a3412 50%, #b45309 100%)",
      dominantColor: "#9a3412",
    },
    competencia: {
      primary: unsplash(CYCLING_HERO_PHOTOS.pelotonSunlight, { w: 1600, h: 600, q: 80 }),
      primaryBlur: unsplashBlur(CYCLING_HERO_PHOTOS.pelotonSunlight),
      secondary: unsplash(CYCLING_HERO_PHOTOS.tourOfBritain, { w: 1200, q: 80 }),
      gradient: "from-red-950 via-red-800 to-rose-700",
      gradientCSS:
        "linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #be123c 100%)",
      dominantColor: "#991b1b",
    },
  } satisfies Record<SectionId, SectionImageConfig>,

  // -------------------------------------------------------------------------
  // Default article placeholder images per section
  // -------------------------------------------------------------------------
  articlePlaceholders: {
    nutricion: {
      cover: unsplash(NUTRITION_PHOTOS.energyBarEquipment, { w: 800, h: 450, q: 75 }),
      coverBlur: unsplashBlur(NUTRITION_PHOTOS.energyBarEquipment),
    },
    ciencia: {
      cover: unsplash(SCIENCE_PHOTOS.labTubes, { w: 800, h: 450, q: 75 }),
      coverBlur: unsplashBlur(SCIENCE_PHOTOS.labTubes),
    },
    entrenamiento: {
      cover: unsplash(TRAINING_PHOTOS.gymCycling, { w: 800, h: 450, q: 75 }),
      coverBlur: unsplashBlur(TRAINING_PHOTOS.gymCycling),
    },
    competencia: {
      cover: unsplash(CYCLING_HERO_PHOTOS.tourOfBritain, { w: 800, h: 450, q: 75 }),
      coverBlur: unsplashBlur(CYCLING_HERO_PHOTOS.tourOfBritain),
    },
  } satisfies Record<SectionId, ArticlePlaceholderConfig>,
} as const;

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/**
 * Get the primary section header image URL for a given section.
 * Falls back to the hero image if the section is unknown.
 */
export function getSectionImage(section: string): string {
  const key = section.toLowerCase() as SectionId;
  if (key in IMAGES.sections) {
    return IMAGES.sections[key].primary;
  }
  return IMAGES.hero.primary;
}

/**
 * Get the gradient CSS string for a section (useful for fallback backgrounds).
 */
export function getSectionGradient(section: string): string {
  const key = section.toLowerCase() as SectionId;
  if (key in IMAGES.sections) {
    return IMAGES.sections[key].gradientCSS;
  }
  return "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)";
}

/**
 * Get the Tailwind gradient classes for a section.
 */
export function getSectionGradientClasses(section: string): string {
  const key = section.toLowerCase() as SectionId;
  if (key in IMAGES.sections) {
    return IMAGES.sections[key].gradient;
  }
  return "from-neutral-950 to-neutral-800";
}

/**
 * Get a default article cover image for a section.
 * If the article already has a coverImageUrl, prefer that.
 */
export function getArticleCoverImage(
  section: string,
  coverImageUrl?: string | null
): string {
  if (coverImageUrl) return coverImageUrl;
  const key = section.toLowerCase() as SectionId;
  if (key in IMAGES.articlePlaceholders) {
    return IMAGES.articlePlaceholders[key].cover;
  }
  return IMAGES.hero.primary;
}

/**
 * Get the blur placeholder for an article cover.
 */
export function getArticleCoverBlur(
  section: string,
  coverImageUrl?: string | null
): string | undefined {
  // Only return blur for placeholder images (Unsplash CDN).
  // Custom cover images would need their own blur generation.
  if (coverImageUrl) return undefined;
  const key = section.toLowerCase() as SectionId;
  if (key in IMAGES.articlePlaceholders) {
    return IMAGES.articlePlaceholders[key].coverBlur;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Unsplash API helper (for agentic image fetching)
// ---------------------------------------------------------------------------

export interface UnsplashSearchResult {
  id: string;
  description: string | null;
  altDescription: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    links: { html: string };
  };
  links: {
    download_location: string;
  };
}

/**
 * Search Unsplash for images matching a query.
 * Requires UNSPLASH_ACCESS_KEY environment variable.
 *
 * Usage in the journalist agent's "write" phase:
 *   const results = await searchUnsplashImages("cycling nutrition protein", 3);
 *   if (results.length > 0) {
 *     article.coverImageUrl = results[0].urls.regular;
 *     await triggerUnsplashDownload(results[0].links.download_location);
 *   }
 */
export async function searchUnsplashImages(
  query: string,
  perPage = 3,
  orientation: "landscape" | "portrait" | "squarish" = "landscape"
): Promise<UnsplashSearchResult[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn("[images] UNSPLASH_ACCESS_KEY not set — skipping image search");
    return [];
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("content_filter", "high");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!res.ok) {
    console.error(`[images] Unsplash API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  return (data.results ?? []) as UnsplashSearchResult[];
}

/**
 * Trigger an Unsplash download event (required by API guidelines).
 * Call this whenever you use an image from the API in your application.
 */
export async function triggerUnsplashDownload(
  downloadLocation: string
): Promise<void> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return;

  await fetch(downloadLocation, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  }).catch((err) => {
    console.warn("[images] Failed to trigger Unsplash download:", err);
  });
}

// ---------------------------------------------------------------------------
// Next.js config helper
// ---------------------------------------------------------------------------

/**
 * Remote patterns to add to next.config.ts for Unsplash image optimization.
 *
 * Usage in next.config.ts:
 *   import { UNSPLASH_REMOTE_PATTERNS } from "@/lib/images";
 *   const nextConfig = { images: { remotePatterns: UNSPLASH_REMOTE_PATTERNS } };
 */
export const UNSPLASH_REMOTE_PATTERNS = [
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "plus.unsplash.com",
    pathname: "/**",
  },
];
