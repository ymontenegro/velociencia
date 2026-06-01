import { POWER_ZONES } from "@/lib/training/zones";

/**
 * Métricas de carga de entrenamiento de ciclismo.
 *
 * Módulo PURO: sin DOM, sin React, sin side-effects. Solo cálculo numérico.
 *
 * Las fórmulas siguen el marco de Andrew Coggan & Hunter Allen,
 * "Training and Racing with a Power Meter" (3.ª ed., VeloPress, 2019),
 * que es el estándar de facto para potencia normalizada (NP), factor de
 * intensidad (IF) y Training Stress Score (TSS). El método hrTSS (estimación
 * de TSS a partir de frecuencia cardíaca) se basa en el TRIMP exponencial de
 * Banister/Morton y en la implementación de TrainingPeaks. Ver citas en cada
 * función.
 *
 * Todas las series de tiempo se asumen muestreadas a 1 Hz (una muestra por
 * segundo). Los huecos (null/undefined) se tratan como 0 W / sin dato según
 * corresponda. Las funciones son defensivas en los bordes (FTP ≤ 0, series
 * vacías, valores no finitos) y devuelven 0 en vez de propagar NaN/Infinity.
 */

const NP_WINDOW_SECONDS = 30; // Coggan: media móvil de 30 s para NP

/** Convierte un valor potencialmente null/undefined/NaN a un número finito ≥ 0. */
function sanitizePower(value: number | null | undefined): number {
  if (value == null || !Number.isFinite(value) || value < 0) return 0;
  return value;
}

/** Restringe `value` al intervalo [min, max]. */
function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Potencia Normalizada (NP), Coggan & Allen (2019), cap. 7.
 *
 * Algoritmo:
 *   1. Media móvil de 30 s de la serie de potencia (rolling average).
 *   2. Elevar cada valor de esa media a la 4.ª potencia.
 *   3. Promediar todos esos valores a la 4.ª.
 *   4. Sacar la raíz 4.ª del promedio.
 *
 * La elevación a la 4.ª pondera fuertemente los esfuerzos altos, reflejando el
 * coste fisiológico no lineal de la intensidad. Los huecos (null/undefined) se
 * tratan como 0 W dentro de la ventana móvil.
 *
 * Si hay menos de 30 muestras válidas en total, no se puede formar una ventana
 * completa de 30 s: en ese caso se usa la media simple de las muestras
 * disponibles elevada a la 4.ª (es decir, NP degrada a la media a la 4.ª de lo
 * que haya). Devuelve 0 si no hay datos.
 *
 * @param power1Hz serie de potencia (W) muestreada a 1 Hz.
 * @returns potencia normalizada en vatios (≥ 0), o 0 si no hay datos.
 */
export function normalizedPower(power1Hz: Array<number | null | undefined>): number {
  if (!Array.isArray(power1Hz) || power1Hz.length === 0) return 0;

  const samples = power1Hz.map(sanitizePower);
  const n = samples.length;

  // Si no alcanza para una ventana de 30 s, degradar a la media simple^4.
  if (n < NP_WINDOW_SECONDS) {
    const sum = samples.reduce((acc, w) => acc + w, 0);
    const mean = sum / n;
    return Number.isFinite(mean) && mean > 0 ? mean : 0;
  }

  // Paso 1: media móvil de 30 s con suma deslizante O(n).
  // Paso 2-3: acumular la 4.ª potencia de cada media móvil.
  let windowSum = 0;
  for (let i = 0; i < NP_WINDOW_SECONDS; i++) windowSum += samples[i];

  let sumOfFourthPowers = 0;
  let windowCount = 0;

  // Primera ventana (muestras [0..29]).
  let rollingAvg = windowSum / NP_WINDOW_SECONDS;
  sumOfFourthPowers += rollingAvg ** 4;
  windowCount++;

  // Ventanas siguientes: desliza una muestra a la vez.
  for (let i = NP_WINDOW_SECONDS; i < n; i++) {
    windowSum += samples[i] - samples[i - NP_WINDOW_SECONDS];
    rollingAvg = windowSum / NP_WINDOW_SECONDS;
    sumOfFourthPowers += rollingAvg ** 4;
    windowCount++;
  }

  // Paso 3-4: promedio de las 4.ª potencias y raíz 4.ª.
  const meanFourthPower = sumOfFourthPowers / windowCount;
  const np = meanFourthPower ** 0.25;
  return Number.isFinite(np) && np > 0 ? np : 0;
}

