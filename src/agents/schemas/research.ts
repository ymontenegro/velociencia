import { z } from "zod";

export const ResearchResultSchema = z.object({
  summary: z
    .string()
    .describe("Resumen general de los hallazgos de la investigación"),
  keyFindings: z
    .array(
      z.object({
        finding: z.string().describe("Hallazgo clave"),
        confidence: z
          .enum(["high", "medium", "low"])
          .describe("Nivel de confianza en el hallazgo"),
        sourceReference: z
          .string()
          .describe("Referencia a la fuente que respalda este hallazgo"),
      })
    )
    .describe("Lista de hallazgos clave de la investigación"),
  sources: z
    .array(
      z.object({
        title: z.string().describe("Título de la fuente"),
        url: z.string().describe("URL de la fuente"),
        authors: z.string().optional().describe("Autores de la fuente"),
        publishedDate: z
          .string()
          .optional()
          .describe("Fecha de publicación"),
        abstract: z
          .string()
          .optional()
          .describe("Resumen breve de la fuente"),
        relevance: z
          .string()
          .describe("Por qué esta fuente es relevante para el tema"),
      })
    )
    .describe("Fuentes encontradas durante la investigación"),
  claimsToFactCheck: z
    .array(
      z.object({
        claim: z.string().describe("Afirmación a verificar"),
        source: z.string().describe("Dónde se encontró esta afirmación"),
        verificationStatus: z
          .enum(["verified", "unverified", "disputed"])
          .describe("Estado de verificación"),
      })
    )
    .describe("Afirmaciones que necesitan verificación adicional"),
  suggestedStructure: z
    .array(z.string())
    .describe("Estructura sugerida de secciones para el artículo"),
  dataPoints: z
    .array(
      z.object({
        metric: z.string().describe("Dato o métrica"),
        value: z.string().describe("Valor del dato"),
        source: z.string().describe("Fuente del dato"),
      })
    )
    .optional()
    .describe("Datos numéricos y métricas encontrados"),
});

export type ResearchResult = z.infer<typeof ResearchResultSchema>;
