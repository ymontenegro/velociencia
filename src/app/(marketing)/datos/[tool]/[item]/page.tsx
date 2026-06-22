import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n";
import { getAllClimbs, getClimbById } from "@/lib/datasets/climbs";
import { getToolById } from "@/lib/tools";
import { buildClimbMetadata } from "@/lib/tools-metadata";
import { ClimbDetailContent } from "@/components/tools/climb-detail-content";

interface ClimbItemPageProps {
  params: Promise<{ tool: string; item: string }>;
}

/** Static params for the ES climb detail route — only the climbs dataset has
 *  per-item detail pages. tool = "puertos", item = each climb id. */
export function generateStaticParams() {
  const tool = getToolById("climbs-database");
  if (!tool) return [];
  return getAllClimbs().map((c) => ({ tool: tool.slug.es, item: c.id }));
}

export async function generateMetadata({ params }: ClimbItemPageProps) {
  const { item } = await params;
  const locale = await getLocale();
  return buildClimbMetadata(item, locale);
}

export default async function DatoClimbPage({ params }: ClimbItemPageProps) {
  const { tool, item } = await params;
  // Only the climbs dataset exposes per-item detail pages under /datos.
  const climbsTool = getToolById("climbs-database");
  if (!climbsTool || tool !== climbsTool.slug.es || !getClimbById(item)) notFound();
  return <ClimbDetailContent climbId={item} />;
}
