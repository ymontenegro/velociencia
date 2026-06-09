import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { sql } from "drizzle-orm";
import { rateLimit, clientKeyFromHeaders } from "@/lib/rate-limit";
import { SECTION_IDS, type SectionId } from "@/lib/constants";

// POST — record a view
export async function POST(req: NextRequest) {
  const client = clientKeyFromHeaders(req.headers);
  if (!rateLimit(`views:${client}`, { limit: 60, windowMs: 60_000 })) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  let body: { slug?: unknown; section?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const slug = typeof body?.slug === "string" ? body.slug.slice(0, 200) : "";
  const rawSection = typeof body?.section === "string" ? body.section : "";
  const section = SECTION_IDS.includes(rawSection as SectionId) ? (rawSection as SectionId) : null;

  if (!slug || !section) {
    return NextResponse.json({ error: "slug and section required" }, { status: 400 });
  }

  db.insert(schema.articleViews).values({ slug, section }).run();

  return NextResponse.json({ ok: true });
}

// GET — top viewed articles (last 30 days)
export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get("limit") ?? "5");
    const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

    const rows = db
      .select({
        slug: schema.articleViews.slug,
        section: schema.articleViews.section,
        views: sql<number>`count(*)`.as("views"),
      })
      .from(schema.articleViews)
      .where(sql`${schema.articleViews.viewedAt} >= ${thirtyDaysAgo}`)
      .groupBy(schema.articleViews.slug, schema.articleViews.section)
      .orderBy(sql`count(*) desc`)
      .limit(limit)
      .all();

    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}
