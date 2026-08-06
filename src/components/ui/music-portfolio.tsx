import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";

export type MusicProject = {
  id: number | string;
  artist: string;
  album: string;
  category: string;
  label: string;
  year: string;
  image: string;
};

type Config = {
  timeZone?: string;
  timeUpdateInterval?: number;
  idleDelay?: number;
};

type SocialLinks = {
  spotify?: string;
  email?: string;
  x?: string;
};

type LocationInfo = {
  latitude?: string;
  longitude?: string;
  display?: boolean;
};

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#";

/** Club ScrambleTextPlugin alternative — free, transform-safe text scramble */
function scrambleText(el: HTMLElement, text: string, duration = 0.75) {
  gsap.killTweensOf(el);
  const proxy = { t: 0 };
  gsap.to(proxy, {
    t: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const revealed = Math.floor(proxy.t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealed) {
          out += text[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = text;
    },
  });
}

function TimeDisplay({
  config,
  className,
}: {
  config: Config;
  className?: string;
}) {
  const [time, setTime] = useState({ hours: "", minutes: "", dayPeriod: "" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: config.timeZone ?? "America/New_York",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      });
      const parts = formatter.formatToParts(now);
      setTime({
        hours: parts.find((p) => p.type === "hour")?.value || "",
        minutes: parts.find((p) => p.type === "minute")?.value || "",
        dayPeriod: parts.find((p) => p.type === "dayPeriod")?.value || "",
      });
    };

    updateTime();
    const interval = setInterval(updateTime, config.timeUpdateInterval ?? 1000);
    return () => clearInterval(interval);
  }, [config.timeZone, config.timeUpdateInterval]);

  return (
    <time className={className} dateTime={new Date().toISOString()}>
      {time.hours}
      <span className="music-portfolio__blink">:</span>
      {time.minutes} {time.dayPeriod}
    </time>
  );
}

type ProjectItemProps = {
  project: MusicProject;
  index: number;
  onMouseEnter: (index: number, image: string) => void;
  onMouseLeave: () => void;
  isActive: boolean;
};

