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

export default function ContactPage() {
  return (
    <SiteFrame>
      <Header />

      <FrameColumn className="mt-12">
        <FramePad className="flex items-center justify-between gap-4 pt-8 sm:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase transition hover:text-foreground"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Home
          </Link>
          <span className="shrink-0 rounded-full border border-dotted border-border px-3 py-1.5 text-[11px] text-muted">
            {siteConfig.availabilityShort}
          </span>
        </FramePad>

        <FramePad className="mt-10 sm:mt-12">
          <h1 className="font-serif-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Let&apos;s talk about your next project
          </p>
        </FramePad>
      </FrameColumn>

      <div className="mt-12 sm:mt-16">
        <HRule />
      </div>

      <FrameColumn className="pb-16">
        <FramePad className="pt-10 sm:pt-12">
          <ConnectForm />
        </FramePad>
      </FrameColumn>
    </SiteFrame>
  );
}
