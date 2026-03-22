import {
  runDiscoverPipeline,
  runResearchPipeline,
  runWritePipeline,
  runReviewPipeline,
  runFullPipeline,
} from "../src/agents/index";

const VALID_PHASES = ["discover", "research", "write", "review", "full"] as const;
type Phase = (typeof VALID_PHASES)[number];

async function main() {
  const phase = process.argv[2] as Phase | undefined;

  if (!phase || !VALID_PHASES.includes(phase)) {
    console.error("Uso: tsx scripts/run-pipeline.ts <fase>");
    console.error("");
    console.error("Fases disponibles:");
    console.error("  discover  - Descubrir nuevos temas de artículos");
    console.error("  research  - Investigar temas propuestos");
    console.error("  write     - Escribir artículos para temas investigados");
    console.error("  review    - Revisar artículos pendientes de aprobación");
    console.error("  full      - Ejecutar pipeline completo (discover → research → write → review)");
    process.exit(1);
  }

  console.log(`\n[RUN] Ejecutando fase: ${phase.toUpperCase()}\n`);

  const startTime = Date.now();

  try {
    switch (phase) {
      case "discover":
        await runDiscoverPipeline();
        break;
      case "research":
        await runResearchPipeline();
        break;
      case "write":
        await runWritePipeline();
        break;
      case "review":
        await runReviewPipeline();
        break;
      case "full":
        await runFullPipeline();
        break;
    }

    const durationMs = Date.now() - startTime;
    console.log(`\n[RUN] Fase ${phase.toUpperCase()} completada en ${(durationMs / 1000).toFixed(1)}s`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`\n[RUN] Error fatal en fase ${phase.toUpperCase()}:`, message);
    process.exit(1);
  }
}

main();
