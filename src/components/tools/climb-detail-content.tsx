/**
 * Server component for a single-climb detail page.
 *
 * Rendered by both routes:
 *   src/app/(marketing)/datos/[tool]/[item]/page.tsx  (ES → /datos/puertos/<id>)
 *   src/app/(marketing)/data/[tool]/[item]/page.tsx   (EN → /data/climbs/<id>)
 *
 * The locale-specific generateStaticParams + generateMetadata live in each route
 * file; data fetching, JSON-LD and JSX live here so there is one source of truth.
 * Reuses the climbs dictionary (dict.climbs) and the shared chart/metric
 * primitives so the page matches the in-table expanded card exactly.
 */

import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getSiteUrl } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getClimbById,
  fietsIndex,
  difficultyBand,
  type DifficultyBand,
} from "@/lib/datasets/climbs";
import { getToolById, toolHref, toolsIndexHref } from "@/lib/tools";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { getArticlesByTag, tagToSlug } from "@/lib/tags";
import { ArticleCard } from "@/components/articles/article-card";
import { ReadoutPanel } from "@/components/tools/ui";
import { ProfileChart, MetricCell, DetailField } from "@/components/tools/climb-shared";
import { cn } from "@/lib/utils";

/* Difficulty badge palette — mirrors climbs-database.tsx (fixed semantic hues). */
const DIFFICULTY_BADGE: Record<DifficultyBand, { backgroundColor: string; color: string }> = {
  exigente: { backgroundColor: "rgba(14,165,233,0.14)", color: "#0284c7" },
  muy_dura: { backgroundColor: "rgba(245,158,11,0.14)", color: "#b45309" },
  extrema: { backgroundColor: "rgba(239,68,68,0.14)", color: "#dc2626" },
  mitica: { backgroundColor: "rgba(124,58,237,0.16)", color: "#7c3aed" },
};

/** Per-km gradient strip colour bands (mirrors road-sign colour coding). */
function gradientColor(g: number): string {
  if (g < 4) return "#22c55e";
  if (g < 7) return "#eab308";
  if (g < 10) return "#f97316";
  if (g < 13) return "#ef4444";
  return "#7f1d1d";
}

