/**
 * Shared server component for the tools/herramientas index page.
 *
 * Used by both:
 *   src/app/(marketing)/tools/page.tsx        (EN route)
 *   src/app/(marketing)/herramientas/page.tsx  (ES route)
 *
 * Both routes detect locale via getLocale() so a single component renders
 * correctly on either domain.
 */

import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllTools, toolsIndexHref } from "@/lib/tools";
import { ToolsIndex } from "@/components/tools/tools-index";

export async function ToolsIndexContent() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  // Only show the 5 interactive calculators on this page; datasets live at /datos|/data.
  const calculators = getAllTools().filter((t) => t.kind !== "dataset");
  const crossHref = toolsIndexHref(locale, "dataset");

  return (
    <ToolsIndex
      tools={calculators}
      locale={locale}
      indexTitle={dict.tools.indexTitle}
      indexSubtitle={dict.tools.indexSubtitle}
      openTool={dict.tools.openTool}
      openDataset={dict.tools.openDataset}
      groupCalculators={dict.tools.groupCalculators}
      groupDatasets={dict.tools.groupDatasets}
      crossCta={{ href: crossHref, label: dict.tools.crossDataCta }}
    />
  );
}
