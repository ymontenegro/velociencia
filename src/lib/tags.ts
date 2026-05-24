import { getAllArticles } from "@/lib/markdown";
import { tagToSlug } from "@/lib/tag-slug";
import type { Locale } from "@/lib/i18n";
import type { ArticleCard } from "@/types/article";

export { tagToSlug };

export interface TagInfo {
  /** Canonical display form (the most frequent original spelling). */
  tag: string;
  /** URL-safe, accent-folded slug used for /tema/[slug] routes. */
  slug: string;
  /** Number of articles carrying this tag (in the given locale). */
  count: number;
}

interface TagAccumulator {
  slug: string;
  /** original spelling -> occurrences, to pick a canonical display form */
  forms: Map<string, number>;
  count: number;
}

function buildTagMap(locale: Locale): Map<string, TagAccumulator> {
  const articles = getAllArticles(undefined, locale);
  const map = new Map<string, TagAccumulator>();

  for (const article of articles) {
    // A tag may appear more than once on an article via slug collisions;
    // count each article only once per slug.
    const seen = new Set<string>();
    for (const rawTag of article.tags ?? []) {
      const tag = rawTag.trim();
      if (!tag) continue;
      const slug = tagToSlug(tag);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);

      const entry = map.get(slug) ?? { slug, forms: new Map(), count: 0 };
      entry.forms.set(tag, (entry.forms.get(tag) ?? 0) + 1);
      entry.count += 1;
      map.set(slug, entry);
    }
  }

  return map;
}

/** Pick the most frequent original spelling as the canonical display form. */
function canonicalForm(forms: Map<string, number>): string {
  let best = "";
  let bestCount = -1;
  for (const [form, count] of forms) {
    if (count > bestCount) {
      best = form;
      bestCount = count;
    }
  }
  return best;
}

/**
 * All tags for a locale, sorted by frequency (desc) then alphabetically.
 */
export function getAllTags(locale: Locale = "es"): TagInfo[] {
  const map = buildTagMap(locale);
  return [...map.values()]
    .map((e) => ({ tag: canonicalForm(e.forms), slug: e.slug, count: e.count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Resolve a tag slug back to its canonical display form + count. */
export function getTagBySlug(slug: string, locale: Locale = "es"): TagInfo | null {
  const map = buildTagMap(locale);
  const entry = map.get(slug);
  if (!entry) return null;
  return { tag: canonicalForm(entry.forms), slug: entry.slug, count: entry.count };
}

/** Articles carrying a given tag slug, newest first (getAllArticles is pre-sorted). */
export function getArticlesByTag(slug: string, locale: Locale = "es"): ArticleCard[] {
  return getAllArticles(undefined, locale).filter((article) =>
    (article.tags ?? []).some((t) => tagToSlug(t.trim()) === slug)
  );
}

/**
 * Articles related to `current` ranked by shared-tag count, breaking ties by
 * same-section then recency. Used to surface relevant reads beyond one section.
 */
export function getRelatedByTags(
  current: ArticleCard,
  locale: Locale = "es",
  limit = 3
): ArticleCard[] {
  const currentSlugs = new Set((current.tags ?? []).map((t) => tagToSlug(t.trim())));

  const scored = getAllArticles(undefined, locale)
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const shared = (a.tags ?? []).reduce(
        (n, t) => (currentSlugs.has(tagToSlug(t.trim())) ? n + 1 : n),
        0
      );
      return { article: a, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      const aSame = a.article.section === current.section ? 1 : 0;
      const bSame = b.article.section === current.section ? 1 : 0;
      if (bSame !== aSame) return bSame - aSame;
      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    })
    .map((x) => x.article);

  return scored.slice(0, limit);
}
