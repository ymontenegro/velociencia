import { refreshAllFeeds } from "@/lib/rss";
import { NextResponse } from "next/server";

// POST /api/feeds/refresh – Trigger a full feed refresh
export async function POST() {
  try {
    const result = await refreshAllFeeds();

    return NextResponse.json({
      message: "Feed refresh completed",
      success: result.success,
      failed: result.failed,
      total: result.success + result.failed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Feed refresh failed", detail: message },
      { status: 500 }
    );
  }
}
