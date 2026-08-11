import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Magnetic } from "@/components/ui/magnetic";
import {
  useGsap,
  animateFaq,
  expandFaqPanel,
  collapseFaqPanel,
  setFaqPanelState,
  prefersReducedMotion,
  gsap,
} from "@/animations";

const faqs = [
  {
    q: "What's included in the website package price?",
    a: "Design, development, animations in scope, SEO foundation, deployment, and SSL setup. Domain registration and hosting/infrastructure are not included — you pay those providers directly.",
  },
  {
    q: "Is ₹999/month for hosting?",
    a: "No. Website Care is optional support — updates, small fixes, and priority help. Hosting and domain remain your recurring third-party costs.",
  },
  {
    q: "What if I need e-commerce or a web app?",
    a: "That's Custom — scoped and quoted separately. Starter, Modern, and Premium cover marketing and business websites; custom functionality gets its own brief.",
  },
  {
    q: "What if we don't like the design?",
    a: "Checkpoints are built in. If direction is wrong early, we course-correct before build. Fixed-scope packages include defined revision rounds.",
  },
];

const AUTO_MS = 4500;

export function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const remainingRef = useRef(AUTO_MS);
  const cycleRef = useRef(`${openIndex}-${timerKey}`);
  const timeoutRef = useRef<number | null>(null);
  const beamTweenRef = useRef<gsap.core.Tween | null>(null);

  useGsap(rootRef, (root) => animateFaq(root), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cycle = `${openIndex}-${timerKey}`;
    const cycleChanged = cycleRef.current !== cycle;
    if (cycleChanged) {
      cycleRef.current = cycle;
      remainingRef.current = AUTO_MS;
      beamTweenRef.current?.kill();
      beamTweenRef.current = null;
      rootRef.current?.querySelectorAll<HTMLElement>("[data-faq-beam]").forEach((el) => {
        if (el.getAttribute("data-faq-beam") !== String(openIndex)) {
          gsap.set(el, { scaleY: 0 });
        }
      });
    }

    const clearTimer = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const reduced = prefersReducedMotion();
    const canRun = inView && !reduced && !paused;

    if (!canRun) {
      clearTimer();
      const tween = beamTweenRef.current;
      if (tween && paused) {
        tween.pause();
        remainingRef.current = Math.max(0, (1 - tween.progress()) * AUTO_MS);
      }
      return clearTimer;
    }

    const beam = rootRef.current?.querySelector<HTMLElement>(
      `[data-faq-beam="${openIndex}"]`
    );

    if (beam) {
      beamTweenRef.current?.kill();
      const startProgress = 1 - remainingRef.current / AUTO_MS;
      gsap.set(beam, {
        scaleY: Math.min(1, Math.max(0, startProgress)),
        transformOrigin: "top center",
      });
      beamTweenRef.current = gsap.to(beam, {
        scaleY: 1,
        duration: Math.max(0.05, remainingRef.current / 1000),
        ease: "none",
      });
    }

    const startedAt = performance.now();
    const wait = remainingRef.current;
    const activeCycle = cycle;

    timeoutRef.current = window.setTimeout(() => {
      if (cycleRef.current !== activeCycle) return;
      remainingRef.current = AUTO_MS;
      setOpenIndex((prev) => {
        const current = prev < 0 ? 0 : prev;
        return (current + 1) % faqs.length;
      });
    }, wait);

    return () => {
      // Only bank remaining time when pausing the same cycle (hover),
      // not when advancing to the next item.
      if (cycleRef.current === activeCycle) {
        const elapsed = performance.now() - startedAt;
        remainingRef.current = Math.max(0, wait - elapsed);
        beamTweenRef.current?.pause();
      }
      clearTimer();
    };
  }, [inView, paused, openIndex, timerKey]);

  const selectItem = (i: number) => {
    remainingRef.current = AUTO_MS;
    setOpenIndex(i);
    setTimerKey((k) => k + 1);
  };

  return (
    <section
      id="faq"
      ref={rootRef}
      className="relative w-full py-24 md:py-32 lg:min-h-svh lg:flex lg:items-center border-t border-border overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[min(70vw,28rem)] h-88 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">
          <div data-gsap="faq-header" className="lg:col-span-4 lg:self-center">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-4">
              FAQ
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-5">
              Questions we get asked
            </h2>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8 max-w-sm">
              <TextShimmer duration={3}>
                Straight answers. No sales fog. If yours isn’t here, ask anyway.
              </TextShimmer>
            </p>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white/25 pb-1 hover:border-primary hover:text-primary transition-colors"
              >
                Ask a question →
              </a>
            </Magnetic>
          </div>

          <div
            className="lg:col-span-8 w-full flex flex-col justify-center gap-3 lg:self-center"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
          >
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                index={i}
                question={faq.q}
                answer={faq.a}
                open={openIndex === i}
                onToggle={() => selectItem(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const openRef = useRef(open);
  const mountedRef = useRef(false);
  const panelId = `faq-panel-${index}`;

  useLayoutEffect(() => {
    const item = itemRef.current;
    const panel = panelRef.current;
    const body = bodyRef.current;
    if (!item || !panel || !body) return;

    const els = {
      item,
      panel,
      body,
      title: titleRef.current,
      icon: iconRef.current,
    };

    if (!mountedRef.current) {
      mountedRef.current = true;
      setFaqPanelState(els, open);
      openRef.current = open;
      return;
    }

    if (openRef.current === open) return;

    if (prefersReducedMotion()) {
      setFaqPanelState(els, open);
      openRef.current = open;
      return;
    }

    if (open) {
      expandFaqPanel(els);
    } else {
      collapseFaqPanel(els);
    }

    openRef.current = open;
  }, [open]);

  return (
    <div
      ref={itemRef}
      data-gsap="faq-item"
      data-state={open ? "open" : "closed"}
      className="overflow-hidden border border-white/12 bg-black/60 will-change-[border-color,background-color]"
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 md:px-6 py-5 md:py-6 text-left text-[13px] md:text-[15px] font-medium uppercase tracking-[0.14em]"
        >
          <span className="flex items-start gap-4 md:gap-5 pr-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary pt-0.5 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span ref={titleRef} className="leading-snug text-white/75">
              {question}
            </span>
          </span>
          <ChevronDown
            ref={iconRef}
            className="h-4 w-4 shrink-0 text-white/35"
            aria-hidden
          />
        </button>
      </h3>

      <div
        id={panelId}
        ref={panelRef}
        role="region"
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div
          ref={bodyRef}
          className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] md:text-[15px] leading-relaxed font-light"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          <div className="relative pl-9 md:pl-12 ml-1">
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-primary/25"
            />
            <span
              data-faq-beam={index}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-primary shadow-[0_0_10px_color-mix(in_srgb,hsl(32_28%_55%)_55%,transparent)] will-change-transform"
              style={{ transform: "scaleY(0)" }}
            />
            <p className="pl-4">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
