"use client";

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import {
  parseActivityFile,
  parseStravaExport,
  ActivityParseError,
  type ParsedActivity,
} from "@/lib/training/activity-parse";
import {
  normalizedPower,
  intensityFactor,
  tssFromPower,
  hrTss,
  timeInPowerZones,
  bestAveragePower,
  estimateFtpFrom20min,
  type HrParams,
  type ZoneTime,
} from "@/lib/training/metrics";
import {
  buildPmcFromActivities,
  getTsbBand,
  type DatedTss,
  type TsbBand,
} from "@/lib/training/pmc";
import { POWER_ZONES, zoneName } from "@/lib/training/zones";
import { PmcChart } from "@/components/tools/training-load/pmc-chart";

// ─── i18n ──────────────────────────────────────────────────────────────────────

interface Strings {
  privacyTitle: string;
  privacyBody: string;
  dropTitle: string;
  dropHint: string;
  dropButton: string;
  formats: string;
  parsing: string;
  parsingZip: string;
  settingsTitle: string;
  settingsHint: string;
  ftpLabel: string;
  lthrLabel: string;
  maxHrLabel: string;
  restHrLabel: string;
  sexLabel: string;
  sexMale: string;
  sexFemale: string;
  estimateFtp: string;
  estimateFtpHint: string;
  seedCtlLabel: string;
  seedCtlHint: string;
  clearAll: string;
  // results
  oneActivity: string;
  activitiesCount: (n: number) => string;
  date: string;
  sport: string;
  duration: string;
  tss: string;
  np: string;
  avgPower: string;
  maxPower: string;
  if_: string;
  avgHr: string;
  maxHr: string;
  method: string;
  methodPower: string;
  methodHr: string;
  methodNone: string;
  timeInZones: string;
  // pmc
  pmcTitle: string;
  pmcHint: string;
  pmcNeedMore: string;
  fitnessLabel: string;
  fatigueLabel: string;
  formLabel: string;
  finalValues: string;
  tsbInterpTitle: string;
  // tsb bands
  tsbFresh: string;
  tsbRace: string;
  tsbTrain: string;
  tsbOver: string;
  // misc
  noDataWarning: string;
  noFtpWarning: string;
  fileError: string;
  footnote: string;
  watts: string;
  bpm: string;
}

