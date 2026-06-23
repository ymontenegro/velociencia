import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getReadingTime } from "@/lib/utils";
import { SECTION_IDS, type SectionId } from "@/lib/constants";
import type { Article, ArticleCard, ArticleFrontmatter } from "@/types/article";
import { articleStatus } from "@/lib/publish";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Get a single article by section and slug.
 * Reads the markdown file, parses frontmatter, and returns structured data.
 */
export function getArticleBySlug(
  section: string,
  slug: string,
  locale: string = "es",
  opts: { includeHidden?: boolean } = {}
): Article | null {
  const filePath = path.join(CONTENT_DIR, locale, section, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  if (!opts.includeHidden && articleStatus(frontmatter) !== "published") {
    return null;
  }

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
 *
 * Drafts and not-yet-due scheduled articles are excluded by default so the
 * public site only ever lists published content. Pass `{ includeHidden: true }`
 * from admin code that needs the full editorial picture.
 */
export function getAllArticles(
  section?: string,
  locale: string = "es",
  opts: { includeHidden?: boolean } = {}
): ArticleCard[] {
  const sections = section
    ? [section]
    : SECTION_IDS;

  const articles: ArticleCard[] = [];

  for (const sec of sections) {
    const sectionDir = path.join(CONTENT_DIR, locale, sec);

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

      const status = articleStatus(frontmatter);
      if (!opts.includeHidden && status !== "published") {
        continue;
      }

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
        featured: frontmatter.featured ?? false,
        status,
        translationOf: frontmatter.translationOf,
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
  content: string,
  locale: string = "es"
): string {
  const sectionDir = path.join(CONTENT_DIR, locale, section);

  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }

  const filePath = path.join(sectionDir, `${slug}.md`);
  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent, "utf-8");

  return filePath;
}

/**
 * Select articles for the hero/portada block.
 *
 * Usage in frontmatter to pin an article to the hero:
 *   ---
 *   featured: true
 *   ---
 *
 * Logic:
 *   - Featured articles (featured: true) appear first, preserving their
 *     relative date order (the array is already sorted date-desc by getAllArticles).
 *   - Remaining slots are filled with the most-recent non-featured articles.
 *   - If no article is featured, the result is identical to articles.slice(0, count).
 *   - count defaults to 3.
 *
 * This function is pure (no fs/DB access) so it can be called from both
 * RSC pages and client-safe utilities without side effects.
 */
export function selectHeroArticles(articles: ArticleCard[], count = 3): ArticleCard[] {
  const featuredArticles = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);
  return [...featuredArticles, ...rest].slice(0, count);
}

/**
 * Get all slugs for a given section (useful for generateStaticParams).
 */
export function getArticleSlugs(section: string, locale: string = "es"): string[] {
  const sectionDir = path.join(CONTENT_DIR, locale, section);

  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs
    .readdirSync(sectionDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