const ProjectItem = forwardRef<HTMLLIElement, ProjectItemProps>(
  function ProjectItem(
    { project, index, onMouseEnter, onMouseLeave, isActive },
    ref
  ) {
    const textRefs = {
      artist: useRef<HTMLSpanElement>(null),
      album: useRef<HTMLSpanElement>(null),
      category: useRef<HTMLSpanElement>(null),
      label: useRef<HTMLSpanElement>(null),
      year: useRef<HTMLSpanElement>(null),
    };

    useEffect(() => {
      (Object.keys(textRefs) as Array<keyof typeof textRefs>).forEach((key) => {
        const el = textRefs[key].current;
        if (!el) return;
        if (isActive) {
          scrambleText(el, project[key]);
        } else {
          gsap.killTweensOf(el);
          el.textContent = project[key];
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, project]);

    return (
      <li
        ref={ref}
        className={`music-portfolio__item${isActive ? " is-active" : ""}`}
        onMouseEnter={() => onMouseEnter(index, project.image)}
        onMouseLeave={onMouseLeave}
        data-image={project.image}
      >
        <span ref={textRefs.artist} className="music-portfolio__cell artist">
          {project.artist}
        </span>
        <span ref={textRefs.album} className="music-portfolio__cell album">
          {project.album}
        </span>
        <span ref={textRefs.category} className="music-portfolio__cell category">
          {project.category}
        </span>
        <span ref={textRefs.label} className="music-portfolio__cell label">
          {project.label}
        </span>
        <span ref={textRefs.year} className="music-portfolio__cell year">
          {project.year}
        </span>
      </li>
    );
  }
);

export type MusicPortfolioProps = {
  PROJECTS_DATA?: MusicProject[];
  CONFIG?: Config;
  SOCIAL_LINKS?: SocialLinks;
  LOCATION?: LocationInfo;
  className?: string;
  style?: CSSProperties;
};

export default function MusicPortfolio({
  PROJECTS_DATA = [],
  CONFIG = {},
  SOCIAL_LINKS = {},
  LOCATION = {},
  className = "",
  style,
}: MusicPortfolioProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isIdle, setIsIdle] = useState(true);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    PROJECTS_DATA.forEach((project) => {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    });
  }, [PROJECTS_DATA]);

  const stopIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
      projectItemsRef.current.forEach((item) => {
        if (item) gsap.set(item, { opacity: 1 });
      });
    }
  }, []);

  const startIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) return;

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    const len = PROJECTS_DATA.length;

    projectItemsRef.current.forEach((item, index) => {
      if (!item) return;
      const hideTime = index * 0.05;
      const showTime = len * 0.05 * 0.5 + index * 0.05;

      timeline.to(
        item,
        { opacity: 0.12, duration: 0.12, ease: "power2.inOut" },
        hideTime
      );
      timeline.to(
        item,
        { opacity: 1, duration: 0.12, ease: "power2.inOut" },
        showTime
      );
    });

    idleAnimationRef.current = timeline;
  }, [PROJECTS_DATA.length]);

  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const startIdleTimer = useCallback(() => {
    stopIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      startIdleAnimation();
    }, CONFIG.idleDelay ?? 4000);
  }, [CONFIG.idleDelay, startIdleAnimation, stopIdleTimer]);

  const handleProjectMouseEnter = useCallback(
    (index: number, imageUrl: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      stopIdleAnimation();
      stopIdleTimer();
      setIsIdle(false);

      if (activeIndex === index) return;
      setActiveIndex(index);

      const bg = backgroundRef.current;
      if (imageUrl && bg) {
        bg.style.transition = "none";
        bg.style.transform = "translate(-50%, -50%) scale(1.15)";
        bg.style.backgroundImage = `url(${imageUrl})`;
        bg.style.opacity = "1";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bg.style.transition =
              "opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            bg.style.transform = "translate(-50%, -50%) scale(1)";
          });
        });
      }
    },
    [activeIndex, stopIdleAnimation, stopIdleTimer]
  );

  const handleProjectMouseLeave = useCallback(() => {
    debounceRef.current = setTimeout(() => {}, 50);
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setActiveIndex(-1);
    if (backgroundRef.current) backgroundRef.current.style.opacity = "0";
    startIdleTimer();
  }, [startIdleTimer]);

  useEffect(() => {
    startIdleTimer();
    return () => {
      stopIdleTimer();
      stopIdleAnimation();
    };
  }, [startIdleTimer, stopIdleTimer, stopIdleAnimation]);

  const locationLabel =
    LOCATION.latitude && LOCATION.longitude
      ? `${LOCATION.latitude}, ${LOCATION.longitude}`
      : null;

  return (
    <div
      className={`music-portfolio${isIdle ? " is-idle" : ""}${activeIndex !== -1 ? " has-active" : ""} ${className}`}
      style={style}
    >
      <div
        ref={backgroundRef}
        className="music-portfolio__bg"
        role="img"
        aria-hidden="true"
      />

      <div className="music-portfolio__veil" aria-hidden />

      <main
        className="music-portfolio__main"
        onMouseLeave={handleContainerMouseLeave}
      >
        <h3 className="sr-only">Selected projects</h3>
        <ul className="music-portfolio__list" role="list">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onMouseEnter={handleProjectMouseEnter}
              onMouseLeave={handleProjectMouseLeave}
              isActive={activeIndex === index}
              ref={(el) => {
                projectItemsRef.current[index] = el;
              }}
            />
          ))}
        </ul>
      </main>

      <aside className="music-portfolio__corners">
        <div className="music-portfolio__corner music-portfolio__corner--tl">
          <div className="music-portfolio__square" aria-hidden />
          <span>Selected</span>
        </div>

        <nav className="music-portfolio__corner music-portfolio__corner--tr">
          {SOCIAL_LINKS.email && (
            <a href={SOCIAL_LINKS.email}>Email</a>
          )}
          {SOCIAL_LINKS.email && SOCIAL_LINKS.x && <span aria-hidden> · </span>}
          {SOCIAL_LINKS.x && (
            <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer">
              X
            </a>
          )}
          {(SOCIAL_LINKS.email || SOCIAL_LINKS.x) && SOCIAL_LINKS.spotify && (
            <span aria-hidden> · </span>
          )}
          {SOCIAL_LINKS.spotify && (
            <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </nav>

        {LOCATION.display !== false && locationLabel && (
          <div className="music-portfolio__corner music-portfolio__corner--bl">
            {locationLabel}
          </div>
        )}

        <TimeDisplay
          config={CONFIG}
          className="music-portfolio__corner music-portfolio__corner--br"
        />
      </aside>
    </div>
  );
}
