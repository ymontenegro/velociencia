import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agentRuns } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentType = searchParams.get("agentType");
    const phase = searchParams.get("phase");
    const status = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);

    // Build conditions
    const conditions = [];
    if (agentType && (agentType === "journalist" || agentType === "editor")) {
      conditions.push(eq(agentRuns.agentType, agentType));
    }
    if (
      phase &&
      ["discover", "research", "write", "review"].includes(phase)
    ) {
      conditions.push(
        eq(
          agentRuns.phase,
          phase as "discover" | "research" | "write" | "review"
        )
      );
    }
    if (
      status &&
      ["running", "completed", "failed"].includes(status)
    ) {
      conditions.push(
        eq(agentRuns.status, status as "running" | "completed" | "failed")
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const runs = await db
      .select()
      .from(agentRuns)
      .where(whereClause)
      .orderBy(desc(agentRuns.startedAt))
      .limit(limit);

    // Parse metadata JSON for each run
    const runsWithParsedMetadata = runs.map((run) => ({
      ...run,
      metadata: run.metadata ? JSON.parse(run.metadata) : null,
    }));

    return NextResponse.json({
      status: "ok",
      count: runsWithParsedMetadata.length,
      runs: runsWithParsedMetadata,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en GET /api/agents:", message);

    return NextResponse.json(
      {
        status: "error",
        error: message,
      },
      { status: 500 }
    );
  }
}
