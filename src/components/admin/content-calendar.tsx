"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { SECTIONS, type SectionId } from "@/lib/constants";
import { STATUS_META, siteTodayStr } from "@/lib/publish";
import type { ArticleStatus } from "@/types/article";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CONTENT_URL = "/api/admin/content";
const QUEUE_URL = "/api/admin/queue";

/**
 * Article as returned by GET /api/admin/content (markdown files, source of
 * truth for the public site). `date` is "" for an undated draft.
 */
type AdminArticle = {
  ref: string;
  locale: "es" | "en";
  section: SectionId;
  slug: string;
  title: string;
  date: string;
  status: ArticleStatus;
  featured: boolean;
  draft: boolean;
  author: string;
  wordCount: number;
};

/** Editorial brief from GET /api/admin/queue (DB). */
type ScheduledPost = {
  id: number;
  title: string;
  section: SectionId;
  locale: "es" | "en" | "both";
  status: string;
  priority: number | null;
  scheduledFor: string | null;
  assignedTo: string | null;
};

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const SECTION_FILTERS: { id: SectionId | ""; label: string }[] = [
  { id: "", label: "Todas las secciones" },
  { id: "nutricion", label: "Nutrición" },
  { id: "ciencia", label: "Ciencia" },
  { id: "entrenamiento", label: "Entrenamiento" },
  { id: "competencia", label: "Competencia" },
];

