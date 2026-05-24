"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { TooltipPayloadEntry } from "recharts/types/state/tooltipSlice";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { useLocale } from "@/components/locale-provider";

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    title: "Calculadora de ingesta de carbohidratos",
    durationLabel: "Duración de la salida",
    durationUnit: "h",
    intensityLabel: "Intensidad",
    low: "Baja",
    moderate: "Moderada",
    high: "Alta",
    gPerHour: "g/h recomendados",
    totalLabel: "Total para la salida",
    grams: "g",
    zone0: "Duración menor a 45 min — solo agua, no se necesitan carbohidratos.",
    zone1:
      "45–75 min — cantidades pequeñas o enjuague bucal con carbohidratos son suficientes.",
    zone2:
      "1–2 h — un único tipo de carbohidrato (glucosa o maltodextrina) es suficiente. No es necesario mezclar.",
    zone3:
      "2–2.5 h — aumenta la ingesta. Las mezclas de carbohidratos (glucosa + fructosa) comienzan a ofrecer ventaja.",
    zone4:
      "Más de 2.5 h — usa CARBOHIDRATOS DE TRANSPORTE MÚLTIPLE (glucosa + fructosa, relación ~2:1). El transportador intestinal SGLT1 se satura a ~60 g/h; incorporar fructosa (GLUT5) permite alcanzar tasas de oxidación de hasta 90 g/h.",
    chartTitle: "Ingesta acumulada a lo largo de la salida",
    chartSeriesRec: "Ingesta recomendada",
    chartSeriesRef: "Límite transportador único (60 g/h)",
    chartAxisX: "Hora (h)",
    chartTooltipHour: "Hora",
    chartTooltipRec: "Recomendado",
    chartTooltipRef: "Límite único",
    noIntake: "Sin ingesta de carbohidratos necesaria",
    footnote:
      "Basado en el marco de Jeukendrup (Sports Medicine, 2014) y el consenso de la ISSN. Los rangos reflejan tasas de oxidación máximas estudiadas en laboratorio; la respuesta individual varía. El intestino puede entrenarse para tolerar ingestas más altas con práctica sistemática.",
  },
  en: {
    title: "Carbohydrate Intake Calculator",
    durationLabel: "Ride duration",
    durationUnit: "h",
    intensityLabel: "Intensity",
    low: "Low",
    moderate: "Moderate",
    high: "High",
    gPerHour: "g/h recommended",
    totalLabel: "Total for the ride",
    grams: "g",
    zone0: "Under 45 min — water only; carbohydrates are not needed.",
    zone1:
      "45–75 min — small amounts or carbohydrate mouth rinsing is sufficient.",
    zone2:
      "1–2 h — a single carbohydrate type (glucose or maltodextrin) is enough. No need to mix.",
    zone3:
      "2–2.5 h — increase intake. Carbohydrate blends (glucose + fructose) start to offer an advantage.",
    zone4:
      "Over 2.5 h — use MULTIPLE TRANSPORT CARBOHYDRATES (glucose + fructose, ~2:1 ratio). The intestinal transporter SGLT1 saturates at ~60 g/h; adding fructose (GLUT5) enables oxidation rates up to 90 g/h.",
    chartTitle: "Cumulative intake over the ride",
    chartSeriesRec: "Recommended intake",
    chartSeriesRef: "Single-transporter limit (60 g/h)",
    chartAxisX: "Hour (h)",
    chartTooltipHour: "Hour",
    chartTooltipRec: "Recommended",
    chartTooltipRef: "Single limit",
    noIntake: "No carbohydrate intake needed",
    footnote:
      "Based on the Jeukendrup framework (Sports Medicine, 2014) and the ISSN consensus. Ranges reflect maximum oxidation rates studied in laboratory conditions; individual response varies. The gut can be trained to tolerate higher intakes with systematic practice.",
  },
} as const;

type Strings = (typeof STRINGS)["es"] | (typeof STRINGS)["en"];

// ─── Types ───────────────────────────────────────────────────────────────────

type Intensity = "low" | "moderate" | "high";
type ZoneKey = "zone0" | "zone1" | "zone2" | "zone3" | "zone4";

interface Recommendation {
  gPerHour: number;
  totalGrams: number;
  zoneKey: ZoneKey;
  needsMultipleTransport: boolean;
}

interface ChartPoint {
  hora: number;
  recomendado: number;
  limite60?: number;
}

