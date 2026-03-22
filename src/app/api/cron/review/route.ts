import { NextResponse } from "next/server";
import { runReviewPipeline } from "@/agents/index";

export async function POST() {
  try {
    console.log("[API] POST /api/cron/review - Iniciando fase REVIEW");

    await runReviewPipeline();

    return NextResponse.json({
      status: "ok",
      phase: "review",
      message: "Fase REVIEW completada exitosamente",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en /api/cron/review:", message);

    return NextResponse.json(
      {
        status: "error",
        phase: "review",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
