import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { SiteFrame } from "@/components/site-frame";
import { FrameColumn, FramePad, HRule } from "@/components/grid";
import { ConnectForm } from "@/components/connect-form";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Let's Connect",
  description: `Get in touch with ${siteConfig.name}. Open to SDE roles, product work, and collaborations.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

/**
 * Sam-style contact page: home + availability, title, form, full-width CTA.
 * Tight mobile spacing so Send Message stays reachable without endless scroll.
 */
export default function ContactPage() {
  return (
    <SiteFrame>
      <Header />

      <FrameColumn className="mt-12">
        {/* Top meta row — Sam: ← HOME + availability pill */}
        <FramePad className="flex items-center justify-between gap-3 pt-5 sm:gap-4 sm:pt-8">
          <Link
            href="/"
            className="inline-flex min-h-9 items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase transition hover:text-foreground"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Home
          </Link>
          <span className="max-w-[58%] truncate rounded-full border border-border px-2.5 py-1.5 text-[10px] leading-none text-muted sm:max-w-none sm:px-3 sm:text-[11px]">
            {siteConfig.availabilityShort}
          </span>
        </FramePad>

        {/* Title block — closer to form like Sam */}
        <FramePad className="mt-6 sm:mt-10">
          <h1 className="font-serif-display text-[2rem] leading-none tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
            Let&apos;s Connect
          </h1>
          <p className="mt-2.5 text-[15px] text-muted sm:mt-4 sm:text-lg">
            Let&apos;s talk about your next project
          </p>
        </FramePad>
      </FrameColumn>

      <div className="mt-7 sm:mt-12">
        <HRule />
      </div>

      <FrameColumn className="pb-10 sm:pb-16">
        <FramePad className="pt-6 sm:pt-12">
          <ConnectForm />
        </FramePad>
      </FrameColumn>
    </SiteFrame>
  );
}
