"use client";

import { useState } from "react";
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

type Article = {
  id: number;
  title: string;
  section: string;
  status: string;
  editorScore: number | null;
  createdAt: string;
};

export default function ArticlesPage() {
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("");

  const params = new URLSearchParams();
  if (section) params.set("section", section);
  if (status) params.set("status", status);
  params.set("limit", "50");

  const { data, error, isLoading } = useSWR(
    `/api/articles?${params.toString()}`,
    fetcher,
    { refreshInterval: 10000 }
  );

  const articles: Article[] = data?.data ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Articulos
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Gestiona y revisa los articulos generados por agentes
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
          <option value="discovered">Descubierto</option>
          <option value="researching">Investigando</option>
          <option value="drafting">Borrador</option>
          <option value="review">En revision</option>
          <option value="published">Publicado</option>
          <option value="rejected">Rechazado</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            Cargando articulos...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm">
            Error al cargar articulos
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            No se encontraron articulos
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
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-[var(--color-border-light)]/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-ciencia)] transition-colors"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sectionColors[article.section] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {sectionNames[article.section] ?? article.section}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[article.status] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statusLabels[article.status] ?? article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    {article.editorScore != null
                      ? article.editorScore.toFixed(1)
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                    {new Date(article.createdAt).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {data?.pagination && (
        <div className="mt-4 text-sm text-[var(--color-text-muted)]">
          Mostrando {articles.length} de {data.pagination.total} articulos
        </div>
      )}
    </div>
  );
}
