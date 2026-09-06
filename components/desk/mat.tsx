/**
 * The drafting mat the whole page sits on: a soft vignette, a fine 24px grid,
 * a coarse 120px grid, and a few faint ruler/arc marks near the edges.
 * Purely decorative, fixed so it does not repaint on scroll.
 */
export function Mat() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
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

      {/* diagonal cut guides, only wide enough to read as a real mat */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--mat-grid-fine) 0 1px, transparent 1px 240px)",
        }}
      />

      {/* protractor arcs, top-left corner */}
      <svg
        className="absolute -top-24 -left-24 h-[520px] w-[520px] opacity-60"
        viewBox="0 0 520 520"
        fill="none"
      >
        {[150, 210, 270, 330].map((r) => (
          <circle
            key={r}
            cx="120"
            cy="120"
            r={r}
            stroke="var(--mat-ruler)"
            strokeWidth="1"
          />
        ))}
      </svg>

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
