import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateProcess } from "@/animations";

const stages = [
  {
    num: "01",
    title: "Discovery",
    desc: "Business goals, technical constraints, and user needs — aligned before a single screen.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Flows, data models, and structural skeleton. Design decisions that survive scale.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Visual language and high-fidelity components. Opinionated, not decorative.",
  },
  {
    num: "04",
    title: "Build",
    desc: "Clean, performant, accessible React. We design in code when it saves weeks.",
  },
  {
    num: "05",
    title: "Handover",
    desc: "Your team can maintain and extend the work. Docs, tokens, and clear ownership.",
  },
];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateProcess(root), []);

  return (
    <section id="process" ref={rootRef} className="w-full py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            A predictable way to work
          </h2>
          <p className="text-lg font-light">
            <TextShimmer duration={3}>
              Five stages, fixed checkpoints, no surprise invoices.
            </TextShimmer>
          </p>
        </div>

        <div className="relative">
          <div
            data-gsap="process-line"
            className="absolute left-[19px] top-0 bottom-0 w-px bg-primary/40 hidden md:block origin-top"
          />
          <div className="flex flex-col gap-0">
            {stages.map((stage) => (
              <div
                key={stage.num}
                data-gsap="process-step"
                className="relative md:pl-16 py-8 border-b border-border last:border-0 data-[active=true]:[&_h3]:text-primary transition-colors"
              >
                <div className="hidden md:flex absolute left-0 top-10 w-10 h-10 items-center justify-center bg-background border border-border text-[10px] font-mono text-primary z-10">
                  {stage.num}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                  <span className="md:hidden text-[10px] font-mono text-primary mb-2">{stage.num}</span>
                  <h3 className="md:col-span-4 text-2xl font-light italic font-serif normal-case tracking-tight transition-colors duration-500">
                    {stage.title}
                  </h3>
                  <p className="md:col-span-8 text-muted-foreground font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
