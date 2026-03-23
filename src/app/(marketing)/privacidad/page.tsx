import { SITE_NAME } from "@/lib/constants";

export const metadata = {
  title: `Política de Privacidad — ${SITE_NAME}`,
  description: `Política de privacidad de ${SITE_NAME}. Información sobre recopilación de datos, cookies y derechos del usuario.`,
};

export default function PrivacidadPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            Legal
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            Política de Privacidad
          </h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Información general
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>
                {SITE_NAME} respeta la privacidad de sus visitantes. Esta
                política describe qué información recopilamos, cómo la usamos y
                qué derechos tienes como usuario.
              </p>
              <p>
                Al utilizar este sitio web aceptas las prácticas descritas en
                esta política. Si no estás de acuerdo, te recomendamos no
                continuar navegando.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Datos que recopilamos
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>
                <strong className="text-[var(--color-text)]">Datos de navegación:</strong>{" "}
                Cuando visitas {SITE_NAME} nuestros servidores pueden registrar
                información estándar como tu dirección IP, tipo de navegador,
                páginas visitadas y tiempo de permanencia. Estos datos se
                utilizan exclusivamente con fines analíticos y de mejora del
                servicio.
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Newsletter:</strong>{" "}
                Si te suscribes a nuestro boletín, almacenamos tu dirección de
                correo electrónico con el único propósito de enviarte contenido
                editorial. Puedes darte de baja en cualquier momento.
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Formularios de contacto:</strong>{" "}
                Si nos contactas a través del sitio, recopilamos la información
                que proporcionas voluntariamente para poder responder a tu
                consulta.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Cookies
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>
                Este sitio utiliza cookies técnicas necesarias para su
                funcionamiento, como la preferencia de tema (claro/oscuro).
                Podemos utilizar cookies analíticas de terceros para comprender
                cómo se utiliza el sitio y mejorar la experiencia.
              </p>
              <p>
                Puedes configurar tu navegador para rechazar cookies o recibir
                una alerta antes de que se instalen. Ten en cuenta que algunas
                funcionalidades del sitio podrían no funcionar correctamente sin
                cookies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Uso de la información
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>La información recopilada se utiliza para:</p>
              <p>
                Mejorar el contenido y la experiencia de navegación. Enviar
                comunicaciones editoriales a suscriptores. Responder consultas
                recibidas por los canales de contacto. Generar estadísticas
                anónimas de uso del sitio.
              </p>
              <p>
                No vendemos, intercambiamos ni transferimos tu información
                personal a terceros sin tu consentimiento, salvo cuando sea
                necesario para cumplir con la ley.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Derechos del usuario
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Como usuario tienes derecho a:</p>
              <p>
                Acceder a los datos personales que tengamos sobre ti. Solicitar
                la rectificación o eliminación de tus datos. Retirar tu
                consentimiento en cualquier momento. Darte de baja de
                comunicaciones por correo electrónico.
              </p>
              <p>
                Para ejercer cualquiera de estos derechos puedes escribirnos a{" "}
                <a
                  href="mailto:contacto@velociencia.cl"
                  className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]"
                >
                  contacto@velociencia.cl
                </a>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Cambios a esta política
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>
                Nos reservamos el derecho de actualizar esta política de
                privacidad en cualquier momento. Los cambios serán publicados en
                esta misma página con la fecha de la última actualización.
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Última actualización: marzo 2026
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
