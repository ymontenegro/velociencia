import { SITE_NAME_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  return {
    title: locale === "en" ? `Privacy Policy — ${siteName}` : `Política de Privacidad — ${siteName}`,
    description: locale === "en"
      ? `${siteName} privacy policy. Information about data collection, cookies and user rights.`
      : `Política de privacidad de ${siteName}. Información sobre recopilación de datos, cookies y derechos del usuario.`,
  };
}

export default async function PrivacidadPage() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  const email = locale === "en" ? "contact@pedalsci.com" : "contacto@velociencia.cl";

  if (locale === "en") {
    return (
      <div>
        <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">Legal</span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Privacy Policy</h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-12 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">General information</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} respects the privacy of its visitors. This policy describes what information we collect, how we use it and what rights you have as a user.</p>
                <p>By using this website you accept the practices described in this policy. If you disagree, we recommend that you stop browsing.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Data we collect</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p><strong className="text-[var(--color-text)]">Browsing data:</strong> When you visit {siteName} our servers may log standard information such as your IP address, browser type, pages visited and time spent. This data is used exclusively for analytics and service improvement.</p>
                <p><strong className="text-[var(--color-text)]">Newsletter:</strong> If you subscribe to our newsletter, we store your email address for the sole purpose of sending you editorial content. You can unsubscribe at any time.</p>
                <p><strong className="text-[var(--color-text)]">Contact forms:</strong> If you contact us through the site, we collect the information you voluntarily provide in order to respond to your inquiry.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Cookies</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>This site uses technical cookies necessary for its operation, such as theme preference (light/dark). We may use third-party analytics cookies to understand how the site is used and improve the experience.</p>
                <p>You can configure your browser to reject cookies or receive an alert before they are installed. Note that some site features may not work properly without cookies.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">User rights</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>As a user you have the right to access, rectify or delete your personal data, withdraw consent at any time, and unsubscribe from email communications.</p>
                <p>To exercise any of these rights you can write to us at{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
              </div>
            </section>
            <section>
              <p className="text-xs text-[var(--color-text-muted)]">Last updated: March 2026</p>
            </section>
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
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">Legal</span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Política de Privacidad</h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Información general</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} respeta la privacidad de sus visitantes. Esta política describe qué información recopilamos, cómo la usamos y qué derechos tienes como usuario.</p>
              <p>Al utilizar este sitio web aceptas las prácticas descritas en esta política. Si no estás de acuerdo, te recomendamos no continuar navegando.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Datos que recopilamos</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p><strong className="text-[var(--color-text)]">Datos de navegación:</strong> Cuando visitas {siteName} nuestros servidores pueden registrar información estándar como tu dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia.</p>
              <p><strong className="text-[var(--color-text)]">Newsletter:</strong> Si te suscribes a nuestro boletín, almacenamos tu dirección de correo electrónico con el único propósito de enviarte contenido editorial. Puedes darte de baja en cualquier momento.</p>
              <p><strong className="text-[var(--color-text)]">Formularios de contacto:</strong> Si nos contactas a través del sitio, recopilamos la información que proporcionas voluntariamente para poder responder a tu consulta.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Cookies</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Este sitio utiliza cookies técnicas necesarias para su funcionamiento, como la preferencia de tema (claro/oscuro). Podemos utilizar cookies analíticas de terceros para comprender cómo se utiliza el sitio y mejorar la experiencia.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Derechos del usuario</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Como usuario tienes derecho a acceder, rectificar o eliminar tus datos personales, retirar tu consentimiento en cualquier momento y darte de baja de comunicaciones por correo electrónico.</p>
              <p>Para ejercer cualquiera de estos derechos puedes escribirnos a{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
            </div>
          </section>
          <section>
            <p className="text-xs text-[var(--color-text-muted)]">Última actualización: marzo 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
