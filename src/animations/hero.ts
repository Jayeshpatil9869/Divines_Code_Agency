import { gsap, qs, qsa, prefersReducedMotion } from "./utils";

/**
 * Hero fade-reveal — matches reference choreography:
 * headline up → media up (overlap) → meta from the side (overlap).
 * Runs when ArcReveal curtain starts lifting.
 */
export function animateHero(root: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(qsa(root, "[data-gsap]"), {
      opacity: 1,
      y: 0,
      x: 0,
      clearProps: "transform",
    });
    return;
  }

  const eyebrow = qs(root, '[data-gsap="hero-eyebrow"]');
  const lines = qsa(root, '[data-gsap="hero-line"]');
  const sub = qs(root, '[data-gsap="hero-sub"]');
  const ctas = qsa(root, '[data-gsap="hero-cta"]');
  const video = qs(root, '[data-gsap="hero-video"]');
  const meta = qs(root, '[data-gsap="hero-meta"]');
  const scroll = qs(root, '[data-gsap="hero-scroll"]');
  const beams = qs(root, '[data-gsap="hero-bg"]');
  const content = qs(root, '[data-gsap="hero-content"]') ?? root;

  // Content shell visible; children drive the reveal.
  gsap.set(content, { opacity: 1 });

  const headline = [eyebrow, ...lines, sub].filter(Boolean);
  const media = [video, ...ctas].filter(Boolean);

  gsap.set(
    qsa(root, "[data-gsap]").filter((el) => el.getAttribute("data-gsap") !== "hero-content"),
    { opacity: 0 }
  );

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  if (beams) {
    tl.fromTo(beams, { opacity: 0 }, { opacity: 0.7, duration: 0.7 }, 0);
  }

  // Left copy — like `.popup h1` (fade + rise)
  if (headline.length) {
    gsap.set(headline, { y: 50, opacity: 0 });
    tl.to(
      headline,
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
      0.08
    );
  }

  // Right media + CTAs — like `.rightCtn .text h1` (larger y, heavy overlap)
  if (media.length) {
    gsap.set(media, { y: 160, opacity: 0 });
    tl.to(
      media,
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
      "-=0.55"
    );
  }

  // Bottom bar — like `.mDiv` (slide in from left, overlap)
  if (meta) {
    gsap.set(meta, { x: -60, opacity: 0 });
    tl.to(meta, { x: 0, opacity: 1, duration: 0.75 }, "-=0.55");
  }

  if (scroll) {
    // Nested under meta; ensure visible + idle pulse
    gsap.set(scroll, { opacity: 1 });
    const dot = scroll.querySelector("[data-gsap='scroll-dot']");
    if (dot) {
      gsap.to(dot, {
        y: 10,
        opacity: 0.35,
        duration: 1.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }
}
