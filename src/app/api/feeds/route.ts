import { db } from "@/lib/db";
import { rssFeeds } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/feeds – List all RSS feeds
export async function GET() {
  try {
    const feeds = await db
      .select()
      .from(rssFeeds)
      .orderBy(desc(rssFeeds.createdAt));

    return NextResponse.json({ feeds });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to fetch feeds", detail: message },
      { status: 500 }
    );
  }
}

// POST /api/feeds – Add a new RSS feed
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, url, section } = body as {
      name?: string;
      url?: string;
      section?: string;
    };

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'name'" },
        { status: 400 }
      );
    }
    if (!url || typeof url !== "string" || url.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'url'" },
        { status: 400 }
      );
    }

    const validSections = ["nutricion", "ciencia", "entrenamiento", "general"];
    if (!section || !validSections.includes(section)) {
      return NextResponse.json(
        {
          error: `Invalid 'section'. Must be one of: ${validSections.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const [feed] = await db
      .insert(rssFeeds)
      .values({
        name: name.trim(),
        url: url.trim(),
        section: section as "nutricion" | "ciencia" | "entrenamiento" | "general",
      })
      .returning();

    return NextResponse.json({ feed }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // Handle unique constraint violation on url
    if (message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "A feed with this URL already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create feed", detail: message },
      { status: 500 }
    );
  }
}
