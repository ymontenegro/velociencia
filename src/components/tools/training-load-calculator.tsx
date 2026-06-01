"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import UploadMode from "@/components/tools/training-load/upload-mode";
import PlannerMode from "@/components/tools/training-load/planner-mode";

// ─── i18n ──────────────────────────────────────────────────────────────────────

const STRINGS = {
  es: {
    title: "Carga de entrenamiento",
    subtitle: "TSS · NP · IF y tu Performance Management Chart (CTL/ATL/TSB)",
    tabUpload: "Desde tus archivos",
    tabPlanner: "Manual / planificar",
  },
  en: {
    title: "Training load",
    subtitle: "TSS · NP · IF and your Performance Management Chart (CTL/ATL/TSB)",
    tabUpload: "From your files",
    tabPlanner: "Manual / plan",
  },
} as const;

type Mode = "upload" | "planner";

// ─── Container ───────────────────────────────────────────────────────────────
//
// Flagship training-load tool. Two modes share one card:
//   • "upload"  — parse real Strava/Garmin files (client-side) → TSS/NP/IF + PMC
//   • "planner" — forward simulation of the PMC from an average daily TSS
//
// Each mode renders inner content only; the card shell + header + tabs live here.

export default function TrainingLoadCalculator({
  color = "#0891B2",
}: {
  color?: string;
}) {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale];

  const [mode, setMode] = useState<Mode>("upload");

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
        <h3 className="text-base font-semibold" style={{ color: "var(--color-text)" }}>
          {s.title}
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {s.subtitle}
        </p>

        {/* Tab switcher */}
        <div
          className="mt-4 inline-flex rounded-lg p-1"
          style={{ backgroundColor: "var(--color-bg)" }}
          role="tablist"
        >
          {([
            { id: "upload" as const, label: s.tabUpload },
            { id: "planner" as const, label: s.tabPlanner },
          ]).map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(tab.id)}
                className="rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: active ? color : "transparent",
                  color: active ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active mode */}
      {mode === "upload" ? <UploadMode color={color} /> : <PlannerMode color={color} />}
    </div>
  );
}
