import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Mark a queued post as picked up by an agent.
 * - Sets status to "assigned" and records who took it.
 * - Returns the full brief so the agent has everything it needs.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: { assignedTo?: string; notes?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* optional body */
  }

  const post = db
    .select()
    .from(schema.scheduledPosts)
    .where(eq(schema.scheduledPosts.id, Number(id)))
    .get();
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });

  const updated = db
    .update(schema.scheduledPosts)
    .set({
      status: "assigned",
      assignedTo: body.assignedTo ?? "claude-code",
      agentNotes: body.notes
        ? `${post.agentNotes ? post.agentNotes + "\n\n" : ""}${body.notes}`
        : post.agentNotes,
      updatedAt: new Date(),
    })
    .where(eq(schema.scheduledPosts.id, Number(id)))
    .returning()
    .get();

  return NextResponse.json({ data: updated });
}
