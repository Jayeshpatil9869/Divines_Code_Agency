import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateCards, animateSectionReveals } from "@/animations";

const engagements = [
  {
    title: "Design Sprint",
    duration: "2–3 weeks",
    cadence: "Daily syncs",
    desc: "Rough idea to high-fidelity interactive prototype — for funding or internal buy-in.",
    price: "From $8k",
  },
  {
    title: "0-to-1 Build",
    duration: "8–12 weeks",
    cadence: "Weekly reviews",
    desc: "Full product design and frontend engineering. Blank canvas to production-ready codebase.",
    price: "From $25k",
    popular: true,
  },
  {
    title: "Growth Retainer",
    duration: "3+ months",
    cadence: "Async + bi-weekly",
    desc: "Ongoing partnership to optimize funnels, audit UX, and ship high-impact frontend.",
    price: "$6k / month",
  },
];

export function Pricing() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateCards(root, '[data-gsap="card"]'), []);

  return (
    <section id="pricing" ref={rootRef} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Straightforward engagements
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Fixed scope, fixed price, or a monthly retainer. No hourly billing — it punishes efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagements.map((eng) => (
            <div
              key={eng.title}
              data-gsap="card"
              className={`relative flex flex-col p-8 border border-border bg-surface min-h-[360px] ${
                eng.popular ? "bg-surface-elevated" : ""
              }`}
            >
              {eng.popular && <BorderBeam size={70} duration={8} />}
              {eng.popular && (
                <span className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-widest text-primary">
                  Most booked
                </span>
              )}
              <h3 className="text-2xl font-light italic font-serif normal-case mb-2 tracking-tight">
                {eng.title}
              </h3>
              <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
                <span>{eng.duration}</span>
                <span>·</span>
                <span>{eng.cadence}</span>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1 mb-8">
                {eng.desc}
              </p>
              <div className="text-2xl font-black tracking-tight mb-6">{eng.price}</div>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex text-[11px] uppercase tracking-[0.2em] font-bold border-b border-border pb-1 hover:border-primary hover:text-primary transition-colors"
                >
                  Inquire →
                </a>
              </Magnetic>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  return (
    <section ref={rootRef} className="w-full py-24 md:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <div data-gsap="reveal" className="mb-12">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Questions we get asked
          </h2>
        </div>

        <div data-gsap="reveal">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-[13px] md:text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
