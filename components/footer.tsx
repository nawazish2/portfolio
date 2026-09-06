import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/content/site";
import { IconStamp } from "@/components/desk/paper";

const links = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: siteConfig.links.email, label: "Email", Icon: Mail },
  { href: siteConfig.resumeUrl, label: "Résumé", Icon: FileText },
];

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 pt-4 pb-14 text-center">
      <div className="flex items-center gap-2.5">
        {links.map(({ href, label, Icon }) => (
          <IconStamp key={label} href={href} label={label} size="lg">
            <Icon size={17} strokeWidth={1.9} />
          </IconStamp>
        ))}
      </div>

      <p className="font-hand text-[17px] text-on-mat-soft">
        built on a desk in {siteConfig.location.replace(", IND", "")}, mostly at night
      </p>
      <p className="font-mono text-[10px] tracking-wider text-on-mat-soft/60 uppercase">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}
