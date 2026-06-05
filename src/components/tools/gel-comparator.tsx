"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useDictionary } from "@/components/locale-provider";
import { BuyButton } from "@/components/tools/buy-button";
import { resolveMarket } from "@/lib/datasets/resolve-market";
import {
  getAllGels,
  filterGels,
  computeGelMetrics,
  getUniqueBrands,
  getLastUpdated,
  DEFAULT_FILTERS,
  type GelProduct,
  type GelFilterState,
  type GelMetrics,
} from "@/lib/datasets/gels";
import { getToolById, toolHref } from "@/lib/tools";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Component-local strings not present in the shared dictionary.        */
/* Mirrors the pattern used by the existing calculators.               */
/* ------------------------------------------------------------------ */

const LOCAL_STRINGS = {
  es: {
    viewProduct: "Ver en web",
    resultsCount: (n: number) => `${n} ${n === 1 ? "gel" : "geles"}`,
    ctaCalc: "¿Cuántos geles necesitas? Calcula tu ingesta de carbohidratos",
    sortBy: "Ordenar por",
    none: "—",
    brandAll: "Todas",
  },
  en: {
    viewProduct: "View product",
    resultsCount: (n: number) => `${n} ${n === 1 ? "gel" : "gels"}`,
    ctaCalc: "How many gels do you need? Calculate your carbohydrate intake",
    sortBy: "Sort by",
    none: "—",
    brandAll: "All",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Sorting                                                             */
/* ------------------------------------------------------------------ */

type SortDir = "asc" | "desc";

/** Sortable column keys. `null` sortState = editorial order of GELS. */
type SortCol =
  | "carbs"
  | "ratio"
  | "sodium"
  | "caffeine"
  | "calories"
  | "costPerCarb"
  | "sodiumPerCarb";

interface SortState {
  col: SortCol;
  dir: SortDir;
}

interface Row {
  gel: GelProduct;
  metrics: GelMetrics;
}

/**
 * Numeric value for a row in a given column. Returns null for missing data so
 * the caller can push nulls to the end regardless of sort direction.
 */
function sortValue(row: Row, col: SortCol): number | null {
  switch (col) {
    case "carbs":
      return row.gel.carbs_g;
    case "ratio":
      return row.gel.glucose_fructose_ratio_num;
    case "sodium":
      return row.gel.sodium_mg;
    case "caffeine":
      return row.gel.caffeine_mg;
    case "calories":
      return row.gel.calories_kcal;
    case "costPerCarb":
      return row.metrics.cost_per_g_carb;
    case "sodiumPerCarb":
      return row.metrics.sodium_per_g_carb;
    default:
      return null;
  }
}

function sortRows(rows: Row[], sort: SortState | null): Row[] {
  if (!sort) return rows;
  const factor = sort.dir === "asc" ? 1 : -1;
  // Stable sort: decorate with original index as tie-breaker.
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => {
      const va = sortValue(a.row, sort.col);
      const vb = sortValue(b.row, sort.col);
      // Nulls always last, regardless of direction.
      if (va === null && vb === null) return a.i - b.i;
      if (va === null) return 1;
      if (vb === null) return -1;
      if (va !== vb) return (va - vb) * factor;
      return a.i - b.i;
    })
    .map((d) => d.row);
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

function fmtCostPerCarb(value: number | null, none: string): string {
  if (value === null) return none;
  // Cost per gram of carb is small; 3 decimals keeps SiS vs Maurten distinct.
  return value.toFixed(3);
}

function fmtSodiumPerCarb(value: number | null, none: string): string {
  if (value === null) return none;
  return value.toFixed(2);
}

function fmtOrNone(value: number | null | undefined, none: string): string {
  return value === null || value === undefined ? none : String(value);
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function GelComparatorTable({ color }: { color?: string }) {
  const locale = useLocale();
  const dict = useDictionary();
  const c = dict.comparator;
  const t = LOCAL_STRINGS[locale];
  const accent = color ?? "var(--color-nutricion)";

  const [filters, setFilters] = useState<GelFilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState | null>(null);

  const brands = useMemo(() => getUniqueBrands(), []);
  const lastUpdated = useMemo(() => getLastUpdated(), []);

  // Carb-intake calculator cross-link (locale-aware slug from TOOLS registry).
  const carbCalcHref = useMemo(() => {
    const tool = getToolById("carb-intake");
    return tool ? toolHref(tool, locale) : null;
  }, [locale]);

  const rows = useMemo<Row[]>(() => {
    const filtered = filterGels(getAllGels(), filters);
    const decorated = filtered.map((gel) => ({
      gel,
      metrics: computeGelMetrics(gel, resolveMarket(gel.markets, locale)),
    }));
    return sortRows(decorated, sort);
  }, [filters, sort, locale]);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters],
  );

  function toggleTri(current: boolean | null, value: boolean): boolean | null {
    // aria-pressed toggle: off → on(value) → off
    return current === value ? null : value;
  }

  function handleSort(col: SortCol) {
    setSort((prev) => {
      if (!prev || prev.col !== col) return { col, dir: "asc" };
      if (prev.dir === "asc") return { col, dir: "desc" };
      return null; // asc → desc → none
    });
  }

  function ariaSortFor(col: SortCol): "ascending" | "descending" | "none" {
    if (!sort || sort.col !== col) return "none";
    return sort.dir === "asc" ? "ascending" : "descending";
  }

  const colorAlpha = (alphaHex: string) => {
    if (color) return color + alphaHex;
    // Fallback sin prop color: preservar la transparencia traduciendo el alpha
    // hexadecimal (p.ej. "22") a porcentaje para color-mix sobre la CSS var.
    const pct = Math.round((parseInt(alphaHex, 16) / 255) * 100);
    return `color-mix(in srgb, var(--color-nutricion) ${pct}%, transparent)`;
  };

  return (
    <div className="space-y-6">
      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterToggle
            label={c.filterCaffeine}
            active={filters.withCaffeine === true}
            accent={accent}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                withCaffeine: toggleTri(f.withCaffeine, true),
              }))
            }
          />
          <FilterToggle
            label={c.filterNoCaffeine}
            active={filters.withCaffeine === false}
            accent={accent}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                withCaffeine: toggleTri(f.withCaffeine, false),
              }))
            }
          />
          <FilterToggle
            label={c.filterHighSodium}
            active={filters.highSodium === true}
            accent={accent}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                highSodium: toggleTri(f.highSodium, true),
              }))
            }
          />
          <FilterToggle
            label={c.filterVegan}
            active={filters.vegan === true}
            accent={accent}
            onClick={() =>
              setFilters((f) => ({ ...f, vegan: toggleTri(f.vegan, true) }))
            }
          />
          <FilterToggle
            label={c.filterGlutenFree}
            active={filters.glutenFree === true}
            accent={accent}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                glutenFree: toggleTri(f.glutenFree, true),
              }))
            }
          />
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          {/* Brand select */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {c.filterBrand}
            <select
              value={filters.brand}
              onChange={(e) =>
                setFilters((f) => ({ ...f, brand: e.target.value }))
              }
              className="min-w-[10rem] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              style={{ accentColor: accent }}
            >
              <option value="">{t.brandAll}</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          {/* Carbs range */}
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {c.filterCarbsMin}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={999}
              value={filters.carbsMin}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  carbsMin: clampCarb(e.target.value, 0),
                }))
              }
              className="w-20 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-[var(--color-text-secondary)]">
            {c.filterCarbsMax}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={999}
              value={filters.carbsMax}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  carbsMax: clampCarb(e.target.value, 999),
                }))
              }
              className="w-20 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm text-[var(--color-text)]"
            />
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            >
              {c.filterReset}
            </button>
          )}
        </div>
      </div>

      {/* ── Results count + last-updated badge ───────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium text-[var(--color-text)]">
          {t.resultsCount(rows.length)}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ backgroundColor: colorAlpha("22"), color: accent }}
        >
          {c.lastUpdated} {lastUpdated}
        </span>
      </div>

      {/* ── Table ────────────────────────────────────────────────── */}
      {rows.length === 0 ? (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
          <p className="text-[var(--color-text-muted)]">{c.noResults}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              {c.title}. {c.subtitle}
            </caption>
            <thead>
              <tr
                className="text-left"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <th
                  scope="col"
                  className="px-3 py-3 font-semibold text-[var(--color-text)]"
                >
                  {c.colBrand} / {c.colProduct}
                </th>
                <SortableTh
                  label={c.colCarbs}
                  col="carbs"
                  sort={sort}
                  ariaSort={ariaSortFor("carbs")}
                  onSort={handleSort}
                  accent={accent}
                />
                <SortableTh
                  label={c.colRatio}
                  col="ratio"
                  sort={sort}
                  ariaSort={ariaSortFor("ratio")}
                  onSort={handleSort}
                  accent={accent}
                  className="hidden sm:table-cell"
                />
                <SortableTh
                  label={c.colSodium}
                  col="sodium"
                  sort={sort}
                  ariaSort={ariaSortFor("sodium")}
                  onSort={handleSort}
                  accent={accent}
                  className="hidden sm:table-cell"
                />
                <SortableTh
                  label={c.colCaffeine}
                  col="caffeine"
                  sort={sort}
                  ariaSort={ariaSortFor("caffeine")}
                  onSort={handleSort}
                  accent={accent}
                  className="hidden lg:table-cell"
                />
                <SortableTh
                  label={c.colCalories}
                  col="calories"
                  sort={sort}
                  ariaSort={ariaSortFor("calories")}
                  onSort={handleSort}
                  accent={accent}
                  className="hidden lg:table-cell"
                />
                {/* Star column — subtle section-colored background. */}
                <SortableTh
                  label={c.colCostPerCarb}
                  col="costPerCarb"
                  sort={sort}
                  ariaSort={ariaSortFor("costPerCarb")}
                  onSort={handleSort}
                  accent={accent}
                  star
                  starBg={colorAlpha("11")}
                />
                <SortableTh
                  label={c.colSodiumPerCarb}
                  col="sodiumPerCarb"
                  sort={sort}
                  ariaSort={ariaSortFor("sodiumPerCarb")}
                  onSort={handleSort}
                  accent={accent}
                  className="hidden lg:table-cell"
                />
                <th
                  scope="col"
                  className="px-3 py-3 font-semibold text-[var(--color-text)]"
                >
                  {c.colBuy}
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3 font-semibold text-[var(--color-text)] sm:table-cell"
                >
                  {c.sourceLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ gel, metrics }) => (
                <tr
                  key={gel.id}
                  className="align-top"
                  style={{ borderTop: "1px solid var(--color-border-light)" }}
                >
                  {/* Brand + product (merged on mobile) */}
                  <th
                    scope="row"
                    className="px-3 py-3 text-left font-normal"
                  >
                    <span className="block font-semibold text-[var(--color-text)]">
                      {gel.brand}
                    </span>
                    <span className="block text-xs text-[var(--color-text-secondary)]">
                      {gel.product_name}
                    </span>
                    <span className="block text-xs text-[var(--color-text-muted)]">
                      {gel.variant[locale]}
                    </span>
                  </th>

                  <td className="px-3 py-3 tabular-nums text-[var(--color-text)]">
                    {gel.carbs_g}
                  </td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--color-text-secondary)] sm:table-cell">
                    {gel.glucose_fructose_ratio ?? t.none}
                  </td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--color-text-secondary)] sm:table-cell">
                    {gel.sodium_mg}
                  </td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {gel.caffeine_mg}
                  </td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {fmtOrNone(gel.calories_kcal, t.none)}
                  </td>
                  {/* Star cell */}
                  <td
                    className="px-3 py-3 font-semibold tabular-nums text-[var(--color-text)]"
                    style={{ backgroundColor: colorAlpha("0D") }}
                  >
                    {fmtCostPerCarb(metrics.cost_per_g_carb, t.none)}
                  </td>
                  <td className="hidden px-3 py-3 tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {fmtSodiumPerCarb(metrics.sodium_per_g_carb, t.none)}
                  </td>

                  <td className="px-3 py-3">
                    <BuyButton
                      markets={gel.markets}
                      locale={locale}
                      label={c.colBuy}
                      priceRef={c.priceRef}
                      noMarketFallbackUrl={gel.source_url}
                      noMarketLabel={t.viewProduct}
                      productName={`${gel.brand} ${gel.product_name}`}
                      color={accent}
                    />
                  </td>

                  {/* Source citation */}
                  <td className="hidden px-3 py-3 text-xs sm:table-cell">
                    <a
                      href={gel.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-muted)] underline decoration-dotted underline-offset-2 hover:text-[var(--color-text-secondary)]"
                    >
                      {c.sourceLabel}
                    </a>
                    <span className="block text-[var(--color-text-muted)]">
                      {c.priceRef} {gel.last_verified}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Cross-CTA to the carb-intake calculator ──────────────── */}
      {/* Methodology + affiliate disclosure are rendered once at the route   */}
      {/* level (see (marketing)/herramientas|tools/[tool]/page.tsx) to avoid */}
      {/* duplicate banners; here we only surface the carb-calc cross-link.   */}
      {carbCalcHref && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
          <Link
            href={carbCalcHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: accent }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaCalc}
          </Link>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function clampCarb(raw: string, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(999, Math.max(0, Math.round(n)));
}

