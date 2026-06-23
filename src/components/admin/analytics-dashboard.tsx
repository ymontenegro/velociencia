"use client";

import useSWR from "swr";
import { useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Range = "24h" | "7d" | "30d" | "90d" | "all";

const RANGE_LABELS: Record<Range, string> = {
  "24h": "Últimas 24 h",
  "7d": "7 días",
  "30d": "30 días",
  "90d": "90 días",
  all: "Todo",
};

const RANGES: Range[] = ["24h", "7d", "30d", "90d", "all"];

type Site = "all" | "es" | "en";

const SITE_LABELS: Record<Site, string> = {
  all: "Ambos sitios",
  es: "velociencia.cl",
  en: "pedalsci.com",
};

const SITES: Site[] = ["all", "es", "en"];

type AnalyticsResponse = {
  summary: {
    range: Range;
    totals: {
      pageviews: number;
      sessions: number;
      visitors: number;
      avgDurationMs: number;
      bounceRate: number;
    };
    realtime: number;
    byDay: { day: string; pageviews: number; visitors: number }[];
    topCountries: { country: string | null; name: string | null; sessions: number }[];
    topPages: {
      path: string;
      section: string | null;
      slug: string | null;
      pageviews: number;
      avgDurationMs: number;
    }[];
    topReferrers: { domain: string; sessions: number }[];
    devices: { device: string; sessions: number }[];
    browsers: { browser: string; sessions: number }[];
    locales: { locale: string | null; pageviews: number }[];
  };
  realtime: {
    total: number;
    byPath: { path: string; count: number }[];
  };
};

function fmtDuration(ms: number): string {
  if (!ms || ms < 0) return "—";
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

function fmtPercent(v: number): string {
  return `${Math.round(v * 100)}%`;
}

function fmtNumber(n: number): string {
  return n.toLocaleString("es-CL");
}

function fmtDay(day: string): string {
  // day = YYYY-MM-DD
  const d = new Date(day + "T00:00:00Z");
  return d.toLocaleDateString("es-CL", { day: "2-digit", month: "short" });
}

function countryFlag(code: string | null): string {
  if (!code || code.length !== 2) return "🌐";
  const base = 127397;
  return String.fromCodePoint(
    base + code.toUpperCase().charCodeAt(0),
    base + code.toUpperCase().charCodeAt(1)
  );
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>("30d");
  const [site, setSite] = useState<Site>("all");
  const { data, isLoading, error } = useSWR<AnalyticsResponse>(
    `/api/admin/analytics?range=${range}${site !== "all" ? `&site=${site}` : ""}`,
    fetcher,
    { refreshInterval: 30000 }
  );

  const summary = data?.summary;
  const realtime = data?.realtime;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Analítica</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Visitas, audiencia y comportamiento del sitio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-700">
              {realtime?.total ?? 0} ahora
            </span>
          </div>
          <div className="inline-flex rounded-lg border border-[var(--color-border)] overflow-hidden">
            {SITES.map((s) => (
              <button
                key={s}
                onClick={() => setSite(s)}
                className={`px-3 py-1.5 text-xs font-medium border-r last:border-r-0 border-[var(--color-border)] transition-colors ${
                  site === s
                    ? "bg-[#1A1D23] text-white"
                    : "bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)]"
                }`}
              >
                {SITE_LABELS[s]}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-lg border border-[var(--color-border)] overflow-hidden">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-medium border-r last:border-r-0 border-[var(--color-border)] transition-colors ${
                  range === r
                    ? "bg-[#1A1D23] text-white"
                    : "bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)]"
                }`}
              >
                {RANGE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          Error al cargar la analítica.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KpiCard
          label="Visitantes únicos"
          value={fmtNumber(summary?.totals.visitors ?? 0)}
          accent="indigo"
        />
        <KpiCard
          label="Sesiones"
          value={fmtNumber(summary?.totals.sessions ?? 0)}
          accent="cyan"
        />
        <KpiCard
          label="Pageviews"
          value={fmtNumber(summary?.totals.pageviews ?? 0)}
          accent="emerald"
        />
        <KpiCard
          label="Duración media"
          value={fmtDuration(summary?.totals.avgDurationMs ?? 0)}
          accent="amber"
        />
        <KpiCard
          label="Tasa de rebote"
          value={fmtPercent(summary?.totals.bounceRate ?? 0)}
          accent="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Visitas en el tiempo
            </h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {RANGE_LABELS[range]}
            </span>
          </div>
          <ChartByDay data={summary?.byDay ?? []} loading={isLoading} />
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            En vivo
          </h2>
          <div className="text-4xl font-bold text-[var(--color-text)] mb-1">
            {realtime?.total ?? 0}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            visitantes en los últimos 5 minutos
          </p>
          <div className="space-y-2">
            {realtime?.byPath.length ? (
              realtime.byPath.map((row) => (
                <div
                  key={row.path}
                  className="flex items-center justify-between text-xs"
                >
                  <span
                    title={row.path}
                    className="truncate text-[var(--color-text-secondary)] max-w-[70%]"
                  >
                    {row.path}
                  </span>
                  <span className="font-mono text-[var(--color-text-muted)]">
                    {row.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[var(--color-text-muted)]">
                Sin visitantes activos.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Países
          </h2>
          {summary?.topCountries.length ? (
            <ul className="space-y-2">
              {summary.topCountries.map((row, idx) => {
                const max = summary.topCountries[0]?.sessions ?? 1;
                const pct = max > 0 ? (row.sessions / max) * 100 : 0;
                return (
                  <li key={`${row.country ?? "unknown"}-${idx}`}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="flex items-center gap-2 text-[var(--color-text)]">
                        <span className="text-base">
                          {countryFlag(row.country)}
                        </span>
                        <span>{row.name ?? row.country ?? "Desconocido"}</span>
                      </span>
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        {fmtNumber(row.sessions)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--color-border-light)] overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyHint loading={isLoading} />
          )}
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Páginas más vistas
          </h2>
          {summary?.topPages.length ? (
            <ul className="divide-y divide-[var(--color-border-light)]">
              {summary.topPages.map((row) => (
                <li
                  key={row.path}
                  className="py-2 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-[var(--color-text)] truncate">
                      {row.path}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      {row.section ?? "—"} · {fmtDuration(row.avgDurationMs)}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text)]">
                    {fmtNumber(row.pageviews)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyHint loading={isLoading} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Dispositivos
          </h2>
          <DonutBreakdown
            rows={summary?.devices.map((d) => ({ name: d.device, value: d.sessions })) ?? []}
            loading={isLoading}
          />
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Navegadores
          </h2>
          <BarBreakdown rows={summary?.browsers.map((b) => ({ name: b.browser, value: b.sessions })) ?? []} />
        </div>

        <div className="bg-white rounded-lg border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            Referrers
          </h2>
          {summary?.topReferrers.length ? (
            <ul className="space-y-2 text-sm">
              {summary.topReferrers.map((row) => (
                <li
                  key={row.domain}
                  className="flex items-center justify-between"
                >
                  <span className="truncate text-[var(--color-text-secondary)]">
                    {row.domain}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">
                    {fmtNumber(row.sessions)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyHint loading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "indigo" | "emerald" | "cyan" | "amber" | "rose";
}) {
  const colors: Record<typeof accent, string> = {
    indigo: "from-indigo-50 to-white border-indigo-200",
    emerald: "from-emerald-50 to-white border-emerald-200",
    cyan: "from-cyan-50 to-white border-cyan-200",
    amber: "from-amber-50 to-white border-amber-200",
    rose: "from-rose-50 to-white border-rose-200",
  };
  return (
    <div
      className={`bg-gradient-to-b ${colors[accent]} rounded-lg border p-4`}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-[var(--color-text)] tabular-nums">
        {value}
      </p>
    </div>
  );
}

function ChartByDay({
  data,
  loading,
}: {
  data: { day: string; pageviews: number; visitors: number }[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="h-[280px] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Cargando...
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="h-[280px] flex items-center justify-center text-sm text-[var(--color-text-muted)]">
        Aún sin datos. Visita el sitio para empezar a registrar tráfico.
      </div>
    );
  }
  const formatted = data.map((d) => ({ ...d, label: fmtDay(d.day) }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={formatted} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="visGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
          stroke="var(--color-border)"
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
          stroke="var(--color-border)"
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="pageviews"
          name="Pageviews"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#pvGradient)"
        />
        <Area
          type="monotone"
          dataKey="visitors"
          name="Visitantes"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#visGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function DonutBreakdown({
  rows,
  loading,
}: {
  rows: { name: string; value: number }[];
  loading: boolean;
}) {
  if (loading) {
    return <EmptyHint loading={true} />;
  }
  const total = rows.reduce((sum, r) => sum + r.value, 0);
  if (total === 0) return <EmptyHint loading={false} />;

  const palette: Record<string, string> = {
    desktop: "#6366f1",
    mobile: "#10b981",
    tablet: "#f59e0b",
    bot: "#94a3b8",
    unknown: "#cbd5e1",
  };
  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const pct = total > 0 ? (row.value / total) * 100 : 0;
        const color = palette[row.name.toLowerCase()] ?? "#475569";
        return (
          <li key={row.name}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="capitalize text-[var(--color-text)]">{row.name}</span>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                {fmtNumber(row.value)} · {Math.round(pct)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--color-border-light)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function BarBreakdown({ rows }: { rows: { name: string; value: number }[] }) {
  if (!rows.length) return <EmptyHint loading={false} />;
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={rows} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "var(--color-text-muted)" }}
          stroke="var(--color-border)"
        />
        <YAxis
          tick={{ fontSize: 10, fill: "var(--color-text-muted)" }}
          stroke="var(--color-border)"
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function EmptyHint({ loading }: { loading: boolean }) {
  return (
    <p className="text-xs text-[var(--color-text-muted)]">
      {loading ? "Cargando..." : "Sin datos en este rango."}
    </p>
  );
}
