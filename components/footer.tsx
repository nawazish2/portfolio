import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";

export function QuoteBand() {
  return (
    <Reveal>
      <div className="flex flex-col items-center px-4 py-8 text-center sm:py-12">
        <span
          aria-hidden
          className="mb-3 select-none font-serif-display text-2xl leading-none text-muted-soft sm:text-3xl"
        >
          ”
        </span>
        <blockquote className="font-serif-display max-w-xl text-lg leading-snug text-quote italic sm:text-[22px] md:text-[24px]">
          “{siteConfig.quote.text}”
        </blockquote>
        <p className="mt-5 flex items-center gap-2.5 font-sans text-[10px] font-medium tracking-[0.2em] text-muted-soft uppercase">
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
    <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center font-sans text-xs text-muted-soft sm:py-8">
      <p>
        Designed & developed by{" "}
        <span className="font-medium text-muted">{siteConfig.shortName}</span>
      </p>
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <a
          href={siteConfig.writing.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-foreground"
        >
          {siteConfig.writing.cta}
        </a>
        <span aria-hidden>·</span>
        <span>© {new Date().getFullYear()}</span>
      </p>
    </div>
  );
}
