"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { BriefcaseBusiness, Building2 } from "lucide-react";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  location: string;
  workType: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

const experiences: ExperienceItem[] = [];

const RAIL_LEFT = "left-6 md:left-8";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative min-h-screen bg-slate-100 px-4 py-14 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-10 lg:px-16 xl:h-screen xl:overflow-hidden xl:px-20 xl:py-8 ${spaceGrotesk.className}`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col xl:h-[calc(100vh-4rem)] xl:min-h-0">
        <header className="mb-6 shrink-0 lg:mb-5">
          <p className="text-xs uppercase tracking-[0.34em] text-neutral-500 dark:text-neutral-400">
            Professional Work
          </p>
          <h1
            className={`mt-2 text-5xl font-medium leading-none sm:text-6xl lg:text-7xl ${bebasNeue.className}`}
          >
            EXPERIENCE
          </h1>
        </header>

        <div className="relative flex-1 pl-0 xl:pl-20">
          <div
            className={`hidden xl:block absolute ${RAIL_LEFT} bottom-7 top-7 w-0.5 -translate-x-1/2 bg-neutral-300 dark:bg-white/15`}
          />

          <motion.div
            style={{ scaleY: scrollYProgress }}
            className={`hidden xl:block absolute ${RAIL_LEFT} bottom-7 top-7 w-0.5 -translate-x-1/2 origin-top bg-emerald-500`}
          />

          <div className="grid gap-4 xl:h-full xl:grid-rows-2">
            {experiences.map((item, index) => (
              <article
                key={`${item.company}-${item.role}`}
                className="relative"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-slate-100 text-neutral-700 shadow-sm dark:border-white/20 dark:bg-[#131313] dark:text-neutral-100 xl:absolute xl:-left-12 xl:top-7 xl:z-10 xl:mb-0 xl:-translate-x-1/2 xl:-translate-y-1/2">
                  {index === 0 ? (
                    <Building2 size={16} />
                  ) : (
                    <BriefcaseBusiness size={16} />
                  )}
                </div>

                <div className="flex flex-col rounded-lg border border-neutral-300/90 bg-white/70 p-4 shadow-sm transition-all hover:shadow-md dark:border-white/15 dark:bg-white/4 sm:p-5 xl:h-full">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold md:text-xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {item.company}
                      </p>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                        {item.location} · {item.workType}
                      </p>
                    </div>
                    <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/20 dark:text-neutral-200 md:text-sm">
                      {item.duration}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
                    {item.summary}
                  </p>

                  <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-neutral-700 dark:text-neutral-200 md:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2 xl:mt-auto xl:pt-3">
                    {item.tech.map((tech) => (
                      <span
                        key={`${item.company}-${tech}`}
                        className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 dark:border-white/20 dark:text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
