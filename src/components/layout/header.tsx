"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS_I18N, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale, useDictionary } from "@/components/locale-provider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();
  const sections = SECTIONS_I18N[locale];

  const NAV_ITEMS = [
    ...SECTION_IDS.map((id) => ({
      href: `/${sections[id].slug}`,
      label: sections[id].name,
      sectionId: id,
    })),
    { href: locale === "en" ? "/about" : "/sobre", label: dict.header.about, sectionId: null },
  ] as const;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(progress, 1));
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress h-[2px] w-full"
        style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "left" }}
        aria-hidden="true"
      />

      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
        <div className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300",
          isScrolled ? "py-2" : "py-3"
        )}>
          {/* Site name — editorial, dramatic */}
          <Link
            href="/"
            className={cn(
              "group flex items-center gap-2 font-serif font-bold tracking-[0.12em] uppercase text-[var(--color-text)] transition-all duration-300 hover:opacity-70",
              isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            )}
          >
            {/* Bike wheel icon */}
            <svg
              className={cn(
                "flex-shrink-0 transition-all duration-300",
                isScrolled ? "h-4 w-4" : "h-5 w-5"
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
              <span className={cn(
                "text-[9px] font-sans font-normal tracking-wider text-[var(--color-text-muted)] transition-all duration-300",
                isScrolled ? "hidden" : "block"
              )}>
                {dict.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link-animated text-xs font-medium tracking-wider uppercase transition-colors duration-300 ease-out hover:text-[var(--color-text)]",
                    isActive
                      ? "font-bold text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </nav>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
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

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile navigation — slides in from right */}
      <nav
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 bg-[var(--color-bg)] shadow-2xl transition-transform duration-300 ease-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
          <span className="font-serif text-lg font-bold tracking-[0.2em] uppercase text-[var(--color-text)]">
            {dict.header.menu}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-[var(--color-border-light)]"
            onClick={() => setIsMenuOpen(false)}
            aria-label={dict.header.closeMenu}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block py-4 text-sm font-medium tracking-wider uppercase transition-colors border-l-2 pl-4 mb-1",
                  isActive
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                )}
                style={{
                  borderLeftColor: isActive ? "var(--color-text)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
