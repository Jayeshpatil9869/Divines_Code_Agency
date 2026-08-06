import { gsap, ScrollTrigger, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

/** Generic fade-up reveal for section children marked [data-gsap="reveal"] */
export function animateSectionReveals(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const items = qsa(root, '[data-gsap="reveal"]');
  if (!items.length) return;

  gsap.set(items, { opacity: 0, y: 28 });

  ScrollTrigger.batch(items, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: DURATION.base,
        ease: EASE.out,
        stagger: 0.08,
        overwrite: "auto",
      });
    },
  });
}

/** Soft scale+fade for cards */
export function animateCards(root: HTMLElement, selector = '[data-gsap="card"]') {
  if (prefersReducedMotion()) return;

  const cards = qsa(root, selector);
  if (!cards.length) return;

  gsap.set(cards, { opacity: 0, y: 36, scale: 0.98 });

  ScrollTrigger.batch(cards, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.base,
        ease: EASE.out,
        stagger: 0.1,
        overwrite: "auto",
      });
    },
  });
}

/** Subtle parallax on images inside [data-gsap="parallax"] */
export function animateParallax(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  qsa(root, '[data-gsap="parallax"]').forEach((el) => {
    const img = qs<HTMLImageElement>(el, "img") ?? (el as HTMLElement);
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );
  });
}

/** Footer / late sections soft rise */
export function animateFooter(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const parts = qsa(root, '[data-gsap="footer-item"]');
  if (!parts.length) return;

  gsap.from(parts, {
    opacity: 0,
    y: 24,
    duration: DURATION.base,
    ease: EASE.out,
    stagger: 0.06,
    scrollTrigger: {
      trigger: root,
      start: "top 92%",
      once: true,
    },
  });
}
