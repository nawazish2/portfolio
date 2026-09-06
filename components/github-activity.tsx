import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Paper, Tape } from "@/components/desk/paper";
import { cn } from "@/lib/utils";
import {
  applyMonthLabels,
  getGitHubActivity,
  toWeekColumns,
  type ContributionDay,
  type ContributionLevel,
  type WeekColumn,
} from "@/lib/github";

const levelClass: Record<ContributionLevel, string> = {
  0: "bg-[#e4e9e3]",
  1: "bg-[#a8e6b0]",
  2: "bg-[#6dcb7c]",
  3: "bg-[#3aa758]",
  4: "bg-[#1d6b34]",
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
    <div className={cn("flex", compact ? "w-full gap-[2px]" : "min-w-max gap-[4px]")}>
      {weeks.map((week) => (
        <div
          key={week.key}
          className={cn(
            "flex flex-col",
            compact ? "min-w-0 flex-1 gap-[2px]" : "w-[13px] gap-[4px]",
          )}
        >
          <div className="relative h-5">
            {week.monthLabel ? (
              <span className="absolute top-0 left-0 text-[11px] whitespace-nowrap text-ink-soft">
                {week.monthLabel}
              </span>
            ) : null}
          </div>
          {week.days.map((day, index) => (
            <HeatmapCell
              key={day?.date ?? `${week.key}-${String(index)}`}
              day={day}
              className={cn(
                "rounded-[3px]",
                compact ? "aspect-square w-full" : "size-[13px]",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export async function GitHubActivity() {
  const activity = await getGitHubActivity(siteConfig.githubUsername);
  const weeks = activity ? toWeekColumns(activity.days) : [];
  const mobileWeeks = applyMonthLabels(weeks.slice(-20));

  return (
    <div className="relative">
      <Tape className="-top-2.5 left-10 z-10" tilt={-7} />
      <Tape className="-top-2.5 right-12 z-10" tilt={6} />
      <Paper tilt={-0.5} className="px-4 py-5 sm:px-7 sm:py-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[17px] leading-none font-medium text-ink">GitHub activity</h2>
          <a
            href={activity?.profileUrl ?? siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] text-ink-soft transition hover:text-accent-ink"
          >
            @{siteConfig.githubUsername}
            <ArrowUpRight size={13} />
          </a>
        </div>

        {!activity || weeks.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">
            Live contribution data could not be loaded.{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ink"
            >
              View GitHub profile
            </a>
          </p>
        ) : (
          <>
            <div className="mt-3 sm:hidden">
              <Heatmap weeks={mobileWeeks} compact />
            </div>

            <div className="mt-4 hidden sm:block">
              <div className="flex gap-2">
                <div className="flex w-9 shrink-0 flex-col gap-[4px]">
                  <div className="h-5" />
                  {weekdayLabels.map((label, index) => (
                    <span
                      key={`wd-${String(index)}`}
                      className="h-[13px] text-[11px] leading-[13px] text-ink-soft"
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

            <div className="mt-3 flex items-center justify-end gap-1.5 text-[12px] text-ink-soft">
              <span>Less</span>
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <span key={level} className={cn("size-[13px] rounded-[3px]", levelClass[level])} />
              ))}
              <span>More</span>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
}
