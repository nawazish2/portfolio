import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { cn } from "@/lib/utils";
import {
  applyMonthLabels,
  getGitHubActivity,
  toWeekColumns,
  type ContributionDay,
  type ContributionLevel,
  type GitHubActivityData,
  type WeekColumn,
} from "@/lib/github";

const levelClass: Record<ContributionLevel, string> = {
  0: "bg-neutral-100 dark:bg-neutral-800/80",
  1: "bg-emerald-200 dark:bg-emerald-900",
  2: "bg-emerald-300 dark:bg-emerald-700",
  3: "bg-emerald-500 dark:bg-emerald-500",
  4: "bg-emerald-600 dark:bg-emerald-300",
};

const weekdayLabels = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

function dayTitle(day: ContributionDay): string {
  const when = new Date(`${day.date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  if (day.count === 0) {
    return `No contributions on ${when}`;
  }

  const noun = day.count === 1 ? "contribution" : "contributions";
  return `${day.count.toLocaleString()} ${noun} on ${when}`;
}

function HeatmapCell({
  day,
  className,
}: {
  day: ContributionDay | null;
  className: string;
}) {
  if (!day) {
    return <div className={cn(className, "bg-transparent")} />;
  }

  return (
    <div
      title={dayTitle(day)}
      aria-label={dayTitle(day)}
      className={cn(className, levelClass[day.level])}
    />
  );
}

function Heatmap({
  weeks,
  compact,
}: {
  weeks: WeekColumn[];
  compact?: boolean;
}) {
  return (
    <div className={cn("flex", compact ? "w-full gap-[2px]" : "min-w-max gap-[3px]")}>
      {weeks.map((week) => (
        <div
          key={week.key}
          className={cn(
            "flex flex-col",
            compact ? "min-w-0 flex-1 gap-[2px]" : "w-[11px] gap-[3px]",
          )}
        >
          <div className="relative h-4">
            {week.monthLabel ? (
              <span className="absolute top-0 left-0 font-mono text-[10px] whitespace-nowrap text-muted-soft">
                {week.monthLabel}
              </span>
            ) : null}
          </div>
          {week.days.map((day, index) => (
            <HeatmapCell
              key={day?.date ?? `${week.key}-${String(index)}`}
              day={day}
              className={cn(
                "rounded-[2px]",
                compact ? "aspect-square w-full" : "size-[11px]",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Stats({ activity }: { activity: GitHubActivityData }) {
  const items = [
    `${activity.activeDays} active days`,
    activity.currentStreak > 0
      ? `${activity.currentStreak}-day streak`
      : `Longest streak ${activity.longestStreak} ${activity.longestStreak === 1 ? "day" : "days"}`,
    activity.publicRepos > 0 ? `${activity.publicRepos} public repos` : null,
    activity.followers > 0 ? `${activity.followers} followers` : null,
  ].filter((item): item is string => item !== null);

  return (
    <p className="mt-2 text-[10px] text-muted-soft sm:text-xs">{items.join(" · ")}</p>
  );
}

export async function GitHubActivity() {
  const activity = await getGitHubActivity(siteConfig.githubUsername);
  const weeks = activity ? toWeekColumns(activity.days) : [];
  const mobileWeeks = applyMonthLabels(weeks.slice(-20));

  return (
    <Reveal>
      <FramePad className="pt-6 pb-6 sm:pt-9 sm:pb-10">
        <div className="flex items-end justify-between gap-3">
          <h2 className="section-title">GitHub Activity</h2>
          <a
            href={activity?.profileUrl ?? siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-0.5 inline-flex items-center gap-1 text-xs text-muted transition hover:text-foreground sm:text-sm"
          >
            @{siteConfig.githubUsername}
            <ArrowUpRight size={14} />
          </a>
        </div>

        {!activity || weeks.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Live contribution data could not be loaded.{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/30 underline-offset-2 hover:text-foreground"
            >
              View GitHub profile
            </a>
          </p>
        ) : (
          <>
            <div className="mt-4 sm:hidden">
              <Heatmap weeks={mobileWeeks} compact />
            </div>

            <div className="mt-5 hidden sm:block">
              <div className="flex gap-2">
                <div className="flex w-7 shrink-0 flex-col gap-[3px]">
                  <div className="h-4" />
                  {weekdayLabels.map((label, index) => (
                    <span
                      key={`wd-${String(index)}`}
                      className="h-[11px] font-mono text-[10px] leading-[11px] text-muted-soft"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="min-w-0 flex-1 overflow-x-auto pb-1">
                  <Heatmap weeks={weeks} />
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-soft sm:text-xs">
              <span>
                {activity.total.toLocaleString()} contributions in the last year
              </span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {([0, 1, 2, 3, 4] as const).map((level) => (
                  <span
                    key={level}
                    className={cn("size-2.5 rounded-[2px]", levelClass[level])}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            <Stats activity={activity} />

            {activity.recent.length > 0 ? (
              <ul className="mt-4 space-y-1.5 border-t border-dashed border-border pt-4">
                {activity.recent.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-3 text-[12px] text-muted transition hover:text-foreground sm:text-[13px]"
                    >
                      <span className="min-w-0 truncate">{item.label}</span>
                      <span className="shrink-0 font-mono text-[10px] text-muted-soft">
                        {item.ago}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </FramePad>
    </Reveal>
  );
}

export const GitHubBody = GitHubActivity;
