import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { listAdminArticles } from "@/lib/content-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/content
 * Lists every markdown article (both locales, all sections) with its computed
 * editorial status. This is the source of truth for the article manager and the
 * publishing calendar — the legacy DB `articles` table is not used here.
 */
export async function GET() {
  if (!(await getAdminSession()).valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const data = listAdminArticles();
  return NextResponse.json({ data });
}
