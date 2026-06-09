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

// Alias previsibles de las 9 tools: variantes que un usuario puede adivinar
// a partir del título mostrado, en ambas rutas /tools (EN) y /herramientas (ES).
// Los paths ya separan los locales, así que no se necesita condición de host.
const TOOL_ALIASES: Array<[from: string, to: string]> = [
  // power-zones
  ["/tools/power-zones-calculator",              "/tools/power-zones"],
  ["/herramientas/calculadora-zonas-de-potencia","/herramientas/zonas-de-potencia"],
  ["/herramientas/zonas-potencia",               "/herramientas/zonas-de-potencia"],
  // training-load
  ["/tools/training-load-calculator",              "/tools/training-load"],
  ["/herramientas/calculadora-carga-de-entrenamiento","/herramientas/carga-de-entrenamiento"],
  // carbohydrate-intake
  ["/tools/carb-intake",                          "/tools/carbohydrate-intake"],
  ["/tools/carbohydrate-intake-calculator",       "/tools/carbohydrate-intake"],
  ["/herramientas/calculadora-carbohidratos",     "/herramientas/ingesta-de-carbohidratos"],
  ["/herramientas/carbohidratos",                 "/herramientas/ingesta-de-carbohidratos"],
  // power-to-weight
  ["/tools/power-to-weight-calculator",           "/tools/power-to-weight"],
  ["/tools/watts-per-kg",                         "/tools/power-to-weight"],
  ["/herramientas/potencia-peso",                 "/herramientas/relacion-potencia-peso"],
  // vo2max-estimator
  ["/tools/vo2max",                               "/tools/vo2max-estimator"],
  ["/tools/vo2max-calculator",                    "/tools/vo2max-estimator"],
  ["/herramientas/vo2max",                        "/herramientas/estimador-vo2max"],
  // gel-comparator
  ["/tools/energy-gel-comparator",               "/tools/gel-comparator"],
  ["/herramientas/geles",                         "/herramientas/comparador-geles"],
  // supplement-evidence
  ["/tools/evidence-explorer",                   "/tools/supplement-evidence"],
  ["/tools/supplement-evidence-explorer",        "/tools/supplement-evidence"],
  ["/herramientas/suplementos",                  "/herramientas/evidencia-suplementos"],
  // climbs
  ["/tools/climbs-database",                     "/tools/climbs"],
  ["/herramientas/puertos-de-montana",           "/herramientas/puertos"],
  ["/herramientas/base-de-datos-puertos",        "/herramientas/puertos"],
  // calendar
  ["/tools/race-calendar",                       "/tools/calendar"],
  ["/tools/uci-calendar",                        "/tools/calendar"],
  ["/herramientas/calendario-uci",               "/herramientas/calendario"],
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
    return [...toolRedirects, ...articleRedirects];
  },
};

export default nextConfig;
