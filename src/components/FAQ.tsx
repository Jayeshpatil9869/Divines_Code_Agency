import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Pricing() {
  const engagements = [
    {
      title: "Design Sprint",
      duration: "2-3 weeks",
      cadence: "Daily syncs",
      desc: "Perfect for taking a rough idea to a high-fidelity interactive prototype to secure funding or internal buy-in.",
      price: "From $8k"
    },
    {
      title: "0-to-1 Build",
      duration: "8-12 weeks",
      cadence: "Weekly reviews",
      desc: "Full product design and frontend engineering. We go from blank canvas to a production-ready codebase.",
      price: "From $25k",
      popular: true
    },
    {
      title: "Growth Retainer",
      duration: "3+ months",
      cadence: "Async + bi-weekly",
      desc: "Ongoing partnership to optimize funnels, audit UX, and implement high-impact frontend features.",
      price: "$6k / month"
    }
  ];

  return (
    <section className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">Straightforward engagements</h2>
          <p className="text-lg text-muted-foreground font-light">Fixed scope, fixed price, or a monthly retainer. No hourly billing — it punishes efficiency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagements.map((eng, i) => (
            <div 
              key={i} 
              className={`flex flex-col p-8 rounded-none bg-surface relative ${
                eng.popular ? 'border border-primary' : 'border border-border'
              }`}
            >
              {eng.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-none font-bold">
                  Most Common
                </div>
              )}
              
              <h3 className="text-3xl font-light italic tracking-tight font-serif mb-2">{eng.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 bg-background border border-border rounded-none text-muted-foreground">
                  {eng.duration}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 bg-background border border-border rounded-none text-muted-foreground">
                  {eng.cadence}
                </span>
              </div>
              
              <p className="text-[11px] font-sans text-muted-foreground mb-8 flex-1 leading-relaxed">{eng.desc}</p>
              
              <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                <span className="font-mono text-primary font-bold text-sm tracking-widest">{eng.price}</span>
                <a href="#contact" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Inquire &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "Do you build the backend too?",
      a: "I specialize in Product Design and Frontend Engineering (React, TypeScript). I am comfortable wiring up BaaS like Supabase or Firebase, but for complex custom Node/Python backends, I prefer to collaborate with your existing backend team or bring in a trusted partner."
    },
    {
      q: "How do you handle timezones?",
      a: "I'm based in Southeast Asia. I overlap with EU mornings and US evenings. I rely heavily on asynchronous communication (Loom, Slack, Notion) so progress happens around the clock without needing to be on endless Zoom calls."
    },
    {
      q: "Can we hire you full-time later?",
      a: "I run my own independent practice and do not take full-time offers. However, part of my handover process is ensuring your internal team (or future hires) can easily take over the codebase and design system."
    },
    {
      q: "What if we don't like the design?",
      a: "We don't do 'big reveals'. You will see wireframes, work-in-progress, and structural decisions very early in the process. We course-correct incrementally, so the final delivery is never a surprise."
    }
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full py-24 border-t border-border bg-surface/20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-12">Questions I get asked</h2>
        
        <div className="flex flex-col border-t border-border">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button 
                className="w-full flex items-center justify-between py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-xl font-light italic tracking-tight font-serif group-hover:text-primary transition-colors">{faq.q}</span>
                <span className={`text-muted-foreground transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[11px] font-sans text-muted-foreground leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
