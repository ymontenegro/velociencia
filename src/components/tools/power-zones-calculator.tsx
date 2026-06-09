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
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import {
  ToolPanel,
  NumberField,
  MetaBadge,
} from "@/components/tools/ui";

// ---------------------------------------------------------------------------
// Strings (self-contained bilingual — no external dictionary)
// ---------------------------------------------------------------------------

interface Strings {
  eyebrow: string;
  title: string;
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
    eyebrow: "Entrenamiento · Calculadora",
    title: "Calculadora de zonas de potencia",
    ftpLabel: "FTP",
    ftpUnit: "W",
    ftpPlaceholder: "250",
    tableZone: "Zona",
    tableRange: "% FTP",
    tableWatts: "Vatios",
    chartTitle: "Rango de vatios por zona",
    footnote:
      "El FTP (Functional Threshold Power) es la potencia máxima sostenible durante aproximadamente 60 minutos. Las zonas de entrenamiento siguen el modelo de 7 zonas de Andrew Coggan, referencia estándar en fisiología del ciclismo.",
    watts: "W",
  },
  en: {
    eyebrow: "Training · Calculator",
    title: "Power zones calculator",
    ftpLabel: "FTP",
    ftpUnit: "W",
    ftpPlaceholder: "250",
    tableZone: "Zone",
    tableRange: "% FTP",
    tableWatts: "Watts",
    chartTitle: "Watt range per zone",
    footnote:
      "FTP (Functional Threshold Power) is the maximum power output sustainable for approximately 60 minutes. Training zones follow Andrew Coggan's 7-zone model, the standard reference in cycling physiology.",
    watts: "W",
  },
};

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
  /** Proportional bar width 0–100 relative to the widest zone range */
  barPct: number;
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
  const z7Cap = Math.round(ftp * Z7_CHART_MULTIPLIER);

  const raw = POWER_ZONES.map((def: PowerZoneDef) => {
    const lowerW = Math.round((def.pctLow / 100) * ftp);
    const upperW = def.pctHigh !== null ? Math.round((def.pctHigh / 100) * ftp) : null;
    const rangeW = upperW !== null ? upperW - lowerW : z7Cap - lowerW;
    return { def, lowerW, upperW, rangeW };
  });

  const maxRangeW = Math.max(...raw.map((r) => r.rangeW), 1);

  return raw.map(({ def, lowerW, upperW, rangeW }) => ({
    id: def.id,
    name: zoneName(def, locale),
    pctLabel: def.pctLabel,
    lowerW,
    upperW,
    color: def.color,
    barPct: Math.round((rangeW / maxRangeW) * 100),
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

export default function PowerZonesCalculator({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: ToolComponentProps) {
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
              lineHeight: 1.6,
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: 2,
              }}
            >
              {datum.zoneName}
            </p>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                fontVariantNumeric: "tabular-nums",
                color: "var(--color-text)",
              }}
            >
              {rangeLabel}
            </p>
          </div>
        );
      },
    [s],
  );

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={s.title}
      meta={
        <MetaBadge live>
          {ftp}&thinsp;{s.ftpUnit}
        </MetaBadge>
      }
    >
      {/* ── FTP input ── */}
      <div className="mb-7 max-w-[220px]">
        <NumberField
          id="pzc-ftp-input"
          label={s.ftpLabel}
          unit={s.ftpUnit}
          value={rawInput}
          onChange={setRawInput}
          min={MIN_FTP}
          max={MAX_FTP}
          step={1}
          placeholder={s.ftpPlaceholder}
        />
      </div>

      {/* ── Zone table ── */}
      <div className="mb-7 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="pb-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {s.tableZone}
              </th>
              <th className="pb-2 pr-5 text-right font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {s.tableRange}
              </th>
              <th className="pb-2 pr-4 text-right font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {s.tableWatts}
              </th>
              {/* Bar column — no header text, just structural width */}
              <th className="pb-2 w-24 sm:w-36" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => {
              const wattsLabel =
                z.upperW !== null ? `${z.lowerW}–${z.upperW}` : `≥ ${z.lowerW}`;
              return (
                <tr
                  key={z.id}
                  className="group border-b border-[var(--color-border-light)] last:border-0 transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_3%,transparent)]"
                >
                  {/* Zone swatch + name */}
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-2 w-2 flex-shrink-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: z.color }}
                        aria-hidden="true"
                      />
                      <span className="whitespace-nowrap text-sm text-[var(--color-text)]">
                        {z.name}
                      </span>
                    </div>
                  </td>

                  {/* % FTP */}
                  <td className="py-2.5 pr-5 text-right font-mono text-xs tabular-nums text-[var(--color-text-secondary)]">
                    {z.pctLabel}
                  </td>

                  {/* Watts — mono tabular */}
                  <td className="py-2.5 pr-4 text-right">
                    <span className="font-mono text-sm tabular-nums text-[var(--color-text)]">
                      {wattsLabel}
                    </span>
                    <span className="ml-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                      W
                    </span>
                  </td>

                  {/* Proportional zone-color bar */}
                  <td className="py-2.5 pl-1 pr-2 align-middle">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)]">
                      <div
                        className="h-full rounded-full transition-[width] duration-500 ease-out"
                        style={{
                          width: `${z.barPct}%`,
                          background: `linear-gradient(to right, ${z.color}dd, ${z.color}66)`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Chart sub-panel ── */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-text)_2%,var(--color-bg-card))] px-2 pb-2 pt-4 sm:px-4">
        <p className="mb-3 px-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
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
              tick={{ fontSize: 11, fill: "var(--color-text-muted)", fontFamily: "monospace" }}
              stroke="var(--color-border)"
              tickFormatter={(v: number) => `${v}W`}
              domain={[0, "auto"]}
            />
            <YAxis
              type="category"
              dataKey="zoneId"
              tick={{ fontSize: 11, fill: "var(--color-text-muted)", fontFamily: "monospace" }}
              stroke="var(--color-border)"
              width={30}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: "rgba(128,128,128,0.08)" }}
            />
            {/* Transparent spacer: offsets each zone bar to its actual watt start */}
            <Bar
              dataKey="spacer"
              stackId="zone"
              fill="transparent"
              stroke="none"
              isAnimationActive={false}
              legendType="none"
            />
            {/* Visible zone range bar — each Cell carries its own zone color */}
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

      {/* ── Footnote ── */}
      <p className="mt-5 border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </ToolPanel>
  );
}
