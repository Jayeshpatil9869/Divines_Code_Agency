import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { RevealWaveImage } from "@/components/ui/reveal-wave-image";
import { useGsap, animateSectionReveals, animateParallax } from "@/animations";

const TEAM_IMAGE = "/images/studio.png";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(
    rootRef,
    (root) => {
      animateSectionReveals(root);
      animateParallax(root);
    },
    [],
  );

  return (
    <section id="about" ref={rootRef} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div data-gsap="reveal">
            <div
              data-gsap="parallax"
              className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-surface border border-border"
            >
              {/* Mobile: static image (cheaper). Desktop: wave reveal canvas. */}
              <img
                src={TEAM_IMAGE}
                alt="Divine's Code Agency studio"
                className="absolute inset-0 h-full w-full object-cover md:hidden grayscale-[20%] opacity-90"
              />
              <div className="absolute inset-0 hidden md:block">
                <RevealWaveImage
                  src={TEAM_IMAGE}
                  alt="Divine's Code Agency studio"
                  className="h-full w-full"
                  waveSpeed={0.25}
                  waveFrequency={0.85}
                  waveAmplitude={0.45}
                  revealRadius={0.42}
                  revealSoftness={0.85}
                  pixelSize={2.5}
                  mouseRadius={0.35}
                />
              </div>
            </div>
          </div>

          <div data-gsap="reveal" className="flex flex-col justify-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-6">
              <TextShimmer>We are Divine&apos;s.</TextShimmer>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                Divine&apos;s Code Agency sits in the room where design and
                engineering argue — and makes both sides ship.
              </p>
              <p>
                We don&apos;t decorate products. We make complex systems
                legible: interfaces that hold up in production, not just in
                Figma.
              </p>
              <p>
                Small roster. Senior people. Direct communication. Fast
                iteration. No account managers between you and the work.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="#process"
                className="text-foreground font-bold text-[11px] uppercase tracking-[0.2em] border-b border-border pb-1 hover:border-primary transition-colors hover:text-primary"
              >
                More about how we work →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
