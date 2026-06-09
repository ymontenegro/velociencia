import Link from "next/link";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS, SITE_NAME_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthorAvatar } from "@/components/shared/author-avatar";
import { getAllArticles } from "@/lib/markdown";

// ---------- team data (inline content — not UI labels) ----------

const TEAM_ES = [
  {
    name: "Carmen Lagos",
    role: "Editora jefa",
    specialty: "20+ años en medios deportivos de referencia",
    bio: "Editora jefa de Velociencia. Supervisa la calidad editorial de cada pieza publicada: rigor factual, estilo periodístico y coherencia entre las versiones en español e inglés. Con más de veinte años en medios deportivos, su criterio es el filtro final antes de cualquier publicación.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
  {
    name: "Martín Velasco",
    role: "Nutrición deportiva y suplementación",
    specialty: "Nutrición basada en evidencia para ciclistas",
    bio: "Firma editorial de Velociencia en nutrición. Cubre alimentación, hidratación y suplementación para ciclistas a partir de estudios revisados por pares, priorizando meta-análisis y ensayos clínicos con evidencia aplicable al entrenamiento y la competición.",
    color: "#0D9488",
    sectionColor: "#0D9488",
    authorSlug: "martin-velasco",
  },
  {
    name: "Sofía Müller",
    role: "Fisiología del ejercicio y biomecánica",
    specialty: "VO₂máx, umbrales metabólicos y biomecánica del ciclismo",
    bio: "Firma editorial de ciencia aplicada al rendimiento. Traduce papers de fisiología del ejercicio, cinética del oxígeno y biomecánica a lenguaje claro sin sacrificar rigor. Cada artículo incluye la metodología del estudio para que el lector pueda evaluar la evidencia por sí mismo.",
    color: "#7C3AED",
    sectionColor: "#7C3AED",
    authorSlug: "sofia-muller",
  },
  {
    name: "Tomás Herrera",
    role: "Metodología y planificación del entrenamiento",
    specialty: "Periodización, intervalos y potencia",
    bio: "Ex-ciclista profesional reconvertido en periodista. Firma editorial de entrenamiento: cubre periodización, intervalos, métricas de potencia y las tendencias que llegan del pelotón profesional al ciclista de a pie. Escribe con la autoridad de quien ha competido al más alto nivel.",
    color: "#0891B2",
    sectionColor: "#0891B2",
    authorSlug: "tomas-herrera",
  },
  {
    name: "Diego Araya",
    role: "Ciclismo profesional, grandes vueltas y clásicas",
    specialty: "Análisis táctico y cobertura del pelotón UCI",
    bio: "Periodista deportivo chileno con más de diez años cubriendo el pelotón profesional. Firma editorial de competencia: análisis táctico, contexto histórico y la narrativa detrás de cada carrera, con datos verificados en ProCyclingStats, FirstCycling y comunicados oficiales de equipos UCI.",
    color: "#E11D48",
    sectionColor: "#E11D48",
    authorSlug: "diego-araya",
  },
  {
    name: "Rodrigo Pizarro",
    role: "Verificador de fuentes",
    specialty: "Fact-checking de fuentes científicas y deportivas",
    bio: "Fact-checker de Velociencia. Verifica que cada cita, PMID y dato en un artículo sea real antes de la publicación. Un paper que no existe en PubMed o un resultado de carrera que no aparece en ProCyclingStats no entra. Su trabajo garantiza que el rigor científico sea demostrable, no solo declarado.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
  {
    name: "Valentina Rosas",
    role: "Editora visual y fotografía deportiva",
    specialty: "Selección y edición de imágenes de portada",
    bio: "Editora visual de Velociencia. Selecciona y edita las imágenes de portada de cada artículo. Prioriza fotografía específica del corredor o evento cuando existe; contexto visual relevante cuando no. Su criterio: la imagen debe reforzar el argumento del artículo, no ilustrarlo de forma genérica.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
];

const TEAM_EN = [
  {
    name: "Carmen Lagos",
    role: "Editor-in-chief",
    specialty: "20+ years in leading sports media",
    bio: "Editor-in-chief of PedalSci. Oversees the editorial quality of every published piece: factual rigour, journalistic style and consistency between the Spanish and English versions. With over twenty years in sports media, her judgement is the final filter before any publication.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
  {
    name: "Martin Velasco",
    role: "Sports nutrition and supplementation",
    specialty: "Evidence-based nutrition for cyclists",
    bio: "PedalSci's editorial byline for nutrition. Covers fueling, hydration and supplementation for cyclists from peer-reviewed literature, prioritising meta-analyses and clinical trials with evidence applicable to training and racing.",
    color: "#0D9488",
    sectionColor: "#0D9488",
    authorSlug: "martin-velasco",
  },
  {
    name: "Sofia Muller",
    role: "Exercise physiology and biomechanics",
    specialty: "VO₂max, metabolic thresholds and cycling biomechanics",
    bio: "Editorial byline for applied performance science. Translates exercise physiology, oxygen kinetics and biomechanics papers into plain language without losing rigour. Every article includes the study methodology so readers can evaluate the evidence for themselves.",
    color: "#7C3AED",
    sectionColor: "#7C3AED",
    authorSlug: "sofia-muller",
  },
  {
    name: "Tomas Herrera",
    role: "Training methodology and planning",
    specialty: "Periodisation, intervals and power metrics",
    bio: "Former professional cyclist turned journalist. Training's editorial byline: covers periodisation, intervals, power metrics and the trends filtering from the pro peloton to the everyday cyclist. Writes with the authority of someone who has competed at the highest level.",
    color: "#0891B2",
    sectionColor: "#0891B2",
    authorSlug: "tomas-herrera",
  },
  {
    name: "Diego Araya",
    role: "Professional cycling, grand tours and classics",
    specialty: "Tactical analysis and UCI peloton coverage",
    bio: "Chilean sports journalist with over a decade covering professional cycling. Competition's editorial byline: tactical analysis, historical context and the story behind each race, with data verified on ProCyclingStats, FirstCycling and official UCI team communications.",
    color: "#E11D48",
    sectionColor: "#E11D48",
    authorSlug: "diego-araya",
  },
  {
    name: "Rodrigo Pizarro",
    role: "Fact-checker",
    specialty: "Scientific and sports data source verification",
    bio: "PedalSci's fact-checker. Verifies that every citation, PMID and claim in an article is real before publication. A paper that doesn't exist on PubMed or a race result that isn't on ProCyclingStats doesn't make it in. His work ensures scientific rigour is demonstrable, not just claimed.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
  {
    name: "Valentina Rosas",
    role: "Visual editor and sports photography",
    specialty: "Cover image selection and editing",
    bio: "PedalSci's visual editor. Selects and edits the cover image for every article. Prioritises specific photography of the rider or event when available; contextually relevant visuals otherwise. Her criterion: the image should reinforce the article's argument, not illustrate it generically.",
    color: "#6B7280",
    sectionColor: null as string | null,
    authorSlug: null as string | null,
  },
];

// ---------- page ----------

export async function generateMetadata() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const siteName = SITE_NAME_I18N[locale];

  return {
    title: `${dict.about.badge} — ${siteName}`,
    description: dict.about.intro,
    openGraph: {
      title: `${dict.about.badge} — ${siteName}`,
      description: dict.about.intro,
    },
  };
}

export default async function SobrePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const siteName = SITE_NAME_I18N[locale];
  const siteUrl = locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";
  const email = locale === "en" ? "contact@pedalsci.com" : "contacto@velociencia.cl";
  const team = locale === "en" ? TEAM_EN : TEAM_ES;
  const authorBase = locale === "en" ? "author" : "autor";

  const processSteps = [
    { title: dict.about.step1Title, text: dict.about.step1Text },
    { title: dict.about.step2Title, text: dict.about.step2Text },
    { title: dict.about.step3Title, text: dict.about.step3Text },
    { title: dict.about.step4Title, text: dict.about.step4Text },
    { title: dict.about.step5Title, text: dict.about.step5Text },
  ];

  // JSON-LD for Google — AboutPage + Person per team member
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: dict.about.badge,
    description: dict.about.intro,
    url: `${siteUrl}/${locale === "en" ? "about" : "sobre"}`,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    about: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      worksFor: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      ...(member.authorSlug
        ? { url: `${siteUrl}/${authorBase}/${member.authorSlug}` }
        : {}),
    })),
  };

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* Team */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="border-t-[6px] border-[var(--color-text)] pt-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {dict.about.ourTeam}
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            {dict.about.ourTeamIntro}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {team.map((member) => {
              const accentColor = member.sectionColor ?? "#6B7280";
              const card = (
                <div
                  className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300"
                  style={
                    member.authorSlug
                      ? undefined
                      : { cursor: "default" }
                  }
                >
                  {/* Top accent bar */}
                  <div className="h-[3px] w-full absolute top-0 left-0 right-0" style={{ backgroundColor: accentColor }} />

                  {/* Corner glow */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-[0.06]"
                    style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
                  />

                  <div className="flex items-start gap-4 pt-1">
                    <div className="flex-shrink-0">
                      <AuthorAvatar name={member.name} color={accentColor} size="lg" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-lg font-bold leading-snug text-[var(--color-text)]">
                        {member.name}
                      </p>
                      <p
                        className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: accentColor }}
                      >
                        {member.role}
                      </p>
                      <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                        {member.specialty}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {member.bio}
                  </p>
                </div>
              );

              if (member.authorSlug) {
                return (
                  <Link
                    key={member.name}
                    href={`/${authorBase}/${member.authorSlug}`}
                    className="group block hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                  >
                    {card}
                  </Link>
                );
              }
              return <div key={member.name}>{card}</div>;
            })}
          </div>

          {/* Link to full team hub */}
          <div className="mt-8 pt-4">
            <Link
              href={`/${authorBase}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
            >
              <span>{locale === "en" ? "View all team members" : "Ver todo el equipo"}</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How we work — editorial process */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="border-t-[6px] border-[var(--color-text)] pt-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {dict.about.editorialProcess}
            </h2>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            {dict.about.editorialProcessIntro}
          </p>

          <ol className="mt-10 space-y-8">
            {processSteps.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-text)] font-serif text-sm font-bold text-white dark:bg-white dark:text-[#0A0A0E]">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-bold text-[var(--color-text)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
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

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SECTION_IDS.map((id) => {
              const section = SECTIONS[id];
              const sectionI18n = SECTIONS_I18N[locale][id];
              const articleCount = getAllArticles(id, locale).length;
              return (
                <Link
                  key={id}
                  href={`/${sectionI18n.slug}`}
                  className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: section.color }}
                  />

                  {/* Subtle corner gradient */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]"
                    style={{ background: `radial-gradient(circle, ${section.color} 0%, transparent 70%)` }}
                  />

                  <div className="p-6">
                    {/* Section name */}
                    <h3
                      className="font-serif text-xl font-bold"
                      style={{ color: section.color }}
                    >
                      {sectionI18n.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {sectionI18n.description}
                    </p>

                    {/* Footer: journalist + article count */}
                    <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border-light)] pt-4">
                      <div className="flex items-center gap-2">
                        <AuthorAvatar name={sectionI18n.journalist} color={section.color} size="sm" />
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {sectionI18n.journalist}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[var(--color-text-muted)]">
                        {articleCount} {articleCount === 1 ? (locale === "es" ? "artículo" : "article") : (locale === "es" ? "artículos" : "articles")}
                      </span>
                    </div>
                  </div>
                </Link>
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

          {/* Corrections & contact */}
          <div className="mt-12 flex items-start gap-4">
            <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                {dict.about.corrections}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {dict.about.correctionsText}{" "}
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
