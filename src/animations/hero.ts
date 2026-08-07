import { gsap, EASE, DURATION, qs, qsa, splitWords, prefersReducedMotion } from "./utils";

export function animateHero(root: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(qsa(root, "[data-gsap]"), { opacity: 1, y: 0, clearProps: "transform" });
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

  const tl = gsap.timeline({ defaults: { ease: EASE.out } });

  if (beams) {
    gsap.fromTo(
      beams,
      { opacity: 0.35 },
      { opacity: 0.7, duration: 2.2, ease: EASE.soft }
    );
  }

  if (eyebrow) {
    gsap.set(eyebrow, { opacity: 0, y: 12 });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: DURATION.fast }, 0.15);
  }

  lines.forEach((line, i) => {
    const words = splitWords(line);
    gsap.set(words, { yPercent: 110, opacity: 0 });
    tl.to(
      words,
      {
        yPercent: 0,
        opacity: 1,
        duration: DURATION.slow,
        stagger: 0.04,
        ease: EASE.expo,
      },
      0.25 + i * 0.12
    );
  });

  if (sub) {
    gsap.set(sub, { opacity: 0, y: 20 });
    tl.to(sub, { opacity: 1, y: 0, duration: DURATION.base }, "-=0.55");
  }

  if (video) {
    gsap.set(video, { opacity: 0, y: 28, scale: 0.98 });
    tl.to(
      video,
      { opacity: 1, y: 0, scale: 1, duration: DURATION.base, ease: EASE.expo },
      "-=0.5"
    );
  }

  if (ctas.length) {
    gsap.set(ctas, { opacity: 0, y: 24 });
    tl.to(
      ctas,
      { opacity: 1, y: 0, duration: DURATION.base, stagger: 0.1 },
      "-=0.4"
    );
  }

  if (meta) {
    gsap.set(meta, { opacity: 0, y: 12 });
    tl.to(meta, { opacity: 1, y: 0, duration: DURATION.fast }, "-=0.25");
  }

  if (scroll) {
    gsap.set(scroll, { opacity: 0 });
    tl.to(scroll, { opacity: 1, duration: DURATION.fast }, "-=0.1");
    gsap.to(scroll.querySelector("[data-gsap='scroll-dot']"), {
      y: 10,
      opacity: 0.35,
      duration: 1.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
