"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

// ─── i18n ─────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
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
  /** Width of this segment in the chart (upper visual cap for the last band). */
  chartWidth: number;
}

// Visual max caps the open-ended last category on the chart X axis.
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

function getVisualMax(gender: Gender): number {
  return gender === "m" ? VISUAL_MAX_MEN : VISUAL_MAX_WOMEN;
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

/** Build a single-row data object for the stacked horizontal BarChart. */
function buildChartRow(gender: Gender): Record<string, number | string> {
  const cats = getCategories(gender);
  const row: Record<string, number | string> = { row: "gauge" };
  for (const cat of cats) row[cat.key] = cat.chartWidth;
  return row;
}

/** Parse a positive finite number from a raw string; returns 0 on failure. */
function parsePositive(raw: string): number {
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ─── SVG marker label (recharts injects viewBox via cloneElement) ─────────────

interface MarkerLabelProps {
  /** Injected by recharts at clone time. */
  viewBox?: { x: number; y: number; width: number; height: number };
  value: number;
  color: string;
}

function UserMarkerLabel({ viewBox, value, color }: MarkerLabelProps) {
  if (!viewBox) return null;
  const { x, y } = viewBox;
  const text = value.toFixed(1);
  const boxW = 44;
  const boxH = 18;
  const arrowH = 6;

  return (
    <g>
      {/* Background pill */}
      <rect
        x={x - boxW / 2}
        y={y - boxH - arrowH}
        width={boxW}
        height={boxH}
        rx={4}
        fill={color}
      />
      {/* Downward arrow connecting pill to the reference line */}
      <polygon
        points={`${x - 5},${y - arrowH} ${x + 5},${y - arrowH} ${x},${y}`}
        fill={color}
      />
      {/* Value label */}
      <text
        x={x}
        y={y - arrowH - boxH / 2 + 5}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={10}
        fontWeight="700"
      >
        {text}
      </text>
    </g>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Vo2maxEstimatorCalculator({
  color = "#7C3AED",
}: {
  color?: string;
}) {
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
  const chartData = useMemo(() => [buildChartRow(gender)], [gender]);
  const categories = useMemo(() => getCategories(gender), [gender]);
  const visualMax = getVisualMax(gender);
  const refX = result ? Math.min(result.relative, visualMax) : 0;
  const xTicks = useMemo(
    () => categories.map((c) => c.lowerBound).concat([visualMax]),
    [categories, visualMax],
  );

  const isValid = result !== null;

  // ── Shared input styling ──────────────────────────────────────────────────
  const inputBaseClass =
    "w-full rounded-md border px-3 py-2 text-sm tabular-nums outline-none";
  const inputBaseStyle: React.CSSProperties = {
    borderColor: "var(--color-border)",
    backgroundColor: "var(--color-bg-card)",
    color: "var(--color-text)",
  };

  return (
    <div
      className="not-prose rounded-lg border"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
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
        {/* ── Inputs ──────────────────────────────────────────────────────── */}
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          {/* Wmax / FTP block */}
          <div className="sm:col-span-2">
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.wmaxLabel}
            </label>
            <input
              type="number"
              min={1}
              max={3000}
              step={1}
              value={
                ftpMode && derivedWmax > 0 ? String(derivedWmax) : wmaxStr
              }
              readOnly={ftpMode && derivedWmax > 0}
              onChange={(e) => {
                if (!ftpMode) setWmaxStr(e.target.value);
              }}
              className={inputBaseClass}
              style={{
                ...inputBaseStyle,
                opacity: ftpMode && derivedWmax > 0 ? 0.65 : 1,
              }}
              onFocus={(e) => {
                if (!ftpMode) e.currentTarget.style.borderColor = color;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />

            {/* FTP toggle link */}
            <button
              type="button"
              onClick={() => {
                setFtpMode((v) => !v);
                setFtpStr("");
              }}
              className="mt-1.5 text-xs underline-offset-2 hover:underline"
              style={{ color }}
            >
              {s.ftpToggle}
            </button>

            {/* FTP helper panel (collapsible) */}
            {ftpMode && (
              <div
                className="mt-2.5 rounded-md p-3"
                style={{
                  backgroundColor: color + "0f",
                  border: `1px solid ${color}33`,
                }}
              >
                <p
                  className="mb-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {s.ftpNote}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <label
                    className="whitespace-nowrap text-xs font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {s.ftpLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    step={1}
                    placeholder="ej. 225"
                    value={ftpStr}
                    onChange={(e) => setFtpStr(e.target.value)}
                    className="w-24 rounded-md border px-2 py-1 text-xs tabular-nums outline-none"
                    style={inputBaseStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = color)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border)")
                    }
                  />
                  {derivedWmax > 0 && (
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color }}
                    >
                      {s.wmaxFromFtp} {derivedWmax} W
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.weightLabel}
            </label>
            <input
              type="number"
              min={1}
              max={300}
              step={0.1}
              value={weightStr}
              onChange={(e) => setWeightStr(e.target.value)}
              className={inputBaseClass}
              style={inputBaseStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = color)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border)")
              }
            />
          </div>

          {/* Age */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.ageLabel}
            </label>
            <input
              type="number"
              min={10}
              max={100}
              step={1}
              value={ageStr}
              onChange={(e) => setAgeStr(e.target.value)}
              className={inputBaseClass}
              style={inputBaseStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = color)}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border)")
              }
            />
          </div>

          {/* Sex */}
          <div className="sm:col-span-2">
            <p
              className="mb-1.5 text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.genderLabel}
            </p>
            <div
              className="flex overflow-hidden rounded-md border"
              style={{ borderColor: "var(--color-border)" }}
            >
              {(["m", "f"] as Gender[]).map((g, i) => {
                const isActive = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className="flex-1 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? color : "transparent",
                      color: isActive
                        ? "#fff"
                        : "var(--color-text-secondary)",
                      borderRight:
                        i === 0
                          ? "1px solid var(--color-border)"
                          : "none",
                    }}
                  >
                    {g === "m" ? s.male : s.female}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Result card ─────────────────────────────────────────────────── */}
        {isValid && result ? (
          <div
            className="mb-6 rounded-lg p-4"
            style={{
              backgroundColor: color + "11",
              border: `1px solid ${color}44`,
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Relative VO₂max — primary result */}
              <div className="flex-1">
                <p
                  className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                  style={{ color }}
                >
                  {s.relativeLabel}
                </p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-bold tabular-nums leading-none"
                    style={{ color }}
                  >
                    {result.relative.toFixed(1)}
                  </span>
                  <span
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {s.relativeUnit}
                  </span>
                </div>
                <p
                  className="mt-1.5 text-sm tabular-nums"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {s.absoluteLabel}:{" "}
                  <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    {result.absoluteLMin.toFixed(2)} {s.absoluteUnit}
                  </span>
                </p>
              </div>

              {/* Vertical divider */}
              <div
                className="hidden w-px self-stretch sm:block"
                style={{ backgroundColor: color + "33" }}
              />

              {/* Classification */}
              {category && (
                <div className="flex-1">
                  <p
                    className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {s.categoryLabel}
                  </p>
                  <p
                    className="text-2xl font-bold leading-tight"
                    style={{ color: "var(--color-text)" }}
                  >
                    {category.label[locale]}
                  </p>
                  <p
                    className="mt-0.5 text-sm tabular-nums"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {category.range[locale]}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {s.categoryNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="mb-6 rounded-lg p-4 text-sm"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
          >
            {s.invalidInput}
          </div>
        )}

        {/* ── Gauge chart ──────────────────────────────────────────────────── */}
        <div
          className="mb-5 rounded-lg border px-4 pb-4 pt-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="mb-3 text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {s.chartTitle}
          </p>

          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 32, right: 12, left: 0, bottom: 4 }}
            >
              {/* Single-row Y axis — hidden */}
              <YAxis type="category" dataKey="row" hide width={0} />

              {/* X axis with category boundary ticks */}
              <XAxis
                type="number"
                domain={[0, visualMax]}
                ticks={xTicks}
                tickFormatter={(v: number) =>
                  Number.isInteger(v) ? String(v) : v.toFixed(0)
                }
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
                tickLine={false}
              />

              {/* Stacked bars — one segment per VO₂max category */}
              {categories.map((cat, i) => (
                <Bar
                  key={cat.key}
                  dataKey={cat.key}
                  stackId="gauge"
                  fill={CATEGORY_COLORS[i]}
                  isAnimationActive={false}
                  radius={
                    i === 0
                      ? [4, 0, 0, 4]
                      : i === categories.length - 1
                        ? [0, 4, 4, 0]
                        : [0, 0, 0, 0]
                  }
                />
              ))}

              {/* User position marker */}
              {isValid && result && (
                <ReferenceLine
                  x={refX}
                  stroke={color}
                  strokeWidth={2.5}
                  label={
                    <UserMarkerLabel value={result.relative} color={color} />
                  }
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Category legend ──────────────────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
          {categories.map((cat, i) => (
            <div key={cat.key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                style={{ backgroundColor: CATEGORY_COLORS[i] }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {cat.label[locale]}
              </span>
            </div>
          ))}
        </div>

        {/* ── Footnote ────────────────────────────────────────────────────── */}
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
