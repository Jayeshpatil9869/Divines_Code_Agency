import { useRef } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateProcess } from "@/animations";
import { cn } from "@/lib/utils";

const stages = [
  {
    num: "01",
    title: "Discovery",
    desc: "Business goals, technical constraints, and user needs — aligned before a single screen.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Flows, information architecture, and structural skeleton. Design decisions that stay maintainable.",
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

type Stage = (typeof stages)[number];

function StageRowContent({
  stage,
  inverted = false,
}: {
  stage: Stage;
  inverted?: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center border text-[10px] font-mono z-10",
          inverted
            ? "bg-primary border-primary-foreground/25 text-primary-foreground"
            : "bg-background border-border text-primary"
        )}
      >
        {stage.num}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
        <span
          className={cn(
            "md:hidden text-[10px] font-mono mb-2",
            inverted ? "text-primary-foreground/70" : "text-primary"
          )}
        >
          {stage.num}
        </span>
        <h3
          className={cn(
            "md:col-span-4 text-2xl font-light italic font-serif normal-case tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {stage.title}
        </h3>
        <p
          className={cn(
            "md:col-span-8 font-light leading-relaxed",
            inverted ? "text-primary-foreground/75" : "text-muted-foreground"
          )}
        >
          {stage.desc}
        </p>
      </div>
    </>
  );
}

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
            className="absolute left-[19px] top-0 bottom-0 w-px bg-primary/40 hidden md:block origin-top z-20 pointer-events-none"
          />
          <div className="flex flex-col gap-3 md:gap-0">
            {stages.map((stage) => (
              <div
                key={stage.num}
                data-gsap="process-step"
                className="relative overflow-hidden cursor-pointer max-md:mx-3 max-md:rounded-md max-md:border max-md:border-border md:mx-0 md:border-b md:border-border md:last:border-0 md:rounded-none"
              >
                {/* Invisible sizer — keeps row height stable while both layers are absolute */}
                <div
                  className="invisible pointer-events-none px-5 py-7 sm:px-6 md:px-0 md:pl-16 md:py-8"
                  aria-hidden
                >
                  <StageRowContent stage={stage} />
                </div>

                {/* Resting layer (box2) */}
                <div
                  data-gsap="process-box2"
                  className="absolute inset-0 z-0 px-5 py-7 sm:px-6 md:px-0 md:pl-16 md:py-8 bg-background"
                >
                  <StageRowContent stage={stage} />
                </div>

                {/* Hover cover (box1) — slides down from above */}
                <div
                  data-gsap="process-box1"
                  className="absolute inset-0 z-10 px-5 py-7 sm:px-6 md:px-0 md:pl-16 md:py-8 bg-primary -translate-y-full"
                  aria-hidden
                >
                  <StageRowContent stage={stage} inverted />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
