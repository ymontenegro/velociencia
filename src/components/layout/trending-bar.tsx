import Link from "next/link";
import { getAllArticles } from "@/lib/markdown";
import { SECTIONS, type SectionId } from "@/lib/constants";

export async function TrendingBar() {
  const articles = getAllArticles().slice(0, 5);

  if (articles.length === 0) return null;

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8 overflow-x-auto">
        <span className="shrink-0 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--color-text)]">
          Lo último
        </span>
        <span className="h-3 w-px shrink-0 bg-[var(--color-border)]" aria-hidden="true" />
        <div className="flex items-center gap-4 overflow-x-auto">
          {articles.map((article, i) => {
            const section = SECTIONS[article.section as SectionId];
            return (
              <Link
                key={`${article.section}-${article.slug}`}
                href={`/${article.section}/${article.slug}`}
                className="group shrink-0 flex items-center gap-2 text-[11px] leading-tight text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)]"
              >
                <span
                  className="inline-flex items-center gap-1 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: section.color }}
                >
                  {section.name}
                </span>
                <span className="whitespace-nowrap tracking-wide uppercase">
                  {article.title.length > 50
                    ? `${article.title.slice(0, 50)}…`
                    : article.title}
                </span>
                {i < articles.length - 1 && (
                  <span className="ml-2 h-3 w-px shrink-0 bg-[var(--color-border-light)]" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
