import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-6 py-6 flex justify-center",
        scrolled ? "pt-6" : "pt-8"
      )}>
        <div className={cn(
          "flex items-center justify-between pointer-events-auto transition-all duration-300 relative overflow-hidden",
          scrolled 
            ? "w-full max-w-[720px] px-6 py-3 bg-background/70 backdrop-blur-xl border-b border-border rounded-full" 
            : "w-full max-w-7xl px-0 bg-transparent border-transparent rounded-none"
        )}>
          {scrolled && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left"
              style={{ scaleX }}
            />
          )}
          
          <a href="#" className="font-display text-xl tracking-tighter uppercase font-black">
            NAME<span className="text-primary">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 text-foreground transition-opacity"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-100 text-foreground hover:text-primary transition-colors"
            >
              Start a project
            </a>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col px-6 py-8 md:hidden">
          <div className="flex justify-between items-center mb-16">
            <span className="font-display text-xl font-black tracking-tighter uppercase">NAME<span className="text-primary">.</span></span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex flex-col gap-8 text-3xl font-display">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary transition-colors uppercase font-black tracking-tighter"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          <div className="mt-auto">
            <a 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-primary text-primary-foreground py-4 rounded-none font-bold uppercase tracking-[0.2em] text-[11px]"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </>
  );
}
