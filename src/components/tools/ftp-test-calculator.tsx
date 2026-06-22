"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import { getToolById, toolHref } from "@/lib/tools";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import { ToolPanel, NumberField, Readout, ReadoutPanel, MetaBadge } from "@/components/tools/ui";

// ---------------------------------------------------------------------------
// Strings (self-contained bilingual — no external dictionary)
// ---------------------------------------------------------------------------

interface Strings {
  eyebrow: string;
  title: string;
  powerLabel: string;
  powerUnit: string;
  powerPlaceholder: string;
  weightLabel: string;
  weightUnit: string;
  weightPlaceholder: string;
  weightHint: string;
  ftpReadout: string;
  wkgReadout: string;
  wkgSub: string;
  ctaZones: string;
  footnote: string;
}

const STRINGS: Record<Locale, Strings> = {
  es: {
    eyebrow: "Entrenamiento · Calculadora",
    title: "Calculadora de FTP (test de 20 minutos)",
    powerLabel: "Potencia media en 20 min",
    powerUnit: "W",
    powerPlaceholder: "260",
    weightLabel: "Peso (opcional)",
    weightUnit: "kg",
    weightPlaceholder: "70",
    weightHint: "Añade tu peso para obtener tu FTP en W/kg.",
    ftpReadout: "FTP estimado",
    wkgReadout: "FTP relativo",
    wkgSub: "vatios por kilo",
    ctaZones: "Convierte tu FTP en zonas de potencia",
    footnote:
      "El FTP (Functional Threshold Power) es la potencia máxima sostenible durante aproximadamente una hora. La estimación aplica la fórmula de Andrew Coggan: FTP = 95% de la potencia media de un test de 20 minutos a máximo esfuerzo, realizado tras un calentamiento completo. El 5% descontado corresponde a la diferencia entre 20 y 60 minutos.",
  },
  en: {
    eyebrow: "Training · Calculator",
    title: "FTP calculator (20-minute test)",
    powerLabel: "Average power over 20 min",
    powerUnit: "W",
    powerPlaceholder: "260",
    weightLabel: "Weight (optional)",
    weightUnit: "kg",
    weightPlaceholder: "70",
    weightHint: "Add your weight to get your FTP in W/kg.",
    ftpReadout: "Estimated FTP",
    wkgReadout: "Relative FTP",
    wkgSub: "watts per kilo",
    ctaZones: "Turn your FTP into power zones",
    footnote:
      "FTP (Functional Threshold Power) is the maximum power sustainable for roughly an hour. The estimate applies Andrew Coggan's formula: FTP = 95% of the average power from an all-out 20-minute test ridden after a full warm-up. The 5% deducted accounts for the gap between 20 and 60 minutes.",
  },
};

// ---------------------------------------------------------------------------
// Constants + pure helpers
// ---------------------------------------------------------------------------

const MIN_POWER = 50;
const MAX_POWER = 700;
const MIN_WEIGHT = 30;
const MAX_WEIGHT = 150;

/** FTP = 95% of the 20-minute average power (Coggan). */
const FTP_FACTOR = 0.95;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min) return min;
  if (value > max) return max;
  return value;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FtpTestCalculator({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: ToolComponentProps) {
  const locale = useLocale();
  const s = STRINGS[locale];

  const [rawPower, setRawPower] = useState<string>("260");
  const [rawWeight, setRawWeight] = useState<string>("");

  const power20 = useMemo<number>(() => {
    const parsed = parseFloat(rawPower);
    return Math.round(clamp(Number.isFinite(parsed) ? parsed : MIN_POWER, MIN_POWER, MAX_POWER));
  }, [rawPower]);

  const ftp = useMemo<number>(() => Math.round(power20 * FTP_FACTOR), [power20]);

  const wkg = useMemo<number | null>(() => {
    const parsed = parseFloat(rawWeight);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    const weight = clamp(parsed, MIN_WEIGHT, MAX_WEIGHT);
    return ftp / weight;
  }, [rawWeight, ftp]);

  const zonesHref = useMemo(() => {
    const tool = getToolById("power-zones");
    return tool ? toolHref(tool, locale) : null;
  }, [locale]);

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={s.title}
      meta={
        <MetaBadge live>
          {ftp}&thinsp;{s.powerUnit}
        </MetaBadge>
      }
    >
      {/* ── Inputs ── */}
      <div className="mb-7 grid gap-4 sm:max-w-md sm:grid-cols-2">
        <NumberField
          id="ftp-power-input"
          label={s.powerLabel}
          unit={s.powerUnit}
          value={rawPower}
          onChange={setRawPower}
          min={MIN_POWER}
          max={MAX_POWER}
          step={1}
          placeholder={s.powerPlaceholder}
        />
        <NumberField
          id="ftp-weight-input"
          label={s.weightLabel}
          unit={s.weightUnit}
          value={rawWeight}
          onChange={setRawWeight}
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          step={1}
          placeholder={s.weightPlaceholder}
        />
      </div>

      {/* ── Result ── */}
      <ReadoutPanel className={wkg !== null ? "grid grid-cols-1 gap-5 sm:grid-cols-2" : ""}>
        <Readout
          label={s.ftpReadout}
          value={ftp}
          unit={s.powerUnit}
          animateKey={ftp}
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

      {wkg === null && (
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">{s.weightHint}</p>
      )}

      {/* ── Cross-link to power zones ── */}
      {zonesHref && (
        <Link
          href={zonesHref}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
          style={{ color: "var(--tool-accent)" }}
        >
          <span aria-hidden="true">→</span>
          {s.ctaZones}
        </Link>
      )}

      {/* ── Footnote ── */}
      <p className="mt-5 border-t border-[var(--color-border-light)] pt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {s.footnote}
      </p>
    </ToolPanel>
  );
}
