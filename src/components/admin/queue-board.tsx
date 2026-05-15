"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { QueueFormModal } from "./queue-form-modal";
import { QueueDetailDrawer } from "./queue-detail-drawer";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type ScheduledPost = {
  id: number;
  title: string;
  section: "nutricion" | "ciencia" | "entrenamiento" | "competencia";
  locale: "es" | "en" | "both";
  brief: string | null;
  angle: string | null;
  keywords: string | null; // JSON array
  references: string | null; // JSON array
  suggestedAuthor: string | null;
  coverImageHint: string | null;
  status: Status;
  priority: number | null;
  scheduledFor: string | null;
  publishedAt: string | null;
  assignedTo: string | null;
  articleId: number | null;
  articleIdEn: number | null;
  agentNotes: string | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Status =
  | "idea"
  | "briefed"
  | "assigned"
  | "in_progress"
  | "drafted"
  | "scheduled"
  | "published"
  | "archived"
  | "failed";

const STATUS_COLUMNS: { key: Status; label: string; tint: string }[] = [
  { key: "idea", label: "Ideas", tint: "bg-slate-100 text-slate-700" },
  { key: "briefed", label: "Con brief", tint: "bg-indigo-100 text-indigo-700" },
  { key: "assigned", label: "Asignadas", tint: "bg-blue-100 text-blue-700" },
  {
    key: "in_progress",
    label: "En progreso",
    tint: "bg-amber-100 text-amber-700",
  },
  { key: "drafted", label: "Borrador", tint: "bg-violet-100 text-violet-700" },
  { key: "scheduled", label: "Agendadas", tint: "bg-teal-100 text-teal-700" },
  {
    key: "published",
    label: "Publicadas",
    tint: "bg-emerald-100 text-emerald-700",
  },
];

const SECTION_COLORS: Record<ScheduledPost["section"], string> = {
  nutricion: "bg-teal-50 text-teal-700 border-teal-200",
  ciencia: "bg-violet-50 text-violet-700 border-violet-200",
  entrenamiento: "bg-cyan-50 text-cyan-700 border-cyan-200",
  competencia: "bg-rose-50 text-rose-700 border-rose-200",
};

const SECTION_LABELS: Record<ScheduledPost["section"], string> = {
  nutricion: "Nutrición",
  ciencia: "Ciencia",
  entrenamiento: "Entrenamiento",
  competencia: "Competencia",
};

function fmtDate(value: string | null): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export function QueueBoard() {
  const [creating, setCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [section, setSection] = useState<string>("");

  const url = `/api/admin/queue${section ? `?section=${section}` : ""}`;
  const { data, isLoading } = useSWR<{ data: ScheduledPost[] }>(url, fetcher, {
    refreshInterval: 8000,
  });

  const posts = data?.data ?? [];

  const grouped = STATUS_COLUMNS.map((col) => ({
    ...col,
    items: posts.filter((p) => p.status === col.key),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Cola editorial
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Briefs y publicaciones pendientes. Los agentes los toman desde aquí.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="">Todas las secciones</option>
            <option value="nutricion">Nutrición</option>
            <option value="ciencia">Ciencia</option>
            <option value="entrenamiento">Entrenamiento</option>
            <option value="competencia">Competencia</option>
          </select>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1D23] text-white text-sm font-medium hover:bg-[#13151A] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nueva publicación
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-sm text-[var(--color-text-muted)]">
          Cargando...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
          {grouped.map((col) => (
            <div
              key={col.key}
              className="bg-[var(--color-border-light)]/30 rounded-lg border border-[var(--color-border)] flex flex-col min-h-[200px]"
            >
              <div className="px-3 py-2.5 flex items-center justify-between border-b border-[var(--color-border)] bg-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${col.tint}`}
                  >
                    {col.label}
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  {col.items.length}
                </span>
              </div>
              <div className="p-2 space-y-2 flex-1">
                {col.items.length === 0 ? (
                  <p className="text-[11px] text-[var(--color-text-muted)] text-center py-6">
                    Vacío
                  </p>
                ) : (
                  col.items.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedId(post.id)}
                      className="w-full text-left bg-white rounded-md border border-[var(--color-border)] p-3 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <span
                          className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${SECTION_COLORS[post.section]}`}
                        >
                          {SECTION_LABELS[post.section]}
                        </span>
                        {post.priority && post.priority >= 8 && (
                          <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                            Alta
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-[var(--color-text)] line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      {post.scheduledFor && (
                        <p className="mt-1.5 text-[10px] text-[var(--color-text-muted)]">
                          📅 {fmtDate(post.scheduledFor)}
                        </p>
                      )}
                      {post.assignedTo && (
                        <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                          👤 {post.assignedTo}
                        </p>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {creating && (
        <QueueFormModal
          onClose={() => setCreating(false)}
          onCreated={() => {
            setCreating(false);
            mutate(url);
          }}
        />
      )}

      {selectedId != null && (
        <QueueDetailDrawer
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onMutate={() => mutate(url)}
        />
      )}
    </div>
  );
}
