import type { SectionId } from "@/lib/constants";

export interface ArticleFrontmatter {
  title: string;
  subtitle?: string;
  section: SectionId;
  date: string;
  author: string;
  tags: string[];
  sources?: ArticleSource[];
  excerpt?: string;
  coverImage?: string;
  /** Set to true in frontmatter to pin this article in the hero/portada. */
  featured?: boolean;
  /** Set to true when the article contains affiliate links (shows the disclosure banner). */
  affiliate?: boolean;
  /** Slug of the paired article in the other locale (hreflang partner). */
  translationOf?: string;
}

export interface Article {
  slug: string;
  section: SectionId;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
}

export interface ArticleCard {
  slug: string;
  section: SectionId;
  title: string;
  subtitle?: string;
  excerpt?: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
  coverImage?: string;
  /** True when the article has `featured: true` in its frontmatter. */
  featured?: boolean;
  /** Slug of the paired article in the other locale (hreflang partner). */
  translationOf?: string;
}

export interface ArticleSource {
  title: string;
  url: string;
  type: string;
}
