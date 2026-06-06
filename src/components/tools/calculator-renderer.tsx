"use client";

import PowerZonesCalculator from "@/components/tools/power-zones-calculator";
import CarbIntakeCalculator from "@/components/tools/carb-intake-calculator";
import PowerToWeightCalculator from "@/components/tools/power-to-weight-calculator";
import Vo2maxEstimatorCalculator from "@/components/tools/vo2max-estimator-calculator";
import TrainingLoadCalculator from "@/components/tools/training-load-calculator";
import GelComparatorTable from "@/components/tools/gel-comparator";
import EvidenceExplorer from "@/components/tools/evidence-explorer";

interface CalculatorRendererProps {
  toolId: string;
  color?: string;
}

/**
 * Client-side switcher that renders the correct tool component by toolId.
 * This is the ONLY file that imports the individual tool components.
 *
 * Contract: each tool has a default export accepting `{ color?: string }`.
 */
const CALCULATORS: Record<string, React.ComponentType<{ color?: string }>> = {
  "power-zones": PowerZonesCalculator,
  "carb-intake": CarbIntakeCalculator,
  "power-to-weight": PowerToWeightCalculator,
  "vo2max-estimator": Vo2maxEstimatorCalculator,
  "training-load": TrainingLoadCalculator,
};

/**
 * Dataset tools (kind: 'dataset' in TOOLS) — interactive comparison tables.
 * Same `{ color?: string }` contract as calculators; dispatched in the same switcher.
 */
const DATASETS: Record<string, React.ComponentType<{ color?: string }>> = {
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

  return <Component color={color} />;
}
