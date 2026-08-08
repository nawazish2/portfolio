"use client";

import { useMemo, useState } from "react";
import { siteConfig, type StackCategory } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const categories: StackCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "Tools",
];

/**
 * Sam pattern: title + filters on one row, chips below — all in ONE band.
 */
export function TechStack() {
  const [active, setActive] = useState<StackCategory>("All");

  const items = useMemo(() => {
    if (active === "All") return siteConfig.stack;
    return siteConfig.stack.filter((item) => item.category === active);
  }, [active]);

  return (
    <Reveal>
      <FramePad className="pt-6 pb-6 sm:pt-9 sm:pb-10">
        {/* Title row + filters (same band) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-row items-baseline gap-2">
            <h2 className="section-title">Tech Stack</h2>
            <span className="select-none font-mono text-[10px] text-muted-soft">
              <span className="hidden lg:inline">( hover to explore )</span>
              <span className="inline lg:hidden">( tap to explore )</span>
            </span>
          </div>

          {/* Filters: horizontal scroll on mobile so they never wrap awkwardly */}
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  "filter-btn shrink-0",
                  active === cat && "filter-btn-active",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Chips under title — still same band, no HRule between */}
        <div className="mt-4 flex min-h-20 w-full flex-wrap items-start gap-1.5 sm:mt-5 sm:min-h-28 sm:gap-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.15 }}
                className="group"
              >
                <div className="stack-chip">
                  <span
                    className="size-2 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </FramePad>
    </Reveal>
  );
}

export const TechStackTitle = TechStack;
export const TechStackBody = TechStack;
