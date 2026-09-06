import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Paper, Tape } from "@/components/desk/paper";
import { Reveal } from "@/components/reveal";

type Entry = {
  org: string;
  meta: string;
  role: string;
  detail: string;
  href?: string;
};

function TimelineEntry({ entry, last }: { entry: Entry; last: boolean }) {
  return (
    <li className="relative pb-5 pl-5 last:pb-0">
      {!last ? (
        <span
          aria-hidden
          className="absolute top-2.5 bottom-0 left-[5px] w-px bg-paper-edge"
        />
      ) : null}
      <span
        aria-hidden
        className="absolute top-[6px] left-0 size-[11px] rounded-full border-2 border-accent bg-paper"
      />

      <div className="flex flex-wrap items-baseline gap-x-2">
        {entry.href ? (
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink inline-flex items-center gap-1 text-[14px] font-semibold"
          >
            {entry.org}
            <ArrowUpRight size={13} />
          </a>
        ) : (
          <span className="text-[14px] font-semibold text-ink">{entry.org}</span>
        )}
        <span className="font-mono text-[10px] text-ink-faint">· {entry.meta}</span>
      </div>
      <p className="mt-0.5 text-[12px] font-medium text-accent-ink">{entry.role}</p>
      <p className="mt-1.5 max-w-2xl text-[12.5px] leading-[1.65] text-ink-soft">
        {entry.detail}
      </p>
    </li>
  );
}

export function WorkSection() {
  const { education, building } = siteConfig.timeline;

  return (
    <section id="work" className="scroll-mt-28">
      <Reveal>
        <div className="relative">
          <Tape className="-top-3 left-12 z-10" tilt={-6} />
          <Tape className="-top-3 right-14 z-10" tilt={7} />
          <Paper tilt={0.3} className="px-5 py-5 sm:px-7 sm:py-6">
            <h2 className="text-[21px] leading-none font-semibold tracking-[-0.02em] text-ink sm:text-[24px]">
              Education{" "}
              <span className="font-hand text-[1.08em] leading-none font-normal text-accent">
                &amp; what I build
              </span>
            </h2>
            <span aria-hidden className="mt-3 block h-0.5 w-14 rounded-full bg-accent/60" />

            <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
              Education
            </p>
            <ul className="mt-3">
              {education.map((entry, index) => (
                <TimelineEntry
                  key={entry.org}
                  entry={entry}
                  last={index === education.length - 1}
                />
              ))}
            </ul>

            <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
              What I&apos;ve been building
            </p>
            <ul className="mt-3">
              {building.map((entry, index) => (
                <TimelineEntry
                  key={entry.org}
                  entry={entry}
                  last={index === building.length - 1}
                />
              ))}
            </ul>

            <p className="mt-6 border-t border-dashed border-paper-edge pt-4 font-hand text-[17px] text-ink-soft">
              no job history yet — that&apos;s the point of this page.
            </p>
          </Paper>
        </div>
      </Reveal>
    </section>
  );
}
