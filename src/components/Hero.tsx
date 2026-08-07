import { useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { HeroVideo } from "@/components/HeroVideo";
import { StringLine } from "@/components/ui/string-line";
import { useGsap, animateHero } from "@/animations";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateHero(root), []);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-center px-6 pt-[18vh] pb-16 overflow-hidden"
    >
      <div data-gsap="hero-bg" className="absolute inset-0 pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="hsl(32 28% 55%)" />
        <BackgroundBeams className="opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="relative mb-10 md:mb-14">
          <p
            data-gsap="hero-eyebrow"
            className="text-primary text-[11px] md:text-[12px] uppercase tracking-[0.45em] font-bold mb-6"
          >
            Available for Q2 partnerships
          </p>

          <div className="relative">
            <h1 className="font-black tracking-[-0.05em] uppercase md:pr-[min(42%,26rem)]">
              <span
                data-gsap="hero-line"
                className="block text-foreground text-[clamp(3.5rem,12vw,7rem)] leading-[0.82]"
              >
                Divine&apos;s
              </span>
              <span
                data-gsap="hero-line"
                className="block text-foreground/90 text-[clamp(2rem,6.5vw,8.5rem)] leading-[0.9] mt-1 md:mt-2"
              >
                Code Agency
              </span>
            </h1>

            {/* Red-box zone: right of headline, aligned with Divine's */}
            <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 w-full md:w-[min(42%,28.125rem)] z-20">
              <HeroVideo heroRef={rootRef} className="max-w-none ml-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p
              data-gsap="hero-sub"
              className="max-w-xl text-lg md:text-xl leading-relaxed font-light"
            >
              <TextShimmer duration={3}>
                We design and engineer product experiences founders finish shipping — zero-to-one through Series B.
              </TextShimmer>
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
            <div data-gsap="hero-cta">
              <Magnetic strength={0.3}>
                <a href="#contact">
                  <ShimmerButton className="w-full sm:w-auto font-bold tracking-[0.2em] uppercase text-[11px]">
                    Start a project →
                  </ShimmerButton>
                </a>
              </Magnetic>
            </div>
            <div data-gsap="hero-cta">
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-bold tracking-[0.2em] uppercase text-[11px] hover:border-foreground/40 transition-colors"
                >
                  See selected work
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div data-gsap="hero-meta" className="mt-16">
          <StringLine className="mb-2" stroke="color-mix(in srgb, #fff 55%, #000)" />
          <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground sm:justify-self-start pb-1">
              40+ products shipped · avg engagement 6 months
            </span>

            <div
              data-gsap="hero-scroll"
              className="flex flex-col items-center gap-2 pointer-events-none justify-self-center"
              aria-hidden
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                Scroll
              </span>
              <div className="w-px h-10 bg-border relative overflow-hidden">
                <span
                  data-gsap="scroll-dot"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              </div>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60 hidden sm:inline sm:justify-self-end pb-1 text-right">
              Design · Frontend · Systems
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
