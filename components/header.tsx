"use client";

import { siteConfig } from "@/content/site";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FRAME_MAX } from "@/components/grid";
import { cn } from "@/lib/utils";

type NavKey = "home" | "projects" | "contact";

const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "projects", label: "Projects", href: "/#projects" },
  { key: "contact", label: "Contact", href: "/contact" },
];

function navKeyFromPath(pathname: string, hash = "", scrollYProjects = false): NavKey {
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/projects")) return "projects";
  if (hash === "#projects" || hash === "#stack" || scrollYProjects) return "projects";
  return "home";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavKey>("home");
  const [hovered, setHovered] = useState<NavKey | null>(null);

  const indicator = hovered ?? active;

  useEffect(() => {
    const resolve = () => {
      const projectsEl = document.getElementById("projects");
      const nearProjects = Boolean(
        projectsEl && projectsEl.getBoundingClientRect().top < 120,
      );
      setActive(
        navKeyFromPath(pathname ?? "/", window.location.hash, nearProjects),
      );
    };

    resolve();
    window.addEventListener("hashchange", resolve);
    window.addEventListener("scroll", resolve, { passive: true });
    return () => {
      window.removeEventListener("hashchange", resolve);
      window.removeEventListener("scroll", resolve);
    };
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed top-12 left-1/2 z-[45] h-0 -translate-x-1/2 border-t border-dashed border-border"
        style={{ width: "100vw" }}
      />

      <header className="fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center bg-background/90 backdrop-blur-md">
        <div
          className={cn(
            "relative flex h-12 w-full items-center justify-between border-x border-dashed border-border px-3 sm:px-5 lg:px-6",
            FRAME_MAX,
          )}
        >
          <Link
            href="/"
            className="font-serif-display cursor-pointer text-[1.65rem] leading-tight tracking-tight text-foreground"
            onClick={() => setActive("home")}
          >
            {siteConfig.shortName}
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <LayoutGroup id="main-nav">
              <div
                className="flex items-center gap-6 font-sans text-sm"
                onMouseLeave={() => setHovered(null)}
              >
                {navItems.map((item) => {
                  const isActive = indicator === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setActive(item.key)}
                      onMouseEnter={() => setHovered(item.key)}
                      className={cn(
                        "relative cursor-pointer py-1 select-none transition-colors duration-200",
                        isActive
                          ? "font-semibold text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-[-2px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                            mass: 0.6,
                          }}
                        />
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </LayoutGroup>

            <ThemeToggle />
          </nav>

          <div className="relative flex items-center gap-0.5 md:hidden">
            <ThemeToggle />
            <div className="mx-1 h-4 w-px bg-border-strong" />
            <button
              type="button"
              className={cn(
                "flex size-9 cursor-pointer items-center justify-center rounded-md text-foreground focus:outline-none hover:bg-hover active:scale-[0.97]",
                open && "bg-hover",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X size={20} strokeWidth={1.75} />
              ) : (
                <Menu size={20} strokeWidth={1.75} />
              )}
            </button>

            {open ? (
              <>
                <button
                  type="button"
                  aria-label="Close menu backdrop"
                  className="fixed inset-0 z-40 cursor-default bg-transparent"
                  onClick={() => setOpen(false)}
                />
                <div
                  role="menu"
                  className="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[10.5rem] overflow-hidden rounded-xl border border-border bg-background py-1.5 font-sans shadow-lg ring-1 ring-black/5 dark:bg-neutral-950 dark:ring-white/10"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      role="menuitem"
                      href={item.href}
                      className="block px-4 py-2.5 text-[15px] text-muted transition-colors hover:bg-hover hover:text-foreground"
                      onClick={() => {
                        setActive(item.key);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    role="menuitem"
                    href={siteConfig.writing.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-[15px] text-muted transition-colors hover:bg-hover hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    Writing
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}
