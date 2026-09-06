"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { siteConfig } from "@/content/site";

type Spot = { top: string; left?: string; right?: string; tilt: number };

/**
 * Resting spots live in the page gutters, so the layer never covers content.
 * Only rendered from `xl` up — that is the first width with a gutter wide
 * enough, and below it a draggable element fights touch scrolling. Narrower
 * screens get `StickerStrip` instead.
 */
const spots: Spot[] = [
  { top: "13%", left: "12px", tilt: -9 },
  { top: "31%", right: "14px", tilt: 8 },
  { top: "52%", left: "16px", tilt: 6 },
  { top: "68%", right: "12px", tilt: -7 },
  { top: "85%", left: "14px", tilt: 4 },
];

/** Numeric bounds: a ref constraint gets measured before layout settles here. */
const dragBounds = { left: -160, right: 160, top: -260, bottom: 260 };

const STORAGE_KEY = "desk-stickers-v1";

type Offset = { x: number; y: number };

function StickerFace({
  emoji,
  label,
  tilt,
}: {
  emoji: string;
  label: string;
  tilt: number;
}) {
  return (
    <div
      className="flex w-[96px] flex-col items-center gap-1 rounded-2xl px-2.5 py-2.5 text-center"
      style={{
        transform: `rotate(${String(tilt)}deg)`,
        background: "linear-gradient(180deg, #fbf7ef, #ece5d5)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 12px 22px -12px rgba(0,0,0,0.75)",
      }}
    >
      <span className="text-[24px] leading-none">{emoji}</span>
      <span className="font-hand text-[15px] leading-tight text-ink-soft">{label}</span>
    </div>
  );
}

/** Below `xl` there is no gutter, so the stickers lie in a row on the mat. */
export function StickerStrip() {
  return (
    <div
      aria-hidden
      className="flex flex-wrap justify-center gap-3 sm:gap-5 xl:hidden"
    >
      {siteConfig.stickers.map((sticker, index) => (
        <StickerFace
          key={sticker.label}
          emoji={sticker.emoji}
          label={sticker.label}
          tilt={spots[index % spots.length].tilt}
        />
      ))}
    </div>
  );
}

export function StickerLayer() {
  const reduceMotion = useReducedMotion();
  const [offsets, setOffsets] = useState<Record<number, Offset>>({});
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<number, Offset>;
        // Reading localStorage has to happen after mount, or the server and
        // client render different sticker positions and hydration mismatches.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOffsets(parsed);
        setMoved(Object.keys(parsed).length > 0);
      }
    } catch {
      // a blocked or full store just means the stickers start at rest
    }
  }, []);

  function remember(index: number, offset: Offset) {
    setOffsets((prev) => {
      const next = { ...prev, [index]: offset };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setMoved(true);
  }

  function reset() {
    setOffsets({});
    setMoved(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 hidden xl:block"
    >
      {siteConfig.stickers.map((sticker, index) => {
        const spot = spots[index % spots.length];
        const offset = offsets[index] ?? { x: 0, y: 0 };

        return (
          <motion.div
            key={sticker.label}
            aria-hidden
            className="pointer-events-auto absolute cursor-grab active:cursor-grabbing select-none"
            style={{ top: spot.top, left: spot.left, right: spot.right }}
            drag={!reduceMotion}
            dragConstraints={dragBounds}
            dragElastic={0.12}
            dragMomentum={false}
            animate={{ x: offset.x, y: offset.y }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 40 }}
            onDragEnd={(_, info) => {
              remember(index, {
                x: offset.x + info.offset.x,
                y: offset.y + info.offset.y,
              });
            }}
          >
            <StickerFace
              emoji={sticker.emoji}
              label={sticker.label}
              tilt={spot.tilt}
            />
          </motion.div>
        );
      })}

      {moved ? (
        <button
          type="button"
          onClick={reset}
          className="pointer-events-auto fixed bottom-5 left-5 z-40 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-[var(--chrome)] px-3.5 py-2 font-hand text-[16px] text-on-mat-soft backdrop-blur-md transition hover:text-on-mat"
        >
          <RotateCcw size={13} />
          put the stickers back
        </button>
      ) : null}
    </div>
  );
}
