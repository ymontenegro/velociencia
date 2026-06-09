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
    return RENAMED_EN_ARTICLES.map(([section, from, to]) => ({
      source: `/${section}/${from}`,
      has: [{ type: "host" as const, value: "(www\\.)?pedalsci\\.com" }],
      destination: `/${section}/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
