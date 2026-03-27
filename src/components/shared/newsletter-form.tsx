"use client";

import { useState } from "react";
import { useDictionary } from "@/components/locale-provider";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const dict = useDictionary();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  /* ── Compact mode (footer) ── */
  if (compact) {
    if (submitted) {
      return (
        <div className="animate-success flex items-center gap-2">
          <svg className="h-4 w-4 text-[var(--color-nutricion)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path className="animate-checkmark" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm font-medium text-[var(--color-nutricion)]">
            {dict.newsletter.thanks}
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.newsletter.placeholder}
          required
          className="w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-ciencia)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ciencia)] transition-colors"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-[var(--color-text)] px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {dict.newsletter.subscribe}
        </button>
      </form>
    );
  }

  /* ── Standalone mode (dramatic section) ── */
  if (submitted) {
    return (
      <section className="relative overflow-hidden rounded-lg bg-[var(--color-text)] px-6 py-16 sm:px-12 sm:py-20">
        {/* Subtle decorative gradient */}
        <div className="absolute inset-0 opacity-10" style={{
          background: "radial-gradient(ellipse at 30% 50%, var(--color-ciencia) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, var(--color-nutricion) 0%, transparent 60%)",
        }} />
        <div className="animate-success relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-nutricion)]">
            <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path className="animate-checkmark" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-4 font-serif text-2xl font-bold text-white">
            {dict.newsletter.thanksTitle}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {dict.newsletter.thanksSubtitle}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-lg bg-[var(--color-text)] px-6 py-16 sm:px-12 sm:py-20">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 opacity-10" style={{
        background: "radial-gradient(ellipse at 30% 50%, var(--color-ciencia) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, var(--color-nutricion) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          {dict.newsletter.stayUpdated}
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-white/30" />
        <p className="mt-4 text-base leading-relaxed text-white/60">
          {dict.newsletter.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.newsletter.placeholder}
            required
            className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors backdrop-blur-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-all hover:bg-white/90 hover:shadow-lg active:scale-[0.98]"
          >
            {dict.newsletter.subscribe}
          </button>
        </form>
      </div>
    </section>
  );
}
