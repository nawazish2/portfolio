import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";
import { Paper, Tape } from "@/components/desk/paper";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28">
      <Reveal>
        <div className="relative mx-auto max-w-2xl">
          <Tape className="-top-3 left-1/2 z-10 -translate-x-1/2" tilt={-3} />
          <Paper tilt={-0.6} className="px-4 py-4 sm:px-5 sm:py-5">
            <h2 className="text-[21px] leading-none font-semibold tracking-[-0.02em] text-ink sm:text-[24px]">
              Say{" "}
              <span className="font-hand text-[1.08em] leading-none font-normal text-accent">
                hello
              </span>
            </h2>
            <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-ink-soft">
              Open to SDE roles, internships and product work. Based in{" "}
              {siteConfig.location.replace(", IND", "")}, happy to work remote.
            </p>

            <div className="mt-4">
              <ContactForm />
            </div>
          </Paper>
        </div>
      </Reveal>
    </section>
  );
}
