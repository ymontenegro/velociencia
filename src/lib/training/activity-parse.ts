// ---------------------------------------------------------------------------
// Strava / Garmin activity file parser — CLIENT-SIDE ONLY.
//
// This module is invoked from a "use client" component after a user action
// (file upload). It relies on browser APIs (File, DOMParser, TextDecoder,
// DecompressionStream) and dynamic import() for code-splitting. It must NEVER
// be imported from server code or run in Node.
//
// Supported formats: .fit, .tcx, .gpx, and any of those gzip-compressed (.gz).
// All raw samples are resampled to a dense 1 Hz timeline so downstream code
// (zones, charts, NP/IF math) can assume one point per second.
// ---------------------------------------------------------------------------

export interface ActivitySample {
  /** Seconds since the start of the activity (integer, ~1 Hz). */
  t: number;
  /** Power in watts. */
  power?: number;
  /** Heart rate in beats per minute. */
  hr?: number;
  /** Cadence in rpm. */
  cadence?: number;
}

export interface ParsedActivity {
  fileName: string;
  startTime: Date | null;
  /** Elapsed duration in seconds. */
  durationSec: number;
  /** Resampled to 1 Hz: one sample per second with t = 0, 1, 2, … */
  samples: ActivitySample[];
  hasPower: boolean;
  hasHr: boolean;
  sport?: string;
  avgPower?: number;
  maxPower?: number;
  avgHr?: number;
  maxHr?: number;
}

export class ActivityParseError extends Error {
  constructor(
    message: string,
    public fileName?: string,
  ) {
    super(message);
    this.name = "ActivityParseError";
    // Preserve prototype chain when targeting older runtimes (ES2017).
    Object.setPrototypeOf(this, ActivityParseError.prototype);
  }
}

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

/**
 * A raw sample as it comes off the device, with an absolute timestamp.
 * `tsMs` is the wall-clock time in milliseconds; it gets normalised to
 * seconds-from-start during resampling.
 */
interface RawSample {
  tsMs: number;
  power?: number;
  hr?: number;
  cadence?: number;
}

