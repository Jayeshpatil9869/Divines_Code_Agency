import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Magnetic } from "@/components/ui/magnetic";
import {
  useGsap,
  animateFaq,
  expandFaqPanel,
  collapseFaqPanel,
  setFaqPanelState,
  prefersReducedMotion,
} from "@/animations";

const faqs = [
  {
    q: "Do you build the backend too?",
    a: "We specialize in product design and frontend engineering (React, TypeScript). We wire BaaS like Supabase or Firebase. For complex custom Node/Python backends, we collaborate with your engineers or a trusted partner.",
  },
  {
    q: "How do you handle timezones?",
    a: "Core overlap windows are agreed upfront. Async updates land daily. Live reviews happen in your preferred morning or evening slot.",
  },
  {
    q: "Can we hire you full-time later?",
    a: "Occasionally we convert to fractional or embedded roles after a successful project. We don't compete with your hiring — we help you ship until the team is ready.",
  },
  {
    q: "What if we don't like the design?",
    a: "Checkpoints are built in. If direction is wrong early, we course-correct before build. Fixed-scope work includes defined revision rounds.",
  },
];

export function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useGsap(rootRef, (root) => animateFaq(root), []);

  return (
    <section
      id="faq"
      ref={rootRef}
      className="relative w-full py-24 md:py-32 lg:min-h-[100svh] lg:flex lg:items-center border-t border-border overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[min(70vw,28rem)] h-88 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">
          <div data-gsap="faq-header" className="lg:col-span-4 lg:self-center">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-4">
              FAQ
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-5">
              Questions we get asked
            </h2>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8 max-w-sm">
              <TextShimmer duration={3}>
                Straight answers. No sales fog. If yours isn’t here, ask anyway.
              </TextShimmer>
            </p>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white/25 pb-1 hover:border-primary hover:text-primary transition-colors"
              >
                Ask a question →
              </a>
            </Magnetic>
          </div>

          <div className="lg:col-span-8 w-full flex flex-col justify-center gap-3 lg:self-center">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                index={i}
                question={faq.q}
                answer={faq.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  question,
  answer,
  open,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const openRef = useRef(open);
  const mountedRef = useRef(false);
  const panelId = `faq-panel-${index}`;

  useLayoutEffect(() => {
    const item = itemRef.current;
    const panel = panelRef.current;
    const body = bodyRef.current;
    if (!item || !panel || !body) return;

    const els = {
      item,
      panel,
      body,
      title: titleRef.current,
      icon: iconRef.current,
    };

    if (!mountedRef.current) {
      mountedRef.current = true;
      setFaqPanelState(els, open);
      openRef.current = open;
      return;
    }

    if (openRef.current === open) return;

    if (prefersReducedMotion()) {
      setFaqPanelState(els, open);
      openRef.current = open;
      return;
    }

    if (open) {
      expandFaqPanel(els);
    } else {
      collapseFaqPanel(els);
    }

    openRef.current = open;
  }, [open]);

  return (
    <div
      ref={itemRef}
      data-gsap="faq-item"
      data-state={open ? "open" : "closed"}
      className="overflow-hidden border border-white/12 bg-black/60 will-change-[border-color,background-color]"
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 md:px-6 py-5 md:py-6 text-left text-[13px] md:text-[15px] font-medium uppercase tracking-[0.14em]"
        >
          <span className="flex items-start gap-4 md:gap-5 pr-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary pt-0.5 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span ref={titleRef} className="leading-snug text-white/75">
              {question}
            </span>
          </span>
          <ChevronDown
            ref={iconRef}
            className="h-4 w-4 shrink-0 text-white/35"
            aria-hidden
          />
        </button>
      </h3>

      <div
        id={panelId}
        ref={panelRef}
        role="region"
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div
          ref={bodyRef}
          className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] md:text-[15px] leading-relaxed font-light"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          <div className="pl-9 md:pl-12 border-l border-primary/40 ml-1">
            <p className="pl-4">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
