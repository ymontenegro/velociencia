<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Velociencia / PedalSci

Cycling-science editorial site. One codebase serves two domains: `velociencia.cl` (ES) and
`pedalsci.com` (EN). Next.js 16 + React 19, Tailwind 4, SQLite (better-sqlite3 + Drizzle).

No test framework is configured — there are no unit or integration tests to run.

## Editorial queue — how articles get written

Briefs live in the `scheduled_posts` table; Yerko adds them from `/admin/queue`. When he says
"trabaja en la cola" or "next post", that means:

```bash
npm run queue              # list pending (idea/briefed/scheduled/assigned)
npm run queue next         # take highest-priority item, auto-assigns to claude-code
npm run queue show <id>    # full brief as markdown
npm run queue start <id>   # mark in_progress
npm run queue done <id> [articleId]
npm run queue publish <id>
```

The dashboard reflects status changes in real time. The old OpenAI autonomous pipeline
(`src/agents/`) **was removed**; the `agentRuns` and `topics` tables survive for historical data
but nothing populates them anymore — don't wire new automation to them without asking.

## Non-obvious architecture

**Locale comes from the hostname, not the URL.** `src/proxy.ts` (Next 16 renamed *middleware* →
*proxy*) reads the host, sets the `x-locale` header, and also **translates URL slugs**
(`nutricion` ⇄ `nutrition`). Dictionaries in `src/lib/i18n/`, exposed through `LocaleProvider`.
UI text, prompts and logs default to Spanish.

**Two content systems coexist, and markdown wins.** The SQLite DB (`data/ciclismo.db`) tracks
metadata, sources, RSS and run history; the published prose lives in
`content/{locale}/{section}/{slug}.md` with gray-matter frontmatter, read at build time by
`src/lib/markdown.ts`. **The markdown files are the source of truth for the public site.**

**Sections** are defined once in `src/lib/constants.ts` (`SECTIONS` + `SECTIONS_I18N`); use the
`SectionId` type everywhere instead of string literals.

**Admin** (`/admin`, route group `(admin)`) is cookie-gated by `src/proxy.ts` — default
`admin`/`admin123`, override with `ADMIN_USER`/`ADMIN_PASSWORD`. Pageview tracking posts to
`/api/track`; geo comes from Vercel/Cloudflare headers with an ip-api.com fallback cached in
`ip_geo_cache`.

**Images**: hotlinked from the Unsplash CDN through the `unsplash()` helper in `src/lib/images.ts`
(Imgix params, 16px blur placeholders), falling back to `public/images/`.

**Markdown rendering** uses `next-mdx-remote/rsc` with gfm, math, slug/autolink, KaTeX and
`rehype-pretty-code`. Gotcha: **KaTeX CSS is loaded from a CDN in the root layout**, not bundled.

## Tools and datasets

Calculators and curated data tables are registered in `src/lib/tools.ts` (`TOOLS`, `ToolInfo`).
`toolHref()` routes by kind: `calculator` → `/herramientas|/tools/<slug>`, `dataset` →
`/datos|/data/<slug>`. Shared route pages call `buildToolMetadata()` and render
`ToolPageContent` → `CalculatorRenderer`, which maps `tool.id` to a component.

- **Tool UI strings stay embedded in the component** as `STRINGS: Record<Locale, …>` — *not* in
  the i18n JSON. Dataset *content* dictionaries (gels/climbs/races/evidence) **do** live in the
  i18n JSON. This split is deliberate.
- **Adding a calculator**: append a `ToolInfo` to `TOOLS` (keyword-first title/description,
  `sectionId`), create the client component (copy `power-zones-calculator.tsx`), register it in
  `CALCULATORS`. Route, metadata and JSON-LD follow automatically.
- **Per-entity SEO pages**: a dataset can expose one indexable page per row via the generic
  `(marketing)/{datos,data}/[tool]/[item]/page.tsx`. Climbs already use it (`/datos/puertos/<id>`,
  `/data/climbs/<id>` — same un-localized kebab id in both locales, linked by hreflang). To extend
  it to gels or races, reuse that route and add a content component plus a metadata builder.

## Conventions that bite

- **Every renamed article or tool slug needs a redirect** in `next.config.ts` (`DATASET_MOVES`,
  `TOOL_ALIASES`, `RENAMED_EN_ARTICLES`, `RENAMED_ES_ARTICLES` — the article ones are host-gated).
  Skip it and an indexed URL 404s instead of 301-ing.
- DB timestamps are integers (Unix epoch) with `{ mode: "timestamp" }`.
- JSON fields are `text` columns in SQLite — stringify on write, parse on read.
- AdSense `ca-pub-3852673931467935` with Google Funding Choices CMP for consent.

## Environment

```
NEXT_PUBLIC_SITE_URL=     # sitemap/OG (default http://localhost:3000)
UNSPLASH_ACCESS_KEY=      # optional — agentic cover image fetching
ADMIN_USER= ADMIN_PASSWORD=
```
