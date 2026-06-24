import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { listCoverImages } from "@/lib/seo-health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONCURRENCY = 8;
const TIMEOUT_MS = 9000;

async function fetchWithTimeout(url: string, method: "HEAD" | "GET"): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      // A browser-like UA — some image hosts block default fetch agents.
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; VelocienciaBot/1.0; +https://velociencia.cl)",
        ...(method === "GET" ? { Range: "bytes=0-0" } : {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

type Verdict = "ok" | "broken" | "unknown";

async function checkUrl(url: string): Promise<{ status: number | null; verdict: Verdict }> {
  try {
    let res = await fetchWithTimeout(url, "HEAD");
    // Some hosts reject HEAD (405/403) but serve GET — retry before judging.
    if (!res.ok && res.status !== 404) {
      res = await fetchWithTimeout(url, "GET");
    }
    if (res.ok) return { status: res.status, verdict: "ok" };
    return { status: res.status, verdict: "broken" };
  } catch {
    // Timeout / DNS / connection error — can't conclude it's broken.
    return { status: null, verdict: "unknown" };
  }
}

/**
 * GET /api/admin/seo-health/covers
 * Audits every unique cover-image URL over the network (HEAD, GET fallback) and
 * reports which are broken (4xx/5xx) or unreachable. Slow-ish (network); the UI
 * triggers it on demand.
 */
export async function GET() {
  if (!(await getAdminSession()).valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const covers = listCoverImages();
  const results: { url: string; refs: string[]; status: number | null; verdict: Verdict }[] = [];

  let cursor = 0;
  async function worker() {
    while (cursor < covers.length) {
      const i = cursor++;
      const { url, refs } = covers[i];
      const { status, verdict } = await checkUrl(url);
      results.push({ url, refs, status, verdict });
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, covers.length) }, worker));

  const broken = results.filter((r) => r.verdict === "broken");
  const unknown = results.filter((r) => r.verdict === "unknown");
  return NextResponse.json({
    data: {
      checkedAt: Date.now(),
      total: results.length,
      ok: results.length - broken.length - unknown.length,
      broken: broken.sort((a, b) => b.refs.length - a.refs.length),
      unknown: unknown.sort((a, b) => b.refs.length - a.refs.length),
    },
  });
}
