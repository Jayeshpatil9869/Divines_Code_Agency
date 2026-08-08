import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

/**
 * Pricing section: header reveal + staggered cards.
 * Featured plan enters with more travel so the eye lands on "Most booked".
 */
export function animatePricing(root: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(qsa(root, "[data-gsap]"), {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: "transform",
    });
    return;
  }

  const header = qs(root, '[data-gsap="pricing-header"]');
  const cards = qsa(root, '[data-gsap="pricing-card"]');

  if (header) {
    gsap.from(header, {
      opacity: 0,
      y: 28,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: header, start: "top 85%", once: true },
    });
  }

  cards.forEach((card, i) => {
    const featured = card.getAttribute("data-popular") === "true";

    gsap.from(card, {
      opacity: 0,
      y: featured ? 56 : 40,
      scale: featured ? 0.96 : 0.98,
      duration: featured ? DURATION.slow : DURATION.base,
      ease: EASE.out,
      delay: i * 0.08,
      scrollTrigger: { trigger: card, start: "top 90%", once: true },
    });
  });
}
