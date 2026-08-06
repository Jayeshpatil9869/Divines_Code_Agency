import { gsap, prefersReducedMotion, EASE } from "./utils";

type SpotState = { x: number; y: number; r: number; opacity: number };

function activeRadius(wrap: HTMLElement) {
  return Math.min(220, Math.max(120, wrap.offsetWidth * 0.22));
}

/**
 * Smooth GSAP spotlight: lagged follow on --x/--y, radius in,
 * and out-fade (radius + opacity) on leave / blur.
 */
export function bindFooterSpotlight(wrap: HTMLElement): () => void {
  const beam = wrap.querySelector<HTMLElement>(".footer-spot__beam");
  if (!beam) return () => {};

  if (prefersReducedMotion()) {
    wrap.style.setProperty("--footer-spot-r", "60em");
    wrap.style.setProperty("--x", "50%");
    wrap.style.setProperty("--y", "50%");
    gsap.set(beam, { opacity: 1 });
    return () => {};
  }

  const state: SpotState = {
    x: wrap.offsetWidth / 2,
    y: wrap.offsetHeight / 2,
    r: 0,
    opacity: 0,
  };

  const apply = () => {
    wrap.style.setProperty("--x", `${state.x}px`);
    wrap.style.setProperty("--y", `${state.y}px`);
    wrap.style.setProperty("--footer-spot-r", `${state.r}px`);
    beam.style.opacity = String(state.opacity);
  };

  apply();

  const xTo = gsap.quickTo(state, "x", {
    duration: 0.55,
    ease: EASE.out,
    onUpdate: apply,
  });
  const yTo = gsap.quickTo(state, "y", {
    duration: 0.55,
    ease: EASE.out,
    onUpdate: apply,
  });

  let radiusTween: gsap.core.Tween | null = null;

  const openSpot = (x: number, y: number) => {
    xTo(x);
    yTo(y);
    radiusTween?.kill();
    radiusTween = gsap.to(state, {
      r: activeRadius(wrap),
      opacity: 1,
      duration: 0.7,
      ease: EASE.out,
      overwrite: "auto",
      onUpdate: apply,
    });
  };

  /** Out-fade: soft close — radius collapses + beam fades */
  const closeSpot = () => {
    radiusTween?.kill();
    radiusTween = gsap.to(state, {
      r: 0,
      opacity: 0,
      duration: 0.85,
      ease: "power2.inOut",
      overwrite: "auto",
      onUpdate: apply,
    });
  };

  const floodSpot = () => {
    radiusTween?.kill();
    const rect = wrap.getBoundingClientRect();
    xTo(rect.width / 2);
    yTo(rect.height / 2);
    radiusTween = gsap.to(state, {
      r: Math.max(rect.width, rect.height) * 1.4,
      opacity: 1,
      duration: 0.9,
      ease: EASE.expo,
      overwrite: "auto",
      onUpdate: apply,
    });
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = wrap.getBoundingClientRect();
    openSpot(e.clientX - rect.left, e.clientY - rect.top);
  };

  const onPointerEnter = (e: PointerEvent) => {
    const rect = wrap.getBoundingClientRect();
    // Snap follow origin so first open doesn't lag from off-screen
    state.x = e.clientX - rect.left;
    state.y = e.clientY - rect.top;
    apply();
    openSpot(state.x, state.y);
  };

  const onPointerLeave = () => closeSpot();

  const onFocus = () => floodSpot();
  const onBlur = () => closeSpot();

  wrap.addEventListener("pointerenter", onPointerEnter);
  wrap.addEventListener("pointermove", onPointerMove);
  wrap.addEventListener("pointerleave", onPointerLeave);
  wrap.addEventListener("focus", onFocus);
  wrap.addEventListener("blur", onBlur);

  return () => {
    wrap.removeEventListener("pointerenter", onPointerEnter);
    wrap.removeEventListener("pointermove", onPointerMove);
    wrap.removeEventListener("pointerleave", onPointerLeave);
    wrap.removeEventListener("focus", onFocus);
    wrap.removeEventListener("blur", onBlur);
    radiusTween?.kill();
    gsap.killTweensOf(state);
  };
}
