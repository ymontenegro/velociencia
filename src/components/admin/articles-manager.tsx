"use client";

import { useMemo, useState, useTransition } from "react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS, type SectionId } from "@/lib/constants";
import { STATUS_META, siteTodayStr } from "@/lib/publish";
import type { ArticleStatus } from "@/types/article";

type Locale = "es" | "en";

type AdminArticle = {
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
  status: ArticleStatus;
  wordCount: number;
  updatedAt: number;
};

type Frontmatter = {
  date?: string;
  draft?: boolean;
  featured?: boolean;
};

const CONTENT_URL = "/api/admin/content";

const fetcher = (url: string): Promise<{ data: AdminArticle[] }> =>
  fetch(url).then((r) => r.json());

const STATUS_OPTIONS: { value: ArticleStatus; label: string }[] = [
  { value: "draft", label: STATUS_META.draft.label },
  { value: "scheduled", label: STATUS_META.scheduled.label },
  { value: "published", label: STATUS_META.published.label },
];

const LOCALE_LABELS: Record<Locale, string> = { es: "ES", en: "EN" };

const SELECT_CLASS =
  "px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30";

function fmtDate(value: string): string {
  if (!value) return "—";
  // Parse as local-noon to avoid TZ rollover when only a date is given.
  const d = new Date(`${value.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function publicUrl(a: AdminArticle): string {
  const base = a.locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const sectionSlug = SECTIONS_I18N[a.locale][a.section].slug;
  return `${base}/${sectionSlug}/${a.slug}`;
}

function StatusBadge({ status }: { status: ArticleStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        color: meta.color,
        backgroundColor: `${meta.color}1A`,
        border: `1px solid ${meta.color}40`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
    </span>
  );
}

export function ArticlesManager() {
  const { data, error, isLoading } = useSWR<{ data: AdminArticle[] }>(
    CONTENT_URL,
    fetcher,
    { refreshInterval: 15000 }
  );

  const [section, setSection] = useState<SectionId | "">("");
  const [status, setStatus] = useState<ArticleStatus | "">("");
  const [locale, setLocale] = useState<Locale | "">("");
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // ref currently being scheduled (shows the inline date input)
  const [schedulingRef, setSchedulingRef] = useState<string | null>(null);
  // ref of the row with a mutation in flight
  const [busyRef, setBusyRef] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const all: AdminArticle[] = useMemo(() => data?.data ?? [], [data]);

  const counts = useMemo(() => {
    const c = { draft: 0, scheduled: 0, published: 0 };
    for (const a of all) c[a.status] += 1;
    return c;
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = all.filter((a) => {
      if (section && a.section !== section) return false;
      if (status && a.status !== status) return false;
      if (locale && a.locale !== locale) return false;
      if (q && !a.title.toLowerCase().includes(q) && !a.slug.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
    rows.sort((x, y) => {
      const cmp = x.date < y.date ? -1 : x.date > y.date ? 1 : 0;
      return sortDesc ? -cmp : cmp;
    });
    return rows;
  }, [all, section, status, locale, query, sortDesc]);

  async function patch(a: AdminArticle, frontmatter: Frontmatter) {
    setActionError(null);
    setBusyRef(a.ref);
    try {
      const res = await fetch(`${CONTENT_URL}/${a.ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontmatter }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Error ${res.status}`);
      }
      await mutate(CONTENT_URL);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setBusyRef(null);
    }
  }

  async function remove(a: AdminArticle) {
    if (
      !window.confirm(
        `¿Eliminar definitivamente «${a.title}» (${LOCALE_LABELS[a.locale]})? Esta acción borra el archivo y no se puede deshacer.`
      )
    ) {
      return;
    }
    setActionError(null);
    setBusyRef(a.ref);
    try {
      const res = await fetch(`${CONTENT_URL}/${a.ref}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Error ${res.status}`);
      }
      await mutate(CONTENT_URL);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Error al eliminar");
    } finally {
      setBusyRef(null);
    }
  }

  function publishNow(a: AdminArticle) {
    startTransition(() => {
      void patch(a, { date: siteTodayStr(), draft: false });
    });
  }

  function unpublish(a: AdminArticle) {
    startTransition(() => {
      void patch(a, { draft: true });
    });
  }

  function toggleFeatured(a: AdminArticle) {
    startTransition(() => {
      void patch(a, { featured: !a.featured });
    });
  }

  function confirmSchedule(a: AdminArticle, date: string) {
    setSchedulingRef(null);
    if (!date) return;
    startTransition(() => {
      void patch(a, { date, draft: false });
    });
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Artículos</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Gestiona, programa y publica los artículos del sitio. Los archivos
            markdown son la fuente de verdad.
          </p>
        </div>
      </div>

      {/* Summary chips */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {STATUS_OPTIONS.map((opt) => {
          const meta = STATUS_META[opt.value];
          return (
            <span
              key={opt.value}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                color: meta.color,
                backgroundColor: `${meta.color}14`,
                border: `1px solid ${meta.color}33`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              {counts[opt.value]} {meta.label.toLowerCase()}
              {counts[opt.value] === 1 ? "" : "s"}
            </span>
          );
        })}
        <span className="inline-flex items-center rounded-full bg-[var(--color-border-light)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
          {all.length} en total
        </span>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <select
          value={section}
          onChange={(e) => setSection(e.target.value as SectionId | "")}
          className={SELECT_CLASS}
        >
          <option value="">Todas las secciones</option>
          {SECTION_IDS.map((id) => (
            <option key={id} value={id}>
              {SECTIONS[id].name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ArticleStatus | "")}
          className={SELECT_CLASS}
        >
          <option value="">Todos los estados</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale | "")}
          className={SELECT_CLASS}
        >
          <option value="">Ambos idiomas</option>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o slug…"
          className="min-w-[220px] flex-1 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />

        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
          title="Cambiar orden por fecha"
        >
          Fecha {sortDesc ? "↓" : "↑"}
        </button>
      </div>

      {actionError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-[var(--color-text-muted)]">
            Cargando artículos…
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-600">
            Error al cargar los artículos
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--color-text-muted)]">
            No se encontraron artículos con esos filtros
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-light)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Título
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Autor
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Palabras
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {filtered.map((a) => {
                  const busy = busyRef === a.ref;
                  const isScheduling = schedulingRef === a.ref;
                  return (
                    <tr
                      key={a.ref}
                      className={`transition-colors hover:bg-[var(--color-border-light)]/50 ${busy ? "opacity-60" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: SECTIONS[a.section].color }}
                            title={SECTIONS[a.section].name}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <Link
                                href={`/admin/articles/edit/${a.ref}`}
                                className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-ciencia)]"
                              >
                                {a.title}
                              </Link>
                              {a.featured && (
                                <span title="Destacado" className="text-amber-500">
                                  ★
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-border-light)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                                {LOCALE_LABELS[a.locale]}
                              </span>
                              <span className="truncate font-mono text-[11px] text-[var(--color-text-muted)]">
                                {a.slug}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                        {fmtDate(a.date)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                        {a.author || "—"}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm text-[var(--color-text-muted)]">
                        {a.wordCount.toLocaleString("es-CL")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {isScheduling ? (
                            <input
                              type="date"
                              autoFocus
                              min={siteTodayStr()}
                              defaultValue={a.date}
                              disabled={busy}
                              onChange={(e) => confirmSchedule(a, e.target.value)}
                              onBlur={() => setSchedulingRef(null)}
                              className="rounded-md border border-[var(--color-border)] bg-white px-2 py-1 text-xs text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                            />
                          ) : (
                            <ActionMenu
                              article={a}
                              busy={busy}
                              onPublishNow={() => publishNow(a)}
                              onSchedule={() => setSchedulingRef(a.ref)}
                              onUnpublish={() => unpublish(a)}
                              onToggleFeatured={() => toggleFeatured(a)}
                              onDelete={() => remove(a)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!isLoading && !error && (
        <div className="mt-4 text-sm text-[var(--color-text-muted)]">
          Mostrando {filtered.length} de {all.length} artículos
        </div>
      )}
    </div>
  );
}

const ACTION_BTN =
  "rounded-md border border-[var(--color-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)] disabled:cursor-not-allowed disabled:opacity-40";

function ActionMenu({
  article: a,
  busy,
  onPublishNow,
  onSchedule,
  onUnpublish,
  onToggleFeatured,
  onDelete,
}: {
  article: AdminArticle;
  busy: boolean;
  onPublishNow: () => void;
  onSchedule: () => void;
  onUnpublish: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  const isPublished = a.status === "published";
  const isDraft = a.status === "draft";

  return (
    <>
      <Link
        href={`/admin/articles/edit/${a.ref}`}
        className={ACTION_BTN}
        aria-disabled={busy}
      >
        Editar
      </Link>

      {isPublished ? (
        <a
          href={publicUrl(a)}
          target="_blank"
          rel="noopener noreferrer"
          className={ACTION_BTN}
        >
          Ver
        </a>
      ) : (
        <span className={`${ACTION_BTN} cursor-default opacity-40`} title="Solo disponible cuando está publicado">
          Ver
        </span>
      )}

      {!isPublished && (
        <button type="button" onClick={onPublishNow} disabled={busy} className={ACTION_BTN}>
          Publicar ahora
        </button>
      )}

      <button type="button" onClick={onSchedule} disabled={busy} className={ACTION_BTN}>
        Programar…
      </button>

      {!isDraft && (
        <button type="button" onClick={onUnpublish} disabled={busy} className={ACTION_BTN}>
          Despublicar
        </button>
      )}

      <button type="button" onClick={onToggleFeatured} disabled={busy} className={ACTION_BTN}>
        {a.featured ? "Quitar destacado" : "Destacar"}
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        className="rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Eliminar
      </button>
    </>
  );
}
