import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocalFromHost, type Locale } from "@/lib/i18n";

/** Section slug redirects: Spanish slugs on English domain → English slugs, and vice versa */
const SECTION_SLUG_MAP_EN: Record<string, string> = {
  nutricion: "nutrition",
  ciencia: "science",
  entrenamiento: "training",
  competencia: "competition",
  sobre: "about",
  privacidad: "privacy",
  contacto: "contact",
};

const SECTION_SLUG_MAP_ES: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_SLUG_MAP_EN).map(([es, en]) => [en, es])
);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const locale: Locale = getLocalFromHost(host);

  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  // Redirect wrong-locale slugs
  if (locale === "en" && firstSegment && SECTION_SLUG_MAP_EN[firstSegment]) {
    const englishSlug = SECTION_SLUG_MAP_EN[firstSegment];
    const rest = pathname.slice(firstSegment.length + 1);
    const url = request.nextUrl.clone();
    url.pathname = `/${englishSlug}${rest}`;
    return NextResponse.redirect(url, 301);
  }

  if (locale === "es" && firstSegment && SECTION_SLUG_MAP_ES[firstSegment]) {
    const spanishSlug = SECTION_SLUG_MAP_ES[firstSegment];
    const rest = pathname.slice(firstSegment.length + 1);
    const url = request.nextUrl.clone();
    url.pathname = `/${spanishSlug}${rest}`;
    return NextResponse.redirect(url, 301);
  }

  // Set locale header for downstream consumption
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next (static files, images)
     * - favicon, sitemap, robots
     * - admin routes
     */
    "/((?!api|_next|favicon|sitemap|robots|admin).*)",
  ],
};
