"use client";

import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { articleStatus, STATUS_META, siteTodayStr } from "@/lib/publish";
import type { Locale } from "@/lib/i18n";

type AdminArticleDetail = {
  ref: string;
  locale: Locale;
  section: SectionId;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  author: string;
  date: string;
  tags: string[];
  coverImage?: string;
  featured: boolean;
  draft: boolean;
  affiliate: boolean;
  translationOf?: string;
  status: "draft" | "scheduled" | "published";
  wordCount: number;
  updatedAt: number;
  content: string;
  frontmatter: Record<string, unknown>;
};

/** Editable form shape — flat, all strings/booleans for controlled inputs. */
type FormState = {
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string;
  coverImage: string;
  translationOf: string;
  featured: boolean;
  draft: boolean;
  affiliate: boolean;
  content: string;
};

const fetcher = (url: string) =>
  fetch(url).then(async (r) => {
    if (!r.ok) {
      const err = new Error("request failed") as Error & { status: number };
      err.status = r.status;
      throw err;
    }
    return r.json();
  });

function detailToForm(d: AdminArticleDetail): FormState {
  return {
    title: d.title ?? "",
    subtitle: d.subtitle ?? "",
    excerpt: d.excerpt ?? "",
    author: d.author ?? "",
    date: d.date ?? "",
    tags: (d.tags ?? []).join(", "),
    coverImage: d.coverImage ?? "",
    translationOf: d.translationOf ?? "",
    featured: Boolean(d.featured),
    draft: Boolean(d.draft),
    affiliate: Boolean(d.affiliate),
    content: d.content ?? "",
  };
}

