import { SITE_NAME_I18N } from "@/lib/constants";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  return {
    title: locale === "en" ? `Affiliate Disclosure — ${siteName}` : `Divulgación de Afiliados — ${siteName}`,
    description:
      locale === "en"
        ? `How ${siteName} uses affiliate links and how it affects you as a reader.`
        : `Cómo ${siteName} usa enlaces de afiliado y cómo te afecta como lector.`,
  };
}

export default async function DivulgacionPage() {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale];
  const email = locale === "en" ? "contact@pedalsci.com" : "contacto@velociencia.cl";

  if (locale === "en") {
    return (
      <div>
        <div className="bg-[var(--color-text)] dark:bg-[#0A0A0E]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">Legal</span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Affiliate Disclosure</h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-12 text-[var(--color-text-secondary)]">
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Affiliate links</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>Some articles on {siteName} contain affiliate links. If you click one of these links and buy a product, we earn a commission, <strong className="text-[var(--color-text)]">at no extra cost to you</strong>. The price you pay is exactly the same.</p>
                <p>These commissions help us keep the site running and fund the research and editorial review behind our content.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Our editorial independence</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>We only link to products we consider genuinely useful for cyclists. A commission never determines whether a product is mentioned or how we describe it. Our recommendations are editorial, not paid placements.</p>
                <p>Any article that contains affiliate links shows a clear notice at the top, and every affiliate link is marked as such.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Amazon Associates</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>{siteName} is a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon. As an Amazon Associate we earn from qualifying purchases.</p>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Questions</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>If you have any questions about how we use affiliate links, write to us at{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
              </div>
            </section>
            <section>
              <p className="text-xs text-[var(--color-text-muted)]">Last updated: May 2026</p>
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
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Divulgación de Afiliados</h1>
          <div className="mt-4 h-[2px] w-16 bg-white/40" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-12 text-[var(--color-text-secondary)]">
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Enlaces de afiliado</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Algunos artículos de {siteName} contienen enlaces de afiliado. Si haces clic en uno de ellos y compras un producto, recibimos una comisión, <strong className="text-[var(--color-text)]">sin ningún costo adicional para ti</strong>. El precio que pagas es exactamente el mismo.</p>
              <p>Esas comisiones nos ayudan a mantener el sitio en funcionamiento y a financiar la investigación y la revisión editorial que hay detrás de cada artículo.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Nuestra independencia editorial</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Solo enlazamos productos que consideramos genuinamente útiles para el ciclista. La comisión nunca determina si un producto se menciona ni cómo lo describimos. Nuestras recomendaciones son editoriales, no espacios pagados.</p>
              <p>Todo artículo que contenga enlaces de afiliado muestra un aviso claro al inicio, y cada enlace de afiliado está marcado como tal.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Programa de Afiliados de Amazon</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>{siteName} participa en el Programa de Afiliados de Amazon, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicitar y enlazar a Amazon. Como Afiliados de Amazon, generamos ingresos por las compras que cumplen los requisitos.</p>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">Consultas</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <p>Si tienes dudas sobre cómo usamos los enlaces de afiliado, escríbenos a{" "}<a href={`mailto:${email}`} className="font-medium text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-2 transition-colors hover:decoration-[var(--color-text)]">{email}</a>.</p>
            </div>
          </section>
          <section>
            <p className="text-xs text-[var(--color-text-muted)]">Última actualización: mayo 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
}
