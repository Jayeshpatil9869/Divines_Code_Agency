# Team Section — Complete Bundle

Portable reference for recreating the Divines Code Agency **Team** section: layout, hover animations, carousel, GSAP motion, data, CSS, and master prompt.

**Source files:** `src/components/Team.tsx`, `src/animations/team.ts`, `src/data/team.ts`, `src/animations/sectionTheme.ts`, related hooks/utils, `text-shimmer`, and team CSS in `src/index.css`.

**Images:** `public/images/team/member-1.png`, `member-2.png`, `member-3.png` (also copied under `team-section-export/public/images/team/`).

---

## 1. Overview

A three-person team section with:

| Surface | Behavior |
|---|---|
| **Desktop (≥768px)** | 3-column grid of white portrait cards; hover/focus expands info panel |
| **Mobile (<768px)** | Horizontal carousel, drag + snap, autoplay 3s, prev/next + dots; info always open |
| **Scroll** | Section background scrubs black → white → black |
| **Enter** | Header + cards fade/slide up via ScrollTrigger |

**Stack:** React + Tailwind + GSAP (CustomEase, ScrollTrigger) + lucide-react icons.

**Deps:** `gsap`, `lucide-react`, `clsx`, `tailwind-merge`

---

## 2. Layout structure

```
section#team (bg scrub black↔white)
└─ .max-w-7xl
   ├─ header[data-gsap=team-header]
   │  ├─ eyebrow "Team"
   │  ├─ hairline rule
   │  ├─ h2 TextShimmer title
   │  └─ serif italic subcopy
   └─ TeamCarousel
      ├─ .team-viewport
      │  └─ track (flex carousel / md:grid-cols-3)
      │     └─ TeamCard × N
      │        ├─ button[data-team-image-wrap]
      │        │  ├─ img[data-team-image]
      │        │  ├─ bottom gradient veil
      │        │  └─ hover dark wash
      │        └─ div[data-team-info]
      │           └─ [data-team-info-inner]
      │              ├─ name + description
      │              └─ tag + socials | View Profile CTA
      └─ CarouselNavigation (mobile only)
```

### Card anatomy

- Outer: white `article`, `rounded-[28px]`, `p-3`, soft layered shadow
- Desktop aspect: `md:aspect-6/8`
- Image: `rounded-[20px]`, portrait crop, `object-cover`, origin **50% 100%**
- Info: collapsible height `0 ↔ auto` on desktop; always visible on mobile

### Design tokens (visual)

- Eyebrow: 11px bold uppercase, tracking 0.28em, `black/40`
- Title: clamp 1.75–2.5rem, black, uppercase, tight leading
- Subcopy: serif italic, `black/55`
- Name: ~1.7rem semibold, `neutral-950`
- Desc: ~0.95rem, `neutral-500`, line-clamp-4
- Tag/socials: pill `neutral-100`
- CTA: `#2c2c2c` → hover black, ArrowUpRight nudge
- Shadows deepen on `.is-expanded`

---

## 3. Interaction model

### Fine pointer `(hover: hover) and (pointer: fine)`
- `mouseenter` / focus-within → expand that card (`activeId`)
- `mouseleave` / blur out → collapse
- Escape collapses active card
- Click on image does **not** toggle (hover owns expand)

### Coarse pointer (tablet, not mobile carousel)
- Tap toggles expand; ignore if pointer moved >12px

### Mobile carousel
- Cards always expanded
- Drag with rubber-band (0.38), snap at 22% width or velocity >0.45
- Autoplay 3000ms when ≥35% in view; pauses on interaction / hidden tab
- Keyboard arrows when viewport focused

---

## 4. Animation system (GSAP)

### Constants
- Ease `teamFloat`: cubic-bezier(0.22, 1, 0.36, 1)
- Image origin: `50% 100%`
- Hover scale: `0.97`, image Y: `-6`, card lift Y: `-6`
- Float duration: `0.78s`

### Expand timeline
| Time | Target | Motion |
|---|---|---|
| 0.00 | card | y → -6 |
| 0.00 | image | scale 0.97, y -6 |
| 0.05 | info | height → full (0.62s power3.inOut) |
| 0.26 | name | y/autoAlpha in |
| 0.34 | desc | in |
| 0.42 | tag | in |
| 0.46 | cta | in |

### Collapse timeline
- Content out (stagger 0.035) → info height 0 → card/image return to rest

