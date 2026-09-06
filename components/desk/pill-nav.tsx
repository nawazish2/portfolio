"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "notes", label: "Notes" },
  { id: "projects", label: "Projects" },
];

export function PillNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav
        aria-label="Sections"
        className="flex items-center gap-0.5 rounded-full border border-white/12 bg-[var(--chrome)] p-1 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md sm:gap-1"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-[14px]",
              active === section.id
                ? "bg-white/12 text-on-mat"
                : "text-on-mat-soft hover:text-on-mat",
            )}
          >
            {section.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-0.5 rounded-full bg-accent px-3 py-1.5 text-[13px] font-semibold text-white transition hover:brightness-110 sm:px-4 sm:text-[14px]"
        >
          Connect
        </a>
      </nav>
    </div>
  );
}