/** Result of a per-format parse, before resampling. */
interface RawActivity {
  raw: RawSample[];
  startTime: Date | null;
  /** Explicit elapsed duration if the format provides it (FIT session). */
  explicitDurationSec?: number;
  sport?: string;
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

/**
 * Detects the format by file extension (.fit, .tcx, .gpx, and .gz →
 * decompress and retry), parses it, and normalises the samples to a 1 Hz
 * timeline.
 *
 * Throws {@link ActivityParseError} with a clear message on unsupported
 * formats, corrupt files, or invalid XML. It does NOT throw when the file is
 * valid but simply lacks power/HR data — in that case it returns a
 * ParsedActivity with hasPower=false / hasHr=false and lets the UI decide
 * what to show.
 */
export async function parseActivityFile(file: File): Promise<ParsedActivity> {
  // only runs in the browser
  const fileName = file.name;
  const lower = fileName.toLowerCase();

  try {
    let raw: RawActivity;

    if (lower.endsWith(".gz")) {
      raw = await parseGzipped(file, lower);
    } else if (lower.endsWith(".fit")) {
      raw = await parseFit(await file.arrayBuffer());
    } else if (lower.endsWith(".tcx")) {
      raw = parseTcx(await file.text());
    } else if (lower.endsWith(".gpx")) {
      raw = parseGpx(await file.text());
    } else {
      throw new ActivityParseError(
        "Formato no soportado. Sube un archivo .fit, .tcx o .gpx (o su versión .gz).",
        fileName,
      );
    }

    return normalize(fileName, raw);
  } catch (err) {
    if (err instanceof ActivityParseError) {
      // Ensure the file name is always attached.
      if (!err.fileName) err.fileName = fileName;
      throw err;
    }
    // Wrap any unexpected lower-level failure (corrupt buffer, decompression
    // error, SDK throw) in a domain error with context.
    const detail = err instanceof Error ? err.message : String(err);
    throw new ActivityParseError(
      `No se pudo procesar el archivo: ${detail}`,
      fileName,
    );
  }
}

// ---------------------------------------------------------------------------
// .gz handling
// ---------------------------------------------------------------------------

async function parseGzipped(
  file: File,
  lowerName: string,
): Promise<RawActivity> {
  // only runs in the browser — DecompressionStream is a browser API.
  if (typeof DecompressionStream === "undefined") {
    throw new ActivityParseError(
      "Tu navegador no soporta la descompresión de archivos .gz.",
      file.name,
    );
  }

  // Determine the real format from the extension *before* the trailing .gz,
  // e.g. "ride.fit.gz" → ".fit", "ride.tcx.gz" → ".tcx".
  const inner = lowerName.slice(0, -".gz".length);

  const decompressedStream = file
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  const response = new Response(decompressedStream);

  if (inner.endsWith(".fit")) {
    return parseFit(await response.arrayBuffer());
  }
  if (inner.endsWith(".tcx")) {
    return parseTcx(await response.text());
  }
  if (inner.endsWith(".gpx")) {
    return parseGpx(await response.text());
  }
  throw new ActivityParseError(
    "Formato comprimido no soportado. Usa .fit.gz, .tcx.gz o .gpx.gz.",
    file.name,
  );
}

// ---------------------------------------------------------------------------
// FIT parsing (Garmin SDK)
// ---------------------------------------------------------------------------

async function parseFit(buffer: ArrayBuffer): Promise<RawActivity> {
  // only runs in the browser. Dynamic import keeps the (sizable) FIT SDK in a
  // separate chunk that is only fetched when a FIT file is actually parsed.
  const { Decoder, Stream } = await import("@garmin/fitsdk");

  const stream = Stream.fromArrayBuffer(buffer);
  const decoder = new Decoder(stream);

  if (!decoder.isFIT()) {
    throw new ActivityParseError(
      "El archivo no es un FIT válido (cabecera incorrecta).",
    );
  }

  const { messages } = decoder.read({
    mergeHeartRates: true,
    convertDateTimesToDates: true,
    applyScaleAndOffset: true,
    expandComponents: true,
  });

  const msgs = messages as Record<string, unknown>;
  const recordMesgs = asRecordArray(msgs.recordMesgs);
  const sessionMesgs = asRecordArray(msgs.sessionMesgs);

  const raw: RawSample[] = [];
  for (const rec of recordMesgs) {
    const ts = asDate(rec.timestamp);
    if (!ts) continue; // a record without a timestamp can't be placed on the timeline
    raw.push({
      tsMs: ts.getTime(),
      power: asPositiveNumber(rec.power),
      hr: asPositiveNumber(rec.heartRate),
      cadence: asPositiveNumber(rec.cadence),
    });
  }

  const session = sessionMesgs[0];
  const startTime =
    raw.length > 0
      ? new Date(raw[0].tsMs)
      : (session ? asDate(session.startTime) : null) ?? null;

  // Prefer the session's elapsed time when present; fall back to timer time.
  let explicitDurationSec: number | undefined;
  if (session) {
    const elapsed =
      asNumber(session.totalElapsedTime) ?? asNumber(session.totalTimerTime);
    if (elapsed !== undefined && elapsed > 0) explicitDurationSec = elapsed;
  }

  const sport = session ? asNonEmptyString(session.sport) : undefined;

  return { raw, startTime, explicitDurationSec, sport };
}

// ---------------------------------------------------------------------------
// XML helpers (shared by TCX & GPX)
// ---------------------------------------------------------------------------

function parseXml(text: string): Document {
  // only runs in the browser — DOMParser is a browser API.
  const doc = new DOMParser().parseFromString(text, "application/xml");
  // Browsers report XML errors by inserting a <parsererror> element rather
  // than throwing.
  if (doc.querySelector("parsererror")) {
    throw new ActivityParseError("El archivo XML está corrupto o malformado.");
  }
  return doc;
}

/**
 * Finds the first descendant of `root` whose localName matches (case-
 * insensitively) any of the provided names. Matching by localName makes us
 * robust to namespace prefixes (gpxtpx:hr, ns3:hr, tpx:Watts, …).
 */
function findByLocalName(
  root: Element,
  names: readonly string[],
): Element | null {
  const wanted = names.map((n) => n.toLowerCase());
  const descendants = root.getElementsByTagName("*");
  for (let i = 0; i < descendants.length; i++) {
    const el = descendants[i];
    if (wanted.includes(el.localName.toLowerCase())) return el;
  }
  return null;
}

/** Direct-child lookup by localName (no descendants). */
function childByLocalName(
  parent: Element,
  names: readonly string[],
): Element | null {
  const wanted = names.map((n) => n.toLowerCase());
  for (let i = 0; i < parent.children.length; i++) {
    const el = parent.children[i];
    if (wanted.includes(el.localName.toLowerCase())) return el;
  }
  return null;
}

function textNumber(el: Element | null): number | undefined {
  if (!el) return undefined;
  const txt = el.textContent;
  if (txt === null) return undefined;
  const n = Number(txt.trim());
  return Number.isFinite(n) ? n : undefined;
}

// ---------------------------------------------------------------------------
// TCX parsing
// ---------------------------------------------------------------------------

function parseTcx(text: string): RawActivity {
  const doc = parseXml(text);
  const root = doc.documentElement;

  const trackpoints = doc.getElementsByTagName("Trackpoint");
  const raw: RawSample[] = [];

  for (let i = 0; i < trackpoints.length; i++) {
    const tp = trackpoints[i];

    const timeEl = childByLocalName(tp, ["Time"]);
    const tsMs = parseIsoTime(timeEl);
    if (tsMs === undefined) continue;

    // HeartRateBpm > Value
    let hr: number | undefined;
    const hrEl = childByLocalName(tp, ["HeartRateBpm"]);
    if (hrEl) hr = asPositiveNumber(textNumber(childByLocalName(hrEl, ["Value"])));

    const cadence = asPositiveNumber(textNumber(childByLocalName(tp, ["Cadence"])));

    // Power lives inside <Extensions> as a <Watts> element in the TPX
    // namespace. Match by localName to ignore the prefix.
    let power: number | undefined;
    const ext = childByLocalName(tp, ["Extensions"]);
    if (ext) {
      const wattsEl = findByLocalName(ext, ["Watts"]);
      power = asPositiveNumber(textNumber(wattsEl));
    }

    raw.push({ tsMs, power, hr, cadence });
  }

  const startTime = raw.length > 0 ? new Date(raw[0].tsMs) : null;

  // Sport is an attribute on <Activity Sport="Biking">.
  let sport: string | undefined;
  const activityEl = root.getElementsByTagName("Activity")[0];
  if (activityEl) {
    const attr = activityEl.getAttribute("Sport");
    if (attr) sport = attr;
  }

  return { raw, startTime, sport };
}

// ---------------------------------------------------------------------------
// GPX parsing
// ---------------------------------------------------------------------------

function parseGpx(text: string): RawActivity {
  const doc = parseXml(text);

  const trkpts = doc.getElementsByTagName("trkpt");
  const raw: RawSample[] = [];

  for (let i = 0; i < trkpts.length; i++) {
    const pt = trkpts[i];

    const timeEl = childByLocalName(pt, ["time"]);
    const tsMs = parseIsoTime(timeEl);
    if (tsMs === undefined) continue;

    // HR & power live inside <extensions>; prefixes vary (gpxtpx:hr, ns3:hr,
    // power, pwr:PowerInWatts, …). Search the whole point by localName.
    const hr = asPositiveNumber(
      textNumber(findByLocalName(pt, ["hr", "heartrate"])),
    );
    const cadence = asPositiveNumber(
      textNumber(findByLocalName(pt, ["cad", "cadence"])),
    );
    const power = asPositiveNumber(
      textNumber(findByLocalName(pt, ["power", "powerinwatts", "watts"])),
    );

    raw.push({ tsMs, power, hr, cadence });
  }

  const startTime = raw.length > 0 ? new Date(raw[0].tsMs) : null;

  // GPX optionally carries a <type> under <trk>.
  let sport: string | undefined;
  const trk = doc.getElementsByTagName("trk")[0];
  if (trk) {
    const typeEl = childByLocalName(trk, ["type"]);
    const typeTxt = typeEl?.textContent?.trim();
    if (typeTxt) sport = typeTxt;
  }

  return { raw, startTime, sport };
}

function parseIsoTime(el: Element | null): number | undefined {
  if (!el) return undefined;
  const txt = el.textContent;
  if (txt === null) return undefined;
  const ms = Date.parse(txt.trim());
  return Number.isNaN(ms) ? undefined : ms;
}

// ---------------------------------------------------------------------------
// Resampling to 1 Hz + aggregate stats
// ---------------------------------------------------------------------------

function normalize(fileName: string, parsed: RawActivity): ParsedActivity {
  const raw = parsed.raw;

  if (raw.length === 0) {
    // Valid file, but no usable trackpoints/records. Return an empty,
    // well-formed activity rather than throwing — the UI handles "no data".
    return {
      fileName,
      startTime: parsed.startTime,
      durationSec: parsed.explicitDurationSec
        ? Math.round(parsed.explicitDurationSec)
        : 0,
      samples: [],
      hasPower: false,
      hasHr: false,
      sport: parsed.sport,
    };
  }

  // Sort by timestamp defensively (some files interleave laps).
  raw.sort((a, b) => a.tsMs - b.tsMs);

  const startMs = raw[0].tsMs;
  const endMs = raw[raw.length - 1].tsMs;

  // Convert each raw sample to seconds-from-start.
  interface RelSample {
    sec: number;
    power?: number;
    hr?: number;
    cadence?: number;
  }
  const rel: RelSample[] = raw.map((s) => ({
    sec: (s.tsMs - startMs) / 1000,
    power: s.power,
    hr: s.hr,
    cadence: s.cadence,
  }));

  const spanSec = (endMs - startMs) / 1000;
  // Prefer the format's explicit elapsed time (FIT session) when it's at least
  // as long as the recorded span; otherwise use the recorded span.
  const explicit = parsed.explicitDurationSec;
  const durationSec = Math.round(
    explicit !== undefined && explicit >= spanSec ? explicit : spanSec,
  );

  // Build a dense 1 Hz timeline. Garmin "smart recording" emits samples
  // irregularly (every few seconds), so for each whole second we forward-fill
  // from the most recent raw sample at or before that second, per channel.
  // Forward-fill (rather than nearest) is correct for power/HR/cadence, which
  // are step-like telemetry channels.
  const lastSec = Math.floor(spanSec);
  const samples: ActivitySample[] = [];

  let idx = 0;
  let lastPower: number | undefined;
  let lastHr: number | undefined;
  let lastCadence: number | undefined;

  for (let sec = 0; sec <= lastSec; sec++) {
    // Advance the cursor over every raw sample whose time has been reached,
    // updating the carried-forward values per channel (a sample may carry only
    // some channels).
    while (idx < rel.length && rel[idx].sec <= sec) {
      const r = rel[idx];
      if (r.power !== undefined) lastPower = r.power;
      if (r.hr !== undefined) lastHr = r.hr;
      if (r.cadence !== undefined) lastCadence = r.cadence;
      idx++;
    }

    const sample: ActivitySample = { t: sec };
    if (lastPower !== undefined) sample.power = lastPower;
    if (lastHr !== undefined) sample.hr = lastHr;
    if (lastCadence !== undefined) sample.cadence = lastCadence;
    samples.push(sample);
  }

  // Aggregate stats over valid (> 0) samples.
  let powerSum = 0;
  let powerCount = 0;
  let maxPower = 0;
  let hrSum = 0;
  let hrCount = 0;
  let maxHr = 0;

  for (const s of samples) {
    if (s.power !== undefined && s.power > 0) {
      powerSum += s.power;
      powerCount++;
      if (s.power > maxPower) maxPower = s.power;
    }
    if (s.hr !== undefined && s.hr > 0) {
      hrSum += s.hr;
      hrCount++;
      if (s.hr > maxHr) maxHr = s.hr;
    }
  }

  const hasPower = powerCount > 0;
  const hasHr = hrCount > 0;

  return {
    fileName,
    startTime: parsed.startTime ?? new Date(startMs),
    durationSec,
    samples,
    hasPower,
    hasHr,
    sport: parsed.sport,
    avgPower: hasPower ? Math.round(powerSum / powerCount) : undefined,
    maxPower: hasPower ? maxPower : undefined,
    avgHr: hasHr ? Math.round(hrSum / hrCount) : undefined,
    maxHr: hasHr ? maxHr : undefined,
  };
}

// ---------------------------------------------------------------------------
// Safe narrowing helpers (FIT SDK returns loosely-typed records)
// ---------------------------------------------------------------------------

function asRecordArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is Record<string, unknown> => typeof v === "object" && v !== null,
  );
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/** A finite number strictly greater than 0, else undefined. */
function asPositiveNumber(value: unknown): number | undefined {
  const n = asNumber(value);
  return n !== undefined && n > 0 ? n : undefined;
}

function asDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  return null;
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const t = value.trim();
    return t.length > 0 ? t : undefined;
  }
  return undefined;
}
