import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ServiceCard({ num, title, desc, deliverables }: { num: string, title: string, desc: string, deliverables: string[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative flex flex-col p-6 md:p-8 bg-surface border border-border rounded-none cursor-default overflow-hidden group hover:bg-surface-elevated transition-colors"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">Service {num}</div>
      <h3 className="text-3xl font-light italic tracking-tight font-serif mb-3">{title}</h3>
      <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">{desc}</p>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-border flex flex-wrap gap-2">
              {deliverables.map(d => (
                <span key={d} className="text-[9px] uppercase tracking-wider px-2 py-1 rounded-none bg-background text-muted-foreground border border-border font-mono">
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

export function Services() {
  const services = [
    {
      num: "01",
      title: "0-to-1 Product Design",
      desc: "Taking raw ideas and messy constraints, and turning them into structured, buildable interfaces ready for engineering.",
      deliverables: ["Wireframes", "User Flows", "High-fi Prototypes", "Design System Setup"]
    },
    {
      num: "02",
      title: "Frontend Architecture",
      desc: "Building the foundations of scalable React applications, setting up routing, state management, and component boundaries.",
      deliverables: ["React / Next.js", "State Management", "Performance Tuning", "API Integration"]
    },
    {
      num: "03",
      title: "Design Systems",
      desc: "Auditing inconsistent UIs and creating a single source of truth that speeds up both design and development.",
      deliverables: ["Figma Libraries", "Tailwind Config", "Component Stories", "Documentation"]
    },
    {
      num: "04",
      title: "Growth & Optimization",
      desc: "Finding where users drop off and fixing the friction. Focused strictly on activation and retention funnels.",
      deliverables: ["UX Audits", "A/B Test Design", "Analytics Review", "Onboarding Flows"]
    }
  ];

  return (
    <section id="services" className="w-full py-24 md:py-32 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 lg:col-span-3">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">How I can help</h2>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">Most engagements fall into one of these. If yours doesn't, ask anyway.</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.2em] rounded-none hover:brightness-110 transition-all">
              Discuss your project
            </a>
          </div>
          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(s => (
              <ServiceCard key={s.num} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
