import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SECTION_IDS } from "@/lib/constants";
import { TOOLS } from "@/lib/tools";

interface ArchiveStatsProps {
  articleCount: number;
  dict: Dictionary;
}

/**
 * Thin HUD band — "Race Telemetry" archive depth signal.
 * Shows real build-time stats in DM Mono: articles, tools, sections, languages.
 * Acts as a subtle proof-of-depth positioned between the hero and the tools band.
 */
export function ArchiveStats({ articleCount, dict }: ArchiveStatsProps) {
  const stats = [
    { value: articleCount, label: dict.home.archiveArticles },
    { value: TOOLS.length, label: dict.home.archiveTools },
    { value: SECTION_IDS.length, label: dict.home.archiveSections },
    { value: 2, label: dict.home.archiveLanguages },
  ];

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3 overflow-x-auto no-scrollbar">
          {/* HUD label — eyebrow with pulse dot */}
          <div className="flex-none flex items-center gap-2 pr-4 border-r border-[var(--color-border)]">
            <span
              aria-hidden="true"
              className="tool-live-dot h-1 w-1 flex-none rounded-full bg-[var(--color-text-muted)]"
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--color-text-muted)] whitespace-nowrap">
              {dict.home.archiveLabel}
            </span>
          </div>

          {/* Stat readouts */}
          <div className="flex items-center gap-5 sm:gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex-none flex items-baseline gap-1.5">
                <span className="font-mono text-base font-bold leading-none text-[var(--color-text)] tabular-nums">
                  {value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Spectrum bar — represents the 4 sections */}
          <div
            aria-hidden="true"
            className="ml-auto flex-none hidden sm:block h-[2px] w-20 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #0D9488 0%, #7C3AED 33%, #0891B2 66%, #E11D48 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
