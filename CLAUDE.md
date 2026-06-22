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

npm run queue            # Editorial queue CLI (list / show / next / done / publish)
```

No test framework is configured. There are no unit/integration tests.

## Editorial queue

Briefs and scheduled posts live in the `scheduled_posts` table. Yerko adds entries via the admin dashboard (`/admin/queue`); Claude Code consumes them through `npm run queue`:

```bash
npm run queue                       # list pending (idea/briefed/scheduled/assigned)
npm run queue next                  # take the highest-priority item, auto-assigns to claude-code
npm run queue show <id>             # full brief as markdown
npm run queue start <id>            # mark in_progress
npm run queue done <id> [articleId] # mark drafted (optionally link the article id)
npm run queue publish <id>          # mark published
```

When the user says "trabaja en la cola" / "next post", run `npm run queue next`, follow the brief, then close with `npm run queue done`. The dashboard surfaces status changes in real time.

## Admin dashboard

`/admin` is gated by cookie auth (user `admin`, password `admin123` by default — override with `ADMIN_USER` / `ADMIN_PASSWORD` env vars). Routes inside `(admin)` are protected by `src/proxy.ts` (Next 16 renamed middleware → proxy). Tracking script (`src/components/analytics/page-tracker.tsx`) sends pageviews to `/api/track`; geo lookup uses Vercel/Cloudflare headers when available, with ip-api.com fallback cached in `ip_geo_cache`.

## Architecture

**Stack:** Next.js 16 + React 19, Tailwind CSS 4, SQLite via better-sqlite3 + Drizzle ORM. Path alias: `@/*` → `./src/*`. Output: `standalone`.

### Dual-language site (i18n)

Host-based routing: `velociencia.cl` → Spanish (`es`), `pedalsci.com` → English (`en`). Locale is detected from hostname via the proxy (`src/proxy.ts` — Next 16's renamed middleware) which sets the `x-locale` header. `src/lib/i18n/` has dictionaries (`es.json`, `en.json`) loaded by `getDictionary(locale)`. `LocaleProvider` makes locale + dict available via React context. URL slugs are translated in the proxy (e.g. `nutricion` → `nutrition` on EN domain). All UI text, agent prompts, and logs default to Spanish.

### Two content systems coexist

- **SQLite DB** (`data/ciclismo.db`): tracks topics, sources, agent run history, RSS feeds, article metadata. Status workflow: `discovered` → `researching` → `drafting` → `review` → `published`/`rejected`.
- **Markdown files** (`content/{locale}/{section}/{slug}.md`): published article content with gray-matter frontmatter. Read at build time by `src/lib/markdown.ts`. These are the **source of truth** for the public site.

### Four content sections

Defined in `src/lib/constants.ts` as `SECTIONS` (with `SECTIONS_I18N` for translations). Use `SectionId` type everywhere.

| ID | Name | Color | Journalist |
|----|------|-------|------------|
| `nutricion` | Nutrición | `#0D9488` | Martín Velasco |
| `ciencia` | Ciencia | `#7C3AED` | Sofía Müller |
| `entrenamiento` | Entrenamiento | `#0891B2` | Tomás Herrera |
| `competencia` | Competencia | `#E11D48` | Diego Araya |

### Content production

Articles are written by Claude Code via the editorial queue (`npm run queue`). The OpenAI-based autonomous pipeline (`src/agents/`) has been removed. `agentRuns` and `topics` tables are kept for historical data but no longer populated by automated agents.

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

REST endpoints: articles (CRUD + approve/reject), feeds, topics, views (tracking), and admin queue.

### DB schema (`src/lib/db/schema.ts`)

Tables: `articles`, `sources`, `topics`, `agentRuns`, `rssFeeds`, `rssItems`, `articleViews`. SQLite with WAL mode and foreign keys enabled. DB at `data/ciclismo.db`.

### External data sources

`src/lib/rss.ts` — fetches and stores RSS feed items; used by `/api/feeds/refresh`.

### Tools & datasets (calculators + data assets)

Interactive calculators and curated data tables are registered in `src/lib/tools.ts` (`TOOLS` array, `ToolInfo` type). Routing is kind-aware via `toolHref()`:
- `kind: "calculator"` (default) → `/herramientas/<slug>` (ES) · `/tools/<slug>` (EN)
- `kind: "dataset"` → `/datos/<slug>` (ES) · `/data/<slug>` (EN)

Shared route pages (`(marketing)/{herramientas,tools,datos,data}/[tool]/page.tsx`) call `buildToolMetadata()` (`src/lib/tools-metadata.ts`) and render `ToolPageContent` → `CalculatorRenderer` (`src/components/tools/calculator-renderer.tsx`), which maps `tool.id` → the component. Each tool component lives in `src/components/tools/` and keeps its UI strings **embedded in the file** (a `STRINGS: Record<Locale, …>`), NOT in the i18n JSON. Dataset *content* dictionaries (gels/climbs/races/evidence) DO live in the i18n JSON. Tools build on the "Race Telemetry" primitives in `src/components/tools/ui/`. JSON-LD is automatic: `WebApplication` for calculators, `Dataset`/`ItemList` for datasets (`src/lib/datasets/dataset-jsonld.ts`). Related calculators surface inside articles automatically by tag (`related-tools.tsx` via each tool's `relatedTag`).

**Adding a calculator:** add a `ToolInfo` to `TOOLS` (keyword-first title/description, `sectionId`), create the client component (copy `power-zones-calculator.tsx` as the template), and register it in `CALCULATORS` in `calculator-renderer.tsx`. Metadata, route and JSON-LD are then automatic.

**Per-entity detail pages (SEO long-tail pattern):** a dataset can expose one indexable page per row through the generic nested route `(marketing)/{datos,data}/[tool]/[item]/page.tsx`. Climbs use it: `/datos/puertos/<id>` · `/data/climbs/<id>` — one page per climb (`<id>` = the un-localized kebab-case climb id, same in both locales, linked by hreflang), rendered by `climb-detail-content.tsx` with `buildClimbMetadata()` (keyword-first title per entity) plus `Place` + `BreadcrumbList` JSON-LD, and added to `sitemap.ts`. To extend this to gels/races, reuse the same `[tool]/[item]` route and add a content component + metadata builder.

### Redirects (`next.config.ts`)

`async redirects()` returns: `DATASET_MOVES` (308, datasets moved from `/herramientas|/tools` to `/datos|/data`), `TOOL_ALIASES` (guessable tool slugs), `RENAMED_EN_ARTICLES` (301, host-gated to `pedalsci.com`) and `RENAMED_ES_ARTICLES` (301, host-gated to `velociencia.cl`, for retired/renamed ES article URLs still indexed in Search Console). Add an entry here whenever an article/tool slug changes so old indexed URLs 301 instead of 404.

## Key Conventions

- Fonts: Space Grotesk (headings via `--font-space-grotesk`) + DM Sans (body via `--font-dm-sans`)
- Dark mode via `next-themes` ThemeProvider
- DB timestamps stored as integer (Unix epoch) with `{ mode: "timestamp" }`
- JSON fields in SQLite stored as `text` columns (tags, authors, metadata) — stringify on write, parse on read
- Google AdSense (`ca-pub-3852673931467935`) with Google Funding Choices CMP for consent
- Decorative grain overlay on `<body>`

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=     # For sitemap/OG (default: http://localhost:3000)
UNSPLASH_ACCESS_KEY=      # Optional — agentic cover image fetching
```
