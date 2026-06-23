import { db, schema } from "@/lib/db";
import { sql, and, gte, eq } from "drizzle-orm";

const REALTIME_WINDOW_MIN = 5;

export type Range = "24h" | "7d" | "30d" | "90d" | "all";

/**
 * Site/locale filter. Each public domain maps 1:1 to a locale
 * (velociencia.cl → "es", pedalsci.com → "en"), so analytics split by the
 * normalized `locale` column rather than the raw `host` (which varies with the
 * www prefix / port). `undefined` = both sites combined.
 */
export type SiteLocale = "es" | "en";

function rangeStartMs(range: Range): number {
  const now = Date.now();
  switch (range) {
    case "24h":
      return now - 24 * 60 * 60 * 1000;
    case "7d":
      return now - 7 * 24 * 60 * 60 * 1000;
    case "30d":
      return now - 30 * 24 * 60 * 60 * 1000;
    case "90d":
      return now - 90 * 24 * 60 * 60 * 1000;
    case "all":
    default:
      return 0;
  }
}

function rangeStart(range: Range): Date {
  return new Date(rangeStartMs(range));
}

export type DashboardSummary = {
  range: Range;
  totals: {
    pageviews: number;
    sessions: number;
    visitors: number;
    avgDurationMs: number;
    bounceRate: number;
  };
  realtime: number;
  byDay: { day: string; pageviews: number; visitors: number }[];
  topCountries: { country: string | null; name: string | null; sessions: number }[];
  topPages: {
    path: string;
    section: string | null;
    slug: string | null;
    pageviews: number;
    avgDurationMs: number;
  }[];
  topReferrers: { domain: string; sessions: number }[];
  devices: { device: string; sessions: number }[];
  browsers: { browser: string; sessions: number }[];
  locales: { locale: string | null; pageviews: number }[];
};

const pv = schema.pageViews;

