import type { ImageMetadata } from "astro";

/**
 * Content files refer to images by their old public path ("/projects/x.jpg").
 * The files now live in src/assets so Astro can resize them and convert them to
 * AVIF/WebP at build time; this maps one to the other.
 */
const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

export function localImage(publicPath: string): ImageMetadata | undefined {
  return files[`/src/assets${publicPath}`]?.default;
}
