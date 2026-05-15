"use client";

import { useState } from "react";

export function QueueFormModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    section: "ciencia",
    locale: "both",
    brief: "",
    angle: "",
    keywords: "",
    references: "",
    suggestedAuthor: "",
    priority: 5,
    scheduledFor: "",
    status: "idea",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        scheduledFor: form.scheduledFor || null,
      };
      const r = await fetch("/api/admin/queue", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        setError(data?.error ?? "Error guardando");
        setSaving(false);
        return;
      }
      onCreated();
    } catch {
      setError("Error de red");
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Nueva publicación
          </h2>
          <button
            type="button"
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

        <div className="p-6 space-y-4">
          <Field label="Título" required>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Ej: Cómo dosificar bicarbonato en eventos largos"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Sección">
              <select
                value={form.section}
                onChange={(e) => update("section", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="nutricion">Nutrición</option>
                <option value="ciencia">Ciencia</option>
                <option value="entrenamiento">Entrenamiento</option>
                <option value="competencia">Competencia</option>
              </select>
            </Field>
            <Field label="Idioma">
              <select
                value={form.locale}
                onChange={(e) => update("locale", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="both">ES + EN</option>
                <option value="es">Solo ES</option>
                <option value="en">Solo EN</option>
              </select>
            </Field>
          </div>

          <Field label="Brief / qué cubrir">
            <textarea
              rows={4}
              value={form.brief}
              onChange={(e) => update("brief", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y"
              placeholder="Qué debe responder el artículo, audiencia, ángulo deseado..."
            />
          </Field>

          <Field label="Ángulo editorial">
            <input
              type="text"
              value={form.angle}
              onChange={(e) => update("angle", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Ej: estudio reciente desafía consenso"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Keywords (coma)">
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => update("keywords", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="lactato, umbral, polarizado"
              />
            </Field>
            <Field label="Periodista sugerido">
              <select
                value={form.suggestedAuthor}
                onChange={(e) => update("suggestedAuthor", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="">Sin asignar</option>
                <option value="Sofía Müller">Sofía Müller (Ciencia)</option>
                <option value="Martín Velasco">Martín Velasco (Nutrición)</option>
                <option value="Tomás Herrera">Tomás Herrera (Entrenamiento)</option>
                <option value="Diego Araya">Diego Araya (Competencia)</option>
              </select>
            </Field>
          </div>

          <Field label="Referencias (una URL por línea)">
            <textarea
              rows={3}
              value={form.references}
              onChange={(e) => update("references", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-mono"
              placeholder="https://pubmed.ncbi.nlm.nih.gov/...&#10;https://..."
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Estado">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="idea">Idea</option>
                <option value="briefed">Con brief</option>
                <option value="scheduled">Agendar</option>
              </select>
            </Field>
            <Field label="Prioridad">
              <input
                type="number"
                min={1}
                max={10}
                value={form.priority}
                onChange={(e) =>
                  update("priority", Number(e.target.value) || 5)
                }
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </Field>
            <Field label="Agendar para">
              <input
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(e) => update("scheduledFor", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </Field>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-border-light)]/40 flex items-center justify-end gap-2 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#1A1D23] text-white text-sm font-medium hover:bg-[#13151A] disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
