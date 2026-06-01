// ---------------------------------------------------------------------------
// Coggan 7-zone power model — shared definitions
// Pure module: no DOM, no React, no side-effects.
// ---------------------------------------------------------------------------

import type { Locale } from "@/lib/i18n";

export interface PowerZoneDef {
  id: string;
  nameEs: string;
  nameEn: string;
  /** Lower bound as percentage of FTP (0 = starts at 0 W) */
  pctLow: number;
  /** Upper bound as percentage of FTP. null = open-ended (Z7) */
  pctHigh: number | null;
  /** Human-readable percentage label */
  pctLabel: string;
  color: string;
}

export const POWER_ZONES: PowerZoneDef[] = [
  {
    id: "Z1",
    nameEs: "Z1 — Recuperación activa",
    nameEn: "Z1 — Active recovery",
    pctLow: 0,
    pctHigh: 55,
    pctLabel: "≤ 55%",
    color: "#67B7D1",
  },
  {
    id: "Z2",
    nameEs: "Z2 — Resistencia",
    nameEn: "Z2 — Endurance",
    pctLow: 56,
    pctHigh: 75,
    pctLabel: "56–75%",
    color: "#82C37A",
  },
  {
    id: "Z3",
    nameEs: "Z3 — Tempo",
    nameEn: "Z3 — Tempo",
    pctLow: 76,
    pctHigh: 90,
    pctLabel: "76–90%",
    color: "#F5D76E",
  },
  {
    id: "Z4",
    nameEs: "Z4 — Umbral",
    nameEn: "Z4 — Threshold",
    pctLow: 91,
    pctHigh: 105,
    pctLabel: "91–105%",
    color: "#F0A500",
  },
  {
    id: "Z5",
    nameEs: "Z5 — VO₂máx",
    nameEn: "Z5 — VO₂max",
    pctLow: 106,
    pctHigh: 120,
    pctLabel: "106–120%",
    color: "#E87722",
  },
  {
    id: "Z6",
    nameEs: "Z6 — Capacidad anaeróbica",
    nameEn: "Z6 — Anaerobic capacity",
    pctLow: 121,
    pctHigh: 150,
    pctLabel: "121–150%",
    color: "#D94F4F",
  },
  {
    id: "Z7",
    nameEs: "Z7 — Neuromuscular",
    nameEn: "Z7 — Neuromuscular",
    pctLow: 151,
    pctHigh: null,
    pctLabel: "> 150%",
    color: "#9B1C1C",
  },
];

/** Returns the zone name in the given locale. */
export function zoneName(zone: PowerZoneDef, locale: Locale): string {
  return locale === "es" ? zone.nameEs : zone.nameEn;
}
