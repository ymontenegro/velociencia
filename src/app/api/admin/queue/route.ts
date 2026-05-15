import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc, eq, and, sql } from "drizzle-orm";
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
  const session = await getAdminSession();
  return session.valid;
}

function parseReferences(input: unknown): string {
  if (!input) return "[]";
  if (Array.isArray(input)) return JSON.stringify(input);
  if (typeof input === "string") {
    // Try parse; if not JSON, treat as line-separated URLs
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) return JSON.stringify(parsed);
    } catch {
      /* fallthrough */
    }
    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return JSON.stringify(
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
  return "[]";
}

function parseKeywords(input: unknown): string {
  if (!input) return "[]";
  if (Array.isArray(input)) return JSON.stringify(input);
  if (typeof input === "string") {
    return JSON.stringify(
      input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }
  return "[]";
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status");
  const section = req.nextUrl.searchParams.get("section");

  const conditions = [];
  if (status && STATUSES.includes(status as Status)) {
    conditions.push(eq(schema.scheduledPosts.status, status as Status));
  }
  if (section && SECTIONS.includes(section as Section)) {
    conditions.push(eq(schema.scheduledPosts.section, section as Section));
  }
  const where = conditions.length
    ? conditions.length === 1
      ? conditions[0]
      : and(...conditions)
    : undefined;

  const rows = where
    ? db
        .select()
        .from(schema.scheduledPosts)
        .where(where)
        .orderBy(
          sql`case ${schema.scheduledPosts.status} when 'scheduled' then 0 when 'idea' then 1 when 'briefed' then 2 when 'assigned' then 3 when 'in_progress' then 4 when 'drafted' then 5 when 'published' then 8 when 'archived' then 9 else 6 end`,
          desc(schema.scheduledPosts.priority),
          desc(schema.scheduledPosts.createdAt)
        )
        .all()
    : db
        .select()
        .from(schema.scheduledPosts)
        .orderBy(
          sql`case ${schema.scheduledPosts.status} when 'scheduled' then 0 when 'idea' then 1 when 'briefed' then 2 when 'assigned' then 3 when 'in_progress' then 4 when 'drafted' then 5 when 'published' then 8 when 'archived' then 9 else 6 end`,
          desc(schema.scheduledPosts.priority),
          desc(schema.scheduledPosts.createdAt)
        )
        .all();

  return NextResponse.json({ data: rows });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  const section = String(body.section ?? "");
  if (!title) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  if (!SECTIONS.includes(section as Section)) {
    return NextResponse.json({ error: "invalid section" }, { status: 400 });
  }
  const locale = LOCALES.includes(body.locale as Locale)
    ? (body.locale as Locale)
    : "both";
  const status = STATUSES.includes(body.status as Status)
    ? (body.status as Status)
    : "idea";

  const scheduledFor = body.scheduledFor
    ? new Date(String(body.scheduledFor))
    : null;

  const inserted = db
    .insert(schema.scheduledPosts)
    .values({
      title,
      section: section as Section,
      locale,
      brief: body.brief ? String(body.brief) : null,
      angle: body.angle ? String(body.angle) : null,
      keywords: parseKeywords(body.keywords),
      references: parseReferences(body.references),
      suggestedAuthor: body.suggestedAuthor
        ? String(body.suggestedAuthor)
        : null,
      coverImageHint: body.coverImageHint
        ? String(body.coverImageHint)
        : null,
      status,
      priority:
        typeof body.priority === "number"
          ? Math.max(1, Math.min(10, Math.round(body.priority)))
          : 5,
      scheduledFor:
        scheduledFor && !Number.isNaN(scheduledFor.getTime())
          ? scheduledFor
          : null,
      assignedTo: body.assignedTo ? String(body.assignedTo) : null,
      agentNotes: body.agentNotes ? String(body.agentNotes) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .get();

  return NextResponse.json({ data: inserted }, { status: 201 });
}
