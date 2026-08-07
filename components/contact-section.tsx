import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mt-6 scroll-mt-16 border-t border-dashed border-border px-3 py-10 sm:px-3"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="section-title">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Open to SDE roles, product engineering, and collaborations around
            useful tools. Based in {siteConfig.location.replace(", IND", "")},
            remote-friendly.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href={siteConfig.links.email}
              className="block text-foreground transition hover:opacity-80"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted transition hover:text-foreground"
            >
              github.com/{siteConfig.githubUsername}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted transition hover:text-foreground"
            >
              linkedin.com/in/nawazishkhan8
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="rounded-md border border-dashed border-border bg-surface p-4 sm:p-5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
