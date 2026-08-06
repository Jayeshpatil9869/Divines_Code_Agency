import { motion } from 'framer-motion';

export function WhyMe() {
  const points = [
    { title: "Direct access", desc: "You get the senior person you interviewed. Every day. No account manager in between." },
    { title: "Faster velocity", desc: "Zero overhead, zero internal politics. I design in code, cutting handoff time to zero." },
    { title: "Aligned incentives", desc: "Agencies sell hours. I sell outcomes. If I can solve it in a day, I will." }
  ];

  return (
    <section className="w-full py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-6">Why a freelancer instead of an agency</h2>
            <p className="text-lg text-muted-foreground font-light">
              When you hire an agency, you're paying for their office, their bench time, and their project managers. With me, every dollar goes into the product.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2"
              >
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-foreground">{point.title}</h3>
                <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="w-full py-32 md:py-48 bg-foreground text-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,6vw,5rem)] leading-[0.85] font-black tracking-[-0.04em] uppercase max-w-4xl mb-8"
        >
          Good design is mostly deciding what to <span className="text-primary" style={{ WebkitTextStroke: '1px var(--color-background)', color: 'transparent' }}>leave out</span>.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-background/70 max-w-2xl font-serif font-light italic tracking-tight"
        >
          I'd rather ship four things properly than twelve things approximately.
        </motion.p>
      </div>
    </section>
  );
}
