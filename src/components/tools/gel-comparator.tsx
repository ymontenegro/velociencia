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
import {
  ToolPanel,
  FilterChip,
  SelectField,
  NumberField,
  MetaBadge,
  DataBar,
  accentSurface,
} from "@/components/tools/ui";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Component-local strings — eyebrow + new labels not in the dict.    */
/* Per convention: new eyebrow/label strings live here, not in JSON.  */
/* ------------------------------------------------------------------ */

const LOCAL_STRINGS = {
  es: {
    eyebrow: "Nutrición · Datos",
    viewProduct: "Ver en web",
    resultsCount: (n: number) => `${n} ${n === 1 ? "gel" : "geles"}`,
    ctaCalc: "¿Cuántos geles necesitas? Calcula tu ingesta de carbohidratos",
    none: "—",
    brandAll: "Todas",
  },
  en: {
    eyebrow: "Nutrition · Data",
    viewProduct: "View product",
    resultsCount: (n: number) => `${n} ${n === 1 ? "gel" : "gels"}`,
    ctaCalc: "How many gels do you need? Calculate your carbohydrate intake",
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
    case "carbs":         return row.gel.carbs_g;
    case "ratio":         return row.gel.glucose_fructose_ratio_num;
    case "sodium":        return row.gel.sodium_mg;
    case "caffeine":      return row.gel.caffeine_mg;
    case "calories":      return row.gel.calories_kcal;
    case "costPerCarb":   return row.metrics.cost_per_g_carb;
    case "sodiumPerCarb": return row.metrics.sodium_per_g_carb;
    default:              return null;
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
  // 3 decimals keeps SiS vs Maurten distinct.
  return value.toFixed(3);
}

function fmtSodiumPerCarb(value: number | null, none: string): string {
  if (value === null) return none;
  return value.toFixed(2);
}

function fmtOrNone(value: number | null | undefined, none: string): string {
  return value === null || value === undefined ? none : String(value);
}

function clampCarb(raw: string, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(999, Math.max(0, Math.round(n)));
}

/* ------------------------------------------------------------------ */
/* DataBar normalization                                               */
/* Lower cost = better = more filled bar.                             */
/* Normalised against the min/max of the currently visible rows.      */
/* ------------------------------------------------------------------ */

function computeCostBars(rows: Row[]): Map<string, number> {
  const values = rows
    .map((r) => r.metrics.cost_per_g_carb)
    .filter((v): v is number => v !== null);
  const map = new Map<string, number>();
  if (values.length === 0) return map;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  for (const row of rows) {
    const v = row.metrics.cost_per_g_carb;
    if (v === null) {
      map.set(row.gel.id, 0);
    } else if (range === 0) {
      map.set(row.gel.id, 100);
    } else {
      // Invert: lower cost → higher fill (better relative value)
      map.set(row.gel.id, Math.round(((max - v) / range) * 100));
    }
  }
  return map;
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function GelComparatorTable({
  accent = "#0D9488",
  accentVar = "--color-nutricion",
}: ToolComponentProps) {
  const locale = useLocale();
  const dict = useDictionary();
  const c = dict.comparator;
  const t = LOCAL_STRINGS[locale];

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

  // DataBar percentages — recomputed when visible rows change.
  const costBars = useMemo(() => computeCostBars(rows), [rows]);

  const hasActiveFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS),
    [filters],
  );

  function toggleTri(current: boolean | null, value: boolean): boolean | null {
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

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={t.eyebrow}
      title={c.title}
      meta={
        <MetaBadge>
          {c.lastUpdated} {lastUpdated}
        </MetaBadge>
      }
      contentClassName="p-0"
    >
      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div
        className="space-y-4 border-b border-[var(--color-border)] p-5 sm:p-6"
        style={{ backgroundColor: accentSurface(2) }}
      >
        {/* Chip filters */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label={c.filterCaffeine}
            active={filters.withCaffeine === true}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                withCaffeine: toggleTri(f.withCaffeine, true),
              }))
            }
          />
          <FilterChip
            label={c.filterNoCaffeine}
            active={filters.withCaffeine === false}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                withCaffeine: toggleTri(f.withCaffeine, false),
              }))
            }
          />
          <FilterChip
            label={c.filterHighSodium}
            active={filters.highSodium === true}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                highSodium: toggleTri(f.highSodium, true),
              }))
            }
          />
          <FilterChip
            label={c.filterVegan}
            active={filters.vegan === true}
            onClick={() =>
              setFilters((f) => ({ ...f, vegan: toggleTri(f.vegan, true) }))
            }
          />
          <FilterChip
            label={c.filterGlutenFree}
            active={filters.glutenFree === true}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                glutenFree: toggleTri(f.glutenFree, true),
              }))
            }
          />
        </div>

        {/* Brand select + carbs range + clear */}
        <div className="flex flex-wrap items-end gap-3">
          <SelectField
            id="gel-brand"
            label={c.filterBrand}
            value={filters.brand}
            onChange={(v) => setFilters((f) => ({ ...f, brand: v }))}
            className="min-w-[9rem]"
          >
            <option value="">{t.brandAll}</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </SelectField>

          <NumberField
            id="gel-carbs-min"
            label={c.filterCarbsMin}
            value={String(filters.carbsMin)}
            onChange={(v) =>
              setFilters((f) => ({ ...f, carbsMin: clampCarb(v, 0) }))
            }
            min={0}
            max={999}
            unit="g"
            className="w-28"
          />
          <NumberField
            id="gel-carbs-max"
            label={c.filterCarbsMax}
            value={String(filters.carbsMax)}
            onChange={(v) =>
              setFilters((f) => ({ ...f, carbsMax: clampCarb(v, 999) }))
            }
            min={0}
            max={999}
            unit="g"
            className="w-28"
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="self-end rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)]"
            >
              {c.filterReset}
            </button>
          )}
        </div>
      </div>

      {/* ── Results count ─────────────────────────────────────────── */}
      <div className="flex items-center px-5 py-3 sm:px-6">
        <span className="font-mono text-[11px] font-medium tabular-nums text-[var(--color-text-secondary)]">
          {t.resultsCount(rows.length)}
        </span>
      </div>

      {/* ── Table ────────────────────────────────────────────────── */}
      {rows.length === 0 ? (
        <div className="px-6 pb-12 pt-8 text-center">
          <p className="text-[var(--color-text-muted)]">{c.noResults}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              {c.title}. {c.subtitle}
            </caption>
            <thead>
              <tr
                className="border-b border-[var(--color-border)] text-left"
                style={{ backgroundColor: accentSurface(3) }}
              >
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
                >
                  {c.colBrand} / {c.colProduct}
                </th>
                <SortableTh
                  label={c.colCarbs}
                  col="carbs"
                  sort={sort}
                  ariaSort={ariaSortFor("carbs")}
                  onSort={handleSort}
                />
                <SortableTh
                  label={c.colRatio}
                  col="ratio"
                  sort={sort}
                  ariaSort={ariaSortFor("ratio")}
                  onSort={handleSort}
                  className="hidden sm:table-cell"
                />
                <SortableTh
                  label={c.colSodium}
                  col="sodium"
                  sort={sort}
                  ariaSort={ariaSortFor("sodium")}
                  onSort={handleSort}
                  className="hidden sm:table-cell"
                />
                <SortableTh
                  label={c.colCaffeine}
                  col="caffeine"
                  sort={sort}
                  ariaSort={ariaSortFor("caffeine")}
                  onSort={handleSort}
                  className="hidden lg:table-cell"
                />
                <SortableTh
                  label={c.colCalories}
                  col="calories"
                  sort={sort}
                  ariaSort={ariaSortFor("calories")}
                  onSort={handleSort}
                  className="hidden lg:table-cell"
                />
                {/* ★ Star column — accent surface highlight. */}
                <SortableTh
                  label={c.colCostPerCarb}
                  col="costPerCarb"
                  sort={sort}
                  ariaSort={ariaSortFor("costPerCarb")}
                  onSort={handleSort}
                  star
                />
                <SortableTh
                  label={c.colSodiumPerCarb}
                  col="sodiumPerCarb"
                  sort={sort}
                  ariaSort={ariaSortFor("sodiumPerCarb")}
                  onSort={handleSort}
                  className="hidden lg:table-cell"
                />
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
                >
                  {c.colBuy}
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)] sm:table-cell"
                >
                  {c.sourceLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ gel, metrics }) => (
                <tr
                  key={gel.id}
                  className="align-top transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_2%,transparent)]"
                  style={{ borderTop: "1px solid var(--color-border-light)" }}
                >
                  {/* Brand + product (merged on mobile) */}
                  <th scope="row" className="px-5 py-3 text-left font-normal">
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

                  <td className="px-5 py-3 font-mono tabular-nums text-[var(--color-text)]">
                    {gel.carbs_g}
                  </td>
                  <td className="hidden px-5 py-3 font-mono tabular-nums text-[var(--color-text-secondary)] sm:table-cell">
                    {gel.glucose_fructose_ratio ?? t.none}
                  </td>
                  <td className="hidden px-5 py-3 font-mono tabular-nums text-[var(--color-text-secondary)] sm:table-cell">
                    {gel.sodium_mg}
                  </td>
                  <td className="hidden px-5 py-3 font-mono tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {gel.caffeine_mg}
                  </td>
                  <td className="hidden px-5 py-3 font-mono tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {fmtOrNone(gel.calories_kcal, t.none)}
                  </td>

                  {/* ★ Star cell — accent-surface background + DataBar */}
                  <td
                    className="px-5 py-3"
                    style={{ backgroundColor: accentSurface(5) }}
                  >
                    <div className="flex min-w-[5rem] flex-col gap-1.5">
                      <span className="font-mono text-sm font-semibold tabular-nums text-[var(--color-text)]">
                        {fmtCostPerCarb(metrics.cost_per_g_carb, t.none)}
                      </span>
                      {metrics.cost_per_g_carb !== null && (
                        <DataBar pct={costBars.get(gel.id) ?? 0} />
                      )}
                    </div>
                  </td>

                  <td className="hidden px-5 py-3 font-mono tabular-nums text-[var(--color-text-secondary)] lg:table-cell">
                    {fmtSodiumPerCarb(metrics.sodium_per_g_carb, t.none)}
                  </td>

                  <td className="px-5 py-3">
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
                  <td className="hidden px-5 py-3 text-xs sm:table-cell">
                    <a
                      href={gel.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-muted)] underline decoration-dotted underline-offset-2 hover:text-[var(--color-text-secondary)]"
                    >
                      {c.sourceLabel}
                    </a>
                    <span className="block font-mono tabular-nums text-[var(--color-text-muted)]">
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
        <div
          className="border-t border-[var(--color-border)] px-5 py-4 sm:px-6"
          style={{ backgroundColor: accentSurface(2) }}
        >
          <Link
            href={carbCalcHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--tool-accent)" }}
          >
            <span aria-hidden="true">→</span>
            {t.ctaCalc}
          </Link>
        </div>
      )}
    </ToolPanel>
  );
}

/* ------------------------------------------------------------------ */
/* SortableTh                                                          */
/* ------------------------------------------------------------------ */

function SortableTh({
  label,
  col,
  sort,
  ariaSort,
  onSort,
  className,
  star = false,
}: {
  label: string;
  col: SortCol;
  sort: SortState | null;
  ariaSort: "ascending" | "descending" | "none";
  onSort: (col: SortCol) => void;
  className?: string;
  star?: boolean;
}) {
  const isActive = sort?.col === col;
  const arrow = !isActive ? "↕" : sort.dir === "asc" ? "↑" : "↓";
  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cn("px-5 py-3", className)}
      style={star ? { backgroundColor: accentSurface(5) } : undefined}
    >
      <button
        type="button"
        onClick={() => onSort(col)}
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-80",
          isActive
            ? "text-[var(--tool-accent)]"
            : "text-[var(--color-text-secondary)]",
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            "text-[10px]",
            !isActive && "text-[var(--color-text-muted)]",
          )}
        >
          {arrow}
        </span>
      </button>
    </th>
  );
}
