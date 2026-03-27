import type { Locale } from "./index";

const dictionaries = {
  es: () => import("./es.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["es"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
