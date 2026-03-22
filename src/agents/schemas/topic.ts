import { z } from "zod";

export const TopicProposalSchema = z.object({
  topics: z.array(
    z.object({
      title: z.string().describe("Título del artículo en español"),
      description: z
        .string()
        .describe("Descripción de 2-3 oraciones del alcance del artículo"),
      angle: z.string().describe("El ángulo editorial específico"),
      suggestedKeywords: z
        .array(z.string())
        .describe("5-8 palabras clave para investigación"),
      priority: z
        .number()
        .min(1)
        .max(10)
        .describe("Prioridad, 10 = más urgente/trending"),
      reasoning: z
        .string()
        .describe("Por qué este tema vale la pena cubrir ahora"),
    })
  ),
});

export type TopicProposal = z.infer<typeof TopicProposalSchema>;
