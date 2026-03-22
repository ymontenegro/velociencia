import RSSParser from "rss-parser";
import { db } from "@/lib/db";
import { rssFeeds, rssItems } from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ParsedRSSItem {
  guid: string;
  title: string;
  link: string | undefined;
  description: string | undefined;
  pubDate: Date | undefined;
  categories: string[];
}

export interface RSSItem {
  id: number;
  feedId: number;
  guid: string;
  title: string;
  link: string | null;
  description: string | null;
  pubDate: Date | null;
  categories: string | null;
  feedName: string;
  feedSection: string;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// Parser instance
// ---------------------------------------------------------------------------

const parser = new RSSParser({
  timeout: 10_000, // 10 seconds
  headers: {
    "User-Agent": "Ciclismo-Bot/1.0",
    Accept: "application/rss+xml, application/xml, text/xml",
  },
});

// ---------------------------------------------------------------------------
// fetchFeed – Fetch and parse a single RSS feed
// ---------------------------------------------------------------------------

export async function fetchFeed(feedUrl: string): Promise<ParsedRSSItem[]> {
  const feed = await parser.parseURL(feedUrl);

  return (feed.items ?? []).map((item) => ({
    guid: item.guid ?? item.link ?? item.title ?? "",
    title: item.title ?? "(sin título)",
    link: item.link,
    description:
      item.contentSnippet ?? item.content ?? item.summary ?? undefined,
    pubDate: item.pubDate ? new Date(item.pubDate) : undefined,
    categories: (item.categories ?? []) as string[],
  }));
}

// ---------------------------------------------------------------------------
// refreshAllFeeds – Iterate active feeds, fetch, deduplicate, store
// ---------------------------------------------------------------------------

export async function refreshAllFeeds(): Promise<{
  success: number;
  failed: number;
}> {
  const activeFeeds = await db
    .select()
    .from(rssFeeds)
    .where(eq(rssFeeds.isActive, true));

  let success = 0;
  let failed = 0;

  for (const feed of activeFeeds) {
    try {
      const items = await fetchFeed(feed.url);

      // Get existing guids for this feed to deduplicate
      const existingItems = await db
        .select({ guid: rssItems.guid })
        .from(rssItems)
        .where(eq(rssItems.feedId, feed.id));

      const existingGuids = new Set(existingItems.map((i) => i.guid));

      const newItems = items.filter((item) => !existingGuids.has(item.guid));

      // Insert new items
      if (newItems.length > 0) {
        await db.insert(rssItems).values(
          newItems.map((item) => ({
            feedId: feed.id,
            guid: item.guid,
            title: item.title,
            link: item.link ?? null,
            description: item.description ?? null,
            pubDate: item.pubDate ?? null,
            categories: item.categories.length
              ? JSON.stringify(item.categories)
              : null,
          }))
        );
      }

      // Update feed: reset error count, set lastFetchedAt
      await db
        .update(rssFeeds)
        .set({
          lastFetchedAt: new Date(),
          errorCount: 0,
          lastError: null,
        })
        .where(eq(rssFeeds.id, feed.id));

      success++;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const newErrorCount = (feed.errorCount ?? 0) + 1;

      await db
        .update(rssFeeds)
        .set({
          errorCount: newErrorCount,
          lastError: errorMessage,
          // Deactivate feed after 10 consecutive errors
          ...(newErrorCount >= 10 ? { isActive: false } : {}),
        })
        .where(eq(rssFeeds.id, feed.id));

      failed++;
    }
  }

  return { success, failed };
}

// ---------------------------------------------------------------------------
// getRecentItemsBySection – Get recent RSS items for a given section
// ---------------------------------------------------------------------------

export async function getRecentItemsBySection(
  section: string,
  limit: number = 20
): Promise<RSSItem[]> {
  const rows = await db
    .select({
      id: rssItems.id,
      feedId: rssItems.feedId,
      guid: rssItems.guid,
      title: rssItems.title,
      link: rssItems.link,
      description: rssItems.description,
      pubDate: rssItems.pubDate,
      categories: rssItems.categories,
      createdAt: rssItems.createdAt,
      feedName: rssFeeds.name,
      feedSection: rssFeeds.section,
    })
    .from(rssItems)
    .innerJoin(rssFeeds, eq(rssItems.feedId, rssFeeds.id))
    .where(eq(rssFeeds.section, section as "nutricion" | "ciencia" | "entrenamiento" | "general"))
    .orderBy(desc(rssItems.pubDate))
    .limit(limit);

  return rows;
}
