import { NextRequest, NextResponse } from "next/server";
import {
  runDiscoverPipeline,
  runResearchPipeline,
  runWritePipeline,
  runReviewPipeline,
  runFullPipeline,
} from "@/agents/index";

const VALID_PHASES = ["discover", "research", "write", "review", "full"] as const;
type Phase = (typeof VALID_PHASES)[number];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const phase = body.phase as Phase | undefined;

    if (!phase || !VALID_PHASES.includes(phase)) {
      return NextResponse.json(
        {
          status: "error",
          error: `Fase inválida: "${phase}". Fases válidas: ${VALID_PHASES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    console.log(`[API] POST /api/agents/trigger - Fase: ${phase.toUpperCase()}`);

    // Run the pipeline in the background so the response returns immediately
    const startTime = Date.now();

    const pipelinePromise = (async () => {
      switch (phase) {
        case "discover":
          return runDiscoverPipeline();
        case "research":
          return runResearchPipeline();
        case "write":
          return runWritePipeline();
        case "review":
          return runReviewPipeline();
        case "full":
          return runFullPipeline();
      }
    })();

    // Wait for the pipeline to complete (no background execution to ensure error handling)
    await pipelinePromise;

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      status: "ok",
      phase,
      message: `Fase ${phase.toUpperCase()} completada exitosamente`,
      durationMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] Error en POST /api/agents/trigger:", message);

    return NextResponse.json(
      {
        status: "error",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
