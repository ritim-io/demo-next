"use client";

import { useEffect, useState } from "react";

import {
  CLS_AD_DELAY_MS,
  CLS_AD_HEIGHT_PX,
  CLS_BANNER_DELAY_MS,
} from "@/app/_lab/config";

function useDelayedFlag(delayMs: number) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return shown;
}

/**
 * Renders nothing at first, then drops a banner into the top of the document
 * flow and shoves everything below it down the page.
 */
export function ClsBanner() {
  const shown = useDelayedFlag(CLS_BANNER_DELAY_MS);

  if (!shown) return null;

  return (
    <div className="w-full rounded-lg bg-amber-100 px-5 py-6 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
      <p className="text-base font-medium">
        Late promo banner, injected {CLS_BANNER_DELAY_MS}ms after hydration.
      </p>
      <p className="mt-1 text-sm opacity-80">
        No space was reserved for it, so every element below just moved.
      </p>
    </div>
  );
}

/**
 * An ad slot with no reserved height that pops open to its full size well after
 * first paint.
 */
export function ClsAdSlot() {
  const expanded = useDelayedFlag(CLS_AD_DELAY_MS);

  return (
    <div
      style={{ height: expanded ? CLS_AD_HEIGHT_PX : 0 }}
      className="w-full overflow-hidden"
    >
      <div
        className="flex w-full items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
        style={{ height: CLS_AD_HEIGHT_PX }}
      >
        Ad slot: 0px tall until {CLS_AD_DELAY_MS}ms, then {CLS_AD_HEIGHT_PX}px.
      </div>
    </div>
  );
}
