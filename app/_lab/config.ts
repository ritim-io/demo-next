/**
 * Tuning knobs for the Web Vitals lab page.
 *
 * This page is *intentionally* slow. Every value here maps to one Core Web
 * Vital so the numbers can be dialled in for whatever the measurement run
 * needs. Nothing here should ever be copied into real product code.
 */

/** Server-side stall before the hero (the LCP element) is streamed in. */
export const LCP_SERVER_DELAY_MS = 2500;

/** Extra stall inside the hero image route handler, on top of the above. */
export const HERO_IMAGE_DELAY_MS = 1500;

/** How long after hydration the promo banner drops in and pushes the page down. */
export const CLS_BANNER_DELAY_MS = 800;

/** How long after hydration the ad slot expands from 0px to its real height. */
export const CLS_AD_DELAY_MS = 1800;

/** Height the ad slot grows to, in pixels. Bigger height, bigger layout shift. */
export const CLS_AD_HEIGHT_PX = 280;

/** Main-thread block, in ms, run synchronously inside the button's click handler. */
export const INP_BLOCK_MS = 400;
