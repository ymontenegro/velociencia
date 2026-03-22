import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/topics – List topics with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const status = searchParams.get("status");

    const conditions = [];

    if (section) {
      conditions.push(eq(topics.section, section as "nutricion" | "ciencia" | "entrenamiento"));
    }
    if (status) {
      conditions.push(
        eq(
          topics.status,
          status as
            | "proposed"
            | "approved"
            | "researching"
            | "writing"
            | "completed"
            | "discarded"
        )
      );
    }

    const rows = await db
      .select()
      .from(topics)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(topics.createdAt));

    return NextResponse.json({ topics: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch topics", detail: message },
      { status: 500 }
    );
  }
}

// POST /api/topics – Create a new topic manually
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, title, description, angle, priority, suggestedKeywords } =
      body as {
        section?: string;
        title?: string;
        description?: string;
        angle?: string;
        priority?: number;
        suggestedKeywords?: string[];
      };

    // Validation
    const validSections = ["nutricion", "ciencia", "entrenamiento"];
    if (!section || !validSections.includes(section)) {
      return NextResponse.json(
        {
          error: `Invalid 'section'. Must be one of: ${validSections.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'title'" },
        { status: 400 }
      );
    }

    const [topic] = await db
      .insert(topics)
      .values({
        section: section as "nutricion" | "ciencia" | "entrenamiento",
        title: title.trim(),
        description: description?.trim() ?? null,
        angle: angle?.trim() ?? null,
        priority: priority ?? 5,
        suggestedKeywords: suggestedKeywords
          ? JSON.stringify(suggestedKeywords)
          : null,
      })
      .returning();

    return NextResponse.json({ topic }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create topic", detail: message },
      { status: 500 }
    );
  }
}
