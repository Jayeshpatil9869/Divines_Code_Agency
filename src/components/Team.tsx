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
