import { siteConfig } from "@/content/site";

export function CreditsBand() {
  return (
    <div className="flex flex-col items-center gap-1.5 px-4 py-6 text-center text-xs text-muted-soft sm:py-8">
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
