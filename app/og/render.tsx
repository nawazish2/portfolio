import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const ogAlt = `${siteConfig.name} — ${siteConfig.role}`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function toDataUri(bytes: Buffer, mime: string) {
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export async function renderOgImage() {
  const [serif, profile, banner] = await Promise.all([
    readFile(join(process.cwd(), "app/og/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "public/profile.jpg")),
    readFile(join(process.cwd(), "public/banner.jpg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f0e0e",
          color: "#fafafa",
        }}
      >
        <img
          alt=""
          src={toDataUri(banner, "image/jpeg")}
          width={1200}
          height={228}
          style={{
            width: 1200,
            height: 228,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            padding: "36px 56px 40px",
            gap: 36,
            borderTop: "1px solid #272727",
          }}
        >
          <img
            alt=""
            src={toDataUri(profile, "image/jpeg")}
            width={176}
            height={176}
            style={{
              width: 176,
              height: 176,
              borderRadius: 16,
              objectFit: "cover",
              border: "1px solid #3f3f3f",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 24,
                color: "#a3a3a3",
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.role}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 22,
                color: "#d4d4d4",
                lineHeight: 1.4,
              }}
            >
              {siteConfig.tagline}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: "#737373",
                fontSize: 18,
              }}
            >
              <div style={{ display: "flex" }}>
                Swift · TypeScript · Next.js
              </div>
              <div style={{ display: "flex", letterSpacing: "0.02em" }}>
                nawazish.site
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Instrument Serif",
          data: serif,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
