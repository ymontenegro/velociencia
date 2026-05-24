import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllTools } from "@/lib/tools";
import { ToolsIndex } from "@/components/tools/tools-index";

export async function generateMetadata() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.tools.indexTitle,
    description: dict.tools.indexSubtitle,
  };
}

export default async function HerramientasPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const tools = getAllTools();

  return (
    <ToolsIndex
      tools={tools}
      locale={locale}
      indexTitle={dict.tools.indexTitle}
      indexSubtitle={dict.tools.indexSubtitle}
      openTool={dict.tools.openTool}
    />
  );
}
