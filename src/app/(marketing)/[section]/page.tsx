import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SECTIONS, getSectionBySlug, type SectionId } from "@/lib/constants";
import { getAllArticles } from "@/lib/markdown";
import { tagToSlug } from "@/lib/tags";
import { SectionToolbar } from "@/components/articles/section-toolbar";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const locale = await getLocale();

  const resolved = getSectionBySlug(sectionSlug, locale);
  if (!resolved) return {};

  return {
    title: resolved.section.name,
    description: resolved.section.description,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const resolved = getSectionBySlug(sectionSlug, locale);
  if (!resolved) notFound();

  const { sectionId, section: sectionI18n } = resolved;
  const sectionConfig = SECTIONS[sectionId];

  const articles = getAllArticles(sectionId, locale).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? "",
    date: a.date,
    readingTime: a.readingTime,
    section: a.section as SectionId,
    coverImage: a.coverImage,
    tags: a.tags ?? [],
    author: a.author ?? sectionI18n.journalist,
  }));

  // Build the top tags for this section (server-side, top 15 by frequency)
  const tagFreq = new Map<string, { display: string; count: number }>();
  for (const article of articles) {
    const seen = new Set<string>();
    for (const raw of article.tags) {
      const tag = raw.trim();
      if (!tag) continue;
      const slug = tagToSlug(tag);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const existing = tagFreq.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tagFreq.set(slug, { display: tag, count: 1 });
      }
    }
  }
  const availableTags = [...tagFreq.entries()]
    .sort((a, b) => b[1].count - a[1].count || a[1].display.localeCompare(b[1].display))
    .slice(0, 15)
    .map(([slug, { display }]) => ({ slug, display }));

  return (
    <div>
      {/* Section header with gradient background */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(${sectionConfig.colorVar}-dark) 0%, ${sectionConfig.color} 50%, var(${sectionConfig.colorVar}-light) 100%)`,
        }}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="animate-fade-in-up relative z-10">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              {dict.article.section}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {sectionI18n.name}
            </h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              {sectionI18n.description}
            </p>
          </div>
        </div>
      </div>

      {/* Articles with filters, sort, and load-more */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionToolbar
          articles={articles}
          sectionId={sectionId}
          sectionColor={sectionConfig.color}
          availableTags={availableTags}
        />
      </div>
    </div>
  );
}
