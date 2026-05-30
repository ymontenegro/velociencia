import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getTagBySlug, getArticlesByTag } from "@/lib/tags";
import { TopicArchive } from "@/components/topics/topic-archive";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const info = getTagBySlug(tagSlug, locale);
  if (!info) return {};

  return {
    title: info.tag,
    description: `${dict.topics.articlesAbout} ${info.tag}`,
    // Thin aggregation page: keep out of the index but let crawlers follow links.
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const locale = await getLocale();

  const info = getTagBySlug(tagSlug, locale);
  const articles = getArticlesByTag(tagSlug, locale);

  if (!info || articles.length === 0) notFound();

  return <TopicArchive tag={info} articles={articles} locale={locale} />;
}
