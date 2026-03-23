import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Contacto — ${SITE_NAME}`,
  description: `Ponte en contacto con el equipo de ${SITE_NAME}. Consultas, sugerencias y colaboraciones.`,
};

export default function ContactoPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            Contacto
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            Hablemos
          </h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Consultas, sugerencias, correcciones o propuestas de colaboración.
            Estamos abiertos a escuchar.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {/* Email */}
          <div>
            <div className="border-t-[6px] border-[var(--color-text)] pt-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Correo electrónico
              </h2>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Para consultas generales, correcciones de artículos o cualquier
              otro tema, escríbenos directamente.
            </p>
            <a
              href="mailto:contacto@velociencia.cl"
              className="mt-4 inline-block font-serif text-lg font-bold text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors hover:decoration-[var(--color-text)]"
            >
              contacto@velociencia.cl
            </a>
          </div>

          {/* Colaboraciones */}
          <div>
            <div className="border-t-[6px] border-[var(--color-text)] pt-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Colaboraciones
              </h2>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Si eres investigador, entrenador o profesional del ciclismo y
              quieres contribuir con contenido o revisar artículos, nos
              encantaría saber de ti.
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Incluye tu área de expertise y cómo te gustaría colaborar.
            </p>
          </div>
        </div>

        {/* Nota */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-12">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                Sobre este proyecto
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {SITE_NAME} es un proyecto impulsado por inteligencia artificial.
                Nuestro contenido es generado y revisado por agentes de IA con
                fuentes científicas verificables. Las respuestas a mensajes de
                contacto son gestionadas por personas reales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
