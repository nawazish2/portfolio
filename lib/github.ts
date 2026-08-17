import { siteConfig } from "@/content/site";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type GitHubRecentItem = {
  id: string;
  label: string;
  href: string;
  at: string;
  ago: string;
};

export type WeekColumn = {
  key: string;
  days: Array<ContributionDay | null>;
  monthLabel: string | null;
};

export type GitHubActivityData = {
  username: string;
  profileUrl: string;
  total: number;
  from: string;
  to: string;
  days: ContributionDay[];
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  lastContribution: string | null;
  publicRepos: number;
  followers: number;
  recent: GitHubRecentItem[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const GITHUB_HTML_HEADERS = {
  Accept: "text/html",
  "User-Agent": "nawazish.site (portfolio contribution graph)",
  "x-requested-with": "XMLHttpRequest",
} as const;

const REVALIDATE_SECONDS = 3600;

type GitHubUser = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GitHubEvent = {
  id: string;
  type: string | null;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref?: string | null;
    ref_type?: string;
    size?: number;
    distinct_size?: number;
    release?: { tag_name?: string; html_url?: string };
    pull_request?: {
      html_url?: string;
      merged?: boolean;
      number?: number;
    };
    issue?: { html_url?: string; number?: number };
  };
};

type JogruberResponse = {
  total?: Record<string, number>;
  contributions?: Array<{ date: string; count: number; level: number }>;
};

function githubApiHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "nawazish.site",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function attr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match?.[1];
}

function asLevel(value: number): ContributionLevel {
  if (value <= 0) return 0;
  if (value === 1) return 1;
  if (value === 2) return 2;
  if (value === 3) return 3;
  return 4;
}

function parseTooltipCount(text: string, level: number): number {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized || /^no contributions/i.test(normalized)) {
    return 0;
  }

  const match = /^(\d+)/.exec(normalized);
  if (match) {
    return Number.parseInt(match[1], 10);
  }

  if (level === 0) {
    return 0;
  }

  throw new Error(`Unable to parse contribution count from "${normalized}"`);
}

function parseHeadingTotal(html: string): number | null {
  const heading = html.match(
    /id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i,
  );
  if (!heading) {
    return null;
  }

  const number = heading[1].replace(/\s+/g, " ").match(/[\d,]+/);
  if (!number) {
    return null;
  }

  return Number.parseInt(number[0].replace(/,/g, ""), 10);
}

export function parseContributionCalendar(html: string): {
  total: number;
  days: ContributionDay[];
} {
  const tooltips = new Map<string, string>();
  const tooltipRe = /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi;
  let tooltipMatch = tooltipRe.exec(html);
  while (tooltipMatch) {
    const id = attr(tooltipMatch[1], "for");
    if (id) {
      tooltips.set(id, tooltipMatch[2]);
    }
    tooltipMatch = tooltipRe.exec(html);
  }

  const days: ContributionDay[] = [];
  const cellRe = /<td\b[^>]*\bContributionCalendar-day\b[^>]*>/gi;
  let cellMatch = cellRe.exec(html);
  while (cellMatch) {
    const tag = cellMatch[0];
    const date = attr(tag, "data-date");
    const levelRaw = attr(tag, "data-level");
    const id = attr(tag, "id");
    if (!date || levelRaw === undefined || !id) {
      throw new Error("Contribution calendar cell is missing required attributes");
    }

    const level = asLevel(Number.parseInt(levelRaw, 10));
    const count = parseTooltipCount(tooltips.get(id) ?? "", level);
    days.push({ date, count, level });
    cellMatch = cellRe.exec(html);
  }

  days.sort((a, b) => a.date.localeCompare(b.date));

  if (days.length < 350) {
    throw new Error(`Contribution calendar is incomplete (${days.length} days)`);
  }

  const summed = days.reduce((sum, day) => sum + day.count, 0);
  const headingTotal = parseHeadingTotal(html);
  const total = headingTotal ?? summed;

  return { total, days };
}

function utcWeekday(isoDate: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    throw new Error(`Invalid contribution date ${isoDate}`);
  }

  return new Date(
    Date.UTC(
      Number.parseInt(match[1], 10),
      Number.parseInt(match[2], 10) - 1,
      Number.parseInt(match[3], 10),
    ),
  ).getUTCDay();
}

