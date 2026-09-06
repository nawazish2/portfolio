import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { Paper, MatHeading } from "@/components/desk/paper";
import { getWritingPosts } from "@/lib/writing";

const tilts = [-1.3, 0.9, 1.1, -0.8];

/** Ruled index card — the top red line is the giveaway. */
function IndexCard({
  title,
  brief,
  dateLabel,
  href,
  tilt,
}: {
  title: string;
  brief: string;
  dateLabel: string;
  href: string;
  tilt: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full transition-transform duration-300 hover:-translate-y-1"
    >
      <Paper tilt={tilt} className="h-full overflow-hidden">
        <div className="h-9 border-b-2 border-[#e0736f]/45 bg-[linear-gradient(#dfd9c8_1px,transparent_1px)] bg-[length:100%_16px]" />
        <div
          className="px-5 py-4"
          style={{
            backgroundImage: "linear-gradient(#dfd9c8 1px, transparent 1px)",
            backgroundSize: "100% 24px",
            backgroundPosition: "0 20px",
          }}
        >
          <h3 className="text-[14px] leading-snug font-semibold text-ink group-hover:text-accent-ink">
            {title}
          </h3>
          {brief ? (
            <p className="mt-2 line-clamp-4 text-[12.5px] leading-[1.65] text-ink-soft">{brief}</p>
          ) : null}
          <p className="mt-3 font-mono text-[10px] text-ink-faint">{dateLabel}</p>
        </div>
      </Paper>
    </a>
  );
}

export async function WritingSection() {
  const posts = await getWritingPosts(4);

  return (
    <section id="notes" className="scroll-mt-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <MatHeading hand="from the desk">Notes</MatHeading>
          <a
            href={siteConfig.writing.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] text-on-mat-soft transition hover:text-on-mat"
          >
            {siteConfig.writing.cta}
            <ArrowUpRight size={14} />
          </a>
        </div>
        <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-on-mat-soft">
          {siteConfig.writing.description}
        </p>
      </Reveal>

      {posts.length > 0 ? (
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.href} delay={index * 0.05} className="h-full">
              <IndexCard
                title={post.title}
                brief={post.brief}
                dateLabel={post.dateLabel}
                href={post.href}
                tilt={tilts[index % tilts.length]}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-6 font-hand text-[19px] text-on-mat-soft">
          the latest notes live on Hashnode →
        </p>
      )}
    </section>
  );
}