// ─── Core logic (Jeukendrup / ISSN guidelines) ───────────────────────────────
//
// Duration zones and their g/h ranges [min, max]:
//   zone0  < 0.75 h  (< 45 min)     → [0,  0]
//   zone1  0.75–1.25 h (45–75 min)  → [0, 30]  — mouth rinse or small amounts
//   zone2  1.25–2 h   (1–2 h)       → [20, 40] — nominal ~30 g/h, single CHO
//   zone3  2–2.5 h                  → [50, 70] — nominal ~60 g/h
//   zone4  > 2.5 h                  → [65, 90] — multiple-transport required
//
// Intensity factor (low=0, moderate=0.5, high=1) interpolates within the range.

const ZONE_RANGES: Record<ZoneKey, [number, number]> = {
  zone0: [0, 0],
  zone1: [0, 30],
  zone2: [20, 40],
  zone3: [50, 70],
  zone4: [65, 90],
};

function intensityFactor(intensity: Intensity): number {
  if (intensity === "low") return 0;
  if (intensity === "moderate") return 0.5;
  return 1; // "high"
}

function getZone(duration: number): ZoneKey {
  if (duration < 0.75) return "zone0";
  if (duration < 1.25) return "zone1";
  if (duration <= 2) return "zone2";
  if (duration <= 2.5) return "zone3";
  return "zone4";
}

function getRecommendation(
  duration: number,
  intensity: Intensity
): Recommendation {
  const zoneKey = getZone(duration);
  const [min, max] = ZONE_RANGES[zoneKey];
  const factor = intensityFactor(intensity);
  const gPerHour = Math.round(min + (max - min) * factor);
  const totalGrams = Math.round(gPerHour * duration);
  const needsMultipleTransport = duration > 2.5;
  return { gPerHour, totalGrams, zoneKey, needsMultipleTransport };
}

// ─── Chart data ───────────────────────────────────────────────────────────────

