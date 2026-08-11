import { useEffect, useRef, useState } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateSectionReveals } from "@/animations";

const testimonials = [
  {
    quote:
      "Divine's pushed back on a bad idea and saved us months. They shipped a simple flow that solved the core problem in a week.",
    name: "Maya Chen",
    role: "Founder, PulsePay",
  },
  {
    quote:
      "They redesigned onboarding before writing a line of code. Completion jumped 40%. Rare to get design judgment and engineering in one team.",
    name: "Jonah Reed",
    role: "CTO, Arc Labs",
  },
  {
    quote:
      "Most freelancers vanish. Divine's communicated daily, shipped incrementally, and hit the deadline exactly.",
    name: "Priya Nair",
    role: "Product Lead, Helix",
  },
  {
    quote:
      "Cleanest frontend architecture we've inherited. Our new team was productive in two days.",
    name: "Eli Vargas",
    role: "Head of Eng, Cascade",
  },
  {
    quote:
      "Like a fractional Head of Design who also writes production React. That combination is rare.",
    name: "Sara Kim",
    role: "CEO, Northwind",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="w-[320px] md:w-105 shrink-0 p-8 border border-border bg-surface flex flex-col justify-between min-h-70">
      <p className="text-base md:text-lg font-light leading-relaxed text-foreground/90 mb-8">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] font-bold">
          {name}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1">{role}</div>
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
            What it&apos;s like to work with us
          </h2>
          <p className="text-muted-foreground font-light">
            <TextShimmer>Direct. Opinionated. On time.</TextShimmer>
          </p>
        </div>
      </div>

      {reducedMotion ? (
        <div className="flex gap-6 overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
          {testimonials.map((t) => (
            <div key={t.name} className="snap-start">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      ) : (
        <InfiniteSlider gap={24} duration={45}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </InfiniteSlider>
      )}
    </section>
  );
}
