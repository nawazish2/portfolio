"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers3,
  MapPinned,
  Rocket,
  ExternalLink,
} from "lucide-react";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";

const Github = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

type ProjectItem = {
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  impact: string;
  tech: string[];
  accent: string;
  icon: typeof Rocket;
  status: string;
  href: string;
  githubUrl?: string;
  previewUrl?: string;
  previewHtml?: string;
  metric: string;
  role: string;
  result: string;
  details: string[];
};

const projects: ProjectItem[] = [
  {
    title: "ParkIt",
    eyebrow: "Smart parking management",
    year: "2026",
    summary:
      "A smart parking management system with real-time availability tracking, booking system, and secure payment integration.",
    impact:
      "Helps users find and reserve parking spots efficiently, reducing time spent searching for parking in urban areas.",
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "Node.js",
      "Express",
      "TypeScript",
      "TiDB Serverless",
      "Socket.io",
      "JWT",
    ],
    accent: "from-emerald-300 via-teal-300 to-cyan-300",
    icon: MapPinned,
    status: "Live Project",
    href: "https://parkit-kappa.vercel.app/",
    githubUrl: "https://github.com/nawazish2/parkit",
    previewUrl: "https://parkit-kappa.vercel.app/",
    metric: "Smart parking",
    role: "Solo developer",
    result: "Real-time availability",
    details: [
      "Built with React 19 + Vite for a fast, modern frontend experience.",
      "Integrated Socket.io for real-time parking spot availability updates.",
      "Secured with JWT authentication and bcrypt password hashing.",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProjectPreview = ({ project }: { project: ProjectItem }) => {
  const hasPreview = Boolean(project.previewUrl || project.previewHtml);
  const [isLoading, setIsLoading] = useState(hasPreview);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-full h-full bg-linear-to-br from-slate-50 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a]">
        {hasPreview ? (
          <>
            <iframe
              src={project.previewUrl}
              srcDoc={project.previewHtml}
              title={`${project.title} live preview`}
              allow="geolocation; fullscreen"
              loading="lazy"
              scrolling="yes"
              onLoad={() => setIsLoading(false)}
              className="h-full w-full border-0"
            />
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-50 to-white dark:from-[#0f0f0f] dark:to-[#1a1a1a]">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-neutral-200 dark:border-neutral-800" />
                  <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-t-emerald-500 animate-spin" />
                </div>
                <span className="text-xs uppercase tracking-[0.28em] text-neutral-400 dark:text-neutral-500">
                  Loading preview
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div
              className={`rounded-2xl bg-linear-to-br p-4 ${project.accent}`}
            >
              <project.icon size={32} className="text-neutral-900" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Preview not available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const ActiveIcon = activeProject.icon;
  const previousProject = () =>
    setActiveIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1,
    );
  const nextProject = () =>
    setActiveIndex((current) =>
      current === projects.length - 1 ? 0 : current + 1,
    );

  return (
    <section
      id="projects"
      className={`min-h-screen bg-slate-100 px-4 py-10 text-neutral-950 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-12 md:py-14 lg:px-20 ${spaceGrotesk.className}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col justify-center"
      >
        <motion.header
          variants={itemVariants}
          className="mb-7 grid gap-4 md:mb-9 md:grid-cols-[0.82fr_1.18fr] md:items-end"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-neutral-500 dark:text-neutral-400">
              Selected Work
            </p>
            <h1
              className={`mt-2 text-5xl font-medium leading-none sm:text-6xl ${bebasNeue.className}`}
            >
              PROJECTS
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:ml-auto md:text-base">
            A compact showcase of the products I have built, with enough
            interaction to feel considered and enough structure to actually
            explain the work.
          </p>
        </motion.header>

        <motion.div
          variants={itemVariants}
          className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-start"
        >
          <aside className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/4">
            <div className="hidden lg:block">
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                Index
              </p>
              <nav className="space-y-2">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                      i === activeIndex
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/2"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="mr-2 text-xs text-neutral-400">
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="truncate font-semibold">{p.title}</div>
                        <div className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                          {p.eyebrow} • {p.year}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-3 lg:mt-0 lg:hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                    Index
                  </p>
                  <span className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-500 dark:border-white/10 dark:text-neutral-400">
                    0{activeIndex + 1} / 0{projects.length}
                  </span>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                  <button
                    type="button"
                    onClick={previousProject}
                    className="relative z-20 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 bg-white/70 text-neutral-700 transition hover:border-neutral-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-black/20 dark:text-neutral-200 dark:hover:border-white/30 dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-[#131313]"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="min-w-0 rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 text-center shadow-sm dark:border-white/10 dark:bg-white/4">
                    <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {activeProject.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={nextProject}
                    className="relative z-20 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 bg-white/70 text-neutral-700 transition hover:border-neutral-900 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-black/20 dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-black/30 dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-[#131313]"
                    aria-label="Next project"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/4">
            <div className="relative hidden lg:block">
              <div
                className={`absolute inset-x-0 top-0 z-10 h-1 bg-linear-to-r ${activeProject.accent}`}
              />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/80 bg-white/60 px-4 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg bg-linear-to-br p-1.5 ${activeProject.accent}`}
                  >
                    <ActiveIcon size={14} className="text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      {activeProject.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-500">
                      {activeProject.year} • {activeProject.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      {activeProject.metric}
                    </span>
                  </div>

                  <div className="hidden h-4 w-px bg-neutral-300 dark:bg-neutral-700 sm:block" />

                  {activeProject.href && activeProject.href !== "#" && (
                    <motion.a
                      href={activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 rounded-md bg-white/80 px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:bg-white hover:shadow-sm dark:bg-black/40 dark:text-neutral-300 dark:hover:bg-black/60"
                      title="Open in new tab"
                    >
                      <ExternalLink size={12} />
                      <span className="hidden sm:inline">Live Demo</span>
                    </motion.a>
                  )}

                  {activeProject.githubUrl && (
                    <motion.a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 rounded-md bg-white/80 px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:bg-white hover:shadow-sm dark:bg-black/40 dark:text-neutral-300 dark:hover:bg-black/60"
                      title="View GitHub repository"
                    >
                      <Github size={12} />
                      <span className="hidden sm:inline">GitHub</span>
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="relative h-80 sm:h-95 md:h-105 lg:h-115 overflow-hidden bg-slate-50 dark:bg-[#0a0a0a]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.title}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full w-full"
                  >
                    <ProjectPreview project={activeProject} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid gap-5 border-t border-neutral-200/80 p-5 dark:border-white/10 md:grid-cols-[1fr_auto] md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.title}-copy`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50 md:text-2xl">
                        {activeProject.title}
                      </h2>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {activeProject.eyebrow}
                      </p>
                    </div>

                    <div className="flex gap-2 sm:hidden">
                      {activeProject.href && activeProject.href !== "#" && (
                        <a
                          href={activeProject.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                        >
                          <ExternalLink size={12} />
                          <span>Live</span>
                        </a>
                      )}
                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:border-white/20 dark:bg-black/40 dark:text-neutral-300"
                        >
                          <Github size={12} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {activeProject.summary}
                  </p>
                  <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                    {activeProject.impact}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-3 md:min-w-50">
                <div className="rounded-lg border border-neutral-200/80 bg-linear-to-br from-slate-50 to-white p-3 dark:border-white/10 dark:from-white/2 dark:to-transparent">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                    Key Result
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    {activeProject.result}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={activeProject.href}
                    target={activeProject.href !== "#" ? "_blank" : undefined}
                    rel={
                      activeProject.href !== "#"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:gap-3 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white/90"
                  >
                    <span>Explore</span>
                    <ArrowUpRight size={14} />
                  </a>

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:gap-3 dark:border-white/20 dark:bg-black/40 dark:text-neutral-300 dark:hover:bg-black/60"
                    >
                      <Github size={14} />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 grid gap-4 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] lg:items-stretch"
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-wrap gap-2">
              {activeProject.tech.map((item, idx) => (
                <motion.span
                  key={`${activeProject.title}-${item}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="rounded-md border border-neutral-200/80 bg-white/50 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm dark:border-white/10 dark:bg-white/4 dark:text-neutral-300"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200/80 bg-white/60 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/2">
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {activeProject.details.map((detail, idx) => (
                <motion.div
                  key={`${activeProject.title}-${detail}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className={`flex items-start gap-2 rounded-md border border-neutral-200/80 bg-white/50 px-3 py-2 text-sm leading-6 text-neutral-600 dark:border-white/10 dark:bg-white/3 dark:text-neutral-300 ${
                    idx === activeProject.details.length - 1 &&
                    activeProject.details.length % 2 === 1
                      ? "md:col-span-2 md:mx-auto md:w-1/2 xl:col-span-1 xl:mx-0 xl:w-auto"
                      : ""
                  }`}
                >
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span className="text-xs md:text-sm">{detail}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
