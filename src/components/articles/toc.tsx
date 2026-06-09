"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TocProps {
  headings: TocHeading[];
  label: string;
  color: string;
}

export function Toc({ headings, label, color }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length < 2) return;

    // Keep track of which headings are currently visible.
    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the topmost visible heading.
        if (visible.size > 0) {
          const sorted = [...visible.entries()].sort((a, b) => a[1] - b[1]);
          setActiveId(sorted[0][0]);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label={label}
      className="sticky top-8 hidden max-h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar 2xl:block"
    >
      {/* HUD label — border-t + live dot + mono */}
      <div className="mb-4 border-t-2 pt-3" style={{ borderColor: color }}>
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="tool-live-dot h-1 w-1 flex-none rounded-full"
            style={{ backgroundColor: color }}
          />
          <p
            className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]"
            style={{ color }}
          >
            {label}
          </p>
        </div>
      </div>

      <ul className="space-y-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "toc-link block border-l-2 pl-3 py-0.5 text-[12px] leading-snug transition-colors",
                  isActive
                    ? "font-medium"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                )}
                style={isActive ? { borderColor: color, color } : {}}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(h.id);
                  }
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
