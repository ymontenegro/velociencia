"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import {
  ToolPanel,
  NumberField,
  Segmented,
  FilterChip,
  Readout,
  ReadoutPanel,
  GaugeBar,
  GaugeLegend,
  accentAlpha,
  accentSurface,
} from "@/components/tools/ui";

// ─── i18n ─────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    eyebrow: "Ciencia · Calculadora",
    title: "Estimador de VO₂máx",
    wmaxLabel: "Potencia aeróbica máxima — Wmax (vatios)",
    weightLabel: "Peso corporal (kg)",
    ageLabel: "Edad (años)",
    genderLabel: "Sexo",
    male: "Hombre",
    female: "Mujer",
    ftpToggle: "Calcular Wmax desde mi FTP",
    ftpLabel: "FTP (vatios)",
    ftpNote:
      "Wmax ≈ FTP ÷ 0,75 — el FTP representa aproximadamente el 72–77 % de la potencia aeróbica máxima.",
    wmaxFromFtp: "→ Wmax estimado:",
    relativeLabel: "VO₂máx relativo",
    absoluteLabel: "VO₂máx absoluto",
    relativeUnit: "ml/kg/min",
    absoluteUnit: "L/min",
    categoryLabel: "Clasificación",
    categoryNote: "Las normas varían con la edad. Estimación orientativa.",
    chartTitle: "Escala de VO₂máx — referencia por categorías",
    invalidInput: "Ingresa valores válidos para calcular.",
    footnote:
      "Estimación mediante la regresión de Storer et al. (1990) en cicloergómetro. El VO₂máx real requiere análisis de gases en laboratorio; el resultado depende del protocolo de rampa utilizado.",
  },
  en: {
    eyebrow: "Science · Calculator",
    title: "VO₂max Estimator",
    wmaxLabel: "Peak aerobic power — Wmax (watts)",
    weightLabel: "Body weight (kg)",
    ageLabel: "Age (years)",
    genderLabel: "Sex",
    male: "Male",
    female: "Female",
    ftpToggle: "Calculate Wmax from my FTP",
    ftpLabel: "FTP (watts)",
    ftpNote:
      "Wmax ≈ FTP ÷ 0.75 — FTP represents approximately 72–77% of peak aerobic power.",
    wmaxFromFtp: "→ Estimated Wmax:",
    relativeLabel: "Relative VO₂max",
    absoluteLabel: "Absolute VO₂max",
    relativeUnit: "ml/kg/min",
    absoluteUnit: "L/min",
    categoryLabel: "Classification",
    categoryNote: "Norms vary with age. Indicative estimate.",
    chartTitle: "VO₂max scale — category reference",
    invalidInput: "Enter valid values to calculate.",
    footnote:
      "Estimate using the Storer et al. (1990) cycle ergometer regression. True VO₂max requires laboratory gas analysis; Wmax depends on the ramp protocol used.",
  },
} as const;

// ─── Category bands ───────────────────────────────────────────────────────────
//
// Approximate population norms (ml/kg/min). Boundaries are deliberately
// rounded — actual norms shift considerably with age and measurement protocol.
//
// Men:   < 35 · 35–42 · 42–52 · 52–60 · ≥ 60
// Women: < 28 · 28–36 · 36–44 · 44–52 · ≥ 52

interface Category {
  key: string;
  label: Record<Locale, string>;
  range: Record<Locale, string>;
  /** Inclusive lower bound (ml/kg/min). First category lower = 0. */
  lowerBound: number;
  /** Exclusive upper bound for classification; Infinity for the last band. */
  upperBound: number;
  /** Width of this segment in the gauge (upper visual cap for the last band). */
  chartWidth: number;
}

// Visual max caps the open-ended last category on the gauge X axis.
const VISUAL_MAX_MEN = 75;   // ml/kg/min
const VISUAL_MAX_WOMEN = 65; // ml/kg/min

const CATEGORIES_MEN: Category[] = [
  {
    key: "cat0",
    label: { es: "Bajo", en: "Low" },
    range: { es: "< 35 ml/kg/min", en: "< 35 ml/kg/min" },
    lowerBound: 0,
    upperBound: 35,
    chartWidth: 35,
  },
  {
    key: "cat1",
    label: { es: "Medio", en: "Average" },
    range: { es: "35 – 42 ml/kg/min", en: "35 – 42 ml/kg/min" },
    lowerBound: 35,
    upperBound: 42,
    chartWidth: 7,
  },
  {
    key: "cat2",
    label: { es: "Bueno", en: "Good" },
    range: { es: "42 – 52 ml/kg/min", en: "42 – 52 ml/kg/min" },
    lowerBound: 42,
    upperBound: 52,
    chartWidth: 10,
  },
  {
    key: "cat3",
    label: { es: "Excelente", en: "Excellent" },
    range: { es: "52 – 60 ml/kg/min", en: "52 – 60 ml/kg/min" },
    lowerBound: 52,
    upperBound: 60,
    chartWidth: 8,
  },
  {
    key: "cat4",
    label: { es: "Élite", en: "Elite" },
    range: { es: "≥ 60 ml/kg/min", en: "≥ 60 ml/kg/min" },
    lowerBound: 60,
    upperBound: Infinity,
    chartWidth: VISUAL_MAX_MEN - 60, // 15
  },
];

