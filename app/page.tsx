import { Suspense } from "react";
import type { Metadata } from "next";

import { ClsAdSlot, ClsBanner } from "./_components/layout-shifters";
import { SlowButton } from "./_components/slow-button";
import { SlowHero, SlowHeroSkeleton } from "./_components/slow-hero";
import {
  CLS_AD_DELAY_MS,
  CLS_BANNER_DELAY_MS,
  HERO_IMAGE_DELAY_MS,
  INP_BLOCK_MS,
  LCP_SERVER_DELAY_MS,
} from "./_lab/config";

export const metadata: Metadata = {
  title: "Web Vitals Lab — intentionally bad page",
  description:
    "A demo page built to fail LCP, CLS and INP on purpose, for web vitals measurement.",
};

function Section({
  metric,
  title,
  detail,
  children,
}: {
  metric: string;
  title: string;
  detail: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="w-full space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <div className="space-y-1">
        <span className="inline-block rounded bg-red-100 px-2 py-0.5 font-mono text-xs font-semibold tracking-wide text-red-700 uppercase dark:bg-red-950 dark:text-red-300">
          {metric}
        </span>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          {title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{detail}</p>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-10 bg-white px-6 py-16 sm:px-16 dark:bg-black">
        <header className="space-y-2">
          <p className="font-mono text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
            Web Vitals Lab
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            Every section below is a deliberate anti-pattern. Tune the timings
            in <code className="font-mono text-[0.9em]">app/_lab/config.ts</code>
            .
          </p>
        </header>

        {/*
          Both shifters live above the fold on purpose: layout shift only counts
          elements that are actually in the viewport, so a late box further down
          the page would barely move the CLS number.
        */}
        <ClsBanner />
        <ClsAdSlot />

        <Section
          metric="LCP"
          title={`Hero is stalled for ~${((LCP_SERVER_DELAY_MS + HERO_IMAGE_DELAY_MS) / 1000).toFixed(1)}s`}
          detail={`The hero is a dynamic server component that sleeps ${LCP_SERVER_DELAY_MS}ms behind a Suspense boundary, and its image is a plain unsized <img> from a route handler that sleeps a further ${HERO_IMAGE_DELAY_MS}ms and sends no-store.`}
        >
          <Suspense fallback={<SlowHeroSkeleton />}>
            <SlowHero />
          </Suspense>
        </Section>

        <Section
          metric="CLS"
          title="Three unreserved boxes appear after first paint"
          detail={`The two boxes at the top of the page do the damage: the banner drops in at ${CLS_BANNER_DELAY_MS}ms and the ad slot expands at ${CLS_AD_DELAY_MS}ms, each pushing everything below it down. The hero image adds a third shift, since it has no width/height and only takes up space once it decodes.`}
        />

        <Section
          metric="INP"
          title={`Click handler blocks for ${INP_BLOCK_MS}ms`}
          detail="The handler busy-waits synchronously before updating state, so the browser cannot paint a response until it finishes. Anything over 200ms counts as a poor interaction."
        >
          <SlowButton />
        </Section>
      </main>
    </div>
  );
}
