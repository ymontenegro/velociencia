const S2_BASE = "https://api.semanticscholar.org/graph/v1";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScholarPaper {
  paperId: string;
  title: string;
  abstract: string | null;
  authors: string[];
  year: number | null;
  citationCount: number;
  url: string;
  doi: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  const apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY;
  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }
  return headers;
}

// ---------------------------------------------------------------------------
// searchPapers – Search Semantic Scholar papers
// ---------------------------------------------------------------------------

export async function searchPapers(
  query: string,
  limit: number = 10
): Promise<ScholarPaper[]> {
  const fields =
    "title,abstract,authors,year,citationCount,url,externalIds";
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    fields,
  });

  const res = await fetch(`${S2_BASE}/paper/search?${params}`, {
    headers: buildHeaders(),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(
      `Semantic Scholar search failed: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  const papers: unknown[] = data?.data ?? [];

  return papers.map((raw) => {
    const p = raw as Record<string, unknown>;
    const authors = Array.isArray(p.authors)
      ? (p.authors as Array<{ name?: string }>).map((a) => a.name ?? "")
      : [];
    const externalIds = (p.externalIds ?? {}) as Record<string, string>;

    return {
      paperId: String(p.paperId ?? ""),
      title: String(p.title ?? ""),
      abstract: p.abstract ? String(p.abstract) : null,
      authors,
      year: typeof p.year === "number" ? p.year : null,
      citationCount: typeof p.citationCount === "number" ? p.citationCount : 0,
      url: String(p.url ?? `https://www.semanticscholar.org/paper/${p.paperId}`),
      doi: externalIds.DOI ?? null,
    };
  });
}

// ---------------------------------------------------------------------------
// searchCyclingPapers – Pre-built queries per section
// ---------------------------------------------------------------------------

const SECTION_QUERIES: Record<string, string> = {
  nutricion:
    "cycling nutrition endurance fueling hydration supplementation",
  ciencia:
    "cycling physiology aerobic capacity power output biomechanics",
  entrenamiento:
    "cycling training periodization interval training performance optimization",
};

export async function searchCyclingPapers(
  section: string
): Promise<ScholarPaper[]> {
  const query = SECTION_QUERIES[section];
  if (!query) {
    throw new Error(
      `Unknown section "${section}". Expected one of: ${Object.keys(SECTION_QUERIES).join(", ")}`
    );
  }
  return searchPapers(query, 10);
}
