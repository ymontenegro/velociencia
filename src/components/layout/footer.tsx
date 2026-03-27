import Link from "next/link";
import { SECTIONS_I18N, SECTION_IDS } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-text)] text-white dark:bg-[#0A0A0E]">
      {/* Top border */}
      <div
        className="h-[2px] w-full bg-[var(--color-text)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        {/* Large decorative title */}
        <div className="mb-6 select-none" aria-hidden="true">
          <span className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-white/[0.07] sm:text-4xl">
            {dict.siteName}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-[0.15em] uppercase text-white"
            >
              {dict.siteName}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {dict.siteDescription}
            </p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              {dict.footer.poweredByAI}
            </p>
          </div>

          {/* Sections column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {dict.footer.sections}
            </h3>
            <ul className="mt-4 space-y-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/${SECTIONS_I18N[locale][id].slug}`}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-white/50 transition-transform group-hover:scale-125"
                    />
                    {SECTIONS_I18N[locale][id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {dict.footer.site}
            </h3>
            <ul className="mt-4 space-y-3">
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
                  href="/"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
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
                  href={locale === "en" ? "/contact" : "/contacto"}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {dict.footer.newsletter}
            </h3>
            <p className="mt-4 text-sm text-white/60">
              {dict.footer.newsletterCTA}
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-wide text-white/30">
            &copy; {currentYear} {dict.siteName}. {dict.footer.allRightsReserved}
          </p>
          <p className="text-[11px] tracking-wide text-white/20">
            {dict.footer.editorialDesign}
          </p>
        </div>
      </div>
    </footer>
  );
}
