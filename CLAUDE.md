# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev              # Dev server (Next.js 16, port 3000)
npm run build            # Production build
npm run lint             # ESLint

npm run db:setup         # Create dirs, run migrations, seed DB
npm run db:migrate       # Run Drizzle migrations only
npm run db:studio        # Drizzle Studio (DB browser)

npm run agents:full      # Full pipeline: discover → research → write → review
npm run agents:discover  # Discover new topics per section
npm run agents:research  # Research proposed/approved topics
npm run agents:write     # Write articles for researched topics
npm run agents:review    # Editor reviews pending articles
npm run agents:start     # Start cron scheduler
```

## Architecture

**Stack:** Next.js 16 + React 19, Tailwind CSS 4, SQLite via better-sqlite3 + Drizzle ORM, OpenAI SDK (gpt-4.1-mini for journalist, gpt-4.1 for editor). Language: Spanish (lang="es"). Path alias: `@/*` → `./src/*`.

**Two content systems coexist:**
- **SQLite DB** (`data/ciclismo.db`): tracks the agent pipeline state — topics, sources, agent runs, RSS feeds, and article metadata with status workflow (`discovered` → `researching` → `drafting` → `review` → `published`/`rejected`).
- **Markdown files** (`content/{section}/{slug}.md`): published article content with gray-matter frontmatter. Read at build time by `src/lib/markdown.ts`. These are the source of truth for the public site.

**Agent pipeline** (`src/agents/`): Two AI agents — *journalist* (discover, research, write) and *editor* (review). Each phase is a separate module under `src/agents/journalist/` or `src/agents/editor/`. Prompts live in `src/agents/prompts/` with per-section specialization. Schemas use Zod for structured output via `zodResponseFormat`.

**Three content sections:** `nutricion`, `ciencia`, `entrenamiento` — defined in `src/lib/constants.ts` as `SECTIONS`. Use `SectionId` type everywhere.

**Route groups:**
- `(marketing)` — public site with Header/TrendingBar/Footer layout
- `(admin)` — admin dashboard at `/admin` with sidebar navigation (client component)

**API routes** (`src/app/api/`): REST endpoints for articles (CRUD + approve/reject), feeds, topics, agents, and cron triggers for each pipeline phase.

**External data sources** (`src/lib/`): `pubmed.ts`, `semantic-scholar.ts`, `rss.ts`, `sources.ts` — used during the research phase to gather scientific references.

## Key Conventions

- All UI text, prompts, and logs are in Spanish
- Fonts: Playfair Display (headings via `--font-playfair`) + DM Sans (body via `--font-dm-sans`)
- Dark mode supported via `next-themes` ThemeProvider
- DB timestamps stored as integer (Unix epoch) with `{ mode: "timestamp" }`
- JSON fields in SQLite stored as `text` columns (tags, authors, metadata) — stringify on write, parse on read
