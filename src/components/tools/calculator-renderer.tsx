"use client";

import PowerZonesCalculator from "@/components/tools/power-zones-calculator";
import CarbIntakeCalculator from "@/components/tools/carb-intake-calculator";
import PowerToWeightCalculator from "@/components/tools/power-to-weight-calculator";
import Vo2maxEstimatorCalculator from "@/components/tools/vo2max-estimator-calculator";
import TrainingLoadCalculator from "@/components/tools/training-load-calculator";
import GelComparatorTable from "@/components/tools/gel-comparator";
import EvidenceExplorer from "@/components/tools/evidence-explorer";
import { getToolById } from "@/lib/tools";
import { SECTIONS } from "@/lib/constants";

interface CalculatorRendererProps {
  toolId: string;
  color?: string;
}

/**
 * Props every tool component accepts. `accent` is a concrete hex fallback (the
 * section's light-mode color) and `accentVar` is the section accent CSS var
 * name — primitives use the var (theme-adaptive) and fall back to the hex for
 * SSR / Recharts. `color` is kept for backward compatibility.
 */
export interface ToolComponentProps {
  color?: string;
  accent?: string;
  accentVar?: string;
}

/**
 * Client-side switcher that renders the correct tool component by toolId.
 * This is the ONLY file that imports the individual tool components.
 *
 * Contract: each tool has a default export accepting `{ color?: string }`.
 */
const CALCULATORS: Record<string, React.ComponentType<ToolComponentProps>> = {
  "power-zones": PowerZonesCalculator,
  "carb-intake": CarbIntakeCalculator,
  "power-to-weight": PowerToWeightCalculator,
  "vo2max-estimator": Vo2maxEstimatorCalculator,
  "training-load": TrainingLoadCalculator,
};

/**
 * Dataset tools (kind: 'dataset' in TOOLS) — interactive comparison tables.
 * Same contract as calculators; dispatched in the same switcher.
 */
const DATASETS: Record<string, React.ComponentType<ToolComponentProps>> = {
  "gel-comparator": GelComparatorTable,
  "evidence-explorer": EvidenceExplorer,
};

export function CalculatorRenderer({ toolId, color }: CalculatorRendererProps) {
  const Component = CALCULATORS[toolId] ?? DATASETS[toolId];

  if (!Component) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Herramienta no disponible.</p>
      </div>
    );
  }

  const tool = getToolById(toolId);
  const accent = tool ? SECTIONS[tool.sectionId].color : color ?? "#1A1D23";
  const accentVar = tool ? SECTIONS[tool.sectionId].colorVar : "--color-text";

  return <Component color={color} accent={accent} accentVar={accentVar} />;
}
