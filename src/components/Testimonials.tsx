import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Jonathan didn't just build what we asked for—he pointed out the flaws in our onboarding logic and redesigned it before writing a single line of code. We saw a 40% jump in completion rates.",
      name: "Sarah Jenkins",
      role: "VP Product",
      company: "Acme Corp"
    },
    {
      quote: "The cleanest frontend architecture I've seen in my career. When we finally hired an internal team, they were able to pick up the codebase in two days with zero friction.",
      name: "Marcus Lin",
      role: "CTO",
      company: "Nexus"
    },
    {
      quote: "Most freelancers vanish for two weeks and come back with a surprise. Jonathan communicated every single day, shipped incrementally, and hit the deadline exactly as promised.",
      name: "Elena Rostova",
      role: "Founder",
      company: "GlobalTech"
    },
    {
      quote: "He operates like a fractional Head of Design who happens to also write production-ready code. A very rare combination.",
      name: "David Chen",
      role: "Engineering Manager",
      company: "Raycast"
    }
  ];

  return (
    <section className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-16 text-center">What it's like to work with me</h2>
        
        {/* Hero Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mb-20 text-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] font-display text-foreground opacity-5 leading-none select-none pointer-events-none -mt-8">
            &ldquo;
          </div>
          <p className="text-3xl md:text-4xl leading-relaxed font-serif font-light italic text-foreground mb-8 relative z-10 tracking-tight">
            "Jonathan is the rare partner who pushes back on bad ideas. He saved us from building a complex feature nobody wanted, and instead designed a simple flow that solved the core problem in a week."
          </p>
          <div className="flex flex-col items-center gap-2">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-12 h-12 rounded-full grayscale" />
            <div className="font-medium">Rebecca Stone</div>
            <div className="text-sm text-muted-foreground">CEO, FinFlow</div>
          </div>
        </motion.div>

        {/* Masonry Grid (simulated with 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6">
            {[testimonials[0], testimonials[2]].map((t, i) => (
              <div key={i} className="p-8 bg-surface border border-border rounded-none relative overflow-hidden group hover:bg-surface-elevated transition-colors">
                <div className="absolute top-4 left-4 text-6xl font-serif italic text-foreground opacity-5 select-none pointer-events-none">&ldquo;</div>
                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 font-sans font-light italic text-sm">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-background flex items-center justify-center font-display font-black text-lg text-primary border border-border">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider text-foreground">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col gap-6">
            {[testimonials[1], testimonials[3]].map((t, i) => (
              <div key={i} className="p-8 bg-surface border border-border rounded-none relative overflow-hidden group hover:bg-surface-elevated transition-colors">
                <div className="absolute top-4 left-4 text-6xl font-serif italic text-foreground opacity-5 select-none pointer-events-none">&ldquo;</div>
                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 font-sans font-light italic text-sm">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-background flex items-center justify-center font-display font-black text-lg text-primary border border-border">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider text-foreground">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
