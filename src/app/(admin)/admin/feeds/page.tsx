"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const sectionNames: Record<string, string> = {
  nutricion: "Nutricion",
  ciencia: "Ciencia",
  entrenamiento: "Entrenamiento",
  general: "General",
};

const sectionColors: Record<string, string> = {
  nutricion: "bg-[var(--color-nutricion-light)] text-[var(--color-nutricion-dark)]",
  ciencia: "bg-[var(--color-ciencia-light)] text-[var(--color-ciencia-dark)]",
  entrenamiento: "bg-[var(--color-entrenamiento-light)] text-[var(--color-entrenamiento-dark)]",
  general: "bg-gray-100 text-gray-700",
};

export default function FeedsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newFeed, setNewFeed] = useState({
    name: "",
    url: "",
    section: "general",
  });

  const { data, error, isLoading, mutate } = useSWR(
    "/api/feeds",
    fetcher,
    { refreshInterval: 30000 }
  );

  const feeds = data?.feeds ?? [];

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/feeds/refresh", { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        alert(
          `Refresh completado: ${result.success} exitosos, ${result.failed} fallidos`
        );
        mutate();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch {
      alert("Error de conexion");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleAddFeed(e: React.FormEvent) {
    e.preventDefault();
    if (!newFeed.name.trim() || !newFeed.url.trim()) return;

    setAdding(true);
    try {
      const res = await fetch("/api/feeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeed),
      });

      if (res.ok) {
        setNewFeed({ name: "", url: "", section: "general" });
        mutate();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch {
      alert("Error de conexion");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Feeds RSS
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Gestiona las fuentes de contenido RSS
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-[var(--color-text)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-text-secondary)] disabled:opacity-50 transition-colors"
        >
          {refreshing ? "Refrescando..." : "Refrescar Feeds"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden mb-8">
        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            Cargando feeds...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm">
            Error al cargar feeds
          </div>
        ) : feeds.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
            No hay feeds configurados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-border-light)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Seccion
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Activo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Ultimo fetch
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                    Errores
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-light)]">
                {feeds.map((feed: Record<string, unknown>) => (
                  <tr
                    key={feed.id as number}
                    className="hover:bg-[var(--color-border-light)]/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[var(--color-text)]">
                      {feed.name as string}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-muted)] font-mono max-w-[250px] truncate">
                      <a
                        href={feed.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-ciencia)] transition-colors"
                      >
                        {feed.url as string}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sectionColors[feed.section as string] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sectionNames[feed.section as string] ?? (feed.section as string)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          feed.isActive ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                        title={feed.isActive ? "Activo" : "Inactivo"}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                      {feed.lastFetchedAt
                        ? new Date(feed.lastFetchedAt as string).toLocaleDateString(
                            "es-CL",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Nunca"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {(feed.errorCount as number) > 0 ? (
                        <span
                          className="text-red-600 cursor-help"
                          title={(feed.lastError as string) ?? ""}
                        >
                          {feed.errorCount as number}
                        </span>
                      ) : (
                        <span className="text-[var(--color-text-muted)]">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add new feed form */}
      <div className="bg-white rounded-lg border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Agregar nuevo feed
        </h2>

        <form onSubmit={handleAddFeed} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={newFeed.name}
              onChange={(e) =>
                setNewFeed((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="PubMed - Nutrition"
              className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
              URL del feed
            </label>
            <input
              type="url"
              value={newFeed.url}
              onChange={(e) =>
                setNewFeed((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="https://example.com/feed.xml"
              className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="w-[180px]">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
              Seccion
            </label>
            <select
              value={newFeed.section}
              onChange={(e) =>
                setNewFeed((prev) => ({ ...prev, section: e.target.value }))
              }
              className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="general">General</option>
              <option value="nutricion">Nutricion</option>
              <option value="ciencia">Ciencia</option>
              <option value="entrenamiento">Entrenamiento</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={adding || !newFeed.name.trim() || !newFeed.url.trim()}
            className="px-5 py-2 bg-[var(--color-text)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-text-secondary)] disabled:opacity-50 transition-colors"
          >
            {adding ? "Agregando..." : "Agregar"}
          </button>
        </form>
      </div>
    </div>
  );
}
