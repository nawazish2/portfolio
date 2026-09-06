import Image from "next/image";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { siteConfig, type AboutPart } from "@/content/site";
import { IconStamp, Polaroid, StickyNote, Tape } from "@/components/desk/paper";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.links.email, label: "Email", Icon: Mail },
  { href: siteConfig.resumeUrl, label: "Résumé", Icon: FileText },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.9 2H22l-7.1 8.1L23.2 22h-6.6l-5.2-6.8L5.5 22H2.4l7.6-8.7L1.2 2h6.8l4.7 6.2L18.9 2Zm-1.1 18h1.8L7.3 3.9H5.4L17.8 20Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="about" className="relative scroll-mt-28">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-[190px_1fr] md:items-start">
        {/* Taped polaroid */}
        <div className="relative mx-auto w-[168px] shrink-0 md:mx-0 md:w-[190px]">
          <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2" tilt={-5} />
          <Polaroid tilt={-3.5} caption="that's me">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              width={380}
              height={430}
              priority
              className="h-[190px] w-full object-cover md:h-[215px]"
            />
          </Polaroid>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[26px] leading-none font-semibold tracking-[-0.025em] text-on-mat sm:text-[30px]">
                {siteConfig.name}
              </h1>
              <p className="mt-2 font-hand text-[17px] leading-none text-accent-soft sm:text-[18px]">
                {siteConfig.heroKicker}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <IconStamp key={label} href={href} label={label}>
                  <Icon size={16} strokeWidth={1.9} />
                </IconStamp>
              ))}
              <IconStamp href={siteConfig.links.x} label="X">
                <XIcon />
              </IconStamp>
            </div>
          </div>

          {/* Sticky note bio */}
          <div className="relative mt-6 sm:mt-7">
            <Tape className="-top-3 left-8 z-10" tilt={-7} />
            <Tape className="-top-3 right-10 z-10" tilt={5} />
            <StickyNote tilt={-0.4}>
              <ul className="space-y-2.5">
                {siteConfig.heroNote.map((line, index) => (
                  <li
                    key={index}
                    className="flex gap-2.5 text-[14px] leading-[1.625] text-ink"
                  >
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      {(line.parts as readonly AboutPart[]).map((part, partIndex) =>
                        part.href ? (
                          <a
                            key={partIndex}
                            href={part.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-ink font-medium"
                          >
                            {part.text}
                          </a>
                        ) : part.highlight ? (
                          <span key={partIndex} className="font-hand text-[1.15em] text-accent-ink">
                            {part.text}
                          </span>
                        ) : (
                          <span key={partIndex}>{part.text}</span>
                        ),
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
}
