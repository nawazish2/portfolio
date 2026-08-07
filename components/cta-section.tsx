import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { ArrowRight } from "lucide-react";

/**
 * Sam pattern: title at top of band, body centered below — ONE band between HRules.
 */
export function CtaSection() {
  return (
    <section className="w-full">
      <Reveal>
        <FramePad className="pt-6 sm:pt-7">
          <h2 className="section-title">{siteConfig.cta.title}</h2>
        </FramePad>

        <div className="flex flex-col items-center px-3 pt-12 pb-16 text-center sm:pt-14 sm:pb-20">
          <p className="max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
            {siteConfig.cta.description}
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 active:scale-[0.98]"
          >
            {siteConfig.cta.button}
            <ArrowRight size={15} strokeWidth={2.25} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export const CtaBody = CtaSection;
