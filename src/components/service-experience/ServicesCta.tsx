import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";

export function ServicesCta() {
  return (
    <section
      data-gsap="svc-reveal"
      className="relative py-24 md:py-32 border-t border-border overflow-hidden"
      aria-labelledby="services-cta-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,36rem)] h-72 rounded-full bg-primary/12 blur-3xl"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary mb-6">
          Next step
        </p>
        <h3
          id="services-cta-heading"
          className="text-[clamp(1.85rem,4vw,3.25rem)] font-black tracking-[-0.03em] uppercase leading-[0.95] mb-6"
        >
          Tell us what you&apos;re{" "}
          <span className="font-serif font-light italic normal-case text-primary tracking-tight">
            building
          </span>
        </h3>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
          <TextShimmer duration={3}>
            An idea, a redesign, a product slice, an integration, or ongoing care —
            share the problem and we&apos;ll map the right lane.
          </TextShimmer>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="inline-flex h-12 md:h-14 items-center gap-2 px-8 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all"
            >
              Start a conversation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href="#work"
              className="inline-flex h-12 md:h-14 items-center gap-2 px-6 border border-border text-[11px] uppercase tracking-[0.18em] font-bold hover:border-foreground/40 transition-colors"
            >
              View our work
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
