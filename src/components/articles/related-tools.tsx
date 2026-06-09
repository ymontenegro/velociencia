import type { CSSProperties } from "react";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, type SectionId } from "@/lib/constants";
import { getRelatedTools, toolHref, toolColor } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";

interface RelatedToolsProps {
  sectionId: SectionId;
  tags: string[];
  locale: Locale;
  /** Section accent color for the panel header. */
  color: string;
  label: string;
  intro: string;
}

/**
 * Surfaces 1–2 interactive calculators relevant to the article (by tag, then by
 * section). Each card gets full Race Telemetry treatment (tool-scope, tool-panel,
 * tool-corners, grid bg, section eyebrow + live dot) — visually consistent with
 * ToolCard in the tools index and homepage highlight band.
 */
export function RelatedTools({ sectionId, tags, locale, color, label, intro }: RelatedToolsProps) {
  const tools = getRelatedTools(sectionId, tags, 2);
  if (tools.length === 0) return null;

  const panelAccentStyle = { "--tool-accent": color } as CSSProperties;

  return (
    <section className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
      {/*
       * Outer wrapper: tool-scope + tool-corners give the panel the HUD corner
       * ticks driven by the article's section color. The grid bg reinforces the
       * instrument-panel feel without competing with the editorial prose above.
       */}
      <div
        className="tool-scope tool-corners relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8"
        style={panelAccentStyle}
      >
        {/* Telemetry grid — fades to bottom */}
        <div
          aria-hidden="true"
          className="tool-grid-bg pointer-events-none absolute inset-0 opacity-40"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
          }}
        />
        {/* Corner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.07] blur-2xl"
          style={{ backgroundColor: "var(--tool-accent)" }}
        />

        <div className="relative z-10">
          {/* HUD header */}
          <div className="mb-1 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="tool-live-dot h-1.5 w-1.5 flex-none rounded-full"
              style={{ backgroundColor: "var(--tool-accent)" }}
            />
            <p
              className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--tool-accent)" }}
            >
              {label}
            </p>
          </div>
          <div
            className="mb-4 h-[2px] w-8 rounded-full"
            style={{ backgroundColor: "var(--tool-accent)" }}
          />

          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {intro}
          </p>

          {/* Tool cards — each with its own Race Telemetry treatment */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => {
              const tc = toolColor(tool);
              const sectionConfig = SECTIONS[tool.sectionId];
              const sectionName = SECTIONS_I18N[locale][tool.sectionId as SectionId].name;
              const cardAccentStyle = {
                "--tool-accent": `var(${sectionConfig.colorVar}, ${tc})`,
              } as CSSProperties;

              return (
                <Link
                  key={tool.id}
                  href={toolHref(tool, locale)}
                  className="tool-scope group block"
                  style={cardAccentStyle}
                >
                  <article className="tool-panel tool-panel-hover tool-corners relative flex flex-col overflow-hidden rounded-xl p-5 transition-all duration-500 ease-out hover:-translate-y-0.5">
                    {/* Grid bg */}
                    <div
                      aria-hidden="true"
                      className="tool-grid-bg pointer-events-none absolute inset-0 opacity-50"
                      style={{
                        maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
                      }}
                    />
                    {/* Accent corner glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.14]"
                      style={{ backgroundColor: "var(--tool-accent)" }}
                    />

                    <div className="relative z-10">
                      {/* Accent rule — grows on hover */}
                      <div
                        className="h-[2px] w-6 rounded-full transition-all duration-500 group-hover:w-12"
                        style={{ backgroundColor: "var(--tool-accent)" }}
                      />

                      {/* Section eyebrow with live dot */}
                      <span className="mt-3 flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="tool-live-dot h-1 w-1 flex-none rounded-full"
                          style={{ backgroundColor: "var(--tool-accent)" }}
                        />
                        <span
                          className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]"
                          style={{ color: "var(--tool-accent)" }}
                        >
                          {sectionName}
                        </span>
                      </span>

                      {/* Tool title */}
                      <h3 className="mt-2 font-serif text-base font-bold leading-snug text-[var(--color-text)]">
                        {tool.title[locale]}
                      </h3>

                      {/* Tagline */}
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                        {tool.tagline[locale]}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
