"use client";

import { useState } from "react";
import useSWR from "swr";
import type { ScheduledPost, Status } from "./queue-board";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "briefed", label: "Con brief" },
  { value: "assigned", label: "Asignada" },
  { value: "in_progress", label: "En progreso" },
  { value: "drafted", label: "Borrador" },
  { value: "scheduled", label: "Agendada" },
  { value: "published", label: "Publicada" },
  { value: "archived", label: "Archivada" },
  { value: "failed", label: "Fallida" },
];

function parseJsonArray<T = unknown>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

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

export function QueueDetailDrawer({
  id,
  onClose,
  onMutate,
}: {
  id: number;
  onClose: () => void;
  onMutate: () => void;
}) {
  const { data, isLoading } = useSWR<{ data: ScheduledPost }>(
    `/api/admin/queue/${id}`,
    fetcher
  );
  const post = data?.data;

  const [editing, setEditing] = useState<Partial<ScheduledPost>>({});
  const [referencesText, setReferencesText] = useState("");
  const [keywordsText, setKeywordsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [hydratedFor, setHydratedFor] = useState<number | null>(null);

  // Sync local edit buffer when a different post arrives. setState-during-render
  // is the recommended pattern for "derived state from prop change" in React 19.
  if (post && hydratedFor !== post.id) {
    setHydratedFor(post.id);
    setEditing({
      title: post.title,
      section: post.section,
      locale: post.locale,
      brief: post.brief,
      angle: post.angle,
      status: post.status,
      priority: post.priority,
      suggestedAuthor: post.suggestedAuthor,
      scheduledFor: post.scheduledFor,
      assignedTo: post.assignedTo,
      agentNotes: post.agentNotes,
    });
    const refs = parseJsonArray<{ url?: string; title?: string }>(post.references);
    setReferencesText(refs.map((r) => r.url ?? "").filter(Boolean).join("\n"));
    const kws = parseJsonArray<string>(post.keywords);
    setKeywordsText(kws.join(", "));
  }

  async function save() {
    setSaving(true);
    const body: Record<string, unknown> = { ...editing };
    body.references = referencesText;
    body.keywords = keywordsText;
    if (editing.scheduledFor) {
      body.scheduledFor = editing.scheduledFor;
    }
    await fetch(`/api/admin/queue/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    onMutate();
  }

  async function assignToClaude() {
    setSaving(true);
    await fetch(`/api/admin/queue/${id}/assign`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ assignedTo: "claude-code" }),
    });
    setSaving(false);
    onMutate();
  }

  async function remove() {
    if (!confirm("¿Eliminar esta publicación de la cola?")) return;
    setSaving(true);
    await fetch(`/api/admin/queue/${id}`, { method: "DELETE" });
    setSaving(false);
    onMutate();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex justify-end"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Publicación #{id}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {isLoading || !post ? (
          <div className="p-8 text-sm text-[var(--color-text-muted)]">
            Cargando...
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <Field label="Título">
              <input
                type="text"
                value={editing.title ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Sección">
                <select
                  value={editing.section ?? post.section}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      section: e.target.value as ScheduledPost["section"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
                >
                  <option value="nutricion">Nutrición</option>
                  <option value="ciencia">Ciencia</option>
                  <option value="entrenamiento">Entrenamiento</option>
                  <option value="competencia">Competencia</option>
                </select>
              </Field>
              <Field label="Idioma">
                <select
                  value={editing.locale ?? post.locale}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      locale: e.target.value as ScheduledPost["locale"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
                >
                  <option value="both">ES + EN</option>
                  <option value="es">Solo ES</option>
                  <option value="en">Solo EN</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Estado">
                <select
                  value={editing.status ?? post.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as Status })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Prioridad (1-10)">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={editing.priority ?? post.priority ?? 5}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      priority: Number(e.target.value) || 5,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Asignada a">
                <input
                  type="text"
                  value={editing.assignedTo ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, assignedTo: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
                />
              </Field>
              <Field label="Agendar para">
                <input
                  type="datetime-local"
                  value={
                    editing.scheduledFor
                      ? new Date(editing.scheduledFor)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      scheduledFor: e.target.value || null,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
                />
              </Field>
            </div>

            <Field label="Brief">
              <textarea
                rows={4}
                value={editing.brief ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, brief: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm resize-y"
              />
            </Field>

            <Field label="Ángulo editorial">
              <input
                type="text"
                value={editing.angle ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, angle: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
              />
            </Field>

            <Field label="Keywords (coma)">
              <input
                type="text"
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
              />
            </Field>

            <Field label="Referencias (una URL por línea)">
              <textarea
                rows={4}
                value={referencesText}
                onChange={(e) => setReferencesText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono resize-y"
              />
            </Field>

            <Field label="Notas para el agente">
              <textarea
                rows={3}
                value={editing.agentNotes ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, agentNotes: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm resize-y"
                placeholder="Hilos, restricciones, tono, etc."
              />
            </Field>

            <div className="bg-[var(--color-border-light)] rounded-lg p-3 text-xs text-[var(--color-text-muted)] space-y-1">
              <div>
                <strong>Creada:</strong> {fmtDate(post.createdAt)}
              </div>
              <div>
                <strong>Actualizada:</strong> {fmtDate(post.updatedAt)}
              </div>
              {post.publishedAt && (
                <div>
                  <strong>Publicada:</strong> {fmtDate(post.publishedAt)}
                </div>
              )}
              {post.lastError && (
                <div className="text-red-700">
                  <strong>Último error:</strong> {post.lastError}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="sticky bottom-0 bg-white border-t border-[var(--color-border)] px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={remove}
            disabled={saving}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-60"
          >
            Eliminar
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={assignToClaude}
              disabled={saving}
              className="px-3 py-2 rounded-lg border border-blue-300 text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-60"
            >
              Asignar a Claude
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-[#1A1D23] text-white text-sm font-medium hover:bg-[#13151A] disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
