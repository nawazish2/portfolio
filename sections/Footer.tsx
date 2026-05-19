"use client";

import { Space_Grotesk } from "next/font/google";
import { X } from "@deemlol/next-icons";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer
      className={`bg-slate-100 px-4 pb-8 text-neutral-950 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 md:px-12 lg:px-20 ${spaceGrotesk.className}`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 border-t border-neutral-300/80 pt-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Built with{" "}
            <span className="font-semibold text-neutral-950 dark:text-white">
              Next.js
            </span>
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Nawazish Khan. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end" />
      </div>
    </footer>
  );
};

export default Footer;
