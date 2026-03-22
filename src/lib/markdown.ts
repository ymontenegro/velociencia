import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getReadingTime } from "@/lib/utils";
import { SECTION_IDS, type SectionId } from "@/lib/constants";
import type { Article, ArticleCard, ArticleFrontmatter } from "@/types/article";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Get a single article by section and slug.
 * Reads the markdown file, parses frontmatter, and returns structured data.
 */
export function getArticleBySlug(
  section: string,
  slug: string
): Article | null {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    section: section as SectionId,
    frontmatter,
    content,
    readingTime: getReadingTime(content),
  };
}

/**
 * Get all articles, optionally filtered by section.
 * Returns ArticleCard[] sorted by date descending.
 */
export function getAllArticles(section?: string): ArticleCard[] {
  const sections = section
    ? [section]
    : SECTION_IDS;

  const articles: ArticleCard[] = [];

  for (const sec of sections) {
    const sectionDir = path.join(CONTENT_DIR, sec);

    if (!fs.existsSync(sectionDir)) {
      continue;
    }

    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(sectionDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as ArticleFrontmatter;

      articles.push({
        slug,
        section: sec as SectionId,
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        excerpt: frontmatter.excerpt,
        date: frontmatter.date,
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        readingTime: getReadingTime(content),
        coverImage: frontmatter.coverImage,
      });
    }
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

/**
 * Write a markdown file with frontmatter to the content directory.
 * Creates the section directory if it doesn't exist.
 */
export function writeArticle(
  section: string,
  slug: string,
  frontmatter: Record<string, unknown>,
  content: string
): string {
  const sectionDir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }

  const filePath = path.join(sectionDir, `${slug}.md`);
  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf-8");

  return filePath;
}

/**
 * Get all slugs for a given section (useful for generateStaticParams).
 */
export function getArticleSlugs(section: string): string[] {
  const sectionDir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs
    .readdirSync(sectionDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