/**
 * Factor de Intensidad (IF), Coggan & Allen (2019), cap. 7.
 *
 *   IF = NP / FTP
 *
 * Es la fracción del umbral funcional de potencia a la que se realizó el
 * esfuerzo. Una hora exactamente al FTP da IF = 1.0.
 *
 * @param np potencia normalizada (W).
 * @param ftp Functional Threshold Power (W).
 * @returns IF (adimensional, ≥ 0), o 0 si FTP ≤ 0 o entradas no finitas.
 */
export function intensityFactor(np: number, ftp: number): number {
  if (!Number.isFinite(np) || !Number.isFinite(ftp) || ftp <= 0 || np < 0) {
    return 0;
  }
  const value = np / ftp;
  return Number.isFinite(value) ? value : 0;
}

/**
 * Training Stress Score (TSS), Coggan & Allen (2019), cap. 7.
 *
 *   TSS = (durationSec · NP · IF) / (FTP · 3600) · 100
 *
 * donde IF = NP / FTP se calcula internamente. Por definición, una hora
 * exactamente al FTP (NP = FTP, IF = 1) produce TSS = 100.
 *
 * Forma equivalente útil para verificar:
 *   TSS = (durationSec / 3600) · IF^2 · 100
 *
 * @param durationSec duración del esfuerzo en segundos.
 * @param np potencia normalizada (W).
 * @param ftp Functional Threshold Power (W).
 * @returns TSS (≥ 0), o 0 si las entradas no son válidas.
 */
export function tssFromPower(durationSec: number, np: number, ftp: number): number {
  if (
    !Number.isFinite(durationSec) ||
    !Number.isFinite(np) ||
    !Number.isFinite(ftp) ||
    durationSec <= 0 ||
    ftp <= 0 ||
    np < 0
  ) {
    return 0;
  }
  const intensity = intensityFactor(np, ftp); // IF = NP / FTP
  const tss = (durationSec * np * intensity) / (ftp * 3600) * 100;
  return Number.isFinite(tss) && tss > 0 ? tss : 0;
}

export interface HrParams {
  /** Lactate Threshold Heart Rate (lpm). */
  lthr: number;
  /** Frecuencia cardíaca máxima (lpm). */
  maxHr: number;
  /** Frecuencia cardíaca en reposo (lpm). */
  restHr: number;
  /** Sexo biológico, para el coeficiente del TRIMP exponencial. */
  sex: "m" | "f";
}

// Coeficientes del TRIMP exponencial de Banister (1991) / Morton et al. (1990).
const TRIMP_K_MALE = 1.92;
const TRIMP_K_FEMALE = 1.67;
const TRIMP_BASE_FACTOR = 0.64;

/**
 * Calcula el TRIMP exponencial de Banister para un único intervalo.
 *
 *   TRIMP = dt(min) · HRr · 0.64 · e^(k · HRr)
 *
 * @param dtMinutes duración del intervalo en minutos.
 * @param hrReserveFraction HRr = (HR − restHR)/(maxHR − restHR), clamp [0,1].
 * @param k coeficiente sexo-específico (1.92 hombres / 1.67 mujeres).
 */
function banisterTrimp(dtMinutes: number, hrReserveFraction: number, k: number): number {
  const hrr = clamp(hrReserveFraction, 0, 1);
  return dtMinutes * hrr * TRIMP_BASE_FACTOR * Math.exp(k * hrr);
}

