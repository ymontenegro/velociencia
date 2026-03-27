import { z } from "zod";

export const EditorReviewSchema = z.object({
  decision: z
    .enum(["approve", "reject", "revise"])
    .describe("Decisión editorial: aprobar, rechazar o solicitar revisión"),
  score: z
    .number()
    .min(0)
    .max(10)
    .describe(
      "Puntuación general del artículo de 0 a 10. Precisión (40%), Calidad (30%), Engagement (20%), SEO (10%)"
    ),
  overallAssessment: z
    .string()
    .describe("Evaluación general del artículo en 2-3 párrafos"),
  scores: z.object({
    accuracy: z
      .number()
      .min(0)
      .max(10)
      .describe("Puntuación de precisión y rigor factual (0-10)"),
    quality: z
      .number()
      .min(0)
      .max(10)
      .describe("Puntuación de calidad de escritura (0-10)"),
    engagement: z
      .number()
      .min(0)
      .max(10)
      .describe("Puntuación de capacidad de engagement del lector (0-10)"),
    seo: z
      .number()
      .min(0)
      .max(10)
      .describe("Puntuación de optimización SEO (0-10)"),
  }),
  factCheckIssues: z
    .array(
      z.object({
        claim: z.string().describe("La afirmación problemática"),
        issue: z.string().describe("El problema identificado"),
        severity: z
          .enum(["critical", "major", "minor"])
          .describe("Severidad del problema"),
        suggestion: z.string().describe("Sugerencia para corregir"),
      })
    )
    .describe("Problemas de fact-checking encontrados"),
  styleIssues: z
    .array(
      z.object({
        location: z
          .string()
          .describe("Ubicación aproximada en el artículo"),
        issue: z.string().describe("El problema de estilo identificado"),
        category: z
          .enum(["bullet_list", "chatgpt_language", "empty_adjective", "generic_transition", "generic_subtitle", "other"])
          .describe("Categoría del problema: uso de listas, lenguaje ChatGPT, adjetivos vacíos, transiciones genéricas, subtítulos genéricos, u otro"),
        suggestion: z.string().describe("Sugerencia para mejorar"),
      })
    )
    .describe("Problemas de estilo encontrados, incluyendo uso de listas con viñetas, lenguaje ChatGPT, y adjetivos vacíos"),
  sourceVerification: z
    .array(
      z.object({
        source: z.string().describe("Título o referencia de la fuente verificada"),
        status: z
          .enum(["verified", "suspicious", "unverifiable", "broken_url"])
          .describe("Estado de verificación: verificada, sospechosa, no verificable, o URL rota"),
        note: z.string().describe("Nota sobre la verificación"),
      })
    )
    .describe("Resultado de la verificación de cada fuente citada en el artículo"),
  copyrightIssues: z
    .array(
      z.object({
        location: z.string().describe("Ubicación del contenido sospechoso"),
        issue: z.string().describe("Descripción del posible problema de derechos de autor"),
        severity: z
          .enum(["critical", "warning"])
          .describe("Severidad: critical si es plagio directo, warning si es parafraseo muy cercano"),
      })
    )
    .describe("Problemas de derechos de autor detectados (plagio, copia textual de fuentes)"),
  imageSuggestions: z
    .array(
      z.object({
        section: z.string().describe("Sección del artículo donde iría la imagen"),
        description: z.string().describe("Descripción de la imagen ideal"),
        searchQuery: z.string().describe("Query de búsqueda sugerida para Unsplash/Pexels/Pixabay"),
        placement: z
          .enum(["hero", "inline", "section_break"])
          .describe("Tipo de ubicación: portada del artículo, dentro del texto, o separador de sección"),
      })
    )
    .describe("Sugerencias de imágenes gratuitas (Unsplash, Pexels, Pixabay) para acompañar el artículo"),
  suggestedImprovements: z
    .array(z.string())
    .describe("Lista de mejoras sugeridas para el artículo"),
  rejectionReason: z
    .string()
    .nullable()
    .describe(
      "Razón principal del rechazo (solo si la decisión es rechazar)"
    ),
});

export type EditorReview = z.infer<typeof EditorReviewSchema>;
