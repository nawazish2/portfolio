import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { Github, Linkedin, Mail, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const XIcon = ({
  size = 18,
  strokeWidth: _strokeWidth,
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

/** About title + body in ONE band (Sam pattern) */
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
                className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/90 sm:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
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

/**
 * Contact — Sam-style icon strip (same on mobile + desktop).
 * 5 equal dashed cells; compact rounded icon buttons centered (never giant tiles).
 */
export function ContactSection() {
  return (
    <section className="scroll-mt-16">
      <Reveal>
        <FramePad className="pt-6 pb-3 sm:pt-8 sm:pb-4">
          <h2 className="section-title">Contact</h2>
        </FramePad>

        <div className="grid grid-cols-5 border-t border-dashed border-border">
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
                  "group flex items-center justify-center px-1.5 py-4 sm:py-5",
                  "transition-colors duration-150 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
                  "border-dashed border-border",
                  !isLast && "border-r",
                )}
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl border sm:size-11",
                    "border-neutral-300 bg-white text-neutral-900",
                    "transition-colors group-hover:border-neutral-400",
                    "dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100",
                    "dark:group-hover:border-neutral-500",
                    "active:scale-[0.97]",
                  )}
                >
                  <Icon size={18} strokeWidth={1.6} />
                </span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

// Back-compat aliases
export const AboutBody = AboutSection;
export const AboutBlock = AboutSection;
export const ContactCells = ContactSection;
export const ContactStrip = ContactSection;
