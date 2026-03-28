import { openai, MODELS } from "@/lib/openai";
import { db } from "@/lib/db";
import { topics, sources, agentRuns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSectionPrompt, JOURNALIST_SYSTEM_PROMPT } from "../prompts";
import type { SectionId } from "@/lib/constants";

export async function researchTopic(topicId: number): Promise<void> {
  const startTime = Date.now();

  console.log(`[RESEARCH] Iniciando investigación para tema ID: ${topicId}`);

  // Load topic from DB
  const topic = await db
    .select()
    .from(topics)
    .where(eq(topics.id, topicId))
    .then((rows) => rows[0]);

  if (!topic) {
    throw new Error(`Tema no encontrado: ${topicId}`);
  }

  console.log(`[RESEARCH] Investigando: "${topic.title}"`);

  // Update topic status
  await db
    .update(topics)
    .set({ status: "researching" })
    .where(eq(topics.id, topicId));

  // Create agent run record
  const [agentRun] = await db
    .insert(agentRuns)
    .values({
      agentType: "journalist",
      phase: "research",
      section: topic.section,
      status: "running",
      model: MODELS.journalist,
      startedAt: new Date(),
    })
    .returning();

  try {
    const sectionPrompt = getSectionPrompt(topic.section as SectionId);
    const keywords = topic.suggestedKeywords
      ? JSON.parse(topic.suggestedKeywords).join(", ")
      : "";

    // Use OpenAI Responses API with web_search tool
    const response = await openai.responses.create({
      model: MODELS.journalist,
      tools: [{ type: "web_search_preview" }],
      instructions: `${JOURNALIST_SYSTEM_PROMPT}\n\n${sectionPrompt}\n\nEres un investigador. Tu tarea es recopilar información de fuentes confiables sobre el tema dado. Busca estudios científicos, artículos de revistas peer-reviewed, y datos verificables. Presenta tus hallazgos de forma estructurada.`,
      input: `Investiga a fondo el siguiente tema de ciclismo:

**Título**: ${topic.title}
**Descripción**: ${topic.description || ""}
**Ángulo editorial**: ${topic.angle || ""}
**Palabras clave**: ${keywords}

Busca:
1. Estudios científicos recientes y relevantes
2. Datos y estadísticas específicas
3. Opiniones de expertos reconocidos
4. Información práctica y aplicable

Para cada fuente, incluye: título, URL, autores si están disponibles, y un resumen de por qué es relevante.

Presenta tus hallazgos de forma estructurada con:
- Resumen general
- Hallazgos clave (con nivel de confianza)
- Lista de fuentes con URLs
- Datos específicos encontrados
- Estructura sugerida para el artículo`,
    });

    // Extract text content from the response
    let researchContent = "";
    for (const item of response.output) {
      if (item.type === "message") {
        for (const contentPart of item.content) {
          if (contentPart.type === "output_text") {
            researchContent += contentPart.text;
          }
        }
      }
    }

    if (!researchContent) {
      throw new Error("No se recibió contenido de la investigación");
    }

    // Parse sources from the research content
    // Extract URLs and titles using a simple pattern matching approach
    const urlPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const foundSources: Array<{ title: string; url: string }> = [];
    let match;

    while ((match = urlPattern.exec(researchContent)) !== null) {
      foundSources.push({
        title: match[1],
        url: match[2],
      });
    }

    // Also look for plain URLs
    const plainUrlPattern = /(?:^|\s)(https?:\/\/[^\s<>"{}|\\^`[\]]+)/gm;
    while ((match = plainUrlPattern.exec(researchContent)) !== null) {
      const url = match[1];
      if (!foundSources.some((s) => s.url === url)) {
        foundSources.push({
          title: url.split("/").pop()?.replace(/-/g, " ") || "Fuente web",
          url,
        });
      }
    }

    // Store sources in the database
    for (const source of foundSources.slice(0, 15)) {
      await db.insert(sources).values({
        topicId,
        type: "web_search",
        title: source.title,
        url: source.url,
        abstract: null,
        relevanceScore: null,
        citedInArticle: false,
      });
    }

    // Store the full research content as a source entry for reference
    await db.insert(sources).values({
      topicId,
      type: "web_search",
      title: `Investigación completa: ${topic.title}`,
      url: `internal://research/${topicId}`,
      abstract: researchContent.slice(0, 5000),
      rawData: JSON.stringify({ fullContent: researchContent }),
      relevanceScore: 1.0,
      citedInArticle: false,
    });

    // Update topic status to "writing"
    await db
      .update(topics)
      .set({ status: "writing" })
      .where(eq(topics.id, topicId));

    // Update agent run as completed
    const durationMs = Date.now() - startTime;
    await db
      .update(agentRuns)
      .set({
        status: "completed",
        inputTokens: response.usage?.input_tokens ?? null,
        outputTokens: response.usage?.output_tokens ?? null,
        durationMs,
        completedAt: new Date(),
        metadata: JSON.stringify({
          topicId,
          topicTitle: topic.title,
          sourcesFound: foundSources.length,
          researchLength: researchContent.length,
        }),
      })
      .where(eq(agentRuns.id, agentRun.id));

    console.log(
      `[RESEARCH] Completado para "${topic.title}": ${foundSources.length} fuentes encontradas en ${durationMs}ms`
    );
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error(`[RESEARCH] Error investigando "${topic.title}":`, errorMessage);

    // Revert topic status
    await db
      .update(topics)
      .set({ status: "proposed" })
      .where(eq(topics.id, topicId));

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
