"use client";

import PowerZonesCalculator from "@/components/tools/power-zones-calculator";
import CarbIntakeCalculator from "@/components/tools/carb-intake-calculator";
import PowerToWeightCalculator from "@/components/tools/power-to-weight-calculator";

interface CalculatorRendererProps {
  toolId: string;
  color?: string;
}

/**
 * Client-side switcher that renders the correct calculator component by toolId.
 * This is the ONLY file that imports the individual calculator components.
 *
 * Contract: each calculator has a default export accepting `{ color?: string }`.
 */
const CALCULATORS: Record<string, React.ComponentType<{ color?: string }>> = {
  "power-zones": PowerZonesCalculator,
  "carb-intake": CarbIntakeCalculator,
  "power-to-weight": PowerToWeightCalculator,
};

export function CalculatorRenderer({ toolId, color }: CalculatorRendererProps) {
  const Calculator = CALCULATORS[toolId];

  if (!Calculator) {
    return (
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-6 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Calculadora no disponible.</p>
      </div>
    );
  }

  return <Calculator color={color} />;
}
