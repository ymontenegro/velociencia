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

npm run feeds:import     # Import RSS feeds
```

No test framework is configured. There are no unit/integration tests.

## Architecture

**Stack:** Next.js 16 + React 19, Tailwind CSS 4, SQLite via better-sqlite3 + Drizzle ORM, OpenAI SDK (gpt-4.1-mini for journalist, gpt-4.1 for editor). Path alias: `@/*` → `./src/*`. Output: `standalone`.

### Dual-language site (i18n)

Host-based routing: `velociencia.cl` → Spanish (`es`), `pedalsci.com` → English (`en`). Locale is detected from hostname via middleware (`src/middleware.ts`) which sets `x-locale` header. `src/lib/i18n/` has dictionaries (`es.json`, `en.json`) loaded by `getDictionary(locale)`. `LocaleProvider` makes locale + dict available via React context. URL slugs are translated in middleware (e.g. `nutricion` → `nutrition` on EN domain). All UI text, agent prompts, and logs default to Spanish.

### Two content systems coexist

- **SQLite DB** (`data/ciclismo.db`): tracks agent pipeline state — topics, sources, agent runs, RSS feeds, article metadata. Status workflow: `discovered` → `researching` → `drafting` → `review` → `published`/`rejected`.
- **Markdown files** (`content/{locale}/{section}/{slug}.md`): published article content with gray-matter frontmatter. Read at build time by `src/lib/markdown.ts`. These are the **source of truth** for the public site.

### Four content sections

Defined in `src/lib/constants.ts` as `SECTIONS` (with `SECTIONS_I18N` for translations). Use `SectionId` type everywhere.

| ID | Name | Color | Journalist |
|----|------|-------|------------|
| `nutricion` | Nutrición | `#0D9488` | Martín Velasco |
| `ciencia` | Ciencia | `#7C3AED` | Sofía Müller |
| `entrenamiento` | Entrenamiento | `#0891B2` | Tomás Herrera |
| `competencia` | Competencia | `#E11D48` | Diego Araya |

### Agent pipeline

`src/agents/` — Two AI agents: *journalist* (discover, research, write) and *editor* (review). Each phase is a module under `src/agents/journalist/` or `src/agents/editor/`. Prompts in `src/agents/prompts/` include per-section specialization files (`section-nutricion.ts`, `section-ciencia.ts`, etc.). Schemas use Zod for structured output via `zodResponseFormat`.

### Markdown rendering pipeline

Articles use `next-mdx-remote/rsc` with these plugins:
- `remark-gfm` (tables, strikethrough), `remark-math` (LaTeX)
- `rehype-slug` + `rehype-autolink-headings` (heading anchors)
- `rehype-katex` (math rendering — CSS loaded from CDN in root layout)
- `rehype-pretty-code` + `shiki` (syntax highlighting)

Frontmatter schema (`src/types/article.ts`): `title`, `subtitle`, `section`, `date`, `author`, `tags`, `excerpt`, `coverImage`, `sources` (array of `{ title, url, type }`).

### Image strategy

Primary: Unsplash CDN hotlinking via `src/lib/images.ts` `unsplash()` helper with Imgix params. Blur placeholders via tiny 16px thumbnails. Fallback: `public/images/`. Optional: Unsplash API for agentic cover image fetching (requires `UNSPLASH_ACCESS_KEY`).

### Route groups

- `(marketing)` — public site: Header → TrendingBar → content → Footer
- `(admin)` — dashboard at `/admin` with sidebar navigation (client component)

### API routes (`src/app/api/`)

REST endpoints: articles (CRUD + approve/reject), feeds, topics, agents, views (tracking), and `/api/cron/*` triggers for each pipeline phase.

### DB schema (`src/lib/db/schema.ts`)

Tables: `articles`, `sources`, `topics`, `agentRuns`, `rssFeeds`, `rssItems`, `articleViews`. SQLite with WAL mode and foreign keys enabled. DB at `data/ciclismo.db`.

### External data sources

`src/lib/`: `pubmed.ts`, `semantic-scholar.ts`, `rss.ts`, `sources.ts` — used during the research phase to gather scientific references.

## Key Conventions

- Fonts: Space Grotesk (headings via `--font-space-grotesk`) + DM Sans (body via `--font-dm-sans`)
- Dark mode via `next-themes` ThemeProvider
- DB timestamps stored as integer (Unix epoch) with `{ mode: "timestamp" }`
- JSON fields in SQLite stored as `text` columns (tags, authors, metadata) — stringify on write, parse on read
- Google AdSense (`ca-pub-3852673931467935`) with Google Funding Choices CMP for consent
- Decorative grain overlay on `<body>`

## Environment Variables

```
OPENAI_API_KEY=           # Required — agent pipeline (gpt-4.1-mini, gpt-4.1)
NEXT_PUBLIC_SITE_URL=     # For sitemap/OG (default: http://localhost:3000)
PUBMED_API_KEY=           # Optional — increases PubMed rate limits
SEMANTIC_SCHOLAR_API_KEY= # Optional — increases Semantic Scholar rate limits
UNSPLASH_ACCESS_KEY=      # Optional — agentic image fetching
```
