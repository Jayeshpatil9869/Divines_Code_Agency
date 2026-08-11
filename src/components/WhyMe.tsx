import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  useGsap,
  animateCards,
  animatePhilosophy,
} from "@/animations";


const reasons = [
  {
    title: "Clear packages",
    desc: "Starter, Modern, or Premium — scope and price up front. Custom work gets a custom quote.",
  },
  {
    title: "Direct communication",
    desc: "You talk to the people building the site. Call, WhatsApp, or email — we reply within one business day.",
  },
  {
    title: "Built to launch",
    desc: "Responsive design, modern UI, SEO foundation, deployment, and SSL — not a Figma-only handoff.",
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
            Why Divine&apos;s
          </h2>
          <p className="text-lg font-light">
            <TextShimmer duration={3}>
              A small team that designs and builds websites — clear packages, honest pricing, and every rupee goes into your site.
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
      className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center py-28 md:py-36 bg-white text-black overflow-x-hidden"
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
            We&apos;d rather ship four things properly than twelve things approximately.
          </p>
        </div>
      </div>
    </section>
  );
}
