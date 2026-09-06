import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Mat } from "@/components/desk/mat";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
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
    <>
      <Mat />
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-on-mat-soft transition hover:text-on-mat"
          >
            <ArrowLeft size={14} />
            Back to the desk
          </Link>
          <span className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-[11px] text-on-mat-soft">
            {siteConfig.availabilityShort}
          </span>
        </div>

        <div className="mt-8 sm:mt-12">
          <ContactSection />
        </div>

        <Footer />
      </main>
    </>
  );
}
