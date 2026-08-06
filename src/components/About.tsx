import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateSectionReveals, animateParallax } from "@/animations";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => {
      animateSectionReveals(root);
      animateParallax(root);
    },
    []
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
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Divine's Code Agency team at work"
                className="w-full h-full object-cover grayscale-[25%] opacity-90 will-change-transform"
              />
            </div>
          </div>

          <div data-gsap="reveal" className="flex flex-col justify-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-6">
              <TextShimmer>We are Divine&apos;s.</TextShimmer>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                Divine&apos;s Code Agency sits in the room where design and engineering argue — and makes both sides ship.
              </p>
              <p>
                We don&apos;t decorate products. We make complex systems legible: interfaces that hold up in production, not just in Figma.
              </p>
              <p>
                Small roster. Senior people. Direct communication. Fast iteration. No account managers between you and the work.
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
