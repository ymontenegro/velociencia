import { NextResponse } from "next/server";
import { runWritePipeline } from "@/agents/index";

export async function POST() {
  try {
    console.log("[API] POST /api/cron/write - Iniciando fase WRITE");

    await runWritePipeline();

    return NextResponse.json({
      status: "ok",
      phase: "write",
      message: "Fase WRITE completada exitosamente",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en /api/cron/write:", message);

    return NextResponse.json(
      {
        status: "error",
        phase: "write",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
