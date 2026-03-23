import { SECTIONS, SECTION_IDS, SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Sobre ${SITE_NAME} — Ciclismo basado en ciencia`,
  description:
    "Velociencia es un medio digital que combina inteligencia artificial con fuentes científicas reales para cubrir nutrición, ciencia y entrenamiento en ciclismo.",
};

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[var(--color-text)] dark:bg-[#0A0A0E]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              Sobre nosotros
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {SITE_NAME}
            </h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              Medio digital de ciclismo que combina inteligencia artificial con
              fuentes científicas reales. Cada artículo es investigado, redactado
              y verificado con rigor periodístico.
            </p>
          </div>
        </div>
      </div>

      {/* Qué es Velociencia */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="border-t-[6px] border-[var(--color-text)] pt-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Qué hacemos
          </h2>
        </div>
        <div className="mt-8 space-y-5 text-[var(--color-text-secondary)]">
          <p className="text-base leading-relaxed">
            Velociencia nace de una premisa: el ciclismo merece periodismo
            fundamentado en evidencia. No opiniones disfrazadas de ciencia, no
            titulares sensacionalistas. Datos, estudios y fuentes verificables.
          </p>
          <p className="text-base leading-relaxed">
            Utilizamos modelos de lenguaje avanzados para investigar, redactar y
            editar cada artículo. Nuestros agentes periodísticos consultan bases
            de datos científicas como PubMed y Semantic Scholar, recopilan
            fuentes primarias y producen contenido con estándares editoriales
            estrictos.
          </p>
          <p className="text-base leading-relaxed">
            Todo artículo pasa por un proceso de revisión editorial automatizado
            antes de ser publicado. Las fuentes se citan de forma explícita para
            que el lector pueda verificar la información por sí mismo.
          </p>
        </div>
      </section>

      {/* Secciones y periodistas */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="border-t-[6px] border-[var(--color-text)] pt-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Nuestras secciones
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SECTION_IDS.map((id) => {
              const section = SECTIONS[id];
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
                        {section.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="text-xs text-[var(--color-text-muted)]">
                      Periodista: {section.journalist}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nota de transparencia */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 h-8 w-[2px] flex-shrink-0 bg-[var(--color-border)]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                Transparencia
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Los periodistas de Velociencia son agentes de inteligencia
                artificial. Los nombres asociados a cada sección representan
                identidades editoriales, no personas reales. Creemos que la
                transparencia sobre nuestro proceso es fundamental para la
                confianza del lector.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
