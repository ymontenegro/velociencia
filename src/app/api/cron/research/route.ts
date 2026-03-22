import { NextResponse } from "next/server";
import { runResearchPipeline } from "@/agents/index";

export async function POST() {
  try {
    console.log("[API] POST /api/cron/research - Iniciando fase RESEARCH");

    await runResearchPipeline();

    return NextResponse.json({
      status: "ok",
      phase: "research",
      message: "Fase RESEARCH completada exitosamente",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en /api/cron/research:", message);

    return NextResponse.json(
      {
        status: "error",
        phase: "research",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
