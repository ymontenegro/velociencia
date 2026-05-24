import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocalFromHost, type Locale } from "@/lib/i18n";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/auth";

/** Section slug redirects: Spanish slugs on English domain → English slugs, and vice versa */
const SECTION_SLUG_MAP_EN: Record<string, string> = {
  nutricion: "nutrition",
  ciencia: "science",
  entrenamiento: "training",
  competencia: "competition",
  tema: "topic",
  sobre: "about",
  privacidad: "privacy",
  contacto: "contact",
  terminos: "terms",
};

const SECTION_SLUG_MAP_ES: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_SLUG_MAP_EN).map(([es, en]) => [en, es])
);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const locale: Locale = getLocalFromHost(host);
  const pathname = request.nextUrl.pathname;

  // Admin gate — protect everything under /admin except the login page itself.
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      const response = NextResponse.next();
      response.headers.set("x-locale", locale);
      response.headers.set("x-pathname", pathname);
      return response;
    }
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const { valid } = verifySessionToken(token);
    if (!valid) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      if (pathname !== "/admin") {
        url.searchParams.set("next", pathname);
      }
      return NextResponse.redirect(url);
    }
    const response = NextResponse.next();
    response.headers.set("x-locale", locale);
    response.headers.set("x-pathname", pathname);
    return response;
  }

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
     * Match every request except:
     * - api routes
     * - _next static / image
     * - favicon, sitemap, robots, ads.txt
     * (admin IS included so we can gate it)
     */
    "/((?!api|_next|favicon|sitemap|robots|ads\\.txt).*)",
  ],
};
