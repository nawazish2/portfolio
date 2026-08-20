"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowUpRight, Github, Globe } from "lucide-react";
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
  const caseHref = `/projects/${project.slug}`;
  const isLeftCol = index % 2 === 0;
  const isLast = index === total - 1;
  const isLastRow = Math.floor(index / 2) === Math.floor((total - 1) / 2);

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden border-dashed border-border p-3 sm:p-4",
        isLeftCol && "md:border-r",
        !isLast && "border-b",
        isLastRow ? "md:border-b-0" : "md:border-b",
      )}
    >
      <Link href={caseHref} className="block min-w-0">
        <PreviewPanel project={project} />
      </Link>

      <div className="mt-3 flex min-w-0 flex-1 flex-col sm:mt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[17px] font-semibold tracking-tight text-foreground sm:text-xl">
              <Link href={caseHref} className="hover:underline">
                {project.title}
              </Link>
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted sm:text-[13px]">
              {project.oneLiner}
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-1 pt-0.5 text-xs font-semibold text-muted-soft sm:text-sm">
            <span
              className={cn(
                "text-base leading-none sm:text-lg",
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

        <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-muted sm:mt-3 sm:text-sm">
          {project.problem}
        </p>

        <div className="mt-auto flex min-w-0 items-center justify-between gap-2 pt-3">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <Link
              href={caseHref}
              className="icon-btn"
              aria-label={`${project.title} case study`}
            >
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </Link>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`${project.title} live site`}
              >
                <Globe size={18} strokeWidth={1.75} />
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
                <Github size={18} strokeWidth={1.75} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function PreviewPanel({ project }: { project: Project }) {
  const hasImage = Boolean(project.image);

  return (
    <div
      className={cn(
        "group relative aspect-[16/10] w-full min-w-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10",
        hasImage
          ? cn("bg-linear-to-br p-2 sm:p-2.5", project.accent)
          : cn("bg-linear-to-br", project.accent),
      )}
    >
      {project.badge ? (
        <div className="pointer-events-none absolute top-3 right-3 z-20 sm:top-3.5 sm:right-3.5">
          <div className="rotate-12">
            <span className="inline-flex max-w-[7rem] items-center gap-1 truncate rounded-sm bg-amber-300/95 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wide text-black shadow-md sm:max-w-none sm:text-[10px]">
              <span className="size-1.5 shrink-0 rounded-full bg-black/70" />
              {project.badge}
            </span>
          </div>
        </div>
      ) : null}

      {hasImage ? (
        <div className="relative h-full w-full overflow-hidden rounded-md bg-black/20 shadow-md ring-1 ring-black/10 dark:ring-white/10">
          <Image
            src={project.image!}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>
      ) : (
        <>
          <div className="absolute top-3 left-3 z-10">
            <p className="font-mono text-[10px] font-bold tracking-widest text-white/50 uppercase">
              {project.year}
            </p>
            <p className="mt-1 text-base font-semibold text-white/90 sm:text-lg">
              {project.title}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 h-[70%] w-[55%] translate-x-[12%] translate-y-[18%] rounded-tl-xl border-4 border-white/20 bg-black/35 backdrop-blur-sm" />
        </>
      )}
    </div>
  );
}