const STRINGS: Record<Locale, Strings> = {
  es: {
    privacyTitle: "Tus archivos no salen de tu navegador",
    privacyBody:
      "Todo el análisis ocurre localmente en tu dispositivo. Los archivos que sueltas aquí nunca se suben a ningún servidor.",
    dropTitle: "Arrastra tus salidas de Strava o Garmin",
    dropHint: "o haz clic para seleccionarlas",
    dropButton: "Seleccionar archivos",
    formats:
      "Formatos: .fit · .tcx · .gpx (y comprimidos .gz) · .zip de exportación masiva de Strava",
    parsing: "Procesando archivos…",
    parsingZip: "Descomprimiendo el ZIP y procesando salidas",
    settingsTitle: "Tus datos",
    settingsHint:
      "Ajusta estos valores a los tuyos: se usan para calcular el TSS, las zonas y, si no hay potencia, el hrTSS. Se guardan en este navegador.",
    ftpLabel: "FTP",
    lthrLabel: "FC umbral (LTHR)",
    maxHrLabel: "FC máxima",
    restHrLabel: "FC reposo",
    sexLabel: "Sexo",
    sexMale: "Hombre",
    sexFemale: "Mujer",
    estimateFtp: "Estimar FTP desde tus datos",
    estimateFtpHint: "0,95 × tu mejor potencia media de 20 min",
    seedCtlLabel: "CTL inicial",
    seedCtlHint:
      "Tu fitness (CTL) antes de la primera salida. Si subes poco historial, ponlo para evitar que la curva arranque en cero.",
    clearAll: "Limpiar todo",
    oneActivity: "Tu salida",
    activitiesCount: (n) => `${n} salidas`,
    date: "Fecha",
    sport: "Deporte",
    duration: "Duración",
    tss: "TSS",
    np: "NP",
    avgPower: "Pot. media",
    maxPower: "Pot. máx",
    if_: "IF",
    avgHr: "FC media",
    maxHr: "FC máx",
    method: "Método",
    methodPower: "Potencia",
    methodHr: "Frec. cardíaca",
    methodNone: "Sin datos",
    timeInZones: "Tiempo en zonas de potencia",
    pmcTitle: "Tu curva de carga (PMC)",
    pmcHint: "Fitness (CTL) · Fatiga (ATL) · Forma (TSB) sobre fechas reales",
    pmcNeedMore:
      "Sube salidas de varios días para construir tu Performance Management Chart.",
    fitnessLabel: "Fitness (CTL)",
    fatigueLabel: "Fatiga (ATL)",
    formLabel: "Forma (TSB)",
    finalValues: "Valores al final del período",
    tsbInterpTitle: "Interpretación del TSB final",
    tsbFresh:
      "Fresco / descargado — forma punta. Si se mantiene mucho tiempo puede haber pérdida de fitness.",
    tsbRace: "Forma de competición — equilibrio óptimo entre fitness y fatiga.",
    tsbTrain:
      "Entrenamiento productivo — fatiga funcional, estímulo de adaptación normal.",
    tsbOver:
      "Fatiga acumulada alta — riesgo de sobreentrenamiento. Considera reducir carga o añadir descanso.",
    noDataWarning:
      "Este archivo no trae datos de potencia ni de frecuencia cardíaca, así que no se puede calcular su carga.",
    noFtpWarning:
      "Esta salida tiene potencia pero falta tu FTP. Ingresa tu FTP arriba (o estímalo) para calcular el TSS.",
    fileError: "No se pudo procesar",
    footnote:
      "El TSS por potencia usa la potencia normalizada (NP), el factor de intensidad (IF) y tu FTP (Coggan & Allen). Cuando no hay potencia se estima un hrTSS a partir de la frecuencia cardíaca (TRIMP de Banister), menos preciso. CTL (42 días), ATL (7 días) y TSB siguen el modelo de impulso-respuesta del Performance Management Chart. Son estimaciones orientativas.",
    watts: "W",
    bpm: "ppm",
  },
  en: {
    privacyTitle: "Your files never leave your browser",
    privacyBody:
      "All analysis runs locally on your device. The files you drop here are never uploaded to any server.",
    dropTitle: "Drag in your Strava or Garmin rides",
    dropHint: "or click to select them",
    dropButton: "Select files",
    formats:
      "Formats: .fit · .tcx · .gpx (and gzipped .gz) · Strava bulk-export .zip",
    parsing: "Processing files…",
    parsingZip: "Unzipping and processing rides",
    settingsTitle: "Your data",
    settingsHint:
      "Set these to your own values: they drive TSS, zones and, when power is missing, hrTSS. They are saved in this browser.",
    ftpLabel: "FTP",
    lthrLabel: "Threshold HR (LTHR)",
    maxHrLabel: "Max HR",
    restHrLabel: "Resting HR",
    sexLabel: "Sex",
    sexMale: "Male",
    sexFemale: "Female",
    estimateFtp: "Estimate FTP from your data",
    estimateFtpHint: "0.95 × your best 20-min average power",
    seedCtlLabel: "Starting CTL",
    seedCtlHint:
      "Your fitness (CTL) before the first ride. If you only upload a short history, set this so the curve doesn't start at zero.",
    clearAll: "Clear all",
    oneActivity: "Your ride",
    activitiesCount: (n) => `${n} rides`,
    date: "Date",
    sport: "Sport",
    duration: "Duration",
    tss: "TSS",
    np: "NP",
    avgPower: "Avg power",
    maxPower: "Max power",
    if_: "IF",
    avgHr: "Avg HR",
    maxHr: "Max HR",
    method: "Method",
    methodPower: "Power",
    methodHr: "Heart rate",
    methodNone: "No data",
    timeInZones: "Time in power zones",
    pmcTitle: "Your training-load curve (PMC)",
    pmcHint: "Fitness (CTL) · Fatigue (ATL) · Form (TSB) over real dates",
    pmcNeedMore:
      "Upload rides across several days to build your Performance Management Chart.",
    fitnessLabel: "Fitness (CTL)",
    fatigueLabel: "Fatigue (ATL)",
    formLabel: "Form (TSB)",
    finalValues: "End-of-period values",
    tsbInterpTitle: "Final TSB interpretation",
    tsbFresh:
      "Fresh / unloaded — peak form. If sustained too long, fitness loss may occur.",
    tsbRace: "Race form — optimal balance between fitness and fatigue.",
    tsbTrain:
      "Productive training — functional fatigue, normal adaptation stimulus.",
    tsbOver:
      "High accumulated fatigue — overtraining risk. Consider reducing load or adding rest.",
    noDataWarning:
      "This file has no power or heart-rate data, so its load can't be calculated.",
    noFtpWarning:
      "This ride has power but your FTP is missing. Enter your FTP above (or estimate it) to compute TSS.",
    fileError: "Couldn't process",
    footnote:
      "Power-based TSS uses normalized power (NP), intensity factor (IF) and your FTP (Coggan & Allen). When power is missing, an hrTSS is estimated from heart rate (Banister TRIMP), which is less precise. CTL (42 days), ATL (7 days) and TSB follow the Performance Management Chart impulse–response model. These are indicative estimates.",
    watts: "W",
    bpm: "bpm",
  },
};

