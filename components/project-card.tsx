import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { Paper, Pin } from "@/components/desk/paper";
import { Reveal } from "@/components/reveal";

/** Small, fixed tilts so the wall of cards looks pinned by hand, not randomised. */
const tilts = [-1.4, 1.1, 0.9, -1.2, -0.8, 1.3];

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const primaryStack = project.stack.slice(0, 3);

  return (
    <Reveal delay={index * 0.05}>
      <div className="relative pt-3 transition-transform duration-300 hover:-translate-y-1">
        <Paper
          tilt={tilts[index % tilts.length]}
          className="flex h-full flex-col p-2 pb-3"
        >
          <Pin />

          <div className="relative aspect-[16/8] overflow-hidden rounded-[5px] bg-paper-sunk">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 640px) 46vw, 92vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center font-hand text-[18px] text-ink-soft">
                {project.oneLiner}
              </div>
            )}
          </div>

          <div className="px-1 pt-2">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[14px] leading-none font-semibold tracking-tight text-ink">
                {project.title}
              </h3>
              <span className="font-mono text-[10px] text-ink-faint">{project.year}</span>
            </div>

            <p className="mt-1 truncate font-mono text-[10px] tracking-wide text-ink-faint">
              {primaryStack.join(" · ")}
            </p>

            <p className="mt-1 font-hand text-[14.5px] leading-tight text-accent-ink">
              {project.badge ? `${project.badge} · ` : ""}
              {project.oneLiner}
            </p>

            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.65] text-ink-soft">
              {project.description}
            </p>

            {project.metric ? (
              <p className="mt-1.5 inline-block rounded-full bg-paper-sunk px-2 py-0.5 font-mono text-[10px] leading-relaxed text-ink">
                {project.metric}
              </p>
            ) : null}

            <div className="mt-2.5 flex items-center gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="flex size-7 items-center justify-center rounded-full border border-paper-edge text-ink-soft transition hover:bg-paper-sunk hover:text-ink"
                >
                  <Github size={14} />
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live link`}
                  className="flex size-7 items-center justify-center rounded-full border border-paper-edge text-ink-soft transition hover:bg-paper-sunk hover:text-ink"
                >
                  <ExternalLink size={14} />
                </a>
              ) : null}
              <span className="ml-auto font-mono text-[10px] tracking-wider text-ink-faint uppercase">
                {project.status}
              </span>
            </div>
          </div>
        </Paper>
      </div>
    </Reveal>
  );
}