const CATEGORIES_WOMEN: Category[] = [
  {
    key: "cat0",
    label: { es: "Bajo", en: "Low" },
    range: { es: "< 28 ml/kg/min", en: "< 28 ml/kg/min" },
    lowerBound: 0,
    upperBound: 28,
    chartWidth: 28,
  },
  {
    key: "cat1",
    label: { es: "Medio", en: "Average" },
    range: { es: "28 – 36 ml/kg/min", en: "28 – 36 ml/kg/min" },
    lowerBound: 28,
    upperBound: 36,
    chartWidth: 8,
  },
  {
    key: "cat2",
    label: { es: "Bueno", en: "Good" },
    range: { es: "36 – 44 ml/kg/min", en: "36 – 44 ml/kg/min" },
    lowerBound: 36,
    upperBound: 44,
    chartWidth: 8,
  },
  {
    key: "cat3",
    label: { es: "Excelente", en: "Excellent" },
    range: { es: "44 – 52 ml/kg/min", en: "44 – 52 ml/kg/min" },
    lowerBound: 44,
    upperBound: 52,
    chartWidth: 8,
  },
  {
    key: "cat4",
    label: { es: "Élite", en: "Elite" },
    range: { es: "≥ 52 ml/kg/min", en: "≥ 52 ml/kg/min" },
    lowerBound: 52,
    upperBound: Infinity,
    chartWidth: VISUAL_MAX_WOMEN - 52, // 13
  },
];

// Muted → saturated color ramp, ending in purple for the elite band.
const CATEGORY_COLORS = [
  "#CBD5E1", // slate-300   — bajo/low
  "#93C5FD", // blue-300    — medio/average
  "#6EE7B7", // emerald-300 — bueno/good
  "#FCD34D", // amber-300   — excelente/excellent
  "#A855F7", // purple-500  — élite/elite
];

// ─── Types & pure logic ───────────────────────────────────────────────────────

type Gender = "m" | "f";

interface Vo2Result {
  absoluteMlMin: number;
  absoluteLMin: number;
  /** VO₂max relative (ml/kg/min) — the primary output. */
  relative: number;
}

function getCategories(gender: Gender): Category[] {
  return gender === "m" ? CATEGORIES_MEN : CATEGORIES_WOMEN;
}

/**
 * Storer et al. (1990) — cycle ergometer VO₂max regression.
 *
 * Men:   VO₂max (ml/min) = 10.51 × Wmax + 6.35 × kg − 10.49 × age + 519.3
 * Women: VO₂max (ml/min) =  9.39 × Wmax + 7.70 × kg −  5.88 × age + 136.7
 *
 * Returns null when any input is non-positive or the result is physiologically
 * implausible (≤ 0 ml/min).
 */
function computeVo2(
  wmax: number,
  weight: number,
  age: number,
  gender: Gender,
): Vo2Result | null {
  if (wmax <= 0 || weight <= 0 || age <= 0) return null;

  const absoluteMlMin =
    gender === "m"
      ? 10.51 * wmax + 6.35 * weight - 10.49 * age + 519.3
      : 9.39 * wmax + 7.7 * weight - 5.88 * age + 136.7;

  if (!Number.isFinite(absoluteMlMin) || absoluteMlMin <= 0) return null;

  return {
    absoluteMlMin,
    absoluteLMin: absoluteMlMin / 1000,
    relative: absoluteMlMin / weight,
  };
}

/** Returns the category the given VO₂max falls into. */
function classifyVo2(relative: number, gender: Gender): Category | undefined {
  if (relative <= 0) return undefined;
  const cats = getCategories(gender);
  for (let i = cats.length - 1; i >= 0; i--) {
    if (relative >= cats[i].lowerBound) return cats[i];
  }
  return cats[0];
}

