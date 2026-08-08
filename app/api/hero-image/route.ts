import { HERO_IMAGE_DELAY_MS } from "@/app/_lab/config";

const WIDTH = 1200;
const HEIGHT = 600;
const BLOB_COUNT = 1800;

/**
 * Deliberately slow, deliberately fat hero image.
 *
 * Responds after a delay with a large uncompressed SVG and `no-store`, so the
 * LCP candidate can never be served from cache on a repeat view.
 */
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, HERO_IMAGE_DELAY_MS));

  const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => {
    const x = (i * 97) % WIDTH;
    const y = (i * 61) % HEIGHT;
    const r = 6 + (i % 34);
    const hue = (i * 7) % 360;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="hsl(${hue} 80% 60%)" fill-opacity="0.35" />`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0b1120" />
  ${blobs}
  <text x="50%" y="50%" text-anchor="middle" font-family="monospace" font-size="64" fill="#ffffff">slow hero image</text>
  <text x="50%" y="50%" dy="52" text-anchor="middle" font-family="monospace" font-size="24" fill="#94a3b8">delayed ${HERO_IMAGE_DELAY_MS}ms &#183; no dimensions &#183; no cache</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
