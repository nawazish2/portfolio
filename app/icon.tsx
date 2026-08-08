import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Minimal black N on white — sharp at tab size */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#0f0e0e",
          fontSize: 22,
          fontWeight: 700,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
