"use client";

import type { Project } from "@/content/projects";
import { Github, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const primaryHref = project.live ?? project.github;
  const isLeftCol = index % 2 === 0;
  const isLast = index === total - 1;
  const isLastRow = Math.floor(index / 2) === Math.floor((total - 1) / 2);

  return (
    <article
      className={cn(
        "flex h-full min-h-[22rem] flex-col justify-start border-dashed border-border p-3 md:min-h-[26rem]",
        // Desktop: vertical split between the two columns
        isLeftCol && "md:border-r",
        // Mobile: divider under every card except the last
        !isLast && "border-b",
        // Desktop: kill mobile bottom border on last row; add bottom border only between rows
        isLastRow ? "md:border-b-0" : "md:border-b",
      )}
    >
      {primaryHref ? (
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <PreviewPanel project={project} />
        </a>
      ) : (
        <PreviewPanel project={project} />
      )}

      <div className="mt-3 flex w-full flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-foreground">
              {project.title}
            </p>
            <p className="text-xs text-muted">{project.oneLiner}</p>
          </div>
          <p className="flex shrink-0 items-center gap-1 text-sm font-semibold text-muted-soft">
            <span
              className={cn(
                "text-xl leading-none",
                project.status === "Live" || project.status === "Shipped"
                  ? "text-green"
                  : "text-amber-500",
              )}
            >
              •
            </span>
            {project.status}
          </p>
        </div>

        <p className="mt-3 mb-2 text-xs text-muted sm:text-sm">
          {project.description}
        </p>

        <div className="mt-auto grid min-h-13 w-full grid-cols-[1fr_auto] items-center py-2">
          <div className="flex flex-wrap items-center gap-1.5 py-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-end gap-1">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`${project.title} live site`}
              >
                <Globe size={20} strokeWidth={1.75} />
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`${project.title} GitHub`}
              >
                <Github size={20} strokeWidth={1.75} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function PreviewPanel({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "group relative h-52 w-full cursor-pointer overflow-hidden rounded-md bg-linear-to-br shadow-sm ring-1 ring-black/5 transition-colors duration-700 dark:ring-white/10",
        project.accent,
      )}
    >
      {project.badge ? (
        <div className="pointer-events-none absolute -top-10 -left-10 z-10 flex flex-col items-start gap-0.5 opacity-0 transition-all duration-700 ease-out group-hover:top-[35%] group-hover:left-[45%] group-hover:opacity-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="rotate-[-15deg] text-white drop-shadow-md"
          >
            <path
              d="M3.5 2V12L6.7 8.8H11.5L3.5 2Z"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.2"
            />
          </svg>
          <span className="translate-x-2 select-none rounded-sm bg-white/90 px-1 py-0.5 font-mono text-[8px] font-bold tracking-wide text-black shadow-md">
            {project.badge}
          </span>
        </div>
      ) : null}

      <div className="absolute -right-13 -bottom-10 rounded-xl border-5 border-white/20 transition-all duration-200 group-hover:-right-10 group-hover:-bottom-7">
        <div className="flex h-[200px] w-[180px] flex-col gap-2 rounded-lg bg-black/40 p-3 backdrop-blur-sm sm:w-[200px]">
          <div className="h-2 w-16 rounded-full bg-white/30" />
          <div className="h-2 w-24 rounded-full bg-white/20" />
          <div className="mt-2 flex-1 rounded-md bg-white/10" />
          <div className="flex gap-1.5">
            <div className="h-6 flex-1 rounded bg-white/15" />
            <div className="h-6 w-6 rounded bg-white/25" />
          </div>
        </div>
      </div>

      <div className="absolute top-3 left-3">
        <p className="font-mono text-[10px] font-bold tracking-widest text-white/50 uppercase">
          {project.year}
        </p>
        <p className="mt-1 text-lg font-semibold text-white/90">{project.title}</p>
      </div>
    </div>
  );
}
