"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import { POWER_ZONES, zoneName } from "@/lib/training/zones";
import type { PowerZoneDef } from "@/lib/training/zones";

// ---------------------------------------------------------------------------
// Strings (self-contained bilingual — no external dictionary)
// ---------------------------------------------------------------------------

interface Strings {
  title: string;
  subtitle: string;
  ftpLabel: string;
  ftpUnit: string;
  ftpPlaceholder: string;
  tableZone: string;
  tableRange: string;
  tableWatts: string;
  chartTitle: string;
  footnote: string;
  watts: string;
}

const STRINGS: Record<Locale, Strings> = {
  es: {
    title: "Calculadora de zonas de potencia",
    subtitle: "Modelo de 7 zonas de Andrew Coggan",
    ftpLabel: "FTP (vatios)",
    ftpUnit: "W",
    ftpPlaceholder: "Ej. 250",
    tableZone: "Zona",
    tableRange: "% FTP",
    tableWatts: "Vatios",
    chartTitle: "Rango de vatios por zona",
    footnote:
      "El FTP (Functional Threshold Power) es la potencia máxima sostenible durante aproximadamente 60 minutos. Las zonas de entrenamiento siguen el modelo de 7 zonas de Andrew Coggan, referencia estándar en fisiología del ciclismo.",
    watts: "W",
  },
  en: {
    title: "Power zones calculator",
    subtitle: "Andrew Coggan 7-zone model",
    ftpLabel: "FTP (watts)",
    ftpUnit: "W",
    ftpPlaceholder: "e.g. 250",
    tableZone: "Zone",
    tableRange: "% FTP",
    tableWatts: "Watts",
    chartTitle: "Watt range per zone",
    footnote:
      "FTP (Functional Threshold Power) is the maximum power output sustainable for approximately 60 minutes. Training zones follow Andrew Coggan's 7-zone model, the standard reference in cycling physiology.",
    watts: "W",
  },
};

// Zone definitions live in @/lib/training/zones (POWER_ZONES, PowerZoneDef, zoneName).

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ZoneResult {
  id: string;
  name: string;
  pctLabel: string;
  /** Lower bound in watts */
  lowerW: number;
  /** Upper bound in watts. null = open-ended (Z7) */
  upperW: number | null;
  color: string;
}

