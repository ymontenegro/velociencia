/**
 * Regenerates scripts/init-db.sql from the live local SQLite schema.
 *
 * Run `npm run db:setup` first so the local DB reflects src/lib/db/schema.ts
 * (drizzle-kit push), then `npm run db:gen-init` to dump the canonical DDL as
 * idempotent CREATE ... IF NOT EXISTS statements that the container entrypoint
 * applies on startup (see scripts/init-db.cjs).
 */
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DB_PATH = path.join(process.cwd(), "data", "ciclismo.db");
const OUT_PATH = path.join(__dirname, "init-db.sql");

const db = new Database(DB_PATH, { readonly: true });
const rows = db
  .prepare(
    `SELECT type, name, sql FROM sqlite_master
     WHERE type IN ('table','index') AND name NOT LIKE 'sqlite_%' AND sql IS NOT NULL
     ORDER BY type DESC, name`
  )
  .all();
db.close();

const header = [
  "-- AUTO-GENERADO desde el esquema Drizzle (src/lib/db/schema.ts vía la DB local).",
  "-- Lo ejecuta scripts/init-db.cjs en el arranque del contenedor (idempotente).",
  "-- Para regenerar tras cambiar el esquema: `npm run db:setup` y luego `npm run db:gen-init`.",
  "",
];

const stmts = rows.map((r) =>
  r.sql
    .trim()
    .replace(/^CREATE TABLE /, "CREATE TABLE IF NOT EXISTS ")
    .replace(/^CREATE UNIQUE INDEX /, "CREATE UNIQUE INDEX IF NOT EXISTS ")
    .replace(/^CREATE INDEX /, "CREATE INDEX IF NOT EXISTS ")
    .replace(/\s+$/, "") + ";\n"
);

fs.writeFileSync(OUT_PATH, header.join("\n") + stmts.join("\n"));

const nTables = rows.filter((r) => r.type === "table").length;
const nIndexes = rows.filter((r) => r.type === "index").length;
console.log(`[gen-init-sql] ${OUT_PATH} — ${nTables} tablas, ${nIndexes} índices`);
