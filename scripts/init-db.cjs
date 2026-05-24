/**
 * Container startup DB initializer.
 *
 * Runs the canonical schema (scripts/init-db.sql) with CREATE ... IF NOT EXISTS,
 * so the production SQLite volume always has every table the app expects — even
 * on a fresh volume. Idempotent: a no-op when the schema already exists.
 *
 * Why not `drizzle-kit push` here? The Next `standalone` runtime image ships
 * neither drizzle-kit (a devDependency) nor the TypeScript schema/tsx it needs,
 * and `push` is interactive. better-sqlite3 IS bundled (the app uses it), so we
 * apply pre-generated DDL instead. Regenerate the SQL with `npm run db:gen-init`.
 */
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DB_PATH = path.join(process.cwd(), "data", "ciclismo.db");
const SQL_PATH = path.join(__dirname, "init-db.sql");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const ddl = fs.readFileSync(SQL_PATH, "utf-8");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(ddl);

const tables = db
  .prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  )
  .all()
  .map((r) => r.name);

db.close();

console.log(
  `[init-db] esquema asegurado en ${DB_PATH} — ${tables.length} tablas: ${tables.join(", ")}`
);
