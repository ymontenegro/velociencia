const PUBMED_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  pubDate: string;
  doi: string | null;
  url: string;
}

// ---------------------------------------------------------------------------
// Rate limiter – max 3 requests/second without API key
// ---------------------------------------------------------------------------

let lastRequestTime = 0;
const MIN_INTERVAL_MS = 334; // ~3 req/s

async function rateLimitedFetch(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_INTERVAL_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_INTERVAL_MS - elapsed)
    );
  }
  lastRequestTime = Date.now();
  return fetch(url, { ...init, signal: AbortSignal.timeout(15_000) });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildParams(extra: Record<string, string>): URLSearchParams {
  const params = new URLSearchParams({ retmode: "json", ...extra });
  const apiKey = process.env.PUBMED_API_KEY;
  if (apiKey) {
    params.set("api_key", apiKey);
  }
  return params;
}

// ---------------------------------------------------------------------------
// searchPubMed – Search and retrieve article summaries
// ---------------------------------------------------------------------------

export async function searchPubMed(
  query: string,
  maxResults: number = 10
): Promise<PubMedArticle[]> {
  // Step 1: esearch to get PMIDs
  const searchParams = buildParams({
    db: "pubmed",
    term: query,
    retmax: String(maxResults),
    sort: "relevance",
  });

  const searchRes = await rateLimitedFetch(
    `${PUBMED_BASE}/esearch.fcgi?${searchParams}`
  );

  if (!searchRes.ok) {
    throw new Error(
      `PubMed esearch failed: ${searchRes.status} ${searchRes.statusText}`
    );
  }

  const searchData = await searchRes.json();
  const pmids: string[] = searchData?.esearchresult?.idlist ?? [];

  if (pmids.length === 0) {
    return [];
  }

  // Step 2: esummary to get article details
  const summaryParams = buildParams({
    db: "pubmed",
    id: pmids.join(","),
  });

  const summaryRes = await rateLimitedFetch(
    `${PUBMED_BASE}/esummary.fcgi?${summaryParams}`
  );

  if (!summaryRes.ok) {
    throw new Error(
      `PubMed esummary failed: ${summaryRes.status} ${summaryRes.statusText}`
    );
  }

  const summaryData = await summaryRes.json();
  const results: Record<string, unknown> = summaryData?.result ?? {};

  return pmids
    .filter((id) => results[id])
    .map((id) => {
      const article = results[id] as Record<string, unknown>;
      const authors = Array.isArray(article.authors)
        ? (article.authors as Array<{ name?: string }>).map(
            (a) => a.name ?? ""
          )
        : [];
      const articleIds = Array.isArray(article.articleids)
        ? (article.articleids as Array<{ idtype?: string; value?: string }>)
        : [];
      const doiEntry = articleIds.find((aid) => aid.idtype === "doi");

      return {
        pmid: id,
        title: String(article.title ?? ""),
        authors,
        journal: String(article.fulljournalname ?? article.source ?? ""),
        pubDate: String(article.pubdate ?? ""),
        doi: doiEntry?.value ?? null,
        url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      };
    });
}

// ---------------------------------------------------------------------------
// fetchAbstract – Get abstract text for a single PMID
// ---------------------------------------------------------------------------

export async function fetchAbstract(pmid: string): Promise<string> {
  const params = buildParams({
    db: "pubmed",
    id: pmid,
    rettype: "abstract",
    retmode: "text",
  });

  // For efetch with text retmode, override retmode in params
  params.set("retmode", "text");

  const res = await rateLimitedFetch(
    `${PUBMED_BASE}/efetch.fcgi?${params}`
  );

  if (!res.ok) {
    throw new Error(
      `PubMed efetch failed: ${res.status} ${res.statusText}`
    );
  }

  return res.text();
}

// ---------------------------------------------------------------------------
// searchCyclingPapers – Pre-built queries per section
// ---------------------------------------------------------------------------

const SECTION_QUERIES: Record<string, string> = {
  nutricion:
    '("cycling nutrition" OR "endurance nutrition" OR "sport hydration" OR "carbohydrate loading cycling")',
  ciencia:
    '("cycling physiology" OR "VO2max cycling" OR "lactate threshold" OR "power output cycling")',
  entrenamiento:
    '("cycling training" OR "periodization endurance" OR "HIIT cycling" OR "polarized training")',
};

export async function searchCyclingPapers(
  section: string
): Promise<PubMedArticle[]> {
  const query = SECTION_QUERIES[section];
  if (!query) {
    throw new Error(
      `Unknown section "${section}". Expected one of: ${Object.keys(SECTION_QUERIES).join(", ")}`
    );
  }
  return searchPubMed(query, 10);
}
