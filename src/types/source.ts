export type SourceType = "rss" | "pubmed" | "semantic_scholar" | "web_search";

export interface Source {
  id: number;
  articleId: number | null;
  topicId: number | null;
  type: SourceType;
  title: string;
  url: string;
  authors: string | null;
  publishedDate: string | null;
  abstract: string | null;
  relevanceScore: number | null;
  citedInArticle: boolean | null;
  rawData: string | null;
  createdAt: Date;
}
