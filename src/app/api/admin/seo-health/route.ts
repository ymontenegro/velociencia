import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { buildHealthReport } from "@/lib/seo-health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/seo-health
 * Static (filesystem-only) editorial + SEO health report over all markdown
 * articles. Fast; the cover reachability audit is a separate endpoint.
 */
export async function GET() {
  if (!(await getAdminSession()).valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ data: buildHealthReport() });
}