/**
 * hrTSS — estimación de TSS a partir de frecuencia cardíaca (fallback sin
 * potencia).
 *
 * Método (TRIMP exponencial de Banister, normalizado al estilo TrainingPeaks):
 *   1. Para cada muestra (1 Hz, dt = 1 s = 1/60 min) calcular la reserva de
 *      frecuencia cardíaca HRr = (HR − restHR)/(maxHR − restHR), clamp [0,1].
 *   2. TRIMP por segundo = dt(min) · HRr · 0.64 · e^(k · HRr),
 *      con k = 1.92 (hombres) / 1.67 (mujeres).
 *   3. Sumar el TRIMP de toda la sesión.
 *   4. NORMALIZAR dividiendo por el TRIMP de 60 min sostenidos a LTHR y
 *      multiplicar por 100, de modo que 1 h a LTHR ≈ 100 (escala comparable a
 *      TSS). El HRr de referencia es HRr_lthr = (LTHR − restHR)/(maxHR − restHR).
 *
 * Referencias:
 *   - Banister, E.W. (1991). "Modeling elite athletic performance." En
 *     Physiological Testing of the High-Performance Athlete, 2.ª ed.
 *   - Morton, R.H., Fitz-Clarke, J.R., Banister, E.W. (1990). "Modeling human
 *     performance in running." J Appl Physiol 69(3):1171-1177 — origen del
 *     factor 0.64 y los coeficientes k = 1.92 (M) / 1.67 (F).
 *   - TrainingPeaks: método hrTSS, que escala el TRIMP de sesión contra el
 *     TRIMP de 1 h al umbral lactato (LTHR) para obtener una escala 0–100/h.
 *
 * Siempre es una estimación: la FC tiene deriva cardíaca, latencia y depende de
 * temperatura/hidratación, por lo que es menos precisa que el TSS por potencia.
 *
 * @param hr1Hz serie de FC (lpm) muestreada a 1 Hz; huecos se ignoran.
 * @param durationSec duración total de la sesión (no usado para escalar el
 *   resultado, que proviene de la integral del TRIMP; se valida por robustez).
 * @param params LTHR, maxHr, restHr y sexo.
 * @returns hrTSS estimado (≥ 0), o 0 si faltan datos válidos.
 */
export function hrTss(
  hr1Hz: Array<number | null | undefined>,
  durationSec: number,
  params: HrParams,
): number {
  if (!Array.isArray(hr1Hz) || hr1Hz.length === 0) return 0;
  if (!params) return 0;

  const { lthr, maxHr, restHr, sex } = params;

  // Validación de parámetros fisiológicos. El rango (maxHr − restHr) debe ser
  // positivo para que la reserva cardíaca tenga sentido.
  if (
    !Number.isFinite(lthr) ||
    !Number.isFinite(maxHr) ||
    !Number.isFinite(restHr) ||
    maxHr <= restHr ||
    lthr <= restHr
  ) {
    return 0;
  }
  if (!Number.isFinite(durationSec) || durationSec <= 0) return 0;

  const k = sex === "f" ? TRIMP_K_FEMALE : TRIMP_K_MALE;
  const hrReserveRange = maxHr - restHr;
  const dtMinutes = 1 / 60; // 1 muestra a 1 Hz = 1 s

  // Paso 1-3: integrar el TRIMP de la sesión sobre las muestras válidas.
  let sessionTrimp = 0;
  let validSamples = 0;
  for (const raw of hr1Hz) {
    if (raw == null || !Number.isFinite(raw)) continue;
    const hrr = (raw - restHr) / hrReserveRange;
    sessionTrimp += banisterTrimp(dtMinutes, hrr, k);
    validSamples++;
  }

  if (validSamples === 0 || sessionTrimp <= 0) return 0;

  // Paso 4: TRIMP de referencia = 60 min sostenidos a LTHR.
  const lthrReserveFraction = (lthr - restHr) / hrReserveRange;
  const referenceTrimp = banisterTrimp(60, lthrReserveFraction, k);
  if (!Number.isFinite(referenceTrimp) || referenceTrimp <= 0) return 0;

  const result = (sessionTrimp / referenceTrimp) * 100;
  return Number.isFinite(result) && result > 0 ? result : 0;
}

/**
 * Mejor potencia media sostenida en una ventana de `windowSec` segundos.
 *
 * Útil para estimar FTP (p. ej. mejor potencia media de 20 min). Usa una suma
 * deslizante (basada en sumas de prefijo) para complejidad O(n). Los huecos se
 * tratan como 0 W.
 *
 * Si la serie es más corta que `windowSec`, no existe ninguna ventana completa
 * de esa duración → devuelve 0.
 *
 * @param power1Hz serie de potencia (W) a 1 Hz.
 * @param windowSec ancho de la ventana en segundos (> 0).
 * @returns mejor media móvil de la ventana (W, ≥ 0), o 0 si no aplica.
 */
