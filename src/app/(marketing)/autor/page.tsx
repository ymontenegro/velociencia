import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllAuthors } from "@/lib/authors";
import { getAllArticles } from "@/lib/markdown";
import { AuthorsIndex } from "@/components/authors/authors-index";

export async function generateMetadata() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.authors.title,
    description: dict.authors.subtitle,
  };
}

export default async function AutoresPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const authors = getAllAuthors(locale);

  const authorsWithCount = authors.map((author) => ({
    ...author,
    articleCount: getAllArticles(author.sectionId, locale).length,
  }));

  return <AuthorsIndex authors={authorsWithCount} dict={dict} locale={locale} />;
}
