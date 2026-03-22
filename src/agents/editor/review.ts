import { openai, MODELS } from "@/lib/openai";
import { db } from "@/lib/db";
import { articles, sources, agentRuns } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { zodResponseFormat } from "openai/helpers/zod";
import { EditorReviewSchema } from "../schemas/review";
import { EDITOR_SYSTEM_PROMPT } from "../prompts";
import { EDITORIAL_GUIDELINES } from "./guidelines";
import fs from "fs";
import path from "path";

export async function reviewArticle(articleId: number): Promise<void> {
  const startTime = Date.now();

  console.log(`[REVIEW] Iniciando revisión del artículo ID: ${articleId}`);

  // Load article from DB
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, articleId))
    .then((rows) => rows[0]);

  if (!article) {
    throw new Error(`Artículo no encontrado: ${articleId}`);
  }

  console.log(`[REVIEW] Revisando: "${article.title}"`);

  // Create agent run record
  const [agentRun] = await db
    .insert(agentRuns)
    .values({
      agentType: "editor",
      phase: "review",
      section: article.section,
      status: "running",
      model: MODELS.editor,
      startedAt: new Date(),
    })
    .returning();

  try {
    // Read the markdown file
    let markdownContent = "";
    if (article.contentPath) {
      const fullPath = path.join(process.cwd(), article.contentPath);
      if (fs.existsSync(fullPath)) {
        markdownContent = fs.readFileSync(fullPath, "utf-8");
      } else {
        throw new Error(`Archivo de artículo no encontrado: ${fullPath}`);
      }
    } else {
      throw new Error("El artículo no tiene ruta de contenido");
    }

    // Load associated sources
    const articleSources = await db
      .select()
      .from(sources)
      .where(eq(sources.articleId, articleId));

    const sourcesInfo = articleSources
      .filter((s) => !s.url.startsWith("internal://"))
      .map((s) => `- ${s.title}: ${s.url}`)
      .join("\n");

    const completion = await openai.chat.completions.parse({
      model: MODELS.editor,
      messages: [
        {
          role: "system",
          content: `${EDITOR_SYSTEM_PROMPT}\n\n${EDITORIAL_GUIDELINES}`,
        },
        {
          role: "user",
          content: `Revisa el siguiente artículo y proporciona tu evaluación editorial completa.

## Información del Artículo
- **Título**: ${article.title}
- **Sección**: ${article.section}
- **Subtítulo**: ${article.subtitle || "N/A"}
- **Meta Descripción**: ${article.metaDescription || "N/A"}
- **Tags**: ${article.tags || "N/A"}

## Fuentes Declaradas
${sourcesInfo || "No se declararon fuentes externas."}

## Contenido del Artículo
${markdownContent}

---

Evalúa este artículo con rigor editorial. Recuerda:

## Puntuación
- Puntuación >= 8: APROBAR
- Puntuación 6-7.9: solicitar REVISIÓN con correcciones específicas
- Puntuación < 6: RECHAZAR con explicación detallada

## Calidad de escritura
- Si el artículo usa listas con viñetas en lugar de párrafos, PENALIZAR en calidad de escritura
- Si detectas lenguaje estilo ChatGPT ("es importante destacar", "cabe mencionar", "sin duda alguna"), PENALIZAR en calidad de escritura

## Verificación de fuentes (OBLIGATORIO)
- Verifica CADA fuente citada: ¿el autor, año y publicación parecen reales y verificables?
- Las fuentes declaradas arriba son las que el periodista investigó. Verifica que se usen correctamente en el artículo
- Si una fuente parece inventada (nombre de autor + publicación que no existen), marca como "suspicious" o "unverifiable"
- Si más del 30% de las fuentes no son verificables, RECHAZAR

## Derechos de autor
- Verifica que el contenido sea ORIGINAL y no plagie textos de las fuentes
- Citas directas breves entre comillas están permitidas si se atribuyen
- Párrafos copiados textualmente de fuentes = problema crítico de copyright

## Imágenes
- Sugiere 2-3 imágenes de bancos gratuitos (Unsplash, Pexels, Pixabay) con queries de búsqueda específicas
- Una imagen hero para portada y 1-2 imágenes inline

## Test final
- Pregúntate: ¿este artículo podría publicarse en Cyclist Magazine sin que nadie note que fue generado por IA?
- Si hay problemas de fact-checking críticos, RECHAZAR independientemente de la puntuación`,
        },
      ],
      response_format: zodResponseFormat(EditorReviewSchema, "editor_review"),
    });

    const review = completion.choices[0].message.parsed;

    if (!review) {
      throw new Error("No se recibió respuesta estructurada del modelo editor");
    }

    const usage = completion.usage;

    // Check for critical fact-check issues that force rejection
    const hasCriticalIssues = review.factCheckIssues.some(
      (issue) => issue.severity === "critical"
    );

    // Check for critical copyright issues
    const hasCriticalCopyright = review.copyrightIssues.some(
      (issue) => issue.severity === "critical"
    );

    // Check for too many unverifiable sources
    const unverifiableSources = review.sourceVerification.filter(
      (s) => s.status === "suspicious" || s.status === "unverifiable"
    );
    const hasSourceProblems =
      review.sourceVerification.length > 0 &&
      unverifiableSources.length / review.sourceVerification.length > 0.3;

    // Determine final decision
    let finalDecision = review.decision;
    if (hasCriticalIssues && finalDecision === "approve") {
      finalDecision = "reject";
      console.log(
        `[REVIEW] Decisión cambiada a RECHAZAR por problemas críticos de fact-checking`
      );
    }
    if (hasCriticalCopyright && finalDecision === "approve") {
      finalDecision = "reject";
      console.log(
        `[REVIEW] Decisión cambiada a RECHAZAR por problemas críticos de derechos de autor`
      );
    }
    if (hasSourceProblems && finalDecision === "approve") {
      finalDecision = "revise";
      console.log(
        `[REVIEW] Decisión cambiada a REVISIÓN por fuentes no verificables (${unverifiableSources.length}/${review.sourceVerification.length})`
      );
    }

    // Build editor notes
    const editorNotes = [
      `## Evaluación Editorial`,
      ``,
      `**Puntuación**: ${review.score}/10`,
      `- Precisión: ${review.scores.accuracy}/10`,
      `- Calidad: ${review.scores.quality}/10`,
      `- Engagement: ${review.scores.engagement}/10`,
      `- SEO: ${review.scores.seo}/10`,
      ``,
      `**Decisión**: ${finalDecision.toUpperCase()}`,
      ``,
      review.overallAssessment,
    ];

    if (review.factCheckIssues.length > 0) {
      editorNotes.push(``, `### Problemas de Fact-Checking`);
      for (const issue of review.factCheckIssues) {
        editorNotes.push(
          `- [${issue.severity.toUpperCase()}] ${issue.claim}: ${issue.issue} → ${issue.suggestion}`
        );
      }
    }

    if (review.styleIssues.length > 0) {
      editorNotes.push(``, `### Problemas de Estilo`);
      for (const issue of review.styleIssues) {
        editorNotes.push(
          `- [${issue.category}] ${issue.location}: ${issue.issue} → ${issue.suggestion}`
        );
      }
    }

    if (review.sourceVerification.length > 0) {
      editorNotes.push(``, `### Verificación de Fuentes`);
      for (const source of review.sourceVerification) {
        const icon = source.status === "verified" ? "✓" : source.status === "suspicious" ? "⚠" : "✗";
        editorNotes.push(
          `- ${icon} [${source.status.toUpperCase()}] ${source.source}: ${source.note}`
        );
      }
    }

    if (review.copyrightIssues.length > 0) {
      editorNotes.push(``, `### Problemas de Derechos de Autor`);
      for (const issue of review.copyrightIssues) {
        editorNotes.push(
          `- [${issue.severity.toUpperCase()}] ${issue.location}: ${issue.issue}`
        );
      }
    }

    if (review.imageSuggestions.length > 0) {
      editorNotes.push(``, `### Sugerencias de Imágenes`);
      for (const img of review.imageSuggestions) {
        editorNotes.push(
          `- [${img.placement}] ${img.section}: ${img.description} (buscar: "${img.searchQuery}")`
        );
      }
    }

    if (review.suggestedImprovements.length > 0) {
      editorNotes.push(``, `### Mejoras Sugeridas`);
      for (const improvement of review.suggestedImprovements) {
        editorNotes.push(`- ${improvement}`);
      }
    }

    const editorNotesText = editorNotes.join("\n");

    // Update article based on decision
    if (finalDecision === "approve" && review.score >= 8) {
      await db
        .update(articles)
        .set({
          status: "published",
          editorScore: review.score,
          editorNotes: editorNotesText,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(articles.id, articleId));

      console.log(
        `[REVIEW] APROBADO: "${article.title}" con puntuación ${review.score}/10`
      );
    } else {
      await db
        .update(articles)
        .set({
          status: "rejected",
          editorScore: review.score,
          editorNotes: editorNotesText,
          rejectionReason:
            review.rejectionReason ||
            `Puntuación insuficiente: ${review.score}/10`,
          updatedAt: new Date(),
        })
        .where(eq(articles.id, articleId));

      console.log(
        `[REVIEW] RECHAZADO: "${article.title}" con puntuación ${review.score}/10. Razón: ${review.rejectionReason || "Puntuación insuficiente"}`
      );
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
          articleId,
          articleTitle: article.title,
          decision: finalDecision,
          score: review.score,
          scores: review.scores,
          factCheckIssues: review.factCheckIssues.length,
          styleIssues: review.styleIssues.length,
          hasCriticalIssues,
          hasCriticalCopyright,
          unverifiableSources: unverifiableSources.length,
          totalSourcesVerified: review.sourceVerification.length,
          imageSuggestions: review.imageSuggestions.length,
        }),
      })
      .where(eq(agentRuns.id, agentRun.id));

    console.log(`[REVIEW] Revisión completada en ${durationMs}ms`);
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error(
      `[REVIEW] Error revisando "${article.title}":`,
      errorMessage
    );

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
