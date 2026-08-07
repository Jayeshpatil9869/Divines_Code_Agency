import { gsap, prefersReducedMotion, registerGsapPlugins, qs } from "./utils";
import { bindLightSectionBackground } from "./sectionTheme";

/**
 * Philosophy: light-section bg scrub + opposing line drift.
 * - "Good design is" → slides right while scrolling down
 * - "what to leave out." → slides left
 * - Scrub reverses on scroll up
 * Motion starts once the section is mid-viewport (after color shift begins).
 */
export function animatePhilosophy(root: HTMLElement): void {
  registerGsapPlugins();
  bindLightSectionBackground(root);

  if (prefersReducedMotion()) return;

  const top = qs(root, '[data-gsap="phil-line-top"]');
  const bot = qs(root, '[data-gsap="phil-line-bot"]');
  if (!top || !bot) return;

  gsap.set([top, bot], { x: 0, force3D: true });

  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        // Start after bg has largely flipped to white
        start: "top 55%",
        end: "bottom 15%",
        scrub: 0.55,
      },
    })
    .fromTo(top, { x: 0 }, { x: "22vw" }, 0)
    .fromTo(bot, { x: 0 }, { x: "-22vw" }, 0);
}
