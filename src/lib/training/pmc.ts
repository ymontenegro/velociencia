/**
 * Performance Management Chart — pure math module
 *
 * Implements the impulse–response model (Banister, 1991) as used by TrainingPeaks PMC.
 *
 * The model tracks two exponentially-weighted moving averages of daily Training Stress Score (TSS):
 *
 *   CTL (Chronic Training Load)  — 42-day time constant → "Fitness"
 *   ATL (Acute Training Load)    —  7-day time constant → "Fatigue"
 *   TSB (Training Stress Balance) = CTL_{t-1} − ATL_{t-1} → "Form"
 *
 * Update rule for each day t:
 *   TSB_t  = CTL_{t-1} − ATL_{t-1}                         (form at start of day)
 *   CTL_t  = CTL_{t-1} + α_ctl × (TSS_t − CTL_{t-1})
 *   ATL_t  = ATL_{t-1} + α_atl × (TSS_t − ATL_{t-1})
 *
 * where α = 1 − e^(−1/τ) and τ is the time constant in days.
 *
 * No DOM, no React — safe for Node, edge runtimes, and tests.
 */

// ─── EWMA time constants ──────────────────────────────────────────────────────

/** Smoothing factor for CTL (42-day fitness constant). ≈ 0.02338 */
export const ALPHA_CTL: number = 1 - Math.exp(-1 / 42);

/** Smoothing factor for ATL (7-day fatigue constant). ≈ 0.13212 */
export const ALPHA_ATL: number = 1 - Math.exp(-1 / 7);

// ─── TSB band ─────────────────────────────────────────────────────────────────

/**
 * Training Stress Balance interpretation band.
 *
 * | Band    | TSB range       | Meaning                         |
 * |---------|-----------------|----------------------------------|
 * | fresh   | > 5             | Fresh / peak form                |
 * | race    | −10 … 5         | Race-ready — optimal balance     |
 * | train   | −30 … −10       | Productive training load         |
 * | over    | < −30           | High fatigue / overtraining risk |
 */
export type TsbBand = "fresh" | "race" | "train" | "over";

/** Returns the TSB interpretation band for a given TSB value. */
export function getTsbBand(tsb: number): TsbBand {
  if (tsb > 5)    return "fresh";
  if (tsb >= -10) return "race";
  if (tsb >= -30) return "train";
  return "over";
}

// ─── Core EWMA types and runner ───────────────────────────────────────────────

/** One PMC data point per day (generic, day-indexed). */
export interface EwmaPoint {
  /** Chronic Training Load (Fitness) — rounded to 1 decimal. */
  ctl: number;
  /** Acute Training Load (Fatigue) — rounded to 1 decimal. */
  atl: number;
  /** Training Stress Balance (Form) = CTL_{t-1} − ATL_{t-1} — rounded to 1 decimal. */
  tsb: number;
  /** TSS applied on this day (not rounded). */
  tss: number;
}

/**
 * Runs the EWMA over a daily TSS series and returns one EwmaPoint per day.
 *
 * @param dailyTss - Array of TSS values, one per consecutive day (index 0 = day 1).
 * @param seedCtl  - Starting CTL value (CTL_0). Defaults to 0.
 * @param seedAtl  - Starting ATL value (ATL_0). Defaults to seedCtl.
 *
 * CTL and ATL in each returned point are rounded to 1 decimal (Math.round(x*10)/10),
 * matching the behaviour of the manual PMC calculator.
 */
export function runEwma(
  dailyTss: number[],
  seedCtl: number,
  seedAtl?: number,
): EwmaPoint[] {
  let ctlPrev = seedCtl;
  let atlPrev = seedAtl ?? seedCtl;

  const points: EwmaPoint[] = [];

  for (const tss of dailyTss) {
    // TSB is computed from the PREVIOUS day's values (before today's load)
    const tsb = ctlPrev - atlPrev;

    // EWMA update
    const ctl = ctlPrev + ALPHA_CTL * (tss - ctlPrev);
    const atl = atlPrev + ALPHA_ATL * (tss - atlPrev);

    points.push({
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

// ─── Dated PMC builder ────────────────────────────────────────────────────────

/** An activity (or any load event) that contributes TSS on a specific date. */
export interface DatedTss {
  date: Date;
  tss: number;
}

/** One PMC data point per calendar day (ISO date string). */
export interface DatedPmcPoint {
  /** Calendar date in YYYY-MM-DD (local time). */
  date: string;
  /** Chronic Training Load (Fitness) — rounded to 1 decimal. */
  ctl: number;
  /** Acute Training Load (Fatigue) — rounded to 1 decimal. */
  atl: number;
  /** Training Stress Balance (Form) — rounded to 1 decimal. */
  tsb: number;
  /** Total TSS for this day (sum of all activities on this date). */
  tss: number;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Formats a Date as YYYY-MM-DD using local time (no UTC drift). */
function toLocalIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Returns the number of whole days between two dates (ignores time component). */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  // Strip time by working with UTC midnight equivalents of local dates
  const aMs = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bMs = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bMs - aMs) / msPerDay);
}

/**
 * Builds the Performance Management Chart from a list of dated TSS activities.
 *
 * Steps:
 *  1. Groups items by local calendar day (YYYY-MM-DD), summing TSS for
 *     multiple activities on the same day.
 *  2. Sorts by date and fills every day between the first and last date,
 *     inserting TSS = 0 on days with no activity.
 *  3. Runs the EWMA (runEwma) seeded with seedCtl (seedAtl = seedCtl).
 *  4. Returns one DatedPmcPoint per calendar day.
 *
 * @param items    - Activities with a date and TSS. May be unordered.
 * @param seedCtl  - Starting CTL (and ATL) value. Defaults to 0.
 *
 * Returns an empty array if items is empty.
 */
export function buildPmcFromActivities(
  items: DatedTss[],
  seedCtl: number = 0,
): DatedPmcPoint[] {
  if (items.length === 0) return [];

  // Step 1: aggregate TSS per local calendar day
  const tssMap = new Map<string, number>();
  for (const item of items) {
    const key = toLocalIso(item.date);
    tssMap.set(key, (tssMap.get(key) ?? 0) + item.tss);
  }

  // Step 2: find the date range and build a continuous daily series
  const sortedKeys = Array.from(tssMap.keys()).sort(); // lexicographic sort works for YYYY-MM-DD
  const firstKey = sortedKeys[0];
  const lastKey  = sortedKeys[sortedKeys.length - 1];

  // Reconstruct Date objects from the ISO keys (local midnight)
  const [fy, fm, fd] = firstKey.split("-").map(Number);
  const firstDate = new Date(fy, fm - 1, fd);
  const [ly, lm, ld] = lastKey.split("-").map(Number);
  const lastDate  = new Date(ly, lm - 1, ld);

  const totalDays = daysBetween(firstDate, lastDate) + 1; // inclusive

  const dates: string[]  = [];
  const dailyTss: number[] = [];

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(fy, fm - 1, fd + i); // local date arithmetic
    const key = toLocalIso(d);
    dates.push(key);
    dailyTss.push(tssMap.get(key) ?? 0);
  }

  // Step 3: run the EWMA
  const ewmaPoints = runEwma(dailyTss, seedCtl);

  // Step 4: attach dates
  return ewmaPoints.map((pt, i) => ({
    date: dates[i],
    ctl:  pt.ctl,
    atl:  pt.atl,
    tsb:  pt.tsb,
    tss:  pt.tss,
  }));
}
