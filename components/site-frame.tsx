import type { ReactNode } from "react";
import { FrameRails } from "@/components/grid";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-stretch">
      <FrameRails />
      {children}
    </div>
  );
}
