import cron, { type ScheduledTask } from "node-cron";
import {
  runDiscoverPipeline,
  runResearchPipeline,
  runWritePipeline,
  runReviewPipeline,
} from "./index";

const schedules = {
  discover: "0 */6 * * *", // Every 6 hours (00:00, 06:00, 12:00, 18:00)
  research: "0 1,5,9,13,17,21 * * *", // Every 4 hours offset by 1h
  write: "0 3,7,11,15,19,23 * * *", // Every 4 hours offset by 3h (2h after research)
  review: "0 */2 * * *", // Every 2 hours
} as const;

let activeTasks: ScheduledTask[] = [];

export function startScheduler(): void {
  console.log("\n[SCHEDULER] Iniciando planificador de agentes...\n");

  // Schedule DISCOVER phase - every 6 hours
  const discoverTask = cron.schedule(schedules.discover, async () => {
    console.log(`[SCHEDULER] Ejecutando DISCOVER (programado: ${schedules.discover})`);
    try {
      await runDiscoverPipeline();
    } catch (error) {
      console.error("[SCHEDULER] Error en DISCOVER:", error);
    }
  });
  activeTasks.push(discoverTask);
  console.log(`[SCHEDULER] DISCOVER programado: ${schedules.discover} (cada 6 horas)`);

  // Schedule RESEARCH phase - every 4 hours
  const researchTask = cron.schedule(schedules.research, async () => {
    console.log(`[SCHEDULER] Ejecutando RESEARCH (programado: ${schedules.research})`);
    try {
      await runResearchPipeline();
    } catch (error) {
      console.error("[SCHEDULER] Error en RESEARCH:", error);
    }
  });
  activeTasks.push(researchTask);
  console.log(`[SCHEDULER] RESEARCH programado: ${schedules.research} (cada 4 horas)`);

  // Schedule WRITE phase - every 4 hours, offset by 2h from research
  const writeTask = cron.schedule(schedules.write, async () => {
    console.log(`[SCHEDULER] Ejecutando WRITE (programado: ${schedules.write})`);
    try {
      await runWritePipeline();
    } catch (error) {
      console.error("[SCHEDULER] Error en WRITE:", error);
    }
  });
  activeTasks.push(writeTask);
  console.log(`[SCHEDULER] WRITE programado: ${schedules.write} (cada 4 horas, offset 2h)`);

  // Schedule REVIEW phase - every 2 hours
  const reviewTask = cron.schedule(schedules.review, async () => {
    console.log(`[SCHEDULER] Ejecutando REVIEW (programado: ${schedules.review})`);
    try {
      await runReviewPipeline();
    } catch (error) {
      console.error("[SCHEDULER] Error en REVIEW:", error);
    }
  });
  activeTasks.push(reviewTask);
  console.log(`[SCHEDULER] REVIEW programado: ${schedules.review} (cada 2 horas)`);

  console.log("\n[SCHEDULER] Todos los agentes programados y ejecutándose.");
  console.log("[SCHEDULER] Presiona Ctrl+C para detener.\n");
}

export function stopScheduler(): void {
  console.log("\n[SCHEDULER] Deteniendo planificador...");
  for (const task of activeTasks) {
    task.stop();
  }
  activeTasks = [];
  console.log("[SCHEDULER] Planificador detenido.\n");
}
