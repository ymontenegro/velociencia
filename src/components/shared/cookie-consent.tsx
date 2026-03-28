"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieConsentProps {
  locale: "es" | "en";
}

const COOKIE_KEY = "cookie-consent";

export function CookieConsent({ locale }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  const privacyHref = locale === "en" ? "/privacy" : "/privacidad";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {locale === "es"
            ? "Este sitio utiliza cookies propias y de terceros, incluyendo Google AdSense, para mejorar la experiencia y mostrar publicidad personalizada."
            : "This site uses first and third-party cookies, including Google AdSense, to improve the experience and show personalized ads."}
          {" "}
          <Link
            href={privacyHref}
            className="font-medium text-[var(--color-text)] underline underline-offset-2"
          >
            {locale === "es" ? "Política de privacidad" : "Privacy policy"}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={reject}
            className="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {locale === "es" ? "Rechazar" : "Reject"}
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-[var(--color-text)] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-bg)] transition-opacity hover:opacity-90"
          >
            {locale === "es" ? "Aceptar" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
