import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { HeroVideo } from "@/components/HeroVideo";
import { StringLine } from "@/components/ui/string-line";
import { useGsap, animateHero } from "@/animations";

type HeroProps = {
  /** When false, hero stays hidden; GSAP entrance runs only after the preloader. */
  introReady?: boolean;
};

export function Hero({ introReady = true }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(
    rootRef,
    (root) => {
      if (!introReady) return;
      animateHero(root);
    },
    [introReady]
  );

  return (
    <section
      id="hero"
      ref={rootRef}
      className={cn(
        "relative w-full min-h-dvh flex flex-col justify-center px-6 pt-24 sm:pt-[14vh] md:pt-[18vh] pb-16 overflow-hidden",
        !introReady && "**:data-gsap:opacity-0"
      )}
    >
      <div data-gsap="hero-bg" className="absolute inset-0 pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="hsl(32 28% 55%)" />
        <BackgroundBeams className="opacity-70" />
      </div>

      <div data-gsap="hero-content" className="max-w-7xl mx-auto w-full relative z-10">
        <div className="relative mb-10 md:mb-14">
          <p
            data-gsap="hero-eyebrow"
            className="text-primary text-[11px] md:text-[12px] uppercase tracking-[0.45em] font-bold mb-6"
          >
            Available for new website projects
          </p>

          <div className="relative">
            <h1 className="font-black tracking-tighter uppercase md:pr-[min(42%,26rem)]">
              <span
                data-gsap="hero-line"
                className="block text-foreground text-[clamp(2rem,6.5vw,8.5rem)] leading-[0.82]"
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

            <div className="mt-8 md:mt-0 md:absolute md:top-0 md:right-0 w-full md:w-[min(42%,28.125rem)] z-20 flex flex-col gap-5">
              <HeroVideo heroRef={rootRef} className="max-w-none ml-0" />
              <div className="hidden md:flex flex-col lg:flex-row gap-1 w-full">
                <HeroCtas />
              </div>
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
                We design and build websites for businesses — clear packages, modern UI, and a site you can actually launch.
              </TextShimmer>
            </p>
          </div>

          <div className="md:hidden flex flex-col sm:flex-row gap-4 w-full">
            <HeroCtas />
          </div>
        </div>

        <div data-gsap="hero-meta" className="mt-16">
          <StringLine className="mb-2" stroke="color-mix(in srgb, #fff 55%, #000)" volume={0.7} />
          <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground sm:justify-self-start pb-1">
              Starter from ₹9,999 · Modern · Premium
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
              Design · Frontend · Care
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCtas() {
  return (
    <>
      <div data-gsap="hero-cta" className="w-full sm:w-auto flex-1">
        <Magnetic strength={0.3}>
          <a href="#contact" className="block w-full">
            <ShimmerButton className="w-full font-bold tracking-[0.2em] uppercase text-[11px]">
              Start a project →
            </ShimmerButton>
          </a>
        </Magnetic>
      </div>
      <div data-gsap="hero-cta" className="w-full sm:w-auto flex-1">
        <Magnetic strength={0.25}>
          <a
            href="#work"
            className="inline-flex w-full items-center justify-center px-8 py-4 border border-border text-foreground font-bold tracking-[0.2em] uppercase text-[11px] hover:border-foreground/40 transition-colors"
          >
            See selected work
          </a>
        </Magnetic>
      </div>
    </>
  );
}
