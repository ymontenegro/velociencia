import Link from "next/link";
import { getRelatedTools, toolHref, toolColor } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";
import type { SectionId } from "@/lib/constants";

interface RelatedToolsProps {
  sectionId: SectionId;
  tags: string[];
  locale: Locale;
  /** Section accent color for the heading. */
  color: string;
  label: string;
  intro: string;
}

/**
 * Surfaces 1–2 interactive calculators relevant to the article (by tag, then by
 * section). Renders nothing when no tool matches, so it never shows an empty box.
 */
export function RelatedTools({ sectionId, tags, locale, color, label, intro }: RelatedToolsProps) {
  const tools = getRelatedTools(sectionId, tags, 2);
  if (tools.length === 0) return null;

  return (
    <section className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color }}
        >
          {label}
        </p>
        <div className="mt-1 h-[2px] w-8" style={{ backgroundColor: color }} />

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {intro}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={toolHref(tool, locale)}
              className="group rounded-lg border border-[var(--color-border)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="h-1 w-8 rounded-full"
                style={{ backgroundColor: toolColor(tool) }}
              />
              <h3 className="mt-3 font-serif text-base font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-text-secondary)]">
                {tool.title[locale]}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {tool.tagline[locale]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
