"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { BannerArt } from "@/components/banner-art";
import { AnimatePresence, motion } from "motion/react";
import { Eye } from "lucide-react";

const ROLE_INTERVAL_MS = 3500;

/**
 * Sam hero: banner flush to frame edges (minimal side pad),
 * profile under it in the same band — no extra section line between them.
 */
export function Hero() {
  const [views, setViews] = useState<number | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    try {
      const key = "nawaz-portfolio-views";
      const current = Number(localStorage.getItem(key) ?? "0") || 0;
      const next = current + 1;
      localStorage.setItem(key, String(next));
      setViews(next);
    } catch {
      setViews(null);
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % siteConfig.roles.length);
    }, ROLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const role = siteConfig.roles[roleIndex];

  return (
    <section className="w-full pb-6">
      {/* Banner — flush to vertical rails like Sam (no side padding) */}
      <Reveal>
        <div className="relative h-36 w-full overflow-hidden sm:h-40 md:h-[11.5rem]">
          <BannerArt />
        </div>
      </Reveal>

      {/* Profile row */}
      <FramePad className="mt-5 sm:mt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-end gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative size-[6.75rem] shrink-0 overflow-hidden rounded-[12px] border border-border bg-card shadow-sm sm:size-[7.5rem]"
            >
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.name}
                fill
                priority
                className="object-cover"
                sizes="120px"
              />
            </motion.div>

            <div className="min-w-0 pb-0.5">
              <h1 className="font-serif-display truncate text-[23px] leading-none text-foreground sm:text-4xl">
                {siteConfig.name}
              </h1>

              <div className="relative mt-1.5 h-[1.35em] overflow-hidden sm:mt-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={role}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-x-0 truncate font-sans text-[15px] leading-snug font-normal tracking-tight text-neutral-400 sm:text-[17px] dark:text-neutral-400"
                  >
                    {role}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="mt-0.5 truncate font-sans text-[11px] leading-snug font-normal tracking-wide text-neutral-500 sm:text-xs dark:text-neutral-500">
                {siteConfig.heroMeta}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 pt-1 text-muted-soft">
            <Eye size={14} strokeWidth={1.75} />
            <span className="font-mono text-xs tabular-nums">
              {views === null ? "—" : views.toLocaleString()}
            </span>
          </div>
        </div>
      </FramePad>
    </section>
  );
}
