import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    { num: "01", title: "Discovery", desc: "Understanding the business goals, technical constraints, and user needs.", deliverable: "Project Brief" },
    { num: "02", title: "Architecture", desc: "Mapping out flows, data models, and the structural skeleton.", deliverable: "Wireframes" },
    { num: "03", title: "Design", desc: "Creating the visual language and high-fidelity interface components.", deliverable: "Figma Prototype" },
    { num: "04", title: "Build", desc: "Translating design into clean, performant, and accessible code.", deliverable: "Production Code" },
    { num: "05", title: "Handover", desc: "Ensuring your team can maintain and extend the work safely.", deliverable: "Documentation" }
  ];

  return (
    <section id="process" className="w-full py-24 md:py-32 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">A predictable way to work</h2>
          <p className="text-lg text-muted-foreground font-light">Five stages, fixed checkpoints, no surprise invoices.</p>
        </div>

        <div className="relative">
          {/* Connector Line Desktop */}
          <div className="hidden md:block absolute top-[24px] left-0 right-0 h-[1px] bg-border z-0">
            <motion.div 
              className="h-full bg-primary origin-left"
              style={{ scaleX }}
            />
          </div>

          {/* Connector Line Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-[24px] w-[1px] bg-border z-0">
            <motion.div 
              className="w-full bg-primary origin-top"
              style={{ scaleY: scaleX }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 flex md:flex-col gap-6 md:gap-8 group">
                <div className="flex flex-col items-center md:items-start shrink-0">
                  <div className="w-12 h-12 rounded-none bg-background border border-border flex items-center justify-center font-mono text-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors relative z-10 font-bold">
                    {step.num}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-light italic tracking-tight font-serif mb-2">{step.title}</h3>
                  <p className="text-[11px] text-muted-foreground mb-6 min-h-[60px] font-sans pr-4">{step.desc}</p>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 bg-background border border-border rounded-none text-muted-foreground">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
