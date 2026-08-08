import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateMetrics } from "@/animations";

const metrics = [
  {
    value: 40,
    suffix: "+",
    label: "Products shipped",
    detail: "From MVPs to Series B platforms",
  },
  {
    value: 61,
    suffix: "%",
    label: "Avg. conversion lift",
    detail: "Measured 90 days post-launch",
  },
  {
    value: 6,
    suffix: "mo",
    label: "Avg. engagement",
    detail: "Embedded, not drive-by",
  },
  {
    value: 4,
    suffix: "",
    label: "Clients per year",
    detail: "Depth over volume",
  },
];

export function Metrics() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateMetrics(root), []);

  return (
    <section ref={rootRef} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div data-gsap="metrics-header">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            The work, in numbers
          </h2>
          <p className="text-lg font-light mb-16 max-w-lg">
            <TextShimmer duration={3}>
              Measured 90 days post-launch, verified with each client.
            </TextShimmer>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m) => (
            <div
              key={m.label}
              data-gsap="metric-card"
              className="border-t border-border pt-6"
            >
              <div className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter leading-none mb-3 text-foreground tabular-nums">
                <span data-count={m.value} data-suffix={m.suffix}>
                  0{m.suffix}
                </span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold mb-2">
                {m.label}
              </div>
              <div className="text-[11px] text-muted-foreground font-light">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
