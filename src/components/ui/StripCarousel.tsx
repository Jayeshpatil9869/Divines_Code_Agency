import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextShimmer } from "@/components/ui/text-shimmer";
import "./strip-carousel.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectCard {
  id: string | number;
  number?: string;
  title: string;
  category: string;
  year: string;
  poster: string;
  video?: string;
  aspectVariant?: "wide" | "portrait" | "tall" | "landscape" | "square";
  link: string;
}

const DEFAULT_PROJECTS: ProjectCard[] = [
  {
    id: "azzato",
    number: "01",
    title: "Azzato",
    category: "Refonte éditoriale",
    year: "2026",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-lines-in-orange-and-black-40618-large.mp4",
    aspectVariant: "wide",
    link: "https://riyanshamrit.com/",
  },
  {
    id: "celine-savigny",
    number: "02",
    title: "Céline Savigny",
    category: "Branding & web",
    year: "2026",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    aspectVariant: "portrait",
    link: "https://gravitatee.com/",
  },
  {
    id: "vertical-view",
    number: "03",
    title: "Vertical View",
    category: "UX/UI & SEO",
    year: "2025",
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    aspectVariant: "tall",
    link: "https://pravin-realty.divinescode.com/",
  },
  {
    id: "david-dieu",
    number: "04",
    title: "David Dieu",
    category: "Plateforme créateur",
    year: "2026",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-433-large.mp4",
    aspectVariant: "landscape",
    link: "https://one-capital-premium-website.vercel.app/",
  },
  {
    id: "simontarea",
    number: "05",
    title: "Simon Tarea",
    category: "UX & conversion",
    year: "2026",
    poster: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41221-large.mp4",
    aspectVariant: "square",
    link: "https://tellstar.in/",
  },
];

const TILT_MATRIX = [-2.5, 2, -1.5, 3, -2, 1.5, -3, 2.5];

export interface StripCarouselProps {
  projects?: ProjectCard[];
  showHeading?: boolean;
  eyebrowNumber?: string;
  eyebrowText?: string;
  titleMain?: string;
  titleItalic?: string;
  introText?: string;
  footerLabel?: string;
  allProjectsLink?: string;
  allProjectsText?: string;
}