export function getDashboardSummary(
  range: Range,
  site?: SiteLocale
): DashboardSummary {
  const startDate = rangeStart(range);

  // Optional per-site filter (by normalized locale). Folds into every query's
  // WHERE alongside the time-range condition.
  const siteCond = site ? eq(pv.locale, site) : undefined;
  const whereFor = (start: Date) =>
    siteCond ? and(gte(pv.viewedAt, start), siteCond) : gte(pv.viewedAt, start);

  // Totals: pageviews, unique sessions, unique visitors, avg duration
  const totalsRow = db
    .select({
      pageviews: sql<number>`count(*)`.as("pv"),
      sessions: sql<number>`count(distinct ${pv.sessionId})`.as("ses"),
      visitors: sql<number>`count(distinct ${pv.visitorId})`.as("vis"),
      avgDuration: sql<number>`coalesce(avg(${pv.durationMs}), 0)`.as("avg_dur"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .get();

  // Bounce rate: sessions with exactly 1 pageview / total sessions
  const sessionsRows = db
    .select({
      sessionId: pv.sessionId,
      count: sql<number>`count(*)`.as("c"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.sessionId)
    .all();
  const totalSessions = sessionsRows.length;
  const singlePage = sessionsRows.filter((r) => Number(r.count) === 1).length;
  const bounceRate = totalSessions > 0 ? singlePage / totalSessions : 0;

  // Realtime: distinct visitors in last 5 min
  const realtimeRow = db
    .select({
      visitors: sql<number>`count(distinct ${pv.visitorId})`.as("v"),
    })
    .from(pv)
    .where(whereFor(new Date(Date.now() - REALTIME_WINDOW_MIN * 60 * 1000)))
    .get();

  // By day
  const byDay = db
    .select({
      day: sql<string>`strftime('%Y-%m-%d', ${pv.viewedAt}, 'unixepoch')`.as("day"),
      pageviews: sql<number>`count(*)`.as("pv"),
      visitors: sql<number>`count(distinct ${pv.visitorId})`.as("vis"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(sql`strftime('%Y-%m-%d', ${pv.viewedAt}, 'unixepoch')`)
    .orderBy(sql`day asc`)
    .all();

  // Countries (count distinct sessions per country)
  const topCountries = db
    .select({
      country: pv.country,
      name: pv.countryName,
      sessions: sql<number>`count(distinct ${pv.sessionId})`.as("s"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.country, pv.countryName)
    .orderBy(sql`s desc`)
    .limit(15)
    .all();

  // Pages
  const topPages = db
    .select({
      path: pv.path,
      section: pv.section,
      slug: pv.slug,
      pageviews: sql<number>`count(*)`.as("pv"),
      avgDuration: sql<number>`coalesce(avg(${pv.durationMs}), 0)`.as("avg_dur"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.path, pv.section, pv.slug)
    .orderBy(sql`pv desc`)
    .limit(15)
    .all();

  // Referrers
  const topReferrers = db
    .select({
      domain: pv.refererDomain,
      sessions: sql<number>`count(distinct ${pv.sessionId})`.as("s"),
    })
    .from(pv)
    .where(
      and(
        whereFor(startDate),
        sql`${pv.refererDomain} IS NOT NULL AND ${pv.refererDomain} != ''`
      )
    )
    .groupBy(pv.refererDomain)
    .orderBy(sql`s desc`)
    .limit(10)
    .all();

  // Devices
  const devices = db
    .select({
      device: pv.device,
      sessions: sql<number>`count(distinct ${pv.sessionId})`.as("s"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.device)
    .orderBy(sql`s desc`)
    .all();

  // Browsers
  const browsers = db
    .select({
      browser: pv.browser,
      sessions: sql<number>`count(distinct ${pv.sessionId})`.as("s"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.browser)
    .orderBy(sql`s desc`)
    .limit(8)
    .all();

  // Locales
  const locales = db
    .select({
      locale: pv.locale,
      pageviews: sql<number>`count(*)`.as("pv"),
    })
    .from(pv)
    .where(whereFor(startDate))
    .groupBy(pv.locale)
    .orderBy(sql`pv desc`)
    .all();

  return {
    range,
    totals: {
      pageviews: Number(totalsRow?.pageviews ?? 0),
      sessions: Number(totalsRow?.sessions ?? 0),
      visitors: Number(totalsRow?.visitors ?? 0),
      avgDurationMs: Math.round(Number(totalsRow?.avgDuration ?? 0)),
      bounceRate,
    },
    realtime: Number(realtimeRow?.visitors ?? 0),
    byDay: byDay.map((r) => ({
      day: String(r.day),
      pageviews: Number(r.pageviews),
      visitors: Number(r.visitors),
    })),
    topCountries: topCountries.map((r) => ({
      country: r.country ?? null,
      name: r.name ?? null,
      sessions: Number(r.sessions),
    })),
    topPages: topPages.map((r) => ({
      path: r.path,
      section: r.section ?? null,
      slug: r.slug ?? null,
      pageviews: Number(r.pageviews),
      avgDurationMs: Math.round(Number(r.avgDuration ?? 0)),
    })),
    topReferrers: topReferrers
      .filter((r) => r.domain)
      .map((r) => ({
        domain: String(r.domain),
        sessions: Number(r.sessions),
      })),
    devices: devices
      .filter((d) => d.device)
      .map((d) => ({
        device: String(d.device),
        sessions: Number(d.sessions),
      })),
    browsers: browsers
      .filter((b) => b.browser)
      .map((b) => ({
        browser: String(b.browser),
        sessions: Number(b.sessions),
      })),
    locales: locales.map((r) => ({
      locale: r.locale ?? null,
      pageviews: Number(r.pageviews),
    })),
  };
}

export function getRealtimeVisitors(site?: SiteLocale): {
  total: number;
  byPath: { path: string; count: number }[];
} {
  const since = new Date(Date.now() - REALTIME_WINDOW_MIN * 60 * 1000);
  const where = site
    ? and(gte(pv.viewedAt, since), eq(pv.locale, site))
    : gte(pv.viewedAt, since);
  const total = db
    .select({
      v: sql<number>`count(distinct ${pv.visitorId})`.as("v"),
    })
    .from(pv)
    .where(where)
    .get();
  const byPath = db
    .select({
      path: pv.path,
      count: sql<number>`count(distinct ${pv.visitorId})`.as("c"),
    })
    .from(pv)
    .where(where)
    .groupBy(pv.path)
    .orderBy(sql`c desc`)
    .limit(8)
    .all();
  return {
    total: Number(total?.v ?? 0),
    byPath: byPath.map((r) => ({ path: r.path, count: Number(r.count) })),
  };
}
