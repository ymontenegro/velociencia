import type { SectionId } from "@/lib/constants";

/**
 * Editorial visibility state of an article, derived from its frontmatter:
 *   - "draft":     `draft: true` — never shown publicly (work in progress).
 *   - "scheduled": publication `date` is in the future — hidden until that day.
 *   - "published": live on the public site.
 * Computed by `articleStatus()` in `@/lib/publish`.
 */
export type ArticleStatus = "draft" | "scheduled" | "published";

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
  /**
   * Set to true to keep the article out of the public site regardless of its
   * date (unfinished draft). Removed/false once it's ready to schedule or publish.
   */
  draft?: boolean;
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
  /** Editorial visibility state (draft / scheduled / published). */
  status?: ArticleStatus;
  /** Slug of the paired article in the other locale (hreflang partner). */
  translationOf?: string;
}

export interface ArticleSource {
  title: string;
  url: string;
  type: string;
}
