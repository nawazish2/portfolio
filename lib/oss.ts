const REVALIDATE_SECONDS = 3600;

const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "nawazishkhan.in (portfolio oss stars)",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

/** Star counts for upstream repos. Returns null per repo on any failure. */
export async function getOssStars(
  repos: string[],
): Promise<Record<string, number | null>> {
  const entries = await Promise.all(
    repos.map(async (repo): Promise<[string, number | null]> => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: HEADERS,
          signal: AbortSignal.timeout(10_000),
          next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!response.ok) return [repo, null];
        const data = (await response.json()) as { stargazers_count?: number };
        return [
          repo,
          typeof data.stargazers_count === "number"
            ? data.stargazers_count
            : null,
        ];
      } catch {
        return [repo, null];
      }
    }),
  );
  return Object.fromEntries(entries);
}

/** 1234 -> "1.2k", 89 -> "89" */
export function formatStars(count: number): string {
  if (count >= 1000) {
    const trimmed = (count / 1000).toFixed(1).replace(/\.0$/, "");
    return `${trimmed}k`;
  }
  return String(count);
}
