"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import {
  ToolPanel,
  NumberField,
  Segmented,
  Readout,
  ReadoutPanel,
  GaugeBar,
  GaugeLegend,
  accentAlpha,
} from "@/components/tools/ui";

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    eyebrow: "Ciencia · Calculadora",
    title: "Calculadora de relación potencia-peso",
    powerLabel: "Potencia / FTP (vatios)",
    weightLabel: "Peso corporal (kg)",
    genderLabel: "Sexo",
    male: "Hombre",
    female: "Mujer",
    resultUnit: "W/kg",
    categoryLabel: "Categoría",
    rangeLabel: "Rango",
    yourValue: "Tu valor",
    chartTitle: "Perfil de potencia de Coggan (umbral — estimación)",
    footnote:
      "Estimación basada en el perfil de potencia de Coggan a umbral funcional (FTP). Los valores reales varían según la duración del esfuerzo, la metodología de test utilizada y las características individuales del deportista.",
    invalidInput: "Ingresa valores válidos para calcular.",
  },
  en: {
    eyebrow: "Science · Calculator",
    title: "Power-to-Weight Calculator",
    powerLabel: "Power / FTP (watts)",
    weightLabel: "Body weight (kg)",
    genderLabel: "Sex",
    male: "Male",
    female: "Female",
    resultUnit: "W/kg",
    categoryLabel: "Category",
    rangeLabel: "Range",
    yourValue: "Your value",
    chartTitle: "Coggan Power Profile (threshold — estimate)",
    footnote:
      "Estimate based on the Coggan functional threshold power profile. Actual values vary with effort duration, testing methodology, and individual athlete characteristics.",
    invalidInput: "Enter valid values to calculate.",
  },
} as const;

// ─── Coggan thresholds ────────────────────────────────────────────────────────
//
// Men:   < 2.0 · 2.0–2.9 · 3.0–3.9 · 4.0–4.9 · 5.0–5.9 · ≥ 6.0
// Women: < 1.8 · 1.8–2.6 · 2.7–3.5 · 3.6–4.4 · 4.5–5.4 · ≥ 5.5
//
// Classification uses the lower bound of the NEXT category as the exclusive
// upper bound for each category (i.e., boundary at 3.0 for men's "trained",
// even though the display range reads "3.0–3.9").

interface Category {
  key: string;
  label: Record<Locale, string>;
  range: Record<Locale, string>;
  /** Inclusive lower bound (W/kg). First category lower = 0. */
  lowerBound: number;
  /** Exclusive upper bound for classification; Infinity for the last category. */
  upperBound: number;
  /** Width of this segment in the gauge (upper visual cap for last category). */
  chartWidth: number;
}

// Visual max for the gauge X axis (caps the unbounded last category).
const VISUAL_MAX_MEN = 7.0;
const VISUAL_MAX_WOMEN = 6.5;

const CATEGORIES_MEN: Category[] = [
  {
    key: "cat0",
    label: { es: "Principiante", en: "Untrained" },
    range: { es: "< 2,0 W/kg", en: "< 2.0 W/kg" },
    lowerBound: 0,
    upperBound: 2.0,
    chartWidth: 2.0,
  },
  {
    key: "cat1",
    label: { es: "Recreativo", en: "Fair" },
    range: { es: "2,0 – 2,9 W/kg", en: "2.0 – 2.9 W/kg" },
    lowerBound: 2.0,
    upperBound: 3.0,
    chartWidth: 1.0,
  },
  {
    key: "cat2",
    label: { es: "Entrenado", en: "Good" },
    range: { es: "3,0 – 3,9 W/kg", en: "3.0 – 3.9 W/kg" },
    lowerBound: 3.0,
    upperBound: 4.0,
    chartWidth: 1.0,
  },
  {
    key: "cat3",
    label: { es: "Muy bueno", en: "Very good" },
    range: { es: "4,0 – 4,9 W/kg", en: "4.0 – 4.9 W/kg" },
    lowerBound: 4.0,
    upperBound: 5.0,
    chartWidth: 1.0,
  },
  {
    key: "cat4",
    label: { es: "Excelente", en: "Excellent" },
    range: { es: "5,0 – 5,9 W/kg", en: "5.0 – 5.9 W/kg" },
    lowerBound: 5.0,
    upperBound: 6.0,
    chartWidth: 1.0,
  },
  {
    key: "cat5",
    label: { es: "Nivel profesional", en: "World class" },
    range: { es: "≥ 6,0 W/kg", en: "≥ 6.0 W/kg" },
    lowerBound: 6.0,
    upperBound: Infinity,
    chartWidth: VISUAL_MAX_MEN - 6.0,
  },
];

const CATEGORIES_WOMEN: Category[] = [
  {
    key: "cat0",
    label: { es: "Principiante", en: "Untrained" },
    range: { es: "< 1,8 W/kg", en: "< 1.8 W/kg" },
    lowerBound: 0,
    upperBound: 1.8,
    chartWidth: 1.8,
  },
  {
    key: "cat1",
    label: { es: "Recreativo", en: "Fair" },
    range: { es: "1,8 – 2,6 W/kg", en: "1.8 – 2.6 W/kg" },
    lowerBound: 1.8,
    upperBound: 2.7,
    chartWidth: 0.9,
  },
  {
    key: "cat2",
    label: { es: "Entrenado", en: "Good" },
    range: { es: "2,7 – 3,5 W/kg", en: "2.7 – 3.5 W/kg" },
    lowerBound: 2.7,
    upperBound: 3.6,
    chartWidth: 0.9,
  },
  {
    key: "cat3",
    label: { es: "Muy bueno", en: "Very good" },
    range: { es: "3,6 – 4,4 W/kg", en: "3.6 – 4.4 W/kg" },
    lowerBound: 3.6,
    upperBound: 4.5,
    chartWidth: 0.9,
  },
  {
    key: "cat4",
    label: { es: "Excelente", en: "Excellent" },
    range: { es: "4,5 – 5,4 W/kg", en: "4.5 – 5.4 W/kg" },
    lowerBound: 4.5,
    upperBound: 5.5,
    chartWidth: 1.0,
  },
  {
    key: "cat5",
    label: { es: "Nivel profesional", en: "World class" },
    range: { es: "≥ 5,5 W/kg", en: "≥ 5.5 W/kg" },
    lowerBound: 5.5,
    upperBound: Infinity,
    chartWidth: VISUAL_MAX_WOMEN - 5.5,
  },
];

