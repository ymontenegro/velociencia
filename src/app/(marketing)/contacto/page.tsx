import { SITE_NAME_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  return {
    title: locale === "en" ? `Contact — ${siteName}` : `Contacto — ${siteName}`,
    description: locale === "en"
      ? `Get in touch with the ${siteName} team. Inquiries, suggestions and collaborations.`
      : `Ponte en contacto con el equipo de ${siteName}. Consultas, sugerencias y colaboraciones.`,
  };
}

export default async function ContactoPage() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  const email = locale === "en" ? "contact@pedalsci.com" : "contacto@velociencia.cl";

  if (locale === "en") {
    return (
      <div>
        <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">Contact</span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Let&apos;s talk</h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">Inquiries, suggestions, corrections or collaboration proposals. We are open to hearing from you.</p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            <div>
              <div className="border-t-[6px] border-[var(--color-text)] pt-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Email</h2>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">For general inquiries, article corrections or any other matter, write to us directly.</p>
              <a href={`mailto:${email}`} className="mt-4 inline-block font-serif text-lg font-bold text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-text)]">{email}</a>
            </div>
            <div>
              <div className="border-t-[6px] border-[var(--color-text)] pt-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Collaborations</h2>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">If you are a researcher, coach or cycling professional and want to contribute content or review articles, we would love to hear from you.</p>
              <p className="mt-4 text-sm text-[var(--color-text-muted)]">Include your area of expertise and how you would like to collaborate.</p>
            </div>
          </div>
          <div className="mt-16 border-t border-[var(--color-border)] pt-12">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">About this project</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{siteName} is a project powered by artificial intelligence. Our content is generated and reviewed by AI agents with verifiable scientific sources. Responses to contact messages are handled by real people.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Spanish version
  return (
    <div>
      <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">Contacto</span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Hablemos</h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">Consultas, sugerencias, correcciones o propuestas de colaboración. Estamos abiertos a escuchar.</p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <div className="border-t-[6px] border-[var(--color-text)] pt-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Correo electrónico</h2>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">Para consultas generales, correcciones de artículos o cualquier otro tema, escríbenos directamente.</p>
            <a href={`mailto:${email}`} className="mt-4 inline-block font-serif text-lg font-bold text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-text)]">{email}</a>
          </div>
          <div>
            <div className="border-t-[6px] border-[var(--color-text)] pt-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Colaboraciones</h2>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">Si eres investigador, entrenador o profesional del ciclismo y quieres contribuir con contenido o revisar artículos, nos encantaría saber de ti.</p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">Incluye tu área de expertise y cómo te gustaría colaborar.</p>
          </div>
        </div>
        <div className="mt-16 border-t border-[var(--color-border)] pt-12">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">Sobre este proyecto</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{siteName} es un proyecto impulsado por inteligencia artificial. Nuestro contenido es generado y revisado por agentes de IA con fuentes científicas verificables. Las respuestas a mensajes de contacto son gestionadas por personas reales.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
