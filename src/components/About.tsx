import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative aspect-square md:aspect-[4/5] rounded-none overflow-hidden bg-surface"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale-[20%] opacity-90"
            />
          </motion.div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-6">Hi, I'm Jonathan.</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-sans font-light">
              <p>
                I've spent ten years in rooms where design and engineering argue. I'm useful because I speak both.
              </p>
              <p>
                My background isn't in making things look pretty—it's in making complex systems legible. Before freelancing, I led frontend teams at Series B startups, learning exactly why beautiful designs fail in production when they aren't grounded in technical reality.
              </p>
              <p>
                Now I operate independently, partnering with founders and technical teams to ship software that works as well as it looks. No handoffs, no middle management, just direct communication and fast iterations.
              </p>
            </div>
            <div className="mt-10">
              <a href="#process" className="text-foreground font-bold text-[11px] uppercase tracking-[0.2em] border-b border-border pb-1 hover:border-primary transition-colors hover:text-primary">
                More about how I work &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
