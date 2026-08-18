import { CustomEase } from "gsap/CustomEase";
import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";
import { bindLightSectionBackground } from "./sectionTheme";

gsap.registerPlugin(CustomEase);

/** Premium settle — cubic-bezier(0.22, 1, 0.36, 1) */
const TEAM_FLOAT_EASE = CustomEase.create("teamFloat", "0.22,1,0.36,1");

/** Scale from the bottom so shrinking creates headroom instead of eating the hairline. */
const IMAGE_ORIGIN = "50% 100%";
const IMAGE_HOVER_SCALE = 0.97;
const IMAGE_HOVER_Y = -6;
const IMAGE_FLOAT_DURATION = 0.78;

export type TeamCardEls = {
  card: HTMLElement;
  imageWrap: HTMLElement;
  image: HTMLElement;
  info: HTMLElement;
  infoInner: HTMLElement;
  name: HTMLElement;
  desc: HTMLElement;
  tag: HTMLElement;
  cta: HTMLElement;
};

function contentEls(els: TeamCardEls) {
  return [els.name, els.desc, els.tag, els.cta];
}

function allTargets(els: TeamCardEls) {
  return [els.card, els.imageWrap, els.image, els.info, ...contentEls(els)];
}

export function collectTeamCardEls(card: HTMLElement): TeamCardEls | null {
  const imageWrap = qs(card, "[data-team-image-wrap]");
  const image = qs(card, "[data-team-image]");
  const info = qs(card, "[data-team-info]");
  const infoInner = qs(card, "[data-team-info-inner]");
  const name = qs(card, "[data-team-name]");
  const desc = qs(card, "[data-team-desc]");
  const tag = qs(card, "[data-team-tag]");
  const cta = qs(card, "[data-team-cta]");
  if (
    !imageWrap ||
    !image ||
    !info ||
    !infoInner ||
    !name ||
    !desc ||
    !tag ||
    !cta
  ) {
    return null;
  }
  return { card, imageWrap, image, info, infoInner, name, desc, tag, cta };
}

function setImagePose(els: TeamCardEls, expanded: boolean) {
  gsap.set(els.image, {
    scale: expanded ? IMAGE_HOVER_SCALE : 1,
    y: expanded ? IMAGE_HOVER_Y : 0,
    transformOrigin: IMAGE_ORIGIN,
    force3D: true,
  });
}

/** Instant collapsed / expanded — used on mount and reduced-motion. */
export function setTeamCardState(els: TeamCardEls, expanded: boolean) {
  gsap.killTweensOf(allTargets(els));
  gsap.set(els.card, { y: expanded ? -6 : 0 });
  setImagePose(els, expanded);
  gsap.set(els.info, {
    height: expanded ? "auto" : 0,
    overflow: expanded ? "visible" : "hidden",
  });
  gsap.set(contentEls(els), {
    y: expanded ? 0 : 16,
    autoAlpha: expanded ? 1 : 0,
  });
  els.card.classList.toggle("is-expanded", expanded);
  els.card.classList.remove("is-raised");
}

export function expandTeamCard(els: TeamCardEls): gsap.core.Timeline {
  gsap.killTweensOf(allTargets(els));
  els.card.classList.remove("is-raised");
  gsap.set(els.image, { transformOrigin: IMAGE_ORIGIN, force3D: true });

  if (prefersReducedMotion()) {
    setTeamCardState(els, true);
    return gsap.timeline();
  }

  const fullH = els.infoInner.scrollHeight;
  gsap.set(els.info, { height: els.info.offsetHeight, overflow: "hidden" });
  gsap.set(contentEls(els), { y: 18, autoAlpha: 0 });

  const tl = gsap.timeline({
    defaults: { overwrite: "auto" },
    onStart: () => els.card.classList.add("is-expanded"),
    onComplete: () =>
      gsap.set(els.info, { height: "auto", overflow: "visible" }),
  });

  tl.to(
    els.card,
    { y: -6, duration: IMAGE_FLOAT_DURATION, ease: TEAM_FLOAT_EASE },
    0,
  );
  tl.to(
    els.image,
    {
      scale: IMAGE_HOVER_SCALE,
      y: IMAGE_HOVER_Y,
      duration: IMAGE_FLOAT_DURATION,
      ease: TEAM_FLOAT_EASE,
      force3D: true,
    },
    0,
  );
  tl.to(
    els.info,
    { height: fullH, duration: 0.62, ease: "power3.inOut" },
    0.05,
  );
  tl.to(els.name, { y: 0, autoAlpha: 1, duration: 0.42, ease: EASE.out }, 0.26);
  tl.to(els.desc, { y: 0, autoAlpha: 1, duration: 0.4, ease: EASE.out }, 0.34);
  tl.to(els.tag, { y: 0, autoAlpha: 1, duration: 0.32, ease: EASE.out }, 0.42);
  tl.to(els.cta, { y: 0, autoAlpha: 1, duration: 0.36, ease: EASE.out }, 0.46);

  return tl;
}

export function collapseTeamCard(els: TeamCardEls): gsap.core.Timeline {
  gsap.killTweensOf(allTargets(els));
  els.card.classList.remove("is-raised");
  gsap.set(els.image, { transformOrigin: IMAGE_ORIGIN, force3D: true });

  if (prefersReducedMotion()) {
    setTeamCardState(els, false);
    return gsap.timeline();
  }

  const currentH = els.info.offsetHeight;
  gsap.set(els.info, { height: currentH, overflow: "hidden" });

  const tl = gsap.timeline({
    defaults: { overwrite: "auto" },
    onComplete: () => {
      els.card.classList.remove("is-expanded");
      gsap.set(els.info, { height: 0, overflow: "hidden" });
    },
  });

  tl.to(
    [els.cta, els.tag, els.desc, els.name],
    { y: 12, autoAlpha: 0, duration: 0.28, stagger: 0.035, ease: EASE.soft },
    0,
  );
  tl.to(els.info, { height: 0, duration: 0.55, ease: "power3.inOut" }, 0.06);
  tl.to(
    els.card,
    { y: 0, duration: IMAGE_FLOAT_DURATION, ease: TEAM_FLOAT_EASE },
    0,
  );
  tl.to(
    els.image,
    {
      scale: 1,
      y: 0,
      duration: IMAGE_FLOAT_DURATION,
      ease: TEAM_FLOAT_EASE,
      force3D: true,
    },
    0,
  );

  return tl;
}

/** Scroll-in reveal for the section header + cards. */
export function animateTeamSection(root: HTMLElement) {
  bindLightSectionBackground(root);

  if (prefersReducedMotion()) return;

  const header = qs(root, '[data-gsap="team-header"]');
  const cards = qsa(root, '[data-gsap="team-card"]');

  if (header) {
    gsap.from(header, {
      opacity: 0,
      y: 28,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: header, start: "top 85%", once: true },
    });
  }

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: DURATION.slow,
      ease: EASE.out,
      delay: i * 0.08,
      scrollTrigger: { trigger: card, start: "top 90%", once: true },
    });
  });
}
