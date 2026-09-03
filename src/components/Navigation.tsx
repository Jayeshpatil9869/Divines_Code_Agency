import { useState, useEffect, useRef, useLayoutEffect, useId } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateNavReveal, animateMobileMenu } from "@/animations";
import { getLenis } from "@/hooks/useLenis";
import { ServicesMegaMenu } from "@/components/ServicesMegaMenu";
import { services, servicePath } from "@/data/services";

export function Navigation({ introReady = true }: { introReady?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);
  const megaId = useId();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isHome = location.pathname === "/";
  const onServicesRoute = location.pathname.startsWith("/services");

  useGsap(
    rootRef,
    (root) => {
      if (!introReady) return;
      animateNavReveal(root);
    },
    [introReady]
  );

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

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
    if (mobileMenuOpen) animateMobileMenu(panel, true);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const wrap = servicesWrapRef.current;
      if (wrap && !wrap.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [servicesOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openServices = () => {
    clearCloseTimer();
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  const onServicesTriggerClick = () => {
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
      setServicesOpen(false);
      navigate("/services");
      return;
    }
    setServicesOpen((v) => !v);
  };

  const closeMenu = () => {
    const panel = panelRef.current;
    if (!panel) {
      setMobileMenuOpen(false);
      return;
    }
    const tl = animateMobileMenu(panel, false);
    if (tl) tl.eventCallback("onComplete", () => setMobileMenuOpen(false));
    else setMobileMenuOpen(false);
  };

  const hashHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const links = [
    { label: "Work", href: hashHref("#work") },
    { label: "Process", href: hashHref("#process") },
    { label: "About", href: hashHref("#about") },
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
            "flex items-center justify-between pointer-events-auto transition-all duration-300 relative",
            scrolled
              ? "w-full max-w-180 px-6 py-3 bg-background/70 backdrop-blur-xl border-b border-border rounded-full overflow-visible"
              : "w-full max-w-7xl px-0 bg-transparent border-transparent rounded-none overflow-visible"
          )}
        >
          {scrolled && (
            <div
              ref={progressRef}
              className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left will-change-transform rounded-full overflow-hidden"
              style={{ transform: "scaleX(0)" }}
            />
          )}

          <Link
            to="/"
            data-gsap="nav-brand"
            className="font-display text-xl tracking-tighter uppercase font-black"
          >
            Divine<span className="text-primary">'</span>s
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Magnetic strength={0.2}>
              <NavShimmerLink href={links[0].href} label={links[0].label} />
            </Magnetic>

            <div
              ref={servicesWrapRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                type="button"
                data-gsap="nav-link"
                aria-expanded={servicesOpen}
                aria-controls={megaId}
                aria-haspopup="true"
                onClick={onServicesTriggerClick}
                onFocus={openServices}
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity",
                  servicesOpen || onServicesRoute ? "opacity-100" : "opacity-60"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-300",
                    servicesOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              <ServicesMegaMenu
                id={megaId}
                open={servicesOpen}
                onClose={() => setServicesOpen(false)}
              />
            </div>

            {links.slice(1).map((link) => (
              <Magnetic key={link.label} strength={0.2}>
                <NavShimmerLink href={link.href} label={link.label} />
              </Magnetic>
            ))}

            <Magnetic strength={0.25}>
              <Link
                to={hashHref("#contact")}
                data-gsap="nav-cta"
                className="text-[11px] uppercase tracking-[0.2em] font-bold px-4 py-2 bg-primary text-primary-foreground hover:brightness-110 transition-all"
              >
                Start a project
              </Link>
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
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden px-6 overflow-y-auto"
        >
          <a
            href={links[0].href}
            data-gsap="mobile-link"
            onClick={closeMenu}
            className="text-2xl uppercase tracking-widest font-black"
          >
            Work
          </a>

          <div className="w-full max-w-sm flex flex-col items-center gap-3">
            <button
              type="button"
              data-gsap="mobile-link"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-2xl uppercase tracking-widest font-black"
            >
              Services
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform",
                  mobileServicesOpen && "rotate-180"
                )}
              />
            </button>
            {mobileServicesOpen && (
              <ul className="w-full border border-border rounded-xl overflow-hidden divide-y divide-border">
                <li>
                  <Link
                    to="/services"
                    onClick={closeMenu}
                    className="block px-4 py-3 text-[11px] uppercase tracking-[0.18em] font-bold text-primary"
                  >
                    All services
                  </Link>
                </li>
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={servicePath(s.slug)}
                      onClick={closeMenu}
                      className="flex items-baseline gap-3 px-4 py-3"
                    >
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {s.num}
                      </span>
                      <span className="text-sm font-medium normal-case tracking-tight">
                        {s.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {links.slice(1).map((link) => (
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
          <Link
            to={hashHref("#contact")}
            data-gsap="mobile-link"
            onClick={closeMenu}
            className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs"
          >
            Start a project
          </Link>
        </div>
      )}
    </>
  );
}

function NavShimmerLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const isRouteHash = href.startsWith("/#");
  const className = cn(
    "text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity",
    hovered ? "opacity-100" : "opacity-60 text-foreground"
  );
  const content = hovered ? (
    <TextShimmer duration={1.6}>{label}</TextShimmer>
  ) : (
    label
  );

  if (isRouteHash) {
    return (
      <Link
        to={href}
        data-gsap="nav-link"
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-gsap="nav-link"
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </a>
  );
}
