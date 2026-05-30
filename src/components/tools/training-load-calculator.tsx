"use client";

import { useState, useMemo } from "react";
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
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { TooltipPayloadEntry } from "recharts/types/state/tooltipSlice";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

// ─── EWMA constants (Banister impulse–response, Zatsiorsky/TrainingPeaks) ───
//   α = 1 − e^(−1/τ)   where τ is the time constant in days

const ALPHA_CTL = 1 - Math.exp(-1 / 42); // ≈ 0.02338  — 42-day fitness constant
const ALPHA_ATL = 1 - Math.exp(-1 / 7);  // ≈ 0.13212  — 7-day fatigue constant

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    title: "Gestión de carga de entrenamiento (PMC)",
    subtitle: "CTL · ATL · TSB — Modelo de impulso-respuesta",
    tssLabel: "TSS diario promedio",
    weeksLabel: "Duración del plan",
    ctlInitLabel: "CTL inicial (fitness base)",
    taperLabel: "Afinamiento final — TSS ×0.5 en las últimas 2 semanas",
    restDayLabel: "Descanso semanal — 1 día sin carga por semana (TSS = 0)",
    fitnessLabel: "Fitness (CTL)",
    fatigueLabel: "Fatiga (ATL)",
    formLabel: "Forma (TSB)",
    axisWeek: "Semana",
    finalValues: "Valores al final del período",
    tsbInterpTitle: "Interpretación del TSB final",
    tsbFresh:
      "Fresco / descargado — forma punta. Si se mantiene mucho tiempo puede haber pérdida de fitness.",
    tsbRace:
      "Forma de competición — equilibrio óptimo entre fitness y fatiga.",
    tsbTrain:
      "Entrenamiento productivo — fatiga funcional, estímulo de adaptación normal.",
    tsbOver:
      "Fatiga acumulada alta — riesgo de sobreentrenamiento. Considerar reducir carga o añadir descanso.",
    tssSuffix: "TSS",
    weeksSuffix: "sem.",
    semPrefix: "S",
    footnote:
      "Modelo orientativo de impulso-respuesta (Banister, 1991). Los valores de CTL, ATL y TSB son estimaciones relativas; el TSS debe calcularse a partir de salidas reales con potencia o frecuencia cardíaca. La respuesta individual al entrenamiento varía de forma significativa.",
  },
  en: {
    title: "Training Load Management (PMC)",
    subtitle: "CTL · ATL · TSB — Impulse–response model",
    tssLabel: "Average daily TSS",
    weeksLabel: "Plan duration",
    ctlInitLabel: "Starting CTL (fitness base)",
    taperLabel: "Taper — TSS ×0.5 in the last 2 weeks",
    restDayLabel: "Weekly rest — 1 day off per week (TSS = 0)",
    fitnessLabel: "Fitness (CTL)",
    fatigueLabel: "Fatigue (ATL)",
    formLabel: "Form (TSB)",
    axisWeek: "Week",
    finalValues: "End-of-period values",
    tsbInterpTitle: "Final TSB interpretation",
    tsbFresh:
      "Fresh / unloaded — peak form. If sustained too long, fitness loss may occur.",
    tsbRace:
      "Race form — optimal balance between fitness and fatigue.",
    tsbTrain:
      "Productive training — functional fatigue, normal adaptation stimulus.",
    tsbOver:
      "High accumulated fatigue — overtraining risk. Consider reducing load or adding rest days.",
    tssSuffix: "TSS",
    weeksSuffix: "wk.",
    semPrefix: "W",
    footnote:
      "Indicative impulse–response model (Banister, 1991). CTL, ATL, and TSB are relative estimates; TSS should be derived from real rides using power or heart rate data. Individual training response varies considerably.",
  },
} as const;

type Strings = (typeof STRINGS)["es"];

// ─── Types ───────────────────────────────────────────────────────────────────

