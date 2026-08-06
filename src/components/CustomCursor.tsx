import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: GSAP quickTo only — no React state on mousemove
 * (state updates were re-rendering every frame and lagging Lenis scroll).
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    gsap.set(root, { autoAlpha: 0 });
    let shown = false;

    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set(root, { autoAlpha: 1 });
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const next = !!t?.closest(
        "a, button, [role='button'], input, textarea, label, .music-portfolio__item"
      );
      if (next === hoveringRef.current) return;
      hoveringRef.current = next;

      gsap.to(ring, { scale: next ? 1.85 : 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      gsap.to(dot, { scale: next ? 0.55 : 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
    };

    const leave = () => {
      shown = false;
      gsap.set(root, { autoAlpha: 0 });
    };
    const enter = () => {
      shown = true;
      gsap.set(root, { autoAlpha: 1 });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-200 hidden md:block"
      aria-hidden
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-8 w-8 rounded-full border border-white will-change-transform mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform mix-blend-difference"
      />
    </div>
  );
}
