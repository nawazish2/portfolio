import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Physical objects on the desk. Everything here is presentational —
 * `tilt` is a degree value, so callers can nudge a card without touching CSS.
 */

export function Tape({
  className,
  tilt = -4,
}: {
  className?: string;
  tilt?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute h-6 w-24 rounded-[2px] backdrop-blur-[1px]",
        className,
      )}
      style={{
        transform: `rotate(${String(tilt)}deg)`,
        background:
          "linear-gradient(180deg, rgba(244,236,205,0.72), rgba(226,214,172,0.6))",
        boxShadow: "0 1px 3px rgba(0,0,0,0.28)",
        maskImage:
          "linear-gradient(90deg, transparent 0, black 6px, black calc(100% - 6px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, black 6px, black calc(100% - 6px), transparent 100%)",
      }}
    />
  );
}

export function Pin({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-[-9px] left-1/2 size-[18px] -translate-x-1/2",
        className,
      )}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 33% 30%, #ff9d6b 0%, var(--accent) 45%, #a8471a 100%)",
          boxShadow: "0 3px 6px rgba(0,0,0,0.45)",
        }}
      />
      <span className="absolute top-[3px] left-[4px] size-[5px] rounded-full bg-white/60" />
    </span>
  );
}

export function Paper({
  children,
  className,
  tilt = 0,
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn("paper paper-grain relative", className)}
      style={{ transform: tilt ? `rotate(${String(tilt)}deg)` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

export function StickyNote({
  children,
  className,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={cn("note relative rounded-[3px] px-5 py-4", className)}
      style={{ transform: tilt ? `rotate(${String(tilt)}deg)` : undefined }}
    >
      {children}
    </div>
  );
}

/** A photo in a polaroid frame: thick white border, deep bottom lip. */
export function Polaroid({
  children,
  caption,
  className,
  tilt = 0,
}: {
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={cn("paper relative p-2.5 pb-9", className)}
      style={{ transform: tilt ? `rotate(${String(tilt)}deg)` : undefined }}
    >
      <div className="relative overflow-hidden rounded-[3px] bg-paper-sunk">
        {children}
      </div>
      {caption ? (
        <div className="absolute inset-x-0 bottom-1.5 px-3 text-center font-hand text-[15px] leading-none text-ink-soft">
          {caption}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A link as a paper disc with a perforated ring — the social icons read as
 * stamps stuck to the mat rather than as dark chrome floating on it.
 */
export function IconStamp({
  href,
  label,
  children,
  size = "md",
}: {
  href: string;
  label: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        "group relative flex items-center justify-center rounded-full bg-paper text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:text-accent",
        size === "lg" ? "size-10" : "size-9",
      )}
      style={{
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 3px rgba(0,0,0,0.24), 0 7px 13px -8px rgba(0,0,0,0.55)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[2.5px] rounded-full border border-dashed border-accent/55 transition group-hover:border-accent"
      />
      {children}
    </a>
  );
}

/** Section heading that sits directly on the mat, with a handwritten second half. */
export function MatHeading({
  children,
  hand,
  className,
}: {
  children: ReactNode;
  hand?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-2.5", className)}>
      <h2 className="mat-title">
        {children}
        {hand ? (
          <span className="ml-2 font-hand text-[1.45em] leading-none font-normal text-accent-soft">
            {hand}
          </span>
        ) : null}
      </h2>
    </div>
  );
}
