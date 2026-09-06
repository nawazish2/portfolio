import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "app", "_fonts");

const tags = ["Swift", "SwiftUI", "TypeScript", "React", "Next.js", "Node.js"];

/**
 * The share card is the site in miniature: cream paper taped to the green mat.
 * Each mat layer is its own absolute div — satori only paints one background
 * image per element, so the grids cannot be stacked on a single node.
 */
export default async function OpengraphImage() {
  const [inter, interBold, caveat] = await Promise.all([
    readFile(join(fontDir, "Inter-Regular.ttf")),
    readFile(join(fontDir, "Inter-Bold.ttf")),
    readFile(join(fontDir, "Caveat-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a2e26",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(130% 95% at 50% 30%, #2d4b3d 0%, #1a2e26 60%, #0e1c16 100%)",
          }}
        />
        {/* mat grid: real line divs — satori will not tile a repeating gradient */}
        {Array.from({ length: Math.ceil(size.width / 30) }, (_, i) => (
          <div
            key={`v${String(i)}`}
            style={{
              position: "absolute",
              top: 0,
              left: i * 30,
              width: 1,
              height: size.height,
              display: "flex",
              backgroundColor:
                i % 5 === 0 ? "rgba(232,168,90,0.16)" : "rgba(168,216,188,0.11)",
            }}
          />
        ))}
        {Array.from({ length: Math.ceil(size.height / 30) }, (_, i) => (
          <div
            key={`h${String(i)}`}
            style={{
              position: "absolute",
              left: 0,
              top: i * 30,
              height: 1,
              width: size.width,
              display: "flex",
              backgroundColor:
                i % 5 === 0 ? "rgba(232,168,90,0.16)" : "rgba(168,216,188,0.11)",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 900,
            padding: "50px 58px",
            borderRadius: 22,
            backgroundColor: "#f7f3ea",
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            transform: "rotate(-0.7deg)",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, color: "#e2793c", fontFamily: "Caveat" }}>
            hey — I&apos;m
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#23211d",
              letterSpacing: -2,
            }}
          >
            {siteConfig.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: "#b8551f",
              fontFamily: "Caveat",
              marginTop: 8,
            }}
          >
            {siteConfig.heroKicker}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              lineHeight: 1.45,
              color: "#635c50",
              marginTop: 22,
              maxWidth: 800,
            }}
          >
            I ship small, useful tools — Cuprim for macOS, AlgoViz for ML, and
            full-stack web work in React and Node.
          </div>

          <div style={{ display: "flex", gap: 11, marginTop: 28 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 17px",
                  borderRadius: 999,
                  backgroundColor: "#ece5d5",
                  color: "#635c50",
                  fontSize: 20,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              paddingTop: 20,
              borderTop: "1px solid #e2dccd",
              color: "#948b7c",
              fontSize: 21,
            }}
          >
            nawazishkhan.in
          </div>
        </div>

        {/* tape, painted last so it sits over the paper edge */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 525,
            width: 160,
            height: 36,
            display: "flex",
            backgroundColor: "rgba(243,235,200,0.7)",
            transform: "rotate(-4deg)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Caveat", data: caveat, weight: 600, style: "normal" },
      ],
    },
  );
}
