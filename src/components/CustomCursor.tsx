import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor: solid center dot (snappy) + outer ring (lagged) via GSAP.
 * Desktop only; hidden when prefers-reduced-motion (gated by App).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hoveringRef = useRef(false);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Dot tracks tightly; ring trails with softer ease
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const move = (e: MouseEvent) => {
      setVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const next = !!t?.closest("a, button, [role='button'], input, textarea, label, .music-portfolio__item");
      if (next === hoveringRef.current) return;
      hoveringRef.current = next;

      gsap.to(ring, {
        scale: next ? 1.85 : 1,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: next ? 0.55 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

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
      className="pointer-events-none fixed inset-0 z-200 hidden md:block"
      aria-hidden
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Lagging outer ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-8 w-8 rounded-full border border-neutral-950 will-change-transform mix-blend-difference"
        style={{ borderColor: "white" }}
      />
      {/* Snappy center dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white will-change-transform mix-blend-difference"
      />
    </div>
  );
}
