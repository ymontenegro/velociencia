import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { slugify, getReadingTime } from "@/lib/utils";
import { writeArticle } from "@/lib/markdown";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const section = searchParams.get("section");
    const status = searchParams.get("status");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;

    const conditions = [];
    if (section) {
      conditions.push(eq(articles.section, section as "nutricion" | "ciencia" | "entrenamiento"));
    }
    if (status) {
      conditions.push(
        eq(
          articles.status,
          status as "discovered" | "researching" | "drafting" | "review" | "published" | "rejected"
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db
        .select()
        .from(articles)
        .where(whereClause)
        .orderBy(desc(articles.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, section, content, tags, subtitle, excerpt, author } = body;

    if (!title || !section || !content) {
      return NextResponse.json(
        { error: "title, section, and content are required" },
        { status: 400 }
      );
    }

    const validSections = ["nutricion", "ciencia", "entrenamiento"];
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { error: `section must be one of: ${validSections.join(", ")}` },
        { status: 400 }
      );
    }

    const slug = slugify(title);
    const readingTime = getReadingTime(content);
    const date = new Date().toISOString().split("T")[0];

    // Build frontmatter for the markdown file
    const frontmatter: Record<string, unknown> = {
      title,
      section,
      date,
      author: author || "Agente Periodista",
      tags: tags || [],
    };
    if (subtitle) frontmatter.subtitle = subtitle;
    if (excerpt) frontmatter.excerpt = excerpt;

    // Write the markdown file
    const contentPath = writeArticle(section, slug, frontmatter, content);
    const relativeContentPath = `content/${section}/${slug}.md`;

    // Insert into database
    const result = await db
      .insert(articles)
      .values({
        slug,
        title,
        subtitle: subtitle || null,
        section,
        status: "drafting",
        contentPath: relativeContentPath,
        excerpt: excerpt || null,
        readingTimeMinutes: readingTime,
        tags: tags ? JSON.stringify(tags) : null,
      })
      .returning();

    const inserted = result[0];

    return NextResponse.json({ data: inserted }, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);

    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
