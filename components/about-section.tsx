import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { Github, Linkedin, Mail, Paperclip, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const XIcon = ({
  size = 18,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.725-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const contacts = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "Twitter",
    href: siteConfig.links.x,
    icon: XIcon,
    external: true,
  },
  {
    label: "Mail",
    href: siteConfig.links.email,
    icon: Mail,
    external: false,
  },
  {
    label: "Resume",
    href: siteConfig.resumeUrl,
    icon: Paperclip,
    external: true,
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16">
      <Reveal>
        <FramePad className="pt-6 pb-6 sm:pt-9 sm:pb-10">
          <h2 className="section-title">About</h2>
          <div className="mt-4 space-y-3.5 sm:mt-5">
            {siteConfig.about.map((line, i) => (
              <p
                key={i}
                className="flex gap-2.5 font-sans text-[15px] leading-relaxed text-foreground sm:text-[17px]"
              >
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
                <span>
                  {line.parts.map((part, j) =>
                    part.highlight ? (
                      <span
                        key={j}
                        className="font-semibold underline decoration-foreground/40 underline-offset-[3px]"
                      >
                        {part.text}
                      </span>
                    ) : (
                      <span key={j}>{part.text}</span>
                    ),
                  )}
                </span>
              </p>
            ))}
          </div>
        </FramePad>
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="scroll-mt-16">
      <Reveal>
        <FramePad className="pt-6 pb-3 sm:pt-8 sm:pb-4">
          <h2 className="section-title">Contact</h2>
        </FramePad>

        <div className="grid grid-cols-5 border-t border-dashed border-border md:hidden">
          {contacts.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === contacts.length - 1;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.label}
                className={cn(
                  "group flex items-center justify-center py-4",
                  "transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
                  "border-dashed border-border",
                  !isLast && "border-r",
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-900 transition-colors group-hover:border-neutral-400 active:scale-[0.97] dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:group-hover:border-neutral-500">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
              </a>
            );
          })}
        </div>

        <div className="hidden border-t border-dashed border-border md:grid md:grid-cols-5">
          {contacts.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === contacts.length - 1;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "group flex min-w-0 items-center gap-2.5 px-4 py-4 text-foreground transition-colors duration-150",
                  "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
                  "border-dashed border-border",
                  !isLast && "border-r",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-neutral-300 bg-white text-neutral-900 transition-colors group-hover:border-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:group-hover:border-neutral-500">
                  <Icon size={17} strokeWidth={1.75} />
                </span>
                <span className="flex min-w-0 items-center gap-1 font-sans text-sm font-medium tracking-tight">
                  {item.label}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="shrink-0 text-neutral-800 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-200"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