function FilterToggle({
  label,
  active,
  accent,
  onClick,
}: {
  label: string;
  active: boolean;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "text-white"
          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-light)]",
      )}
      style={
        active
          ? { backgroundColor: accent, borderColor: accent }
          : undefined
      }
    >
      {label}
    </button>
  );
}

function SortableTh({
  label,
  col,
  sort,
  ariaSort,
  onSort,
  accent,
  className,
  star = false,
  starBg,
}: {
  label: string;
  col: SortCol;
  sort: SortState | null;
  ariaSort: "ascending" | "descending" | "none";
  onSort: (col: SortCol) => void;
  accent: string;
  className?: string;
  star?: boolean;
  starBg?: string;
}) {
  const isActive = sort?.col === col;
  const arrow = !isActive ? "↕" : sort.dir === "asc" ? "↑" : "↓";
  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cn("px-3 py-3 font-semibold text-[var(--color-text)]", className)}
      style={star && starBg ? { backgroundColor: starBg } : undefined}
    >
      <button
        type="button"
        onClick={() => onSort(col)}
        className="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:opacity-80"
        style={isActive ? { color: accent } : undefined}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            "text-xs",
            isActive ? "" : "text-[var(--color-text-muted)]",
          )}
        >
          {arrow}
        </span>
      </button>
    </th>
  );
}
