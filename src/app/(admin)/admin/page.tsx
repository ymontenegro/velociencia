import { db } from "@/lib/db";
import { articles, agentRuns } from "@/lib/db/schema";
import { eq, and, gte, count } from "drizzle-orm";
import { StatsCards } from "@/components/admin/stats-cards";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [publishedResult, reviewResult, rejectedResult, agentRunsTodayResult] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(articles)
        .where(eq(articles.status, "published")),
      db
        .select({ count: count() })
        .from(articles)
        .where(eq(articles.status, "review")),
      db
        .select({ count: count() })
        .from(articles)
        .where(eq(articles.status, "rejected")),
      db
        .select({ count: count() })
        .from(agentRuns)
        .where(gte(agentRuns.startedAt, today)),
    ]);

  const published = publishedResult[0]?.count ?? 0;
  const review = reviewResult[0]?.count ?? 0;
  const rejected = rejectedResult[0]?.count ?? 0;
  const agentRunsToday = agentRunsTodayResult[0]?.count ?? 0;

  const stats = [
    {
      label: "Articulos publicados",
      value: published,
      accent: "green" as const,
    },
    {
      label: "En revision",
      value: review,
      accent: "yellow" as const,
    },
    {
      label: "Rechazados",
      value: rejected,
      accent: "red" as const,
    },
    {
      label: "Agent runs hoy",
      value: agentRunsToday,
      accent: "purple" as const,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Dashboard
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Resumen general del sistema
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity placeholder */}
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            Actividad reciente
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            No hay actividad reciente para mostrar.
          </p>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            Acciones rapidas
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/articles"
              className="block px-4 py-3 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-border-light)] transition-colors text-sm"
            >
              Revisar articulos pendientes
            </a>
            <a
              href="/admin/agents"
              className="block px-4 py-3 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-border-light)] transition-colors text-sm"
            >
              Ejecutar pipeline de agentes
            </a>
            <a
              href="/admin/feeds"
              className="block px-4 py-3 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-border-light)] transition-colors text-sm"
            >
              Gestionar feeds RSS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
