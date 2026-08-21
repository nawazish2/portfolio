import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { FramePad } from "@/components/grid";
import { BannerArt } from "@/components/banner-art";

export function Hero() {
  return (
    <section className="w-full pb-6 sm:pb-8">
      <Reveal>
        <div className="px-3 sm:px-0">
          <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-48 sm:rounded-none xl:h-56">
            <BannerArt />
          </div>
        </div>
      </Reveal>

      <FramePad className="mt-5 sm:mt-7">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-[14px] border border-border bg-card shadow-sm sm:size-[7.5rem] sm:rounded-[12px] xl:size-32">
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              fill
              priority
              className="object-cover"
              sizes="128px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-serif-display text-[1.65rem] leading-[1.15] tracking-tight text-foreground sm:text-[2.35rem] xl:text-[2.75rem]">
              {siteConfig.name}
            </h1>
            <p className="mt-1.5 font-sans text-[14px] leading-snug text-muted sm:mt-2 sm:text-[17px]">
              {siteConfig.role}
            </p>
            <p className="mt-1 font-sans text-[12px] tracking-wide text-muted-soft sm:text-[13px]">
              {siteConfig.heroMeta}
            </p>
          </div>
        </div>

        <p className="mt-4 max-w-2xl font-sans text-[14px] leading-relaxed text-muted sm:mt-5 sm:text-base">
          {siteConfig.tagline}
        </p>
      </FramePad>
    </section>
  );
}
