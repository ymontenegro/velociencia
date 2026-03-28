/**
 * Run the journalist pipeline (research → write → review) for specific topic IDs,
 * then translate the resulting articles to English.
 *
 * Usage: npx tsx scripts/run-topics.ts 5 6 10 15
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import OpenAI from "openai";

// Load .env.local
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Translation helper ---
async function translateArticle(spanishPath: string, section: string): Promise<string> {
  const raw = fs.readFileSync(spanishPath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  console.log(`[TRANSLATE] Traduciendo: ${path.basename(spanishPath)}`);

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `You are a professional translator specializing in cycling journalism and sports science. Translate the following Spanish cycling article to English. Maintain scientific precision, journalistic tone matching publications like Cyclist, Wired, and Bicycling. Preserve all markdown formatting, headers, and paragraph structure. Do NOT convert paragraphs to bullet points. Keep source URLs and citation formats exactly as-is. Output ONLY the translated article body in markdown, nothing else.`,
      },
      { role: "user", content },
    ],
    temperature: 0.3,
  });

  const translatedContent = response.choices[0].message.content;

  const fmResponse = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `Translate this cycling article metadata from Spanish to English. Return ONLY valid JSON with the same keys. Keep author names, URLs, and source objects exactly as-is. Translate title, subtitle, excerpt, and tags. Do not add any explanation.`,
      },
      {
        role: "user",
        content: JSON.stringify({
          title: frontmatter.title,
          subtitle: frontmatter.subtitle,
          excerpt: frontmatter.excerpt,
          tags: frontmatter.tags,
        }),
      },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  const translatedFm = JSON.parse(fmResponse.choices[0].message.content!);

  const englishSlug = translatedFm.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  // Use internal section ID for directory path
  const outDir = path.join("content", "en", section);
  fs.mkdirSync(outDir, { recursive: true });

  const newFrontmatter = {
    ...frontmatter,
    title: translatedFm.title,
    subtitle: translatedFm.subtitle || frontmatter.subtitle,
    excerpt: translatedFm.excerpt || frontmatter.excerpt,
    tags: translatedFm.tags || frontmatter.tags,
  };

  const outPath = path.join(outDir, `${englishSlug}.md`);
  const fileContent = matter.stringify(translatedContent!, newFrontmatter);
  fs.writeFileSync(outPath, fileContent, "utf-8");

  console.log(`[TRANSLATE] ✓ ${section}/${path.basename(spanishPath)} → en/${section}/${englishSlug}.md`);
  return outPath;
}

// --- Main ---
async function main() {
  const { researchTopic } = await import("../src/agents/journalist/research");
  const { writeArticle } = await import("../src/agents/journalist/write");
  const { reviewArticle } = await import("../src/agents/editor/review");

  const topicIds = process.argv.slice(2).map(Number).filter(Boolean);

  if (topicIds.length === 0) {
    console.error("Uso: npx tsx scripts/run-topics.ts <topic_id1> <topic_id2> ...");
    process.exit(1);
  }

  console.log(`\n╔══════════════════════════════════════════════════════════════╗`);
  console.log(`║  PIPELINE: ${topicIds.length} temas (research → write → review → translate)  ║`);
  console.log(`╚══════════════════════════════════════════════════════════════╝\n`);

  const startTime = Date.now();
  const results: Array<{ topicId: number; articleId: number | null; translated: boolean }> = [];

  for (const topicId of topicIds) {
    console.log(`\n━━━ Tema ID: ${topicId} ━━━\n`);

    try {
      // Phase 1: Research
      await researchTopic(topicId);

      // Phase 2: Write (creates ES article)
      const articleId = await writeArticle(topicId);

      if (articleId) {
        // Phase 3: Review
        await reviewArticle(articleId);

        // Phase 4: Translate to English
        const { db } = await import("../src/lib/db");
        const { articles } = await import("../src/lib/db/schema");
        const { eq } = await import("drizzle-orm");

        const article = await db
          .select()
          .from(articles)
          .where(eq(articles.id, articleId))
          .then((rows: any[]) => rows[0]);

        if (article?.contentPath) {
          const fullPath = path.join(process.cwd(), article.contentPath);
          if (fs.existsSync(fullPath)) {
            await translateArticle(fullPath, article.section);
            results.push({ topicId, articleId, translated: true });
          } else {
            console.error(`[TRANSLATE] Archivo no encontrado: ${fullPath}`);
            results.push({ topicId, articleId, translated: false });
          }
        } else {
          results.push({ topicId, articleId, translated: false });
        }
      } else {
        results.push({ topicId, articleId: null, translated: false });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[ERROR] Tema ${topicId}: ${msg}`);
      results.push({ topicId, articleId: null, translated: false });
    }
  }

  const durationMin = ((Date.now() - startTime) / 60000).toFixed(1);

  console.log(`\n╔══════════════════════════════════════════════╗`);
  console.log(`║  RESULTADOS (${durationMin} min)                            ║`);
  console.log(`╚══════════════════════════════════════════════╝\n`);

  for (const r of results) {
    const status = r.articleId ? (r.translated ? "✓ ES+EN" : "⚠ solo ES") : "✗ falló";
    console.log(`  Tema ${r.topicId}: ${status} (artículo #${r.articleId ?? "—"})`);
  }

  process.exit(0);
}

main();
