import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/tools-metadata";
import { ToolPageContent } from "@/components/tools/tool-page-content";

interface DatoPageProps {
  params: Promise<{ tool: string }>;
}

/** Static params for ES datos route — dataset slugs only. */
export function generateStaticParams() {
  return TOOLS.filter((t) => t.kind === "dataset").map((t) => ({ tool: t.slug.es }));
}

export async function generateMetadata({ params }: DatoPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  return buildToolMetadata(toolSlug, locale);
}

export default async function DatoPage({ params }: DatoPageProps) {
  const { tool: toolSlug } = await params;
  // Defence in depth: calculators belong at /herramientas, not /datos.
  const toolEntry = TOOLS.find((t) => t.slug.es === toolSlug);
  if (!toolEntry || toolEntry.kind !== "dataset") notFound();
  return <ToolPageContent toolSlug={toolSlug} />;
}
