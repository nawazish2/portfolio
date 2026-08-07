import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function QuoteBand() {
  return (
    <Reveal>
      <div className="flex flex-col items-center px-4 py-8 text-center sm:py-10">
        <span
          aria-hidden
          className="mb-3 select-none font-serif-display text-2xl leading-none text-muted-soft/70 sm:text-3xl"
        >
          ”
        </span>
        <blockquote className="max-w-xl text-lg leading-snug font-normal tracking-wide text-quote italic sm:text-[22px] md:text-[24px]">
          “{siteConfig.quote.text}”
        </blockquote>
        <p className="mt-5 flex items-center gap-2.5 text-[10px] font-medium tracking-[0.2em] text-muted-soft uppercase">
          <span aria-hidden className="h-px w-5 bg-border-strong" />
          {siteConfig.quote.author}
          <span aria-hidden className="h-px w-5 bg-border-strong" />
        </p>
      </div>
    </Reveal>
  );
}

export function CreditsBand() {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-6 text-center text-xs text-muted-soft sm:py-8">
      <p>
        Designed & Developed by{" "}
        <span className="font-medium text-muted">{siteConfig.shortName}</span>
      </p>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full">
      <QuoteBand />
      <CreditsBand />
    </footer>
  );
}
