import {
  ogAlt,
  ogContentType,
  ogSize,
  renderOgImage,
} from "@/app/og/render";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return renderOgImage();
}