export function toWeekColumns(days: ContributionDay[]): WeekColumn[] {
  if (days.length === 0) {
    return [];
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const padded: Array<ContributionDay | null> = [];
  const leadingEmpty = utcWeekday(sorted[0].date);
  for (let i = 0; i < leadingEmpty; i += 1) {
    padded.push(null);
  }
  padded.push(...sorted);

  const columns: WeekColumn[] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const slice: Array<ContributionDay | null> = padded.slice(i, i + 7);
    while (slice.length < 7) {
      slice.push(null);
    }
    const firstReal = slice.find((day) => day !== null);
    columns.push({
      key: firstReal?.date ?? `week-${String(i)}`,
      days: slice,
      monthLabel: null,
    });
  }

  return applyMonthLabels(columns);
}

export function applyMonthLabels(weeks: WeekColumn[]): WeekColumn[] {
  let previousMonth: string | null = null;

  return weeks.map((week) => {
    const firstReal = week.days.find((day) => day !== null);
    if (!firstReal) {
      return { ...week, monthLabel: null };
    }

    const monthKey = firstReal.date.slice(0, 7);
    if (monthKey === previousMonth) {
      return { ...week, monthLabel: null };
    }

    previousMonth = monthKey;
    const monthIndex = Number.parseInt(firstReal.date.slice(5, 7), 10) - 1;
    return {
      ...week,
      monthLabel: MONTHS[monthIndex] ?? null,
    };
  });
}

function computeStreaks(days: ContributionDay[]): {
  currentStreak: number;
  longestStreak: number;
  lastContribution: string | null;
} {
  let longestStreak = 0;
  let run = 0;
  let lastContribution: string | null = null;

  for (const day of days) {
    if (day.count > 0) {
      run += 1;
      longestStreak = Math.max(longestStreak, run);
      lastContribution = day.date;
    } else {
      run = 0;
    }
  }

  let index = days.length - 1;
  if (index >= 0 && days[index]?.count === 0) {
    index -= 1;
  }

  let currentStreak = 0;
  while (index >= 0 && (days[index]?.count ?? 0) > 0) {
    currentStreak += 1;
    index -= 1;
  }

  return { currentStreak, longestStreak, lastContribution };
}

function formatAgo(iso: string, nowMs: number): string {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) {
    return "";
  }

  const seconds = Math.max(0, Math.floor((nowMs - then) / 1000));
  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${String(minutes)}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${String(hours)}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${String(days)}d ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${String(months)}mo ago`;
  }

  return `${String(Math.floor(months / 12))}y ago`;
}

function repoHref(repoName: string): string {
  return `https://github.com/${repoName}`;
}

function describeEvent(
  event: GitHubEvent,
  nowMs: number,
): GitHubRecentItem | null {
  const repoName = event.repo.name;
  const ago = formatAgo(event.created_at, nowMs);

  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload.distinct_size ?? event.payload.size ?? 1;
      return {
        id: event.id,
        label: `Pushed ${String(commits)} ${commits === 1 ? "commit" : "commits"} to ${repoName}`,
        href: repoHref(repoName),
        at: event.created_at,
        ago,
      };
    }
    case "CreateEvent": {
      if (event.payload.ref_type === "repository") {
        return {
          id: event.id,
          label: `Created ${repoName}`,
          href: repoHref(repoName),
          at: event.created_at,
          ago,
        };
      }
      if (event.payload.ref_type === "tag" && event.payload.ref) {
        return {
          id: event.id,
          label: `Tagged ${event.payload.ref} on ${repoName}`,
          href: repoHref(repoName),
          at: event.created_at,
          ago,
        };
      }
      return null;
    }
    case "ReleaseEvent": {
      const tag = event.payload.release?.tag_name ?? "a release";
      return {
        id: event.id,
        label: `Released ${tag} of ${repoName}`,
        href: event.payload.release?.html_url ?? repoHref(repoName),
        at: event.created_at,
        ago,
      };
    }
    case "PullRequestEvent": {
      const action = event.payload.action;
      const href = event.payload.pull_request?.html_url ?? repoHref(repoName);
      if (action === "opened") {
        return {
          id: event.id,
          label: `Opened a pull request on ${repoName}`,
          href,
          at: event.created_at,
          ago,
        };
      }
      if (action === "closed" && event.payload.pull_request?.merged) {
        return {
          id: event.id,
          label: `Merged a pull request on ${repoName}`,
          href,
          at: event.created_at,
          ago,
        };
      }
      return null;
    }
    case "WatchEvent":
      return {
        id: event.id,
        label: `Starred ${repoName}`,
        href: repoHref(repoName),
        at: event.created_at,
        ago,
      };
    case "ForkEvent":
      return {
        id: event.id,
        label: `Forked ${repoName}`,
        href: repoHref(repoName),
        at: event.created_at,
        ago,
      };
    case "IssuesEvent": {
      if (event.payload.action !== "opened") {
        return null;
      }
      return {
        id: event.id,
        label: `Opened an issue on ${repoName}`,
        href: event.payload.issue?.html_url ?? repoHref(repoName),
        at: event.created_at,
        ago,
      };
    }
    default:
      return null;
  }
}

