"use client";

import { siteConfig } from "@/content/site";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FRAME_MAX } from "@/components/grid";
import { cn } from "@/lib/utils";

const moreLinks = [
  { href: "/contact", label: "Contact" },
  { href: siteConfig.writing.href, label: "Writing", external: true },
];

type NavKey = "home" | "projects" | "more";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [active, setActive] = useState<NavKey>("home");
  const [hovered, setHovered] = useState<NavKey | null>(null);

  // Dot follows hover; when idle, falls back to active (defaults to home)
  const indicator = hovered ?? active;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Resolve active section from route + hash + scroll
  useEffect(() => {
    const resolve = () => {
      if (pathname?.startsWith("/contact")) {
        setActive("more");
        return;
      }

      const hash = window.location.hash;
      if (hash === "#projects" || hash === "#stack") {
        setActive("projects");
        return;
      }

      // Scroll spy: projects section takes over near its top
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        const top = projectsEl.getBoundingClientRect().top;
        if (top < 120) {
          setActive("projects");
          return;
        }
      }

      setActive("home");
    };

    resolve();
    window.addEventListener("hashchange", resolve);
    window.addEventListener("scroll", resolve, { passive: true });
    return () => {
      window.removeEventListener("hashchange", resolve);
      window.removeEventListener("scroll", resolve);
    };
  }, [pathname]);

  const navItems: { key: NavKey; label: string; href: string }[] = [
    { key: "home", label: "Home", href: "/" },
    { key: "projects", label: "Projects", href: "/#projects" },
  ];

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
            "relative flex h-12 w-full items-center justify-between border-x border-dashed border-border px-3 pt-1 pb-1",
            FRAME_MAX,
          )}
        >
          <Link
            href="/"
            className="font-serif-display cursor-pointer text-3xl text-foreground"
            onClick={() => setActive("home")}
          >
            {siteConfig.shortName}
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <LayoutGroup id="main-nav">
              <div
                className="flex items-center gap-5 text-sm"
                onMouseLeave={() => {
                  // Leave nav → clear hover so the dot returns to default (home / active)
                  setHovered(null);
                  setMoreOpen(false);
                }}
              >
                {navItems.map((item) => {
                  const isActive = indicator === item.key;
                  return (
                    <a
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
                    </a>
                  );
                })}

                <div
                  className="relative flex items-center gap-1.5 py-1"
                  onMouseEnter={() => {
                    setHovered("more");
                    setMoreOpen(true);
                  }}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "relative flex cursor-pointer items-center gap-1.5 py-1 transition-colors duration-200",
                      indicator === "more"
                        ? "font-semibold text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                    onClick={() => setMoreOpen((v) => !v)}
                  >
                    <span className="select-none">More</span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 text-muted-soft transition-transform duration-200",
                        moreOpen && "rotate-180",
                      )}
                    />
                    {indicator === "more" ? (
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
                  </button>

                  {moreOpen ? (
                    <div className="absolute top-full right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-md border border-dashed border-border bg-background py-1 shadow-md">
                      {moreLinks.map((link) =>
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <a
                            key={link.label}
                            href={link.href}
                            className="block px-3 py-2 text-sm text-muted transition-colors hover:bg-hover hover:text-foreground"
                            onClick={() => {
                              setMoreOpen(false);
                              setActive("more");
                            }}
                          >
                            {link.label}
                          </a>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </LayoutGroup>

            <ThemeToggle />
          </nav>

          <div className="relative flex items-center gap-1.5 md:hidden">
            <ThemeToggle />
            <div className="mx-1 h-5 w-px bg-border-strong" />
            <button
              type="button"
              className="cursor-pointer rounded-md p-1 text-foreground focus:outline-none hover:bg-hover"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="text-2xl" size={22} />
              ) : (
                <Menu className="text-2xl" size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-x-0 top-12 z-40 border-b border-dashed border-border bg-background px-4 py-4 md:hidden">
          <div className={cn("mx-auto flex w-full flex-col gap-1", FRAME_MAX)}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm text-foreground transition hover:bg-hover"
                onClick={() => {
                  setActive(item.key);
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            {moreLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-3 text-sm text-foreground transition hover:bg-hover"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-3 text-sm text-foreground transition hover:bg-hover"
                  onClick={() => {
                    setActive("more");
                    setOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
