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
    <div className={cn("flex", compact ? "w-full gap-[2px]" : "min-w-max gap-[3px]")}>
      {weeks.map((week) => (
        <div
          key={week.key}
          className={cn(
            "flex flex-col",
            compact ? "min-w-0 flex-1 gap-[2px]" : "w-[11px] gap-[3px]",
          )}
        >
          <div className="relative h-3.5">
            {week.monthLabel ? (
              <span className="absolute top-0 left-0 text-[10px] whitespace-nowrap text-ink-soft">
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

export async function GitHubActivity() {
  const activity = await getGitHubActivity(siteConfig.githubUsername);
  const weeks = activity ? toWeekColumns(activity.days) : [];
  const mobileWeeks = applyMonthLabels(weeks.slice(-20));

  return (
    <div className="relative">
      <Tape className="-top-2.5 left-10 z-10" tilt={-7} />
      <Tape className="-top-2.5 right-12 z-10" tilt={6} />
      <Paper tilt={-0.5} className="p-3">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h2 className="text-[12px] leading-none font-medium text-ink-soft">
            GitHub activity
          </h2>
          <a
            href={activity?.profileUrl ?? siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] text-ink-faint transition hover:text-accent-ink"
          >
            @{siteConfig.githubUsername}
            <ArrowUpRight size={12} />
          </a>
        </div>

        {!activity || weeks.length === 0 ? (
          <p className="text-sm text-ink-soft">
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
            <div className="sm:hidden">
              <Heatmap weeks={mobileWeeks} compact />
            </div>

            <div className="hidden sm:block">
              <div className="flex gap-1">
                <div className="flex w-7 shrink-0 flex-col gap-[3px]">
                  <div className="h-3.5" />
                  {weekdayLabels.map((label, index) => (
                    <span
                      key={`wd-${String(index)}`}
                      className="h-[11px] text-[9px] leading-[11px] text-ink-faint"
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

            <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-ink-faint">
              <span>Less</span>
              {([0, 1, 2, 3, 4] as const).map((level) => (
                <span key={level} className={cn("size-[11px] rounded-[2px]", levelClass[level])} />
              ))}
              <span>More</span>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
}
