import { connection } from "next/server";

import { HERO_IMAGE_DELAY_MS, LCP_SERVER_DELAY_MS } from "@/app/_lab/config";

/**
 * Small on purpose: a tiny fallback means the real LCP candidate only shows up
 * once the stall below resolves.
 */
export function SlowHeroSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-7 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-8 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

export async function SlowHero() {
  // `connection()` opts the route out of prerendering, so the stall below is
  // paid on every request instead of once at build time.
  await connection();
  await new Promise((resolve) => setTimeout(resolve, LCP_SERVER_DELAY_MS));

  return (
    <div className="w-full space-y-6">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        This heading and the image below it are the LCP candidates, and neither
        one exists until the server has stalled for{" "}
        {(LCP_SERVER_DELAY_MS / 1000).toFixed(1)}s.
      </h1>
      {/* No width/height, so this also shifts the page when it finally decodes. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/api/hero-image"
        alt="Placeholder hero graphic served by a deliberately slow route handler"
        className="w-full rounded-lg"
      />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Server stall {LCP_SERVER_DELAY_MS}ms + image stall {HERO_IMAGE_DELAY_MS}
        ms, so LCP lands somewhere north of{" "}
        {((LCP_SERVER_DELAY_MS + HERO_IMAGE_DELAY_MS) / 1000).toFixed(1)}s.
      </p>
    </div>
  );
}