/** Zero-pad to two digits. */
function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** "YYYY-MM-DD" for a given year/month(0-based)/day, pure calendar arithmetic. */
function dayKey(year: number, month: number, day: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

/**
 * Day-of-week with Monday=0 … Sunday=6, for laying out the grid.
 * `new Date(year, month, 1)` is local-time but we only read getDay(), which is
 * stable for the first-of-month regardless of timezone offset within the day.
 */
function mondayFirstDOW(year: number, month: number): number {
  const js = new Date(year, month, 1).getDay(); // 0=Sun … 6=Sat
  return (js + 6) % 7;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** ISO datetime ("...T...") → "YYYY-MM-DD" in the local browser day. */
function scheduledForDayKey(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function ContentCalendar() {
  const today = siteTodayStr();
  const [todayY, todayM] = today.split("-").map(Number);

  // Month being viewed (year + 0-based month).
  const [view, setView] = useState({ year: todayY, month: todayM - 1 });
  const [sectionFilter, setSectionFilter] = useState<SectionId | "">("");
  const [localeFilter, setLocaleFilter] = useState<"" | "es" | "en">("");

  const { data: contentData, isLoading: loadingContent, error: contentError } =
    useSWR<{ data: AdminArticle[] }>(CONTENT_URL, fetcher);
  const { data: queueData, isLoading: loadingQueue, error: queueError } =
    useSWR<{ data: ScheduledPost[] }>(QUEUE_URL, fetcher);

  const articles = useMemo(
    () => contentData?.data ?? [],
    [contentData]
  );
  const briefs = useMemo(() => queueData?.data ?? [], [queueData]);

  // Apply section/locale filters once for everything downstream.
  const matchesFilters = useMemo(() => {
    return {
      article: (a: AdminArticle) =>
        (!sectionFilter || a.section === sectionFilter) &&
        (!localeFilter || a.locale === localeFilter),
      brief: (b: ScheduledPost) =>
        (!sectionFilter || b.section === sectionFilter) &&
        (!localeFilter || b.locale === localeFilter || b.locale === "both"),
    };
  }, [sectionFilter, localeFilter]);

  // Index dated articles by their "YYYY-MM-DD" key (string compare, no parsing).
  const articlesByDay = useMemo(() => {
    const map = new Map<string, AdminArticle[]>();
    for (const a of articles) {
      if (!a.date || a.draft) continue; // undated drafts live in the backlog
      if (!matchesFilters.article(a)) continue;
      const list = map.get(a.date) ?? [];
      list.push(a);
      map.set(a.date, list);
    }
    return map;
  }, [articles, matchesFilters]);

  // Index briefs that carry a scheduledFor date.
  const briefsByDay = useMemo(() => {
    const map = new Map<string, ScheduledPost[]>();
    for (const b of briefs) {
      if (!b.scheduledFor) continue;
      if (b.status === "published" || b.status === "archived") continue;
      if (!matchesFilters.brief(b)) continue;
      const key = scheduledForDayKey(b.scheduledFor);
      if (!key) continue;
      const list = map.get(key) ?? [];
      list.push(b);
      map.set(key, list);
    }
    return map;
  }, [briefs, matchesFilters]);

  // Backlog: written articles flagged as draft / undated (status === "draft").
  const backlog = useMemo(
    () =>
      articles
        .filter((a) => a.status === "draft" && matchesFilters.article(a))
        .sort((a, b) => a.title.localeCompare(b.title, "es")),
    [articles, matchesFilters]
  );

  // Build the day cells for the visible month.
  const { year, month } = view;
  const cells = useMemo(() => {
    const leading = mondayFirstDOW(year, month);
    const total = daysInMonth(year, month);
    const out: { day: number; key: string }[] = [];
    for (let i = 0; i < leading; i++) out.push({ day: 0, key: `pad-${i}` });
    for (let d = 1; d <= total; d++) out.push({ day: d, key: dayKey(year, month, d) });
    return out;
  }, [year, month]);

  // Counts for the visible month.
  const monthPrefix = `${year}-${pad2(month + 1)}-`;
  const monthCounts = useMemo(() => {
    let total = 0;
    let scheduled = 0;
    for (const [key, list] of articlesByDay) {
      if (!key.startsWith(monthPrefix)) continue;
      total += list.length;
      scheduled += list.filter((a) => a.status === "scheduled").length;
    }
    let briefCount = 0;
    for (const [key, list] of briefsByDay) {
      if (!key.startsWith(monthPrefix)) continue;
      briefCount += list.length;
    }
    return { total, scheduled, briefs: briefCount };
  }, [articlesByDay, briefsByDay, monthPrefix]);

  function goPrev() {
    setView((v) =>
      v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }
    );
  }
  function goNext() {
    setView((v) =>
      v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }
    );
  }
  function goToday() {
    setView({ year: todayY, month: todayM - 1 });
  }

  function refresh() {
    mutate(CONTENT_URL);
    mutate(QUEUE_URL);
  }

  const isLoading = loadingContent || loadingQueue;
  const hasError = contentError || queueError;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Calendario de publicaciones
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Planifica y reprograma artículos. Las fechas futuras se publican
            solas al llegar el día.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value as SectionId | "")}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {SECTION_FILTERS.map((f) => (
              <option key={f.id || "all"} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          <select
            value={localeFilter}
            onChange={(e) => setLocaleFilter(e.target.value as "" | "es" | "en")}
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="">ES + EN</option>
            <option value="es">Solo ES</option>
            <option value="en">Solo EN</option>
          </select>
        </div>
      </div>

      {hasError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudieron cargar los datos del calendario. Reintenta recargando la
          página.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Calendar grid */}
        <div className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden">
          {/* Month header + nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-[var(--color-text)] capitalize">
                {MONTHS[month]} {year}
              </h2>
              {isLoading && (
                <span className="text-xs text-[var(--color-text-muted)]">
                  Cargando…
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)] transition-colors"
                aria-label="Mes anterior"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                onClick={goToday}
                className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border-light)] transition-colors"
              >
                Hoy
              </button>
              <button
                onClick={goNext}
                className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border-light)] transition-colors"
                aria-label="Mes siguiente"
              >
                <ChevronIcon dir="right" />
              </button>
            </div>
          </div>

          {/* Counts */}
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-border-light)]/40 text-xs text-[var(--color-text-muted)]">
            <span>
              <strong className="text-[var(--color-text)]">
                {monthCounts.total}
              </strong>{" "}
              artículos
            </span>
            <span>
              <strong className="text-[var(--color-text)]">
                {monthCounts.scheduled}
              </strong>{" "}
              programados
            </span>
            <span>
              <strong className="text-[var(--color-text)]">
                {monthCounts.briefs}
              </strong>{" "}
              briefs
            </span>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 border-b border-[var(--color-border)]">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((cell) =>
              cell.day === 0 ? (
                <div
                  key={cell.key}
                  className="min-h-[110px] border-r border-b border-[var(--color-border-light)] bg-[var(--color-border-light)]/30"
                />
              ) : (
                <DayCell
                  key={cell.key}
                  day={cell.day}
                  isToday={cell.key === today}
                  articles={articlesByDay.get(cell.key) ?? []}
                  briefs={briefsByDay.get(cell.key) ?? []}
                  onReschedule={refresh}
                />
              )
            )}
          </div>
        </div>

        {/* Sidebar: backlog + legend */}
        <div className="space-y-6">
          <Backlog items={backlog} onScheduled={refresh} />
          <Legend />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Day cell                                                            */
/* ------------------------------------------------------------------ */

const MAX_VISIBLE = 3;

