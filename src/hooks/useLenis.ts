import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger, prefersReducedMotion } from "@/animations";

/** Module singleton — avoids React StrictMode double-mount fighting two Lenis instances */
let lenisSingleton: Lenis | null = null;
let subscribers = 0;
let tickerBound: ((time: number) => void) | null = null;
let scrollBound: (() => void) | null = null;

function createLenis() {
  registerGsapPlugins();

  const lenis = new Lenis({
    autoRaf: false,
    // Slightly higher lerp = snappier, less “heavy” lag behind the wheel
    lerp: 0.12,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.25,
    wheelMultiplier: 0.9,
    anchors: true,
    autoResize: true,
  });

  scrollBound = () => ScrollTrigger.update();
  lenis.on("scroll", scrollBound);

  tickerBound = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerBound);
  gsap.ticker.lagSmoothing(0);

  // One refresh after layout settles (fonts / images)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  return lenis;
}

function destroyLenis() {
  if (!lenisSingleton) return;

  if (scrollBound) {
    lenisSingleton.off("scroll", scrollBound);
    scrollBound = null;
  }
  if (tickerBound) {
    gsap.ticker.remove(tickerBound);
    tickerBound = null;
  }
  gsap.ticker.lagSmoothing(500, 33);
  lenisSingleton.destroy();
  lenisSingleton = null;
  ScrollTrigger.refresh();
}

/**
 * Document-level Lenis, GSAP-ticker driven + ScrollTrigger-synced.
 * Singleton-safe for StrictMode. Skips when prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    // Always land on the hero after refresh / remount (ignore browser scroll restore + hash).
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    subscribers += 1;
    if (!lenisSingleton) {
      lenisSingleton = createLenis();
    }

    lenisSingleton.scrollTo(0, { immediate: true });

    const onLoad = () => {
      lenisSingleton?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      subscribers = Math.max(0, subscribers - 1);
      // Delay destroy so StrictMode remount can reuse the same instance
      if (subscribers === 0) {
        queueMicrotask(() => {
          if (subscribers === 0) destroyLenis();
        });
      }
    };
  }, []);
}

export function getLenis() {
  return lenisSingleton;
}
