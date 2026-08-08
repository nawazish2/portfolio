import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Dark rounded app icon with white N */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0e0e",
          color: "#fafafa",
          fontSize: 110,
          fontWeight: 700,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          letterSpacing: "-0.04em",
          lineHeight: 1,
          borderRadius: 40,
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
