import crypto from "crypto";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const IP_SALT =
  process.env.IP_HASH_SALT ?? "velociencia-ip-hash-salt-default-2026";
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export type GeoInfo = {
  country: string | null;
  countryName: string | null;
  region: string | null;
  city: string | null;
};

const EMPTY: GeoInfo = {
  country: null,
  countryName: null,
  region: null,
  city: null,
};

const memCache = new Map<string, { geo: GeoInfo; expiresAt: number }>();

export function hashIp(ip: string | null | undefined): string {
  if (!ip) return "unknown";
  return crypto
    .createHmac("sha256", IP_SALT)
    .update(ip)
    .digest("base64url")
    .slice(0, 22);
}

function isPrivateOrInvalid(ip: string): boolean {
  if (!ip) return true;
  if (ip === "::1" || ip === "127.0.0.1" || ip === "localhost") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(ip)) return true;
  if (ip.startsWith("fc") || ip.startsWith("fd")) return true; // IPv6 ULA
  return false;
}

const COUNTRY_NAMES: Record<string, string> = {
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  BE: "Bélgica",
  BO: "Bolivia",
  BR: "Brasil",
  CA: "Canadá",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  DE: "Alemania",
  DK: "Dinamarca",
  DO: "República Dominicana",
  EC: "Ecuador",
  ES: "España",
  FI: "Finlandia",
  FR: "Francia",
  GB: "Reino Unido",
  GR: "Grecia",
  GT: "Guatemala",
  HN: "Honduras",
  IE: "Irlanda",
  IL: "Israel",
  IN: "India",
  IT: "Italia",
  JP: "Japón",
  KR: "Corea del Sur",
  LU: "Luxemburgo",
  MX: "México",
  NL: "Países Bajos",
  NO: "Noruega",
  NZ: "Nueva Zelanda",
  PA: "Panamá",
  PE: "Perú",
  PL: "Polonia",
  PT: "Portugal",
  PY: "Paraguay",
  RO: "Rumanía",
  RU: "Rusia",
  SE: "Suecia",
  CH: "Suiza",
  SV: "El Salvador",
  TR: "Turquía",
  US: "Estados Unidos",
  UY: "Uruguay",
  VE: "Venezuela",
  ZA: "Sudáfrica",
};

export function countryName(code: string | null | undefined): string | null {
  if (!code) return null;
  return COUNTRY_NAMES[code.toUpperCase()] ?? code.toUpperCase();
}

function readCache(ipHash: string): GeoInfo | null {
  const mem = memCache.get(ipHash);
  if (mem && mem.expiresAt > Date.now()) return mem.geo;
  try {
    const row = db
      .select()
      .from(schema.ipGeoCache)
      .where(eq(schema.ipGeoCache.ipHash, ipHash))
      .get();
    if (!row) return null;
    const ts = row.cachedAt instanceof Date ? row.cachedAt.getTime() : 0;
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    const geo: GeoInfo = {
      country: row.country ?? null,
      countryName: row.countryName ?? null,
      region: row.region ?? null,
      city: row.city ?? null,
    };
    memCache.set(ipHash, { geo, expiresAt: Date.now() + CACHE_TTL_MS });
    return geo;
  } catch {
    return null;
  }
}

function writeCache(ipHash: string, geo: GeoInfo): void {
  memCache.set(ipHash, { geo, expiresAt: Date.now() + CACHE_TTL_MS });
  try {
    db.insert(schema.ipGeoCache)
      .values({
        ipHash,
        country: geo.country,
        countryName: geo.countryName,
        region: geo.region,
        city: geo.city,
        cachedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.ipGeoCache.ipHash,
        set: {
          country: geo.country,
          countryName: geo.countryName,
          region: geo.region,
          city: geo.city,
          cachedAt: new Date(),
        },
      })
      .run();
  } catch {
    // best-effort cache
  }
}

async function lookupIpApi(ip: string): Promise<GeoInfo | null> {
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 1500);
    const r = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city`,
      { signal: ctrl.signal, cache: "no-store" }
    );
    clearTimeout(timeout);
    if (!r.ok) return null;
    const j = (await r.json()) as {
      status?: string;
      country?: string;
      countryCode?: string;
      regionName?: string;
      city?: string;
    };
    if (j.status !== "success") return null;
    return {
      country: j.countryCode ?? null,
      countryName: j.country ?? countryName(j.countryCode) ?? null,
      region: j.regionName ?? null,
      city: j.city ?? null,
    };
  } catch {
    return null;
  }
}

/**
 * Resolve geographic info for a request.
 * Priority: hosting-provider headers → cache → ip-api.com lookup.
 */
export async function resolveGeo(
  headers: Headers,
  ip: string | null
): Promise<{ geo: GeoInfo; ipHash: string }> {
  const ipHash = hashIp(ip);

  // 1. CDN/host headers (Vercel, Cloudflare, etc.)
  const headerCountry =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-country-code");
  const headerCity =
    headers.get("x-vercel-ip-city") ?? headers.get("cf-ipcity") ?? null;
  const headerRegion =
    headers.get("x-vercel-ip-country-region") ??
    headers.get("cf-region") ??
    null;

  if (headerCountry && headerCountry !== "XX") {
    const geo: GeoInfo = {
      country: headerCountry.toUpperCase(),
      countryName: countryName(headerCountry),
      region: headerRegion ? decodeURIComponent(headerRegion) : null,
      city: headerCity ? decodeURIComponent(headerCity) : null,
    };
    writeCache(ipHash, geo);
    return { geo, ipHash };
  }

  // 2. Skip lookup for invalid/private IPs (dev/testing)
  if (!ip || isPrivateOrInvalid(ip)) {
    return { geo: EMPTY, ipHash };
  }

  // 3. Cached result
  const cached = readCache(ipHash);
  if (cached) return { geo: cached, ipHash };

  // 4. Live lookup (best-effort; fail closed to EMPTY)
  const live = await lookupIpApi(ip);
  if (live) {
    writeCache(ipHash, live);
    return { geo: live, ipHash };
  }
  return { geo: EMPTY, ipHash };
}

export function extractIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    headers.get("x-vercel-forwarded-for") ??
    null
  );
}
