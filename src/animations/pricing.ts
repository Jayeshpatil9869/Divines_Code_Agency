import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

/**
 * Pricing section: header reveal + staggered cards with inner choreography.
 * Featured plan enters with more travel so the eye lands on "Most booked".
 * Fine-pointer hover accents the price without fighting CSS card lifts.
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
  const note = qs(root, '[data-gsap="pricing-note"]');

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
    // Do not opacity-tween the Inquire CTA — a interrupted stagger left it stuck at 0.
    const parts = qsa(
      card,
      '[data-gsap-part]:not([data-gsap-part="price"])'
    );
    const price = qs(card, '[data-gsap-part="price"]');

    const enter = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 90%", once: true },
    });

    enter.from(card, {
      opacity: 0,
      y: featured ? 56 : 40,
      scale: featured ? 0.96 : 0.98,
      duration: featured ? DURATION.slow : DURATION.base,
      ease: EASE.out,
      delay: i * 0.08,
    });

    if (parts.length) {
      enter.fromTo(
        parts,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: EASE.out,
          clearProps: "opacity,transform",
        },
        "-=0.4"
      );
    }

    if (price) {
      enter.fromTo(
        price,
        { scale: 0.88, filter: "blur(4px)" },
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: EASE.expo,
          clearProps: "filter",
        },
        "-=0.3"
      );
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches || !price) return;

    const onEnter = () => {
      gsap.to(price, {
        scale: 1.04,
        duration: 0.4,
        ease: EASE.soft,
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(price, {
        scale: 1,
        duration: 0.45,
        ease: EASE.soft,
        overwrite: "auto",
      });
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
  });

  if (note) {
    gsap.from(note, {
      opacity: 0,
      y: 18,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: note, start: "top 92%", once: true },
    });
  }
}
