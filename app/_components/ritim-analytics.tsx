"use client";

import { useEffect } from "react";

import { init } from "@ritim/browser-sdk";

/** Public project key. Safe to ship to the browser — it identifies the project and grants no access. */
const RITIM_PROJECT_KEY = "P-PHYNBR";

/**
 * Starts Ritim RUM once, on the client.
 *
 * Mounted in the root layout so it covers every route. The SDK detects Next.js
 * client-side navigations on its own (it watches `history.pushState`, `popstate`
 * and friends), so there is no router hook to wire up here.
 *
 * Running from an effect rather than at import time costs nothing: every
 * observer registers for buffered entries, so metrics recorded before the SDK
 * evaluated — LCP, CLS, FCP, TTFB — are still picked up.
 */
export function RitimAnalytics() {
  useEffect(() => {
    // `init` is idempotent, so React's double-invoked effects in dev are fine.
    init({
      projectKey: RITIM_PROJECT_KEY,
      // This app exists to be measured, so measure every load instead of the
      // default 0.25. The collector still applies the project's own rate.
      sampleRate: 1,
      // Logs every payload to the console. Stripped from production builds.
      debug: true // process.env.NODE_ENV === "development",
    });
  }, []);

  return null;
}