function DayCell({
  day,
  isToday,
  articles,
  briefs,
  onReschedule,
}: {
  day: number;
  isToday: boolean;
  articles: AdminArticle[];
  briefs: ScheduledPost[];
  onReschedule: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const items: React.ReactNode[] = [];
  for (const a of articles) {
    items.push(
      <ArticlePill key={`a-${a.ref}`} article={a} onReschedule={onReschedule} />
    );
  }
  for (const b of briefs) {
    items.push(<BriefPill key={`b-${b.id}`} brief={b} />);
  }

  const total = items.length;
  const visible = expanded ? items : items.slice(0, MAX_VISIBLE);
  const hidden = total - visible.length;

  return (
    <div
      className={`min-h-[110px] border-r border-b border-[var(--color-border-light)] p-1.5 flex flex-col gap-1 ${
        isToday ? "bg-amber-50/60" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-xs leading-none px-1 ${
            isToday
              ? "font-bold text-amber-700"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          {day}
        </span>
        {isToday && (
          <span className="text-[9px] uppercase font-semibold text-amber-700">
            Hoy
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {visible}
        {hidden > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-left text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-1"
          >
            +{hidden} más
          </button>
        )}
        {expanded && total > MAX_VISIBLE && (
          <button
            onClick={() => setExpanded(false)}
            className="text-left text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-1"
          >
            Ver menos
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Article pill (filled) — click opens edit / reschedule popover      */
/* ------------------------------------------------------------------ */

function ArticlePill({
  article,
  onReschedule,
}: {
  article: AdminArticle;
  onReschedule: () => void;
}) {
  const [open, setOpen] = useState(false);
  const color = SECTIONS[article.section].color;
  const isScheduled = article.status === "scheduled";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title={`${article.title} — ${STATUS_META[article.status].label}`}
        className="w-full flex items-center gap-1 rounded px-1.5 py-1 text-left text-white text-[10px] leading-tight hover:brightness-110 transition"
        style={{
          backgroundColor: color,
          boxShadow: isScheduled ? `0 0 0 2px ${STATUS_META.scheduled.color}` : undefined,
        }}
      >
        <span className="font-semibold uppercase tracking-wider opacity-90 shrink-0">
          {article.locale}
        </span>
        <span className="truncate flex-1">{article.title}</span>
      </button>

      {open && (
        <PillPopover onClose={() => setOpen(false)}>
          <div className="px-3 py-2 border-b border-[var(--color-border)]">
            <p className="text-xs font-semibold text-[var(--color-text)] line-clamp-2">
              {article.title}
            </p>
            <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
              {SECTIONS[article.section].name} · {article.locale.toUpperCase()} ·{" "}
              {STATUS_META[article.status].label}
            </p>
          </div>
          <div className="p-2 space-y-1.5">
            <Link
              href={`/admin/articles/edit/${article.ref}`}
              className="block w-full text-center px-3 py-1.5 rounded-lg bg-[#1A1D23] text-white text-xs font-medium hover:bg-[#13151A] transition-colors"
            >
              Editar
            </Link>
            <RescheduleField
              ref_={article.ref}
              currentDate={article.date}
              isDraft={article.draft}
              onDone={() => {
                setOpen(false);
                onReschedule();
              }}
            />
          </div>
        </PillPopover>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brief pill (dashed outline) — links to the editorial queue          */
/* ------------------------------------------------------------------ */

function BriefPill({ brief }: { brief: ScheduledPost }) {
  const color = SECTIONS[brief.section].color;
  const localeLabel =
    brief.locale === "both" ? "ES·EN" : brief.locale.toUpperCase();

  return (
    <Link
      href="/admin/queue"
      title={`Brief: ${brief.title}`}
      className="w-full flex items-center gap-1 rounded px-1.5 py-1 text-left text-[10px] leading-tight border border-dashed bg-white hover:bg-[var(--color-border-light)]/50 transition"
      style={{ color, borderColor: color }}
    >
      <span className="font-semibold uppercase tracking-wider opacity-90 shrink-0">
        {localeLabel}
      </span>
      <span className="truncate flex-1">{brief.title}</span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Reschedule field (date input → PATCH date)                          */
/* ------------------------------------------------------------------ */

function RescheduleField({
  ref_,
  currentDate,
  isDraft,
  onDone,
}: {
  ref_: string;
  currentDate: string;
  isDraft: boolean;
  onDone: () => void;
}) {
  const [date, setDate] = useState(currentDate || siteTodayStr());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!date) return;
    setSaving(true);
    setError(null);
    const frontmatter: Record<string, unknown> = { date };
    // Activating a draft when we give it a date.
    if (isDraft) frontmatter.draft = false;
    try {
      const res = await fetch(`/api/admin/content/${ref_}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ frontmatter }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Error al guardar");
      }
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Cambiar fecha
      </label>
      <div className="flex items-center gap-1.5">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={saving}
          className="flex-1 px-2 py-1 rounded-lg border border-[var(--color-border)] text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
        />
        <button
          onClick={save}
          disabled={saving || !date}
          className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-border-light)] disabled:opacity-60"
        >
          {saving ? "…" : "OK"}
        </button>
      </div>
      {error && <p className="text-[10px] text-red-600">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Backlog panel                                                       */
/* ------------------------------------------------------------------ */

function Backlog({
  items,
  onScheduled,
}: {
  items: AdminArticle[];
  onScheduled: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-[var(--color-border)]">
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          Backlog
        </h3>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">
          {items.length}
        </span>
      </div>
      <p className="px-4 pt-2 text-[11px] text-[var(--color-text-muted)]">
        Borradores escritos sin fecha. Asígnales un día para programarlos.
      </p>
      <div className="p-2 space-y-2 max-h-[420px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-[11px] text-[var(--color-text-muted)] text-center py-6">
            Sin borradores pendientes
          </p>
        ) : (
          items.map((a) => <BacklogItem key={a.ref} article={a} onScheduled={onScheduled} />)
        )}
      </div>
    </div>
  );
}

