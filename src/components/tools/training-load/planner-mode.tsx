"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import { runEwma, getTsbBand, type TsbBand } from "@/lib/training/pmc";
import { PmcChart } from "@/components/tools/training-load/pmc-chart";

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
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

/** One data point per day for the chart.
 *  A `type` alias (not an `interface`) so it stays assignable to the
 *  `Record<string, unknown>` that PmcChart's `data` prop intersects. */
type ChartPoint = {
  day: number; // 1-indexed day number
  ctl: number; // Chronic Training Load (Fitness)
  atl: number; // Acute Training Load (Fatigue)
  tsb: number; // Training Stress Balance (Form)
};

// ─── Daily TSS series builder ─────────────────────────────────────────────────
//
// For each day t (1-indexed up to weeks*7):
//   TSS base = dailyTss
//   if taper and t > totalDays − 14 → tss = dailyTss * 0.5
//   if restDayPerWeek and t % 7 === 0 → tss = 0
//
// Then runEwma(dailyTssArray, ctlInitial) seeds ATL_0 = CTL_0 = ctlInitial.

function buildDailyTss(
  dailyTss: number,
  weeks: number,
  taper: boolean,
  restDayPerWeek: boolean,
): number[] {
  const totalDays = weeks * 7;
  const taperStart = totalDays - 14; // first day of the 2-week taper window

  const series: number[] = [];

  for (let t = 1; t <= totalDays; t++) {
    let tss = dailyTss;

    if (taper && t > taperStart) {
      tss = dailyTss * 0.5;
    }

    // Rest day is the 7th day of every week (t mod 7 === 0)
    if (restDayPerWeek && t % 7 === 0) {
      tss = 0;
    }

    series.push(tss);
  }

  return series;
}

// ─── TSB band helpers ─────────────────────────────────────────────────────────

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

// ─── Planner mode (manual simulation) ─────────────────────────────────────────

export default function PlannerMode({
  color = "#0891B2",
}: {
  color?: string;
}): React.ReactElement {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale] as Strings;

  // ── State ──
  const [dailyTss, setDailyTss]     = useState<number>(60);
  const [weeks, setWeeks]           = useState<number>(12);
  const [ctlInitial, setCtlInitial] = useState<number>(40);
  const [taper, setTaper]           = useState<boolean>(false);
  const [restDay, setRestDay]       = useState<boolean>(true);

  // ── Simulation (shared EWMA module) ──
  const chartData = useMemo<ChartPoint[]>(() => {
    const dailyTssArray = buildDailyTss(dailyTss, weeks, taper, restDay);
    const points = runEwma(dailyTssArray, ctlInitial); // seedAtl defaults to ctlInitial
    return points.map((p, i) => ({
      day: i + 1,
      ctl: p.ctl,
      atl: p.atl,
      tsb: p.tsb,
    }));
  }, [dailyTss, weeks, ctlInitial, taper, restDay]);

  // ── Derived final values ──
  const { finalCtl, finalAtl, finalTsb } = useMemo(() => {
    const last = chartData.at(-1);
    if (!last) return { finalCtl: ctlInitial, finalAtl: ctlInitial, finalTsb: 0 };
    return { finalCtl: last.ctl, finalAtl: last.atl, finalTsb: last.tsb };
  }, [chartData, ctlInitial]);

  const tsbBand  = getTsbBand(finalTsb);
  const tsbColor = TSB_BAND_COLOR[tsbBand];

  // ── X-axis ticks: one per week ──
  const xTicks = useMemo(
    () => Array.from({ length: weeks }, (_, i) => (i + 1) * 7),
    [weeks],
  );

  // ─── Render (inner content only — container provides card + header) ──────────

  return (
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

      {/* ── Performance Management Chart (PmcChart provides its own card) ── */}
      <div className="mb-5">
        <PmcChart
          data={chartData}
          xKey="day"
          xType="number"
          xDomain={[1, weeks * 7]}
          xTicks={xTicks}
          xTickFormatter={(d) => `${s.semPrefix}${Math.ceil(Number(d) / 7)}`}
          tooltipLabelFormatter={(d) => `${s.axisWeek} ${Math.ceil(Number(d) / 7)} · ${s.semPrefix}${d}`}
          color={color}
          labels={{ fitness: s.fitnessLabel, fatigue: s.fatigueLabel, form: s.formLabel }}
        />
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
  );
}
