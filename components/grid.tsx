import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Must match header content + FrameColumn + FrameRails */
export const FRAME_MAX = "max-w-[50rem]";

/**
 * Single full-viewport dashed horizontal — Sam’s thin notebook line.
 * Parent must be full width (SiteFrame). Do not nest inside FrameColumn.
 */
export function HRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative z-[30] h-0 w-full shrink-0",
        className,
      )}
    >
      {/* True edge-to-edge stroke (past the vertical rails) */}
      <div
        className="absolute top-0 left-1/2 w-screen max-w-none -translate-x-1/2 border-t border-dashed border-border"
        style={{ width: "100vw" }}
      />
    </div>
  );
}

/** @deprecated prefer HRule — kept as thin double if ever needed */
export function HBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative z-[30] w-full shrink-0",
        className,
      )}
    >
      <div
        className="absolute top-0 left-1/2 h-0 -translate-x-1/2 border-t border-dashed border-border"
        style={{ width: "100vw" }}
      />
      <div className="h-4 w-full" />
      <div
        className="absolute bottom-0 left-1/2 h-0 -translate-x-1/2 border-t border-dashed border-border"
        style={{ width: "100vw" }}
      />
    </div>
  );
}

/**
 * Full-height vertical dashed rails at frame width.
 * Single pair for the whole page.
 */
export function FrameRails() {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 left-1/2 z-20 w-full -translate-x-1/2",
        FRAME_MAX,
        "border-x border-dashed border-border",
      )}
    />
  );
}

export function FrameColumn({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn("relative z-[15] mx-auto w-full", FRAME_MAX, className)}
    >
      {children}
    </div>
  );
}

export function FramePad({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-3 sm:px-4", className)}>{children}</div>;
}
