import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { Header } from "@/components/header";
import { SiteFrame } from "@/components/site-frame";
import { FrameColumn, FramePad, HRule } from "@/components/grid";
import { CreditsBand } from "@/components/footer";
import { ProjectJsonLd } from "@/components/json-ld";
import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.oneLiner,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
      description: project.oneLiner,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.image
        ? [{ url: project.image, alt: `${project.title} preview` }]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((item) => item.slug !== project.slug);

  return (
    <SiteFrame>
      <Header />
      <ProjectJsonLd project={project} />

      <FrameColumn className="mt-12">
        <FramePad className="flex items-center justify-between gap-3 pt-5 sm:pt-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-9 items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase transition hover:text-foreground"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Projects
          </Link>
          <p className="flex items-center gap-1 text-xs font-semibold text-muted-soft sm:text-sm">
            <span
              className={cn(
                "text-base leading-none",
                project.status === "Live" || project.status === "Shipped"
                  ? "text-green"
                  : "text-amber-500",
              )}
            >
              •
            </span>
            {project.status}
            <span className="text-muted-soft">· {project.year}</span>
          </p>
        </FramePad>

        <FramePad className="mt-6 pb-6 sm:mt-8 sm:pb-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-soft uppercase">
            {project.badge ?? "Project"}
          </p>
          <h1 className="display-title mt-2">
            {project.title}
          </h1>
          <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-lg">
            {project.oneLiner}
          </p>
        </FramePad>
      </FrameColumn>

      <HRule />

      {project.image ? (
        <>
          <FrameColumn>
            <FramePad className="py-4 sm:py-5">
              <div
                className={cn(
                  "relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-linear-to-br p-2 shadow-sm ring-1 ring-black/5 sm:p-2.5 dark:ring-white/10",
                  project.accent,
                )}
              >
                <div className="relative h-full w-full overflow-hidden rounded-md bg-black/20">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50rem"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </FramePad>
          </FrameColumn>
          <HRule />
        </>
      ) : null}

      <FrameColumn>
        <FramePad className="grid gap-8 py-8 sm:grid-cols-2 sm:gap-10 sm:py-12">
          <section>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-soft uppercase">
              Why
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-foreground sm:text-base">
              {project.problem}
            </p>
          </section>
          <section>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-soft uppercase">
              What I built
            </h2>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-foreground sm:text-base">
              {project.built}
            </p>
          </section>
        </FramePad>
      </FrameColumn>

      <HRule />

      <FrameColumn>
        <FramePad className="py-8 sm:py-12">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-soft uppercase">
            Notes
          </h2>
          <ul className="mt-4 space-y-2.5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 font-sans text-[15px] leading-relaxed text-foreground sm:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
                <span>{item}</span>
              </li>
            ))}
            <li className="flex gap-2.5 font-sans text-[15px] leading-relaxed text-foreground sm:text-base">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
              <span>
                <span className="font-medium text-foreground">Next: </span>
                {project.next}
              </span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span key={tech} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                <Globe size={16} strokeWidth={2} />
                Open live
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition hover:bg-hover"
              >
                <Github size={16} strokeWidth={2} />
                GitHub
              </a>
            ) : null}
          </div>
        </FramePad>
      </FrameColumn>

      {otherProjects.length > 0 ? (
        <>
          <HRule />
          <FrameColumn>
            <FramePad className="py-8 sm:py-10">
              <h2 className="section-title">More work</h2>
              <ul className="mt-4 divide-y divide-dashed divide-border border-y border-dashed border-border">
                {otherProjects.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="flex items-baseline justify-between gap-3 py-3 text-sm transition hover:text-foreground"
                    >
                      <span className="shrink-0 font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="min-w-0 truncate text-right text-muted">
                        {item.oneLiner}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FramePad>
          </FrameColumn>
        </>
      ) : null}

      <HRule />

      <FrameColumn>
        <CreditsBand />
      </FrameColumn>
    </SiteFrame>
  );
}
