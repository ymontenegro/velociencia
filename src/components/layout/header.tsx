"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS, SECTIONS_I18N, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale, useDictionary } from "@/components/locale-provider";
import { CommandPalette } from "@/components/search/command-palette";
import { getAllTools, toolHref, toolColor, toolsIndexHref } from "@/lib/tools";
import { BottomNav } from "@/components/layout/bottom-nav";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isMobileDataOpen, setIsMobileDataOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();
  const sections = SECTIONS_I18N[locale];
  const tools = getAllTools();
  const calculators = tools.filter((t) => !t.kind || t.kind === "calculator");
  const datasets = tools.filter((t) => t.kind === "dataset");

  const toolsHref = toolsIndexHref(locale, "calculator");
  const dataHref = toolsIndexHref(locale, "dataset");
  const aboutHref = locale === "en" ? "/about" : "/sobre";

  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const toolsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll tracking ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      startTransition(() => {
        setScrollProgress(Math.min(progress, 1));
        setIsScrolled(scrollTop > 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body scroll lock when mobile menu open ───────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        startTransition(() => {
          setIsToolsOpen(false);
          setIsMenuOpen(false);
          setSearchOpen(false);
        });
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        startTransition(() => setSearchOpen((prev) => !prev));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ── Close tools menu on outside click ───────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        toolsMenuRef.current &&
        !toolsMenuRef.current.contains(e.target as Node)
      ) {
        startTransition(() => setIsToolsOpen(false));
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cleanup hover timers on unmount
  useEffect(() => {
    return () => {
      if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    };
  }, []);

  const openToolsMenu = () => {
    if (toolsCloseTimer.current) clearTimeout(toolsCloseTimer.current);
    setIsToolsOpen(true);
  };

  const scheduleCloseToolsMenu = () => {
    toolsCloseTimer.current = setTimeout(
      () => startTransition(() => setIsToolsOpen(false)),
      150,
    );
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsToolsOpen(false);
    setIsMobileToolsOpen(false);
    setIsMobileDataOpen(false);
  };

  return (
    <>
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
      />

      <header className="sticky top-0 z-40">
        {/* Scroll progress bar */}
        <div
          className="scroll-progress h-[2px] w-full"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left",
          }}
          aria-hidden="true"
        />

        <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
          <div
            className={cn(
              "mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300",
              isScrolled ? "py-2" : "py-3",
            )}
          >
            {/* ── Logo / Site name ───────────────────────────────────────── */}
            <Link
              href="/"
              className={cn(
                "group flex items-center gap-2 font-serif font-bold tracking-[0.12em] uppercase text-[var(--color-text)] transition-all duration-300 hover:opacity-70",
                isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
              )}
            >
              {/* Bike wheel icon */}
              <svg
                className={cn(
                  "flex-shrink-0 transition-all duration-300",
                  isScrolled ? "h-4 w-4" : "h-5 w-5",
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="10" />
                <line x1="12" y1="14" x2="12" y2="22" />
                <line x1="2" y1="12" x2="10" y2="12" />
                <line x1="14" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="10.59" y2="10.59" />
                <line x1="13.41" y1="13.41" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="10.59" y2="13.41" />
                <line x1="13.41" y1="10.59" x2="19.07" y2="4.93" />
              </svg>
              <div className="flex flex-col">
                <span>{dict.siteName}</span>
                {/* Telemetry eyebrow — mono, muted signal label */}
                <span
                  className={cn(
                    "font-mono text-[8px] font-normal tracking-[0.25em] text-[var(--color-text-muted)] transition-all duration-300 uppercase",
                    isScrolled ? "hidden" : "block",
                  )}
                  aria-hidden="true"
                >
                  {dict.tagline}
                </span>
              </div>
            </Link>

            {/* ── Desktop navigation ─────────────────────────────────────── */}
            <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
              {/* Section links with colored dots */}
              {SECTION_IDS.map((id) => {
                const href = `/${sections[id].slug}`;
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={id}
                    href={href}
                    className={cn(
                      "nav-link-animated flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300 ease-out hover:text-[var(--color-text)]",
                      isActive
                        ? "font-bold text-[var(--color-text)]"
                        : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {/* Colored section dot — HUD heat-map signal */}
                    <span
                      className="section-dot transition-transform group-hover:scale-125"
                      style={{ backgroundColor: SECTIONS[id].color }}
                      aria-hidden="true"
                    />
                    {sections[id].name}
                  </Link>
                );
              })}

              {/* ── Herramientas mega-menu trigger (unified: calc + datos) ── */}
              <div
                ref={toolsMenuRef}
                className="relative"
                onMouseEnter={openToolsMenu}
                onMouseLeave={scheduleCloseToolsMenu}
              >
                <button
                  type="button"
                  aria-expanded={isToolsOpen}
                  aria-haspopup="true"
                  aria-controls="tools-megamenu"
                  aria-label={dict.header.toolsMenuLabel}
                  onClick={() => setIsToolsOpen((v) => !v)}
                  className={cn(
                    "nav-link-animated flex items-center gap-1 text-xs font-medium tracking-wider uppercase transition-colors duration-300 ease-out hover:text-[var(--color-text)]",
                    isToolsOpen ||
                      pathname.startsWith(toolsHref) ||
                      pathname.startsWith(dataHref)
                      ? "font-bold text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)]",
                  )}
                >
                  {dict.tools.nav}
                  {/* Chevron */}
                  <svg
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isToolsOpen && "rotate-180",
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ── Mega-menu panel: two columns ─────────────────────── */}
                {isToolsOpen && (
                  <div
                    id="tools-megamenu"
                    role="navigation"
                    aria-label={dict.tools.nav}
                    className="menu-enter tool-scope tool-corners absolute right-0 top-full z-50 mt-3 w-[560px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl"
                    onMouseEnter={openToolsMenu}
                    onMouseLeave={scheduleCloseToolsMenu}
                  >
                    {/* Faint telemetry grid */}
                    <div
                      className="tool-grid-bg pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        maskImage: "linear-gradient(to bottom, black, transparent 60%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black, transparent 60%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Two-column grid */}
                    <div className="relative grid grid-cols-2 divide-x divide-[var(--color-border)]">
                      {/* ── Left column: Calculadoras ─────────────────── */}
                      <div className="flex flex-col">
                        {/* Column header strip */}
                        <div className="border-b border-[var(--color-border)] px-5 py-3">
                          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                            {dict.header.toolsGroupCalc}
                          </span>
                        </div>

                        {/* Calculators list */}
                        <div className="flex-1 p-4">
                          <ul className="space-y-1">
                            {calculators.map((tool) => (
                              <li key={tool.id}>
                                <Link
                                  href={toolHref(tool, locale)}
                                  onClick={closeAll}
                                  className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors duration-150 hover:bg-[var(--color-border-light)]"
                                >
                                  <span
                                    className="section-dot mt-1.5 flex-shrink-0 transition-transform group-hover:scale-125"
                                    style={{ backgroundColor: toolColor(tool) }}
                                    aria-hidden="true"
                                  />
                                  <div className="min-w-0">
                                    <span className="block text-[13px] font-semibold leading-snug text-[var(--color-text)]">
                                      {tool.title[locale]}
                                    </span>
                                    <span className="block text-[11px] leading-snug text-[var(--color-text-muted)] line-clamp-2">
                                      {tool.tagline[locale]}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer — view all calculators */}
                        <div className="border-t border-[var(--color-border)] px-5 py-3">
                          <Link
                            href={toolsHref}
                            onClick={closeAll}
                            className="group flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                          >
                            {dict.header.toolsViewAll}
                            <svg
                              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* ── Right column: Datos ───────────────────────── */}
                      <div className="flex flex-col">
                        {/* Column header strip */}
                        <div className="border-b border-[var(--color-border)] px-5 py-3">
                          <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                            {dict.header.toolsGroupData}
                          </span>
                        </div>

                        {/* Datasets list */}
                        <div className="flex-1 p-4">
                          <ul className="space-y-1">
                            {datasets.map((tool) => (
                              <li key={tool.id}>
                                <Link
                                  href={toolHref(tool, locale)}
                                  onClick={closeAll}
                                  className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors duration-150 hover:bg-[var(--color-border-light)]"
                                >
                                  <span
                                    className="section-dot mt-1.5 flex-shrink-0 transition-transform group-hover:scale-125"
                                    style={{ backgroundColor: toolColor(tool) }}
                                    aria-hidden="true"
                                  />
                                  <div className="min-w-0">
                                    <span className="block text-[13px] font-semibold leading-snug text-[var(--color-text)]">
                                      {tool.title[locale]}
                                    </span>
                                    <span className="block text-[11px] leading-snug text-[var(--color-text-muted)] line-clamp-2">
                                      {tool.tagline[locale]}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Footer — view all data */}
                        <div className="border-t border-[var(--color-border)] px-5 py-3">
                          <Link
                            href={dataHref}
                            onClick={closeAll}
                            className="group flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                          >
                            {dict.header.dataViewAll}
                            <svg
                              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About link */}
              <Link
                href={aboutHref}
                className={cn(
                  "nav-link-animated text-xs font-medium tracking-wider uppercase transition-colors duration-300 ease-out hover:text-[var(--color-text)]",
                  pathname.startsWith(aboutHref)
                    ? "font-bold text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)]",
                )}
              >
                {dict.header.about}
              </Link>

              {/* Search button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                aria-label={dict.search.open}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                {dict.search.button}
                <kbd>⌘K</kbd>
              </button>

              {/* Locale switch — external domain, signalled with icon */}
              <a
                href={locale === "es" ? "https://pedalsci.com" : "https://velociencia.cl"}
                rel="noopener"
                aria-label={dict.header.localeSwitchAriaLabel}
                title={dict.header.localeSwitchAriaLabel}
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
              >
                {/* Globe icon */}
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {locale === "es" ? "EN" : "ES"}
                {/* External link indicator */}
                <svg
                  className="h-2.5 w-2.5 opacity-60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <ThemeToggle />
            </nav>

            {/* ── Mobile controls ────────────────────────────────────────── */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile locale switch — external domain, signalled with icon */}
              <a
                href={locale === "es" ? "https://pedalsci.com" : "https://velociencia.cl"}
                rel="noopener"
                aria-label={dict.header.localeSwitchAriaLabel}
                title={dict.header.localeSwitchAriaLabel}
                className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
              >
                {/* Globe icon */}
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {locale === "es" ? "EN" : "ES"}
                {/* External link indicator */}
                <svg
                  className="h-2 w-2 opacity-60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <ThemeToggle />
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[var(--color-border-light)]"
                onClick={() => setSearchOpen(true)}
                aria-label={dict.search.open}
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
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[var(--color-border-light)]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? dict.header.closeMenu : dict.header.openMenu}
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile overlay ─────────────────────────────────────────────── */}
        <div
          className={cn(
            "fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 md:hidden",
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* ── Mobile drawer ──────────────────────────────────────────────── */}
        <nav
          className={cn(
            "fixed right-0 top-0 z-[60] h-full w-72 overflow-y-auto bg-[var(--color-bg)] shadow-2xl transition-transform duration-300 ease-out md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          aria-label={dict.header.menu}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
              {dict.header.menu}
            </span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-[var(--color-border-light)]"
              onClick={() => setIsMenuOpen(false)}
              aria-label={dict.header.closeMenu}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 py-4">
            {/* Section links */}
            {SECTION_IDS.map((id) => {
              const href = `/${sections[id].slug}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={id}
                  href={href}
                  onClick={closeAll}
                  className={cn(
                    "flex items-center gap-3 border-l-2 py-3.5 pl-4 mb-1 text-sm font-medium tracking-wider uppercase transition-colors",
                    isActive
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                  style={{
                    borderLeftColor: isActive ? SECTIONS[id].color : "transparent",
                  }}
                >
                  <span
                    className="section-dot flex-shrink-0"
                    style={{ backgroundColor: SECTIONS[id].color }}
                    aria-hidden="true"
                  />
                  {sections[id].name}
                </Link>
              );
            })}

            {/* Tools expandable section */}
            <div className="mb-1">
              <button
                type="button"
                onClick={() => setIsMobileToolsOpen((v) => !v)}
                aria-expanded={isMobileToolsOpen}
                className={cn(
                  "flex w-full items-center gap-3 border-l-2 border-transparent py-3.5 pl-4 text-sm font-medium tracking-wider uppercase transition-colors",
                  pathname.startsWith(toolsHref)
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                )}
              >
                <span
                  className="section-dot flex-shrink-0 bg-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                {dict.tools.nav}
                <svg
                  className={cn(
                    "ml-auto h-3.5 w-3.5 transition-transform duration-200",
                    isMobileToolsOpen && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded tools list — calculators only */}
              {isMobileToolsOpen && (
                <div className="ml-7 mt-1 border-l border-[var(--color-border)] pl-4">
                  {calculators.map((tool) => (
                    <Link
                      key={tool.id}
                      href={toolHref(tool, locale)}
                      onClick={closeAll}
                      className="group mb-1 flex items-center gap-2 py-2 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <span
                        className="section-dot flex-shrink-0"
                        style={{ backgroundColor: toolColor(tool) }}
                        aria-hidden="true"
                      />
                      {tool.title[locale]}
                    </Link>
                  ))}
                  <Link
                    href={toolsHref}
                    onClick={closeAll}
                    className="mt-3 flex items-center gap-1.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {dict.header.toolsViewAll}
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Datos expandable section */}
            <div className="mb-1">
              <button
                type="button"
                onClick={() => setIsMobileDataOpen((v) => !v)}
                aria-expanded={isMobileDataOpen}
                className={cn(
                  "flex w-full items-center gap-3 border-l-2 border-transparent py-3.5 pl-4 text-sm font-medium tracking-wider uppercase transition-colors",
                  pathname.startsWith(dataHref)
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                )}
              >
                <span
                  className="section-dot flex-shrink-0 bg-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                {dict.header.navData}
                <svg
                  className={cn(
                    "ml-auto h-3.5 w-3.5 transition-transform duration-200",
                    isMobileDataOpen && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded data list */}
              {isMobileDataOpen && (
                <div className="ml-7 mt-1 border-l border-[var(--color-border)] pl-4">
                  {datasets.map((tool) => (
                    <Link
                      key={tool.id}
                      href={toolHref(tool, locale)}
                      onClick={closeAll}
                      className="group mb-1 flex items-center gap-2 py-2 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    >
                      <span
                        className="section-dot flex-shrink-0"
                        style={{ backgroundColor: toolColor(tool) }}
                        aria-hidden="true"
                      />
                      {tool.title[locale]}
                    </Link>
                  ))}
                  <Link
                    href={dataHref}
                    onClick={closeAll}
                    className="mt-3 flex items-center gap-1.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {dict.header.dataViewAll}
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href={aboutHref}
              onClick={closeAll}
              className={cn(
                "block border-l-2 border-transparent py-3.5 pl-4 mb-1 text-sm font-medium tracking-wider uppercase transition-colors",
                pathname.startsWith(aboutHref)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {dict.header.about}
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Bottom navigation — mobile HUD, fixed bottom bar ────────────── */}
      <BottomNav
        locale={locale}
        dict={dict}
        onSearchOpen={() => setSearchOpen(true)}
      />
    </>
  );
}
