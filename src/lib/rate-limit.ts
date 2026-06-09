/**
 * Rate limiter en memoria (sliding window) para endpoints públicos de
 * escritura (/api/track, /api/views, /api/subscribe).
 *
 * Es por proceso: suficiente para un único contenedor en Coolify. Si algún
 * día hay múltiples réplicas, migrar a un backend compartido (Redis).
 */

type Bucket = {
  count: number;
  windowStart: number;
};

const buckets = new Map<string, Bucket>();

// Poda periódica para que el Map no crezca sin límite con IPs únicas.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > windowMs) {
      buckets.delete(key);
    }
  }
}

/**
 * Devuelve true si la petición está dentro del límite, false si debe
 * rechazarse. `key` debería incluir el endpoint y la IP (o un identificador
 * estable equivalente) para aislar los contadores.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): boolean {
  cleanup(windowMs);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}

/** Extrae una clave de cliente razonable desde los headers del proxy. */
export function clientKeyFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