/** ISO 3166-1 alpha-2 → regional-indicator flag emoji. */
function flagEmoji(cc: string): string {
  if (!cc || cc.length !== 2) return "";
  return cc
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

interface ClimbDetailContentProps {
  climbId: string;
}

export async function ClimbDetailContent({ climbId }: ClimbDetailContentProps) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const t = dict.climbs;

  const climb = getClimbById(climbId);
  const tool = getToolById("climbs-database");
  if (!climb || !tool) notFound();

  const section = SECTIONS.entrenamiento;
  const color = section.color;
  const accentVar = section.colorVar;

  const siteUrl = getSiteUrl(locale);
  const indexHref = toolHref(tool, locale); // /datos/puertos | /data/climbs
  const dataIndexHref = toolsIndexHref(locale, "dataset"); // /datos | /data
  const canonical = `${siteUrl}${indexHref}/${climb.id}`;

  const fiets = fietsIndex(climb);
  const band = difficultyBand(climb);
  const accent = "var(--tool-accent)";

  const relatedArticles = getArticlesByTag(tagToSlug(tool.relatedTag), locale).slice(0, 3);

  const accentStyle = { "--tool-accent": `var(${accentVar}, ${color})` } as CSSProperties;

  // ── Structured data ──────────────────────────────────────────────
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.navHome, item: siteUrl },
      { "@type": "ListItem", position: 2, name: dict.tools.navData, item: `${siteUrl}${dataIndexHref}` },
      { "@type": "ListItem", position: 3, name: t.navClimbs, item: `${siteUrl}${indexHref}` },
      { "@type": "ListItem", position: 4, name: climb.name, item: canonical },
    ],
  };

  const placeLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: climb.name,
    description: climb.famous_for[locale],
    url: canonical,
    geo: {
      "@type": "GeoCoordinates",
      latitude: climb.summit_lat,
      longitude: climb.summit_lng,
      elevation: climb.summit_elevation_m,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: t.fieldLength, value: climb.length_km, unitCode: "KMT" },
      { "@type": "PropertyValue", name: t.fieldAvg, value: climb.avg_gradient, unitText: "%" },
      { "@type": "PropertyValue", name: t.fieldGain, value: climb.elevation_gain_m, unitCode: "MTR" },
      { "@type": "PropertyValue", name: t.fietsLabel, value: Number(fiets.toFixed(1)) },
    ],
  };

  const flag = flagEmoji(climb.country);
  const ascent = climb.ascent_name ? climb.ascent_name[locale] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }}
      />

      <div className="tool-scope" style={accentStyle}>
        {/* ── Header — Race Telemetry ─────────────────────────────── */}
        <div
          className="tool-corners relative overflow-hidden border-b border-[var(--color-border)]"
          style={{
            background:
              "linear-gradient(170deg, color-mix(in srgb, var(--tool-accent) 5%, var(--color-bg-card)) 0%, var(--color-bg-card) 45%)",
          }}
        >
          <div
            aria-hidden="true"
            className="tool-grid-bg pointer-events-none absolute inset-0 opacity-50"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-[0.07] blur-3xl"
            style={{ backgroundColor: color }}
          />

          <div className="tool-sweep relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
              {/* Back link */}
              <Link
                href={indexHref}
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] sm:mb-8"
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
                {t.detailBackToClimbs}
              </Link>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="tool-live-dot h-1.5 w-1.5 flex-none rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {t.detailEyebrow}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-3 break-words font-serif text-3xl font-bold leading-snug text-[var(--color-text)] sm:text-4xl lg:text-5xl">
                {climb.name}
                {ascent && (
                  <span className="block text-xl font-normal text-[var(--color-text-secondary)] sm:text-2xl">
                    {ascent}
                  </span>
                )}
              </h1>

              {/* Accent rule */}
              <div className="mt-4 h-[2px] w-12 rounded-full" style={{ backgroundColor: color }} />

              {/* Subtitle: difficulty badge + region + country */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-[var(--color-text-secondary)]">
                <span
                  className="rounded-full px-2.5 py-0.5 text-sm font-medium"
                  style={DIFFICULTY_BADGE[band]}
                >
                  {t.difficultyLabels[band]}
                </span>
                <span>
                  {flag && <span aria-hidden="true">{flag} </span>}
                  {climb.region[locale]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          {/* Instrument bar */}
          <div
            className="mb-6 h-[3px] w-full rounded-full sm:mb-8"
            style={{
              background: `linear-gradient(to right, var(${accentVar}-dark, ${color}), ${color} 50%, var(${accentVar}-light, color-mix(in srgb, ${color} 35%, white)))`,
            }}
          />

          {/* Key metrics */}
          <ReadoutPanel className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <MetricCell label={t.colFiets} value={fiets.toFixed(1)} primary />
            <MetricCell label={t.colLength} value={String(climb.length_km)} unit="km" />
            <MetricCell label={t.colGain} value={String(climb.elevation_gain_m)} unit="m" />
            <MetricCell label={t.colAvg} value={String(climb.avg_gradient)} unit="%" />
            <MetricCell label={t.colMax} value={String(climb.max_gradient)} unit="%" />
            <MetricCell label={t.colSummit} value={String(climb.summit_elevation_m)} unit="m" />
          </ReadoutPanel>

          {/* Elevation profile */}
          {climb.profile && climb.profile.length > 1 && (
            <div className="mt-8">
              <h2 className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                {t.profileTitle}
              </h2>
              <ProfileChart climb={climb} accent={color} accentVar={accentVar} dict={t} />
              {/* Gradient strip */}
              {climb.gradient_segments && climb.gradient_segments.length > 0 && (
                <div className="mt-2 flex h-2.5 w-full overflow-hidden rounded">
                  {climb.gradient_segments.map((seg, i) => (
                    <div
                      key={i}
                      title={`${seg.from_km}–${seg.to_km} km · ${seg.gradient}%`}
                      style={{
                        flex: seg.to_km - seg.from_km,
                        backgroundColor: gradientColor(seg.gradient),
                      }}
                    />
                  ))}
                </div>
              )}
              {/* Provenance note */}
              <p
                className={cn(
                  "mt-2 text-xs",
                  climb.profile_source === "synthetic"
                    ? "text-amber-600 dark:text-amber-500"
                    : "text-[var(--color-text-muted)]",
                )}
              >
                {climb.profile_source === "synthetic"
                  ? `⚠ ${t.profileSyntheticNote}`
                  : t.profileDemNote}
              </p>
            </div>
          )}

          {/* FIETS explainer */}
          <div
            className="mt-8 rounded-lg px-4 py-3 text-sm text-[var(--color-text-secondary)]"
            style={{ backgroundColor: "color-mix(in srgb, var(--tool-accent) 8%, transparent)" }}
          >
            <strong style={{ color: accent }}>{t.fietsLabel}:</strong> {t.fietsExplain}
          </div>

          {/* Data grid */}
          <div className="mt-8 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            <DetailField label={t.fieldRegion}>{climb.region[locale]}</DetailField>
            <DetailField label={t.fieldSurface}>{t.surfaceLabels[climb.surface]}</DetailField>
            <DetailField label={t.fieldStart}>{climb.start_elevation_m} m</DetailField>
            <DetailField label={t.fieldSummit}>{climb.summit_elevation_m} m</DetailField>
            {climb.best_season && (
              <DetailField label={t.fieldSeason}>{climb.best_season[locale]}</DetailField>
            )}
          </div>

          {/* Editorial prose */}
          <div className="mt-6 space-y-5">
            <DetailField label={t.fieldFamousFor}>{climb.famous_for[locale]}</DetailField>
            {climb.notes && (
              <DetailField label={t.fieldNotes}>{climb.notes[locale]}</DetailField>
            )}
          </div>

          {/* Source */}
          <div className="mt-6 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)]">
            {t.sourceLabel}:{" "}
            <a
              href={climb.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted hover:text-[var(--color-text-secondary)]"
              style={{ color: accent }}
            >
              {climb.source_name}
            </a>{" "}
            · {t.verifiedLabel} {climb.last_verified}
          </div>

          {/* Methodology box */}
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="flex min-h-0">
              <div className="w-[3px] flex-none" style={{ backgroundColor: "var(--tool-accent)" }} />
              <div className="flex-1 px-5 py-4">
                <h2 className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {t.methodology}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {t.methodologyText}
                </p>
              </div>
            </div>
          </div>

          {/* Back to all climbs */}
          <div className="mt-8">
            <Link
              href={indexHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
              style={{ color: accent }}
            >
              <span aria-hidden="true">←</span>
              {t.detailBackToClimbs}
            </Link>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <aside className="mt-12 sm:mt-16" aria-label={dict.tools.relatedArticles}>
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-6 flex-none rounded-full" style={{ backgroundColor: color }} />
                <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  {dict.tools.fromEditorial}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--color-text)]">
                {dict.tools.relatedArticles}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
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
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
