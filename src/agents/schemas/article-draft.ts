import { z } from "zod";

export const ArticleDraftSchema = z.object({
  content: z
    .string()
    .describe(
      "El artículo completo en formato Markdown, sin frontmatter. DEBE estar escrito en párrafos de prosa continua (3-5 oraciones cada uno), con encabezados ##/### y tablas cuando corresponda. NUNCA usar listas con viñetas ni bullet points. Cada párrafo abre con un dato o gancho informativo. Citar fuentes dentro de los párrafos de forma natural."
    ),
  metadata: z.object({
    title: z.string().describe("Título del artículo"),
    subtitle: z
      .string()
      .describe("Subtítulo descriptivo del artículo"),
    excerpt: z
      .string()
      .describe(
        "Extracto de 1-2 oraciones para usar como descripción en listados"
      ),
    tags: z
      .array(z.string())
      .describe("5-10 etiquetas relevantes para el artículo"),
    metaTitle: z
      .string()
      .describe("Título optimizado para SEO (máximo 60 caracteres)"),
    metaDescription: z
      .string()
      .describe("Meta descripción para SEO (máximo 160 caracteres)"),
    imageSearchQueries: z
      .array(z.string())
      .describe("2-3 queries de búsqueda para encontrar imágenes relevantes en Unsplash/Pexels (ej: 'cyclist mountain road', 'cycling nutrition energy gel')"),
  }),
});

export type ArticleDraft = z.infer<typeof ArticleDraftSchema>;
