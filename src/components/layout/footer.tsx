import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllTools, toolHref, toolColor } from "@/lib/tools";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { SponsorSlot } from "@/components/shared/sponsor-slot";

export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const currentYear = new Date().getFullYear();
  const tools = getAllTools();

  return (
    <footer className="relative bg-[var(--color-text)] text-white dark:bg-[#0A0A0E]">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-[var(--color-text)]" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:pt-16 sm:pb-10 sm:px-6 lg:px-8">
        {/* Watermark title */}
        <div className="mb-3 sm:mb-6 select-none" aria-hidden="true">
          <span className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-white/[0.07] sm:text-4xl">
            {dict.siteName}
          </span>
        </div>

        {/* 5-column grid on large screens */}
        <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-5">
          {/* ── Brand column ──────────────────────────────────────────────── */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-[0.15em] uppercase text-white"
            >
              {dict.siteName}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {dict.siteDescription}
            </p>
            <p className="mt-4 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/30">
              {dict.footer.poweredByAI}
            </p>
          </div>

          {/* ── Sections column ───────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
              {dict.footer.sections}
            </h3>
            <div className="mt-1.5 mb-4 h-px w-8 bg-white/15" aria-hidden="true" />
            <ul className="space-y-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/${SECTIONS_I18N[locale][id].slug}`}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {/* Section-colored dot — HUD signal */}
                    <span
                      className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: SECTIONS[id].color }}
                      aria-hidden="true"
                    />
                    {SECTIONS_I18N[locale][id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Tools column ──────────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
              {dict.footer.tools}
            </h3>
            <div className="mt-1.5 mb-4 h-px w-8 bg-white/15" aria-hidden="true" />
            <ul className="space-y-2.5">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={toolHref(tool, locale)}
                    className="group flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: toolColor(tool) }}
                      aria-hidden="true"
                    />
                    {tool.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Links column ──────────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
              {dict.footer.site}
            </h3>
            <div className="mt-1.5 mb-4 h-px w-8 bg-white/15" aria-hidden="true" />
            <ul className="space-y-3">
              <li>
                <Link
                  href={locale === "en" ? "/about" : "/sobre"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === "en" ? "/author" : "/autor"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.team}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-white/60 transition-colors hover:text-white">
                  {dict.footer.home}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === "en" ? "/privacy" : "/privacidad"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === "en" ? "/terms" : "/terminos"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === "en" ? "/disclosure" : "/divulgacion"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.disclosure}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === "en" ? "/contact" : "/contacto"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Newsletter column ─────────────────────────────────────────── */}
          <div>
            <h3 className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/40">
              {dict.footer.newsletter}
            </h3>
            <div className="mt-1.5 mb-4 h-px w-8 bg-white/15" aria-hidden="true" />
            <p className="text-sm text-white/60">
              {dict.footer.newsletterCTA}
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
            <SponsorSlot label={dict.newsletter.sponsoredBy} className="mt-4" />
          </div>
        </div>

        {/* ── AI Transparency line ────────────────────────────────────── */}
        <div className="mt-12 flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
          {/* Signal dot — Race Telemetry visual cue */}
          <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/30" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-white/50">
            {dict.footer.aiTransparency}{" "}
            <Link
              href={locale === "en" ? "/about" : "/sobre"}
              className="font-medium text-white/70 underline underline-offset-2 transition-colors hover:text-white"
            >
              {dict.footer.aiTransparencyLink} →
            </Link>
          </p>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] tracking-wide text-white/30">
            &copy; {currentYear} {dict.siteName}. {dict.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/rss.xml"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-white/30 transition-colors hover:text-white/50"
              title="RSS Feed"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
              RSS
            </a>
            <p className="font-mono text-[10px] tracking-wide text-white/20">
              {dict.footer.editorialDesign}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
