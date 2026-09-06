import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/content/site";

const links = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.links.email, label: "Email", Icon: Mail },
  { href: siteConfig.resumeUrl, label: "Résumé", Icon: FileText },
];

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 pt-4 pb-14 text-center">
      <div className="flex items-center gap-2">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-on-mat-soft transition hover:bg-white/15 hover:text-on-mat"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      <p className="font-hand text-[19px] text-on-mat-soft">
        built on a desk in {siteConfig.location.replace(", IND", "")}, mostly at night
      </p>
      <p className="font-mono text-[10px] tracking-wider text-on-mat-soft/60 uppercase">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