// ─── Settings (persisted in localStorage) ───────────────────────────────────────

interface AthleteSettings {
  ftp: string;
  lthr: string;
  maxHr: string;
  restHr: string;
  sex: "m" | "f";
  seedCtl: string;
}

const DEFAULT_SETTINGS: AthleteSettings = {
  ftp: "250",
  lthr: "160",
  maxHr: "190",
  restHr: "50",
  sex: "m",
  seedCtl: "0",
};

const STORAGE_KEY = "velociencia:training-load-settings";

function loadSettings(): AthleteSettings {
  // only runs in the browser (called from a useEffect)
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AthleteSettings>;
    return {
      ftp: parsed.ftp ?? DEFAULT_SETTINGS.ftp,
      lthr: parsed.lthr ?? DEFAULT_SETTINGS.lthr,
      maxHr: parsed.maxHr ?? DEFAULT_SETTINGS.maxHr,
      restHr: parsed.restHr ?? DEFAULT_SETTINGS.restHr,
      sex: parsed.sex === "f" ? "f" : "m",
      seedCtl: parsed.seedCtl ?? DEFAULT_SETTINGS.seedCtl,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// ─── Derived per-activity metrics ───────────────────────────────────────────────

type LoadMethod = "power" | "hr" | "none";

interface ActivityMetrics {
  activity: ParsedActivity;
  method: LoadMethod;
  np: number | null;
  if_: number | null;
  tss: number | null;
  zoneTimes: ZoneTime[] | null;
  /** Power present but FTP missing → can't compute power TSS. */
  needsFtp: boolean;
}

function computeMetrics(
  activity: ParsedActivity,
  ftp: number,
  hrParams: HrParams,
): ActivityMetrics {
  const power1Hz = activity.samples.map((s) => s.power);
  const hr1Hz = activity.samples.map((s) => s.hr);

  if (activity.hasPower && ftp > 0) {
    const np = normalizedPower(power1Hz);
    const if_ = intensityFactor(np, ftp);
    const tss = tssFromPower(activity.durationSec, np, ftp);
    return {
      activity,
      method: "power",
      np: Math.round(np),
      if_,
      tss,
      zoneTimes: timeInPowerZones(power1Hz, ftp),
      needsFtp: false,
    };
  }

  if (activity.hasPower && ftp <= 0) {
    // Has power data but no usable FTP — surface a hint instead of silently
    // falling back to a possibly-misleading hrTSS.
    return { activity, method: "none", np: null, if_: null, tss: null, zoneTimes: null, needsFtp: true };
  }

  if (activity.hasHr) {
    const tss = hrTss(hr1Hz, activity.durationSec, hrParams);
    return {
      activity,
      method: "hr",
      np: null,
      if_: null,
      tss: tss > 0 ? tss : null,
      zoneTimes: null,
      needsFtp: false,
    };
  }

  return { activity, method: "none", np: null, if_: null, tss: null, zoneTimes: null, needsFtp: false };
}

// ─── Formatting helpers ──────────────────────────────────────────────────────────

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDuration(totalSec: number): string {
  const sec = Math.max(0, Math.round(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
}

function formatDate(date: Date | null, locale: Locale): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatIsoDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(y, m - 1, d));
}

const TSB_BAND_COLOR: Record<TsbBand, string> = {
  fresh: "#0891B2",
  race: "#16A34A",
  train: "#D97706",
  over: "#DC2626",
};

function getTsbText(band: TsbBand, s: Strings): string {
  switch (band) {
    case "fresh": return s.tsbFresh;
    case "race": return s.tsbRace;
    case "train": return s.tsbTrain;
    case "over": return s.tsbOver;
  }
}

const METHOD_COLOR: Record<LoadMethod, string> = {
  power: "#0891B2",
  hr: "#E11D48",
  none: "#9CA3AF",
};

// ─── Small UI helpers ────────────────────────────────────────────────────────────

interface NumberFieldProps {
  label: string;
  value: string;
  unit?: string;
  color: string;
  onChange: (v: string) => void;
}

function NumberField({ label, value, unit, color, onChange }: NumberFieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-2.5 py-1.5 text-sm text-[var(--color-text)] outline-none transition-colors"
          onFocus={(e) => (e.currentTarget.style.borderColor = color)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "")}
        />
        {unit && <span className="text-xs text-[var(--color-text-muted)]">{unit}</span>}
      </div>
    </label>
  );
}

