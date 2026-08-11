import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";

/** Closed / open surface colors for FAQ rows */
export const FAQ_COLORS = {
  borderClosed: "rgba(255,255,255,0.12)",
  borderOpen: "rgba(172,142,108,0.65)", // primary bronze
  bgClosed: "rgba(0,0,0,0.6)",
  bgOpen: "rgba(172,142,108,0.08)",
  titleClosed: "rgba(255,255,255,0.72)",
  titleOpen: "rgba(255,255,255,1)",
  iconClosed: "rgba(255,255,255,0.35)",
  iconOpen: "rgba(172,142,108,1)",
  answer: "rgba(255,255,255,0.58)",
} as const;

/** FAQ: sticky header reveal + staggered accordion rows. */
export function animateFaq(root: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(qsa(root, "[data-gsap]"), {
      opacity: 1,
      y: 0,
      x: 0,
      clearProps: "transform",
    });
    return;
  }

  const header = qs(root, '[data-gsap="faq-header"]');
  const items = qsa(root, '[data-gsap="faq-item"]');

  if (header) {
    gsap.from(header, {
      opacity: 0,
      y: 28,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: header, start: "top 85%", once: true },
    });
  }

  items.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 32,
      duration: DURATION.base,
      ease: EASE.out,
      delay: 0.06 + i * 0.07,
      scrollTrigger: { trigger: item, start: "top 92%", once: true },
    });
  });
}

type FaqPanelEls = {
  item: HTMLElement;
  panel: HTMLElement;
  body: HTMLElement;
  title?: HTMLElement | null;
  icon?: Element | null;
};

/** Instant state (mount / reduced motion) — no tween. */
export function setFaqPanelState(els: FaqPanelEls, open: boolean) {
  const { item, panel, body, title, icon } = els;
  gsap.killTweensOf([item, panel, body, title, icon].filter(Boolean));

  gsap.set(panel, {
    height: open ? "auto" : 0,
    overflow: "hidden",
  });
  gsap.set(body, { y: 0, opacity: open ? 1 : 0 });
  if (icon)
    gsap.set(icon, {
      rotation: open ? 180 : 0,
      color: open ? FAQ_COLORS.iconOpen : FAQ_COLORS.iconClosed,
    });
  if (title)
    gsap.set(title, {
      color: open ? FAQ_COLORS.titleOpen : FAQ_COLORS.titleClosed,
    });
  gsap.set(item, {
    borderColor: open ? FAQ_COLORS.borderOpen : FAQ_COLORS.borderClosed,
    backgroundColor: open ? FAQ_COLORS.bgOpen : FAQ_COLORS.bgClosed,
  });
}

/** Smooth GSAP expand — height + colors + chevron on one timeline. */
export function expandFaqPanel(els: FaqPanelEls): gsap.core.Timeline {
  const { item, panel, body, title, icon } = els;
  gsap.killTweensOf([item, panel, body, title, icon].filter(Boolean));

  // Measure natural height while hidden
  gsap.set(panel, { height: "auto", overflow: "hidden" });
  const fullH = panel.offsetHeight;
  gsap.set(panel, { height: 0 });
  gsap.set(body, { y: 18, opacity: 0 });

  const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

  tl.to(
    item,
    {
      borderColor: FAQ_COLORS.borderOpen,
      backgroundColor: FAQ_COLORS.bgOpen,
      duration: 0.5,
      ease: EASE.soft,
    },
    0,
  );

  if (title) {
    tl.to(
      title,
      { color: FAQ_COLORS.titleOpen, duration: 0.4, ease: EASE.soft },
      0,
    );
  }
  if (icon) {
    tl.to(
      icon,
      {
        rotation: 180,
        color: FAQ_COLORS.iconOpen,
        duration: 0.45,
        ease: EASE.soft,
      },
      0,
    );
  }

  tl.to(
    panel,
    {
      height: fullH,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => gsap.set(panel, { height: "auto" }),
    },
    0,
  );

  tl.to(
    body,
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: EASE.out,
    },
    0.18,
  );

  return tl;
}

/** Smooth GSAP collapse. */
export function collapseFaqPanel(els: FaqPanelEls): gsap.core.Timeline {
  const { item, panel, body, title, icon } = els;
  gsap.killTweensOf([item, panel, body, title, icon].filter(Boolean));

  const currentH = panel.offsetHeight;
  gsap.set(panel, { height: currentH, overflow: "hidden" });

  const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

  tl.to(
    body,
    {
      y: 10,
      opacity: 0,
      duration: 0.28,
      ease: EASE.soft,
    },
    0,
  );

  tl.to(
    panel,
    {
      height: 0,
      duration: 0.55,
      ease: "power3.inOut",
    },
    0.08,
  );

  tl.to(
    item,
    {
      borderColor: FAQ_COLORS.borderClosed,
      backgroundColor: FAQ_COLORS.bgClosed,
      duration: 0.45,
      ease: EASE.soft,
    },
    0.05,
  );

  if (title) {
    tl.to(
      title,
      { color: FAQ_COLORS.titleClosed, duration: 0.35, ease: EASE.soft },
      0.05,
    );
  }
  if (icon) {
    tl.to(
      icon,
      {
        rotation: 0,
        color: FAQ_COLORS.iconClosed,
        duration: 0.4,
        ease: EASE.soft,
      },
      0.05,
    );
  }

  return tl;
}
