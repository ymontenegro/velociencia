"use client";

import { startTransition, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface BottomNavProps {
  locale: Locale;
  dict: Dictionary;
  onSearchOpen: () => void;
}

export function BottomNav({ locale, dict, onSearchOpen }: BottomNavProps) {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const pathname = usePathname();
  const sections = SECTIONS_I18N[locale];
  const navRef = useRef<HTMLElement>(null);

  const toolsHref = locale === "en" ? "/tools" : "/herramientas";

  // ── Close sheet on navigation ────────────────────────────────────────
  useEffect(() => {
    // Baja prioridad: solo sincroniza UI tras el cambio de ruta.
    startTransition(() => setIsSectionsOpen(false));
  }, [pathname]);

  // ── Close sheet on Escape ────────────────────────────────────────────
  useEffect(() => {
    if (!isSectionsOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSectionsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isSectionsOpen]);

  // ── Close sheet on outside tap/click ────────────────────────────────
  useEffect(() => {
    if (!isSectionsOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsSectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isSectionsOpen]);

  // ── Active-state helpers ─────────────────────────────────────────────
  const isHomeActive = pathname === "/";
  const isToolsActive = pathname.startsWith(toolsHref);
  const activeSectionId = SECTION_IDS.find((id) =>
    pathname.startsWith(`/${sections[id].slug}`),
  );
  const isSectionActive = !!activeSectionId;

  return (
    <nav
      ref={navRef}
      data-bottom-nav
      aria-label={dict.header.menu}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* ── Bar — relative container so the sheet can anchor to its top ── */}
      <div className="relative flex h-14 items-stretch border-t border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">

        {/* ── Sections sheet ─────────────────────────────────────────────
            Floats above the bar. bottom-full = bottom of sheet aligns
            with top of the relative bar div (no safe-area gap).        */}
        {isSectionsOpen && (
          <div
            className="bottom-sheet-enter tool-scope tool-corners absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl"
            role="navigation"
            aria-label={dict.header.navSections}
          >
            {/* Faint telemetry grid in the background */}
            <div
              className="tool-grid-bg pointer-events-none absolute inset-0 opacity-30"
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* Header strip */}
            <div className="relative border-b border-[var(--color-border)] px-4 py-2.5">
              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                {dict.header.navSections}
              </span>
            </div>

            {/* Section rows */}
            <div className="relative py-1">
              {SECTION_IDS.map((id) => {
                const href = `/${sections[id].slug}`;
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={id}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 transition-colors duration-150",
                      isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    <span
                      className="section-dot flex-shrink-0"
                      style={{ backgroundColor: SECTIONS[id].color }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
                      {sections[id].name}
                    </span>
                    {isActive && (
                      <span
                        className="ml-auto h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: SECTIONS[id].color }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Home ───────────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-current={isHomeActive ? "page" : undefined}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors duration-200",
            isHomeActive
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
          )}
        >
          {/* Active indicator pill — top edge of the tab */}
          <span
            className={cn(
              "absolute top-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[var(--color-text)] transition-opacity duration-200",
              isHomeActive ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          />
          {/* House icon */}
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
            {dict.header.navHome}
          </span>
        </Link>

        {/* ── Sections ──────────────────────────────────────────────── */}
        <button
          type="button"
          aria-expanded={isSectionsOpen}
          onClick={() => setIsSectionsOpen((v) => !v)}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors duration-200",
            isSectionActive || isSectionsOpen
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
          )}
        >
          {/* Active indicator — uses the current section's color if on a section */}
          <span
            className={cn(
              "absolute top-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition-opacity duration-200",
              isSectionActive ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundColor: activeSectionId
                ? SECTIONS[activeSectionId].color
                : "var(--color-text)",
            }}
            aria-hidden="true"
          />
          {/* 2×2 grid icon */}
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
            {dict.header.navSections}
          </span>
        </button>

        {/* ── Tools ─────────────────────────────────────────────────── */}
        <Link
          href={toolsHref}
          aria-current={isToolsActive ? "page" : undefined}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors duration-200",
            isToolsActive
              ? "text-[var(--color-text)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
          )}
        >
          <span
            className={cn(
              "absolute top-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[var(--color-text)] transition-opacity duration-200",
              isToolsActive ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          />
          {/* Activity/telemetry pulse icon */}
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
            {dict.tools.nav}
          </span>
        </Link>

        {/* ── Search ────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={onSearchOpen}
          aria-label={dict.search.open}
          className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text)]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
            {dict.search.button}
          </span>
        </button>
      </div>

      {/* Safe-area spacer — extends the bar background to the device's
          physical bottom edge (notch/home-bar area on modern phones).   */}
      <div
        className="bg-[var(--color-bg)]/90 backdrop-blur-md"
        style={{ height: "env(safe-area-inset-bottom, 0px)" }}
        aria-hidden="true"
      />
    </nav>
  );
}
