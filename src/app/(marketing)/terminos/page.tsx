import { SITE_NAME_I18N, CONTACT_EMAIL_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  return {
    title: locale === "en" ? `Terms of Service — ${siteName}` : `Términos de Servicio — ${siteName}`,
    description: locale === "en"
      ? `${siteName} terms of service. Rules and conditions for using the website.`
      : `Términos de servicio de ${siteName}. Reglas y condiciones de uso del sitio web.`,
  };
}

export default async function TerminosPage() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  const email = CONTACT_EMAIL_I18N[locale];

  if (locale === "en") {
    return (
      <div>
        <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex items-center gap-2.5">
              <span className="tool-live-dot inline-block h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">Legal</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Terms of Service</h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-12 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Acceptance of terms</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>By accessing and using {siteName} you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use this website.</p>
                <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the revised terms.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Use of content</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>The content published on {siteName} is intended for informational and educational purposes only. It does not constitute medical, nutritional or professional training advice.</p>
                <p>You should consult a qualified professional before making decisions based on the information published on this site. {siteName} assumes no responsibility for actions taken based on our content.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Intellectual property</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>All content on {siteName}, including text, graphics, logos, images and software, is the property of {siteName} or its content suppliers and is protected by intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify or create derivative works from any content on this site without prior written permission. Brief quotations with proper attribution for non-commercial purposes are permitted.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">AI-generated content</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} uses artificial intelligence tools to assist in the research and writing of articles. All AI-generated content undergoes editorial review before publication.</p>
                <p>While we strive for accuracy, AI-generated content may contain errors or inaccuracies. We cite scientific sources explicitly so readers can verify information independently. {siteName} does not guarantee the absolute accuracy, completeness or timeliness of any content.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Third-party links</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} may contain links to third-party websites, including scientific publications, research databases and external resources. These links are provided for reference and convenience.</p>
                <p>We do not control and are not responsible for the content, privacy policies or practices of any third-party sites. Accessing them is at your own risk.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Advertising</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} displays advertisements through Google AdSense and potentially other advertising networks. These ads help support the operation and maintenance of the site.</p>
                <p>Advertising content is provided by third parties and does not represent an endorsement by {siteName}. We are not responsible for the content or accuracy of any advertisements displayed on the site.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Limitation of liability</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, regarding the operation of the site or the accuracy of its content.</p>
                <p>To the fullest extent permitted by law, {siteName} shall not be liable for any direct, indirect, incidental, consequential or punitive damages arising from your use of or inability to use this site.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Changes to terms</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>We may revise these Terms of Service at any time without prior notice. Changes take effect immediately upon being posted on this page. It is your responsibility to review these terms periodically.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Contact</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>If you have questions about these terms, you can contact us at{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
              </div>
            </section>
            <section>
              <p className="text-xs text-[var(--color-text-muted)]">Last updated: April 2026</p>
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
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Términos de Servicio</h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Aceptación de los términos</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Al acceder y utilizar {siteName} aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no deberías utilizar este sitio web.</p>
              <p>Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado del sitio después de los cambios constituye la aceptación de los términos revisados.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Uso del contenido</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>El contenido publicado en {siteName} tiene fines exclusivamente informativos y educativos. No constituye asesoramiento médico, nutricional ni de entrenamiento profesional.</p>
              <p>Debes consultar a un profesional cualificado antes de tomar decisiones basadas en la información publicada en este sitio. {siteName} no asume responsabilidad por acciones tomadas en base a nuestro contenido.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Propiedad intelectual</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Todo el contenido de {siteName}, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de {siteName} o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.</p>
              <p>No puedes reproducir, distribuir, modificar ni crear obras derivadas de ningún contenido de este sitio sin autorización previa por escrito. Se permiten citas breves con atribución adecuada para fines no comerciales.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Contenido generado por IA</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} utiliza herramientas de inteligencia artificial para asistir en la investigación y redacción de artículos. Todo el contenido generado por IA pasa por revisión editorial antes de su publicación.</p>
              <p>Aunque nos esforzamos por la precisión, el contenido generado por IA puede contener errores o inexactitudes. Citamos fuentes científicas de forma explícita para que los lectores puedan verificar la información de manera independiente. {siteName} no garantiza la exactitud absoluta, integridad o actualidad de ningún contenido.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Enlaces a terceros</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} puede contener enlaces a sitios web de terceros, incluyendo publicaciones científicas, bases de datos de investigación y recursos externos. Estos enlaces se proporcionan como referencia y conveniencia.</p>
              <p>No controlamos ni somos responsables del contenido, políticas de privacidad o prácticas de sitios de terceros. El acceso a los mismos es bajo tu propia responsabilidad.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Publicidad</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} muestra anuncios publicitarios a través de Google AdSense y potencialmente otras redes publicitarias. Estos anuncios ayudan a financiar la operación y mantenimiento del sitio.</p>
              <p>El contenido publicitario es proporcionado por terceros y no representa un respaldo por parte de {siteName}. No somos responsables del contenido o la exactitud de los anuncios mostrados en el sitio.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Limitación de responsabilidad</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;. No ofrecemos garantías, expresas ni implícitas, sobre el funcionamiento del sitio o la exactitud de su contenido.</p>
              <p>En la máxima medida permitida por la ley, {siteName} no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo derivado del uso o la imposibilidad de uso de este sitio.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Cambios en los términos</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Podemos revisar estos Términos de Servicio en cualquier momento sin previo aviso. Los cambios entran en vigor inmediatamente después de ser publicados en esta página. Es tu responsabilidad revisar estos términos periódicamente.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Contacto</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Si tienes preguntas sobre estos términos, puedes contactarnos en{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
            </div>
          </section>
          <section>
            <p className="text-xs text-[var(--color-text-muted)]">Última actualización: abril 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