function buildChartData(
  duration: number,
  gPerHour: number,
  showRef: boolean
): ChartPoint[] {
  const steps = Math.ceil(duration / 0.5);
  const first: ChartPoint = { hora: 0, recomendado: 0 };
  if (showRef) first.limite60 = 0;
  const points: ChartPoint[] = [first];

  for (let i = 1; i <= steps; i++) {
    const t = parseFloat(Math.min(i * 0.5, duration).toFixed(1));
    const point: ChartPoint = {
      hora: t,
      recomendado: Math.round(gPerHour * t),
    };
    if (showRef) {
      point.limite60 = Math.round(60 * t);
    }
    points.push(point);
  }
  return points;
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CarbTooltip(
  props: TooltipContentProps<ValueType, NameType> & { strings: Strings }
) {
  const { active, payload, label, strings } = props;
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-lg px-3 py-2 text-sm shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
      }}
    >
      <p className="mb-1 font-medium">
        {strings.chartTooltipHour}: {String(label)} {strings.durationUnit}
      </p>
      {payload.map((entry: TooltipPayloadEntry) => (
        <p
          key={String(entry.dataKey)}
          style={{ color: entry.color ?? "var(--color-text-secondary)" }}
        >
          {entry.dataKey === "recomendado"
            ? strings.chartTooltipRec
            : strings.chartTooltipRef}
          : {String(entry.value)} {strings.grams}
        </p>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CarbIntakeCalculator({
  color = "#0D9488",
}: {
  color?: string;
}) {
  const locale = useLocale();
  const s = STRINGS[locale];

  const [duration, setDuration] = useState<number>(2);
  const [intensity, setIntensity] = useState<Intensity>("moderate");

  const rec = useMemo(
    () => getRecommendation(duration, intensity),
    [duration, intensity]
  );

  // Show the single-transporter ceiling reference only when > 2.5 h
  const showRef = rec.needsMultipleTransport && rec.gPerHour > 0;

  const chartData = useMemo(
    () => buildChartData(duration, rec.gPerHour, showRef),
    [duration, rec.gPerHour, showRef]
  );

  // ─── Helpers ───

  function formatDuration(h: number): string {
    const totalMin = Math.round(h * 60);
    const hrs = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    if (hrs === 0) return `${mins} min`;
    if (mins === 0) return `${hrs} h`;
    return `${hrs} h ${mins} min`;
  }

  const intensityOptions: Array<{ value: Intensity; label: string }> = [
    { value: "low", label: s.low },
    { value: "moderate", label: s.moderate },
    { value: "high", label: s.high },
  ];

  const colorAlpha = (hex: string) => color + hex;

  // ─── Render ───

  return (
    <div
      className="not-prose rounded-lg border"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      {/* Header */}
      <div
        className="rounded-t-lg px-5 py-4"
        style={{ borderBottom: "1px solid var(--color-border-light)" }}
      >
        <h3
          className="text-base font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          {s.title}
        </h3>
      </div>

      <div className="p-5">
        {/* ── Inputs ── */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          {/* Duration slider */}
          <div>
            <div
              className="mb-2 flex items-center justify-between text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              <span>{s.durationLabel}</span>
              <span
                className="rounded px-2 py-0.5 text-sm font-semibold tabular-nums"
                style={{
                  backgroundColor: colorAlpha("22"),
                  color: color,
                }}
              >
                {formatDuration(duration)}
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={7}
              step={0.5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{ accentColor: color }}
            />
            <div
              className="mt-1 flex justify-between text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span>30 min</span>
              <span>7 h</span>
            </div>
          </div>

          {/* Intensity segmented control */}
          <div>
            <p
              className="mb-2 text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.intensityLabel}
            </p>
            <div
              className="flex overflow-hidden rounded-md border"
              style={{ borderColor: "var(--color-border)" }}
            >
              {intensityOptions.map(({ value, label }, idx) => {
                const isActive = intensity === value;
                const isLast = idx === intensityOptions.length - 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setIntensity(value)}
                    className="flex-1 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? color : "transparent",
                      color: isActive
                        ? "#ffffff"
                        : "var(--color-text-secondary)",
                      borderRight: isLast
                        ? "none"
                        : "1px solid var(--color-border)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Output card ── */}
        <div
          className="mb-6 rounded-lg p-4"
          style={{
            backgroundColor: colorAlpha("11"),
            border: `1px solid ${colorAlpha("44")}`,
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Primary: g/h */}
            <div className="flex-1">
              <p
                className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: color }}
              >
                {s.gPerHour}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-5xl font-bold tabular-nums leading-none"
                  style={{ color: color }}
                >
                  {rec.gPerHour}
                </span>
                <span
                  className="text-xl font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  g/h
                </span>
              </div>
            </div>

            {/* Separators */}
            <div
              className="hidden w-px self-stretch sm:block"
              style={{ backgroundColor: colorAlpha("33") }}
            />
            <div
              className="block h-px sm:hidden"
              style={{ backgroundColor: colorAlpha("33") }}
            />

            {/* Secondary: total grams */}
            <div className="flex-1">
              <p
                className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s.totalLabel}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-4xl font-bold tabular-nums leading-none"
                  style={{ color: "var(--color-text)" }}
                >
                  {rec.totalGrams}
                </span>
                <span
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {s.grams}
                </span>
              </div>
            </div>
          </div>

          {/* Zone description */}
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {s[rec.zoneKey]}
          </p>
        </div>

        {/* ── Chart ── */}
        <div
          className="mb-5 rounded-lg border px-2 pb-2 pt-4 sm:px-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="mb-3 px-2 text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {s.chartTitle}
          </p>

          {rec.gPerHour === 0 ? (
            <div
              className="flex h-32 items-center justify-center text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {s.noIntake}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 16, left: 0, bottom: 16 }}
              >
                <defs>
                  <linearGradient id="gradRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="gradRef" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#94a3b8"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="#94a3b8"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="hora"
                  tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                  stroke="var(--color-border)"
                  label={{
                    value: s.chartAxisX,
                    position: "insideBottom",
                    offset: -10,
                    fontSize: 11,
                    fill: "var(--color-text-muted)",
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
                  stroke="var(--color-border)"
                  unit=" g"
                  width={54}
                />
                <Tooltip
                  content={(props: TooltipContentProps<ValueType, NameType>) => (
                    <CarbTooltip {...props} strings={s} />
                  )}
                />
                {showRef && (
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    iconType="line"
                  />
                )}

                {/* Single-transporter ceiling: 60 g/h reference line */}
                {showRef && (
                  <Area
                    type="monotone"
                    dataKey="limite60"
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    fill="url(#gradRef)"
                    name={s.chartSeriesRef}
                    dot={false}
                    activeDot={false}
                    legendType="line"
                  />
                )}

                {/* Recommended intake */}
                <Area
                  type="monotone"
                  dataKey="recomendado"
                  stroke={color}
                  strokeWidth={2.5}
                  fill="url(#gradRec)"
                  name={s.chartSeriesRec}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: color,
                    stroke: "var(--color-bg-card)",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ── Footnote ── */}
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {s.footnote}
        </p>
      </div>
    </div>
  );
}
