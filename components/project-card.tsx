import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { Paper, Pin } from "@/components/desk/paper";
import { Reveal } from "@/components/reveal";

/** Small, fixed tilts so the wall of cards looks pinned by hand, not randomised. */
const tilts = [-1.6, 1.1, -0.8, 1.7, -1.2, 0.9];

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="relative pt-3 transition-transform duration-300 hover:-translate-y-1">
        <Paper
          tilt={tilts[index % tilts.length]}
          className="flex h-full flex-col p-2.5 pb-4"
        >
          <Pin />

          <div className="relative aspect-[16/10] overflow-hidden rounded-[5px] bg-paper-sunk">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="px-1.5 pt-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[14px] leading-none font-semibold tracking-tight text-ink">
                {project.title}
              </h3>
              <span className="font-mono text-[10px] text-ink-faint">{project.year}</span>
            </div>

            <p className="mt-1.5 font-hand text-[15px] leading-none text-accent-ink">
              {project.badge ? `${project.badge} · ` : ""}
              {project.oneLiner}
            </p>

            <p className="mt-2 text-[12px] leading-[1.6] text-ink-soft">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-paper-edge bg-paper-sunk px-2 py-0.5 font-mono text-[9.5px] text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-3.5 flex items-center gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="flex size-8 items-center justify-center rounded-full border border-paper-edge text-ink-soft transition hover:bg-paper-sunk hover:text-ink"
                >
                  <Github size={15} />
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live link`}
                  className="flex size-8 items-center justify-center rounded-full border border-paper-edge text-ink-soft transition hover:bg-paper-sunk hover:text-ink"
                >
                  <ExternalLink size={15} />
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
