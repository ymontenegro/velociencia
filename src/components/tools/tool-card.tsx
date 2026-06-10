import type { CSSProperties } from "react";
import Link from "next/link";
import { SECTIONS, SECTIONS_I18N } from "@/lib/constants";
import { toolHref, toolColor } from "@/lib/tools";
import type { ToolInfo } from "@/lib/tools";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ToolIcon } from "./tool-icon";

interface ToolCardProps {
  tool: ToolInfo;
  locale: Locale;
  openTool: string;
  className?: string;
}

/**
 * Reusable calculator card — shared by the /herramientas (·/tools) index and the
 * homepage highlight band. Race Telemetry language: instrument-panel face with
 * HUD corner ticks, faint telemetry grid, mono eyebrow, and accent driven by the
 * section CSS var via --tool-accent. Mirrors the ToolPanel aesthetic from ui/.
 */
export function ToolCard({ tool, locale, openTool, className }: ToolCardProps) {
  const color = toolColor(tool);
  const sectionConfig = SECTIONS[tool.sectionId];
  const sectionName = SECTIONS_I18N[locale][tool.sectionId].name;
  const href = toolHref(tool, locale);

  // Set --tool-accent from the section CSS var (dark-mode-aware) with a hex fallback.
  const scopeStyle = {
    "--tool-accent": `var(${sectionConfig.colorVar}, ${color})`,
  } as CSSProperties;

  return (
    <Link
      href={href}
      className={cn("tool-scope group block h-full", className)}
      style={scopeStyle}
    >
      {/*
       * tool-panel: instrument-panel background gradient + border + HUD shadow
       * tool-panel-hover: accent-tinted shadow on hover
       * tool-corners: two-corner HUD tick marks (::before top-left, ::after bottom-right)
       * overflow-hidden: clips the telemetry grid and corner glow decorations
       */}
      <article className="tool-panel tool-panel-hover tool-corners relative flex h-full flex-col overflow-hidden rounded-xl transition-all duration-500 ease-out hover:-translate-y-1">
        {/* Telemetry grid — fades toward the bottom for depth */}
        <div
          aria-hidden="true"
          className="tool-grid-bg pointer-events-none absolute inset-0 opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 60%)",
          }}
        />

        {/* Soft corner glow in the section accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.16]"
          style={{ backgroundColor: "var(--tool-accent)" }}
        />

        {/* Large faint icon watermark */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-7 -right-5 opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{ color: "var(--tool-accent)" }}
        >
          <ToolIcon toolId={tool.id} className="h-32 w-32" />
        </span>

        {/* Content — sits above all decorations */}
        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
          {/* Accent rule — animates width on hover */}
          <div
            className="h-[2px] w-8 rounded-full transition-all duration-500 ease-out group-hover:w-14"
            style={{ backgroundColor: "var(--tool-accent)" }}
          />

          {/* Icon */}
          <span className="mt-6 block" style={{ color: "var(--tool-accent)" }}>
            <ToolIcon toolId={tool.id} className="h-8 w-8" />
          </span>

          {/* Section eyebrow — mono, with live dot + type badge */}
          <span className="mt-5 flex items-center gap-2">
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
            {/* HUD type chip — CALC or DATA */}
            <span
              className="ml-auto rounded px-1.5 py-[2px] font-mono text-[8.5px] font-semibold uppercase tracking-[0.16em]"
              style={{
                color: "var(--tool-accent)",
                border: "1px solid color-mix(in srgb, var(--tool-accent) 35%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--tool-accent) 7%, transparent)",
              }}
            >
              {tool.kind === "dataset" ? "DATA" : "CALC"}
            </span>
          </span>

          {/* Title */}
          <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-[var(--color-text)] transition-colors duration-300">
            {tool.title[locale]}
          </h2>

          {/* Tagline */}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {tool.tagline[locale]}
          </p>

          {/* Sample stat — pre-computed mini-result (Race Telemetry readout) */}
          {tool.sampleStat && (
            <div className="mt-4 flex min-w-0 items-center justify-between gap-2 rounded border border-[color-mix(in_srgb,var(--tool-accent)_18%,transparent)] bg-[color-mix(in_srgb,var(--tool-accent)_6%,transparent)] px-2.5 py-2">
              <span className="min-w-0 truncate font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {tool.sampleStat.label[locale]}
              </span>
              <span
                className="shrink-0 font-mono text-sm font-semibold tabular-nums"
                style={{ color: "var(--tool-accent)" }}
              >
                {tool.sampleStat.value[locale]}
              </span>
            </div>
          )}

          {/* CTA — min-h-[44px] guarantees a tap-safe visual affordance on mobile */}
          <div className="mt-6 flex min-h-[44px] items-center gap-1.5 border-t border-[var(--color-border-light)] pt-4">
            <span
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: "var(--tool-accent)" }}
            >
              {openTool}
            </span>
            {/* stroke="currentColor" reads the CSS `color` property set on the svg */}
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ color: "var(--tool-accent)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
