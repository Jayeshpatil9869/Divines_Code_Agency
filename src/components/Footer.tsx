import { useEffect, useState, useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateFooter, bindFooterSpotlight } from "@/animations";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useGsap(rootRef, (root) => animateFooter(root), []);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    return bindFooterSpotlight(el);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      ref={rootRef}
      className="w-full pt-12 md:pt-16 pb-6 overflow-hidden bg-background relative border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-6 md:mb-8">
          <div data-gsap="footer-item" className="col-span-2 md:col-span-1">
            <h3 className="font-display text-xl font-black tracking-tighter uppercase mb-6">
              Divine<span className="text-primary">&apos;</span>s
            </h3>
            <p className="text-[11px] text-muted-foreground max-w-[220px] font-light leading-relaxed">
              Product design and frontend engineering for startups that ship.
            </p>
          </div>

          <div data-gsap="footer-item" className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Work
            </h4>
            <a
              href="#work"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
            >
              Selected Projects
            </a>
            <a
              href="#services"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
            >
              Process
            </a>
            <a
              href="#pricing"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </div>

          <div data-gsap="footer-item" className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Connect
            </h4>
            <Magnetic strength={0.15}>
              <a
                href="https://twitter.com"
                className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
              >
                Twitter / X
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="https://linkedin.com"
                className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="https://github.com"
                className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </Magnetic>
          </div>

          <div data-gsap="footer-item" className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Details
            </h4>
            <a
              href="mailto:hello@divinescode.agency"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors break-all"
            >
              hello@divinescode.agency
            </a>
            <a
              href="#contact"
              className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors"
            >
              Start a project
            </a>
            <span className="text-[11px] font-mono text-muted-foreground mt-2">
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Full-bleed wordmark — outside max-width so it can span the viewport */}
      <div
        data-gsap="footer-item"
        className="relative z-10 w-full flex justify-center mb-4 md:mb-5 overflow-hidden leading-none"
      >
        <div
          ref={spotRef}
          tabIndex={0}
          role="img"
          aria-label="Divine's"
          className="footer-spot font-display font-black uppercase tracking-[-0.07em]"
          style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
        >
          <span className="footer-spot__beam" aria-hidden>
            Divine&apos;s
          </span>
          <span className="footer-spot__base">Divine&apos;s</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          data-gsap="footer-item"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
        >
          <span>© {new Date().getFullYear()} Divine&apos;s Code Agency</span>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-normal">
            <span>Made with ❤️ for your brand</span>
            <span aria-hidden>·</span>
            <a
              href="https://jayeshbpatil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              jayeshbpatil.com
            </a>
            <span aria-hidden>·</span>
            <a
              href="https://mahendranagpure.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              mahendranagpure.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
