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
}

export interface ArticleSource {
  title: string;
  url: string;
  type: string;
}
