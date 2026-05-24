import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; locale?: unknown };

  try {
    body = (await req.json()) as { email?: unknown; locale?: unknown };
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Validar y normalizar email
  const raw =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!raw || !EMAIL_RE.test(raw)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Locale opcional — solo "es" | "en"
  const locale =
    body?.locale === "es" || body?.locale === "en"
      ? (body.locale as "es" | "en")
      : undefined;

  // Source: referer o host de la petición
  const source =
    (req.headers.get("referer") ?? req.headers.get("host") ?? "").slice(
      0,
      255
    ) || undefined;

  try {
    // onConflictDoNothing evita el lanzamiento de UNIQUE. .run() devuelve
    // { changes, lastInsertRowid } — si changes === 0, el email ya existía.
    const result = db
      .insert(schema.subscribers)
      .values({
        email: raw,
        locale,
        source,
        createdAt: new Date(),
      })
      .onConflictDoNothing()
      .run();

    if (result.changes === 0) {
      // Email ya registrado — tratamos como éxito suave
      return NextResponse.json({ ok: true, reason: "duplicate" });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error inesperado:", err);
    return NextResponse.json({ ok: false, reason: "error" }, { status: 500 });
  }
}
