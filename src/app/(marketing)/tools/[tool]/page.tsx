import { getLocale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/tools-metadata";
import { ToolPageContent } from "@/components/tools/tool-page-content";

interface ToolPageProps {
  params: Promise<{ tool: string }>;
}

/** Static params for EN route — uses English slugs. */
export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug.en }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  return buildToolMetadata(toolSlug, locale);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = await params;
  return <ToolPageContent toolSlug={toolSlug} />;
}
