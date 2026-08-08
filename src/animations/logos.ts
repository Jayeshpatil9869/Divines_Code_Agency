import { gsap, prefersReducedMotion, registerGsapPlugins, qs } from "./utils";
import { bindLightSectionBackground } from "./sectionTheme";

/**
 * Logos strip: light-section bg scrub + horizontal marquee linked to scroll.
 * Scroll down → track moves left; scroll up → track moves right.
 */
export function animateLogos(root: HTMLElement): void {
  registerGsapPlugins();
  bindLightSectionBackground(root);

  const track = qs(root, '[data-gsap="logo-track"]');
  if (!track) return;

  // GSAP owns transform — kill any leftover CSS animation
  gsap.set(track, { animation: "none", force3D: true });

  if (prefersReducedMotion()) {
    gsap.set(track, { xPercent: 0 });
    return;
  }

  gsap.fromTo(
    track,
    { xPercent: 0 },
    {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.45,
      },
    }
  );
}
