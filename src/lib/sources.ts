import { db } from "@/lib/db";
import { sources } from "@/lib/db/schema";
import { getRecentItemsBySection, type RSSItem } from "@/lib/rss";
import {
  searchCyclingPapers as searchPubMedCycling,
  searchPubMed,
  type PubMedArticle,
} from "@/lib/pubmed";
import {
  searchCyclingPapers as searchScholarCycling,
  searchPapers,
  type ScholarPaper,
} from "@/lib/semantic-scholar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AggregatedSources {
  rssItems: RSSItem[];
  pubmedArticles: PubMedArticle[];
  scholarPapers: ScholarPaper[];
  totalCount: number;
}

// ---------------------------------------------------------------------------
// gatherSources – Run all three source searches in parallel
// ---------------------------------------------------------------------------

export async function gatherSources(
  section: string,
  keywords: string[]
): Promise<AggregatedSources> {
  // Build a supplementary keyword query for PubMed / Scholar
  const keywordQuery = keywords.length > 0 ? keywords.join(" ") : "";

  // Run all searches in parallel, catching individual failures so one
  // source does not break the entire aggregation.
  const [rssResult, pubmedSectionResult, pubmedKeywordResult, scholarSectionResult, scholarKeywordResult] =
    await Promise.allSettled([
      getRecentItemsBySection(section, 20),
      searchPubMedCycling(section),
      keywordQuery ? searchPubMed(keywordQuery, 5) : Promise.resolve([]),
      searchScholarCycling(section),
      keywordQuery ? searchPapers(keywordQuery, 5) : Promise.resolve([]),
    ]);

  const rssItems =
    rssResult.status === "fulfilled" ? rssResult.value : [];
  const pubmedSection =
    pubmedSectionResult.status === "fulfilled"
      ? pubmedSectionResult.value
      : [];
  const pubmedKeyword =
    pubmedKeywordResult.status === "fulfilled"
      ? pubmedKeywordResult.value
      : [];
  const scholarSection =
    scholarSectionResult.status === "fulfilled"
      ? scholarSectionResult.value
      : [];
  const scholarKeyword =
    scholarKeywordResult.status === "fulfilled"
      ? scholarKeywordResult.value
      : [];

  // Deduplicate PubMed articles by PMID
  const pubmedMap = new Map<string, PubMedArticle>();
  for (const a of [...pubmedSection, ...pubmedKeyword]) {
    pubmedMap.set(a.pmid, a);
  }
  const pubmedArticles = Array.from(pubmedMap.values());

  // Deduplicate Scholar papers by paperId
  const scholarMap = new Map<string, ScholarPaper>();
  for (const p of [...scholarSection, ...scholarKeyword]) {
    scholarMap.set(p.paperId, p);
  }
  const scholarPapers = Array.from(scholarMap.values());

  return {
    rssItems,
    pubmedArticles,
    scholarPapers,
    totalCount: rssItems.length + pubmedArticles.length + scholarPapers.length,
  };
}

// ---------------------------------------------------------------------------
// storeSources – Persist all aggregated sources linked to a topic
// ---------------------------------------------------------------------------

export async function storeSources(
  topicId: number,
  aggregated: AggregatedSources
): Promise<void> {
  const rows: Array<typeof sources.$inferInsert> = [];

  // RSS items
  for (const item of aggregated.rssItems) {
    rows.push({
      topicId,
      type: "rss",
      title: item.title,
      url: item.link ?? "",
      publishedDate: item.pubDate ? item.pubDate.toISOString() : null,
      abstract: item.description,
      rawData: JSON.stringify(item),
    });
  }

  // PubMed articles
  for (const article of aggregated.pubmedArticles) {
    rows.push({
      topicId,
      type: "pubmed",
      title: article.title,
      url: article.url,
      authors: JSON.stringify(article.authors),
      publishedDate: article.pubDate,
      abstract: null, // abstract requires a separate efetch call
      rawData: JSON.stringify(article),
    });
  }

  // Semantic Scholar papers
  for (const paper of aggregated.scholarPapers) {
    rows.push({
      topicId,
      type: "semantic_scholar",
      title: paper.title,
      url: paper.url,
      authors: JSON.stringify(paper.authors),
      publishedDate: paper.year ? String(paper.year) : null,
      abstract: paper.abstract,
      rawData: JSON.stringify(paper),
    });
  }

  if (rows.length > 0) {
    // Insert in batches of 50 to avoid overly large statements
    const BATCH_SIZE = 50;
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      await db.insert(sources).values(rows.slice(i, i + BATCH_SIZE));
    }
  }
}
