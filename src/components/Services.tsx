import { useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useGsap, animateCards } from "@/animations";

const services = [
  {
    num: "01",
    title: "0-to-1 Product Design",
    desc: "Raw ideas and messy constraints into structured, buildable interfaces ready for engineering.",
    deliverables: ["User flows", "High-fidelity UI", "Interactive prototype", "Handoff specs"],
  },
  {
    num: "02",
    title: "Frontend Architecture",
    desc: "Foundations for scalable React apps — routing, state, and component boundaries that last.",
    deliverables: ["App shell", "Design tokens", "Component library", "Perf budgets"],
  },
  {
    num: "03",
    title: "Design Systems",
    desc: "Audit inconsistent UIs and create a single source of truth that speeds design and development.",
    deliverables: ["Token system", "Primitives", "Docs", "Adoption plan"],
  },
  {
    num: "04",
    title: "Growth & Optimization",
    desc: "Find where users drop off and fix the friction. Focused on activation and retention.",
    deliverables: ["Funnel audit", "Experiment plan", "Ship cycles", "Impact report"],
  },
];

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateCards(root, '[data-gsap="card"]'), []);

  return (
    <section id="services" ref={rootRef} className="w-full py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            How we can help
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-lg">
            Most engagements fall into one of these. If yours doesn&apos;t, ask anyway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <div key={s.num} data-gsap="card">
              <ServiceCard {...s} highlight={i === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  num,
  title,
  desc,
  deliverables,
  highlight,
}: {
  num: string;
  title: string;
  desc: string;
  deliverables: string[];
  highlight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col p-6 md:p-8 bg-background border border-border overflow-hidden group hover:bg-surface-elevated transition-colors h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {highlight && <BorderBeam size={50} duration={9} delay={1} />}
      <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">
        Service {num}
      </div>
      <h3 className="text-2xl md:text-3xl font-light italic tracking-tight font-serif mb-3 normal-case">
        {title}
      </h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed font-light">{desc}</p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-border flex flex-wrap gap-2">
              {deliverables.map((d) => (
                <span
                  key={d}
                  className="text-[9px] uppercase tracking-wider px-2 py-1 bg-surface text-muted-foreground border border-border font-mono"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
