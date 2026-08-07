import {
  gsap,
  Flip,
  registerGsapPlugins,
  prefersReducedMotion,
  EASE,
} from "./utils";

export type HeroVideoFlipEls = {
  frame: HTMLElement;
  slot: HTMLElement;
  hero: HTMLElement;
  backdrop: HTMLElement;
  closeBtn: HTMLElement;
};

function applyExpandedStyles(frame: HTMLElement) {
  frame.classList.add("is-expanded");
  gsap.set(frame, {
    position: "fixed",
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    width: "auto",
    height: "auto",
    borderRadius: 0,
    zIndex: 60,
  });
}

function applyCollapsedStyles(frame: HTMLElement) {
  frame.classList.remove("is-expanded");
  gsap.set(frame, {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    width: "100%",
    height: "100%",
    borderRadius: 2,
    zIndex: 1,
    clearProps: "transform",
  });
}

/** Expand video frame to cover the viewport (with margin for outside click) */
export function expandHeroVideo(els: HeroVideoFlipEls): gsap.core.Timeline | gsap.core.Tween {
  registerGsapPlugins();
  const { frame, backdrop, closeBtn } = els;

  gsap.killTweensOf([frame, backdrop, closeBtn]);

  if (prefersReducedMotion()) {
    document.body.appendChild(frame);
    applyExpandedStyles(frame);
    gsap.set(backdrop, { autoAlpha: 0.7, pointerEvents: "auto" });
    gsap.set(closeBtn, { autoAlpha: 1 });
    return gsap.timeline();
  }

  const state = Flip.getState(frame);
  document.body.appendChild(frame);
  applyExpandedStyles(frame);
  gsap.set(backdrop, { autoAlpha: 0, pointerEvents: "auto" });
  gsap.set(closeBtn, { autoAlpha: 0 });

  const flip = Flip.from(state, {
    duration: 1.1,
    ease: EASE.expoInOut,
    absolute: true,
  });

  const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
  tl.add(flip, 0);
  tl.to(backdrop, { autoAlpha: 0.72, duration: 0.55, ease: EASE.soft }, 0.05);
  tl.to(closeBtn, { autoAlpha: 1, duration: 0.4, ease: EASE.out }, 0.4);

  return tl;
}

/** Collapse video frame back into its slot */
export function collapseHeroVideo(els: HeroVideoFlipEls): gsap.core.Timeline | gsap.core.Tween {
  registerGsapPlugins();
  const { frame, slot, backdrop, closeBtn } = els;

  gsap.killTweensOf([frame, backdrop, closeBtn]);

  if (prefersReducedMotion()) {
    applyCollapsedStyles(frame);
    slot.appendChild(frame);
    gsap.set(backdrop, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(closeBtn, { autoAlpha: 0 });
    return gsap.timeline();
  }

  const state = Flip.getState(frame);
  applyCollapsedStyles(frame);
  slot.appendChild(frame);

  const flip = Flip.from(state, {
    duration: 0.9,
    ease: EASE.expoInOut,
    absolute: true,
  });

  const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
  tl.to(closeBtn, { autoAlpha: 0, duration: 0.2, ease: EASE.soft }, 0);
  tl.to(backdrop, { autoAlpha: 0, duration: 0.45, ease: EASE.soft, pointerEvents: "none" }, 0);
  tl.add(flip, 0);

  return tl;
}
