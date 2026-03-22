import Link from "next/link";
import { SECTIONS, SECTION_IDS, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function Footer() {
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
            {SITE_NAME}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-[0.15em] uppercase text-white"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {SITE_DESCRIPTION}
            </p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Impulsado por IA
            </p>
          </div>

          {/* Sections column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Secciones
            </h3>
            <ul className="mt-4 space-y-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <Link
                    href={`/${id}`}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-white/50 transition-transform group-hover:scale-125"
                    />
                    {SECTIONS[id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Sitio
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-white/60">
              Recibe los mejores artículos en tu correo.
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-wide text-white/30">
            &copy; {currentYear} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-[11px] tracking-wide text-white/20">
            Diseño editorial premium
          </p>
        </div>
      </div>
    </footer>
  );
}
