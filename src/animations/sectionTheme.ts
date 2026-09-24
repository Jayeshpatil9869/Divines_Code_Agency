import { gsap, prefersReducedMotion, registerGsapPlugins, ScrollTrigger } from "./utils";

const LIGHT = "#ffffff";
const DARK = "#000000";

/**
 * ScrollTrigger backgroundColor for light sections (Team / Philosophy).
 * Page shell and neighboring sections stay dark.
 *
 * Scroll progress through the section:
 *   enter → smooth blend from dark to light → hold pure white through content → exit → smooth blend back to dark
 */
export function bindLightSectionBackground(section: HTMLElement): void {
  registerGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set(section, { backgroundColor: LIGHT });
    return;
  }

  // Ensure default base background is light for high-contrast legibility
  gsap.set(section, { backgroundColor: LIGHT });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      end: "bottom 15%",
      scrub: 0.4,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    section,
    { backgroundColor: DARK },
    { backgroundColor: LIGHT, duration: 0.18, ease: "none" }
  )
    .to(section, { backgroundColor: LIGHT, duration: 0.64, ease: "none" })
    .to(section, { backgroundColor: DARK, duration: 0.18, ease: "none" });
}
