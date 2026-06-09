import { getLocale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/tools-metadata";
import { ToolPageContent } from "@/components/tools/tool-page-content";

interface HerramientaPageProps {
  params: Promise<{ tool: string }>;
}

/** Static params for ES route — uses Spanish slugs. */
export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug.es }));
}

export async function generateMetadata({ params }: HerramientaPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  return buildToolMetadata(toolSlug, locale);
}

export default async function HerramientaPage({ params }: HerramientaPageProps) {
  const { tool: toolSlug } = await params;
  return <ToolPageContent toolSlug={toolSlug} />;
}
