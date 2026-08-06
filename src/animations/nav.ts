import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

export function animateNavReveal(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const brand = qs(root, '[data-gsap="nav-brand"]');
  const links = qsa(root, '[data-gsap="nav-link"]');
  const cta = qs(root, '[data-gsap="nav-cta"]');

  const tl = gsap.timeline({ defaults: { ease: EASE.out } });
  if (brand) {
    gsap.set(brand, { opacity: 0, y: -10 });
    tl.to(brand, { opacity: 1, y: 0, duration: DURATION.fast }, 0.2);
  }
  if (links.length) {
    gsap.set(links, { opacity: 0, y: -8 });
    tl.to(links, { opacity: 1, y: 0, duration: DURATION.fast, stagger: 0.05 }, 0.28);
  }
  if (cta) {
    gsap.set(cta, { opacity: 0, y: -8 });
    tl.to(cta, { opacity: 1, y: 0, duration: DURATION.fast }, 0.4);
  }
}

export function animateMobileMenu(
  panel: HTMLElement,
  open: boolean
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) {
    gsap.set(panel, { autoAlpha: open ? 1 : 0 });
    return null;
  }

  const links = qsa(panel, '[data-gsap="mobile-link"]');
  const tl = gsap.timeline({ defaults: { ease: EASE.out } });

  if (open) {
    gsap.set(panel, { autoAlpha: 1 });
    gsap.set(links, { opacity: 0, y: 24 });
    tl.fromTo(
      panel,
      { backdropFilter: "blur(0px)" },
      { backdropFilter: "blur(16px)", duration: 0.35 },
      0
    ).to(links, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.08);
  } else {
    tl.to(links, { opacity: 0, y: -12, duration: 0.25, stagger: 0.03 }, 0).to(
      panel,
      { autoAlpha: 0, duration: 0.3 },
      0.1
    );
  }

  return tl;
}
