"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { useDictionary, useLocale } from "@/components/locale-provider";

type FormStatus = "idle" | "submitting" | "success" | "duplicate" | "error" | "invalid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const dict = useDictionary();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();

    // Validación cliente
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale }),
      });

      const data = (await res.json()) as { ok: boolean; reason?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        return;
      }

      setStatus(data.reason === "duplicate" ? "duplicate" : "success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const isSuccess = status === "success" || status === "duplicate";

  /* ── Mensaje de error / inválido inline ── */
  const errorMessage =
    status === "invalid"
      ? dict.newsletter.invalidEmail
      : status === "error"
        ? dict.newsletter.error
        : null;

  /* ── Compact mode (footer) ─────────────────────────────────────────── */
  if (compact) {
    if (isSuccess) {
      return (
        <div className="animate-success flex items-center gap-2">
          {/* Telemetry checkmark display */}
          <div
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm"
            style={{ backgroundColor: "var(--color-nutricion)" }}
          >
            <svg
              className="h-3 w-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                className="animate-checkmark"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-nutricion)]">
            {status === "duplicate"
              ? dict.newsletter.alreadySubscribed
              : dict.newsletter.thanks}
          </p>
        </div>
      );
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="tool-scope flex flex-col gap-2"
        style={{ "--tool-accent": "var(--color-ciencia)" } as CSSProperties}
      >
        {/* Input with instrument-panel focus ring via tool-field */}
        <div className="tool-field rounded-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error") setStatus("idle");
            }}
            placeholder={dict.newsletter.placeholder}
            disabled={status === "submitting"}
            className="w-full bg-transparent px-3 py-2 font-mono text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none disabled:opacity-60"
          />
        </div>
        {errorMessage && (
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-red-500">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-sm bg-[var(--color-text)] px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-bg)] transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting"
            ? dict.newsletter.submitting
            : dict.newsletter.subscribe}
        </button>
      </form>
    );
  }

  /* ── Standalone mode (dramatic section) ────────────────────────────── */
  if (isSuccess) {
    return (
      <section className="relative overflow-hidden rounded-lg bg-[var(--color-text)] px-6 py-16 sm:px-12 sm:py-20">
        {/* Decorative gradient */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, var(--color-ciencia) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, var(--color-nutricion) 0%, transparent 60%)",
          }}
        />
        {/* Telemetry grid overlay */}
        <div
          className="tool-scope absolute inset-0 tool-grid-bg opacity-[0.04]"
          style={{ "--tool-accent": "rgba(255,255,255,0.8)" } as CSSProperties}
        />
        {/* Corner ticks */}
        <div
          className="pointer-events-none absolute left-[12px] top-[12px] z-10 h-3 w-3 border-l-[1.5px] border-t-[1.5px]"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        />
        <div
          className="pointer-events-none absolute bottom-[12px] right-[12px] z-10 h-3 w-3 border-b-[1.5px] border-r-[1.5px]"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        />

        <div className="animate-success relative z-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-[var(--color-nutricion)]">
            <svg
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                className="animate-checkmark"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mt-4 font-serif text-2xl font-bold text-white">
            {status === "duplicate"
              ? dict.newsletter.alreadySubscribed
              : dict.newsletter.thanksTitle}
          </p>
          {status !== "duplicate" && (
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-white/50">
              {dict.newsletter.thanksSubtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-lg bg-[var(--color-text)] px-6 py-16 sm:px-12 sm:py-20">
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, var(--color-ciencia) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, var(--color-nutricion) 0%, transparent 60%)",
        }}
      />
      {/* Telemetry grid overlay */}
      <div
        className="tool-scope absolute inset-0 tool-grid-bg opacity-[0.04]"
        style={{ "--tool-accent": "rgba(255,255,255,0.8)" } as CSSProperties}
      />
      {/* Corner ticks */}
      <div
        className="pointer-events-none absolute left-[12px] top-[12px] z-10 h-3 w-3 border-l-[1.5px] border-t-[1.5px]"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[12px] right-[12px] z-10 h-3 w-3 border-b-[1.5px] border-r-[1.5px]"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        {/* HUD badge */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="tool-live-dot h-1.5 w-1.5 rounded-full bg-white/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            {dict.newsletter.stayUpdated}
          </span>
        </div>

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
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error") setStatus("idle");
            }}
            placeholder={dict.newsletter.placeholder}
            disabled={status === "submitting"}
            className="flex-1 rounded-sm border border-white/10 bg-white/5 px-4 py-3 font-mono text-[13px] text-white placeholder:text-white/30 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-sm bg-white px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text)] transition-all hover:bg-white/90 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? dict.newsletter.submitting
              : dict.newsletter.subscribe}
          </button>
        </form>

        {errorMessage && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-red-300">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
