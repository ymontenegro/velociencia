"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_KEY = "vc_vid";
const SESSION_KEY = "vc_sid";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min inactivity ⇒ new session

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  try {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) {
      v = uid();
      localStorage.setItem(VISITOR_KEY, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

function getSessionId(): string {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parts = raw.split("|");
      if (parts.length === 2) {
        const last = Number(parts[1]);
        if (Number.isFinite(last) && Date.now() - last < SESSION_TTL_MS) {
          const next = `${parts[0]}|${Date.now()}`;
          sessionStorage.setItem(SESSION_KEY, next);
          return parts[0];
        }
      }
    }
    const sid = uid();
    sessionStorage.setItem(SESSION_KEY, `${sid}|${Date.now()}`);
    return sid;
  } catch {
    return "anon";
  }
}

function inferSection(path: string): string | null {
  const seg = path.split("/").filter(Boolean)[0];
  const map: Record<string, string> = {
    nutricion: "nutricion",
    nutrition: "nutricion",
    ciencia: "ciencia",
    science: "ciencia",
    entrenamiento: "entrenamiento",
    training: "entrenamiento",
    competencia: "competencia",
    competition: "competencia",
  };
  return seg ? map[seg] ?? null : null;
}

function inferSlug(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length >= 2 && inferSection(path)) {
    return parts[parts.length - 1] ?? null;
  }
  return null;
}

export function PageTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<{ path: string; id: number | null; startedAt: number } | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Skip admin pages entirely.
    if (pathname.startsWith("/admin")) return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    const utmSource = searchParams.get("utm_source") ?? undefined;
    const utmMedium = searchParams.get("utm_medium") ?? undefined;
    const utmCampaign = searchParams.get("utm_campaign") ?? undefined;

    // Finalize the previous pageview duration before tracking a new one.
    const prev = lastTracked.current;
    if (prev && prev.id != null) {
      const duration = Date.now() - prev.startedAt;
      try {
        navigator.sendBeacon?.(
          "/api/track",
          new Blob(
            [
              JSON.stringify({
                type: "duration",
                sessionId,
                visitorId,
                path: prev.path,
                pageViewId: prev.id,
                durationMs: duration,
              }),
            ],
            { type: "application/json" }
          )
        );
      } catch {
        /* best-effort */
      }
    }

    const startedAt = Date.now();
    lastTracked.current = { path: fullPath, id: null, startedAt };

    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        sessionId,
        visitorId,
        path: fullPath,
        locale,
        section: inferSection(pathname) ?? undefined,
        slug: inferSlug(pathname) ?? undefined,
        referer: document.referrer || undefined,
        utmSource,
        utmMedium,
        utmCampaign,
      }),
      keepalive: true,
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data && typeof data.id === "number" && lastTracked.current?.path === fullPath) {
          lastTracked.current = { ...lastTracked.current, id: data.id };
        }
      })
      .catch(() => {});

    function flushDuration() {
      const current = lastTracked.current;
      if (!current || current.id == null) return;
      const duration = Date.now() - current.startedAt;
      try {
        navigator.sendBeacon?.(
          "/api/track",
          new Blob(
            [
              JSON.stringify({
                type: "duration",
                sessionId,
                visitorId,
                path: current.path,
                pageViewId: current.id,
                durationMs: duration,
              }),
            ],
            { type: "application/json" }
          )
        );
      } catch {
        /* best-effort */
      }
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") {
        flushDuration();
      }
    }

    window.addEventListener("pagehide", flushDuration);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pagehide", flushDuration);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname, searchParams, locale]);

  return null;
}