/** One data point per day in the simulation */
interface PmcPoint {
  day: number;   // 1-indexed day number
  ctl: number;   // Chronic Training Load (Fitness)
  atl: number;   // Acute Training Load (Fatigue)
  tsb: number;   // Training Stress Balance (Form) = CTL_{t-1} − ATL_{t-1}
  tss: number;   // Training Stress Score applied that day
}

type TsbBand = "fresh" | "race" | "train" | "over";

// ─── Simulation ───────────────────────────────────────────────────────────────
//
// For each day t (starting at t=1):
//   TSB_t = CTL_{t-1} − ATL_{t-1}                  (form at start of day)
//   CTL_t = CTL_{t-1} + α_ctl × (TSS_t − CTL_{t-1})
//   ATL_t = ATL_{t-1} + α_atl × (TSS_t − ATL_{t-1})
//
// Seed: CTL_0 = ctlInitial;  ATL_0 = CTL_0

function simulatePmc(
  dailyTss: number,
  weeks: number,
  ctlInitial: number,
  taper: boolean,
  restDayPerWeek: boolean,
): PmcPoint[] {
  const totalDays = weeks * 7;
  const taperStart = totalDays - 14; // first day of the 2-week taper window

  let ctlPrev = ctlInitial;
  let atlPrev = ctlInitial; // ATL_0 = CTL_0

  const points: PmcPoint[] = [];

  for (let t = 1; t <= totalDays; t++) {
    // Resolve today's TSS
    let tss = dailyTss;

    if (taper && t > taperStart) {
      tss = dailyTss * 0.5;
    }

    // Rest day is the 7th day of every week (t mod 7 === 0)
    if (restDayPerWeek && t % 7 === 0) {
      tss = 0;
    }

    // TSB uses the PREVIOUS day's CTL and ATL (before today's load is applied)
    const tsb = ctlPrev - atlPrev;

    // EWMA update
    const ctl = ctlPrev + ALPHA_CTL * (tss - ctlPrev);
    const atl = atlPrev + ALPHA_ATL * (tss - atlPrev);

    points.push({
      day: t,
      ctl: Math.round(ctl * 10) / 10,
      atl: Math.round(atl * 10) / 10,
      tsb: Math.round(tsb * 10) / 10,
      tss,
    });

    ctlPrev = ctl;
    atlPrev = atl;
  }

  return points;
}

// ─── TSB band helpers ─────────────────────────────────────────────────────────

function getTsbBand(tsb: number): TsbBand {
  if (tsb > 5) return "fresh";
  if (tsb >= -10) return "race";
  if (tsb >= -30) return "train";
  return "over";
}

function getTsbText(band: TsbBand, s: Strings): string {
  switch (band) {
    case "fresh": return s.tsbFresh;
    case "race":  return s.tsbRace;
    case "train": return s.tsbTrain;
    case "over":  return s.tsbOver;
  }
}

const TSB_BAND_COLOR: Record<TsbBand, string> = {
  fresh: "#0891B2",  // cyan — fresh
  race:  "#16A34A",  // green — race ready
  train: "#D97706",  // amber — productive training
  over:  "#DC2626",  // red — overload
};

// ─── Chart colors ─────────────────────────────────────────────────────────────

const ATL_COLOR = "#E11D48";  // rose — fatigue
const TSB_COLOR = "#7C3AED";  // violet — form

// ─── Slider row (outside component to avoid React hook closure issues) ────────

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  color: string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, suffix, color, onChange }: SliderRowProps) {
  return (
    <div>
      <div
        className="mb-2 flex items-center justify-between text-sm font-medium"
        style={{ color: "var(--color-text)" }}
      >
        <span>{label}</span>
        <span
          className="rounded px-2 py-0.5 text-sm font-semibold tabular-nums"
          style={{ backgroundColor: color + "22", color }}
        >
          {value} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
        style={{ accentColor: color }}
      />
      <div
        className="mt-1 flex justify-between text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        <span>{min} {suffix}</span>
        <span>{max} {suffix}</span>
      </div>
    </div>
  );
}

