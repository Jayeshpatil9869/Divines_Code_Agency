import { useEffect, useRef, useState } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateSectionReveals } from "@/animations";
import { projects } from "@/data/projects";

function HighlightCard({
  name,
  highlight,
  label,
}: {
  name: string;
  highlight: string;
  label: string;
}) {
  return (
    <div className="w-[320px] md:w-105 shrink-0 p-8 border border-border bg-surface flex flex-col justify-between min-h-70">
      <p className="text-base md:text-lg font-light leading-relaxed text-foreground/90 mb-8">
        {highlight}
      </p>
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] font-bold">
          {name}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section ref={rootRef} className="w-full py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div data-gsap="reveal">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Work we&apos;ve shipped
          </h2>
          <p className="text-muted-foreground font-light">
            <TextShimmer>Real projects. Live sites. Clear scope.</TextShimmer>
          </p>
        </div>
      </div>

      {reducedMotion ? (
        <div className="flex gap-6 overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
          {projects.map((p) => (
            <div key={p.id} className="snap-start">
              <HighlightCard
                name={p.name}
                highlight={p.highlight}
                label={p.label}
              />
            </div>
          ))}
        </div>
      ) : (
        <InfiniteSlider gap={24} duration={45}>
          {projects.map((p) => (
            <HighlightCard
              key={p.id}
              name={p.name}
              highlight={p.highlight}
              label={p.label}
            />
          ))}
        </InfiniteSlider>
      )}
    </section>
  );
}
