import type { ReactNode } from "react";
import { FrameRails } from "@/components/grid";

/**
 * Full-page notebook shell.
 * - No overflow-x clip (that was cutting full-bleed horizontals)
 * - Vertical rails paint over the full document height
 * - Horizontal HRules must be siblings of FrameColumn, not children
 */
export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-stretch">
      <FrameRails />
      {children}
    </div>
  );
}
