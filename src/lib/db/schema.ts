import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable(
  "articles",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    section: text("section", {
      enum: ["nutricion", "ciencia", "entrenamiento", "competencia"],
    }).notNull(),
    status: text("status", {
      enum: [
        "discovered",
        "researching",
        "drafting",
        "review",
        "published",
        "rejected",
      ],
    })
      .notNull()
      .default("discovered"),
    contentPath: text("content_path"),
    excerpt: text("excerpt"),
    coverImageUrl: text("cover_image_url"),
    readingTimeMinutes: integer("reading_time_minutes"),
    topicId: integer("topic_id"),
    agentRunId: integer("agent_run_id"),
    editorScore: real("editor_score"),
    editorNotes: text("editor_notes"),
    rejectionReason: text("rejection_reason"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    tags: text("tags"), // JSON array
    publishedAt: integer("published_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_articles_section_status").on(table.section, table.status),
    index("idx_articles_published_at").on(table.publishedAt),
  ]
);

export const sources = sqliteTable(
  "sources",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    articleId: integer("article_id"),
    topicId: integer("topic_id"),
    type: text("type", {
      enum: ["rss", "pubmed", "semantic_scholar", "web_search"],
    }).notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    authors: text("authors"), // JSON array
    publishedDate: text("published_date"),
    abstract: text("abstract"),
    relevanceScore: real("relevance_score"),
    citedInArticle: integer("cited_in_article", { mode: "boolean" }).default(
      false
    ),
    rawData: text("raw_data"), // JSON blob
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_sources_article").on(table.articleId),
    index("idx_sources_topic").on(table.topicId),
  ]
);

export const agentRuns = sqliteTable("agent_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentType: text("agent_type", {
    enum: ["journalist", "editor"],
  }).notNull(),
  phase: text("phase", {
    enum: ["discover", "research", "write", "review"],
  }).notNull(),
  section: text("section", {
    enum: ["nutricion", "ciencia", "entrenamiento", "competencia"],
  }),
  status: text("status", {
    enum: ["running", "completed", "failed"],
  }).notNull(),
  model: text("model").notNull(),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  costUsd: real("cost_usd"),
  durationMs: integer("duration_ms"),
  errorMessage: text("error_message"),
  metadata: text("metadata"), // JSON blob
  startedAt: integer("started_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const rssFeeds = sqliteTable("rss_feeds", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  section: text("section", {
    enum: ["nutricion", "ciencia", "entrenamiento", "competencia", "general"],
  }).notNull(),
  language: text("language").default("en"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastFetchedAt: integer("last_fetched_at", { mode: "timestamp" }),
  fetchIntervalMinutes: integer("fetch_interval_minutes").default(60),
  errorCount: integer("error_count").default(0),
  lastError: text("last_error"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const rssItems = sqliteTable(
  "rss_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    feedId: integer("feed_id").notNull(),
    guid: text("guid").notNull(),
    title: text("title").notNull(),
    link: text("link"),
    description: text("description"),
    pubDate: integer("pub_date", { mode: "timestamp" }),
    categories: text("categories"), // JSON array
    usedInTopicId: integer("used_in_topic_id"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_rss_items_feed").on(table.feedId),
    index("idx_rss_items_guid").on(table.guid),
  ]
);

export const articleViews = sqliteTable(
  "article_views",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    section: text("section", {
      enum: ["nutricion", "ciencia", "entrenamiento", "competencia"],
    }).notNull(),
    viewedAt: integer("viewed_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_article_views_slug").on(table.slug),
    index("idx_article_views_section").on(table.section),
  ]
);

export const pageViews = sqliteTable(
  "page_views",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: text("session_id").notNull(),
    visitorId: text("visitor_id").notNull(),
    path: text("path").notNull(),
    host: text("host"),
    locale: text("locale"),
    section: text("section"),
    slug: text("slug"),
    referer: text("referer"),
    refererDomain: text("referer_domain"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    country: text("country"),
    countryName: text("country_name"),
    region: text("region"),
    city: text("city"),
    device: text("device"), // desktop | mobile | tablet | bot
    browser: text("browser"),
    os: text("os"),
    durationMs: integer("duration_ms"),
    ipHash: text("ip_hash"),
    viewedAt: integer("viewed_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_pv_viewed_at").on(table.viewedAt),
    index("idx_pv_session").on(table.sessionId),
    index("idx_pv_visitor").on(table.visitorId),
    index("idx_pv_path").on(table.path),
    index("idx_pv_country").on(table.country),
  ]
);

export const ipGeoCache = sqliteTable("ip_geo_cache", {
  ipHash: text("ip_hash").primaryKey(),
  country: text("country"),
  countryName: text("country_name"),
  region: text("region"),
  city: text("city"),
  cachedAt: integer("cached_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const scheduledPosts = sqliteTable(
  "scheduled_posts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    section: text("section", {
      enum: ["nutricion", "ciencia", "entrenamiento", "competencia"],
    }).notNull(),
    locale: text("locale", { enum: ["es", "en", "both"] })
      .notNull()
      .default("both"),
    brief: text("brief"), // What the article should be about
    angle: text("angle"),
    keywords: text("keywords"), // JSON array
    references: text("references"), // JSON array of {title, url}
    suggestedAuthor: text("suggested_author"),
    coverImageHint: text("cover_image_hint"),
    status: text("status", {
      enum: [
        "idea",
        "briefed",
        "assigned",
        "in_progress",
        "drafted",
        "scheduled",
        "published",
        "archived",
        "failed",
      ],
    })
      .notNull()
      .default("idea"),
    priority: integer("priority").default(5),
    scheduledFor: integer("scheduled_for", { mode: "timestamp" }),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    assignedTo: text("assigned_to"), // agent name or "claude-code"
    articleId: integer("article_id"), // links to articles once produced (ES)
    articleIdEn: integer("article_id_en"), // EN variant
    agentNotes: text("agent_notes"),
    lastError: text("last_error"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_scheduled_status").on(table.status),
    index("idx_scheduled_for").on(table.scheduledFor),
    index("idx_scheduled_section").on(table.section),
  ]
);

export const subscribers = sqliteTable(
  "subscribers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    locale: text("locale", { enum: ["es", "en"] }),
    source: text("source"),
    status: text("status", { enum: ["active", "unsubscribed"] })
      .notNull()
      .default("active"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("idx_subscribers_email").on(table.email)]
);

export const topics = sqliteTable(
  "topics",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    section: text("section", {
      enum: ["nutricion", "ciencia", "entrenamiento", "competencia"],
    }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    angle: text("angle"),
    status: text("status", {
      enum: [
        "proposed",
        "approved",
        "researching",
        "writing",
        "completed",
        "discarded",
      ],
    })
      .notNull()
      .default("proposed"),
    priority: integer("priority").default(5),
    inspirationSourceIds: text("inspiration_source_ids"), // JSON array
    suggestedKeywords: text("suggested_keywords"), // JSON array
    agentRunId: integer("agent_run_id"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("idx_topics_section_status").on(table.section, table.status),
  ]
);
