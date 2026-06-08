// Espejo de src/app/(marketing)/herramientas/[tool]/page.tsx (versión ES) — sincronizar cambios en AMBOS.
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getSiteUrl } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TOOLS, getToolBySlug, toolColor, toolHref } from "@/lib/tools";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { getArticlesByTag, tagToSlug } from "@/lib/tags";
import { CalculatorRenderer } from "@/components/tools/calculator-renderer";
import { AffiliateDisclosure } from "@/components/affiliates/affiliate-disclosure";
import { ArticleCard } from "@/components/articles/article-card";
import { buildDatasetJsonLd } from "@/lib/datasets/dataset-jsonld";

interface ToolPageProps {
  params: Promise<{ tool: string }>;
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug.en }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  const tool = getToolBySlug(toolSlug, locale);
  if (!tool) return {};

  const siteUrl = getSiteUrl(locale);
  const canonical = `${siteUrl}${toolHref(tool, locale)}`;

  return {
    title: tool.title[locale],
    description: tool.description[locale],
    alternates: { canonical },
    openGraph: {
      title: tool.title[locale],
      description: tool.description[locale],
      url: canonical,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const tool = getToolBySlug(toolSlug, locale);
  if (!tool) notFound();

  const color = toolColor(tool);
  const sectionConfig = SECTIONS[tool.sectionId];
  const sectionName = SECTIONS_I18N[locale][tool.sectionId].name;
  const siteUrl = getSiteUrl(locale);
  const canonical = `${siteUrl}${toolHref(tool, locale)}`;

  const relatedArticles = getArticlesByTag(tagToSlug(tool.relatedTag), locale).slice(0, 3);
  const indexHref = locale === "en" ? "/tools" : "/herramientas";

  const isDataset = tool.kind === "dataset";

  // Per-dataset dictionary section for the disclosure banner + methodology note.
  const datasetDict =
    tool.id === "evidence-explorer"
      ? dict.evidence
      : tool.id === "climbs-database"
        ? dict.climbs
        : tool.id === "race-calendar"
          ? dict.races
          : dict.comparator;

  const datasetLd = isDataset
    ? buildDatasetJsonLd(tool.id, locale, {
        name: tool.title[locale],
        description: tool.description[locale],
        url: canonical,
        siteUrl,
        publisherName: locale === "en" ? "PedalSci" : "Velociencia",
      })
    : null;

  const jsonLd = datasetLd ?? {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title[locale],
    description: tool.description[locale],
    applicationCategory: "HealthApplication",
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: locale === "en" ? "PedalSci" : "Velociencia",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Back link */}
          <Link
            href={indexHref}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {dict.tools.backToTools}
          </Link>

          {/* Section badge */}
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: color }}
          >
            {sectionName}
          </span>

          {/* Title */}
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
            {tool.title[locale]}
          </h1>

          {/* Accent line */}
          <div className="mt-4 h-[3px] w-16" style={{ backgroundColor: color }} />

          {/* Description */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            {tool.description[locale]}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Gradient accent strip */}
        <div
          className="mb-8 h-1 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, var(${sectionConfig.colorVar}-dark), ${color}, var(${sectionConfig.colorVar}-light))`,
          }}
        />

        {/* Disclosure banner — guaranteed at the route level for dataset tools */}
        {isDataset && (
          <div className="mb-6">
            <AffiliateDisclosure variant="banner" text={datasetDict.disclaimer} />
          </div>
        )}

        {/* Tool (calculator or dataset) */}
        <CalculatorRenderer toolId={tool.id} color={color} />

        {/* Footer note — methodology for datasets, standard disclaimer otherwise */}
        <div className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-4">
          {isDataset ? (
            <>
              <h2 className="text-sm font-semibold text-[var(--color-text)]">
                {datasetDict.methodology}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {datasetDict.methodologyText}
              </p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              {dict.tools.disclaimer}
            </p>
          )}
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-text)]">
              {dict.tools.relatedArticles}
            </h2>
            <div className="mt-4 h-[2px] w-10" style={{ backgroundColor: color }} />

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article, i) => {
                const articleSection = SECTIONS[article.section];
                const journalist = SECTIONS_I18N[locale][article.section].journalist;
                const stagger = i < 3 ? `stagger-${i + 1}` : "";
                return (
                  <ArticleCard
                    key={`${article.section}-${article.slug}`}
                    title={article.title}
                    excerpt={article.excerpt ?? ""}
                    date={article.date}
                    readingTime={article.readingTime}
                    slug={article.slug}
                    section={article.section}
                    coverImage={article.coverImage}
                    tags={article.tags}
                    variant="standard"
                    author={journalist}
                    authorColor={articleSection.color}
                    locale={locale}
                    byLabel={dict.article.by}
                    minReadLabel={dict.article.minRead}
                    className={`animate-fade-in-up ${stagger}`.trim()}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
