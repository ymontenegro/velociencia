import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, getSectionBySlug, type SectionId } from "@/lib/constants";
import { formatDate, getReadingTime } from "@/lib/utils";
import { getAllArticles } from "@/lib/markdown";
import { getRelatedByTags, tagToSlug } from "@/lib/tags";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAuthorByName } from "@/lib/authors";
import { escapeStrayAngleBrackets } from "@/lib/mdx-sanitize";
import { ArticleCard } from "@/components/articles/article-card";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import { ViewTracker } from "@/components/articles/view-tracker";
import { AdUnit } from "@/components/ads/ad-unit";
import { ChartLine, ChartBar, ChartArea } from "@/components/charts";
import { Toc, type TocHeading } from "@/components/articles/toc";
import { ShareBar } from "@/components/articles/share-bar";
import { AuthorBio } from "@/components/articles/author-bio";
import { RelatedTools } from "@/components/articles/related-tools";
import { AffiliateDisclosure } from "@/components/affiliates/affiliate-disclosure";
import { ProductCard } from "@/components/affiliates/product-card";
import { GearLink } from "@/components/affiliates/gear-link";

/**
 * Extract h2/h3 headings from raw markdown content, skipping fenced code blocks.
 * Generates slug IDs using GithubSlugger to match rehype-slug output exactly.
 */
