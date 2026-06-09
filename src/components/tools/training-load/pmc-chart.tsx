"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import type { TooltipPayloadEntry } from "recharts";
import { useAccentColor } from "@/components/tools/ui";

// ─── Chart color constants ─────────────────────────────────────────────────────

const ATL_COLOR = "#E11D48"; // rose — fatigue
const TSB_COLOR = "#7C3AED"; // violet — form

// ─── Public types ─────────────────────────────────────────────────────────────

export interface PmcChartLabels {
  /** Display label for CTL (Chronic Training Load / Fitness). */
  fitness: string;
  /** Display label for ATL (Acute Training Load / Fatigue). */
  fatigue: string;
  /** Display label for TSB (Training Stress Balance / Form). */
  form: string;
}

export interface PmcChartProps {
  /**
   * Each data point must carry numeric `ctl`, `atl`, `tsb` fields plus whatever
   * property is used as the X-axis key.
   */
  data: Array<{ ctl: number; atl: number; tsb: number } & Record<string, unknown>>;
  /** Name of the property used for the X axis (e.g. "day" or "date"). */
  xKey: string;
  xType: "number" | "category";
  xDomain?: [number | string, number | string];
  xTicks?: Array<number | string>;
  /** Formats the X-axis tick display value. */
  xTickFormatter?: (value: number | string) => string;
  /**
   * Formats the tooltip header from the raw X value of the hovered point.
   * Falls back to the raw value when omitted.
   */
  tooltipLabelFormatter?: (value: number | string) => string;
  /** Accent hex fallback for the CTL (Fitness) line. */
  color: string;
  /**
   * Section accent CSS var name (e.g. "--color-entrenamiento"). Used with
   * useAccentColor so the CTL line follows theme changes live.
   */
  accentVar?: string;
  labels: PmcChartLabels;
  /** Chart height in px (default 340). */
  height?: number;
}

// ─── Custom tooltip — mono Race Telemetry style ───────────────────────────────

// recharts injects active/payload/label at render time when the custom tooltip
// is passed as an element, so those props are Partial here.
interface InternalTooltipProps extends Partial<TooltipContentProps> {
  ctlColor: string;
  labels: PmcChartLabels;
  tooltipLabelFormatter?: (value: number | string) => string;
}

function PmcTooltip({
  active,
  payload,
  label,
  ctlColor,
  labels,
  tooltipLabelFormatter,
}: InternalTooltipProps) {
  if (!active || !payload?.length) return null;

  const rawLabel = label as number | string;
  const heading = tooltipLabelFormatter ? tooltipLabelFormatter(rawLabel) : String(rawLabel);

  function resolveEntry(entry: TooltipPayloadEntry): { name: string; entryColor: string } {
    switch (String(entry.dataKey)) {
      case "ctl":
        return { name: labels.fitness, entryColor: ctlColor };
      case "atl":
        return { name: labels.fatigue, entryColor: ATL_COLOR };
      case "tsb":
        return { name: labels.form, entryColor: TSB_COLOR };
      default:
        return {
          name: String(entry.name ?? entry.dataKey ?? ""),
          entryColor: String(entry.color ?? "var(--color-text-secondary)"),
        };
    }
  }

  return (
    <div
      className="rounded-lg px-3 py-2 shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        minWidth: 160,
      }}
    >
      <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {heading}
      </p>
      {payload.map((entry: TooltipPayloadEntry) => {
        const { name, entryColor } = resolveEntry(entry);
        const val =
          typeof entry.value === "number"
            ? entry.value.toFixed(1)
            : String(entry.value ?? "");
        return (
          <p
            key={String(entry.dataKey)}
            className="flex items-center justify-between gap-4 font-mono text-xs tabular-nums"
            style={{ color: entryColor }}
          >
            <span>{name}</span>
            <span className="font-medium">{val}</span>
          </p>
        );
      })}
    </div>
  );
}

// ─── PmcChart ─────────────────────────────────────────────────────────────────

export function PmcChart({
  data,
  xKey,
  xType,
  xDomain,
  xTicks,
  xTickFormatter,
  tooltipLabelFormatter,
  color,
  accentVar = "--color-entrenamiento",
  labels,
  height = 340,
}: PmcChartProps): React.ReactElement {
  // Resolve the section accent to a real color for Recharts (SVG can't use CSS vars).
  const ctlColor = useAccentColor(accentVar, color);

  // Pass as an element so recharts clones it and injects active/payload/label.
  const tooltipContent = (
    <PmcTooltip
      ctlColor={ctlColor}
      labels={labels}
      tooltipLabelFormatter={tooltipLabelFormatter}
    />
  );

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-text)_2%,var(--color-bg-card))] px-2 pb-2 pt-4 sm:px-4">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

          <XAxis
            dataKey={xKey}
            type={xType}
            // Only spread domain/ticks/tickFormatter when the caller provided them.
            {...(xDomain !== undefined ? { domain: xDomain } : {})}
            {...(xTicks !== undefined ? { ticks: xTicks } : {})}
            {...(xTickFormatter !== undefined ? { tickFormatter: xTickFormatter } : {})}
            tick={{
              fontSize: 11,
              fill: "var(--color-text-muted)",
              fontFamily: "ui-monospace, monospace",
            }}
            stroke="var(--color-border)"
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "var(--color-text-muted)",
              fontFamily: "ui-monospace, monospace",
            }}
            stroke="var(--color-border)"
            width={40}
          />

          {/* Zero reference — TSB crosses this line */}
          <ReferenceLine
            y={0}
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          <Tooltip content={tooltipContent} />

          <Legend
            wrapperStyle={{
              fontSize: 11,
              paddingTop: 8,
              fontFamily: "ui-monospace, monospace",
            }}
            iconType="line"
          />

          {/* CTL — Fitness (accent color, thicker) */}
          <Line
            type="monotone"
            dataKey="ctl"
            name={labels.fitness}
            stroke={ctlColor}
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            activeDot={{
              r: 4,
              fill: ctlColor,
              stroke: "var(--color-bg-card)",
              strokeWidth: 2,
            }}
          />

          {/* ATL — Fatigue */}
          <Line
            type="monotone"
            dataKey="atl"
            name={labels.fatigue}
            stroke={ATL_COLOR}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            activeDot={{
              r: 4,
              fill: ATL_COLOR,
              stroke: "var(--color-bg-card)",
              strokeWidth: 2,
            }}
          />

          {/* TSB — Form (dashed, can be negative) */}
          <Line
            type="monotone"
            dataKey="tsb"
            name={labels.form}
            stroke={TSB_COLOR}
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
            isAnimationActive={false}
            activeDot={{
              r: 4,
              fill: TSB_COLOR,
              stroke: "var(--color-bg-card)",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