### Section enter
- Header: opacity/y 28, start top 85%
- Cards: opacity/y 40/scale 0.98, stagger 0.08, start top 90%

### Background scrub (`bindLightSectionBackground`)
- Enter: black → white; hold white; exit: white → black; scrub 0.45
- Reduced motion: solid white

---

## 5. Install & wire-up

```bash
npm i gsap lucide-react clsx tailwind-merge
```

Copy files into `src/` mirroring paths below. Import `styles/team.css` (or paste into global CSS). Place images in `public/images/team/`.

```tsx
import { Team } from "@/components/Team";

export default function Page() {
  return (
    <main className="bg-black">
      <Team />
    </main>
  );
}
```

Path alias `@/` → `src/` required.

---

## 6. Master prompt (recreate from scratch)

Use this if regenerating rather than pasting code:

> Build a premium Team section: white rounded-[28px] portrait cards on a scroll-scrubbed black↔white section. Desktop 3-col grid; hover expands info with GSAP (card y -6, image scale 0.97 from bottom origin 50% 100%, info height auto, staggered name/desc/tag/cta fade-up). CustomEase 0.22,1,0.36,1; float 0.78s. Mobile: full-width carousel, drag rubber-band, snap, 3s autoplay, dots+chevrons. Header: eyebrow, hairline, TextShimmer uppercase title, serif italic subcopy. No purple SaaS look, no bounce easing, no nested cards. data-* hooks for GSAP. Reduced-motion: instant states.

---

## 7. Complete source code

Paste each file to the path in its heading.

## 7.1 `src/components/Team.tsx`


### `src/components/Team.tsx`

