import Link from "next/link";
import type { SectionId } from "@/lib/constants";
import { SECTIONS } from "@/lib/constants";

interface SectionPreviewProps {
  sectionId: SectionId;
}

export function SectionPreview({ sectionId }: SectionPreviewProps) {
  const section = SECTIONS[sectionId];
  const initial = section.name.charAt(0);

  return (
    <Link href={`/${section.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.02]">
        {/* Subtle gradient background from section color */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
          style={{ backgroundColor: section.color }}
          aria-hidden="true"
        />

        {/* Large decorative letter watermark */}
        <span
          className="pointer-events-none absolute -bottom-4 -right-2 select-none font-serif text-[8rem] font-bold leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
          style={{ color: section.color }}
          aria-hidden="true"
        >
          {initial}
        </span>

        {/* Accent line at top */}
        <div
          className="mb-6 h-[2px] w-8 transition-all duration-500 group-hover:w-14"
          style={{ backgroundColor: section.color }}
        />

        {/* Section geometric icon */}
        <div className="mb-4 flex items-center gap-3">
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: section.color }}
          >
            {sectionId === "nutricion" && (
              <path
                d="M10 2L2 10l8 8 8-8-8-8z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            )}
            {sectionId === "ciencia" && (
              <circle
                cx="10"
                cy="10"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            )}
            {sectionId === "entrenamiento" && (
              <>
                <line x1="3" y1="17" x2="17" y2="3" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: section.color }}
          >
            {section.name}
          </span>
        </div>

        {/* Title in serif */}
        <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-text)]">
          {section.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {section.description}
        </p>

        {/* CTA link */}
        <span
          className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors"
          style={{ color: section.color }}
        >
          Explorar artículos
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </article>
    </Link>
  );
}
