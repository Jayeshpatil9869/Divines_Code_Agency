import { gsap, ScrollTrigger, EASE, DURATION, qsa, prefersReducedMotion } from "./utils";

function revealNow(els: HTMLElement[], props: gsap.TweenVars = {}) {
  gsap.to(els, {
    opacity: 1,
    y: 0,
    x: 0,
    duration: DURATION.base,
    ease: EASE.out,
    stagger: 0.06,
    overwrite: "auto",
    ...props,
  });
}

function isInView(el: HTMLElement, offset = 0.92) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * offset && rect.bottom > 0;
}

export function animateServicesExperience(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const heroBits = qsa(root, "[data-gsap='svc-hero']");
  if (heroBits.length) {
    gsap.set(heroBits, { opacity: 0, y: 24 });
    revealNow(heroBits, { delay: 0.05, stagger: 0.08 });
  }

  qsa(root, "[data-gsap='svc-reveal']").forEach((el) => {
    gsap.set(el, { opacity: 0, y: 28 });
    if (isInView(el)) {
      revealNow([el]);
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => revealNow([el]),
    });
  });

  const indexRows = qsa(root, "[data-gsap='svc-index-row']");
  if (indexRows.length) {
    gsap.set(indexRows, { opacity: 0, x: -12 });
    const ready = indexRows.filter((el) => isInView(el));
    const deferred = indexRows.filter((el) => !isInView(el));
    if (ready.length) revealNow(ready, { stagger: 0.05 });
    if (deferred.length) {
      ScrollTrigger.batch(deferred, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => revealNow(batch as HTMLElement[], { stagger: 0.05 }),
      });
    }
  }

  qsa(root, "[data-gsap='svc-story']").forEach((el) => {
    const parts = qsa(el, "[data-gsap='svc-story-part']");
    if (!parts.length) return;
    gsap.set(parts, { opacity: 0, y: 20 });
    const play = () => revealNow(parts, { stagger: 0.07 });
    if (isInView(el, 0.85)) {
      play();
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: play,
    });
  });

  // Hash / Lenis may finish scrolling after setup — refresh triggers.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export function animateProcessItemOpen(panel: HTMLElement, tags?: NodeListOf<HTMLElement>) {
  if (prefersReducedMotion()) {
    gsap.set(panel, { height: "auto", opacity: 1 });
    return;
  }
  gsap.killTweensOf(panel);
  gsap.set(panel, { height: "auto", opacity: 1 });
  const fullH = panel.offsetHeight;
  gsap.fromTo(
    panel,
    { height: 0, opacity: 0 },
    {
      height: fullH,
      opacity: 1,
      duration: 0.45,
      ease: EASE.expo,
      overwrite: "auto",
      onComplete: () => gsap.set(panel, { height: "auto" }),
    }
  );
  if (tags?.length) {
    gsap.fromTo(
      tags,
      { y: 8, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.04,
        delay: 0.08,
        ease: EASE.out,
        overwrite: "auto",
      }
    );
  }
}

export function animateProcessItemClose(panel: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(panel, { height: 0, opacity: 0 });
    return;
  }
  gsap.killTweensOf(panel);
  gsap.set(panel, { height: panel.offsetHeight });
  gsap.to(panel, {
    height: 0,
    opacity: 0,
    duration: 0.35,
    ease: EASE.inOut,
    overwrite: "auto",
  });
}

export function scrollToServiceId(id: string) {
  const el = document.getElementById(`service-${id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

/** Soft hover lift for index arrows — call from pointer handlers. */
export function nudgeArrow(el: HTMLElement | null, active: boolean) {
  if (!el || prefersReducedMotion()) return;
  gsap.to(el, {
    x: active ? 4 : 0,
    y: active ? -4 : 0,
    duration: 0.35,
    ease: EASE.soft,
    overwrite: "auto",
  });
}
