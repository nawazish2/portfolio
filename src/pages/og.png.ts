import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { siteConfig } from "@/content/site";

/**
 * The share card, rendered once at build time: cream paper taped to the green
 * mat — the site in miniature. Fonts are read from src/og-fonts and never ship.
 */
export const prerender = true;

const size = { width: 1200, height: 630 };
const tags = ["Swift", "SwiftUI", "TypeScript", "React", "Next.js", "Node.js"];

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.length === 1 ? children[0] : children },
});

const font = (file: string) => readFile(join(process.cwd(), "src/og-fonts", file));

export const GET: APIRoute = async () => {
  const [inter, interBold, caveat] = await Promise.all([
    font("Inter-Regular.ttf"),
    font("Inter-Bold.ttf"),
    font("Caveat-SemiBold.ttf"),
  ]);

  // satori will not tile a repeating gradient, so the mat grid is real 1px lines.
  const line = (i: number) => (i % 5 === 0 ? "rgba(232,168,90,0.16)" : "rgba(168,216,188,0.11)");
  const vertical = Array.from({ length: Math.ceil(size.width / 30) }, (_, i) =>
    h("div", { position: "absolute", top: 0, left: i * 30, width: 1, height: size.height, backgroundColor: line(i) }),
  );
  const horizontal = Array.from({ length: Math.ceil(size.height / 30) }, (_, i) =>
    h("div", { position: "absolute", left: 0, top: i * 30, height: 1, width: size.width, backgroundColor: line(i) }),
  );

  const card = h(
    "div",
    {
      flexDirection: "column",
      width: 900,
      padding: "50px 58px",
      borderRadius: 22,
      backgroundColor: "#f7f3ea",
      boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
      transform: "rotate(-0.7deg)",
    },
    h("div", { fontSize: 34, color: "#e2793c", fontFamily: "Caveat" }, "hey — I'm"),
    h("div", { fontSize: 84, fontWeight: 700, color: "#23211d", letterSpacing: -2 }, siteConfig.name),
    h("div", { fontSize: 38, color: "#b8551f", fontFamily: "Caveat", marginTop: 8 }, siteConfig.heroKicker),
    h(
      "div",
      { fontSize: 24, lineHeight: 1.45, color: "#635c50", marginTop: 22, maxWidth: 800 },
      "I ship small, useful tools — Cuprim for macOS, CampusForms for campus life, and full-stack web work in React and Node.",
    ),
    h(
      "div",
      { gap: 11, marginTop: 28 },
      ...tags.map((tag) =>
        h("div", { padding: "8px 17px", borderRadius: 999, backgroundColor: "#ece5d5", color: "#635c50", fontSize: 20 }, tag),
      ),
    ),
    h(
      "div",
      { marginTop: 30, paddingTop: 20, borderTop: "1px solid #e2dccd", color: "#948b7c", fontSize: 21 },
      "nawazishkhan.in",
    ),
  );

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1a2e26",
      fontFamily: "Inter",
    },
    h("div", {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(130% 95% at 50% 30%, #2d4b3d 0%, #1a2e26 60%, #0e1c16 100%)",
    }),
    ...vertical,
    ...horizontal,
    card,
    // tape, painted last so it sits over the paper edge
    h("div", {
      position: "absolute",
      top: 44,
      left: 525,
      width: 160,
      height: 36,
      backgroundColor: "rgba(243,235,200,0.7)",
      transform: "rotate(-4deg)",
    }),
  );

  const svg = await satori(tree as never, {
    ...size,
    fonts: [
      { name: "Inter", data: inter, weight: 400, style: "normal" },
      { name: "Inter", data: interBold, weight: 700, style: "normal" },
      { name: "Caveat", data: caveat, weight: 600, style: "normal" },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
