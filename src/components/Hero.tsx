import { motion } from 'framer-motion';

export function Hero() {
  const headline = "I design and build the products people actually finish using.";
  
  return (
    <section className="relative w-full min-h-[92dvh] flex flex-col justify-center px-6 pt-[18vh] pb-12 overflow-hidden max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, hsl(var(--primary)/0.04) 0%, transparent 100%)',
          filter: 'blur(40px)'
        }}
      />

      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 relative z-10">
        
        {/* Availability Chip */}
        <div className="col-span-4 md:col-span-12 flex justify-start mb-8 md:mb-0 md:absolute md:-top-12 md:left-0">
          <div className="inline-flex items-center gap-2">
            <span className="text-primary text-[12px] uppercase tracking-[0.4em] font-bold">Available March</span>
          </div>
        </div>

        {/* Headline */}
        <div className="col-span-4 md:col-span-10 lg:col-span-9 flex flex-col gap-6 relative mt-12 md:mt-0">
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] font-black tracking-[-0.04em] uppercase mb-4">
            <motion.span className="block" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>I design & build</motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>the products people</motion.span>
            <motion.span className="block text-transparent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ WebkitTextStroke: '1px var(--color-muted-foreground)' }}>actually finish using.</motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-lg text-lg text-muted-foreground leading-relaxed font-light mt-2"
          >
            Independent product designer and frontend engineer. Ten years, embedded with SaaS teams from zero-to-one through Series B.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4"
          >
            {/* Primary CTA wrapped in magnetic-like effect */}
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.02 }}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs transition-all hover:brightness-110 rounded-none"
            >
              Start a project &rarr;
            </motion.a>
            <a 
              href="#work"
              className="px-8 py-4 bg-transparent border border-border text-foreground font-bold tracking-widest uppercase text-xs transition-colors hover:border-foreground/40 rounded-none"
            >
              See selected work
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 pt-8 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex gap-6 items-center opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale">
              <div className="font-display text-xl font-bold">Acme Corp</div>
              <div className="font-display text-xl italic">GlobalTech</div>
              <div className="font-display text-xl font-medium tracking-tighter">Nexus</div>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground ml-auto hidden sm:block">
              32 products shipped &middot; avg. engagement 7 months
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-border overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-full h-full bg-foreground"
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
