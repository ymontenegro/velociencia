import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SECTIONS } from "@/lib/constants";
import { formatDate, getReadingTime } from "@/lib/utils";

const section = SECTIONS.ciencia;
const CONTENT_DIR = path.join(process.cwd(), "content", "ciencia");

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return {};

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter } = matter(fileContent);

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  };
}

export default async function CienciaArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const readingTime = getReadingTime(content);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeKatex,
        ],
      },
    },
  });

  const sources = (frontmatter.sources as { title: string; url: string; type: string }[]) || [];

  return (
    <article>
      {/* Breadcrumb - above hero */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--color-text)]">
            Inicio
          </Link>
          <span className="text-[var(--color-border)]">/</span>
          <Link
            href={`/${section.slug}`}
            className="transition-colors hover:text-[var(--color-text)]"
            style={{ color: section.color }}
          >
            {section.name}
          </Link>
        </nav>
      </div>

      {/* Hero gradient area */}
      <div
        className="relative mt-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-ciencia-dark) 0%, var(--color-ciencia) 50%, var(--color-ciencia-light) 100%)`,
          minHeight: "40vh",
        }}
      >
        {/* Decorative light circles */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

        {/* Cover image */}
        {frontmatter.coverImage && (
          <img src={frontmatter.coverImage} alt={frontmatter.title} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Section badge */}
          <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            {section.name}
          </span>

          {/* Title */}
          <h1 className="animate-fade-in-up mt-5 font-serif text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl xl:text-6xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            {frontmatter.title}
          </h1>

          {/* Subtitle */}
          {frontmatter.subtitle && (
            <p className="animate-fade-in-up stagger-1 mt-4 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              {frontmatter.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="animate-fade-in-up stagger-2 mt-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60">
            {frontmatter.date && <time>{formatDate(frontmatter.date)}</time>}
            <span>&middot;</span>
            <span>{readingTime} min de lectura</span>
            {frontmatter.author && (
              <>
                <span>&middot;</span>
                <span>Por {frontmatter.author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-[68ch] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className={`prose prose-lg prose-ciencia`}>
          {mdxContent}
        </div>
      </div>

      {/* Sources / Referencias */}
      {sources.length > 0 && (
        <div className="mx-auto max-w-[68ch] px-4 pb-8 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold text-[var(--color-text)]">
              Referencias
            </h2>
            <div className="mt-1 h-[2px] w-10" style={{ backgroundColor: section.color }} />
            <ol className="mt-5 space-y-3">
              {sources.map((source, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: section.color }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-secondary)] underline underline-offset-2 transition-colors hover:text-[var(--color-text)]"
                    >
                      {source.title}
                    </a>
                    {source.type && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `var(--color-ciencia-light)`,
                          color: `var(--color-ciencia-dark)`,
                        }}
                      >
                        {source.type}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {/* Back link */}
      <div className="mx-auto max-w-[68ch] px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          href={`/${section.slug}`}
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: section.color }}
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Volver a {section.name}
        </Link>
      </div>
    </article>
  );
}
