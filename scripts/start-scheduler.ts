import { startScheduler, stopScheduler } from "../src/agents/scheduler";

console.log("╔══════════════════════════════════════════════╗");
console.log("║   Ciclismo AI Agent Scheduler                ║");
console.log("║   Sistema de generación automática de        ║");
console.log("║   contenido para revista de ciclismo         ║");
console.log("╚══════════════════════════════════════════════╝");
console.log("");
console.log("Programación:");
console.log("  DISCOVER  : cada 6 horas (00:00, 06:00, 12:00, 18:00)");
console.log("  RESEARCH  : cada 4 horas (01:00, 05:00, 09:00, ...)");
console.log("  WRITE     : cada 4 horas (03:00, 07:00, 11:00, ...)");
console.log("  REVIEW    : cada 2 horas (00:00, 02:00, 04:00, ...)");
console.log("");

startScheduler();

// Handle graceful shutdown
function shutdown(signal: string) {
  console.log(`\n[SHUTDOWN] Señal recibida: ${signal}`);
  stopScheduler();
  console.log("[SHUTDOWN] Proceso terminado limpiamente.");
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
