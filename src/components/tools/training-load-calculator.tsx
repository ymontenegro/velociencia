"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import type { ToolComponentProps } from "@/components/tools/calculator-renderer";
import { ToolPanel, Segmented } from "@/components/tools/ui";
import UploadMode from "@/components/tools/training-load/upload-mode";
import PlannerMode from "@/components/tools/training-load/planner-mode";

// ─── i18n ──────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    eyebrow: "Entrenamiento · Analizador",
    title: "Carga de entrenamiento",
    subtitle: "TSS · NP · IF y tu Performance Management Chart (CTL/ATL/TSB)",
    tabUpload: "Desde tus archivos",
    tabPlanner: "Manual / planificar",
  },
  en: {
    eyebrow: "Training · Analyzer",
    title: "Training load",
    subtitle: "TSS · NP · IF and your Performance Management Chart (CTL/ATL/TSB)",
    tabUpload: "From your files",
    tabPlanner: "Manual / plan",
  },
} as const;

type Mode = "upload" | "planner";

// ─── Container ───────────────────────────────────────────────────────────────
//
// Flagship training-load tool. Two modes share one ToolPanel:
//   • "upload"  — parse real Strava/Garmin files (client-side) → TSS/NP/IF + PMC
//   • "planner" — forward simulation of the PMC from an average daily TSS
//
// The ToolPanel provides the "Race Telemetry" shell (header, grid, corner ticks).
// Each mode renders its own content with its own padding.

export default function TrainingLoadCalculator({
  accent = "#0891B2",
  accentVar = "--color-entrenamiento",
}: ToolComponentProps) {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale];

  const [mode, setMode] = useState<Mode>("upload");

  const modeOptions: Array<{ value: Mode; label: string }> = [
    { value: "upload", label: s.tabUpload },
    { value: "planner", label: s.tabPlanner },
  ];

  return (
    <ToolPanel
      accent={accent}
      accentVar={accentVar}
      eyebrow={s.eyebrow}
      title={s.title}
      contentClassName=""
    >
      {/* ── Mode selector ── */}
      <div className="border-b border-[var(--color-border)] px-5 pb-5 pt-4 sm:px-7">
        <Segmented
          options={modeOptions}
          value={mode}
          onChange={setMode}
          ariaLabel={s.subtitle}
        />
      </div>

      {/* ── Active mode — manages its own padding ── */}
      {mode === "upload" ? (
        <UploadMode accent={accent} accentVar={accentVar} />
      ) : (
        <PlannerMode accent={accent} accentVar={accentVar} />
      )}
    </ToolPanel>
  );
}
