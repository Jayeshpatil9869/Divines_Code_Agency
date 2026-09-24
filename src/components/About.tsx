import { useRef } from "react";
import { Link } from "react-router-dom";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { RevealWaveImage } from "@/components/ui/reveal-wave-image";
import { useGsap, animateSectionReveals, animateParallax, ScrollTrigger, gsap } from "@/animations";

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
    <section id="about" ref={rootRef} className="w-full py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start relative">
          {/* Left Column: Studio Media with generous scroll runway */}
          <div className="w-full flex flex-col items-center md:items-start gap-8">
            <div data-gsap="reveal" className="w-full flex justify-center md:block">
              <div
                data-gsap="parallax"
                className="relative aspect-square md:aspect-[3/4] w-full max-w-[460px] md:max-w-none md:min-h-[700px] overflow-hidden bg-surface border border-border mx-auto md:mx-0"
              >
                {/* Mobile: static image. Desktop: interactive wave reveal canvas */}
                <img
                  src={TEAM_IMAGE}
                  alt="Divine's Code Agency studio"
                  className="absolute inset-0 h-full w-full object-cover object-center md:hidden grayscale-[20%] opacity-90"
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
          </div>

          {/* Right Column: Sticky Rail Container (Locked on Scroll) */}
          <div className="relative w-full h-full">
            <div className="flex flex-col justify-start md:sticky md:top-28 self-start pt-0">
              <div data-gsap="reveal">
                <p className="font-serif italic text-primary text-sm md:text-base mb-3">
                  (The Studio)
                </p>
                <h2 className="text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[0.95] font-black tracking-[-0.03em] uppercase mb-8">
                  <TextShimmer>We are Divine&apos;s.</TextShimmer>
                </h2>
              </div>

              <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
                <p data-gsap="reveal">
                  <TextShimmer duration={3.2}>
                    Divine&apos;s Code Agency sits in the room where design and
                    engineering argue — and makes both sides ship.
                  </TextShimmer>
                </p>
                <p data-gsap="reveal" className="text-muted-foreground">
                  We don&apos;t decorate products. We make complex systems
                  legible: interfaces that hold up in production, not just in
                  Figma.
                </p>
                <p data-gsap="reveal">
                  Small roster. Senior people. Direct communication. Fast
                  iteration. No account managers between you and the work.
                </p>
              </div>

              <div data-gsap="reveal" className="mt-10">
                <Link
                  to="/services"
                  className="inline-block text-foreground font-bold text-[11px] uppercase tracking-[0.2em] border-b border-border pb-1 hover:border-primary transition-colors hover:text-primary"
                >
                  Explore our services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
