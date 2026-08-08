"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export type ArcRevealGreeting = {
  /** Greeting text in the target script */
  text: string;
  /** Optional `lang` attribute applied to the span (helps screen readers / font rendering) */
  lang?: string;
};

export interface ArcRevealHeroProps {
  /** Greetings cycled before the arc reveal. */
  greetings?: ArcRevealGreeting[];
  /** How long each greeting is held on screen (ms). */
  greetingHold?: number;
  /** Duration of the curved curtain reveal (ms). */
  revealDuration?: number;
  /** Outer shell class. Receives the *post-reveal* surface. */
  className?: string;
  /** Class for the intro (pre-reveal) overlay surface. */
  introClassName?: string;
  /** Class for the cycled greeting `<span>`. */
  greetingClassName?: string;
  /** Class for the wrapper around `children` (the revealed content). */
  revealClassName?: string;
  /**
   * Optional `sessionStorage` key — when set, the intro plays only once per
   * session for the same key. Leave unset to replay on every mount.
   */
  storageKey?: string;
  /** Fires once when the curtain starts (or intro is skipped). Use to start GSAP hero. */
  onComplete?: () => void;
  /** Content shown after the curtain reveal (the landing page). */
  children?: React.ReactNode;
}

/* ── defaults ────────────────────────────────────────────────── */

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "Quiet." },
  { text: "Sharp." },
  { text: "Calm." },
  { text: "Crafted." },
  { text: "Considered." },
  { text: "Composed." },
  { text: "Honest." },
  { text: "Ready." },
];

type Phase = "intro" | "reveal" | "done";

/* ── component ───────────────────────────────────────────────── */

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 620,
  revealDuration = 1500,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  onComplete,
  children,
}: ArcRevealHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const [phase, setPhase] = React.useState<Phase>("intro");
  const [index, setIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;
  const completedRef = React.useRef(false);

  // Drive the arc shape from a single 0→1 progress.
  // Quadratic bezier curtain rises: t=0 off-screen below → t=1 full cover.
  const progress = useMotionValue(0);
  const arcPath = useTransform(progress, (p: number) => {
    const edge = 110 - p * 140;
    const control = edge + 25;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Honor reduced-motion + optional once-per-session skip.
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
        }
      } catch {
        /* private mode — fall through */
      }
    }
  }, [prefersReducedMotion, storageKey]);

  // Start GSAP hero as the curtain begins lifting (not after exit fade).
  React.useEffect(() => {
    if (phase !== "reveal" || completedRef.current) return;
    completedRef.current = true;
    onCompleteRef.current?.();
  }, [phase]);

  // Skip path still notifies once when jumping straight to done.
  React.useEffect(() => {
    if (phase !== "done" || completedRef.current) return;
    completedRef.current = true;
    onCompleteRef.current?.();
  }, [phase]);

  // Lock scroll under the curtain (Lenis + native).
  React.useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevTouch = html.style.touchAction;
    html.style.overflow = "hidden";
    html.style.touchAction = "none";
    return () => {
      html.style.overflow = prevOverflow;
      html.style.touchAction = prevTouch;
    };
  }, [phase]);

  // Greeting cycle.
  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    if (isLast) {
      const t = window.setTimeout(() => setPhase("reveal"), greetingHold + 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), greetingHold);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length]);

  // Drive the curtain reveal (reset progress for Strict Mode remounts).
  React.useEffect(() => {
    if (phase !== "reveal") return;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => {
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {
            /* ignore */
          }
        }
        setPhase("done");
      },
    });
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey]);

  const showOverlay = phase !== "done";
  const current = greetings[Math.min(index, greetings.length - 1)];

  // Portal keeps the curtain above fixed nav/cursor; stay mounted for exit fade.
  const overlay = mounted
    ? createPortal(
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              key="arc-reveal-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "pointer-events-auto fixed inset-0 z-9999 h-dvh w-full overflow-hidden bg-white",
                introClassName,
              )}
              style={{ backgroundColor: "#fff" }}
              aria-hidden={phase !== "intro"}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {phase === "intro" && current && (
                    <motion.span
                      key={`${index}-${current.text}`}
                      lang={current.lang}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "select-none px-6 text-center font-display text-5xl font-black uppercase tracking-[-0.04em] text-black sm:text-6xl md:text-7xl",
                        greetingClassName,
                      )}
                    >
                      {current.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d={arcPath}
                  style={{ fill: "var(--color-background, #000)" }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-background text-foreground",
        className,
      )}
    >
      <div
        className={cn("relative z-0", revealClassName)}
        inert={showOverlay ? true : undefined}
        aria-hidden={showOverlay || undefined}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}

export default ArcRevealHero;
