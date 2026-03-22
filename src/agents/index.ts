import { db } from "@/lib/db";
import { topics, articles } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { SECTIONS, SECTION_IDS } from "@/lib/constants";
import { discoverTopics } from "./journalist/discover";
import { researchTopic } from "./journalist/research";
import { writeArticle } from "./journalist/write";
import { reviewArticle } from "./editor/review";

/**
 * Run the DISCOVER phase: find new article topics for all sections.
 */
export async function runDiscoverPipeline(): Promise<void> {
  console.log("\n========================================");
  console.log("[PIPELINE] Iniciando fase DISCOVER");
  console.log("========================================\n");

  let totalCreated = 0;

  for (const sectionId of SECTION_IDS) {
    try {
      const created = await discoverTopics(sectionId);
      totalCreated += created;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[PIPELINE] Error en DISCOVER para ${SECTIONS[sectionId].name}:`,
        message
      );
      // Continue with next section
    }
  }

  console.log(
    `\n[PIPELINE] DISCOVER completado: ${totalCreated} temas nuevos creados en total\n`
  );
}

/**
 * Run the RESEARCH phase: research all proposed/approved topics.
 */
export async function runResearchPipeline(): Promise<void> {
  console.log("\n========================================");
  console.log("[PIPELINE] Iniciando fase RESEARCH");
  console.log("========================================\n");

  // Find topics that need research (status: proposed or approved)
  const pendingTopics = await db
    .select()
    .from(topics)
    .where(inArray(topics.status, ["proposed", "approved"]));

  if (pendingTopics.length === 0) {
    console.log("[PIPELINE] No hay temas pendientes de investigación");
    return;
  }

  console.log(
    `[PIPELINE] ${pendingTopics.length} temas pendientes de investigación`
  );

  let researchedCount = 0;

  for (const topic of pendingTopics) {
    try {
      await researchTopic(topic.id);
      researchedCount++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[PIPELINE] Error en RESEARCH para tema "${topic.title}":`,
        message
      );
      // Continue with next topic
    }
  }

  console.log(
    `\n[PIPELINE] RESEARCH completado: ${researchedCount}/${pendingTopics.length} temas investigados\n`
  );
}

/**
 * Run the WRITE phase: write articles for all researched topics.
 */
export async function runWritePipeline(): Promise<void> {
  console.log("\n========================================");
  console.log("[PIPELINE] Iniciando fase WRITE");
  console.log("========================================\n");

  // Find topics ready to write (status: writing)
  const readyTopics = await db
    .select()
    .from(topics)
    .where(eq(topics.status, "writing"));

  if (readyTopics.length === 0) {
    console.log("[PIPELINE] No hay temas listos para escritura");
    return;
  }

  console.log(`[PIPELINE] ${readyTopics.length} temas listos para escritura`);

  let writtenCount = 0;

  for (const topic of readyTopics) {
    try {
      const articleId = await writeArticle(topic.id);
      if (articleId !== null) {
        writtenCount++;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[PIPELINE] Error en WRITE para tema "${topic.title}":`,
        message
      );
      // Continue with next topic
    }
  }

  console.log(
    `\n[PIPELINE] WRITE completado: ${writtenCount}/${readyTopics.length} artículos escritos\n`
  );
}

/**
 * Run the REVIEW phase: review all articles pending editorial review.
 */
export async function runReviewPipeline(): Promise<void> {
  console.log("\n========================================");
  console.log("[PIPELINE] Iniciando fase REVIEW");
  console.log("========================================\n");

  // Find articles pending review (status: review)
  const pendingArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, "review"));

  if (pendingArticles.length === 0) {
    console.log("[PIPELINE] No hay artículos pendientes de revisión");
    return;
  }

  console.log(
    `[PIPELINE] ${pendingArticles.length} artículos pendientes de revisión`
  );

  let reviewedCount = 0;

  for (const article of pendingArticles) {
    try {
      await reviewArticle(article.id);
      reviewedCount++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[PIPELINE] Error en REVIEW para artículo "${article.title}":`,
        message
      );
      // Continue with next article
    }
  }

  console.log(
    `\n[PIPELINE] REVIEW completado: ${reviewedCount}/${pendingArticles.length} artículos revisados\n`
  );
}

/**
 * Run the full pipeline: DISCOVER → RESEARCH → WRITE → REVIEW
 */
export async function runFullPipeline(): Promise<void> {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   PIPELINE COMPLETO - INICIO              ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const startTime = Date.now();

  await runDiscoverPipeline();
  await runResearchPipeline();
  await runWritePipeline();
  await runReviewPipeline();

  const durationMs = Date.now() - startTime;
  const durationMin = (durationMs / 60000).toFixed(1);

  console.log("\n╔══════════════════════════════════════════╗");
  console.log(`║   PIPELINE COMPLETO - FIN (${durationMin} min)       ║`);
  console.log("╚══════════════════════════════════════════╝\n");
}
