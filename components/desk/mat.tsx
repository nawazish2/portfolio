/**
 * The drafting mat the whole page sits on: a soft vignette, a fine 24px grid,
 * a coarse 120px grid, and the angle rules a real cutting mat is printed with —
 * dashed diagonals, dashed protractor arcs and degree marks.
 * Purely decorative, fixed so it does not repaint on scroll.
 */

const dash = "5 8";

/** Dashed arcs plus rays at 30/45/60°, swept from one corner of its own box. */
function Protractor({
  className,
  origin,
  labels = false,
}: {
  className: string;
  /** which corner of the viewBox the arcs radiate from */
  origin: "bottom-left" | "top-left";
  labels?: boolean;
}) {
  const cx = 0;
  const cy = origin === "bottom-left" ? 600 : 0;
  const up = origin === "bottom-left" ? -1 : 1;
  const rays = [30, 45, 60];

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      aria-hidden
    >
      {[170, 260, 350, 440, 530].map((r) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          stroke="var(--mat-ruler)"
          strokeWidth="1"
          strokeDasharray={dash}
        />
      ))}

      {rays.map((angle) => {
        const radians = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={cx + 560 * Math.cos(radians)}
            y2={cy + up * 560 * Math.sin(radians)}
            stroke="var(--mat-ruler)"
            strokeWidth="1"
            strokeDasharray={dash}
          />
        );
      })}

      {labels
        ? rays.map((angle) => {
        const radians = (angle * Math.PI) / 180;
        return (
          <text
            key={`label-${String(angle)}`}
            x={cx + 215 * Math.cos(radians)}
            y={cy + up * 215 * Math.sin(radians)}
            dx={12}
            dy={up === -1 ? -6 : 14}
            fill="var(--mat-ruler)"
            fontSize="15"
            fontFamily="ui-monospace, monospace"
          >
            {angle}°
          </text>
        );
          })
        : null}
    </svg>
  );
}

/** A long dashed rule across the mat at a fixed angle. */
function AngleRule({
  className,
  angle,
}: {
  className: string;
  angle: number;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        transform: `rotate(${String(angle)}deg)`,
        borderTop: "1px dashed var(--mat-ruler)",
        opacity: 0.75,
      }}
    />
  );
}

export function Mat() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 32%, var(--mat-top) 0%, var(--mat-base) 62%, var(--mat-edge) 100%)",
        }}
      />

      {/* fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--mat-grid-fine) 1px, transparent 1px), linear-gradient(90deg, var(--mat-grid-fine) 1px, transparent 1px)",
          backgroundSize: "24px 24px, 24px 24px",
        }}
      />

      {/* coarse grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--mat-grid-coarse) 1px, transparent 1px), linear-gradient(90deg, var(--mat-grid-coarse) 1px, transparent 1px)",
          backgroundSize: "120px 120px, 120px 120px",
        }}
      />

      {/* dashed 45° cut guides running corner to corner */}
      <AngleRule
        className="absolute top-[18%] -left-[50%] w-[200%] origin-center"
        angle={38}
      />
      <AngleRule
        className="absolute top-[74%] -left-[50%] w-[200%] origin-center"
        angle={-38}
      />
      <AngleRule
        className="absolute top-[46%] -left-[50%] w-[200%] origin-center"
        angle={12}
      />

      {/* protractor rules in the corners */}
      <Protractor
        className="absolute -top-28 -left-24 h-[560px] w-[560px] opacity-80"
        origin="top-left"
      />
      <Protractor
        className="absolute -bottom-16 left-0 h-[600px] w-[600px] opacity-80"
        origin="bottom-left"
        labels
      />

      {/* ruler ticks along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-6 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--mat-ruler) 0 1px, transparent 1px 24px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      {/* ruler ticks along the left edge */}
      <div
        className="absolute inset-y-0 left-0 w-6 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, var(--mat-ruler) 0 1px, transparent 1px 24px)",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />
    </div>
  );
}
