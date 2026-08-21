import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="w-full">
      <Reveal>
        <FramePad className="pt-5 sm:pt-7">
          <h2 className="section-title">{siteConfig.cta.title}</h2>
        </FramePad>

        <div className="flex flex-col items-center px-4 pt-8 pb-12 text-center sm:px-3 sm:pt-10 sm:pb-14">
          <p className="max-w-lg font-sans text-[15px] leading-relaxed text-muted sm:text-base">
            {siteConfig.cta.description}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 active:scale-[0.98] sm:mt-7 sm:h-11 sm:w-auto sm:max-w-none"
          >
            {siteConfig.cta.button}
            <ArrowRight size={15} strokeWidth={2.25} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
