import { getLocale } from "@/lib/i18n";
import { buildDataIndexMetadata } from "@/lib/tools-metadata";
import { DatasetsIndexContent } from "@/components/tools/datasets-index-content";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildDataIndexMetadata(locale);
}

export default DatasetsIndexContent;
