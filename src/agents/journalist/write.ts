import { openai, MODELS } from "@/lib/openai";
import { db } from "@/lib/db";
import { topics, sources, articles, agentRuns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { slugify, getReadingTime } from "@/lib/utils";
import { SECTIONS, type SectionId } from "@/lib/constants";
import { zodResponseFormat } from "openai/helpers/zod";
import { ArticleDraftSchema } from "../schemas/article-draft";
import {
  JOURNALIST_SYSTEM_PROMPT,
  JOURNALIST_WRITE_PROMPT,
  getSectionPrompt,
} from "../prompts";
import fs from "fs";
import path from "path";

export async function writeArticle(topicId: number): Promise<number | null> {
  const startTime = Date.now();

  console.log(`[WRITE] Iniciando escritura para tema ID: ${topicId}`);

  // Load topic from DB
  const topic = await db
    .select()
    .from(topics)
    .where(eq(topics.id, topicId))
    .then((rows) => rows[0]);

  if (!topic) {
    throw new Error(`Tema no encontrado: ${topicId}`);
  }

  const section = topic.section as SectionId;
  const sectionConfig = SECTIONS[section];

  console.log(`[WRITE] Escribiendo artículo: "${topic.title}" para sección ${sectionConfig.name}`);

  // Create agent run record
  const [agentRun] = await db
    .insert(agentRuns)
    .values({
      agentType: "journalist",
      phase: "write",
      section,
      status: "running",
      model: MODELS.journalist,
      startedAt: new Date(),
    })
    .returning();

  try {
    // Load associated sources
    const topicSources = await db
      .select()
      .from(sources)
      .where(eq(sources.topicId, topicId));

    // Find the full research content
    const researchSource = topicSources.find(
      (s) => s.url.startsWith("internal://research/") && s.rawData
    );
    const researchContent = researchSource?.rawData
      ? JSON.parse(researchSource.rawData).fullContent
      : null;

    // Format external sources for the prompt
    const externalSources = topicSources
      .filter((s) => !s.url.startsWith("internal://"))
      .map((s) => `- ${s.title}: ${s.url}${s.abstract ? ` (${s.abstract})` : ""}`)
      .join("\n");

    const sectionPrompt = getSectionPrompt(section);

    const completion = await openai.chat.completions.parse({
      model: MODELS.journalist,
      messages: [
        {
          role: "system",
          content: `${JOURNALIST_SYSTEM_PROMPT}\n\n${JOURNALIST_WRITE_PROMPT}\n\n${sectionPrompt}`,
        },
        {
          role: "user",
          content: `Escribe un artículo completo sobre el siguiente tema:

**Título propuesto**: ${topic.title}
**Descripción**: ${topic.description || ""}
**Ángulo editorial**: ${topic.angle || ""}

## Investigación Disponible
${researchContent || "No hay investigación previa disponible. Basa el artículo en tu conocimiento."}

## Fuentes Disponibles
${externalSources || "No hay fuentes externas disponibles."}

## Instrucciones de formato
- Escribe el artículo completo en Markdown (SIN frontmatter YAML)
- ESCRIBE TODO EN PÁRRAFOS de 3-5 oraciones. NUNCA uses listas con viñetas ni bullets
- Cada párrafo abre con un dato concreto o gancho informativo
- Cita las fuentes de forma natural dentro de los párrafos (autor, año, publicación)
- Incluye datos específicos: cifras, porcentajes, tamaños de muestra
- Usa encabezados ## y ### con títulos ESPECÍFICOS (no genéricos)
- Usa tablas Markdown SOLO para datos comparativos
- Extensión: 1000-2500 palabras
- Cierra con párrafos de conclusiones prácticas (NO en formato lista)
- NO uses frases como "es importante destacar", "cabe mencionar", "sin duda alguna"
- NO uses adjetivos vacíos como "increíble", "fascinante", "revolucionario"`,
        },
      ],
      response_format: zodResponseFormat(ArticleDraftSchema, "article_draft"),
    });

    const result = completion.choices[0].message.parsed;

    if (!result) {
      throw new Error("No se recibió respuesta estructurada del modelo");
    }

    const usage = completion.usage;

    // Generate slug and build frontmatter
    const slug = slugify(result.metadata.title);
    const readingTime = getReadingTime(result.content);
    const date = new Date().toISOString().split("T")[0];

    // Build the complete markdown file with frontmatter
    const frontmatter = [
      "---",
      `title: "${result.metadata.title.replace(/"/g, '\\"')}"`,
      `subtitle: "${result.metadata.subtitle.replace(/"/g, '\\"')}"`,
      `section: ${section}`,
      `date: "${date}"`,
      `author: "${sectionConfig.journalist}"`,
      `tags: ${JSON.stringify(result.metadata.tags)}`,
      `sources:`,
      ...topicSources
        .filter((s) => !s.url.startsWith("internal://"))
        .slice(0, 10)
        .map(
          (s) =>
            `  - title: "${s.title.replace(/"/g, '\\"')}"\n    url: "${s.url}"\n    type: ${s.type}`
        ),
      `excerpt: "${result.metadata.excerpt.replace(/"/g, '\\"')}"`,
      "---",
    ].join("\n");

    const fullMarkdown = `${frontmatter}\n\n${result.content}`;

    // Write the markdown file
    const contentDir = path.join(process.cwd(), "content", section);
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const filePath = path.join(contentDir, `${slug}.md`);
    fs.writeFileSync(filePath, fullMarkdown, "utf-8");

    const contentPath = `content/${section}/${slug}.md`;

    console.log(`[WRITE] Archivo creado: ${contentPath}`);

    // Create article record in DB
    const [article] = await db
      .insert(articles)
      .values({
        slug,
        title: result.metadata.title,
        subtitle: result.metadata.subtitle,
        section,
        status: "review",
        contentPath,
        excerpt: result.metadata.excerpt,
        readingTimeMinutes: readingTime,
        topicId,
        agentRunId: agentRun.id,
        metaTitle: result.metadata.metaTitle,
        metaDescription: result.metadata.metaDescription,
        tags: JSON.stringify(result.metadata.tags),
      })
      .returning();

    // Update sources to link to the article
    for (const source of topicSources.filter(
      (s) => !s.url.startsWith("internal://")
    )) {
      await db
        .update(sources)
        .set({ articleId: article.id, citedInArticle: true })
        .where(eq(sources.id, source.id));
    }

    // Update topic status
    await db
      .update(topics)
      .set({ status: "completed" })
      .where(eq(topics.id, topicId));

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
          topicId,
          articleId: article.id,
          slug,
          contentPath,
          readingTime,
          wordCount: result.content.split(/\s+/).length,
        }),
      })
      .where(eq(agentRuns.id, agentRun.id));

    console.log(
      `[WRITE] Artículo completado: "${result.metadata.title}" (ID: ${article.id}, ${readingTime} min lectura) en ${durationMs}ms`
    );

    return article.id;
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error(`[WRITE] Error escribiendo artículo para "${topic.title}":`, errorMessage);

    await db
      .update(agentRuns)
      .set({
        status: "failed",
        durationMs,
        errorMessage,
        completedAt: new Date(),
      })
      .where(eq(agentRuns.id, agentRun.id));

    return null;
  }
}
