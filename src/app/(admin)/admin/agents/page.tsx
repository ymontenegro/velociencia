"use client";

import { useState } from "react";
import useSWR from "swr";
import { SECTIONS, type SectionId } from "@/lib/constants";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusColors: Record<string, string> = {
  running: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  running: "Ejecutando",
  completed: "Completado",
  failed: "Fallido",
};

const phaseLabels: Record<string, string> = {
  discover: "Descubrimiento",
  research: "Investigacion",
  write: "Escritura",
  review: "Revision",
};

const sectionNames: Record<string, string> = {
  nutricion: "Nutricion",
  ciencia: "Ciencia",
  entrenamiento: "Entrenamiento",
};

const pipelineOptions = [
  { value: "discover", label: "Descubrimiento" },
  { value: "research", label: "Investigacion" },
  { value: "write", label: "Escritura" },
  { value: "review", label: "Revision" },
  { value: "full", label: "Pipeline completo" },
];

export default function AgentsPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [triggering, setTriggering] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    "/api/agents",
    fetcher,
    { refreshInterval: 5000 }
  );

  const runs = data?.data ?? data?.runs ?? [];

  async function handleTrigger(phase: string) {
    setTriggering(true);
    setShowDropdown(false);
    try {
      const res = await fetch("/api/agents/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase }),
      });
      if (res.ok) {
        mutate();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || "No se pudo ejecutar"}`);
      }
    } catch {
      alert("Error de conexion");
    } finally {
      setTriggering(false);
    }
  }

  function formatDuration(ms: number | null) {
    if (ms == null) return "-";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  }

  function formatCost(cost: number | null) {
    if (cost == null) return "-";
    return `$${cost.toFixed(4)}`;
  }

  function formatTokens(input: number | null, output: number | null) {
    if (input == null && output == null) return "-";
    const parts = [];
    if (input != null) parts.push(`${input.toLocaleString()}in`);
    if (output != null) parts.push(`${output.toLocaleString()}out`);
    return parts.join(" / ");
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Agentes
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Historial de ejecuciones de agentes IA
          </p>
        </div>

        {/* Trigger button */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={triggering}
            className="px-4 py-2 bg-[var(--color-text)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-text-secondary)] disabled:opacity-50 transition-colors"
          >
            {triggering ? "Ejecutando..." : "Ejecutar Pipeline"}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-[var(--color-border)] shadow-lg z-10">
              {pipelineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTrigger(option.value)}
                  className="block w-full px-4 py-2.5 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-border-light)] first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            Cargando ejecuciones...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm">
            Error al cargar ejecuciones. La API de agentes puede no estar disponible.
          </div>
        ) : runs.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            No hay ejecuciones registradas
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-light)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Fase
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Seccion
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Modelo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Duracion
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {runs.map((run: Record<string, unknown>) => (
                  <tr
                    key={run.id as number}
                    className="hover:bg-[var(--color-border-light)]/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-[var(--color-text)]">
                      {(run.agentType as string) === "journalist"
                        ? (SECTIONS[run.section as SectionId]?.journalist ?? "Periodista")
                        : (run.agentType as string) === "editor"
                        ? "Carmen Lagos"
                        : (run.agentType as string) ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text)]">
                      {phaseLabels[run.phase as string] ?? (run.phase as string) ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                      {sectionNames[run.section as string] ?? (run.section as string) ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[run.status as string] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusLabels[run.status as string] ?? (run.status as string) ?? "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] font-mono">
                      {(run.model as string) ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)]">
                      {formatTokens(
                        run.inputTokens as number | null,
                        run.outputTokens as number | null
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                      {formatCost(run.costUsd as number | null)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                      {formatDuration(run.durationMs as number | null)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                      {run.startedAt
                        ? new Date(run.startedAt as string).toLocaleDateString(
                            "es-CL",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
