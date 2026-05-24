import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllTags } from "@/lib/tags";
import { TopicsIndex } from "@/components/topics/topics-index";

export async function generateMetadata() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.topics.allTitle,
    description: dict.topics.allSubtitle,
  };
}

export default async function TopicsPage() {
  const locale = await getLocale();
  const tags = getAllTags(locale);

  return <TopicsIndex tags={tags} locale={locale} />;
}
