"use client";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DownloadCloudIcon, Eye, Moon, Sun } from "lucide-react";
const logo = "/logo.png";
import StaggeredMenu from "@/components/StaggeredMenu.jsx";
import { useTheme } from "next-themes";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

const ThemeSwitch = styled(Switch)(({ theme }) => {
  const sunColor = theme.palette.warning.light;
  const moonColor = theme.palette.grey[100];

  const sunSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${sunColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  );

  const moonSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${moonColor}" stroke="${moonColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 14.4A8.5 8.5 0 0 1 9.6 3a7 7 0 1 0 11.4 11.4z"/></svg>`,
  );

  return {
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      backgroundColor: theme.palette.grey[400],
      opacity: 1,
      overflow: "hidden",
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url("data:image/svg+xml,${sunSvg}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "16px 16px",
        left: 12,
      },
      "&::after": {
        backgroundImage: `url("data:image/svg+xml,${moonSvg}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "16px 16px",
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor: theme.palette.common.black,
    },
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(20px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.common.white,
          opacity: 1,
          "&::after": {
            opacity: 0,
          },
        },
      },
    },
  };
});

const navLinks = [
  { id: "home", href: "#home", label: "Home", type: "section" },
  { id: "about", href: "#about", label: "About", type: "section" },
  { id: "projects", href: "#projects", label: "Projects", type: "section" },
  { id: "contact", href: "#contact", label: "Contact", type: "section" },
  { id: "blog", href: "https://nawazish.hashnode.dev/", label: "Blog", type: "link" },
] as const;

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const sectionIds = navLinks
      .filter((link) => link.type === "section")
      .map((link) => link.id);

    const updateNavbarState = () => {
      setIsScrolled(window.scrollY > 24);

      const marker = window.scrollY + window.innerHeight * 0.35;
      const currentSection = sectionIds.reduce((current, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return current;
        return section.offsetTop <= marker ? sectionId : current;
      }, sectionIds[0]);

      setActiveSection(currentSection);
    };

    const frame = requestAnimationFrame(updateNavbarState);
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  const getNavLinkClass = (isActive: boolean) =>
    `relative w-fit whitespace-nowrap px-0.5 text-sm font-medium text-neutral-600 transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-out hover:text-neutral-950 hover:after:scale-x-100 dark:text-neutral-400 dark:hover:text-white sm:text-base ${
      isActive
        ? "text-neutral-950 after:scale-x-100 dark:text-white"
        : "after:scale-x-0"
    }`;

  const handleDownload = () => {
    setLoading(true);

    const link = document.createElement("a");
    link.href = "/nawazishResume.pdf";
    link.download = "nawazishResume.pdf";
    link.click();

    setTimeout(() => setLoading(false), 1000);
  };

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const menuItems = navLinks.map((link) => ({
    label: link.label,
    link: link.href,
    ariaLabel: `Go to ${link.label}`,
  }));

  const socialItems = [
    { label: "GitHub", link: "https://github.com/nawazish2" },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/nawazishkhan8/",
    },
    { label: "X", link: "https://x.com/nawazish_khan1" },
    { label: "Email", link: "mailto:Knawazish153@gmail.com" },
  ];

  const actionItems = [
    {
      label: loading ? "Downloading..." : "View resume",
      ariaLabel: "View resume",
      onClick: () =>
        window.open(
          "https://drive.google.com/file/d/18oBtva6I1yADfVEruERkpnRMAfEbv5l6/view?usp=drive_link",
          "_blank",
          "noopener noreferrer",
        ),
      disabled: loading,
    },
  ];

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-16 w-full lg:hidden">
        <div className="pointer-events-auto absolute right-19 top-3 z-60 flex items-center gap-2 rounded-full border border-black/10 bg-white/55 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/35">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-900 transition hover:bg-white/70 dark:text-white dark:hover:bg-white/10"
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-900 transition hover:bg-white/70 disabled:opacity-60 dark:text-white dark:hover:bg-white/10"
            aria-label="View resume"
          > */}
          <a
            href="https://drive.google.com/file/d/18oBtva6I1yADfVEruERkpnRMAfEbv5l6/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              disabled={loading}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-900 transition hover:bg-white/70 disabled:opacity-60 dark:text-white dark:hover:bg-white/10"
              aria-label="View resume"
            >
              <Eye size={17} />
            </button>
          </a>
        </div>

        <StaggeredMenu
          isFixed
          position="right"
          logoUrl="/logo.png"
          items={menuItems}
          socialItems={socialItems}
          actionItems={actionItems}
          colors={["#0f172a", "#2563eb", "#22d3ee"]}
          accentColor="#2563eb"
          menuButtonColor={isDark ? "#ffffff" : "#111827"}
          openMenuButtonColor={isDark ? "#ffffff" : "#111827"}
          changeMenuColorOnOpen={false}
          displayItemNumbering
        />
      </div>

      <nav
        className={`fixed left-0 z-50 hidden w-full text-neutral-900 transition-[top,padding] duration-500 ease-out dark:text-[#EDE1DF] lg:flex ${
          isScrolled ? "top-3 justify-center px-4" : "top-0 justify-center px-0"
        }`}
      >
        <div
          className={`relative flex w-full transition-[max-width] duration-500 ease-out ${
            isScrolled
              ? "max-w-fit justify-center"
              : "max-w-none justify-center"
          }`}
        >
          <div
            className={`flex w-full items-center transition-all duration-500 ease-out ${
              isScrolled
                ? "justify-center rounded-full border border-black/10 bg-white/75 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#131313]/80 dark:shadow-black/25"
                : "justify-between border-b border-black/5 bg-slate-100 px-4 py-2.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#131313] sm:px-6 lg:px-8"
            }`}
          >
            <div
              className={` flex items-center justify-start overflow-hidden transition-all duration-500 ease-out ${
                isScrolled
                  ? "w-0 -translate-x-3 opacity-0"
                  : "w-42.5 translate-x-0 opacity-100"
              }`}
            >
              <Image
                src={logo}
                alt="Logo"
                width={32}
                height={32}
                className="mr-2 bg-transparent sm:h-9 sm:w-9"
              />
              <span
                className={`text-base font-bold leading-tight sm:text-lg ${bebasNeue.className}`}
              >
                NAWAZISH <br /> KHAN
              </span>
            </div>

            <div
              className={`hidden items-center gap-6 transition-all duration-500 ease-out lg:flex ${spaceGrotesk.className}`}
            >
              {navLinks.map((link) =>
                link.type === "section" ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={getNavLinkClass(activeSection === link.id)}
                    onClick={() => setActiveSection(link.id)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={getNavLinkClass(false)}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>

            <div
              className={`items-center justify-end gap-3 overflow-hidden transition-all duration-500 ease-out ${
                isScrolled
                  ? "w-0 translate-x-3 opacity-0 lg:flex"
                  : "hidden w-42.5 translate-x-0 opacity-100 lg:flex"
              }`}
            >
              <ThemeSwitch
                checked={isDark}
                onChange={handleThemeToggle}
                className="hidden scale-90 lg:inline-flex"
                inputProps={{ "aria-label": "Toggle color theme" }}
              />

              <Tooltip title="View Resume" sx={{ borderRadius: "10px" }}>
                <a
                  href="https://drive.google.com/file/d/18oBtva6I1yADfVEruERkpnRMAfEbv5l6/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    disabled={loading}
                    variant="contained"
                    size="small"
                    className="gap-2 whitespace-nowrap text-xs"
                  >
                    {loading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <>
                        <Eye
                          style={{ marginLeft: 0 }}
                          size={16}
                        />
                        <span className="hidden sm:inline">Resume</span>
                        <span className="sr-only sm:hidden">
                          View Resume
                        </span>
                      </>
                    )}
                  </Button>
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
