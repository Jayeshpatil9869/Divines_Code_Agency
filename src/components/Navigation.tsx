import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateNavReveal, animateMobileMenu, gsap } from "@/animations";

export function Navigation() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useGsap(rootRef, (root) => animateNavReveal(root), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (mobileMenuOpen) {
      animateMobileMenu(panel, true);
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    const panel = panelRef.current;
    if (!panel) {
      setMobileMenuOpen(false);
      return;
    }
    const tl = animateMobileMenu(panel, false);
    if (tl) {
      tl.eventCallback("onComplete", () => setMobileMenuOpen(false));
    } else {
      setMobileMenuOpen(false);
    }
  };

  const links = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <header
        ref={rootRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-6 py-6 flex justify-center",
          scrolled ? "pt-6" : "pt-8"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between pointer-events-auto transition-all duration-300 relative overflow-hidden",
            scrolled
              ? "w-full max-w-[720px] px-6 py-3 bg-background/70 backdrop-blur-xl border-b border-border rounded-full"
              : "w-full max-w-7xl px-0 bg-transparent border-transparent rounded-none"
          )}
        >
          {scrolled && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left"
              style={{ scaleX }}
            />
          )}

          <a
            href="#"
            data-gsap="nav-brand"
            className="font-display text-xl tracking-tighter uppercase font-black"
          >
            Divine<span className="text-primary">'</span>s
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Magnetic key={link.label} strength={0.2}>
                <a
                  href={link.href}
                  data-gsap="nav-link"
                  className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 text-foreground transition-opacity"
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.25 })}
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                data-gsap="nav-cta"
                className="text-[11px] uppercase tracking-[0.2em] font-bold px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all"
              >
                Start a project
              </a>
            </Magnetic>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => (mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true))}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          ref={panelRef}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-gsap="mobile-link"
              onClick={closeMenu}
              className="text-2xl uppercase tracking-widest font-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-gsap="mobile-link"
            onClick={closeMenu}
            className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs"
          >
            Start a project
          </a>
        </div>
      )}
    </>
  );
}
