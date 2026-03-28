import fs from "fs";
import path from "path";
import matter from "gray-matter";
import OpenAI from "openai";

// Load .env.local manually
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

const SECTION_MAP: Record<string, string> = {
  nutricion: "nutrition",
  ciencia: "science",
  entrenamiento: "training",
  competencia: "competition",
};

async function translateArticle(spanishPath: string, section: string): Promise<void> {
  const raw = fs.readFileSync(spanishPath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `You are a professional translator specializing in cycling journalism and sports science. Translate the following Spanish cycling article to English. Maintain scientific precision, journalistic tone matching publications like Cyclist, Wired, and Bicycling. Preserve all markdown formatting, headers, and paragraph structure. Do NOT convert paragraphs to bullet points. Keep source URLs and citation formats exactly as-is. Output ONLY the translated article body in markdown, nothing else.`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    temperature: 0.3,
  });

  const translatedContent = response.choices[0].message.content;

  // Translate frontmatter fields
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

  // Generate English slug from translated title
  const englishSlug = translatedFm.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  // Use internal section ID for directory (not English name)
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

  console.log(`✓ ${section}/${path.basename(spanishPath)} → en/${section}/${englishSlug}.md`);
}

async function main() {
  const sections = Object.keys(SECTION_MAP);

  for (const section of sections) {
    const dir = path.join("content", "es", section);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    console.log(`\n📂 ${section} (${files.length} artículos)`);

    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        await translateArticle(filePath, section);
      } catch (err: any) {
        console.error(`✗ Failed: ${section}/${file}:`, err.message);
      }
      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("\n✅ Done!");
}

main();