export function bestAveragePower(
  power1Hz: Array<number | null | undefined>,
  windowSec: number,
): number {
  if (!Array.isArray(power1Hz) || power1Hz.length === 0) return 0;
  if (!Number.isFinite(windowSec) || windowSec <= 0) return 0;

  const window = Math.floor(windowSec);
  const n = power1Hz.length;
  if (window > n) return 0;

  const samples = power1Hz.map(sanitizePower);

  // Suma deslizante O(n): mantener la suma de la ventana actual.
  let windowSum = 0;
  for (let i = 0; i < window; i++) windowSum += samples[i];

  let best = windowSum;
  for (let i = window; i < n; i++) {
    windowSum += samples[i] - samples[i - window];
    if (windowSum > best) best = windowSum;
  }

  const avg = best / window;
  return Number.isFinite(avg) && avg > 0 ? avg : 0;
}

/**
 * Estimación de FTP a partir de la mejor potencia media de 20 min.
 *
 *   FTP ≈ 0.95 × mejor potencia media de 20 min
 *
 * El factor 0.95 es el descuento estándar del test de 20 min de Coggan & Allen
 * (2019): se asume que la potencia sostenible 1 h (FTP por definición) es ~95 %
 * de la sostenible 20 min.
 *
 * @param best20MinAvgPower mejor potencia media de 20 min (W).
 * @returns FTP estimado (W, ≥ 0), o 0 si la entrada no es válida.
 */
export function estimateFtpFrom20min(best20MinAvgPower: number): number {
  if (!Number.isFinite(best20MinAvgPower) || best20MinAvgPower <= 0) return 0;
  const ftp = best20MinAvgPower * 0.95;
  return Number.isFinite(ftp) && ftp > 0 ? ftp : 0;
}

export interface ZoneTime {
  zoneId: string;
  seconds: number;
}

/**
 * Segundos acumulados en cada zona de potencia de Coggan.
 *
 * Cada muestra a 1 Hz cuenta como 1 segundo. Para cada muestra válida se
 * calcula el porcentaje de FTP (pct = 100 · W / FTP) y se asigna a la zona cuyo
 * intervalo [pctLow, pctHigh) la contiene. La última zona (Z7) está abierta
 * hacia arriba (pctHigh = null), por lo que captura todo lo que supere su
 * pctLow.
 *
 * Convención de bordes: intervalo semiabierto [pctLow, pctHigh). El extremo
 * inferior de la primera zona se trata como cerrado hacia abajo (pct < pctLow
 * de Z1, es decir potencia muy baja o 0, cae igualmente en Z1, que arranca en
 * pctLow = 0). El uso de POWER_ZONES garantiza cobertura contigua.
 *
 * Las zonas se devuelven en el mismo orden que POWER_ZONES, e incluye todas las
 * zonas (con seconds = 0 si no se acumuló tiempo).
 *
 * Definición de zonas: Coggan & Allen (2019), cap. 4 (siete niveles).
 *
 * @param power1Hz serie de potencia (W) a 1 Hz.
 * @param ftp Functional Threshold Power (W).
 * @returns array de { zoneId, seconds } en el orden de POWER_ZONES.
 */
export function timeInPowerZones(
  power1Hz: Array<number | null | undefined>,
  ftp: number,
): ZoneTime[] {
  // Inicializar el acumulador en orden de POWER_ZONES (incluye zonas con 0 s).
  const result: ZoneTime[] = POWER_ZONES.map((z) => ({ zoneId: z.id, seconds: 0 }));

  if (!Array.isArray(power1Hz) || power1Hz.length === 0) return result;
  if (!Number.isFinite(ftp) || ftp <= 0) return result;

  for (const raw of power1Hz) {
    if (raw == null || !Number.isFinite(raw) || raw < 0) continue;
    const pct = (raw / ftp) * 100;
    if (!Number.isFinite(pct)) continue;

    // Encontrar la zona contenedora: [pctLow, pctHigh), Z7 abierta (pctHigh null).
    let matchedIndex = -1;
    for (let z = 0; z < POWER_ZONES.length; z++) {
      const zone = POWER_ZONES[z];
      const aboveLow = pct >= zone.pctLow;
      const belowHigh = zone.pctHigh == null ? true : pct < zone.pctHigh;
      if (aboveLow && belowHigh) {
        matchedIndex = z;
        break;
      }
    }

    // Salvaguarda: potencia por debajo del pctLow de la primera zona → Z1.
    if (matchedIndex === -1) matchedIndex = 0;

    result[matchedIndex].seconds += 1;
  }

  return result;
}
