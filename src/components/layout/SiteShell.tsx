import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { registerGsapPlugins } from "@/animations";
import { useLenis, getLenis } from "@/hooks/useLenis";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

type SiteShellProps = {
  introReady?: boolean;
  children?: ReactNode;
};

/** Shared chrome: noise, cursor, nav, footer. Scroll resets on route change. */
export function SiteShell({ introReady = true, children }: SiteShellProps) {
  const location = useLocation();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [desktopPointer, setDesktopPointer] = useState(false);

  useLenis();

  useEffect(() => {
    registerGsapPlugins();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    setReducedMotion(motionQuery.matches);
    setDesktopPointer(desktopQuery.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onDesktop = (e: MediaQueryListEvent) => setDesktopPointer(e.matches);
    motionQuery.addEventListener("change", onMotion);
    desktopQuery.addEventListener("change", onDesktop);
    return () => {
      motionQuery.removeEventListener("change", onMotion);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    const hash = location.hash?.replace("#", "");

    if (hash) {
      const scrollToHash = () => {
        const el = document.getElementById(hash);
        if (!el) return false;
        if (lenis) lenis.scrollTo(el, { offset: -24 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };
      if (!scrollToHash()) {
        const t = window.setTimeout(scrollToHash, 120);
        return () => window.clearTimeout(t);
      }
      return;
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const isShowcase =
    location.pathname === "/showcase" || location.pathname === "/projects";

  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" aria-hidden />
      {!reducedMotion && desktopPointer && <CustomCursor />}
      <Navigation introReady={introReady} />
      <main className="relative z-10 flex flex-col w-full overflow-x-clip">
        {children ?? <Outlet />}
      </main>
      {!isShowcase && <Footer />}
    </div>
  );
}

