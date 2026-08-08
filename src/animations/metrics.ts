import { gsap, ScrollTrigger, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

export function animateMetrics(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const header = qs(root, '[data-gsap="metrics-header"]');
    const cards = qsa(root, '[data-gsap="metric-card"]');

    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 24,
        duration: DURATION.base,
        ease: EASE.out,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    }

    cards.forEach((card) => {
      const num = qs(card, "[data-count]");
      gsap.from(card, {
        opacity: 0,
        y: 32,
        scale: 0.97,
        duration: DURATION.base,
        ease: EASE.out,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      });

      if (num) {
        const target = Number(num.getAttribute("data-count") || "0");
        const suffix = num.getAttribute("data-suffix") || "";
        const proxy = { val: 0 };
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              val: target,
              duration: 1.4,
              ease: EASE.out,
              onUpdate: () => {
                num.textContent = `${Math.round(proxy.val)}${suffix}`;
              },
            });
          },
        });
      }
    });
  });
}

export function animateProcess(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const line = qs(root, '[data-gsap="process-line"]');
    const steps = qsa(root, '[data-gsap="process-step"]');

    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        }
      );
    }

    steps.forEach((step) => {
      gsap.from(step, {
        opacity: 0,
        x: -16,
        duration: DURATION.base,
        ease: EASE.out,
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          once: true,
          onEnter: () => step.setAttribute("data-active", "true"),
        },
      });
    });
  });

  // Dual-layer vertical cover hover (desktop / fine pointer only)
  mm.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const steps = qsa(root, '[data-gsap="process-step"]');
      const cleanups: Array<() => void> = [];

      steps.forEach((step) => {
        const box1 = qs(step, '[data-gsap="process-box1"]');
        const box2 = qs(step, '[data-gsap="process-box2"]');
        if (!box1 || !box2) return;

        // Park cover above; resting layer visible
        gsap.set(box1, { y: "-100%" });
        gsap.set(box2, { y: "0%" });

        const onEnter = () => {
          gsap.to(box1, { y: "0%", duration: 0.6, ease: "power2.out", overwrite: "auto" });
          gsap.to(box2, { y: "100%", duration: 0.6, ease: "power2.out", overwrite: "auto" });
        };

        const onLeave = () => {
          gsap.to(box1, { y: "-100%", duration: 0.6, ease: "power2.out", overwrite: "auto" });
          gsap.to(box2, { y: "0%", duration: 0.6, ease: "power2.out", overwrite: "auto" });
        };

        step.addEventListener("mouseenter", onEnter);
        step.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          step.removeEventListener("mouseenter", onEnter);
          step.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }
  );
}

export function animateProjects(root: HTMLElement) {
  if (prefersReducedMotion()) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const cards = qsa(root, '[data-gsap="project-card"]');
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 48,
        duration: DURATION.slow,
        ease: EASE.out,
        delay: (i % 2) * 0.05,
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });
    });
  });

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    qsa(root, '[data-gsap="project-card"]').forEach((card) => {
      const media = qs(card, '[data-gsap="parallax"]');
      const img = media ? qs<HTMLImageElement>(media, "img") : null;
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.06 },
        {
          yPercent: 6,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        }
      );
    });
  });
}
