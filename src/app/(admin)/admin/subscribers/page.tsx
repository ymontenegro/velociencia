import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubscribersPage() {
  const rows = db
    .select()
    .from(schema.subscribers)
    .orderBy(desc(schema.subscribers.createdAt))
    .all();

  const total = rows.length;
  const active = rows.filter((r) => r.status === "active").length;
  const es = rows.filter((r) => r.locale === "es").length;
  const en = rows.filter((r) => r.locale === "en").length;

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Newsletter
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Suscriptores registrados en la base de datos local
        </p>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total" value={total} />
        <StatCard label="Activos" value={active} />
        <StatCard label="Velociencia (ES)" value={es} />
        <StatCard label="Pedalsci (EN)" value={en} />
      </div>

      {/* Tabla */}
      {rows.length === 0 ? (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center text-sm text-[var(--color-text-muted)]">
          Aún no hay suscriptores.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <Th>Email</Th>
                <Th>Locale</Th>
                <Th>Estado</Th>
                <Th>Fuente</Th>
                <Th>Registrado</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.locale ? (
                      <span className="inline-flex items-center rounded-full bg-[var(--color-ciencia)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-ciencia)]">
                        {row.locale}
                      </span>
                    ) : (
                      <span className="text-[var(--color-text-muted)]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {row.status === "active" ? "activo" : "dado de baja"}
                    </span>
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-xs text-[var(--color-text-muted)]">
                    {row.source ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--color-text-muted)]">
                    {formatDate(row.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tabular-nums text-[var(--color-text)]">
        {value.toLocaleString("es-CL")}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
      {children}
    </th>
  );
}