function countWords(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

export function ArticleEditor() {
  const { ref } = useParams<{ ref: string[] }>();
  const refPath = Array.isArray(ref) ? ref.join("/") : "";
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<{ data: AdminArticleDetail }>(
    refPath ? `/api/admin/content/${refPath}` : null,
    fetcher
  );
  const detail = data?.data;

  const [form, setForm] = useState<FormState | null>(null);
  const [hydratedRef, setHydratedRef] = useState<string | null>(null);

  // Derive form state from the loaded detail. setState-during-render is the
  // recommended React 19 pattern for "reset local state when the source changes".
  if (detail && hydratedRef !== detail.ref) {
    setHydratedRef(detail.ref);
    setForm(detailToForm(detail));
  }

  const [saving, startSaving] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<
    { kind: "ok" | "error"; text: string } | null
  >(null);

  const busy = saving || deleting;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    setFeedback(null);
  }

  function buildPayload(overrides?: Partial<FormState>) {
    const f = { ...(form as FormState), ...overrides };
    return {
      frontmatter: {
        title: f.title,
        subtitle: f.subtitle.trim() === "" ? null : f.subtitle,
        excerpt: f.excerpt.trim() === "" ? null : f.excerpt,
        author: f.author,
        date: f.date,
        tags: f.tags, // API splits the comma-separated string.
        coverImage: f.coverImage.trim() === "" ? null : f.coverImage,
        translationOf: f.translationOf.trim() === "" ? null : f.translationOf,
        featured: f.featured,
        draft: f.draft,
        affiliate: f.affiliate,
      },
      content: f.content,
    };
  }

  /** PATCH the article. `overrides` lets quick actions tweak the form before saving. */
  function save(overrides?: Partial<FormState>, okMessage = "Guardado") {
    if (!form) return;
    // Apply overrides to local state so the UI reflects the action immediately.
    if (overrides) setForm({ ...form, ...overrides });
    startSaving(async () => {
      try {
        const r = await fetch(`/api/admin/content/${refPath}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload(overrides)),
        });
        const json = await r.json().catch(() => ({}));
        if (!r.ok) {
          setFeedback({ kind: "error", text: json?.error ?? "Error al guardar" });
          return;
        }
        const updated = json.data as AdminArticleDetail;
        setForm(detailToForm(updated));
        setHydratedRef(updated.ref);
        await mutate({ data: updated }, { revalidate: false });
        setFeedback({ kind: "ok", text: okMessage });
      } catch {
        setFeedback({ kind: "error", text: "Error de red" });
      }
    });
  }

  async function remove() {
    if (!confirm("¿Eliminar este artículo? Esta acción no se puede deshacer.")) {
      return;
    }
    setDeleting(true);
    try {
      const r = await fetch(`/api/admin/content/${refPath}`, { method: "DELETE" });
      if (!r.ok) {
        const json = await r.json().catch(() => ({}));
        setFeedback({ kind: "error", text: json?.error ?? "Error al eliminar" });
        setDeleting(false);
        return;
      }
      router.push("/admin/articles");
    } catch {
      setFeedback({ kind: "error", text: "Error de red" });
      setDeleting(false);
    }
  }

  // ---- Loading / error states ----

  if (isLoading || (!detail && !error)) {
    return (
      <div className="text-sm text-[var(--color-text-muted)]">Cargando…</div>
    );
  }

  const notFound =
    (error && (error as { status?: number }).status === 404) ||
    (!detail && !!error);

  if (notFound) {
    return (
      <div className="max-w-md">
        <h1 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          Artículo no encontrado
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          No existe un artículo en <code className="font-mono">{refPath}</code>.
        </p>
        <Link
          href="/admin/articles"
          className="text-sm font-medium text-[#1A1D23] underline"
        >
          ← Volver a Artículos
        </Link>
      </div>
    );
  }

  if (!detail || !form) {
    return (
      <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        Error al cargar el artículo.
      </div>
    );
  }

  // ---- Derived UI values ----

  const liveStatus = articleStatus({ draft: form.draft, date: form.date });
  const statusMeta = STATUS_META[liveStatus];
  const section = SECTIONS[detail.section];
  const wordCount = countWords(form.content);

  const base =
    detail.locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const sectionSlug = SECTIONS_I18N[detail.locale][detail.section].slug;
  const publicUrl = `${base}/${sectionSlug}/${detail.slug}`;

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/articles"
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          ← Artículos
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: section.color }}
          >
            {section.icon} {section.name}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            {detail.locale}
          </span>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            {detail.slug}
          </span>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm font-medium text-[#1A1D23] hover:underline"
          >
            Ver en sitio ↗
          </a>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-[var(--color-text)]">
          {form.title || "(sin título)"}
        </h1>
      </div>

      {/* Live status banner */}
      <div
        className="mb-6 flex items-center justify-between gap-3 rounded-lg border px-4 py-3"
        style={{
          borderColor: `${statusMeta.color}55`,
          backgroundColor: `${statusMeta.color}12`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: statusMeta.color }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: statusMeta.color }}
          >
            {statusMeta.label}
          </span>
          {liveStatus === "scheduled" && form.date && (
            <span className="text-sm text-[var(--color-text-muted)]">
              · programado para {form.date}
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">
          {wordCount} palabras
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Body column */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
            Cuerpo (Markdown)
          </label>
          <textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            spellCheck={false}
            className="w-full min-h-[60vh] px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-sm font-mono leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="# Encabezado&#10;&#10;Escribe el cuerpo en Markdown…"
          />
          <div className="mt-1.5 text-xs text-[var(--color-text-muted)]">
            {wordCount} palabras · {form.content.length} caracteres
          </div>
        </div>

        {/* Metadata + actions sidebar */}
        <aside className="space-y-4">
          <Field label="Título" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Subtítulo">
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Extracto">
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              className={`${inputCls} resize-y`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Autor" required>
              <input
                type="text"
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Fecha de publicación">
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Etiquetas (separadas por comas)">
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              className={inputCls}
              placeholder="tour, pogačar, montaña"
            />
          </Field>

          <Field label="Imagen de portada (URL)">
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => update("coverImage", e.target.value)}
              className={`${inputCls} font-mono`}
              placeholder="https://…"
            />
          </Field>

          <Field label="Traducción de (slug)">
            <input
              type="text"
              value={form.translationOf}
              onChange={(e) => update("translationOf", e.target.value)}
              className={`${inputCls} font-mono`}
              placeholder="slug-del-par-en-el-otro-idioma"
            />
          </Field>

          <div className="space-y-2 rounded-lg border border-[var(--color-border)] bg-white p-3">
            <Toggle
              label="Borrador"
              checked={form.draft}
              onChange={(v) => update("draft", v)}
            />
            <Toggle
              label="Destacado"
              checked={form.featured}
              onChange={(v) => update("featured", v)}
            />
            <Toggle
              label="Contiene afiliados"
              checked={form.affiliate}
              onChange={(v) => update("affiliate", v)}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`text-sm rounded-lg px-3 py-2 border ${
                feedback.kind === "ok"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : "text-red-700 bg-red-50 border-red-200"
              }`}
            >
              {feedback.text}
            </div>
          )}

          {/* Quick actions */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => save()}
              disabled={busy}
              className="w-full px-4 py-2 rounded-lg bg-[#1A1D23] text-white text-sm font-medium hover:bg-[#13151A] disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Guardar"}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  save(
                    { draft: false, date: siteTodayStr() },
                    "Publicado"
                  )
                }
                disabled={busy}
                className="px-3 py-2 rounded-lg border border-emerald-300 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
              >
                Publicar ahora
              </button>
              <button
                type="button"
                onClick={() => save({ draft: true }, "Guardado como borrador")}
                disabled={busy}
                className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border-light)] disabled:opacity-60"
              >
                Guardar borrador
              </button>
            </div>

            <button
              type="button"
              onClick={() => save({ draft: false }, "Programado")}
              disabled={busy}
              className="w-full px-3 py-2 rounded-lg border border-amber-300 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-60"
            >
              Programar (usa la fecha futura del campo)
            </button>

            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="w-full px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              {deleting ? "Eliminando…" : "Eliminar artículo"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full border border-[var(--color-border)] rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30";

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

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer">
      <span className="text-sm text-[var(--color-text)]">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[var(--color-border)] accent-[#1A1D23]"
      />
    </label>
  );
}
