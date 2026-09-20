import { ArrowUpRight, GitPullRequestArrow, Star } from "lucide-react";
import { ossContributions } from "@/content/opensource";
import { formatStars, getOssStars } from "@/lib/oss";
import { Reveal } from "@/components/reveal";
import { Paper, Pin, MatHeading } from "@/components/desk/paper";

const tilts = [-1.2, 0.9, 1.1, -0.9, 1.3, -1.1];

export async function OpenSourceSection() {
  const stars = await getOssStars(ossContributions.map((oss) => oss.repo));
  return (
    <section id="opensource" className="scroll-mt-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <MatHeading hand="postcards from upstream">Open source</MatHeading>
          <a
            href="https://github.com/nawazish2?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] text-on-mat-soft transition hover:text-on-mat"
          >
            More on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
        <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-on-mat-soft">
          Merged PRs in other people&apos;s repos — the fastest proof I can
          read code, scope a fix, and land it.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {ossContributions.map((oss, index) => (
          <Reveal key={`${oss.repo}-${oss.pr}`} delay={index * 0.05} className="h-full">
            <div className="relative h-full pt-3">
              <Paper tilt={tilts[index % tilts.length]} className="flex h-full flex-col p-4">
                <Pin />
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <a
                      href={oss.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-ink truncate font-mono text-[11px] font-medium"
                    >
                      {oss.repo}
                    </a>
                    {stars[oss.repo] != null ? (
                      <span
                        title={`${stars[oss.repo]?.toLocaleString()} stars`}
                        className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] text-ink-faint"
                      >
                        <Star size={11} />
                        {formatStars(stars[oss.repo] as number)}
                      </span>
                    ) : null}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 font-mono text-[10px] font-medium text-green-800">
                    <GitPullRequestArrow size={11} />
                    {oss.pr} {oss.status}
                  </span>
                </div>

                <h3 className="mt-2 text-[14px] leading-snug font-semibold text-ink">
                  {oss.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-[1.65] text-ink-soft">
                  {oss.impact}
                </p>

                <a
                  href={oss.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-accent-ink transition hover:text-accent"
                >
                  View PR
                  <ArrowUpRight size={13} />
                </a>
              </Paper>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
