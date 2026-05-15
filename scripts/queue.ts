/**
 * Queue CLI — let Claude Code (or anything else) work the editorial queue.
 *
 * Usage:
 *   npm run queue                  → list pending items
 *   npm run queue list [status]    → list filtered
 *   npm run queue show <id>        → print full brief as markdown
 *   npm run queue next             → highest-priority pending item, auto-assigns
 *   npm run queue start <id>       → mark as in_progress
 *   npm run queue done <id>        → mark as drafted/published, optionally link article
 *   npm run queue update <id> key=value [...]  → patch fields
 */
import { db, schema } from "../src/lib/db";
import { eq, desc, sql, and, inArray } from "drizzle-orm";

type Status =
  | "idea"
  | "briefed"
  | "assigned"
  | "in_progress"
  | "drafted"
  | "scheduled"
  | "published"
  | "archived"
  | "failed";

const PENDING: Status[] = ["idea", "briefed", "scheduled", "assigned"];

function parseJsonArray<T = unknown>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function fmt(value: Date | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toISOString().replace("T", " ").slice(0, 16);
}

type Row = typeof schema.scheduledPosts.$inferSelect;

function list(status?: string): void {
  const q = db.select().from(schema.scheduledPosts);
  const rows: Row[] = status
    ? q
        .where(eq(schema.scheduledPosts.status, status as Status))
        .orderBy(desc(schema.scheduledPosts.priority), desc(schema.scheduledPosts.createdAt))
        .all()
    : q
        .where(inArray(schema.scheduledPosts.status, PENDING))
        .orderBy(desc(schema.scheduledPosts.priority), desc(schema.scheduledPosts.createdAt))
        .all();
  if (!rows.length) {
    console.log("(vacío)");
    return;
  }
  console.log(
    "ID  Pri  Estado        Sección         Idioma  Asignada     Título"
  );
  console.log(
    "─────────────────────────────────────────────────────────────────────────"
  );
  for (const r of rows) {
    console.log(
      [
        String(r.id).padEnd(4),
        String(r.priority ?? 5).padEnd(4),
        String(r.status).padEnd(13),
        String(r.section).padEnd(15),
        String(r.locale).padEnd(7),
        String(r.assignedTo ?? "—").padEnd(12),
        r.title,
      ].join(" ")
    );
  }
}

function show(id: number): void {
  const row = db
    .select()
    .from(schema.scheduledPosts)
    .where(eq(schema.scheduledPosts.id, id))
    .get();
  if (!row) {
    console.error(`Post ${id} no encontrado`);
    process.exit(1);
  }
  const keywords = parseJsonArray<string>(row.keywords);
  const refs = parseJsonArray<{ title?: string; url?: string }>(row.references);

  console.log(`# ${row.title}\n`);
  console.log(`**ID:** ${row.id}`);
  console.log(`**Estado:** ${row.status}`);
  console.log(`**Sección:** ${row.section}`);
  console.log(`**Idioma:** ${row.locale}`);
  console.log(`**Prioridad:** ${row.priority ?? 5}`);
  console.log(`**Asignada a:** ${row.assignedTo ?? "—"}`);
  console.log(`**Periodista sugerido:** ${row.suggestedAuthor ?? "—"}`);
  console.log(`**Agendada para:** ${fmt(row.scheduledFor as Date | null)}`);
  if (row.angle) console.log(`**Ángulo:** ${row.angle}`);
  if (keywords.length) console.log(`**Keywords:** ${keywords.join(", ")}`);
  if (row.coverImageHint) console.log(`**Imagen sugerida:** ${row.coverImageHint}`);

  if (row.brief) {
    console.log("\n## Brief\n");
    console.log(row.brief);
  }

  if (refs.length) {
    console.log("\n## Referencias\n");
    for (const r of refs) {
      console.log(`- ${r.title ?? r.url ?? "—"}: ${r.url ?? ""}`);
    }
  }

  if (row.agentNotes) {
    console.log("\n## Notas\n");
    console.log(row.agentNotes);
  }
}

