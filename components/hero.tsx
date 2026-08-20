import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { BannerArt } from "@/components/banner-art";

export function Hero() {
  return (
    <section className="w-full pb-5 sm:pb-6">
      <Reveal>
        <div className="px-3 sm:px-0">
          <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 sm:rounded-none md:h-52">
            <BannerArt />
          </div>
        </div>
      </Reveal>

      <FramePad className="mt-4 sm:mt-6">
        <div className="flex items-end gap-3 sm:gap-4">
          <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-[14px] border border-border bg-card shadow-sm sm:size-[7.5rem] sm:rounded-[12px]">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              fill
              priority
              className="object-cover"
              sizes="120px"
            />
          </div>

          <div className="min-w-0 flex-1 pb-0.5">
            <h1 className="font-serif-display truncate text-[22px] leading-tight text-foreground sm:text-4xl sm:leading-none">
              {siteConfig.name}
            </h1>
            <p className="mt-1 truncate text-[14px] leading-snug tracking-tight text-muted sm:mt-2 sm:text-[17px]">
              {siteConfig.role}
            </p>
            <p className="mt-1 max-w-md text-[13px] leading-snug text-muted sm:mt-1.5 sm:text-sm">
              {siteConfig.tagline}
            </p>
            <p className="mt-1 truncate font-sans text-[11px] tracking-wide text-muted-soft sm:text-xs">
              {siteConfig.heroMeta}
            </p>
          </div>
        </div>
      </FramePad>
    </section>
  );
}
