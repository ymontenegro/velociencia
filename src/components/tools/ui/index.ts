/**
 * Shared primitives for the tools design language ("Race Telemetry").
 * Imported by every calculator and data explorer for a coherent instrument feel.
 */
export { ToolPanel } from "./tool-panel";
export { Readout, ReadoutPanel } from "./readout";
export { NumberField } from "./number-field";
export { RangeField } from "./range-field";
export { Segmented } from "./segmented";
export { FilterChip } from "./filter-chip";
export { SelectField } from "./select-field";
export { GaugeBar, GaugeLegend } from "./gauge-bar";
export type { GaugeSegment } from "./gauge-bar";
export { MetaBadge } from "./badge";
export { DataBar } from "./data-bar";
export { useAccentColor } from "./hooks";
export { accentAlpha, accentSurface, mixAlpha } from "./colors";