function next(): void {
  const row = db
    .select()
    .from(schema.scheduledPosts)
    .where(
      and(
        inArray(schema.scheduledPosts.status, ["idea", "briefed", "scheduled"]),
        sql`(${schema.scheduledPosts.assignedTo} IS NULL OR ${schema.scheduledPosts.assignedTo} = '')`
      )
    )
    .orderBy(desc(schema.scheduledPosts.priority), desc(schema.scheduledPosts.createdAt))
    .limit(1)
    .get();

  if (!row) {
    console.log("(nada pendiente sin asignar)");
    return;
  }

  db.update(schema.scheduledPosts)
    .set({
      status: "assigned",
      assignedTo: "claude-code",
      updatedAt: new Date(),
    })
    .where(eq(schema.scheduledPosts.id, row.id))
    .run();

  console.log(`Asignado #${row.id} a claude-code\n`);
  show(row.id);
}

function setStatus(id: number, status: Status): void {
  const set: Record<string, unknown> = { status, updatedAt: new Date() };
  if (status === "published") set.publishedAt = new Date();
  const r = db
    .update(schema.scheduledPosts)
    .set(set)
    .where(eq(schema.scheduledPosts.id, id))
    .returning()
    .get();
  if (!r) {
    console.error(`Post ${id} no encontrado`);
    process.exit(1);
  }
  console.log(`#${id} → ${status}`);
}

function update(id: number, pairs: string[]): void {
  const set: Record<string, unknown> = { updatedAt: new Date() };
  for (const pair of pairs) {
    const eq_ix = pair.indexOf("=");
    if (eq_ix < 0) continue;
    const key = pair.slice(0, eq_ix);
    const value = pair.slice(eq_ix + 1);
    if (key === "priority" || key === "articleId" || key === "articleIdEn") {
      set[key] = Number(value);
    } else if (key === "scheduledFor" || key === "publishedAt") {
      set[key] = new Date(value);
    } else {
      set[key] = value;
    }
  }
  const r = db
    .update(schema.scheduledPosts)
    .set(set)
    .where(eq(schema.scheduledPosts.id, id))
    .returning()
    .get();
  if (!r) {
    console.error(`Post ${id} no encontrado`);
    process.exit(1);
  }
  console.log(`#${id} actualizado`);
}

function main(): void {
  const [cmd, ...rest] = process.argv.slice(2);
  switch (cmd ?? "list") {
    case "list":
      list(rest[0]);
      break;
    case "show":
      if (!rest[0]) {
        console.error("Falta id");
        process.exit(1);
      }
      show(Number(rest[0]));
      break;
    case "next":
      next();
      break;
    case "start":
      if (!rest[0]) {
        console.error("Falta id");
        process.exit(1);
      }
      setStatus(Number(rest[0]), "in_progress");
      break;
    case "done":
      if (!rest[0]) {
        console.error("Falta id");
        process.exit(1);
      }
      if (rest[1]) {
        update(Number(rest[0]), [`articleId=${rest[1]}`]);
      }
      setStatus(Number(rest[0]), "drafted");
      break;
    case "publish":
      if (!rest[0]) {
        console.error("Falta id");
        process.exit(1);
      }
      setStatus(Number(rest[0]), "published");
      break;
    case "update":
      if (!rest[0]) {
        console.error("Falta id y campos");
        process.exit(1);
      }
      update(Number(rest[0]), rest.slice(1));
      break;
    case "help":
    default:
      console.log(
        `Uso:
  npm run queue                       Lista los pendientes
  npm run queue list [status]         Lista filtrado por estado
  npm run queue show <id>             Imprime brief completo
  npm run queue next                  Toma el siguiente y lo asigna a claude-code
  npm run queue start <id>            Marca in_progress
  npm run queue done <id> [articleId] Marca drafted (y vincula artículo)
  npm run queue publish <id>          Marca published
  npm run queue update <id> key=value ...
`
      );
  }
}

main();
