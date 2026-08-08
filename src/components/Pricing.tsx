import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cn } from "@/lib/utils";
import { useGsap, animatePricing } from "@/animations";

const engagements = [
  {
    num: "01",
    title: "Design Sprint",
    duration: "2–3 weeks",
    cadence: "Daily syncs",
    desc: "Rough idea to high-fidelity interactive prototype — for funding or internal buy-in.",
    price: "From $8k",
  },
  {
    num: "02",
    title: "0-to-1 Build",
    duration: "8–12 weeks",
    cadence: "Weekly reviews",
    desc: "Full product design and frontend engineering. Blank canvas to production-ready codebase.",
    price: "From $25k",
    popular: true,
  },
  {
    num: "03",
    title: "Growth Retainer",
    duration: "3+ months",
    cadence: "Async + bi-weekly",
    desc: "Ongoing partnership to optimize funnels, audit UX, and ship high-impact frontend.",
    price: "$6k / month",
  },
];

export function Pricing() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animatePricing(root), []);

  return (
    <section
      id="pricing"
      ref={rootRef}
      className="relative w-full py-24 md:py-32 border-t border-border overflow-x-clip lg:overflow-hidden"
    >
      {/* Soft focus wash behind the middle plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,42rem)] h-[28rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div data-gsap="pricing-header" className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-4">
            Engagements
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Straightforward engagements
          </h2>
          <p className="text-lg font-light text-muted-foreground">
            <TextShimmer duration={3}>
              Fixed scope, fixed price, or a monthly retainer. No hourly billing — it punishes
              efficiency.
            </TextShimmer>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 md:items-stretch">
          {engagements.map((eng, i) => (
            <article
              key={eng.title}
              data-gsap="pricing-card"
              data-popular={eng.popular ? "true" : undefined}
              className={cn(
                "group relative flex flex-col overflow-hidden p-6 sm:p-8 min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] transition-[border-color,background-color,transform,box-shadow] duration-500 ease-out will-change-transform",
                "border bg-black/80 backdrop-blur-[2px] hover:-translate-y-2",
                eng.popular
                  ? "border-primary/70 lg:-translate-y-3 lg:hover:-translate-y-5 lg:min-h-[440px] shadow-[0_0_0_1px_color-mix(in_srgb,hsl(32_28%_55%)_35%,transparent),0_24px_60px_-28px_rgba(0,0,0,0.9)]"
                  : "border-white/12 hover:border-white/35"
              )}
            >
              <BorderBeam
                size={eng.popular ? 110 : 70}
                duration={eng.popular ? 5.5 : 8 + i}
                delay={i * 1.6}
                initialOffset={i * 28}
                borderWidth={eng.popular ? 2 : 1.5}
              />

              {eng.popular && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent"
                />
              )}

              <div className="relative flex items-start justify-between gap-3 mb-8">
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-[0.2em]",
                    eng.popular ? "text-primary" : "text-white/40"
                  )}
                >
                  {eng.num}
                </span>
                {eng.popular && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-1 bg-primary text-primary-foreground">
                    Most booked
                  </span>
                )}
              </div>

              <h3
                className={cn(
                  "relative text-2xl md:text-[1.75rem] font-light italic font-serif normal-case mb-3 tracking-tight transition-colors duration-300",
                  eng.popular ? "text-white" : "text-white/90 group-hover:text-white"
                )}
              >
                {eng.title}
              </h3>

              <div className="relative flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
                <span>{eng.duration}</span>
                <span className="text-white/25">·</span>
                <span>{eng.cadence}</span>
              </div>

              <p className="relative text-sm text-muted-foreground font-light leading-relaxed flex-1 mb-10">
                {eng.desc}
              </p>

              <div
                className={cn(
                  "relative text-[1.75rem] md:text-3xl font-black tracking-tight mb-7",
                  eng.popular ? "text-white" : "text-white/95"
                )}
              >
                {eng.price}
              </div>

              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className={cn(
                    "relative inline-flex items-center justify-center text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
                    eng.popular
                      ? "w-full px-5 py-3.5 bg-primary text-primary-foreground hover:brightness-110"
                      : "w-fit border-b border-white/25 pb-1 hover:border-primary hover:text-primary"
                  )}
                >
                  Inquire →
                </a>
              </Magnetic>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