```tsx
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { teamMembers, type TeamMember } from "@/data/team";
import {
  useGsap,
  animateTeamSection,
  collectTeamCardEls,
  setTeamCardState,
  expandTeamCard,
  collapseTeamCard,
  prefersReducedMotion,
  gsap,
} from "@/animations";

export function Team() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateTeamSection(root), [], { force: true });

  return (
    <section
      id="team"
      ref={rootRef}
      className="relative w-full bg-black py-16 text-black md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header data-gsap="team-header" className="mb-10 max-w-2xl md:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-black/40">
            Team
          </p>
          <div className="mt-3 mb-5 h-px w-12 bg-black/15" aria-hidden />
          <h2 className="mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]">
            <TextShimmer duration={3}>
              Meet the people behind the work.
            </TextShimmer>
          </h2>
          <p className="font-serif text-base font-normal italic normal-case tracking-normal text-black/55">
            Three people. Direct communication. The work, not the theatre around
            it.
          </p>
        </header>

        <TeamCarousel members={teamMembers} />
      </div>
    </section>
  );
}

const MOBILE_QUERY = "(max-width: 767px)";
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const TRACK_GAP = 20;
const DRAG_AXIS_PX = 8;
const SNAP_RATIO = 0.22;
const SNAP_VELOCITY = 0.45;
const SNAP_DURATION = 0.55;
const RUBBER = 0.38;
const AUTOPLAY_MS = 3000;
const SHIFT_MIN = 60;
const SHIFT_MAX = 100;
const SHIFT_RATIO = 0.18;

function matchesQuery(query: string) {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

function TeamCarousel({ members }: { members: TeamMember[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    vx: 0,
    axis: null as null | "x" | "y",
    dragging: false,
  });
  const autoplayRef = useRef({
    timer: null as number | null,
    dir: 1,
    interacting: false,
    inView: false,
  });
  const scheduleAutoplayRef = useRef<() => void>(() => {});
  const transitionTlRef = useRef<gsap.core.Timeline | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [showNav, setShowNav] = useState(() => matchesQuery(MOBILE_QUERY));
  const [hoverPointer, setHoverPointer] = useState(() => matchesQuery(HOVER_QUERY));

  indexRef.current = index;

  useEffect(() => {
    const navQuery = window.matchMedia(MOBILE_QUERY);
    const hoverQuery = window.matchMedia(HOVER_QUERY);
    const syncNav = () => setShowNav(navQuery.matches);
    const syncHover = () => setHoverPointer(hoverQuery.matches);
    syncNav();
    syncHover();
    navQuery.addEventListener("change", syncNav);
    hoverQuery.addEventListener("change", syncHover);
    return () => {
      navQuery.removeEventListener("change", syncNav);
      hoverQuery.removeEventListener("change", syncHover);
    };
  }, []);

  const slideSize = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    return viewport.clientWidth + TRACK_GAP;
  }, []);

  const restX = useCallback(
    (i: number) => -i * slideSize(),
    [slideSize],
  );

  const collectCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [] as HTMLElement[];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-team-card]"));
  }, []);

  const shiftPx = useCallback(() => {
    const width = viewportRef.current?.clientWidth ?? 360;
    return Math.min(SHIFT_MAX, Math.max(SHIFT_MIN, width * SHIFT_RATIO));
  }, []);

  const killShift = useCallback(() => {
    transitionTlRef.current?.kill();
    transitionTlRef.current = null;
    const track = trackRef.current;
    if (track) gsap.killTweensOf(track);
    gsap.killTweensOf(collectCards());
  }, [collectCards]);

  const resetCardShift = useCallback(() => {
    gsap.set(collectCards(), { x: 0, opacity: 1, scale: 1, force3D: true });
  }, [collectCards]);

  const syncAutoplayDir = useCallback(
    (prev: number, next: number) => {
      const last = members.length - 1;
      if (next >= last) autoplayRef.current.dir = -1;
      else if (next <= 0) autoplayRef.current.dir = 1;
      else if (next > prev) autoplayRef.current.dir = 1;
      else if (next < prev) autoplayRef.current.dir = -1;
    },
    [members.length],
  );

  const settleTo = useCallback(
    (next: number, fromDrag = false) => {
      const clamped = Math.max(0, Math.min(members.length - 1, next));
      const prev = indexRef.current;
      const track = trackRef.current;
      syncAutoplayDir(prev, clamped);
      setIndex(clamped);
      indexRef.current = clamped;
      if (!track) return;

      killShift();

      if (!showNav) {
        resetCardShift();
        gsap.set(track, { x: 0, clearProps: "transform" });
        return;
      }

      const targetX = restX(clamped);
      const cards = collectCards();
      const reduced = prefersReducedMotion();

      if (reduced) {
        resetCardShift();
        gsap.set(track, { x: targetX });
        return;
      }

      if (prev === clamped) {
        resetCardShift();
        gsap.to(track, {
          x: targetX,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
          force3D: true,
        });
        return;
      }

      const dir = clamped > prev ? 1 : -1;
      const shift = shiftPx();
      const outgoing = cards[prev];
      const incoming = cards[clamped];

      const tl = gsap.timeline({
        defaults: { overwrite: "auto", force3D: true },
        onComplete: () => {
          resetCardShift();
          transitionTlRef.current = null;
        },
      });

      if (fromDrag) {
        tl.to(
          track,
          { x: targetX, duration: 0.5, ease: "power3.out" },
          0,
        );
        if (incoming) {
          tl.to(
            incoming,
            { x: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
            0,
          );
        }
        if (outgoing) {
          tl.to(
            outgoing,
            {
              x: dir === 1 ? -shift * 0.4 : shift * 0.4,
              opacity: 0.7,
              scale: 0.985,
              duration: 0.35,
              ease: "power2.in",
            },
            0,
          );
        }
        transitionTlRef.current = tl;
        return;
      }

      if (outgoing) {
        tl.to(
          outgoing,
          {
            x: dir === 1 ? -shift : shift,
            opacity: 0.55,
            scale: 0.985,
            duration: 0.32,
            ease: "power2.in",
          },
          0,
        );
      }

      tl.to(
        track,
        { x: targetX, duration: SNAP_DURATION, ease: "power3.out" },
        0,
      );

      if (incoming) {
        tl.fromTo(
          incoming,
          {
            x: dir === 1 ? shift : -shift,
            opacity: 0.75,
            scale: 0.985,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          0.08,
        );
      }

      transitionTlRef.current = tl;
    },
    [
      collectCards,
      killShift,
      members.length,
      resetCardShift,
      restX,
      shiftPx,
      showNav,
      syncAutoplayDir,
    ],
  );

  const goTo = useCallback(
    (next: number) => {
      settleTo(next);
      scheduleAutoplayRef.current();
    },
    [settleTo],
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    killShift();
    resetCardShift();
    if (!showNav) {
      gsap.set(track, { x: 0, clearProps: "transform" });
      return;
    }
    gsap.set(track, { x: restX(indexRef.current) });
  }, [showNav, members.length, restX, killShift, resetCardShift]);

  useEffect(() => {
    if (!showNav) return;
    const onResize = () => {
      const track = trackRef.current;
      if (!track) return;
      gsap.set(track, { x: restX(indexRef.current) });
      resetCardShift();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showNav, restX, resetCardShift]);

  useEffect(() => {
    const clearTimer = () => {
      if (autoplayRef.current.timer == null) return;
      window.clearTimeout(autoplayRef.current.timer);
      autoplayRef.current.timer = null;
    };

    const schedule = () => {
      clearTimer();
      if (!showNav) return;
      if (autoplayRef.current.interacting) return;
      if (!autoplayRef.current.inView) return;
      if (document.hidden) return;
      autoplayRef.current.timer = window.setTimeout(() => {
        autoplayRef.current.timer = null;
        if (autoplayRef.current.interacting || !autoplayRef.current.inView || document.hidden) {
          return;
        }
        const last = members.length - 1;
        const current = indexRef.current;
        if (current >= last) autoplayRef.current.dir = -1;
        else if (current <= 0) autoplayRef.current.dir = 1;
        settleTo(current + autoplayRef.current.dir);
        schedule();
      }, AUTOPLAY_MS);
    };

    scheduleAutoplayRef.current = schedule;

    if (!showNav) {
      clearTimer();
      autoplayRef.current.inView = false;
      return () => {
        clearTimer();
        scheduleAutoplayRef.current = () => {};
      };
    }

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        autoplayRef.current.inView = Boolean(entry?.isIntersecting);
        if (autoplayRef.current.inView) schedule();
        else clearTimer();
      },
      { threshold: 0.35 },
    );
    observer.observe(viewport);

    const onVisibility = () => {
      if (document.hidden) clearTimer();
      else schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    schedule();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimer();
      scheduleAutoplayRef.current = () => {};
    };
  }, [showNav, members.length, settleTo]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!showNav || !viewport || !track) return;

    const rubber = (delta: number, i: number) => {
      const atStart = i <= 0 && delta > 0;
      const atEnd = i >= members.length - 1 && delta < 0;
      if (!atStart && !atEnd) return delta;
      const size = Math.max(slideSize(), 1);
      return (delta * RUBBER) / (1 + Math.abs(delta) / size);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if ((e.target as HTMLElement | null)?.closest("a")) return;
      autoplayRef.current.interacting = true;
      scheduleAutoplayRef.current();
      killShift();
      resetCardShift();
      gsap.killTweensOf(track);
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastT: performance.now(),
        vx: 0,
        axis: null,
        dragging: false,
      };
      viewport.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== e.pointerId) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (!drag.axis) {
        if (Math.hypot(dx, dy) < DRAG_AXIS_PX) return;
        drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (drag.axis === "x") {
          drag.dragging = true;
          viewport.style.touchAction = "none";
        }
      }
      if (drag.axis !== "x") return;
      e.preventDefault();
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.vx = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      const offset = rubber(dx, indexRef.current);
      gsap.set(track, { x: restX(indexRef.current) + offset });
    };

    const endDrag = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== e.pointerId) return;
      viewport.style.touchAction = "";
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
      const moved = drag.dragging;
      drag.pointerId = -1;
      drag.axis = null;
      drag.dragging = false;
      autoplayRef.current.interacting = false;
      if (!moved) {
        scheduleAutoplayRef.current();
        return;
      }
      const dx = e.clientX - drag.startX;
      const offset = rubber(dx, indexRef.current);
      const size = slideSize();
      const passed = Math.abs(offset) > size * SNAP_RATIO;
      const flicked = Math.abs(drag.vx) > SNAP_VELOCITY;
      let next = indexRef.current;
      if ((passed && offset < 0) || (flicked && drag.vx < 0)) next += 1;
      else if ((passed && offset > 0) || (flicked && drag.vx > 0)) next -= 1;
      settleTo(next, true);
      scheduleAutoplayRef.current();
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove, { passive: false });
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.style.touchAction = "";
    };
  }, [showNav, members.length, restX, settleTo, slideSize, killShift, resetCardShift]);

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "Escape" && activeId && hoverPointer) {
      e.preventDefault();
      setActiveId(null);
    }
  };

  const currentName = members[index]?.name ?? "";

  return (
    <div>
      <div
        ref={viewportRef}
        onKeyDown={onKeyNav}
        tabIndex={showNav ? 0 : undefined}
        className={cn(
          "team-viewport outline-none",
          showNav
            ? "overflow-hidden touch-pan-y select-none"
            : "overflow-visible",
        )}
        aria-label="Team members"
        aria-roledescription={showNav ? "carousel" : undefined}
      >
        <div
          ref={trackRef}
          className="flex w-full gap-5 will-change-transform md:grid md:grid-cols-3 md:translate-x-0 md:will-change-auto"
        >
          {members.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              expanded={showNav || activeId === member.id}
              isMobile={showNav}
              priority={i === 0}
              hoverPointer={hoverPointer}
              onOpen={() => setActiveId(member.id)}
              onClose={() =>
                setActiveId((current) =>
                  current === member.id ? null : current,
                )
              }
              onToggle={() =>
                setActiveId((current) =>
                  current === member.id ? null : member.id,
                )
              }
            />
          ))}
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {showNav
          ? `Team member ${index + 1} of ${members.length}: ${currentName}`
          : activeId
            ? `Showing profile for ${members.find((m) => m.id === activeId)?.name ?? ""}`
            : ""}
      </div>

      <CarouselNavigation
        count={members.length}
        index={index}
        visible={showNav}
        onPrev={() => goTo(index - 1)}
        onNext={() => goTo(index + 1)}
        onDot={goTo}
      />
    </div>
  );
}

function TeamCard({
  member,
  expanded,
  isMobile,
  priority,
  hoverPointer,
  onOpen,
  onClose,
  onToggle,
}: {
  member: TeamMember;
  expanded: boolean;
  isMobile: boolean;
  priority: boolean;
  hoverPointer: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ x: 0, dragging: false });

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const els = collectTeamCardEls(card);
    if (!els) return;
    setTeamCardState(els, isMobile);
  }, [isMobile]);

  const skipInitialCollapse = useRef(true);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || isMobile) return;
    const els = collectTeamCardEls(card);
    if (!els) return;
    if (skipInitialCollapse.current) {
      skipInitialCollapse.current = false;
      if (!expanded) return;
    }
    const tween = expanded ? expandTeamCard(els) : collapseTeamCard(els);
    return () => {
      tween.kill();
    };
  }, [expanded, isMobile]);

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    dragRef.current = { x: e.clientX, dragging: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (Math.abs(e.clientX - dragRef.current.x) > 12) {
      dragRef.current.dragging = true;
    }
  };

  const onActivate = () => {
    if (isMobile || hoverPointer || dragRef.current.dragging) return;
    onToggle();
  };

  const infoId = `team-info-${member.id}`;
  const toggleLabel = expanded
    ? `Hide profile for ${member.name}`
    : `View profile for ${member.name}, ${member.role}`;

  return (
    <article
      ref={cardRef}
      data-team-card
      data-gsap="team-card"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onMouseEnter={() => {
        if (hoverPointer) onOpen();
      }}
      onMouseLeave={() => {
        if (hoverPointer) onClose();
      }}
      onFocusCapture={() => {
        if (hoverPointer) onOpen();
      }}
      onBlurCapture={(e) => {
        if (!hoverPointer) return;
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return;
        onClose();
      }}
      className={cn(
        "team-card group relative flex h-auto w-full min-w-full shrink-0 basis-full flex-col rounded-[28px] bg-white p-3 select-none md:aspect-6/8 md:min-w-0 md:basis-auto md:w-full md:max-w-none md:shrink",
        "focus-within:ring-2 focus-within:ring-black/35 focus-within:ring-offset-4 focus-within:ring-offset-white",
      )}
    >
      <button
        type="button"
        data-team-image-wrap
        onClick={onActivate}
        aria-expanded={expanded}
        aria-controls={infoId}
        aria-label={toggleLabel}
        className="relative min-h-0 w-full flex-none aspect-4/5 cursor-pointer appearance-none overflow-hidden rounded-[20px] border-0 bg-transparent p-0 focus-visible:outline-none md:aspect-auto md:flex-1"
      >
        <img
          data-team-image
          src={member.image}
          alt=""
          width={720}
          height={1080}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "pointer-events-none absolute left-0 w-full origin-[50%_100%] object-cover will-change-transform",
            member.id === "sanket-gangurde"
              ? "top-0 h-full"
              : "top-[-11%] h-[120%]",
          )}
          style={{ objectPosition: member.imagePosition ?? "center 8%" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%] rounded-b-[20px] bg-linear-to-t from-black/90 via-black/45 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-[.is-expanded]:opacity-0"
        />
      </button>

      <div
        id={infoId}
        data-team-info
        className={cn("overflow-hidden", isMobile && "h-auto overflow-visible")}
        aria-hidden={!expanded}
        inert={!expanded || undefined}
      >
        <div
          data-team-info-inner
          className="flex cursor-pointer flex-col gap-5 px-2 pt-5 pb-2"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) return;
            onActivate();
          }}
        >
          <div className="min-w-0">
            <h3
              data-team-name
              className="font-sans text-[1.7rem] font-semibold leading-none tracking-[-0.03em] text-neutral-950 normal-case"
            >
              {member.name}
            </h3>
            <p
              data-team-desc
              className="mt-2.5 line-clamp-4 font-sans text-[0.95rem] font-normal leading-relaxed tracking-normal text-neutral-500 normal-case"
            >
              {member.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                data-team-tag
                className="inline-flex min-h-8 items-center rounded-full bg-neutral-100 px-3 text-[11px] font-medium tracking-wide text-neutral-600 normal-case"
              >
                {member.category}
              </span>
              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={expanded ? 0 : -1}
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors duration-300 hover:bg-neutral-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                >
                  <Linkedin className="size-3.5" aria-hidden />
                </a>
              ) : null}
              {member.githubUrl ? (
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={expanded ? 0 : -1}
                  aria-label={`${member.name} on GitHub`}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors duration-300 hover:bg-neutral-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                >
                  <Github className="size-3.5" aria-hidden />
                </a>
              ) : null}
              {member.instagramUrl ? (
                <a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={expanded ? 0 : -1}
                  aria-label={`${member.name} on Instagram`}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors duration-300 hover:bg-neutral-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                >
                  <Instagram className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </div>
            <a
              data-team-cta
              href={member.profileUrl}
              target={member.profileUrl.startsWith("http") ? "_blank" : undefined}
              rel={member.profileUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              tabIndex={expanded ? 0 : -1}
              className="group/cta inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#2c2c2c] px-5 text-[13px] font-medium tracking-normal text-white normal-case transition-colors duration-300 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
            >
              View Profile
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">{` for ${member.name}`}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function CarouselNavigation({
  count,
  index,
  visible,
  onPrev,
  onNext,
  onDot,
}: {
  count: number;
  index: number;
  visible: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  if (!visible) return null;

  const atStart = index <= 0;
  const atEnd = index >= count - 1;

  return (
    <div className="mt-6 flex items-center justify-center gap-5 md:hidden">
      <button
        type="button"
        onClick={onPrev}
        disabled={atStart}
        aria-label="Previous team member"
        className="flex size-11 items-center justify-center rounded-full bg-white text-black shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/8 transition-transform duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Team carousel position"
      >
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to team member ${i + 1} of ${count}`}
            onClick={() => onDot(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-6 bg-black"
                : "w-1.5 bg-black/25 hover:bg-black/45",
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={atEnd}
        aria-label="Next team member"
        className="flex size-11 items-center justify-center rounded-full bg-white text-black shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/8 transition-transform duration-300 hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}
```


## 7.2 `src/data/team.ts`


### `src/data/team.ts`

```ts
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  image: string;
  /** CSS object-position, e.g. "center top" */
  imagePosition?: string;
  profileUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "mahendra-nagpure",
    name: "Mahendra Nagpure",
    role: "Full Stack Developer (Backend)",
    description:
      "Full Stack Developer (Backend) â€” APIs, databases, and production systems.",
    category: "Backend",
    image: "/images/team/member-1.png",
    imagePosition: "center 18%",
    profileUrl: "https://mahendranagpure.com/",
    linkedinUrl: "https://www.linkedin.com/in/mahendra-nagpure/",
    githubUrl: "https://github.com/Mahendra111111",
  },
  {
    id: "jayesh-patil",
    name: "Jayesh Patil",
    role: "Full Stack Developer (Frontend UI/UX)",
    description:
      "Full Stack Developer (Frontend UI/UX) â€” interfaces, motion, and product craft.",
    category: "Frontend",
    image: "/images/team/member-2.png",
    imagePosition: "center 10%",
    profileUrl: "https://jayeshbpatil.com/",
    linkedinUrl: "https://www.linkedin.com/in/jayeshpatilfs",
    githubUrl: "https://github.com/Jayeshpatil9869",
  },
  {
    id: "sanket-gangurde",
    name: "Sanket Gangurde",
    role: "Influencer",
    description:
      "Influencer connecting Divine's Code with the people who need the work.",
    category: "Influencer",
    image: "/images/team/member-3.png",
    imagePosition: "center 4%",
    profileUrl: "https://www.instagram.com/malegaon_travelling",
    instagramUrl: "https://www.instagram.com/malegaon_travelling",
  },
];
```


## 7.3 `src/animations/team.ts`


### `src/animations/team.ts`

```ts
import { CustomEase } from "gsap/CustomEase";
import { gsap, EASE, DURATION, qs, qsa, prefersReducedMotion } from "./utils";
import { bindLightSectionBackground } from "./sectionTheme";

