/**
 * Shared server component for the datasets index pages.
 *
 * Used by both:
 *   src/app/(marketing)/datos/page.tsx  (ES route)
 *   src/app/(marketing)/data/page.tsx   (EN route)
 *
 * Mirrors ToolsIndexContent but filters to `kind === "dataset"` tools only
 * and uses the dedicated i18n keys (dataIndexTitle / dataIndexSubtitle).
 */

import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllTools, toolsIndexHref } from "@/lib/tools";
import { ToolsIndex } from "@/components/tools/tools-index";

export async function DatasetsIndexContent() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  // Only the 4 dataset tools; calculators live at /herramientas|/tools.
  const datasets = getAllTools().filter((t) => t.kind === "dataset");
  const crossHref = toolsIndexHref(locale, "calculator");

  return (
    <ToolsIndex
      tools={datasets}
      locale={locale}
      indexTitle={dict.tools.dataIndexTitle}
      indexSubtitle={dict.tools.dataIndexSubtitle}
      openTool={dict.tools.openTool}
      openDataset={dict.tools.openDataset}
      groupCalculators={dict.tools.groupCalculators}
      groupDatasets={dict.tools.groupDatasets}
      crossCta={{ href: crossHref, label: dict.tools.crossCalcCta }}
    />
  );
}
