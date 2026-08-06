import { motion } from 'framer-motion';

export function Logos() {
  const companies = [
    "Linear", "Stripe", "Vercel", "Raycast", "Arc", "Figma", "Notion", "Cron"
  ];

  return (
    <section className="w-full py-16 md:py-24 border-t border-border overflow-hidden bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2 className="text-sm text-muted-foreground font-medium">Trusted by teams shipping something serious</h2>
      </div>
      
      <div className="relative flex overflow-hidden whitespace-nowrap">
        {/* We use two identical blocks to loop seamlessly */}
        <motion.div 
          className="flex gap-16 px-8 items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {companies.map((company, i) => (
            <div key={i} className="font-display text-3xl md:text-4xl opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              {company}
            </div>
          ))}
        </motion.div>
        <motion.div 
          className="flex gap-16 px-8 items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {companies.map((company, i) => (
            <div key={`copy-${i}`} className="font-display text-3xl md:text-4xl opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
