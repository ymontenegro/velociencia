import { headers } from "next/headers";

export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

const DOMAIN_LOCALE_MAP: Record<string, Locale> = {
  "pedalsci.com": "en",
  "www.pedalsci.com": "en",
  "en.localhost": "en",
};

export function getLocalFromHost(host: string): Locale {
  const hostname = host.split(":")[0];
  return DOMAIN_LOCALE_MAP[hostname] ?? DEFAULT_LOCALE;
}

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  return (h.get("x-locale") as Locale) ?? DEFAULT_LOCALE;
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export function getSiteUrl(locale: Locale): string {
  if (locale === "en") {
    return process.env.NEXT_PUBLIC_SITE_URL_EN || "https://pedalsci.com";
  }
  return process.env.NEXT_PUBLIC_SITE_URL_ES || "https://velociencia.cl";
}
