import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateNavReveal, animateMobileMenu } from "@/animations";
import { getLenis } from "@/hooks/useLenis";

export function Navigation({ introReady = true }: { introReady?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGsap(
    rootRef,
    (root) => {
      if (!introReady) return;
      animateNavReveal(root);
    },
    [introReady]
  );

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const next = y > 80;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }

      const bar = progressRef.current;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        bar.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      html.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [mobileMenuOpen]);

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
          scrolled ? "pt-6" : "pt-8",
          !introReady && "**:data-gsap:opacity-0"
        )}
      >
        <div
          data-gsap="nav-shell"
          className={cn(
            "flex items-center justify-between pointer-events-auto transition-all duration-300 relative overflow-hidden",
            scrolled
              ? "w-full max-w-180 px-6 py-3 bg-background/70 backdrop-blur-xl border-b border-border rounded-full"
              : "w-full max-w-7xl px-0 bg-transparent border-transparent rounded-none"
          )}
        >
          {scrolled && (
            <div
              ref={progressRef}
              className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
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
                <NavShimmerLink href={link.href} label={link.label} />
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
            className="md:hidden inline-flex items-center justify-center min-h-11 min-w-11 p-2"
            onClick={() => (mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true))}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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

function NavShimmerLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      data-gsap="nav-link"
      className={cn(
        "text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity",
        hovered ? "opacity-100" : "opacity-60 text-foreground"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <TextShimmer duration={1.6}>{label}</TextShimmer>
      ) : (
        label
      )}
    </a>
  );
}
