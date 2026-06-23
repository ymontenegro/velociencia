import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import {
  resolveRef,
  getAdminArticle,
  updateAdminArticle,
  deleteAdminArticle,
} from "@/lib/content-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ ref: string[] }> };

async function authed() {
  return (await getAdminSession()).valid;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Build a validated frontmatter patch from an arbitrary request body. Only known
 * fields are accepted; everything else is ignored. Returns an error string when
 * a provided field has the wrong shape so the client gets a clear 400.
 *
 * Nullable string fields (subtitle, excerpt, coverImage, translationOf) are
 * deleted from the frontmatter when sent empty or null, keeping files tidy.
 */
function buildFrontmatterPatch(
  input: Record<string, unknown>
): { patch: Record<string, unknown> } | { error: string } {
  const patch: Record<string, unknown> = {};

  const nonEmptyString = (key: string): string | { error: string } | undefined => {
    if (!(key in input)) return undefined;
    const v = input[key];
    if (typeof v !== "string" || v.trim() === "") return { error: `${key} debe ser un texto no vacío` };
    return v.trim();
  };

  const nullableString = (key: string): string | null | { error: string } | undefined => {
    if (!(key in input)) return undefined;
    const v = input[key];
    if (v === null) return null;
    if (typeof v !== "string") return { error: `${key} debe ser texto` };
    const trimmed = v.trim();
    return trimmed === "" ? null : trimmed;
  };

  const title = nonEmptyString("title");
  if (title !== undefined) {
    if (typeof title !== "string") return title;
    patch.title = title;
  }

  const author = nonEmptyString("author");
  if (author !== undefined) {
    if (typeof author !== "string") return author;
    patch.author = author;
  }

  for (const key of ["subtitle", "excerpt", "coverImage", "translationOf"]) {
    const val = nullableString(key);
    if (val !== undefined) {
      if (val !== null && typeof val !== "string") return val;
      patch[key] = val; // null deletes the key in updateAdminArticle
    }
  }

  if ("date" in input) {
    const d = input.date;
    if (typeof d !== "string" || !DATE_RE.test(d)) {
      return { error: "date debe tener formato YYYY-MM-DD" };
    }
    patch.date = d;
  }

  for (const key of ["featured", "draft", "affiliate"]) {
    if (key in input) {
      if (typeof input[key] !== "boolean") return { error: `${key} debe ser booleano` };
      // Store only when true; false removes the flag to keep frontmatter minimal.
      patch[key] = input[key] === true ? true : null;
    }
  }

  if ("tags" in input) {
    const raw = input.tags;
    let tags: string[];
    if (Array.isArray(raw)) {
      tags = raw.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof raw === "string") {
      tags = raw.split(",").map((t) => t.trim()).filter(Boolean);
    } else {
      return { error: "tags debe ser una lista o texto separado por comas" };
    }
    patch.tags = tags;
  }

  return { patch };
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  if (!(await authed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { ref } = await params;
  const parsed = resolveRef(ref);
  if (!parsed) return NextResponse.json({ error: "invalid ref" }, { status: 400 });

  const article = getAdminArticle(parsed);
  if (!article) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ data: article });
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await authed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { ref } = await params;
  const parsed = resolveRef(ref);
  if (!parsed) return NextResponse.json({ error: "invalid ref" }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const patch: { frontmatter?: Record<string, unknown>; content?: string } = {};

  if (body.frontmatter && typeof body.frontmatter === "object") {
    const built = buildFrontmatterPatch(body.frontmatter as Record<string, unknown>);
    if ("error" in built) {
      return NextResponse.json({ error: built.error }, { status: 400 });
    }
    patch.frontmatter = built.patch;
  }

  if ("content" in body) {
    if (typeof body.content !== "string") {
      return NextResponse.json({ error: "content debe ser texto" }, { status: 400 });
    }
    patch.content = body.content;
  }

  if (!patch.frontmatter && patch.content === undefined) {
    return NextResponse.json({ error: "nada que actualizar" }, { status: 400 });
  }

  const updated = updateAdminArticle(parsed, patch);
  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await authed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { ref } = await params;
  const parsed = resolveRef(ref);
  if (!parsed) return NextResponse.json({ error: "invalid ref" }, { status: 400 });

  const ok = deleteAdminArticle(parsed);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
