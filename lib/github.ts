import { siteConfig } from "@/content/site";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
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
  days: ContributionDay[];
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

type JogruberResponse = {
  total?: Record<string, number>;
  contributions?: Array<{ date: string; count: number; level: number }>;
};

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

async function fetchJson<T>(url: string, headers: HeadersInit): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`${url} responded ${String(response.status)}`);
  }

  return (await response.json()) as T;
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
    const calendar = await fetchCalendar(username);

    return {
      username,
      profileUrl: `https://github.com/${username}`,
      total: calendar.total,
      days: calendar.days,
    };
  } catch (error) {
    console.error("GitHub activity failed", error);
    return null;
  }
}