export function StripCarousel({
  projects = DEFAULT_PROJECTS,
  showHeading = true,
  eyebrowNumber = "02",
  eyebrowText = "Selected Work",
  titleMain = "See,",
  titleItalic = "before you read.",
  introText,
  footerLabel,
  allProjectsLink = "/showcase",
  allProjectsText = "All projects",
}: StripCarouselProps) {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const rail = railRef.current;
    const head = headRef.current;
    if (!container || !pin || !rail || projects.length < 2) return;

    const cards = Array.from(rail.querySelectorAll<HTMLAnchorElement>(".strip-card"));
    let localActiveIndex = -1;
    let focusedIndex = -1;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getScrollFactor = () => (window.innerWidth <= 560 ? 1.15 : window.innerWidth <= 900 ? 1.25 : 1.35);
    const getVerticalStep = () =>
      window.innerWidth <= 560
        ? Math.max(36, Math.min(52, window.innerHeight * 0.065))
        : window.innerWidth <= 900
        ? 64
        : Math.max(62, Math.min(72, window.innerHeight * 0.08));
    const getMobileHeadOffset = () => (window.innerWidth <= 560 ? -12 : 0);

    const getHeadBottomDistance = () =>
      head ? head.getBoundingClientRect().bottom - pin.getBoundingClientRect().top : 0;

    const getStartY = () => {
      const base = window.innerHeight * 0.14 + getMobileHeadOffset();
      if (window.innerWidth > 900 || !head) return base;
      const topOffset = parseFloat(getComputedStyle(rail).top) || 0;
      return Math.max(base, getHeadBottomDistance() + 16 - topOffset);
    };

    const getStartX = () => Math.min(window.innerWidth, 2048) * 0.12;

    const getEndX = () => {
      const maxW = Math.min(window.innerWidth, 2048);
      return -Math.max(rail.scrollWidth - maxW * 0.76, maxW * 0.35);
    };

    const getTotalPinDistance = () =>
      Math.round(Math.max((getStartX() - getEndX()) * getScrollFactor(), window.innerHeight * 0.6));

    const cardRotations = cards.map((_, i) => {
      const angle = TILT_MATRIX[i % TILT_MATRIX.length];
      const rotateZ = Math.max(-4, Math.min(4, angle * 0.55));
      const rotateY = Math.max(-4, Math.min(4, angle));
      return `rotate(${rotateZ}deg) rotateY(${rotateY}deg)`;
    });

    let currentVerticalStep = getVerticalStep();

    const updateCards = (progressVal: number, overrideIndex: number) => {
      const targetIdx =
        overrideIndex >= 0
          ? overrideIndex
          : Math.max(0, Math.min(cards.length - 1, Math.round(progressVal)));
      const normalizedProgress = overrideIndex >= 0 ? targetIdx : progressVal;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const dist = Math.abs(i - normalizedProgress);
        const clampedDist = Math.min(dist, 2);

        const yOffset = (i * currentVerticalStep).toFixed(2);
        const zOffset = Math.max(-180, 80 - dist * 105).toFixed(2);
        const scale = (1 - clampedDist * 0.055).toFixed(4);
        const opacity = (1 - clampedDist * 0.24).toFixed(4);

        card.style.transform = `translate3d(0px, ${yOffset}px, ${zOffset}px) ${cardRotations[i]} scale(${scale})`;
        card.style.opacity = opacity;
      }

      if (targetIdx !== localActiveIndex) {
        cards[localActiveIndex]?.classList.remove("is-dominant");
        cards[targetIdx]?.classList.add("is-dominant");
        localActiveIndex = targetIdx;
        setActiveProjectIndex(targetIdx);
        container.dataset.activeIndex = String(targetIdx);
      }
    };

    // Accessibility focus listeners
    const focusHandlers: { card: HTMLAnchorElement; onFocus: () => void; onBlur: () => void }[] = [];
    cards.forEach((card, idx) => {
      const onFocus = () => {
        focusedIndex = idx;
        updateCards(idx, idx);
      };
      const onBlur = () => {
        focusedIndex = -1;
        updateCards((tl?.scrollTrigger?.progress ?? 0) * (cards.length - 1), -1);
      };
      card.addEventListener("focus", onFocus);
      card.addEventListener("blur", onBlur);
      focusHandlers.push({ card, onFocus, onBlur });
    });

    container.classList.add("is-carousel-ready");
    container.dataset.activeIndex = "0";
    container.dataset.pinDistance = String(getTotalPinDistance());
    updateCards(0, -1);

    const nearTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => container.classList.toggle("strip--near", self.isActive),
    });

    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => {
            const pinDist = getTotalPinDistance();
            container.dataset.pinDistance = String(pinDist);
            return `+=${pinDist}`;
          },
          pin: pin,
          pinSpacing: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            updateCards(p * (cards.length - 1), focusedIndex);
          },
        },
      });

      tl.fromTo(
        rail,
        { x: getStartX, y: getStartY },
        { x: getEndX, y: () => getStartY() - (cards.length - 1) * getVerticalStep() },
        0
      );

      const introEl = container.querySelector(".strip__intro");
      if (introEl) {
        tl.to(
          introEl,
          {
            opacity: () => (window.innerWidth <= 900 ? 0 : 1),
            duration: 0.06,
          },
          0
        );
      }

      // Dynamic Background Transition: Black -> White on entry, White -> Black on exit
      const bgTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: () => `+=${getTotalPinDistance() + window.innerHeight * 0.8}`,
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const isLight = self.progress > 0.08 && self.progress < 0.92;
            container.classList.toggle("is-theme-light", isLight);
          },
        },
      });

      bgTl
        .fromTo(
          container,
          { backgroundColor: "#000000", color: "#ffffff" },
          { backgroundColor: "#ffffff", color: "#000000", duration: 0.12, ease: "power1.out" }
        )
        .to(container, { backgroundColor: "#ffffff", color: "#000000", duration: 0.76, ease: "none" })
        .to(container, { backgroundColor: "#000000", color: "#ffffff", duration: 0.12, ease: "power1.in" });
    }, container);

    // Refresh ScrollTrigger and sort triggers in DOM order so downstream sections receive correct offsets
    requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentVerticalStep = getVerticalStep();
        container.dataset.pinDistance = String(getTotalPinDistance());
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 220);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      focusHandlers.forEach(({ card, onFocus, onBlur }) => {
        card.removeEventListener("focus", onFocus);
        card.removeEventListener("blur", onBlur);
      });
      nearTrigger.kill();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [projects]);

  const defaultIntro =
    projects.length === 5
      ? "Five projects, five unique experiences built down to their micro-interactions."
      : `${projects.length} curated projects, designed and built down to every interaction.`;

  const totalFormatted = String(projects.length).padStart(2, "0");

  return (
    <section
      ref={containerRef}
      className="strip is-carousel-ready"
      aria-labelledby="stripTitle"
      data-strip-carousel
    >
      <div ref={pinRef} className="strip__pin">
        {showHeading && (
          <header ref={headRef} className="strip__head">
            <p className="strip__eyebrow">
              <span>{eyebrowNumber}</span>
              <span>{eyebrowText}</span>
            </p>
            <h2 className="strip__title" id="stripTitle">
              <span>{titleMain}</span>
              <em>
                <TextShimmer duration={3}>{titleItalic}</TextShimmer>
              </em>
            </h2>
            <div className="strip__intro">
              <p>
                <TextShimmer duration={3}>{introText || defaultIntro}</TextShimmer>
              </p>
              <span className="strip__arrow" aria-hidden="true">
                ↘
              </span>
            </div>
          </header>
        )}

        <div className="strip__viewport">
          <div ref={railRef} className="strip__rail" aria-label={`${projects.length} selected projects`}>
            {projects.map((proj, idx) => {
              const numStr = proj.number || String(idx + 1).padStart(2, "0");
              const isExt = proj.link.startsWith("http");
              return (
                <a
                  key={proj.id}
                  className={`strip-card strip-card--${proj.aspectVariant || "wide"} ${
                    idx === activeProjectIndex ? "is-dominant" : ""
                  }`}
                  data-project-index={idx}
                  href={proj.link}
                  target={isExt ? "_blank" : undefined}
                  rel={isExt ? "noopener noreferrer" : undefined}
                  aria-label={`${proj.title} — ${proj.category}`}
                >
                  <div className="strip-card__float">
                    <figure className="strip-card__media">
                      {proj.video ? (
                        <video
                          className="project-motion-thumb"
                          poster={proj.poster}
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="none"
                          width="1200"
                          height="800"
                        >
                          <source src={proj.video} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={proj.poster}
                          alt={proj.title}
                          loading={idx < 3 ? "eager" : "lazy"}
                          width="1200"
                          height="800"
                        />
                      )}
                      <span className="strip-card__open">
                        View project <i aria-hidden="true">↗</i>
                      </span>
                    </figure>
                    <div className="strip-card__meta">
                      <p>
                        <span>{numStr}</span> {proj.title}
                      </p>
                      <p>
                        {proj.category} · {proj.year}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <p className="strip__progress" aria-hidden="true">
          <span id="stripCurrent">{String(activeProjectIndex + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span id="stripTotal">{totalFormatted}</span>
        </p>
      </div>

      <footer className="strip__foot">
        <p>{footerLabel || `Featured selection · ${totalFormatted} projects`}</p>
        <div className="works__more">
          <a href={allProjectsLink}>
            {allProjectsText} <sup>({totalFormatted})</sup>
          </a>
        </div>
      </footer>
    </section>
  );
}

export default StripCarousel;
