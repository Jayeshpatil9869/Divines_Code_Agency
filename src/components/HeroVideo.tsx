import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { expandHeroVideo, collapseHeroVideo, gsap } from "@/animations";
import { getLenis } from "@/hooks/useLenis";

const VIDEO_SRC = "/videos/hero-reel.mp4";

type HeroVideoProps = {
  heroRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function HeroVideo({ heroRef, className }: HeroVideoProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(typeof document !== "undefined");
  }, []);

  const getEls = useCallback(() => {
    const frame = frameRef.current;
    const slot = slotRef.current;
    const hero = heroRef.current;
    const backdrop = backdropRef.current;
    const closeBtn = closeRef.current;
    if (!frame || !slot || !hero || !backdrop || !closeBtn) return null;
    return { frame, slot, hero, backdrop, closeBtn };
  }, [heroRef]);

  const openVideo = useCallback(() => {
    if (busyRef.current || openRef.current) return;
    const els = getEls();
    const video = videoRef.current;
    if (!els || !video) return;

    busyRef.current = true;
    openRef.current = true;
    setOpen(true);

    video.muted = false;
    video.controls = true;
    void video.play().catch(() => undefined);

    const tween = expandHeroVideo(els);
    tween.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
  }, [getEls]);

  const closeVideo = useCallback(() => {
    if (busyRef.current || !openRef.current) return;
    const els = getEls();
    const video = videoRef.current;
    if (!els || !video) return;

    busyRef.current = true;
    video.controls = false;
    video.muted = true;
    void video.play().catch(() => undefined);

    const tween = collapseHeroVideo(els);
    tween.eventCallback("onComplete", () => {
      busyRef.current = false;
      openRef.current = false;
      setOpen(false);
      getLenis()?.start();
    });
  }, [getEls]);

  // Escape, click-outside (anywhere), scroll / wheel / touch → close
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };

    const onPointerDown = (e: PointerEvent) => {
      const frame = frameRef.current;
      const closeBtn = closeRef.current;
      const target = e.target as Node | null;
      if (!target) return;
      if (frame?.contains(target) || closeBtn?.contains(target)) return;
      closeVideo();
    };

    const onScrollIntent = () => closeVideo();

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("wheel", onScrollIntent, { passive: true });
    window.addEventListener("touchmove", onScrollIntent, { passive: true });
    window.addEventListener("scroll", onScrollIntent, { passive: true });

    const lenis = getLenis();
    lenis?.on("scroll", onScrollIntent);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("wheel", onScrollIntent);
      window.removeEventListener("touchmove", onScrollIntent);
      window.removeEventListener("scroll", onScrollIntent);
      lenis?.off("scroll", onScrollIntent);
    };
  }, [open, closeVideo]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const closeBtn = closeRef.current;
    if (!backdrop || !closeBtn) return;
    gsap.set(backdrop, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(closeBtn, { autoAlpha: 0 });
  }, [portalReady]);

  useEffect(() => {
    return () => {
      const frame = frameRef.current;
      const slot = slotRef.current;
      if (frame && slot && frame.parentElement !== slot) {
        slot.appendChild(frame);
      }
      getLenis()?.start();
    };
  }, []);

  const overlay = portalReady
    ? createPortal(
        <>
          <button
            ref={backdropRef}
            type="button"
            aria-label="Close video overlay"
            className="fixed inset-0 z-[55] bg-black border-0 p-0 cursor-pointer pointer-events-none opacity-0"
            onClick={closeVideo}
          />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close video"
            className="fixed top-5 right-5 md:top-8 md:right-8 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white opacity-0 backdrop-blur-sm hover:bg-black/60 transition-colors"
            onClick={closeVideo}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </>,
        document.body
      )
    : null;

  return (
    <>
      {overlay}
      <div
        data-gsap="hero-video"
        className={cn("w-full max-w-[480px] ml-auto", className)}
      >
        <div ref={slotRef} className="relative w-full aspect-video">
          <div
            ref={frameRef}
            role="button"
            tabIndex={0}
            aria-label={open ? "Showreel playing" : "Play showreel"}
            aria-expanded={open}
            className={cn(
              "relative h-full w-full overflow-hidden border border-border bg-black cursor-pointer will-change-transform",
              open && "cursor-default border-transparent z-[60]"
            )}
            style={{ borderRadius: 2 }}
            onClick={() => {
              if (!open) openVideo();
            }}
            onKeyDown={(e) => {
              if (!open && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                openVideo();
              }
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              onClick={(e) => {
                if (open) e.stopPropagation();
              }}
            />
            {!open && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25"
                aria-hidden
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/35 text-[10px] font-mono uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  Play
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
