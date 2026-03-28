import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { sql } from "drizzle-orm";

// POST — record a view
export async function POST(req: NextRequest) {
  const { slug, section } = await req.json();

  if (!slug || !section) {
    return NextResponse.json({ error: "slug and section required" }, { status: 400 });
  }

  db.insert(schema.articleViews).values({ slug, section }).run();

  return NextResponse.json({ ok: true });
}

// GET — top viewed articles (last 30 days)
export async function GET(req: NextRequest) {
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
}