function uniqueRecent(events: GitHubEvent[], nowMs: number): GitHubRecentItem[] {
  const recent: GitHubRecentItem[] = [];
  const seen = new Set<string>();

  for (const event of events) {
    const item = describeEvent(event, nowMs);
    if (!item || seen.has(item.label)) {
      continue;
    }
    seen.add(item.label);
    recent.push(item);
    if (recent.length === 4) {
      break;
    }
  }

  return recent;
}

async function fetchJson<T>(url: string, headers: HeadersInit): Promise<T> {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(10_000),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`${url} failed with ${String(response.status)}`);
  }

  return (await response.json()) as T;
}

async function fetchContributionHtml(username: string): Promise<string> {
  const response = await fetch(
    `https://github.com/users/${username}/contributions`,
    {
      headers: {
        ...GITHUB_HTML_HEADERS,
        Referer: `https://github.com/${username}`,
      },
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub contributions page failed with ${String(response.status)}`);
  }

  return response.text();
}

function fromJogruber(payload: JogruberResponse): {
  total: number;
  days: ContributionDay[];
} {
  const contributions = payload.contributions ?? [];
  if (contributions.length < 350) {
    throw new Error("Fallback contribution calendar is incomplete");
  }

  const days = contributions
    .map((day) => ({
      date: day.date,
      count: day.count,
      level: asLevel(day.level),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const summed = days.reduce((sum, day) => sum + day.count, 0);
  const lastYear = payload.total?.lastYear;
  const total = typeof lastYear === "number" ? lastYear : summed;

  return { total, days };
}

async function fetchCalendar(username: string): Promise<{
  total: number;
  days: ContributionDay[];
}> {
  try {
    const html = await fetchContributionHtml(username);
    return parseContributionCalendar(html);
  } catch (error) {
    console.error("GitHub contribution scrape failed, using fallback API", error);
    const payload = await fetchJson<JogruberResponse>(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { Accept: "application/json" },
    );
    return fromJogruber(payload);
  }
}

export async function getGitHubActivity(
  username = siteConfig.githubUsername,
): Promise<GitHubActivityData | null> {
  try {
    const nowMs = Date.now();
    const [calendar, user, events] = await Promise.all([
      fetchCalendar(username),
      fetchJson<GitHubUser>(`https://api.github.com/users/${username}`, githubApiHeaders()).catch(
        () => null,
      ),
      fetchJson<GitHubEvent[]>(
        `https://api.github.com/users/${username}/events/public?per_page=30`,
        githubApiHeaders(),
      ).catch((): GitHubEvent[] => []),
    ]);

    const streaks = computeStreaks(calendar.days);

    return {
      username,
      profileUrl: user?.html_url ?? `https://github.com/${username}`,
      total: calendar.total,
      from: calendar.days[0]?.date ?? "",
      to: calendar.days[calendar.days.length - 1]?.date ?? "",
      days: calendar.days,
      activeDays: calendar.days.filter((day) => day.count > 0).length,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
      lastContribution: streaks.lastContribution,
      publicRepos: user?.public_repos ?? 0,
      followers: user?.followers ?? 0,
      recent: uniqueRecent(events, nowMs),
    };
  } catch (error) {
    console.error("GitHub activity failed", error);
    return null;
  }
}
