import { useRef } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateSectionReveals } from "@/animations";

export function Availability() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  return (
    <section ref={rootRef} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          data-gsap="reveal"
          className="border border-border bg-surface p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-primary text-[11px] uppercase tracking-[0.35em] font-bold mb-4">
                Capacity
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
                Currently booking from March
              </h2>
              <p className="text-muted-foreground font-light max-w-md">
                One project slot open this quarter. We take on four clients a year so each gets real attention.
              </p>
            </div>
            <Magnetic>
              <a href="#contact">
                <ShimmerButton className="font-bold tracking-[0.2em] uppercase text-[11px]">
                  Start a conversation
                </ShimmerButton>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
