"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import { ToolPanel, NumberField, Readout, ReadoutPanel, MetaBadge } from "@/components/tools/ui";

// ---------------------------------------------------------------------------
// Strings (self-contained bilingual — no external dictionary)
// ---------------------------------------------------------------------------

type BandKey = "recreational" | "amateur" | "elite" | "pro" | "worldclass";

interface Strings {
  eyebrow: string;
  title: string;
  gainLabel: string;
  gainUnit: string;
  gainPlaceholder: string;
  timeLabel: string;
  timeUnit: string;
  timePlaceholder: string;
  gradeLabel: string;
  gradeUnit: string;
  gradePlaceholder: string;
  vamReadout: string;
  vamUnit: string;
  wkgReadout: string;
  wkgSub: string;
  categoriesTitle: string;
  tableRange: string;
  tableLevel: string;
  bands: Record<BandKey, string>;
  footnote: string;
}

const STRINGS: Record<Locale, Strings> = {
  es: {
    eyebrow: "Entrenamiento · Calculadora",
    title: "Calculadora de VAM (ritmo de escalada)",
    gainLabel: "Desnivel ascendido",
    gainUnit: "m",
    gainPlaceholder: "1000",
    timeLabel: "Tiempo de subida",
    timeUnit: "min",
    timePlaceholder: "45",
    gradeLabel: "Pendiente media (opcional)",
    gradeUnit: "%",
    gradePlaceholder: "8",
    vamReadout: "VAM",
    vamUnit: "m/h",
    wkgReadout: "Potencia estimada",
    wkgSub: "W/kg aprox. (fórmula de Ferrari)",
    categoriesTitle: "Referencia por nivel",
    tableRange: "VAM (m/h)",
    tableLevel: "Nivel",
    bands: {
      recreational: "Cicloturista",
      amateur: "Amateur entrenado",
      elite: "Élite amateur",
      pro: "Profesional",
      worldclass: "Élite mundial",
    },
    footnote:
      "La VAM (Velocità Ascensionale Media) son los metros de desnivel que asciendes por hora: desnivel dividido por el tiempo de subida. La estimación de potencia relativa usa la fórmula de Michele Ferrari, W/kg ≈ VAM / (200 + 10 × pendiente%), una aproximación válida en pendientes de entre 6% y 11%; fuera de ese rango pierde precisión. La VAM real depende mucho de la pendiente: una misma potencia rinde más VAM cuanto más empinada es la subida.",
  },
  en: {
    eyebrow: "Training · Calculator",
    title: "VAM calculator (climbing pace)",
    gainLabel: "Elevation gained",
    gainUnit: "m",
    gainPlaceholder: "1000",
    timeLabel: "Climb time",
    timeUnit: "min",
    timePlaceholder: "45",
    gradeLabel: "Average gradient (optional)",
    gradeUnit: "%",
    gradePlaceholder: "8",
    vamReadout: "VAM",
    vamUnit: "m/h",
    wkgReadout: "Estimated power",
    wkgSub: "approx. W/kg (Ferrari formula)",
    categoriesTitle: "Reference by level",
    tableRange: "VAM (m/h)",
    tableLevel: "Level",
    bands: {
      recreational: "Recreational",
      amateur: "Trained amateur",
      elite: "Elite amateur",
      pro: "Professional",
      worldclass: "World-class",
    },
    footnote:
      "VAM (Velocità Ascensionale Media) is the vertical metres you climb per hour: elevation gain divided by climb time. The relative-power estimate uses Michele Ferrari's formula, W/kg ≈ VAM / (200 + 10 × gradient%), an approximation valid on gradients between 6% and 11%; outside that range it loses accuracy. Real VAM depends heavily on gradient: the same power yields more VAM the steeper the climb.",
  },
};

// ---------------------------------------------------------------------------
// Constants + pure helpers
// ---------------------------------------------------------------------------

const MIN_GAIN = 0;
const MAX_GAIN = 3000;
const MIN_TIME = 1;
const MAX_TIME = 600;
const MIN_GRADE = 1;
const MAX_GRADE = 25;

interface Band {
  key: BandKey;
  min: number;
  /** Exclusive upper bound; Infinity = open-ended. */
  max: number;
}

/**
 * VAM reference bands (m/h) for climbs of ~7–10% gradient. Orientative values
 * drawn from the commonly cited Ferrari/Vaitkus ranges; see footnote.
 */