function extractHeadings(content: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  let inCodeBlock = false;

  for (const line of content.split("\n")) {
    // Toggle code block state on opening/closing fences.
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    const rawMatch = h2 ?? h3;
    if (!rawMatch) continue;

    const level: 2 | 3 = h2 ? 2 : 3;
    // Strip inline markdown: links, bold, italic, inline code.
    const text = rawMatch[1]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .trim();

    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

interface ArticlePageProps {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { section: sectionSlug, slug } = await params;
  const locale = await getLocale();

  const resolved = getSectionBySlug(sectionSlug, locale);
  if (!resolved) return {};

  const filePath = path.join(process.cwd(), "content", locale, resolved.sectionId, `${slug}.md`);
  if (!fs.existsSync(filePath)) return {};

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter } = matter(fileContent);

  const siteUrl = locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const articleUrl = `${siteUrl}/${sectionSlug}/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url: articleUrl,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      ...(frontmatter.coverImage && {
        images: [{ url: frontmatter.coverImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      ...(frontmatter.coverImage && { images: [frontmatter.coverImage] }),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { section: sectionSlug, slug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const resolved = getSectionBySlug(sectionSlug, locale);
  if (!resolved) notFound();

  const { sectionId, section: sectionI18n } = resolved;
  const sectionConfig = SECTIONS[sectionId];

  const filePath = path.join(process.cwd(), "content", locale, sectionId, `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const readingTime = getReadingTime(content);

  const affiliateLabels = {
    cta: dict.affiliate.cta,
    disclosureShort: dict.affiliate.disclosureShort,
  };
  const mdxComponents = {
    ChartLine,
    ChartBar,
    ChartArea,
    GearLink,
    ProductCard: (props: { id?: string }) => (
      <ProductCard {...props} locale={locale} labels={affiliateLabels} />
    ),
  };

  const { content: mdxContent } = await compileMDX({
    source: escapeStrayAngleBrackets(content),
    components: mdxComponents,
    options: {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeKatex,
        ],
      },
    },
  });

  const sources = (frontmatter.sources as { title: string; url: string; type: string }[]) || [];

  const tags: string[] = (frontmatter.tags as string[]) || [];
  const tagBase = locale === "en" ? "topic" : "tema";

  // Build an ArticleCard from the current article's frontmatter for tag-based ranking.
  const currentCard = {
    slug,
    section: sectionId,
    title: frontmatter.title as string,
    subtitle: frontmatter.subtitle as string | undefined,
    excerpt: frontmatter.excerpt as string | undefined,
    date: frontmatter.date as string,
    author: (frontmatter.author as string) || sectionI18n.journalist,
    tags,
    readingTime,
    coverImage: frontmatter.coverImage as string | undefined,
  };

  // Resolved author name and profile (for byline link + author page).
  const authorName = (frontmatter.author as string) || sectionI18n.journalist;
  const authorProfile = getAuthorByName(authorName, locale);
  const authorBase = locale === "en" ? "author" : "autor";

  // Related by shared tags; fall back to same-section recents to pad to 3.
  const byTags = getRelatedByTags(currentCard, locale, 3);
  const relatedArticles = byTags.length >= 3
    ? byTags
    : (() => {
        const slugsSeen = new Set(byTags.map((a) => a.slug));
        slugsSeen.add(slug);
        const filler = getAllArticles(sectionId, locale)
          .filter((a) => !slugsSeen.has(a.slug));
        return [...byTags, ...filler].slice(0, 3);
      })();

  // Extract headings for the TOC (server-side, matches rehype-slug).
  const headings = extractHeadings(content);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: frontmatter.title,
            description: frontmatter.excerpt,
            image: frontmatter.coverImage ? [frontmatter.coverImage] : undefined,
            datePublished: frontmatter.date,
            author: {
              "@type": "Person",
              name: authorName,
            },
            publisher: {
              "@type": "Organization",
              name: locale === "en" ? "PedalSci" : "Velociencia",
              url: locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl"}/${sectionI18n.slug}/${slug}`,
            },
          }),
        }}
      />
      <ViewTracker slug={slug} section={sectionId} />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--color-text)]">
            {dict.article.breadcrumbHome}
          </Link>
          <span className="text-[var(--color-border)]">/</span>
          <Link
            href={`/${sectionI18n.slug}`}
            className="transition-colors hover:text-[var(--color-text)]"
            style={{ color: sectionConfig.color }}
          >
            {sectionI18n.name}
          </Link>
        </nav>
      </div>

      {/* Hero gradient area */}
      <div
        className="relative mt-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(${sectionConfig.colorVar}-dark) 0%, ${sectionConfig.color} 50%, var(${sectionConfig.colorVar}-light) 100%)`,
          minHeight: "40vh",
        }}
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        {frontmatter.coverImage && (
          <img src={frontmatter.coverImage} alt={frontmatter.title} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            {sectionI18n.name}
          </span>

          <h1 className="animate-fade-in-up mt-5 font-serif text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl xl:text-6xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            {frontmatter.title}
          </h1>

          {frontmatter.subtitle && (
            <p className="animate-fade-in-up stagger-1 mt-4 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {frontmatter.subtitle}
            </p>
          )}

          <div className="animate-fade-in-up stagger-2 mt-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60">
            <AuthorAvatar name={authorName} color={sectionConfig.color} size="sm" />
            <span className="normal-case tracking-normal">
              {dict.article.by}{" "}
              {authorProfile ? (
                <Link
                  href={`/${authorBase}/${authorProfile.slug}`}
                  className="transition-colors hover:underline"
                >
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </span>
            <span>&middot;</span>
            {frontmatter.date && <time>{formatDate(frontmatter.date, locale)}</time>}
            <span>&middot;</span>
            <span>{readingTime} {dict.article.minRead}</span>
          </div>

          <div className="animate-fade-in-up stagger-2 mt-5">
            <ShareBar
              title={frontmatter.title as string}
              color={sectionConfig.color}
              copyLabel={dict.article.copyLink}
              copiedLabel={dict.article.copied}
            />
          </div>
        </div>
      </div>

      {/* Article body + TOC layout */}
      {/*
        Layout strategy: a CSS grid on 2xl screens with three columns:
          [auto]  [minmax(0,68ch)]  [200px]
        The reading column stays centered at max-w-[68ch].
        On smaller screens, collapse to a single centered column (no TOC).
      */}
      <div className="mx-auto w-full max-w-[calc(68ch+200px+3rem)] px-4 sm:px-6 lg:px-8">
        <div className="2xl:grid 2xl:grid-cols-[1fr_minmax(0,68ch)_200px] 2xl:gap-x-12">
          {/* Empty left gutter on 2xl */}
          <div className="hidden 2xl:block" />

          {/* Reading column — constrained to 68ch on all sizes; on 2xl the grid handles centering */}
          <div className="mx-auto max-w-[68ch] py-10 sm:py-14 2xl:mx-0 2xl:max-w-none">
            {frontmatter.affiliate && (
              <div className="mb-8">
                <AffiliateDisclosure text={dict.affiliate.disclosure} />
              </div>
            )}
            <div className={`prose prose-lg prose-${sectionId === "nutricion" ? "nutricion" : sectionId === "ciencia" ? "ciencia" : sectionId === "entrenamiento" ? "entrenamiento" : "competencia"}`}>
              {mdxContent}
            </div>

            {/* Tag chips — after prose body, before references */}
            {tags.length > 0 && (
              <div className="mt-10 border-t border-[var(--color-border-light)] pt-6">
                <p
                  className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: sectionConfig.color }}
                >
                  {dict.article.relatedTopics}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/${tagBase}/${tagToSlug(tag)}`}
                      className="tag-chip rounded-full border border-[var(--color-border)] px-3 py-1 text-[12px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--tag-section-color)] hover:border-[var(--tag-section-color)]"
                      style={{ ["--tag-section-color" as string]: sectionConfig.color }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TOC aside — sticky, only visible on 2xl */}
          <div className="hidden 2xl:block">
            <div className="pt-10 sm:pt-14">
              <Toc
                headings={headings}
                label={dict.article.tableOfContents}
                color={sectionConfig.color}
              />
            </div>
          </div>
        </div>
      </div>

      {/* References */}
      {sources.length > 0 && (
        <div className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              {dict.article.references}
            </h2>
            <div className="mt-1 h-[2px] w-10" style={{ backgroundColor: sectionConfig.color }} />
            <ol className="mt-5 space-y-3">
              {sources.map((source, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: sectionConfig.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-secondary)] underline underline-offset-2 transition-colors hover:text-[var(--color-text)]"
                    >
                      {source.title}
                    </a>
                    {source.type && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `var(${sectionConfig.colorVar}-light)`,
                          color: `var(${sectionConfig.colorVar}-dark)`,
                        }}
                      >
                        {source.type}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* Related interactive tools (original, hands-on value) */}
      <RelatedTools
        sectionId={sectionId}
        tags={tags}
        locale={locale}
        color={sectionConfig.color}
        label={dict.article.relatedTools}
        intro={dict.article.relatedToolsIntro}
      />

      {/* Author bio */}
      <AuthorBio
        authorName={authorName}
        locale={locale}
        color={sectionConfig.color}
        label={dict.article.aboutAuthor}
        viewAllLabel={dict.authors.viewAllBy}
      />

      {/* Ad: after article content */}
      <div className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
        <AdUnit slot="1161395850" />
      </div>

      {/* Keep reading */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mb-6 border-t-[4px] pt-4" style={{ borderColor: sectionConfig.color }}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: sectionConfig.color }}>
                {dict.article.keepReading}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt ?? ""}
                  date={article.date}
                  readingTime={article.readingTime}
                  slug={article.slug}
                  section={article.section}
                  coverImage={article.coverImage}
                  variant="standard"
                  author={SECTIONS_I18N[locale][article.section].journalist}
                  authorColor={sectionConfig.color}
                  locale={locale}
                  byLabel={dict.article.by}
                  minReadLabel={dict.article.minRead}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mx-auto max-w-[68ch] px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          href={`/${sectionI18n.slug}`}
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: sectionConfig.color }}
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {dict.article.backTo} {sectionI18n.name}
        </Link>
      </div>
    </article>
  );
}
