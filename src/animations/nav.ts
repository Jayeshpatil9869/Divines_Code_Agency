import { gsap, EASE, qs, qsa, prefersReducedMotion } from "./utils";

/**
 * Nav fade-reveal — reference style: whole bar drops in from above.
 * Then a light ScrollTrigger scrub eases the shell as you leave the hero.
 */
export function animateNavReveal(root: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(qsa(root, "[data-gsap]"), {
      opacity: 1,
      y: 0,
      clearProps: "transform",
    });
    return;
  }

  const brand = qs(root, '[data-gsap="nav-brand"]');
  const links = qsa(root, '[data-gsap="nav-link"]');
  const cta = qs(root, '[data-gsap="nav-cta"]');
  const shell = qs(root, '[data-gsap="nav-shell"]') ?? root;
  const parts = [brand, ...links, cta].filter(Boolean);

  gsap.set([shell, ...parts], { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  // Whole nav — like `tl.from("nav", { y: -50, opacity: 0 })`
  gsap.set(shell, { y: -50, opacity: 0 });
  tl.to(shell, { y: 0, opacity: 1, duration: 0.7 }, 0);

  if (parts.length) {
    gsap.set(parts, { y: -24, opacity: 0 });
    tl.to(
      parts,
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.05 },
      "-=0.35"
    );
  }

  // Scrub: subtle vertical ease on the fixed header while leaving the hero
  const hero = document.getElementById("hero");
  if (hero) {
    gsap.fromTo(
      root,
      { y: 0 },
      {
        y: -8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
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