// ─── Toggle row (outside component) ──────────────────────────────────────────

interface ToggleRowProps {
  label: string;
  checked: boolean;
  color: string;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, checked, color, onChange }: ToggleRowProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      {/* Hidden native checkbox for a11y */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {/* Custom track */}
      <div className="relative mt-0.5 flex-shrink-0">
        <div
          className="h-5 w-9 rounded-full transition-colors duration-200"
          style={{ backgroundColor: checked ? color : "var(--color-border)" }}
        />
        <div
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: checked ? "translateX(16px)" : "translateX(2px)" }}
        />
      </div>
      <span className="text-sm leading-snug" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </span>
    </label>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

interface PmcTooltipProps extends TooltipContentProps<ValueType, NameType> {
  s: Strings;
  ctlColor: string;
  semPrefix: string;
}

function PmcTooltip({ active, payload, label, s, semPrefix }: PmcTooltipProps) {
  if (!active || !payload?.length) return null;

  const day = typeof label === "number" ? label : Number(label);
  const week = Math.ceil(day / 7);

  return (
    <div
      className="rounded-lg px-3 py-2 text-sm shadow-md"
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text)",
        minWidth: 160,
      }}
    >
      <p
        className="mb-1.5 font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-text-muted)", fontSize: 10 }}
      >
        {s.axisWeek} {week} · {semPrefix}{day}
      </p>
      {payload.map((entry: TooltipPayloadEntry) => {
        const labelText =
          entry.dataKey === "ctl"
            ? s.fitnessLabel
            : entry.dataKey === "atl"
            ? s.fatigueLabel
            : s.formLabel;
        const val = typeof entry.value === "number" ? entry.value.toFixed(1) : String(entry.value);
        return (
          <p
            key={String(entry.dataKey)}
            className="flex items-center justify-between gap-4"
            style={{ color: entry.color ?? "var(--color-text-secondary)" }}
          >
            <span>{labelText}</span>
            <span className="font-medium tabular-nums">{val}</span>
          </p>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TrainingLoadCalculator({
  color = "#0891B2",
}: {
  color?: string;
}) {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale] as Strings;

  // ── State ──
  const [dailyTss, setDailyTss]       = useState<number>(60);
  const [weeks, setWeeks]             = useState<number>(12);
  const [ctlInitial, setCtlInitial]   = useState<number>(40);
  const [taper, setTaper]             = useState<boolean>(false);
  const [restDay, setRestDay]         = useState<boolean>(true);

  // ── Simulation ──
  const pmcData = useMemo<PmcPoint[]>(
    () => simulatePmc(dailyTss, weeks, ctlInitial, taper, restDay),
    [dailyTss, weeks, ctlInitial, taper, restDay],
  );

  // ── Derived final values ──
  const { finalCtl, finalAtl, finalTsb } = useMemo(() => {
    const last = pmcData.at(-1);
    if (!last) return { finalCtl: ctlInitial, finalAtl: ctlInitial, finalTsb: 0 };
    return { finalCtl: last.ctl, finalAtl: last.atl, finalTsb: last.tsb };
  }, [pmcData, ctlInitial]);

  const tsbBand  = getTsbBand(finalTsb);
  const tsbColor = TSB_BAND_COLOR[tsbBand];

  // ── X-axis ticks: one per week ──
  const xTicks = useMemo(
    () => Array.from({ length: weeks }, (_, i) => (i + 1) * 7),
    [weeks],
  );

  // ── Tooltip renderer (stable reference) ──
  const renderTooltip = useMemo(
    () => (props: TooltipContentProps<ValueType, NameType>) => (
      <PmcTooltip {...props} s={s} ctlColor={color} semPrefix={s.semPrefix} />
    ),
    [s, color],
  );

  // ─── Render ───────────────────────────────────────────────────────────────

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
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
          {s.title}
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {s.subtitle}
        </p>
      </div>

      <div className="p-5">
        {/* ── Inputs ── */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <SliderRow
            label={s.tssLabel}
            value={dailyTss}
            min={0}
            max={150}
            step={5}
            suffix={s.tssSuffix}
            color={color}
            onChange={setDailyTss}
          />
          <SliderRow
            label={s.weeksLabel}
            value={weeks}
            min={4}
            max={24}
            step={1}
            suffix={s.weeksSuffix}
            color={color}
            onChange={setWeeks}
          />
          <SliderRow
            label={s.ctlInitLabel}
            value={ctlInitial}
            min={0}
            max={100}
            step={5}
            suffix={s.tssSuffix}
            color={color}
            onChange={setCtlInitial}
          />
          <div className="flex flex-col gap-4 pt-1">
            <ToggleRow
              label={s.taperLabel}
              checked={taper}
              color={color}
              onChange={setTaper}
            />
            <ToggleRow
              label={s.restDayLabel}
              checked={restDay}
              color={color}
              onChange={setRestDay}
            />
          </div>
        </div>

        {/* ── Performance Management Chart ── */}
        <div
          className="mb-5 rounded-lg border px-2 pb-2 pt-4 sm:px-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <ResponsiveContainer width="100%" height={340}>
            <LineChart
              data={pmcData}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
              />
              <XAxis
                dataKey="day"
                type="number"
                domain={[1, weeks * 7]}
                ticks={xTicks}
                tickFormatter={(d: number) => `${s.semPrefix}${Math.ceil(d / 7)}`}
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
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
              <Tooltip content={renderTooltip} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
                iconType="line"
              />

              {/* CTL — Fitness (acent color, thicker) */}
              <Line
                type="monotone"
                dataKey="ctl"
                name={s.fitnessLabel}
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: "var(--color-bg-card)",
                  strokeWidth: 2,
                }}
              />

              {/* ATL — Fatigue */}
              <Line
                type="monotone"
                dataKey="atl"
                name={s.fatigueLabel}
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
                name={s.formLabel}
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

        {/* ── Final values ── */}
        <div
          className="mb-5 rounded-lg p-4"
          style={{
            backgroundColor: color + "11",
            border: `1px solid ${color}44`,
          }}
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-text-muted)" }}
          >
            {s.finalValues}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {/* CTL */}
            <div>
              <p
                className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color }}
              >
                {s.fitnessLabel}
              </p>
              <p
                className="text-3xl font-bold tabular-nums leading-none"
                style={{ color }}
              >
                {finalCtl.toFixed(1)}
              </p>
            </div>

            {/* ATL */}
            <div>
              <p
                className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: ATL_COLOR }}
              >
                {s.fatigueLabel}
              </p>
              <p
                className="text-3xl font-bold tabular-nums leading-none"
                style={{ color: ATL_COLOR }}
              >
                {finalAtl.toFixed(1)}
              </p>
            </div>

            {/* TSB */}
            <div>
              <p
                className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: tsbColor }}
              >
                {s.formLabel}
              </p>
              <p
                className="text-3xl font-bold tabular-nums leading-none"
                style={{ color: tsbColor }}
              >
                {finalTsb >= 0 ? "+" : ""}
                {finalTsb.toFixed(1)}
              </p>
            </div>
          </div>

          {/* TSB band interpretation */}
          <div
            className="mt-4 rounded-md px-3 py-2.5 text-sm leading-snug"
            style={{
              backgroundColor: tsbColor + "14",
              borderLeft: `3px solid ${tsbColor}`,
            }}
          >
            <span className="font-semibold" style={{ color: tsbColor }}>
              {s.tsbInterpTitle}:{" "}
            </span>
            <span style={{ color: "var(--color-text-secondary)" }}>
              {getTsbText(tsbBand, s)}
            </span>
          </div>
        </div>

        {/* ── Footnote ── */}
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {s.footnote}
        </p>
      </div>
    </div>
  );
}