/** Parse a positive finite number from a raw string; returns 0 on failure. */
function parsePositive(raw: string): number {
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Vo2maxEstimatorCalculator({
  accent = "#7C3AED",
  accentVar = "--color-ciencia",
}: ToolComponentProps) {
  const locale = useLocale();
  const s = STRINGS[locale];

  // ── State ─────────────────────────────────────────────────────────────────
  const [wmaxStr, setWmaxStr] = useState<string>("300");
  const [weightStr, setWeightStr] = useState<string>("70");
  const [ageStr, setAgeStr] = useState<string>("35");
  const [gender, setGender] = useState<Gender>("m");
  const [ftpMode, setFtpMode] = useState<boolean>(false);
  const [ftpStr, setFtpStr] = useState<string>("");

  // ── FTP → Wmax helper ─────────────────────────────────────────────────────
  // FTP ≈ 72–77% of Wmax, so Wmax ≈ FTP / 0.75.
  const derivedWmax = useMemo<number>(() => {
    if (!ftpMode) return 0;
    const ftp = parsePositive(ftpStr);
    return ftp > 0 ? Math.round(ftp / 0.75) : 0;
  }, [ftpMode, ftpStr]);

  // ── Parsed inputs ─────────────────────────────────────────────────────────
  const effectiveWmax = useMemo<number>(() => {
    if (ftpMode && derivedWmax > 0) return derivedWmax;
    return Math.min(parsePositive(wmaxStr), 3000);
  }, [ftpMode, derivedWmax, wmaxStr]);

  const weight = useMemo<number>(
    () => Math.min(parsePositive(weightStr), 300),
    [weightStr],
  );

  const age = useMemo<number>(
    () => Math.min(parsePositive(ageStr), 120),
    [ageStr],
  );

  // ── VO₂max ────────────────────────────────────────────────────────────────
  const result = useMemo<Vo2Result | null>(
    () => computeVo2(effectiveWmax, weight, age, gender),
    [effectiveWmax, weight, age, gender],
  );

  const category = useMemo<Category | undefined>(
    () => (result ? classifyVo2(result.relative, gender) : undefined),
    [result, gender],
  );

  // ── Chart data ─────────────────────────────────────────────────────────────
  const categories = useMemo(() => getCategories(gender), [gender]);
  const isValid = result !== null;

  // Gauge segments derived from VO₂max category table (locale-aware labels)
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
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Wmax / FTP block — full width */}
        <div className="sm:col-span-2">
          <NumberField
            id="vo2-wmax"
            label={s.wmaxLabel}
            value={ftpMode && derivedWmax > 0 ? String(derivedWmax) : wmaxStr}
            onChange={(v) => {
              if (!ftpMode) setWmaxStr(v);
            }}
            min={1}
            max={3000}
            step={1}
            unit="W"
            readOnly={ftpMode && derivedWmax > 0}
          />

          {/* FTP mode toggle */}
          <div className="mt-2.5">
            <FilterChip
              label={s.ftpToggle}
              active={ftpMode}
              onClick={() => {
                setFtpMode((v) => !v);
                setFtpStr("");
              }}
            />
          </div>

          {/* FTP helper panel (shown when toggle is active) */}
          {ftpMode && (
            <div
              className="mt-3 rounded-lg p-4"
              style={{
                backgroundColor: accentSurface(6),
                border: `1px solid ${accentAlpha(20)}`,
              }}
            >
              <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {s.ftpNote}
              </p>
              <div className="flex flex-wrap items-end gap-3">
                <NumberField
                  id="vo2-ftp"
                  label={s.ftpLabel}
                  value={ftpStr}
                  onChange={setFtpStr}
                  min={1}
                  max={2000}
                  step={1}
                  unit="W"
                  placeholder="ej. 225"
                  className="w-44"
                />
                {derivedWmax > 0 && (
                  <p
                    className="pb-2.5 font-mono text-xs font-semibold tabular-nums"
                    style={{ color: "var(--tool-accent)" }}
                  >
                    {s.wmaxFromFtp} {derivedWmax} W
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <NumberField
          id="vo2-weight"
          label={s.weightLabel}
          value={weightStr}
          onChange={setWeightStr}
          min={1}
          max={300}
          step={0.1}
          unit="kg"
        />

        {/* Age */}
        <NumberField
          id="vo2-age"
          label={s.ageLabel}
          value={ageStr}
          onChange={setAgeStr}
          min={10}
          max={100}
          step={1}
          unit="yr"
        />

        {/* Sex — full width */}
        <Segmented
          label={s.genderLabel}
          options={genderOptions}
          value={gender}
          onChange={setGender}
          className="sm:col-span-2"
        />
      </div>

      {/* ── Readout ── */}
      <ReadoutPanel className="mt-6">
        {isValid && result ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <Readout
              label={s.relativeLabel}
              value={result.relative.toFixed(1)}
              unit={s.relativeUnit}
              animateKey={result.relative}
              sub={
                <>
                  {s.absoluteLabel}:{" "}
                  <span className="font-mono font-medium tabular-nums text-[var(--color-text-secondary)]">
                    {result.absoluteLMin.toFixed(2)} {s.absoluteUnit}
                  </span>
                </>
              }
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
              value={category ? category.label[locale] : "—"}
              primary={false}
              sub={
                category ? (
                  <>
                    <span className="block font-mono tabular-nums">
                      {category.range[locale]}
                    </span>
                    <span className="mt-0.5 block text-xs">
                      {s.categoryNote}
                    </span>
                  </>
                ) : undefined
              }
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
          value={result ? result.relative : 0}
          valueLabel={result ? result.relative.toFixed(1) : "0"}
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