// Colors: muted → saturated, light → intense, ending at a fixed purple for
// the professional tier regardless of accent color.
const CATEGORY_COLORS = [
  "#CBD5E1", // slate-300  — untrained
  "#93C5FD", // blue-300   — fair/recreational
  "#6EE7B7", // emerald-300 — trained
  "#FCD34D", // amber-300  — very good
  "#F97316", // orange-500 — excellent
  "#A855F7", // purple-500 — world class / professional
];

// ─── Logic ────────────────────────────────────────────────────────────────────

type Gender = "m" | "f";

function getCategories(gender: Gender): Category[] {
  return gender === "m" ? CATEGORIES_MEN : CATEGORIES_WOMEN;
}

/** Returns the category the given W/kg falls into, or undefined if wkg ≤ 0. */
function classifyWkg(wkg: number, gender: Gender): Category | undefined {
  if (wkg <= 0) return undefined;
  const cats = getCategories(gender);
  // Iterate in reverse to find the highest matching lower bound
  for (let i = cats.length - 1; i >= 0; i--) {
    if (wkg >= cats[i].lowerBound) return cats[i];
  }
  return cats[0];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PowerToWeightCalculator({
  accent = "#7C3AED",
  accentVar = "--color-ciencia",
}: ToolComponentProps) {
  const locale = useLocale();
  const s = STRINGS[locale];

  const [powerStr, setPowerStr] = useState<string>("250");
  const [weightStr, setWeightStr] = useState<string>("70");
  const [gender, setGender] = useState<Gender>("m");

  // Parse & clamp inputs
  const power = useMemo(() => {
    const n = parseFloat(powerStr);
    if (!isFinite(n) || n <= 0) return 0;
    return Math.min(n, 3000);
  }, [powerStr]);

  const weight = useMemo(() => {
    const n = parseFloat(weightStr);
    if (!isFinite(n) || n <= 0) return 0;
    return Math.min(n, 300);
  }, [weightStr]);

  const wkg = useMemo(() => {
    if (power <= 0 || weight <= 0) return 0;
    return power / weight;
  }, [power, weight]);

  const category = useMemo(() => classifyWkg(wkg, gender), [wkg, gender]);
  const categories = useMemo(() => getCategories(gender), [gender]);
  const isValid = wkg > 0;

  // Gauge segments derived from the Coggan category table (locale-aware labels)
  const gaugeSegments = useMemo(
    () =>
      categories.map((cat, i) => ({
        label: cat.label[locale],
        width: cat.chartWidth,
        color: CATEGORY_COLORS[i],
      })),
    [categories, locale],
  );

  // Index of the active category band in the gauge legend (-1 = none)
  const activeIndex = useMemo(
    () => (category ? categories.findIndex((c) => c.key === category.key) : -1),
    [category, categories],
  );

  const genderOptions: Array<{ value: Gender; label: string }> = [
    { value: "m", label: s.male },
    { value: "f", label: s.female },
  ];

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={s.title}
    >
      {/* ── Inputs ── */}
      <div className="grid gap-6 sm:grid-cols-3">
        <NumberField
          id="ptw-power"
          label={s.powerLabel}
          value={powerStr}
          onChange={setPowerStr}
          min={1}
          max={3000}
          step={1}
          unit="W"
        />
        <NumberField
          id="ptw-weight"
          label={s.weightLabel}
          value={weightStr}
          onChange={setWeightStr}
          min={1}
          max={300}
          step={0.1}
          unit="kg"
        />
        <Segmented
          label={s.genderLabel}
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />
      </div>

      {/* ── Readout ── */}
      <ReadoutPanel className="mt-6">
        {isValid && category ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <Readout
              label={s.resultUnit}
              value={wkg.toFixed(2)}
              unit="W/kg"
              animateKey={wkg}
            />
            <div
              className="hidden w-px self-stretch sm:block"
              style={{ backgroundColor: accentAlpha(22) }}
            />
            <div
              className="block h-px sm:hidden"
              style={{ backgroundColor: accentAlpha(22) }}
            />
            <Readout
              label={s.categoryLabel}
              value={category.label[locale]}
              sub={category.range[locale]}
              primary={false}
            />
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            {s.invalidInput}
          </p>
        )}
      </ReadoutPanel>

      {/* ── Gauge ── */}
      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-text)_2%,var(--color-bg-card))] px-4 pb-5 pt-4">
        <p className="mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {s.chartTitle}
        </p>
        <GaugeBar
          segments={gaugeSegments}
          value={wkg}
          valueLabel={wkg.toFixed(2)}
          showMarker={isValid}
        />
        <GaugeLegend
          segments={gaugeSegments}
          activeIndex={activeIndex}
          className="mt-5"
        />
      </div>

      {/* ── Footnote ── */}
      <p className="mt-5 border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </ToolPanel>
  );
}
