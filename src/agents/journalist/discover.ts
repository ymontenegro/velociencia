import { openai, MODELS } from "@/lib/openai";
import { db } from "@/lib/db";
import { topics, agentRuns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SECTIONS, type SectionId } from "@/lib/constants";
import { zodResponseFormat } from "openai/helpers/zod";
import { TopicProposalSchema } from "../schemas/topic";
import {
  JOURNALIST_SYSTEM_PROMPT,
  JOURNALIST_DISCOVER_PROMPT,
  getSectionPrompt,
} from "../prompts";

export async function discoverTopics(section: SectionId): Promise<number> {
  const startTime = Date.now();
  const sectionConfig = SECTIONS[section];

  console.log(`[DISCOVER] Iniciando descubrimiento de temas para sección: ${sectionConfig.name}`);

  // Create agent run record
  const [agentRun] = await db
    .insert(agentRuns)
    .values({
      agentType: "journalist",
      phase: "discover",
      section,
      status: "running",
      model: MODELS.journalist,
      startedAt: new Date(),
    })
    .returning();

  try {
    // Get existing topics to avoid duplicates
    const existingTopics = await db
      .select({ title: topics.title })
      .from(topics)
      .where(eq(topics.section, section));

    const existingTitles = existingTopics.map((t) => t.title);

    const sectionPrompt = getSectionPrompt(section);

    const completion = await openai.chat.completions.parse({
      model: MODELS.journalist,
      messages: [
        {
          role: "system",
          content: `${JOURNALIST_SYSTEM_PROMPT}\n\n${JOURNALIST_DISCOVER_PROMPT}\n\n${sectionPrompt}`,
        },
        {
          role: "user",
          content: `Propón temas de artículos para la sección "${sectionConfig.name}" de nuestra revista de ciclismo.

Descripción de la sección: ${sectionConfig.description}

Temas ya existentes (EVITA repetirlos o temas muy similares):
${existingTitles.length > 0 ? existingTitles.map((t) => `- ${t}`).join("\n") : "- (Ningún tema existente aún)"}

Fecha actual: ${new Date().toISOString().split("T")[0]}

Propón entre 3 y 5 temas nuevos, originales y relevantes.`,
        },
      ],
      response_format: zodResponseFormat(TopicProposalSchema, "topic_proposals"),
    });

    const result = completion.choices[0].message.parsed;

    if (!result) {
      throw new Error("No se recibió respuesta estructurada del modelo");
    }

    const usage = completion.usage;

    // Filter out topics that are too similar to existing ones
    const newTopics = result.topics.filter((proposed) => {
      const normalizedProposed = proposed.title.toLowerCase().trim();
      return !existingTitles.some((existing) => {
        const normalizedExisting = existing.toLowerCase().trim();
        // Simple similarity check: avoid exact or near-exact matches
        return (
          normalizedExisting === normalizedProposed ||
          normalizedExisting.includes(normalizedProposed) ||
          normalizedProposed.includes(normalizedExisting)
        );
      });
    });

    // Insert new topics
    let createdCount = 0;
    for (const topic of newTopics) {
      await db.insert(topics).values({
        section,
        title: topic.title,
        description: topic.description,
        angle: topic.angle,
        status: "proposed",
        priority: topic.priority,
        suggestedKeywords: JSON.stringify(topic.suggestedKeywords),
        agentRunId: agentRun.id,
      });
      createdCount++;
      console.log(`[DISCOVER] Tema creado: "${topic.title}" (prioridad: ${topic.priority})`);
    }

    // Update agent run as completed
    const durationMs = Date.now() - startTime;
    await db
      .update(agentRuns)
      .set({
        status: "completed",
        inputTokens: usage?.prompt_tokens ?? null,
        outputTokens: usage?.completion_tokens ?? null,
        durationMs,
        completedAt: new Date(),
        metadata: JSON.stringify({
          proposedCount: result.topics.length,
          createdCount,
          filteredOut: result.topics.length - newTopics.length,
        }),
      })
      .where(eq(agentRuns.id, agentRun.id));

    console.log(
      `[DISCOVER] Completado para ${sectionConfig.name}: ${createdCount} temas creados (${result.topics.length} propuestos, ${result.topics.length - newTopics.length} filtrados por duplicados) en ${durationMs}ms`
    );

    return createdCount;
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error(`[DISCOVER] Error en sección ${sectionConfig.name}:`, errorMessage);

    await db
      .update(agentRuns)
      .set({
        status: "failed",
        durationMs,
        errorMessage,
        completedAt: new Date(),
      })
      .where(eq(agentRuns.id, agentRun.id));

    throw error;
  }
}
