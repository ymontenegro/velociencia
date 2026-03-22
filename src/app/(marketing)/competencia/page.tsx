import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SECTIONS } from "@/lib/constants";
import { getReadingTime } from "@/lib/utils";
import { ArticleGrid } from "@/components/articles/article-grid";

const section = SECTIONS.competencia;

export const metadata = {
  title: section.name,
  description: section.description,
};

export default function CompetenciaPage() {
  const contentDir = path.join(process.cwd(), "content", "competencia");
  const files = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"))
    : [];

  const articles = files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        readingTime: getReadingTime(content),
        section: "competencia" as const,
        coverImage: data.coverImage,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div>
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-competencia-dark) 0%, var(--color-competencia) 50%, var(--color-competencia-light) 100%)`,
        }}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="animate-fade-in-up relative z-10">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              Sección
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {section.name}
            </h1>
            <div className="mt-4 h-[2px] w-16 bg-white/40" />
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ArticleGrid articles={articles} />
      </div>
    </div>
  );
}
