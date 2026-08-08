"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { cn } from "@/lib/utils";

type Day = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

const months = [
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
];

function levelFromCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function buildPlaceholderDays(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const seed =
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const noise = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
    const abs = Math.abs(noise);
    const count =
      abs > 0.72 ? Math.floor(abs * 12) : abs > 0.55 ? Math.floor(abs * 4) : 0;
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: levelFromCount(count),
    });
  }
  return days;
}

const levelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-neutral-100 dark:bg-neutral-800/80",
  1: "bg-emerald-200 dark:bg-emerald-900",
  2: "bg-emerald-300 dark:bg-emerald-700",
  3: "bg-emerald-500 dark:bg-emerald-500",
  4: "bg-emerald-600 dark:bg-emerald-300",
};

/**
 * Sam pattern: title + calendar in ONE band (no HRule between them).
 */
export function GitHubActivity() {
  const [days, setDays] = useState<Day[]>(() => buildPlaceholderDays());
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${siteConfig.githubUsername}?y=last`,
        );
        if (!res.ok) throw new Error("failed");
        const data = (await res.json()) as {
          contributions: { date: string; count: number; level: number }[];
          total: Record<string, number>;
        };
        if (cancelled) return;
        const mapped: Day[] = data.contributions.map((c) => ({
          date: c.date,
          count: c.count,
          level: Math.min(4, Math.max(0, c.level)) as 0 | 1 | 2 | 3 | 4,
        }));
        const recent = mapped.slice(-365);
        setDays(recent.length ? recent : buildPlaceholderDays());
        const yearTotals = Object.values(data.total ?? {});
        setTotal(
          yearTotals.length
            ? yearTotals.reduce((a, b) => a + b, 0)
            : recent.reduce((a, b) => a + b.count, 0),
        );
        setLoaded(true);
      } catch {
        if (cancelled) return;
        const placeholder = buildPlaceholderDays();
        setDays(placeholder);
        setTotal(placeholder.reduce((a, b) => a + b.count, 0));
        setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Mobile: last ~20 weeks so the grid fits without awkward empty space
  const mobileWeeks = weeks.slice(-20);
  const desktopWeeks = weeks;

  const mobileMonthLabels = (() => {
    const labels: string[] = [];
    const seen = new Set<string>();
    for (const week of mobileWeeks) {
      const d = week[0]?.date;
      if (!d) continue;
      const m = months[new Date(d + "T12:00:00").getMonth()];
      if (!seen.has(m)) {
        seen.add(m);
        labels.push(m);
      }
    }
    return labels;
  })();

  return (
    <Reveal>
      <FramePad className="pt-6 pb-6 sm:pt-9 sm:pb-10">
        <h2 className="section-title">GitHub Activity</h2>

        {/* Mobile heatmap — fits width, no horizontal scroll */}
        <div className="mt-4 sm:hidden">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted-soft">
            {mobileMonthLabels.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="flex w-full justify-between gap-[2px]">
            {mobileWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-1 flex-col gap-[2px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className={cn(
                      "aspect-square w-full rounded-[2px]",
                      levelClass[day.level],
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop heatmap — full year */}
        <div className="mt-5 hidden sm:block">
          <div className="flex items-center gap-1 overflow-hidden font-mono text-[10px] text-muted-soft">
            {months.map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
          <div className="mt-2 overflow-x-auto pb-2">
            <div className="flex min-w-max gap-[3px]">
              {desktopWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.count} contributions`}
                      className={cn(
                        "size-[11px] rounded-[2px]",
                        levelClass[day.level],
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-soft sm:text-xs">
          <span>
            {loaded && total > 0
              ? `${total.toLocaleString()} contributions in the last year`
              : "Loading…"}
          </span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <span
                key={l}
                className={cn("size-2.5 rounded-[2px]", levelClass[l])}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </FramePad>
    </Reveal>
  );
}

export const GitHubBody = GitHubActivity;
