export const SECTIONS = {
  nutricion: {
    id: "nutricion",
    name: "Nutrición",
    description: "Alimentación, hidratación y suplementación para ciclistas",
    color: "#1A1D23",
    colorVar: "--color-nutricion",
    icon: "🥗",
    slug: "nutricion",
    journalist: "Martín Velasco",
  },
  ciencia: {
    id: "ciencia",
    name: "Ciencia",
    description: "Investigación científica aplicada al ciclismo",
    color: "#1A1D23",
    colorVar: "--color-ciencia",
    icon: "🔬",
    slug: "ciencia",
    journalist: "Sofía Müller",
  },
  entrenamiento: {
    id: "entrenamiento",
    name: "Entrenamiento",
    description: "Metodologías, planes y tendencias de entrenamiento",
    color: "#1A1D23",
    colorVar: "--color-entrenamiento",
    icon: "🚴",
    slug: "entrenamiento",
    journalist: "Tomás Herrera",
  },
  competencia: {
    id: "competencia",
    name: "Competencia",
    description: "Grandes vueltas, clásicas, monumentos y el pelotón profesional",
    color: "#1A1D23",
    colorVar: "--color-competencia",
    icon: "🏆",
    slug: "competencia",
    journalist: "Diego Araya",
  },
} as const;

export type SectionId = keyof typeof SECTIONS;
export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

export const SITE_NAME = "Velociencia";
export const SITE_DESCRIPTION =
  "Ciclismo basado en ciencia: nutrición, fisiología y entrenamiento";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
