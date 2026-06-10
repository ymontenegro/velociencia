import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // SAMEORIGIN (no DENY): AdSense/Funding Choices usan iframes propios,
  // pero nadie externo debería poder embeber el sitio.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// Alias previsibles de las tools: variantes que un usuario puede adivinar
// a partir del título mostrado. Calculator aliases apuntan a /herramientas|/tools;
// dataset aliases apuntan ya al destino final /datos|/data (sin doble salto).
// Los paths ya separan los locales, así que no se necesita condición de host.
const TOOL_ALIASES: Array<[from: string, to: string]> = [
  // ── Calculadoras (/herramientas | /tools) ───────────────────────────────
  // power-zones
  ["/tools/power-zones-calculator",                    "/tools/power-zones"],
  ["/herramientas/calculadora-zonas-de-potencia",      "/herramientas/zonas-de-potencia"],
  ["/herramientas/zonas-potencia",                     "/herramientas/zonas-de-potencia"],
  // training-load
  ["/tools/training-load-calculator",                  "/tools/training-load"],
  ["/herramientas/calculadora-carga-de-entrenamiento", "/herramientas/carga-de-entrenamiento"],
  // carbohydrate-intake
  ["/tools/carb-intake",                               "/tools/carbohydrate-intake"],
  ["/tools/carbohydrate-intake-calculator",            "/tools/carbohydrate-intake"],
  ["/herramientas/calculadora-carbohidratos",          "/herramientas/ingesta-de-carbohidratos"],
  ["/herramientas/carbohidratos",                      "/herramientas/ingesta-de-carbohidratos"],
  // power-to-weight
  ["/tools/power-to-weight-calculator",                "/tools/power-to-weight"],
  ["/tools/watts-per-kg",                              "/tools/power-to-weight"],
  ["/herramientas/potencia-peso",                      "/herramientas/relacion-potencia-peso"],
  // vo2max-estimator
  ["/tools/vo2max",                                    "/tools/vo2max-estimator"],
  ["/tools/vo2max-calculator",                         "/tools/vo2max-estimator"],
  ["/herramientas/vo2max",                             "/herramientas/estimador-vo2max"],

  // ── Datasets — apuntan directo a /datos|/data (sin doble salto) ─────────
  // gel-comparator
  ["/tools/energy-gel-comparator",                     "/data/gel-comparator"],
  ["/herramientas/geles",                              "/datos/comparador-geles"],
  // supplement-evidence
  ["/tools/evidence-explorer",                         "/data/supplement-evidence"],
  ["/tools/supplement-evidence-explorer",              "/data/supplement-evidence"],
  ["/herramientas/suplementos",                        "/datos/evidencia-suplementos"],
  // climbs
  ["/tools/climbs-database",                           "/data/climbs"],
  ["/herramientas/puertos-de-montana",                 "/datos/puertos"],
  ["/herramientas/base-de-datos-puertos",              "/datos/puertos"],
  // calendar
  ["/tools/race-calendar",                             "/data/calendar"],
  ["/tools/uci-calendar",                              "/data/calendar"],
  ["/herramientas/calendario-uci",                     "/datos/calendario"],
];

// Movimiento 308: los 4 datasets se mueven de /herramientas|/tools al nuevo
// dominio /datos (ES) | /data (EN). URLs canónicas antiguas que pueden estar
// indexadas en Google — redirigimos con 308 para no perder el equity.
const DATASET_MOVES: Array<[from: string, to: string]> = [
  // ES: /herramientas → /datos
  ["/herramientas/comparador-geles",       "/datos/comparador-geles"],
  ["/herramientas/evidencia-suplementos",  "/datos/evidencia-suplementos"],
  ["/herramientas/puertos",                "/datos/puertos"],
  ["/herramientas/calendario",             "/datos/calendario"],
  // EN: /tools → /data
  ["/tools/gel-comparator",                "/data/gel-comparator"],
  ["/tools/supplement-evidence",           "/data/supplement-evidence"],
  ["/tools/climbs",                        "/data/climbs"],
  ["/tools/calendar",                      "/data/calendar"],
];

// 11 artículos EN publicados originalmente con slug en español y renombrados
// a slug en inglés (2026-06). Las URLs antiguas pueden estar indexadas:
// redirigimos 301 en el dominio EN para no perder ese tráfico.
const RENAMED_EN_ARTICLES: Array<[section: string, from: string, to: string]> = [
  ["science", "cinetica-vo2-velocidad-respuesta-ciclismo", "vo2-kinetics-speed-of-response-cycling"],
  ["science", "drift-cardiaco-ciclismo-frecuencia-cardiaca", "cardiovascular-drift-cycling-heart-rate"],
  ["science", "eficiencia-gruesa-ciclismo-indicador-rendimiento", "gross-efficiency-cycling-performance-indicator"],
  ["science", "fatmax-oxidacion-grasas-ciclismo", "fatmax-fat-oxidation-cycling"],
  ["science", "reserva-anaerobica-w-prima-ciclismo", "w-prime-anaerobic-reserve-cycling"],
  ["competition", "criterium-dauphine-2026-previa-favoritos", "criterium-du-dauphine-2026-preview-favorites"],
  ["competition", "tour-de-suisse-2026-previa-pogacar", "tour-de-suisse-2026-preview-pogacar"],
  ["training", "carga-entrenamiento-ctl-atl-tsb-performance-management-chart", "training-load-ctl-atl-tsb-performance-management-chart"],
  ["training", "intervalos-largos-vo2max-4x8-5x5-3x12-ciclismo", "long-intervals-vo2max-4x8-5x5-3x12-cycling"],
  ["nutrition", "antocianinas-cerezas-acidas-recuperacion-ciclismo", "anthocyanins-tart-cherry-recovery-cycling"],
  ["nutrition", "entrenar-el-intestino-carbohidratos", "train-the-gut-carbohydrates-cycling"],
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Dataset movement redirects (308) must come BEFORE alias redirects so that
    // a request to e.g. /herramientas/puertos hits the movement rule first and
    // lands on /datos/puertos without a second hop.
    const datasetMoveRedirects = DATASET_MOVES.map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
    const toolRedirects = TOOL_ALIASES.map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
    const articleRedirects = RENAMED_EN_ARTICLES.map(([section, from, to]) => ({
      source: `/${section}/${from}`,
      has: [{ type: "host" as const, value: "(www\\.)?pedalsci\\.com" }],
      destination: `/${section}/${to}`,
      permanent: true,
    }));
    return [...datasetMoveRedirects, ...toolRedirects, ...articleRedirects];
  },
};

export default nextConfig;
