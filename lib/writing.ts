import { siteConfig } from "@/content/site";

export type WritingPost = {
  title: string;
  href: string;
  brief: string;
  publishedAt: string;
  dateLabel: string;
};

const REVALIDATE_SECONDS = 3600;
const FEED_URL = `${siteConfig.writing.href.replace(/\/$/, "")}/rss.xml`;

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function inner(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function formatDate(rfc822: string): string {
  const date = new Date(rfc822);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function getWritingPosts(limit = 4): Promise<WritingPost[]> {
  try {
    const response = await fetch(FEED_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
        "User-Agent": "nawazish.site (portfolio writing section)",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(
      (match) => match[1],
    );
    const posts: WritingPost[] = [];
    const seen = new Set<string>();

    for (const item of items) {
      const title = inner(item, "title");
      const href = inner(item, "link");
      if (!title || !href) continue;

      // Hashnode keeps re-published drafts in the feed, so the same article can
      // appear twice under a longer title ("… (Without Making Your Brain Hurt)").
      // Treat one normalised title as a duplicate when it prefixes another.
      const key = normalizeTitle(title);
      if ([...seen].some((other) => other.startsWith(key) || key.startsWith(other))) {
        continue;
      }
      seen.add(key);

      const publishedAt = inner(item, "pubDate");
      const brief = inner(item, "description").replace(/\s+/g, " ").trim();

      posts.push({
        title,
        href,
        brief,
        publishedAt,
        dateLabel: formatDate(publishedAt),
      });

      if (posts.length >= limit) break;
    }

    return posts;
  } catch {
    return [];
  }
}
