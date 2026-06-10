import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { TOOLS } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/tools-metadata";
import { ToolPageContent } from "@/components/tools/tool-page-content";

interface DataPageProps {
  params: Promise<{ tool: string }>;
}

/** Static params for EN data route — dataset slugs only. */
export function generateStaticParams() {
  return TOOLS.filter((t) => t.kind === "dataset").map((t) => ({ tool: t.slug.en }));
}

export async function generateMetadata({ params }: DataPageProps) {
  const { tool: toolSlug } = await params;
  const locale = await getLocale();
  return buildToolMetadata(toolSlug, locale);
}

export default async function DataPage({ params }: DataPageProps) {
  const { tool: toolSlug } = await params;
  // Defence in depth: calculators belong at /tools, not /data.
  const toolEntry = TOOLS.find((t) => t.slug.en === toolSlug);
  if (!toolEntry || toolEntry.kind !== "dataset") notFound();
  return <ToolPageContent toolSlug={toolSlug} />;
}