gsap.registerPlugin(CustomEase);

/** Premium settle â€” cubic-bezier(0.22, 1, 0.36, 1) */
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

/** Instant collapsed / expanded â€” used on mount and reduced-motion. */
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
```


## 7.4 `src/animations/sectionTheme.ts`


### `src/animations/sectionTheme.ts`

```ts
import { gsap, prefersReducedMotion, registerGsapPlugins } from "./utils";

const LIGHT = "#ffffff";
const DARK = "#000000";

/**
 * ScrollTrigger backgroundColor for this section only (Logos / Philosophy).
 * Page shell and neighboring sections stay black â€” no global theme flip.
 *
 * Scroll progress through the section:
 *   enter â†’ black to white â†’ hold white â†’ exit â†’ white to black
 */
export function bindLightSectionBackground(section: HTMLElement): void {
  registerGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set(section, { backgroundColor: LIGHT });
    return;
  }

  gsap.set(section, { backgroundColor: DARK });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 0.45,
    },
  });

  tl.fromTo(
    section,
    { backgroundColor: DARK },
    { backgroundColor: LIGHT, duration: 0.22, ease: "none" }
  )
    .to(section, { backgroundColor: LIGHT, duration: 0.56, ease: "none" })
    .to(section, { backgroundColor: DARK, duration: 0.22, ease: "none" });
}
```


## 7.5 `src/animations/hooks.ts`


### `src/animations/hooks.ts`

```ts
import { useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "./utils";

type SetupFn = (root: HTMLElement) => void;

/**
 * Runs a GSAP setup inside gsap.context scoped to `rootRef`.
 * Cleans up on unmount. Skips when prefers-reduced-motion is on
 * unless `force` is true.
 */
export function useGsap(
  rootRef: RefObject<HTMLElement | null>,
  setup: SetupFn,
  deps: DependencyList = [],
  options?: { force?: boolean }
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion() && !options?.force) {
      gsap.set(root.querySelectorAll("[data-gsap]"), {
        clearProps: "all",
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      setupRef.current(root);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
```


## 7.6 `src/animations/utils.ts`


### `src/animations/utils.ts`

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Default ease for premium editorial motion */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  soft: "power2.out",
} as const;

export const DURATION = {
  fast: 0.45,
  base: 0.7,
  slow: 1.1,
} as const;

/** Split text into words (Club SplitText alternative â€” free) */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.innerHTML = "";
  const words = text.split(/(\s+)/);
  const spans: HTMLSpanElement[] = [];

  for (const part of words) {
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      continue;
    }
    const wrap = document.createElement("span");
    wrap.className = "gsap-word inline-block overflow-hidden align-bottom";
    const inner = document.createElement("span");
    inner.className = "gsap-word-inner inline-block will-change-transform";
    inner.textContent = part;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    spans.push(inner);
  }

  el.setAttribute("aria-hidden", "true");
  return spans;
}

export function qsa<T extends Element = HTMLElement>(
  root: Element,
  selector: string
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function qs<T extends Element = HTMLElement>(
  root: Element,
  selector: string
): T | null {
  return root.querySelector<T>(selector);
}

export { gsap, ScrollTrigger, Flip };
```


## 7.7 `src/animations/index.ts` (team-only barrel)


### `src/animations/index.ts`

```ts
/** Minimal barrel â€” team section only. Merge into your existing animations/index if you already have one. */
export {
  registerGsapPlugins,
  prefersReducedMotion,
  gsap,
  ScrollTrigger,
  Flip,
  EASE,
  DURATION,
} from "./utils";
export { useGsap } from "./hooks";
export { bindLightSectionBackground } from "./sectionTheme";
export {
  animateTeamSection,
  collectTeamCardEls,
  setTeamCardState,
  expandTeamCard,
  collapseTeamCard,
} from "./team";
export type { TeamCardEls } from "./team";
```


## 7.8 `src/components/ui/text-shimmer.tsx`


### `src/components/ui/text-shimmer.tsx`

```tsx
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TextShimmer({
  children,
  className,
  duration = 2.5,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <span
      className={cn(
        "bg-[linear-gradient(90deg,#000_0%,#fff_35%,var(--shimmer-color)_50%,#fff_65%,#000_100%)] bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
      style={{
        animation: `text-shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
```


## 7.9 `src/lib/utils.ts` (cn helper)


### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```


## 7.10 Team CSS (append to global stylesheet)


### `team.css / src/index.css fragment`

```css
/* Required CSS variables + shimmer for Team section */
:root {
  --shimmer-color: #e8d5b5;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes text-shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: -200% center;
  }
}

/* Team carousel */
.team-viewport {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.team-viewport::-webkit-scrollbar {
  display: none;
}

@media (max-width: 767px) {
  .team-viewport {
    overflow: hidden;
  }
}

.team-card {
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.04),
    0 14px 40px -18px rgb(0 0 0 / 0.16);
  transition: box-shadow 0.55s var(--ease-out-expo);
}

.team-card.is-raised,
.team-card.is-expanded {
  box-shadow:
    0 2px 6px rgb(0 0 0 / 0.05),
    0 24px 50px -20px rgb(0 0 0 / 0.2);
}

.team-card [data-team-image] {
  object-fit: cover;
  transform-origin: 50% 100%;
}
```


---

## 8. data-* hooks reference

| Attribute | Role |
|---|---|
| `data-gsap="team-header"` | Scroll reveal target |
| `data-gsap="team-card"` | Scroll reveal target |
| `data-team-card` | Card root / carousel query |
| `data-team-image-wrap` | Image button / expand control |
| `data-team-image` | Photo transform target |
| `data-team-info` | Collapsible height panel |
| `data-team-info-inner` | Measured scrollHeight for expand |
| `data-team-name` | Stagger reveal |
| `data-team-desc` | Stagger reveal |
| `data-team-tag` | Stagger reveal |
| `data-team-cta` | Stagger reveal + profile link |

---

## 9. Carousel constants

| Constant | Value | Meaning |
|---|---|---|
| `TRACK_GAP` | 20 | Gap between slides (px) |
| `DRAG_AXIS_PX` | 8 | Axis lock threshold |
| `SNAP_RATIO` | 0.22 | Drag distance to change slide |
| `SNAP_VELOCITY` | 0.45 | Flick velocity threshold |
| `SNAP_DURATION` | 0.55 | Settle duration (s) |
| `RUBBER` | 0.38 | Edge rubber-band |
| `AUTOPLAY_MS` | 3000 | Autoplay interval |
| `SHIFT_MIN/MAX` | 60 / 100 | Card shift during transition |
| `SHIFT_RATIO` | 0.18 | Shift as % of viewport width |

---

## 10. Accessibility checklist

- Carousel `aria-label`, `aria-roledescription` on mobile
- Live region announces current member / expanded profile
- Image button: `aria-expanded`, `aria-controls`, descriptive label
- Collapsed interactive links: `tabIndex={-1}`
- Card `focus-within` ring
- `prefers-reduced-motion` skips tweens
- Social/profile links: `rel="noopener noreferrer"` when external

---

## 11. Assets

Copy from `team-section-export/public/images/team/` or original `public/images/team/`:

- `member-1.png` — Mahendra Nagpure
- `member-2.png` — Jayesh Patil
- `member-3.png` — Sanket Gangurde

Per-member `imagePosition` / crop overrides live in `data/team.ts` and `Team.tsx` (Sanket uses full-bleed `top-0 h-full`; others `top-[-11%] h-[120%]`).

---

*Generated from Divines_Code_Agency Team section source. Exact code, no paraphrasing of implementation files.*
