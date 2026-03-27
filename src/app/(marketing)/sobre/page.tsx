import { SECTIONS, SECTIONS_I18N, SECTION_IDS, SITE_NAME_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const siteName = SITE_NAME_I18N[locale];

  return {
    title: `${dict.about.badge} ${siteName}`,
    description: dict.about.intro,
  };
}

export default async function SobrePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const siteName = SITE_NAME_I18N[locale];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[var(--color-text)] dark:bg-[#0A0A0E]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              {dict.about.badge}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {siteName}
            </h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              {dict.about.intro}
            </p>
          </div>
        </div>
      </div>

      {/* What we do */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="border-t-[6px] border-[var(--color-text)] pt-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            {dict.about.whatWeDo}
          </h2>
        </div>
        <div className="mt-8 space-y-5 text-[var(--color-text-secondary)]">
          <p className="text-base leading-relaxed">{dict.about.whatWeDoP1}</p>
          <p className="text-base leading-relaxed">{dict.about.whatWeDoP2}</p>
          <p className="text-base leading-relaxed">{dict.about.whatWeDoP3}</p>
        </div>
      </section>

      {/* Sections and journalists */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="border-t-[6px] border-[var(--color-text)] pt-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {dict.about.ourSections}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SECTION_IDS.map((id) => {
              const section = SECTIONS[id];
              const sectionI18n = SECTIONS_I18N[locale][id];
              return (
                <div
                  key={id}
                  className="group rounded-lg border border-[var(--color-border)] p-6 transition-colors hover:border-[var(--color-border-dark)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h3
                        className="font-serif text-lg font-bold"
                        style={{ color: section.color }}
                      >
                        {sectionI18n.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {sectionI18n.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {dict.about.journalist}: {sectionI18n.journalist}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency note */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                {dict.about.transparency}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {dict.about.transparencyText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