interface ChartDatum {
  /** Short zone label used on Y axis */
  zoneId: string;
  /** Full zone name for tooltip */
  zoneName: string;
  lowerW: number;
  upperW: number | null;
  /** Invisible spacer from 0 to zone lower bound (stacked bar offset) */
  spacer: number;
  /** Visible bar width (upperW - lowerW, or capped for Z7) */
  rangeW: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MIN_FTP = 50;
const MAX_FTP = 600;
/** Z7 display cap in the chart: 200% of FTP */
const Z7_CHART_MULTIPLIER = 2.0;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function clampFTP(value: number): number {
  if (!Number.isFinite(value) || value < MIN_FTP) return MIN_FTP;
  if (value > MAX_FTP) return MAX_FTP;
  return Math.round(value);
}

function computeZones(ftp: number, locale: Locale): ZoneResult[] {
  return POWER_ZONES.map((def: PowerZoneDef) => ({
    id: def.id,
    name: zoneName(def, locale),
    pctLabel: def.pctLabel,
    lowerW: Math.round((def.pctLow / 100) * ftp),
    upperW: def.pctHigh !== null ? Math.round((def.pctHigh / 100) * ftp) : null,
    color: def.color,
  }));
}

function buildChartData(zones: ZoneResult[], ftp: number): ChartDatum[] {
  const z7Cap = Math.round(ftp * Z7_CHART_MULTIPLIER);
  return zones.map((z) => {
    const upper = z.upperW !== null ? z.upperW : z7Cap;
    return {
      zoneId: z.id,
      zoneName: z.name,
      lowerW: z.lowerW,
      upperW: z.upperW,
      spacer: z.lowerW,
      rangeW: upper - z.lowerW,
      color: z.color,
    };
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PowerZonesCalculator({ color = "#0891B2" }: { color?: string }) {
  const locale = useLocale();
  const s = STRINGS[locale];

  const [rawInput, setRawInput] = useState<string>("250");

  const ftp = useMemo<number>(() => {
    const parsed = parseFloat(rawInput);
    return clampFTP(Number.isFinite(parsed) ? parsed : 250);
  }, [rawInput]);

  const zones = useMemo<ZoneResult[]>(() => computeZones(ftp, locale), [ftp, locale]);
  const chartData = useMemo<ChartDatum[]>(() => buildChartData(zones, ftp), [zones, ftp]);

  // Tooltip renderer — closure over `s` for bilinguality
  const renderTooltip = useMemo(
    () =>
      (props: TooltipContentProps) => {
        const { active, payload } = props;
        if (!active || !payload?.length) return null;
        const datum = payload[0]?.payload as ChartDatum | undefined;
        if (!datum) return null;
        const rangeLabel =
          datum.upperW !== null
            ? `${datum.lowerW}–${datum.upperW} ${s.watts}`
            : `≥ ${datum.lowerW} ${s.watts}`;
        return (
          <div
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              color: "var(--color-text)",
              lineHeight: 1.5,
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 2 }}>{datum.zoneName}</p>
            <p style={{ color: "var(--color-text-secondary)" }}>{rangeLabel}</p>
          </div>
        );
      },
    [s],
  );

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 sm:p-7">
      {/* Header */}
      <h3 className="mb-1 text-lg font-semibold text-[var(--color-text)]">{s.title}</h3>
      <p className="mb-6 text-sm text-[var(--color-text-muted)]">{s.subtitle}</p>

      {/* FTP input */}
      <div className="mb-7 flex flex-wrap items-center gap-3">
        <label
          htmlFor="pzc-ftp-input"
          className="text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap"
        >
          {s.ftpLabel}
        </label>
        <input
          id="pzc-ftp-input"
          type="number"
          min={MIN_FTP}
          max={MAX_FTP}
          step={1}
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={s.ftpPlaceholder}
          className="w-28 rounded-md border border-[var(--color-border)] bg-transparent px-3 py-1.5 text-sm text-[var(--color-text)] outline-none transition-colors"
          style={
            {
              "--tw-ring-color": color,
            } as React.CSSProperties
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor = color;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "";
          }}
        />
        <span className="text-sm text-[var(--color-text-muted)]">{s.ftpUnit}</span>
        <span
          className="ml-auto text-sm font-semibold tabular-nums"
          style={{ color }}
          aria-live="polite"
        >
          {ftp}&thinsp;W
        </span>
      </div>

      {/* Zone table */}
      <div className="mb-7 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {s.tableZone}
              </th>
              <th className="pb-2 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {s.tableRange}
              </th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                {s.tableWatts}
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => {
              const wattsLabel =
                z.upperW !== null
                  ? `${z.lowerW}–${z.upperW} W`
                  : `≥ ${z.lowerW} W`;
              return (
                <tr
                  key={z.id}
                  className="border-b border-[var(--color-border-light)] last:border-0"
                >
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 flex-shrink-0 rounded-sm"
                        style={{ backgroundColor: z.color }}
                        aria-hidden="true"
                      />
                      <span className="text-[var(--color-text)]">{z.name}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-6 text-right text-[var(--color-text-secondary)]">
                    {z.pctLabel}
                  </td>
                  <td className="py-2 text-right font-mono tabular-nums text-[var(--color-text)]">
                    {wattsLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          {s.chartTitle}
        </p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="var(--color-border)"
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
              stroke="var(--color-border)"
              tickFormatter={(v: number) => `${v}W`}
              domain={[0, "auto"]}
            />
            <YAxis
              type="category"
              dataKey="zoneId"
              tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
              stroke="var(--color-border)"
              width={30}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: "rgba(128,128,128,0.08)" }}
            />
            {/* Transparent spacer: offset each zone bar to its actual watt start */}
            <Bar
              dataKey="spacer"
              stackId="zone"
              fill="transparent"
              stroke="none"
              isAnimationActive={false}
              legendType="none"
            />
            {/* Visible zone range bar */}
            <Bar
              dataKey="rangeW"
              stackId="zone"
              radius={[0, 4, 4, 0]}
              isAnimationActive={true}
              legendType="none"
            >
              {chartData.map((d, i) => (
                <Cell key={`cell-${i}`} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footnote */}
      <p className="border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </div>
  );
}
