"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BEAM = "#E8D5B5";

export function BackgroundBeams({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
  ];

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // Soft edge fade — keep beams readable across most of the hero
        "mask-[radial-gradient(ellipse_80%_70%_at_20%_80%,black_10%,black_55%,transparent_100%)]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Always-visible base strokes */}
        {paths.map((path, i) => (
          <path
            key={`base-${i}`}
            d={path}
            stroke={BEAM}
            strokeOpacity={0.18}
            strokeWidth="0.2"
          />
        ))}
        {/* Animated shimmer beams */}
        {paths.map((path, i) => (
          <path
            key={`path-${i}`}
            d={path}
            stroke={`url(#beam-grad-${i})`}
            strokeOpacity="0.85"
            strokeWidth="0.2"
          />
        ))}
        <defs>
          {paths.map((_, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`beam-grad-${i}`}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor={BEAM} stopOpacity="0.35" />
              <stop offset="50%" stopColor={BEAM} stopOpacity="1" />
              <stop offset="60%" stopColor={BEAM} stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" />
              {active && (
                <>
                  <animate
                    attributeName="x1"
                    values="-100%;100%"
                    dur={`${5.5 + (i % 8) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    values="0%;200%"
                    dur={`${5.5 + (i % 8) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </>
              )}
            </linearGradient>
          ))}
        </defs>
      </svg>
      <BeamParticles active={active} />
    </div>
  );
}

function BeamParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced || !active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.45,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(36, 45%, 78%, 0.55)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, active]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-80"
      style={{ visibility: active ? "visible" : "hidden" }}
    />
  );
}
