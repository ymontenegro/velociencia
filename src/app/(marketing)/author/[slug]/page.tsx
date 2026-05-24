import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAuthorBySlug, getAllAuthors } from "@/lib/authors";
import { getAllArticles } from "@/lib/markdown";
import { AuthorArchive } from "@/components/authors/author-archive";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const author = getAuthorBySlug(slug, locale);

  if (!author) return {};

  const siteUrl = locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const authorBase = locale === "en" ? "author" : "autor";
  const siteName = locale === "en" ? "PedalSci" : "Velociencia";

  return {
    title: `${author.name} — ${siteName}`,
    description: author.specialty,
    alternates: {
      canonical: `${siteUrl}/${authorBase}/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const author = getAuthorBySlug(slug, locale);
  if (!author) notFound();

  const articles = getAllArticles(author.sectionId, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.name,
            jobTitle: author.specialty,
            description: author.bio,
            url: `${locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl"}/${locale === "en" ? "author" : "autor"}/${slug}`,
          }),
        }}
      />
      <AuthorArchive author={author} articles={articles} dict={dict} locale={locale} />
    </>
  );
}
