"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const statusLabels: Record<string, string> = {
  discovered: "Descubierto",
  researching: "Investigando",
  drafting: "Borrador",
  review: "En revision",
  published: "Publicado",
  rejected: "Rechazado",
};

const statusColors: Record<string, string> = {
  discovered: "bg-gray-100 text-gray-700",
  researching: "bg-blue-50 text-blue-700",
  drafting: "bg-blue-100 text-blue-800",
  review: "bg-amber-100 text-amber-800",
  published: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
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

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isActioning, setIsActioning] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/api/articles/${id}`,
    fetcher
  );

  const article = data?.data;

  async function handleApprove() {
    if (isActioning) return;
    setIsActioning(true);
    try {
      const res = await fetch(`/api/articles/${id}/approve`, {
        method: "POST",
      });
      if (res.ok) {
        router.push("/admin/articles");
      } else {
        const err = await res.json();
        alert(`Error al aprobar: ${err.error}`);
      }
    } catch {
      alert("Error de conexion al aprobar");
    } finally {
      setIsActioning(false);
    }
  }

  async function handleReject() {
    if (isActioning) return;
    setIsActioning(true);
    try {
      const res = await fetch(`/api/articles/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason }),
      });
      if (res.ok) {
        router.push("/admin/articles");
      } else {
        const err = await res.json();
        alert(`Error al rechazar: ${err.error}`);
      }
    } catch {
      alert("Error de conexion al rechazar");
    } finally {
      setIsActioning(false);
    }
  }

  if (isLoading) {
    return (
      <div className="text-sm text-[var(--color-text-muted)]">
        Cargando articulo...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-sm text-red-600">
        Error al cargar el articulo.{" "}
        <Link href="/admin/articles" className="underline">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/articles"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-2 inline-block"
          >
            &larr; Volver a articulos
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-base text-[var(--color-text-secondary)] mt-1">
              {article.subtitle}
            </p>
          )}
        </div>

        {/* Action buttons */}
        {article.status !== "published" && article.status !== "rejected" && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleApprove}
              disabled={isActioning}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              Aprobar
            </button>
            <button
              onClick={() => setShowRejectForm(!showRejectForm)}
              disabled={isActioning}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              Rechazar
            </button>
          </div>
        )}
      </div>

      {/* Reject form */}
      {showRejectForm && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-red-800 mb-2">
            Motivo del rechazo
          </label>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-red-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
            placeholder="Explica el motivo del rechazo..."
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleReject}
              disabled={isActioning}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              Confirmar rechazo
            </button>
            <button
              onClick={() => {
                setShowRejectForm(false);
                setRejectionReason("");
              }}
              className="px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article content */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[var(--color-border)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
            Contenido
          </h2>
          {article.markdownContent ? (
            <div className="prose prose-sm max-w-none text-[var(--color-text)]">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {article.markdownContent}
              </pre>
            </div>
          ) : article.excerpt ? (
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {article.excerpt}
            </p>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)] italic">
              Sin contenido disponible
            </p>
          )}
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
            <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
              Metadatos
            </h2>

            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">
                  Seccion
                </dt>
                <dd className="mt-0.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sectionColors[article.section] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {sectionNames[article.section] ?? article.section}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">
                  Estado
                </dt>
                <dd className="mt-0.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[article.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusLabels[article.status] ?? article.status}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">
                  Score del editor
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-[var(--color-text)]">
                  {article.editorScore != null
                    ? article.editorScore.toFixed(1)
                    : "Sin evaluar"}
                </dd>
              </div>

              {article.editorNotes && (
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)]">
                    Notas del editor
                  </dt>
                  <dd className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                    {article.editorNotes}
                  </dd>
                </div>
              )}

              {article.rejectionReason && (
                <div>
                  <dt className="text-xs text-red-600">
                    Motivo de rechazo
                  </dt>
                  <dd className="mt-0.5 text-sm text-red-700">
                    {article.rejectionReason}
                  </dd>
                </div>
              )}

              {article.readingTimeMinutes && (
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)]">
                    Tiempo de lectura
                  </dt>
                  <dd className="mt-0.5 text-sm text-[var(--color-text)]">
                    {article.readingTimeMinutes} min
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">
                  Creado
                </dt>
                <dd className="mt-0.5 text-sm text-[var(--color-text)]">
                  {new Date(article.createdAt).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </dd>
              </div>

              {article.publishedAt && (
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)]">
                    Publicado
                  </dt>
                  <dd className="mt-0.5 text-sm text-[var(--color-text)]">
                    {new Date(article.publishedAt).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-xs text-[var(--color-text-muted)]">
                  Ultima actualizacion
                </dt>
                <dd className="mt-0.5 text-sm text-[var(--color-text)]">
                  {new Date(article.updatedAt).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Tags */}
          {article.tags && (
            <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Tags
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {(() => {
                  try {
                    const tags = JSON.parse(article.tags);
                    return Array.isArray(tags)
                      ? tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 bg-[var(--color-border-light)] text-[var(--color-text-secondary)] text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))
                      : null;
                  } catch {
                    return null;
                  }
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
