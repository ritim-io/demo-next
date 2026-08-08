"use client";

import { useState } from "react";

import { INP_BLOCK_MS } from "@/app/_lab/config";

/** Busy-waits on the main thread. Real work, so nothing optimises it away. */
function blockMainThread(durationMs: number) {
  const deadline = performance.now() + durationMs;
  let sink = 0;
  while (performance.now() < deadline) {
    sink += Math.sqrt(sink + 1) % 7;
  }
  return sink;
}

export function SlowButton() {
  const [clicks, setClicks] = useState(0);
  const [lastDuration, setLastDuration] = useState<number | null>(null);

  function handleClick() {
    const start = performance.now();
    blockMainThread(INP_BLOCK_MS);
    // The state update lands only after the block, so the browser cannot paint
    // a response to the click until well past the 200ms "good INP" threshold.
    setClicks((count) => count + 1);
    setLastDuration(performance.now() - start);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleClick}
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Block the main thread for {INP_BLOCK_MS}ms
      </button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {clicks === 0
          ? "Not clicked yet."
          : `${clicks} click${clicks === 1 ? "" : "s"}, last handler took ${Math.round(
              lastDuration ?? 0,
            )}ms.`}
      </p>
    </div>
  );
}