const VAM_BANDS: Band[] = [
  { key: "recreational", min: 0,    max: 1000 },
  { key: "amateur",      min: 1000, max: 1300 },
  { key: "elite",        min: 1300, max: 1600 },
  { key: "pro",          min: 1600, max: 1800 },
  { key: "worldclass",   min: 1800, max: Infinity },
];

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min) return min;
  if (value > max) return max;
  return value;
}

function bandFromVam(vam: number): BandKey {
  const found = VAM_BANDS.find((b) => vam >= b.min && vam < b.max);
  return found ? found.key : "recreational";
}

function rangeLabel(b: Band): string {
  return b.max === Infinity ? `≥ ${b.min}` : `${b.min}–${b.max}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VamCalculator({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: ToolComponentProps) {
  const locale = useLocale();
  const s = STRINGS[locale];

  const [rawGain, setRawGain] = useState<string>("1000");
  const [rawTime, setRawTime] = useState<string>("45");
  const [rawGrade, setRawGrade] = useState<string>("");

  const gain = useMemo<number>(() => {
    const parsed = parseFloat(rawGain);
    return Math.round(clamp(Number.isFinite(parsed) ? parsed : MIN_GAIN, MIN_GAIN, MAX_GAIN));
  }, [rawGain]);

  const timeMin = useMemo<number>(() => {
    const parsed = parseFloat(rawTime);
    return clamp(Number.isFinite(parsed) ? parsed : MIN_TIME, MIN_TIME, MAX_TIME);
  }, [rawTime]);

  const vam = useMemo<number>(() => Math.round(gain / (timeMin / 60)), [gain, timeMin]);

  const activeBand = useMemo<BandKey>(() => bandFromVam(vam), [vam]);

  const wkg = useMemo<number | null>(() => {
    const parsed = parseFloat(rawGrade);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const grade = clamp(parsed, MIN_GRADE, MAX_GRADE);
    return vam / (200 + 10 * grade);
  }, [rawGrade, vam]);

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={s.title}
      meta={
        <MetaBadge live>
          {vam}&thinsp;{s.vamUnit}
        </MetaBadge>
      }
    >
      {/* ── Inputs ── */}
      <div className="mb-7 grid gap-4 sm:max-w-2xl sm:grid-cols-3">
        <NumberField
          id="vam-gain-input"
          label={s.gainLabel}
          unit={s.gainUnit}
          value={rawGain}
          onChange={setRawGain}
          min={MIN_GAIN}
          max={MAX_GAIN}
          step={10}
          placeholder={s.gainPlaceholder}
        />
        <NumberField
          id="vam-time-input"
          label={s.timeLabel}
          unit={s.timeUnit}
          value={rawTime}
          onChange={setRawTime}
          min={MIN_TIME}
          max={MAX_TIME}
          step={1}
          placeholder={s.timePlaceholder}
        />
        <NumberField
          id="vam-grade-input"
          label={s.gradeLabel}
          unit={s.gradeUnit}
          value={rawGrade}
          onChange={setRawGrade}
          min={MIN_GRADE}
          max={MAX_GRADE}
          step={1}
          placeholder={s.gradePlaceholder}
        />
      </div>

      {/* ── Result ── */}
      <ReadoutPanel className={wkg !== null ? "grid grid-cols-1 gap-5 sm:grid-cols-2" : ""}>
        <Readout
          label={s.vamReadout}
          value={vam}
          unit={s.vamUnit}
          sub={s.bands[activeBand]}
          animateKey={vam}
        />
        {wkg !== null && (
          <Readout
            label={s.wkgReadout}
            value={wkg.toFixed(2)}
            unit="W/kg"
            sub={s.wkgSub}
            primary={false}
            animateKey={wkg.toFixed(2)}
          />
        )}
      </ReadoutPanel>

      {/* ── Reference table ── */}
      <div className="mt-7">
        <p className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          {s.categoriesTitle}
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="pb-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {s.tableLevel}
              </th>
              <th className="pb-2 text-right font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {s.tableRange}
              </th>
            </tr>
          </thead>
          <tbody>
            {VAM_BANDS.map((b) => {
              const isActive = b.key === activeBand;
              return (
                <tr
                  key={b.key}
                  className="border-b border-[var(--color-border-light)] last:border-0"
                  style={isActive ? { backgroundColor: "color-mix(in srgb, var(--tool-accent) 10%, transparent)" } : undefined}
                >
                  <td className="py-2.5">
                    <span
                      className="text-sm"
                      style={{
                        color: isActive ? "var(--tool-accent)" : "var(--color-text)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {s.bands[b.key]}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono text-sm tabular-nums text-[var(--color-text-secondary)]">
                    {rangeLabel(b)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Footnote ── */}
      <p className="mt-5 border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </ToolPanel>
  );
}
