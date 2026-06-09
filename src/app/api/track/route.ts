import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { parseUserAgent } from "@/lib/analytics/ua";
import { extractIp, resolveGeo } from "@/lib/analytics/geo";
import { rateLimit, clientKeyFromHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrackBody = {
  type: "pageview" | "duration";
  sessionId: string;
  visitorId: string;
  path: string;
  locale?: string;
  section?: string;
  slug?: string;
  referer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  durationMs?: number;
  pageViewId?: number; // used to update duration on the matching pageview
};

function extractDomain(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    Vary: "Origin",
  };
}

export function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  // Una persona navegando genera unas pocas peticiones por minuto; 60/min
  // por IP deja margen amplio y corta el spam de pageviews.
  const client = clientKeyFromHeaders(req.headers);
  if (!rateLimit(`track:${client}`, { limit: 60, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "rate limited" },
      { status: 429, headers: corsHeaders(origin) }
    );
  }

  let body: TrackBody;
  try {
    body = (await req.json()) as TrackBody;
  } catch {
    return NextResponse.json(
      { error: "invalid body" },
      { status: 400, headers: corsHeaders(origin) }
    );
  }

  if (!body?.sessionId || !body?.visitorId || !body?.path) {
    return NextResponse.json(
      { error: "missing fields" },
      { status: 400, headers: corsHeaders(origin) }
    );
  }

  // Duration update path — finalize an earlier pageview.
  if (body.type === "duration") {
    if (
      typeof body.pageViewId === "number" &&
      typeof body.durationMs === "number" &&
      body.durationMs >= 0 &&
      body.durationMs < 6 * 60 * 60 * 1000 // ignore > 6h
    ) {
      try {
        db.update(schema.pageViews)
          .set({ durationMs: Math.round(body.durationMs) })
          .where(
            and(
              eq(schema.pageViews.id, body.pageViewId),
              eq(schema.pageViews.sessionId, body.sessionId)
            )
          )
          .run();
      } catch {
        // best-effort
      }
    }
    return NextResponse.json(
      { ok: true },
      { headers: corsHeaders(origin) }
    );
  }

  // Pageview path
  const userAgent = req.headers.get("user-agent");
  const { device, browser, os } = parseUserAgent(userAgent);
  if (device === "bot") {
    return NextResponse.json(
      { ok: true, skipped: "bot" },
      { headers: corsHeaders(origin) }
    );
  }

  const ip = extractIp(req.headers);
  const { geo, ipHash } = await resolveGeo(req.headers, ip);
  const host = req.headers.get("host") ?? null;
  const refererDomain = extractDomain(body.referer);

  const result = db
    .insert(schema.pageViews)
    .values({
      sessionId: body.sessionId.slice(0, 64),
      visitorId: body.visitorId.slice(0, 64),
      path: body.path.slice(0, 500),
      host,
      locale: body.locale?.slice(0, 8) ?? null,
      section: body.section?.slice(0, 32) ?? null,
      slug: body.slug?.slice(0, 200) ?? null,
      referer: body.referer?.slice(0, 500) ?? null,
      refererDomain,
      utmSource: body.utmSource?.slice(0, 100) ?? null,
      utmMedium: body.utmMedium?.slice(0, 100) ?? null,
      utmCampaign: body.utmCampaign?.slice(0, 100) ?? null,
      country: geo.country,
      countryName: geo.countryName,
      region: geo.region,
      city: geo.city,
      device,
      browser,
      os,
      ipHash,
      viewedAt: new Date(),
    })
    .run();

  const insertedId = Number(result.lastInsertRowid);

  return NextResponse.json(
    { ok: true, id: insertedId },
    { headers: corsHeaders(origin) }
  );
}
