import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECTIONS = ["nutricion", "ciencia", "entrenamiento", "competencia"] as const;
const LOCALES = ["es", "en", "both"] as const;
const STATUSES = [
  "idea",
  "briefed",
  "assigned",
  "in_progress",
  "drafted",
  "scheduled",
  "published",
  "archived",
  "failed",
] as const;

type Section = (typeof SECTIONS)[number];
type Locale = (typeof LOCALES)[number];
type Status = (typeof STATUSES)[number];

async function requireAuth() {
  return (await getAdminSession()).valid;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const row = db
    .select()
    .from(schema.scheduledPosts)
    .where(eq(schema.scheduledPosts.id, Number(id)))
    .get();
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ data: row });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const numericId = Number(id);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const update: Record<string, unknown> = { updatedAt: new Date() };

  if (typeof body.title === "string") update.title = body.title.trim();
  if (typeof body.brief === "string") update.brief = body.brief;
  if (typeof body.angle === "string") update.angle = body.angle;
  if (typeof body.suggestedAuthor === "string")
    update.suggestedAuthor = body.suggestedAuthor;
  if (typeof body.coverImageHint === "string")
    update.coverImageHint = body.coverImageHint;
  if (typeof body.agentNotes === "string") update.agentNotes = body.agentNotes;
  if (typeof body.assignedTo === "string") update.assignedTo = body.assignedTo;
  if (typeof body.priority === "number")
    update.priority = Math.max(1, Math.min(10, Math.round(body.priority)));
  if (typeof body.articleId === "number") update.articleId = body.articleId;
  if (typeof body.articleIdEn === "number") update.articleIdEn = body.articleIdEn;
  if (typeof body.lastError === "string") update.lastError = body.lastError;

  if (typeof body.section === "string" && SECTIONS.includes(body.section as Section)) {
    update.section = body.section;
  }
  if (typeof body.locale === "string" && LOCALES.includes(body.locale as Locale)) {
    update.locale = body.locale;
  }
  if (typeof body.status === "string" && STATUSES.includes(body.status as Status)) {
    update.status = body.status;
    if (body.status === "published") update.publishedAt = new Date();
  }

  if ("scheduledFor" in body) {
    const d = body.scheduledFor ? new Date(String(body.scheduledFor)) : null;
    update.scheduledFor = d && !Number.isNaN(d.getTime()) ? d : null;
  }

  if (Array.isArray(body.references)) {
    update.references = JSON.stringify(body.references);
  } else if (typeof body.references === "string") {
    const lines = body.references
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    update.references = JSON.stringify(
      lines.map((url) => {
        try {
          const u = new URL(url);
          return { title: u.hostname, url };
        } catch {
          return { title: url, url };
        }
      })
    );
  }

  if (Array.isArray(body.keywords)) {
    update.keywords = JSON.stringify(body.keywords);
  } else if (typeof body.keywords === "string") {
    update.keywords = JSON.stringify(
      body.keywords
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    );
  }

  const updated = db
    .update(schema.scheduledPosts)
    .set(update)
    .where(eq(schema.scheduledPosts.id, numericId))
    .returning()
    .get();

  if (!updated)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  db.delete(schema.scheduledPosts)
    .where(eq(schema.scheduledPosts.id, Number(id)))
    .run();
  return NextResponse.json({ ok: true });
}
