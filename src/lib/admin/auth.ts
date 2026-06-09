import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// En producción los defaults de desarrollo son un bypass trivial de la
// autenticación: fallar es preferible a quedar expuestos. Se exceptúa la fase
// de build (next build corre con NODE_ENV=production sin las env de runtime);
// docker-entrypoint.sh hace la misma validación al arrancar el contenedor.
if (
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build"
) {
  const missing = ["ADMIN_PASSWORD", "ADMIN_SECRET"].filter(
    (key) => !process.env[key]
  );
  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno obligatorias en producción: ${missing.join(", ")}. ` +
        `Configúralas en Coolify antes de desplegar (ADMIN_SECRET: usa un valor aleatorio largo, p. ej. "openssl rand -hex 32").`
    );
  }
}

export const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
export const ADMIN_COOKIE = "vc_admin";
const SECRET =
  process.env.ADMIN_SECRET ??
  "velociencia-default-secret-change-in-prod-1234567890";

const SESSION_TTL_DAYS = 30;
const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");
}

export function createSessionToken(username: string): string {
  const issuedAt = Date.now();
  const payload = `${username}.${issuedAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): {
  valid: boolean;
  username?: string;
} {
  if (!token) return { valid: false };
  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false };
  const [username, issuedAtStr, signature] = parts;
  const issuedAt = Number(issuedAtStr);
  if (!username || !Number.isFinite(issuedAt)) return { valid: false };
  if (Date.now() - issuedAt > SESSION_TTL_MS) return { valid: false };
  const expected = sign(`${username}.${issuedAtStr}`);
  if (signature.length !== expected.length) return { valid: false };
  const ok = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
  return ok ? { valid: true, username } : { valid: false };
}

export function checkCredentials(username: string, password: string): boolean {
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length === 0 ||
    password.length === 0
  ) {
    return false;
  }
  const expectedUser = Buffer.from(ADMIN_USER);
  const givenUser = Buffer.from(username);
  const expectedPass = Buffer.from(ADMIN_PASSWORD);
  const givenPass = Buffer.from(password);
  if (givenUser.length !== expectedUser.length) return false;
  if (givenPass.length !== expectedPass.length) return false;
  return (
    crypto.timingSafeEqual(givenUser, expectedUser) &&
    crypto.timingSafeEqual(givenPass, expectedPass)
  );
}

export async function getAdminSession(): Promise<{
  valid: boolean;
  username?: string;
}> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * Guardia para route handlers que mutan datos. Devuelve una respuesta 401
 * lista para retornar si no hay sesión de admin válida, o null si la hay.
 *
 *   const unauthorized = await requireAdmin();
 *   if (unauthorized) return unauthorized;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
};