function MethodBadge({ method, s }: { method: LoadMethod; s: Strings }) {
  const label =
    method === "power" ? s.methodPower : method === "hr" ? s.methodHr : s.methodNone;
  const color = METHOD_COLOR[method];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: color + "22", color }}
    >
      {method === "power" ? "⚡" : method === "hr" ? "❤" : "—"} {label}
    </span>
  );
}

// ─── Time-in-zones bar ─────────────────────────────────────────────────────────

function ZoneBar({ zoneTimes, locale }: { zoneTimes: ZoneTime[]; locale: Locale }) {
  const total = zoneTimes.reduce((acc, z) => acc + z.seconds, 0);
  if (total === 0) return null;
  const zoneById = new Map(POWER_ZONES.map((z) => [z.id, z]));

  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {zoneTimes.map((zt) => {
          const def = zoneById.get(zt.zoneId);
          const pct = (zt.seconds / total) * 100;
          if (pct === 0 || !def) return null;
          return (
            <div
              key={zt.zoneId}
              style={{ width: `${pct}%`, backgroundColor: def.color }}
              title={`${zoneName(def, locale)} · ${formatDuration(zt.seconds)}`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {zoneTimes.map((zt) => {
          const def = zoneById.get(zt.zoneId);
          if (zt.seconds === 0 || !def) return null;
          const pct = Math.round((zt.seconds / total) * 100);
          return (
            <span key={zt.zoneId} className="flex items-center gap-1.5 text-xs">
              <span
                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                style={{ backgroundColor: def.color }}
              />
              <span className="text-[var(--color-text-secondary)]">{def.id}</span>
              <span className="tabular-nums text-[var(--color-text-muted)]">
                {formatDuration(zt.seconds)} · {pct}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component (content only — outer card comes from the container) ─────────

export default function UploadMode({ color = "#0891B2" }: { color?: string }): React.ReactElement {
  const locale = useLocale() as Locale;
  const s = STRINGS[locale];

  const [settings, setSettings] = useState<AthleteSettings>(DEFAULT_SETTINGS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activities, setActivities] = useState<ParsedActivity[]>([]);
  const [parsing, setParsing] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [fileErrors, setFileErrors] = useState<{ fileName: string; message: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted settings on mount (browser only). Done in an effect rather
  // than a lazy initializer so the server and first client render both use the
  // defaults — reading localStorage during render would cause a hydration
  // mismatch. The post-mount setState here is intentional.
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // Persist settings whenever they change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [settings]);

  const updateSetting = useCallback(
    <K extends keyof AthleteSettings>(key: K, value: AthleteSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  // Numeric views of the settings.
  const ftp = Number(settings.ftp) || 0;
  const seedCtl = Number(settings.seedCtl) || 0;
  const hrParams: HrParams = useMemo(
    () => ({
      lthr: Number(settings.lthr) || 0,
      maxHr: Number(settings.maxHr) || 0,
      restHr: Number(settings.restHr) || 0,
      sex: settings.sex,
    }),
    [settings.lthr, settings.maxHr, settings.restHr, settings.sex],
  );

  // Per-activity metrics, recomputed when activities or settings change.
  const metrics = useMemo<ActivityMetrics[]>(
    () => activities.map((a) => computeMetrics(a, ftp, hrParams)),
    [activities, ftp, hrParams],
  );

  // PMC over real dates.
  const pmcData = useMemo(() => {
    const items: DatedTss[] = [];
    for (const m of metrics) {
      if (m.tss !== null && m.tss > 0 && m.activity.startTime) {
        items.push({ date: m.activity.startTime, tss: m.tss });
      }
    }
    return buildPmcFromActivities(items, seedCtl);
  }, [metrics, seedCtl]);

  // Chart data: index-based X axis, dates resolved via the pmcData closure.
  const chartData = useMemo(
    () => pmcData.map((p, i) => ({ idx: i, ctl: p.ctl, atl: p.atl, tsb: p.tsb })),
    [pmcData],
  );

  const xTicks = useMemo<number[]>(() => {
    const n = pmcData.length;
    if (n <= 1) return [0];
    const count = Math.min(8, n);
    const step = (n - 1) / (count - 1);
    const ticks = new Set<number>();
    for (let i = 0; i < count; i++) ticks.add(Math.round(i * step));
    return Array.from(ticks).sort((a, b) => a - b);
  }, [pmcData.length]);

  const finalPoint = pmcData.at(-1) ?? null;
  const tsbBand = finalPoint ? getTsbBand(finalPoint.tsb) : null;

  // Whether estimating FTP makes sense (some activity carries power data).
  const hasPowerData = activities.some((a) => a.hasPower);

  // ── File handling ──

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;
      setParsing(true);
      setProgress(null);
      const parsed: ParsedActivity[] = [];
      const errors: { fileName: string; message: string }[] = [];

      const errMsg = (err: unknown) =>
        err instanceof ActivityParseError || err instanceof Error ? err.message : String(err);

      for (const file of files) {
        if (file.name.toLowerCase().endsWith(".zip")) {
          // Strava bulk export → many activities. Surface live progress.
          try {
            const result = await parseStravaExport(file, (done, total) =>
              setProgress({ done, total }),
            );
            parsed.push(...result.activities);
            errors.push(...result.errors);
          } catch (err) {
            errors.push({ fileName: file.name, message: errMsg(err) });
          } finally {
            setProgress(null);
          }
        } else {
          try {
            parsed.push(await parseActivityFile(file));
          } catch (err) {
            errors.push({ fileName: file.name, message: errMsg(err) });
          }
        }
      }

      setActivities((prev) => [...prev, ...parsed]);
      setFileErrors(errors);
      setParsing(false);
    },
    [],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer?.files) void processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) void processFiles(e.target.files);
      e.target.value = ""; // allow re-selecting the same file
    },
    [processFiles],
  );

  const clearAll = useCallback(() => {
    setActivities([]);
    setFileErrors([]);
  }, []);

  const estimateFtp = useCallback(() => {
    let best20 = 0;
    for (const a of activities) {
      if (!a.hasPower) continue;
      const p = bestAveragePower(a.samples.map((sm) => sm.power), 20 * 60);
      if (p > best20) best20 = p;
    }
    const est = estimateFtpFrom20min(best20);
    if (est > 0) updateSetting("ftp", String(Math.round(est)));
  }, [activities, updateSetting]);

  const hasActivities = activities.length > 0;
  const single = metrics.length === 1 ? metrics[0] : null;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="p-5">
      {/* Privacy banner */}
      <div
        className="mb-5 flex items-start gap-3 rounded-lg border px-4 py-3"
        style={{ borderColor: color + "44", backgroundColor: color + "0F" }}
      >
        <svg
          className="mt-0.5 h-5 w-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke={color}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">{s.privacyTitle}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
            {s.privacyBody}
          </p>
        </div>
      </div>

      {/* Dropzone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors"
        style={{
          borderColor: dragOver ? color : "var(--color-border)",
          backgroundColor: dragOver ? color + "0D" : "transparent",
        }}
      >
        <svg
          className="mb-3 h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm font-semibold text-[var(--color-text)]">{s.dropTitle}</p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{s.dropHint}</p>
        <span
          className="mt-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          {s.dropButton}
        </span>
        <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">{s.formats}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".fit,.tcx,.gpx,.gz,.zip"
          multiple
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {parsing && (
        <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <span
            className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
            style={{ color }}
          />
          {progress
            ? `${s.parsingZip} — ${progress.done}/${progress.total}`
            : s.parsing}
        </p>
      )}

      {/* Per-file errors */}
      {fileErrors.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {fileErrors.map((fe, i) => (
            <div
              key={`${fe.fileName}-${i}`}
              className="rounded-md border px-3 py-2 text-xs"
              style={{ borderColor: "#DC262644", backgroundColor: "#DC26260F", color: "#DC2626" }}
            >
              <span className="font-semibold">{s.fileError}: {fe.fileName}</span>
              <span className="text-[var(--color-text-secondary)]"> — {fe.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Athlete settings */}
      <div className="mt-5 rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => setSettingsOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-sm font-semibold text-[var(--color-text)]">{s.settingsTitle}</span>
          <span className="flex items-center gap-3">
            <span className="text-xs tabular-nums text-[var(--color-text-muted)]">
              FTP {ftp} {s.watts}
            </span>
            <svg
              className="h-4 w-4 transition-transform"
              style={{ transform: settingsOpen ? "rotate(180deg)" : "none", color: "var(--color-text-muted)" }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>

        {settingsOpen && (
          <div className="border-t px-4 py-4" style={{ borderColor: "var(--color-border-light)" }}>
            <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
              {s.settingsHint}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <NumberField label={s.ftpLabel} value={settings.ftp} unit={s.watts} color={color} onChange={(v) => updateSetting("ftp", v)} />
              <NumberField label={s.lthrLabel} value={settings.lthr} unit={s.bpm} color={color} onChange={(v) => updateSetting("lthr", v)} />
              <NumberField label={s.maxHrLabel} value={settings.maxHr} unit={s.bpm} color={color} onChange={(v) => updateSetting("maxHr", v)} />
              <NumberField label={s.restHrLabel} value={settings.restHr} unit={s.bpm} color={color} onChange={(v) => updateSetting("restHr", v)} />
              <NumberField label={s.seedCtlLabel} value={settings.seedCtl} color={color} onChange={(v) => updateSetting("seedCtl", v)} />
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">{s.sexLabel}</span>
                <div className="flex h-[34px] overflow-hidden rounded-md border" style={{ borderColor: "var(--color-border)" }}>
                  {(["m", "f"] as const).map((sx) => (
                    <button
                      key={sx}
                      type="button"
                      onClick={() => updateSetting("sex", sx)}
                      className="flex-1 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: settings.sex === sx ? color : "transparent",
                        color: settings.sex === sx ? "#fff" : "var(--color-text-secondary)",
                      }}
                    >
                      {sx === "m" ? s.sexMale : s.sexFemale}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            {hasPowerData && (
              <button
                type="button"
                onClick={estimateFtp}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{ borderColor: color, color }}
                title={s.estimateFtpHint}
              >
                {s.estimateFtp}
              </button>
            )}
            <p className="mt-3 text-[11px] leading-relaxed text-[var(--color-text-muted)]">{s.seedCtlHint}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {hasActivities && (
        <div className="mt-6">
          {/* Header + clear */}
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[var(--color-text)]">
              {metrics.length === 1 ? s.oneActivity : s.activitiesCount(metrics.length)}
            </h4>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-[var(--color-text-muted)] underline-offset-2 hover:underline"
            >
              {s.clearAll}
            </button>
          </div>

          {/* Single-activity detailed breakdown */}
          {single ? (
            <SingleActivityCard m={single} s={s} locale={locale} color={color} />
          ) : (
            <ActivitiesTable metrics={metrics} s={s} locale={locale} />
          )}

          {/* PMC */}
          {pmcData.length >= 2 ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-[var(--color-text)]">{s.pmcTitle}</p>
              <p className="mb-3 mt-0.5 text-xs text-[var(--color-text-muted)]">{s.pmcHint}</p>
              <PmcChart
                data={chartData}
                xKey="idx"
                xType="number"
                xDomain={[0, pmcData.length - 1]}
                xTicks={xTicks}
                xTickFormatter={(v) => formatIsoDate(pmcData[Number(v)]?.date ?? "", locale)}
                tooltipLabelFormatter={(v) => formatIsoDate(pmcData[Number(v)]?.date ?? "", locale)}
                color={color}
                labels={{ fitness: s.fitnessLabel, fatigue: s.fatigueLabel, form: s.formLabel }}
              />

              {finalPoint && tsbBand && (
                <div
                  className="mt-5 rounded-lg p-4"
                  style={{ backgroundColor: color + "11", border: `1px solid ${color}44` }}
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                    {s.finalValues}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <FinalValue label={s.fitnessLabel} value={finalPoint.ctl} color={color} />
                    <FinalValue label={s.fatigueLabel} value={finalPoint.atl} color="#E11D48" />
                    <FinalValue
                      label={s.formLabel}
                      value={finalPoint.tsb}
                      color={TSB_BAND_COLOR[tsbBand]}
                      signed
                    />
                  </div>
                  <div
                    className="mt-4 rounded-md px-3 py-2.5 text-sm leading-snug"
                    style={{ backgroundColor: TSB_BAND_COLOR[tsbBand] + "14", borderLeft: `3px solid ${TSB_BAND_COLOR[tsbBand]}` }}
                  >
                    <span className="font-semibold" style={{ color: TSB_BAND_COLOR[tsbBand] }}>
                      {s.tsbInterpTitle}:{" "}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">{getTsbText(tsbBand, s)}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-5 rounded-md border px-3 py-2.5 text-xs text-[var(--color-text-muted)]" style={{ borderColor: "var(--color-border)" }}>
              {s.pmcNeedMore}
            </p>
          )}
        </div>
      )}

      {/* Footnote */}
      <p className="mt-6 text-xs leading-relaxed text-[var(--color-text-muted)]">{s.footnote}</p>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────────

function FinalValue({
  label,
  value,
  color,
  signed = false,
}: {
  label: string;
  value: number;
  color: string;
  signed?: boolean;
}) {
  return (
    <div>
      <p className="mb-0.5 text-xs font-medium uppercase tracking-wide" style={{ color }}>
        {label}
      </p>
      <p className="text-3xl font-bold leading-none tabular-nums" style={{ color }}>
        {signed && value >= 0 ? "+" : ""}
        {value.toFixed(1)}
      </p>
    </div>
  );
}

function SingleActivityCard({
  m,
  s,
  locale,
  color,
}: {
  m: ActivityMetrics;
  s: Strings;
  locale: Locale;
  color: string;
}) {
  const a = m.activity;
  return (
    <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {a.sport ? a.sport : s.sport} · {formatDate(a.startTime, locale)}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">{a.fileName}</p>
        </div>
        <MethodBadge method={m.method} s={s} />
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label={s.duration} value={formatDuration(a.durationSec)} />
        {m.tss !== null && <Metric label={s.tss} value={m.tss.toFixed(0)} accent={color} />}
        {m.method === "power" && m.np !== null && <Metric label={s.np} value={`${m.np} ${s.watts}`} />}
        {m.method === "power" && m.if_ !== null && <Metric label={s.if_} value={m.if_.toFixed(2)} />}
        {a.avgPower !== undefined && <Metric label={s.avgPower} value={`${a.avgPower} ${s.watts}`} />}
        {a.maxPower !== undefined && <Metric label={s.maxPower} value={`${a.maxPower} ${s.watts}`} />}
        {a.avgHr !== undefined && <Metric label={s.avgHr} value={`${a.avgHr} ${s.bpm}`} />}
        {a.maxHr !== undefined && <Metric label={s.maxHr} value={`${a.maxHr} ${s.bpm}`} />}
      </div>

      {/* Warnings */}
      {m.needsFtp && (
        <p className="mt-4 rounded-md px-3 py-2 text-xs" style={{ backgroundColor: "#D9770611", color: "#B45309" }}>
          {s.noFtpWarning}
        </p>
      )}
      {m.method === "none" && !m.needsFtp && (
        <p className="mt-4 rounded-md px-3 py-2 text-xs" style={{ backgroundColor: "#9CA3AF22", color: "var(--color-text-secondary)" }}>
          {s.noDataWarning}
        </p>
      )}

      {/* Time in zones */}
      {m.zoneTimes && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            {s.timeInZones}
          </p>
          <ZoneBar zoneTimes={m.zoneTimes} locale={locale} />
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <p className="text-lg font-bold tabular-nums" style={{ color: accent ?? "var(--color-text)" }}>
        {value}
      </p>
    </div>
  );
}

function ActivitiesTable({
  metrics,
  s,
  locale,
}: {
  metrics: ActivityMetrics[];
  s: Strings;
  locale: Locale;
}) {
  // Sort by date ascending for a chronological read.
  const rows = [...metrics].sort((a, b) => {
    const ta = a.activity.startTime?.getTime() ?? 0;
    const tb = b.activity.startTime?.getTime() ?? 0;
    return ta - tb;
  });

  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left" style={{ borderColor: "var(--color-border)" }}>
            <Th>{s.date}</Th>
            <Th>{s.duration}</Th>
            <Th align="right">{s.np}</Th>
            <Th align="right">{s.if_}</Th>
            <Th align="right">{s.tss}</Th>
            <Th>{s.method}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m, i) => (
            <tr
              key={`${m.activity.fileName}-${i}`}
              className="border-b last:border-0"
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <Td>{formatDate(m.activity.startTime, locale)}</Td>
              <Td>{formatDuration(m.activity.durationSec)}</Td>
              <Td align="right">{m.np !== null ? `${m.np}` : "—"}</Td>
              <Td align="right">{m.if_ !== null ? m.if_.toFixed(2) : "—"}</Td>
              <Td align="right">
                <span className="font-semibold tabular-nums">{m.tss !== null ? m.tss.toFixed(0) : "—"}</span>
              </Td>
              <Td>
                <MethodBadge method={m.method} s={s} />
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-3 py-2 ${align === "right" ? "text-right" : "text-left"} text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]`}
    >
      {children}
    </th>
  );
}

function Td({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <td className={`px-3 py-2 ${align === "right" ? "text-right" : "text-left"} text-[var(--color-text)]`}>
      {children}
    </td>
  );
}
