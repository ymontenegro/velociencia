/**
 * Shared server component for tool detail pages.
 *
 * Used by both:
 *   src/app/(marketing)/tools/[tool]/page.tsx       (EN route)
 *   src/app/(marketing)/herramientas/[tool]/page.tsx (ES route)
 *
 * The locale-specific generateStaticParams and generateMetadata live in each
 * route file (they differ: EN slugs vs ES slugs, and the locale changes
 * canonical/hreflang). Everything else — data fetching, JSON-LD, JSX — lives
 * here so there is a single source of truth.
 */

import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getSiteUrl } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getToolBySlug, toolColor, toolHref } from "@/lib/tools";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { getArticlesByTag, tagToSlug } from "@/lib/tags";
import { CalculatorRenderer } from "@/components/tools/calculator-renderer";
import { AffiliateDisclosure } from "@/components/affiliates/affiliate-disclosure";
import { ArticleCard } from "@/components/articles/article-card";
import { buildDatasetJsonLd } from "@/lib/datasets/dataset-jsonld";

interface ToolPageContentProps {
  toolSlug: string;
}

export async function ToolPageContent({ toolSlug }: ToolPageContentProps) {
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

  // Eyebrow type label: "Calculator" / "Calculadora" or "Explorer" / "Explorador"
  const toolTypeLabel = isDataset
    ? locale === "en" ? "Explorer" : "Explorador"
    : locale === "en" ? "Calculator" : "Calculadora";

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

  // --tool-accent drives the Race Telemetry tokens throughout this page.
  const accentStyle = {
    "--tool-accent": `var(${sectionConfig.colorVar}, ${color})`,
  } as CSSProperties;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
       * Single tool-scope wrapper: sets --tool-accent once for the entire page.
       * CalculatorRenderer's ToolPanel re-sets --tool-accent via its own inline
       * style, so there's no inheritance conflict.
       */}
      <div className="tool-scope" style={accentStyle}>

        {/* ── Page header — Race Telemetry ───────────────────────────────── */}
        {/*
         * tool-corners on this div (::before top-left, ::after bottom-right).
         * tool-sweep lives on the inner wrapper to avoid ::after conflict.
         * Gradient face computed via CSS color-mix so --tool-accent + dark-mode vars
         * are both honoured at render time.
         */}
        <div
          className="tool-corners relative overflow-hidden border-b border-[var(--color-border)]"
          style={{
            background:
              "linear-gradient(170deg, color-mix(in srgb, var(--tool-accent) 5%, var(--color-bg-card)) 0%, var(--color-bg-card) 45%)",
          }}
        >
          {/* Telemetry grid */}
          <div
            aria-hidden="true"
            className="tool-grid-bg pointer-events-none absolute inset-0 opacity-50"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            }}
          />

          {/* Corner accent glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-[0.07] blur-3xl"
            style={{ backgroundColor: color }}
          />

          {/* Inner wrapper: sweep animation (::after) — separate from tool-corners */}
          <div className="tool-sweep relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

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

              {/* Mono eyebrow: section · type */}
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="tool-live-dot h-1.5 w-1.5 flex-none rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {sectionName} · {toolTypeLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                {tool.title[locale]}
              </h1>

              {/* Accent rule */}
              <div
                className="mt-4 h-[2px] w-12 rounded-full"
                style={{ backgroundColor: color }}
              />

              {/* Description */}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {tool.description[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* ── Content area ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

          {/* Gradient instrument bar — connects header to tool */}
          <div
            className="mb-8 h-[3px] w-full rounded-full"
            style={{
              background: `linear-gradient(to right, var(${sectionConfig.colorVar}-dark, ${color}), ${color} 50%, var(${sectionConfig.colorVar}-light, color-mix(in srgb, ${color} 35%, white)))`,
            }}
          />

          {/* Disclosure banner — guaranteed at the route level for dataset tools */}
          {isDataset && (
            <div className="mb-6">
              <AffiliateDisclosure variant="banner" text={datasetDict.disclaimer} />
            </div>
          )}

          {/* Tool (calculator or dataset) — call preserved exactly */}
          <CalculatorRenderer toolId={tool.id} color={color} />

          {/* Methodology / disclaimer box — instrument panel style with accent bar */}
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex min-h-0">
              {/* Left accent bar */}
              <div
                className="w-[3px] flex-none"
                style={{ backgroundColor: "var(--tool-accent)" }}
              />
              <div className="flex-1 px-5 py-4">
                {isDataset ? (
                  <>
                    <h2 className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
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
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-14">
              {/* Mono eyebrow above section title */}
              <div className="flex items-center gap-2">
                <div
                  className="h-[2px] w-6 flex-none rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {dict.tools.fromEditorial}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--color-text)]">
                {dict.tools.relatedArticles}
              </h2>

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
      </div>
    </>
  );
}
