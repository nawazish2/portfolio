import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { siteConfig } from "@/content/site";
import { ossContributions } from "@/content/opensource";

/**
 * The share card (LinkedIn, X, WhatsApp previews), rendered once at build
 * time in the site's dark theme. Fonts are read from src/og-fonts and never ship.
 */
export const prerender = true;

const size = { width: 1200, height: 630 };
const colors = {
  bg: "#0e1613",
  grid: "rgba(168,216,188,0.05)",
  text: "#f2f7f3",
  soft: "#bfd2c6",
  accent: "#f08c52",
  chip: "#16211c",
  line: "rgba(240,246,241,0.14)",
};

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.length === 1 ? children[0] : children },
});

const root = process.cwd();
const font = (file: string) => readFile(join(root, "src/og-fonts", file));

export const GET: APIRoute = async () => {
  const [inter, interBold, photo] = await Promise.all([
    font("Inter-Regular.ttf"),
    font("Inter-Bold.ttf"),
    sharp(join(root, "src/assets", siteConfig.profileImage)).resize(280, 280).jpeg({ quality: 85 }).toBuffer(),
  ]);

  const prs = ossContributions.filter((oss) => oss.status === "merged").length;
  const intro = siteConfig.intro.replace("{prs}", String(prs));
  const tags = siteConfig.featuredStack.slice(0, 6);

  // satori will not tile a repeating gradient, so the grid is real 1px lines.
  const grid = [
    ...Array.from({ length: Math.ceil(size.width / 30) }, (_, i) =>
      h("div", { position: "absolute", top: 0, left: i * 30, width: 1, height: size.height, backgroundColor: colors.grid }),
    ),
    ...Array.from({ length: Math.ceil(size.height / 30) }, (_, i) =>
      h("div", { position: "absolute", left: 0, top: i * 30, height: 1, width: size.width, backgroundColor: colors.grid }),
    ),
  ];

  const tree = h(
    "div",
    {
      position: "relative",
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 80px",
      backgroundColor: colors.bg,
      fontFamily: "Inter",
      color: colors.text,
    },
    ...grid,
    h(
      "div",
      { alignItems: "center", gap: 32 },
      {
        type: "img",
        props: {
          src: `data:image/jpeg;base64,${photo.toString("base64")}`,
          width: 140,
          height: 140,
          style: { borderRadius: 999, border: `3px solid ${colors.line}` },
        },
      },
      h(
        "div",
        { flexDirection: "column" },
        h("div", { fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }, siteConfig.name),
        h(
          "div",
          { fontSize: 32, fontWeight: 700, color: colors.accent, marginTop: 10 },
          `${siteConfig.role} · Swift & TypeScript`,
        ),
      ),
    ),
    h("div", { fontSize: 28, lineHeight: 1.45, color: colors.soft, marginTop: 36, maxWidth: 1000 }, intro),
    h(
      "div",
      { gap: 12, marginTop: 34 },
      ...tags.map((tag) =>
        h(
          "div",
          {
            padding: "8px 18px",
            borderRadius: 999,
            backgroundColor: colors.chip,
            border: `1px solid ${colors.line}`,
            fontSize: 22,
            color: colors.text,
          },
          tag,
        ),
      ),
    ),
    h(
      "div",
      {
        position: "absolute",
        left: 80,
        bottom: 44,
        width: size.width - 160,
        justifyContent: "space-between",
        fontSize: 22,
        color: colors.soft,
      },
      h("div", { color: colors.text, fontWeight: 700 }, "nawazishkhan.in"),
      h("div", {}, siteConfig.availability.split(" · ")[0]),
    ),
  );

  const svg = await satori(tree as never, {
    ...size,
    fonts: [
      { name: "Inter", data: inter, weight: 400, style: "normal" },
      { name: "Inter", data: interBold, weight: 700, style: "normal" },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
