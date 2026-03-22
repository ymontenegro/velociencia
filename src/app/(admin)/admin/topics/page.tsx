"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusLabels: Record<string, string> = {
  proposed: "Propuesto",
  approved: "Aprobado",
  researching: "Investigando",
  writing: "Escribiendo",
  completed: "Completado",
  discarded: "Descartado",
};

const statusColors: Record<string, string> = {
  proposed: "bg-gray-100 text-gray-700",
  approved: "bg-blue-100 text-blue-800",
  researching: "bg-amber-100 text-amber-800",
  writing: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  discarded: "bg-red-100 text-red-800",
};

const sectionColors: Record<string, string> = {
  nutricion: "bg-[var(--color-nutricion-light)] text-[var(--color-nutricion-dark)]",
  ciencia: "bg-[var(--color-ciencia-light)] text-[var(--color-ciencia-dark)]",
  entrenamiento: "bg-[var(--color-entrenamiento-light)] text-[var(--color-entrenamiento-dark)]",
};

const sectionNames: Record<string, string> = {
  nutricion: "Nutricion",
  ciencia: "Ciencia",
  entrenamiento: "Entrenamiento",
};

export default function TopicsPage() {
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("");

  const params = new URLSearchParams();
  if (section) params.set("section", section);
  if (status) params.set("status", status);

  const { data, error, isLoading } = useSWR(
    `/api/topics?${params.toString()}`,
    fetcher,
    { refreshInterval: 15000 }
  );

  const topics = data?.topics ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Topics
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Temas descubiertos y en progreso
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="">Todas las secciones</option>
          <option value="nutricion">Nutricion</option>
          <option value="ciencia">Ciencia</option>
          <option value="entrenamiento">Entrenamiento</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="">Todos los estados</option>
          <option value="proposed">Propuesto</option>
          <option value="approved">Aprobado</option>
          <option value="researching">Investigando</option>
          <option value="writing">Escribiendo</option>
          <option value="completed">Completado</option>
          <option value="discarded">Descartado</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            Cargando topics...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm">
            Error al cargar topics
          </div>
        ) : topics.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            No se encontraron topics
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-light)]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Titulo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Seccion
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {topics.map((topic: Record<string, unknown>) => (
                <tr
                  key={topic.id as number}
                  className="hover:bg-[var(--color-border-light)]/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        {topic.title as string}
                      </p>
                      {typeof topic.description === "string" && topic.description && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                          {topic.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sectionColors[topic.section as string] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {sectionNames[topic.section as string] ?? (topic.section as string)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[topic.status as string] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusLabels[topic.status as string] ?? (topic.status as string)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-border-light)] text-sm font-medium text-[var(--color-text-secondary)]">
                      {String((topic.priority as number) ?? 5)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                    {topic.createdAt
                      ? new Date(topic.createdAt as string).toLocaleDateString(
                          "es-CL",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {topics.length > 0 && (
        <div className="mt-4 text-sm text-[var(--color-text-muted)]">
          {topics.length} topic{topics.length !== 1 ? "s" : ""} encontrado
          {topics.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
