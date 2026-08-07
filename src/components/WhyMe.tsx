import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  useGsap,
  animateCards,
  animatePhilosophy,
} from "@/animations";


const reasons = [
  {
    title: "Direct access",
    desc: "You get the seniors you interviewed. Every day. No account manager in between.",
  },
  {
    title: "Faster velocity",
    desc: "Zero overhead, zero politics. We design in code when it cuts handoff time to zero.",
  },
  {
    title: "Aligned incentives",
    desc: "Agencies sell hours. We sell outcomes. If we can solve it in a day, we will.",
  },
];

export function WhyMe() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateCards(root, '[data-gsap="card"]'), []);

  return (
    <section ref={rootRef} className="w-full py-24 md:py-32 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Why a studio instead of an agency
          </h2>
          <p className="text-lg font-light">
            <TextShimmer duration={3}>
              When you hire a large agency, you pay for their office, bench time, and project managers. With us, every dollar goes into the product.
            </TextShimmer>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <div key={r.title} data-gsap="card" className="border-t border-border pt-6">
              <h3 className="text-xl font-light italic font-serif normal-case mb-3 tracking-tight">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animatePhilosophy(root), []);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center py-28 md:py-36 text-black overflow-x-hidden"
    >
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="relative inline-block">
          <h2 className="font-tight text-[clamp(3rem,6vw,5rem)] leading-[0.85] font-black tracking-[-0.04em] uppercase text-black mb-8">
            <span data-gsap="phil-line-top" className="block will-change-transform">
              Good design is
            </span>
            <span data-gsap="phil-line-mid" className="block">
              mostly deciding
            </span>
            <span
              data-gsap="phil-line-bot"
              className="block will-change-transform"
            >
              what to{" "}
              <span
                className="inline-block text-transparent"
                style={{
                  WebkitTextStroke: "1.5px #000",
                  paintOrder: "stroke fill",
                }}
              >
                leave out
              </span>
              <span className="text-black">.</span>
            </span>
          </h2>

          <p
            data-gsap="reveal"
            className="mt-0 text-base md:text-xl font-serif italic font-normal normal-case tracking-normal text-black/70 max-w-2xl mx-auto leading-relaxed"
          >
            I&apos;d rather ship four things properly than twelve things approximately.
          </p>
        </div>
      </div>
    </section>
  );
}