function BacklogItem({
  article,
  onScheduled,
}: {
  article: AdminArticle;
  onScheduled: () => void;
}) {
  const [open, setOpen] = useState(false);
  const color = SECTIONS[article.section].color;

  return (
    <div className="rounded-md border border-[var(--color-border)] p-2.5">
      <div className="flex items-start gap-2">
        <span
          className="mt-0.5 inline-block w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--color-text)] line-clamp-2 leading-snug">
            {article.title}
          </p>
          <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
            {SECTIONS[article.section].name} · {article.locale.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => setOpen((o) => !o)}
          className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] text-[11px] font-medium text-[var(--color-text)] hover:bg-[var(--color-border-light)]"
        >
          Programar
        </button>
        <Link
          href={`/admin/articles/edit/${article.ref}`}
          className="px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        >
          Editar
        </Link>
      </div>
      {open && (
        <div className="mt-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-border-light)]/40 p-2">
          <RescheduleField
            ref_={article.ref}
            currentDate=""
            isDraft={article.draft}
            onDone={() => {
              setOpen(false);
              onScheduled();
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Legend                                                              */
/* ------------------------------------------------------------------ */

function Legend() {
  return (
    <div className="bg-white rounded-lg border border-[var(--color-border)] p-4">
      <h3 className="text-sm font-semibold text-[var(--color-text)] mb-3">
        Leyenda
      </h3>

      <div className="space-y-2.5 text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-9 h-4 rounded"
            style={{ backgroundColor: SECTIONS.competencia.color }}
            aria-hidden
          />
          <span>Artículo (relleno = escrito)</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-9 h-4 rounded"
            style={{
              backgroundColor: SECTIONS.competencia.color,
              boxShadow: `0 0 0 2px ${STATUS_META.scheduled.color}`,
            }}
            aria-hidden
          />
          <span>
            Programado (anillo {""}
            <span style={{ color: STATUS_META.scheduled.color }}>ámbar</span> =
            fecha futura)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-9 h-4 rounded border border-dashed bg-white"
            style={{ borderColor: SECTIONS.competencia.color }}
            aria-hidden
          />
          <span>Brief planificado (contorno = de la cola)</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Secciones
        </p>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-[var(--color-text-muted)]">
          {(Object.keys(SECTIONS) as SectionId[]).map((id) => (
            <div key={id} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: SECTIONS[id].color }}
                aria-hidden
              />
              <span className="truncate">{SECTIONS[id].name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          Estados
        </p>
        <div className="space-y-1.5 text-xs text-[var(--color-text-muted)]">
          {(Object.keys(STATUS_META) as ArticleStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: STATUS_META[s].color }}
                aria-hidden
              />
              <span>{STATUS_META[s].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared popover for article pills (click-outside to close)           */
/* ------------------------------------------------------------------ */

function PillPopover({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      {/* Click-catcher: closes when clicking anywhere else. */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden />
      <div
        className="absolute left-0 top-full mt-1 z-50 w-56 bg-white rounded-lg border border-[var(--color-border)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dir === "left" ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
      />
    </svg>
  );
}
