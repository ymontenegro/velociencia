import { NextResponse } from "next/server";
import { runDiscoverPipeline } from "@/agents/index";

export async function POST() {
  try {
    console.log("[API] POST /api/cron/discover - Iniciando fase DISCOVER");

    await runDiscoverPipeline();

    return NextResponse.json({
      status: "ok",
      phase: "discover",
      message: "Fase DISCOVER completada exitosamente",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en /api/cron/discover:", message);

    return NextResponse.json(
      {
        status: "error",
        phase: "discover",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
