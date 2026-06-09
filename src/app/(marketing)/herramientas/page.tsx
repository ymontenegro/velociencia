import { getLocale } from "@/lib/i18n";
import { buildToolsIndexMetadata } from "@/lib/tools-metadata";
import { ToolsIndexContent } from "@/components/tools/tools-index-content";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildToolsIndexMetadata(locale);
}

export default ToolsIndexContent;
