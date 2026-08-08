import { useRef, type PointerEvent } from "react";
import { gsap, prefersReducedMotion } from "@/animations";
import { cn } from "@/lib/utils";

const FINAL_PATH = "M 10 100 Q 500 100 990 100";

/** Open-string frequencies (E2–E4 range-ish) mapped along the line */
const FREQ_MIN = 82.41; // E2
const FREQ_MAX = 329.63; // E4

type StringLineProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  /** Master volume 0–1. Default 0.55 */
  volume?: number;
};

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AC();
  }
  return sharedCtx;
}

function playStringPluck(frequency: number, volume = 0.55) {
  const ctx = getAudioContext();
  if (!ctx) return;

  void ctx.resume();
  const now = ctx.currentTime;
  const dur = 1.85;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), now + 0.012);
  master.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  master.connect(ctx.destination);

  const noiseLen = Math.floor(ctx.sampleRate * 0.045);
  const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const noiseData = noiseBuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseLen * 0.12));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = frequency * 2.2;
  noiseFilter.Q.value = 2.5;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.85, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start(now);
  noise.stop(now + 0.1);

  const partials: Array<{ mul: number; amp: number; type: OscillatorType }> = [
    { mul: 1, amp: 1, type: "triangle" },
    { mul: 2, amp: 0.42, type: "sine" },
    { mul: 3, amp: 0.22, type: "sine" },
    { mul: 4, amp: 0.12, type: "sine" },
    { mul: 5, amp: 0.06, type: "sine" },
  ];

  for (const p of partials) {
    const osc = ctx.createOscillator();
    osc.type = p.type;
    osc.frequency.setValueAtTime(frequency * p.mul, now);

    const g = ctx.createGain();
    const peak = volume * p.amp * 0.9;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.001, peak), now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur * (1 / p.mul) * 0.85 + 0.35);

    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + dur + 0.05);
  }
}

/**
 * Interactive SVG string — bends toward pointer, elastic snap + pluck on release.
 * Works with mouse and touch via Pointer Events.
 */
export function StringLine({
  className,
  stroke = "white",
  strokeWidth = 1.5,
  volume = 0.55,
}: StringLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastXRef = useRef(500);
  const activeRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx?.state === "suspended") void ctx.resume();
  };

  const bendTo = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const rect = container.getBoundingClientRect();
    const scaleX = 1000 / rect.width;
    const scaleY = 200 / rect.height;
    const mouseX = Math.min(990, Math.max(10, (clientX - rect.left) * scaleX));
    const mouseY = (clientY - rect.top) * scaleY;
    lastXRef.current = mouseX;
    activeRef.current = true;

    if (prefersReducedMotion()) return;

    const d = `M 10 100 Q ${mouseX} ${mouseY} 990 100`;
    gsap.to(path, {
      attr: { d },
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const release = () => {
    const path = pathRef.current;
    if (!path) return;

    const pulled = activeRef.current;
    activeRef.current = false;
    pointerIdRef.current = null;

    if (pulled) {
      const t = (lastXRef.current - 10) / 980;
      const freq = FREQ_MIN * Math.pow(FREQ_MAX / FREQ_MIN, Math.min(1, Math.max(0, t)));
      playStringPluck(freq, volume);
    }

    if (prefersReducedMotion()) {
      gsap.set(path, { attr: { d: FINAL_PATH } });
      return;
    }

    gsap.to(path, {
      attr: { d: FINAL_PATH },
      duration: 1.35,
      ease: "elastic.out(1.85, 0.18)",
      overwrite: "auto",
    });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    unlockAudio();
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    bendTo(e.clientX, e.clientY);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
    // Hover devices: bend without capture; touch: only while captured
    if (pointerIdRef.current === null && e.pointerType === "touch") return;
    if (pointerIdRef.current === null && e.buttons === 0 && e.pointerType === "mouse") {
      bendTo(e.clientX, e.clientY);
      return;
    }
    if (pointerIdRef.current !== null) bendTo(e.clientX, e.clientY);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    release();
  };

  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    // Mouse leave without capture still plucks (desktop hover behavior)
    if (e.pointerType === "mouse" && pointerIdRef.current === null && activeRef.current) {
      release();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-16 w-full cursor-pointer touch-none items-center justify-center md:h-20",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label="Interactive string — drag to pluck"
    >
      <svg
        viewBox="0 0 1000 200"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={FINAL_PATH}
          stroke={stroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
