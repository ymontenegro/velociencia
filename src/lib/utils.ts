import slugifyLib from "slugify";
import readingTimeLib from "reading-time";

export function slugify(text: string, locale: "es" | "en" = "es"): string {
  return slugifyLib(text, { lower: true, strict: true, locale });
}

export function getReadingTime(content: string): number {
  return Math.ceil(readingTimeLib(content).minutes);
}

export function formatDate(date: Date | string | number, locale: "es" | "en" = "es"): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === "en" ? "en-US" : "es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}
