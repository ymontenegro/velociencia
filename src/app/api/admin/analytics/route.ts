import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  getDashboardSummary,
  getRealtimeVisitors,
  type Range,
  type SiteLocale,
} from "@/lib/analytics/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_RANGES: Range[] = ["24h", "7d", "30d", "90d", "all"];
const VALID_SITES: SiteLocale[] = ["es", "en"];

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const rangeParam = req.nextUrl.searchParams.get("range") ?? "30d";
  const range = (VALID_RANGES.includes(rangeParam as Range)
    ? rangeParam
    : "30d") as Range;

  // `site` splits metrics by domain: "es" → velociencia.cl, "en" → pedalsci.com.
  // Anything else (incl. "all" / absent) means both sites combined.
  const siteParam = req.nextUrl.searchParams.get("site");
  const site = VALID_SITES.includes(siteParam as SiteLocale)
    ? (siteParam as SiteLocale)
    : undefined;

  const summary = getDashboardSummary(range, site);
  const realtime = getRealtimeVisitors(site);
  return NextResponse.json({ summary, realtime });
}
