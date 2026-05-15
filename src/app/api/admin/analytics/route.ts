import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  getDashboardSummary,
  getRealtimeVisitors,
  type Range,
} from "@/lib/analytics/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_RANGES: Range[] = ["24h", "7d", "30d", "90d", "all"];

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const rangeParam = req.nextUrl.searchParams.get("range") ?? "30d";
  const range = (VALID_RANGES.includes(rangeParam as Range)
    ? rangeParam
    : "30d") as Range;

  const summary = getDashboardSummary(range);
  const realtime = getRealtimeVisitors();
  return NextResponse.json({ summary, realtime });
}
