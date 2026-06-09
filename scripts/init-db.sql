-- AUTO-GENERADO desde el esquema Drizzle (src/lib/db/schema.ts vía la DB local).
-- Lo ejecuta scripts/init-db.cjs en el arranque del contenedor (idempotente).
-- Para regenerar tras cambiar el esquema: npm run db:setup en local y luego `npm run db:gen-init`.

CREATE TABLE IF NOT EXISTS `agent_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agent_type` text NOT NULL,
	`phase` text NOT NULL,
	`section` text,
	`status` text NOT NULL,
	`model` text NOT NULL,
	`input_tokens` integer,
	`output_tokens` integer,
	`cost_usd` real,
	`duration_ms` integer,
	`error_message` text,
	`metadata` text,
	`started_at` integer NOT NULL,
	`completed_at` integer
);

CREATE TABLE IF NOT EXISTS `article_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`section` text NOT NULL,
	`viewed_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`section` text NOT NULL,
	`status` text DEFAULT 'discovered' NOT NULL,
	`content_path` text,
	`excerpt` text,
	`cover_image_url` text,
	`reading_time_minutes` integer,
	`topic_id` integer,
	`agent_run_id` integer,
	`editor_score` real,
	`editor_notes` text,
	`rejection_reason` text,
	`meta_title` text,
	`meta_description` text,
	`tags` text,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `ip_geo_cache` (
	`ip_hash` text PRIMARY KEY NOT NULL,
	`country` text,
	`country_name` text,
	`region` text,
	`city` text,
	`cached_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`visitor_id` text NOT NULL,
	`path` text NOT NULL,
	`host` text,
	`locale` text,
	`section` text,
	`slug` text,
	`referer` text,
	`referer_domain` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`country` text,
	`country_name` text,
	`region` text,
	`city` text,
	`device` text,
	`browser` text,
	`os` text,
	`duration_ms` integer,
	`ip_hash` text,
	`viewed_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `rss_feeds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`section` text NOT NULL,
	`language` text DEFAULT 'en',
	`is_active` integer DEFAULT true NOT NULL,
	`last_fetched_at` integer,
	`fetch_interval_minutes` integer DEFAULT 60,
	`error_count` integer DEFAULT 0,
	`last_error` text,
	`created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `rss_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`feed_id` integer NOT NULL,
	`guid` text NOT NULL,
	`title` text NOT NULL,
	`link` text,
	`description` text,
	`pub_date` integer,
	`categories` text,
	`used_in_topic_id` integer,
	`created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `scheduled_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`section` text NOT NULL,
	`locale` text DEFAULT 'both' NOT NULL,
	`brief` text,
	`angle` text,
	`keywords` text,
	`references` text,
	`suggested_author` text,
	`cover_image_hint` text,
	`status` text DEFAULT 'idea' NOT NULL,
	`priority` integer DEFAULT 5,
	`scheduled_for` integer,
	`published_at` integer,
	`assigned_to` text,
	`article_id` integer,
	`article_id_en` integer,
	`agent_notes` text,
	`last_error` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`article_id` integer,
	`topic_id` integer,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`authors` text,
	`published_date` text,
	`abstract` text,
	`relevance_score` real,
	`cited_in_article` integer DEFAULT false,
	`raw_data` text,
	`created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    locale TEXT,
    source TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at INTEGER NOT NULL
  );

CREATE TABLE IF NOT EXISTS `topics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`angle` text,
	`status` text DEFAULT 'proposed' NOT NULL,
	`priority` integer DEFAULT 5,
	`inspiration_source_ids` text,
	`suggested_keywords` text,
	`agent_run_id` integer,
	`created_at` integer NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `articles_slug_unique` ON `articles` (`slug`);

CREATE INDEX IF NOT EXISTS `idx_agent_runs_status_phase` ON `agent_runs` (`status`,`phase`);

CREATE INDEX IF NOT EXISTS `idx_article_views_section` ON `article_views` (`section`);

CREATE INDEX IF NOT EXISTS `idx_article_views_slug` ON `article_views` (`slug`);

CREATE INDEX IF NOT EXISTS `idx_articles_published_at` ON `articles` (`published_at`);

CREATE INDEX IF NOT EXISTS `idx_articles_section_status` ON `articles` (`section`,`status`);

CREATE INDEX IF NOT EXISTS `idx_pv_country` ON `page_views` (`country`);

CREATE INDEX IF NOT EXISTS `idx_pv_path` ON `page_views` (`path`);

CREATE INDEX IF NOT EXISTS `idx_pv_session` ON `page_views` (`session_id`);

CREATE INDEX IF NOT EXISTS `idx_pv_viewed_at` ON `page_views` (`viewed_at`);

CREATE INDEX IF NOT EXISTS `idx_pv_visitor` ON `page_views` (`visitor_id`);

CREATE INDEX IF NOT EXISTS `idx_rss_feeds_section` ON `rss_feeds` (`section`);

CREATE INDEX IF NOT EXISTS `idx_rss_items_feed` ON `rss_items` (`feed_id`);

CREATE INDEX IF NOT EXISTS `idx_rss_items_guid` ON `rss_items` (`guid`);

CREATE INDEX IF NOT EXISTS `idx_scheduled_for` ON `scheduled_posts` (`scheduled_for`);

CREATE INDEX IF NOT EXISTS `idx_scheduled_section` ON `scheduled_posts` (`section`);

CREATE INDEX IF NOT EXISTS `idx_scheduled_status` ON `scheduled_posts` (`status`);

CREATE INDEX IF NOT EXISTS `idx_sources_article` ON `sources` (`article_id`);

CREATE INDEX IF NOT EXISTS `idx_sources_type` ON `sources` (`type`);

CREATE INDEX IF NOT EXISTS `idx_sources_topic` ON `sources` (`topic_id`);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

CREATE INDEX IF NOT EXISTS `idx_topics_section_status` ON `topics` (`section`,`status`);

CREATE UNIQUE INDEX IF NOT EXISTS `rss_feeds_url_unique` ON `rss_feeds` (`url`);
