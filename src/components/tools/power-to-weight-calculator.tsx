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

// ─── i18n ────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
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
  /** Width of this segment in the chart (upper visual cap for last category). */
  chartWidth: number;
}

// Visual max for the chart's X axis (caps the unbounded last category).
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

function getVisualMax(gender: Gender): number {
  return gender === "m" ? VISUAL_MAX_MEN : VISUAL_MAX_WOMEN;
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

/** Build a single-row data object for the stacked BarChart. */
function buildChartRow(gender: Gender): Record<string, number | string> {
  const cats = getCategories(gender);
  const row: Record<string, number | string> = { row: "profile" };
  for (const cat of cats) {
    row[cat.key] = cat.chartWidth;
  }
  return row;
}

// ─── Custom reference-line label (recharts clones this, injecting viewBox) ───

interface MarkerLabelProps {
  /** Injected by recharts at clone time. */
  viewBox?: { x: number; y: number; width: number; height: number };
  wkg: number;
  color: string;
}

function UserMarkerLabel({ viewBox, wkg, color }: MarkerLabelProps) {
  if (!viewBox) return null;
  const { x, y } = viewBox;
  const text = `${wkg.toFixed(2)}`;
  const boxW = 42;
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
      {/* Downward-pointing arrow connecting pill to line */}
      <polygon
        points={`${x - 5},${y - arrowH} ${x + 5},${y - arrowH} ${x},${y}`}
        fill={color}
      />
      {/* Value text */}
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

// ─── X-axis tick formatter ─────────────────────────────────────────────────────

function fmtTick(v: number): string {
  // Show one decimal only when not a whole number
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PowerToWeightCalculator({
  color = "#7C3AED",
}: {
  color?: string;
}) {
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

  const chartData = useMemo(() => [buildChartRow(gender)], [gender]);

  const categories = useMemo(() => getCategories(gender), [gender]);
  const visualMax = getVisualMax(gender);

  // Clamp the reference line position so it stays within the visual range
  const refX = Math.min(wkg, visualMax);

  // X-axis boundary ticks
  const xTicks = useMemo(
    () => categories.map((c) => c.lowerBound).concat([visualMax]),
    [categories, visualMax]
  );

  const isValid = wkg > 0;

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
        {/* ── Inputs ─────────────────────────────────────────────────────── */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {/* Power */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {s.powerLabel}
            </label>
            <input
              type="number"
              min={1}
              max={3000}
              step={1}
              value={powerStr}
              onChange={(e) => setPowerStr(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm tabular-nums outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
                color: "var(--color-text)",
              }}
              onFocus={(e) => (e.target.style.borderColor = color)}
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--color-border)")
              }
            />
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
              className="w-full rounded-md border px-3 py-2 text-sm tabular-nums outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
                color: "var(--color-text)",
              }}
              onFocus={(e) => (e.target.style.borderColor = color)}
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--color-border)")
              }
            />
          </div>

          {/* Gender */}
          <div>
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
                        i === 0 ? "1px solid var(--color-border)" : "none",
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
        {isValid ? (
          <div
            className="mb-6 rounded-lg p-4"
            style={{
              backgroundColor: color + "11",
              border: `1px solid ${color}44`,
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Big number */}
              <div className="flex-1">
                <p
                  className="mb-0.5 text-xs font-medium uppercase tracking-wide"
                  style={{ color: color }}
                >
                  {s.resultUnit}
                </p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-bold tabular-nums leading-none"
                    style={{ color: color }}
                  >
                    {wkg.toFixed(2)}
                  </span>
                  <span
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    W/kg
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="hidden w-px self-stretch sm:block"
                style={{ backgroundColor: color + "33" }}
              />

              {/* Category */}
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

        {/* ── Chart ───────────────────────────────────────────────────────── */}
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
              margin={{ top: 28, right: 12, left: 0, bottom: 4 }}
            >
              {/* Hidden Y axis (only one row) */}
              <YAxis type="category" dataKey="row" hide width={0} />

              {/* X axis with category boundary ticks */}
              <XAxis
                type="number"
                domain={[0, visualMax]}
                ticks={xTicks}
                tickFormatter={fmtTick}
                tick={{ fontSize: 11, fill: "var(--color-text-muted)" }}
                stroke="var(--color-border)"
                tickLine={false}
              />

              {/* Stacked bars: one segment per Coggan category */}
              {categories.map((cat, i) => (
                <Bar
                  key={cat.key}
                  dataKey={cat.key}
                  stackId="profile"
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
              {isValid && (
                <ReferenceLine
                  x={refX}
                  stroke={color}
                  strokeWidth={2.5}
                  label={
                    <UserMarkerLabel
                      wkg={wkg}
                      color={color}
                    />
                  }
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Category legend ─────────────────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
          {categories.map((cat, i) => (
            <div key={cat.key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm flex-shrink-0"
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
