"use client";

/**
 * Shared presentational sub-components for the climbs dataset.
 *
 * Extracted from `climbs-database.tsx` so the same elevation chart and metric
 * cells render identically in the in-table expanded card AND in the per-climb
 * detail page (`/datos/puertos/<id>` · `/data/climbs/<id>`). Keeping them in one
 * "use client" module avoids divergence between the two surfaces.
 */

import type { ReactNode } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAccentColor } from "@/components/tools/ui";
import type { ClimbEntry } from "@/lib/datasets/climbs";

/**
 * Elevation profile chart. Uses `useAccentColor` to resolve the section accent
 * var to a real hex — Recharts renders to SVG and cannot consume CSS variables
 * in stopColor/stroke/fill attributes.
 */
export function ProfileChart({
  climb,
  accent,
  accentVar,
  dict,
}: {
  climb: ClimbEntry;
  accent: string;
  accentVar: string;
  dict: { profileDistance: string; profileElevation: string };
}) {
  // Recharts → SVG: resolve CSS var to computed hex; `accent` is the SSR fallback.
  const chartColor = useAccentColor(accentVar, accent);
  const data = (climb.profile ?? []).map((p) => ({ d: p.d, e: p.e }));
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${climb.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={chartColor} stopOpacity={0.45} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="d"
            type="number"
            domain={[0, "dataMax"]}
            tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
            stroke="var(--color-border)"
            tickFormatter={(v: number) => v.toFixed(0)}
            unit=" km"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
            stroke="var(--color-border)"
            domain={["dataMin", "dataMax"]}
            width={44}
            unit=" m"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: 12,
              color: "var(--color-text)",
            }}
            labelFormatter={(v) => `${Number(v).toFixed(1)} km`}
            formatter={(v) => [
              `${Math.round(Number(v ?? 0))} m`,
              dict.profileElevation,
            ]}
          />
          <Area
            type="monotone"
            dataKey="e"
            stroke={chartColor}
            strokeWidth={2}
            fill={`url(#grad-${climb.id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Compact DM Mono metric cell inside the key-figures ReadoutPanel. */
export function MetricCell({
  label,
  value,
  unit,
  primary = false,
}: {
  label: string;
  value: string;
  unit?: string;
  primary?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p
        className="mb-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em]"
        style={{ color: primary ? "var(--tool-accent)" : "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-mono text-xl font-semibold tabular-nums leading-none"
          style={{ color: primary ? "var(--tool-accent)" : "var(--color-text)" }}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

/** Inline label + value pair in the card's key-figures row. Mono label. */
export function Figure({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-[var(--color-text-secondary)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
        {label}
      </span>{" "}
      <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text)]">
        {value}
      </span>
    </span>
  );
}

/** Label + prose field for the expanded card detail. Mono uppercase label. */
export function DetailField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-text)]">{children}</p>
    </div>
  );
}
