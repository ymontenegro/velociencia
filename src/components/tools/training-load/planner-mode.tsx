"use client";

import { useState, useMemo, type CSSProperties } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import { runEwma, getTsbBand, type TsbBand } from "@/lib/training/pmc";
import { PmcChart } from "@/components/tools/training-load/pmc-chart";
import {
  RangeField,
  ReadoutPanel,
  Readout,
  mixAlpha,
} from "@/components/tools/ui";

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

/** One data point per day for the chart. */
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
  fresh: "#0891B2", // cyan — fresh
  race:  "#16A34A", // green — race ready
  train: "#D97706", // amber — productive training
  over:  "#DC2626", // red — overload
};

const ATL_COLOR = "#E11D48"; // rose — fatigue (shared with pmc-chart)

// ─── ToggleRow — no color prop, reads --tool-accent from ToolPanel context ────

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
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
          style={{
            backgroundColor: checked ? "var(--tool-accent)" : "var(--color-border)",
          }}
        />
        <div
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: checked ? "translateX(16px)" : "translateX(2px)" }}
        />
      </div>
      <span className="text-sm leading-snug text-[var(--color-text-secondary)]">
        {label}
      </span>
    </label>
  );
}

// ─── Planner mode (manual simulation) ─────────────────────────────────────────

export default function PlannerMode({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: {
  accent?: string;
  accentVar?: string;
}) {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale] as Strings;

  // ── State ──
  const [dailyTss, setDailyTss]     = useState<number>(60);
  const [weeks, setWeeks]           = useState<number>(12);
  const [ctlInitial, setCtlInitial] = useState<number>(40);
  const [taper, setTaper]           = useState<boolean>(false);
  const [restDay, setRestDay]       = useState<boolean>(true);

  // ── Simulation (shared EWMA module — logic unchanged) ──
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

  // ─── Render (inner content only — ToolPanel + header come from the container) ──

  return (
    <div className="p-5 sm:p-7">
      {/* ── Inputs ── */}
      <div className="mb-6 grid gap-5 sm:grid-cols-2">
        <RangeField
          id="planner-tss"
          label={s.tssLabel}
          value={dailyTss}
          onChange={setDailyTss}
          min={0}
          max={150}
          step={5}
          display={`${dailyTss} ${s.tssSuffix}`}
          minLabel={`0 ${s.tssSuffix}`}
          maxLabel={`150 ${s.tssSuffix}`}
        />
        <RangeField
          id="planner-weeks"
          label={s.weeksLabel}
          value={weeks}
          onChange={setWeeks}
          min={4}
          max={24}
          step={1}
          display={`${weeks} ${s.weeksSuffix}`}
          minLabel={`4 ${s.weeksSuffix}`}
          maxLabel={`24 ${s.weeksSuffix}`}
        />
        <RangeField
          id="planner-ctl-init"
          label={s.ctlInitLabel}
          value={ctlInitial}
          onChange={setCtlInitial}
          min={0}
          max={100}
          step={5}
          display={`${ctlInitial} ${s.tssSuffix}`}
          minLabel={`0 ${s.tssSuffix}`}
          maxLabel={`100 ${s.tssSuffix}`}
        />
        <div className="flex flex-col gap-4 pt-1">
          <ToggleRow label={s.taperLabel} checked={taper} onChange={setTaper} />
          <ToggleRow label={s.restDayLabel} checked={restDay} onChange={setRestDay} />
        </div>
      </div>

      {/* ── Performance Management Chart ── */}
      <div className="mb-5">
        <PmcChart
          data={chartData}
          xKey="day"
          xType="number"
          xDomain={[1, weeks * 7]}
          xTicks={xTicks}
          xTickFormatter={(d) => `${s.semPrefix}${Math.ceil(Number(d) / 7)}`}
          tooltipLabelFormatter={(d) =>
            `${s.axisWeek} ${Math.ceil(Number(d) / 7)} · ${s.semPrefix}${d}`
          }
          color={accent}
          accentVar={accentVar}
          labels={{ fitness: s.fitnessLabel, fatigue: s.fatigueLabel, form: s.formLabel }}
        />
      </div>

      {/* ── Final CTL / ATL / TSB readouts ── */}
      <ReadoutPanel className="mb-5">
        <p className="mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {s.finalValues}
        </p>
        <div className="grid grid-cols-3 gap-4">
          {/* CTL — uses the section accent (--tool-accent) */}
          <Readout
            label={s.fitnessLabel}
            value={finalCtl.toFixed(1)}
            primary={true}
            animateKey={finalCtl}
          />
          {/* ATL — override --tool-accent locally so Readout uses the fatigue rose */}
          <div style={{ "--tool-accent": ATL_COLOR } as CSSProperties}>
            <Readout
              label={s.fatigueLabel}
              value={finalAtl.toFixed(1)}
              primary={true}
              animateKey={finalAtl}
            />
          </div>
          {/* TSB — override --tool-accent with the TSB band color */}
          <div style={{ "--tool-accent": tsbColor } as CSSProperties}>
            <Readout
              label={s.formLabel}
              value={`${finalTsb >= 0 ? "+" : ""}${finalTsb.toFixed(1)}`}
              primary={true}
              animateKey={finalTsb}
            />
          </div>
        </div>

        {/* TSB band interpretation */}
        <div
          className="mt-4 rounded-md px-3 py-2.5 text-sm leading-snug"
          style={{
            backgroundColor: mixAlpha(tsbColor, 8),
            borderLeft: `3px solid ${tsbColor}`,
          }}
        >
          <span className="font-semibold" style={{ color: tsbColor }}>
            {s.tsbInterpTitle}:{" "}
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {getTsbText(tsbBand, s)}
          </span>
        </div>
      </ReadoutPanel>

      {/* ── Footnote ── */}
      <p className="border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </div>
  );
}
