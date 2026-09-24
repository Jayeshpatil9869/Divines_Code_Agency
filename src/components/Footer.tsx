import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateFooter, bindFooterSpotlight } from "@/animations";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_WHATSAPP,
  CONTACT_LINKEDIN,
  COMPANY_TAGLINE,
  COMPANY_BLURB,
} from "@/data/contact";
import { CRAWL_NAV } from "@/data/seo-pages";

const footerLinkClass =
  "text-[11px] md:text-[12px] uppercase tracking-wider font-bold hover:text-primary transition-colors";

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
      className="w-full pt-14 md:pt-20 pb-8 overflow-hidden bg-background relative border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-between pl-6 lg:pl-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-14 w-full">
          <div data-gsap="footer-item" className="flex flex-col items-start text-left max-w-xs">
            <h3 className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase mb-3">
              Divine<span className="text-primary">&apos;</span>s
            </h3>
            <p className="text-xs md:text-sm text-primary uppercase tracking-[0.16em] font-bold mb-2 leading-snug">
              {COMPANY_TAGLINE}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
              {COMPANY_BLURB}
            </p>
          </div>

          <div data-gsap="footer-item" className="flex flex-col items-start text-left gap-3.5 sm:pl-4 lg:pl-28">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">
              Work
            </h4>
            <Magnetic strength={0.18}>
              <Link to="/showcase" className={footerLinkClass}>
                Our Work
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link to="/services" className={footerLinkClass}>
                Services
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link to="/about" className={footerLinkClass}>
                About
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link to="/pricing" className={footerLinkClass}>
                Pricing
              </Link>
            </Magnetic>
            <nav aria-label="All pages" className="sr-only">
              {CRAWL_NAV.map((item) => (
                <Link key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div data-gsap="footer-item" className="flex flex-col items-start text-left gap-3.5 sm:pl-4 lg:pl-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">
              Connect
            </h4>
            <Magnetic strength={0.18}>
              <a
                href={CONTACT_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={footerLinkClass}>
                {CONTACT_EMAIL}
              </a>
            </Magnetic>
          </div>

          <div data-gsap="footer-item" className="flex flex-col items-start text-left gap-3.5 ">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-1">
              Details
            </h4>
            <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
              <Magnetic strength={0.18}>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className={footerLinkClass}
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href={CONTACT_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  WhatsApp
                </a>
              </Magnetic>
            </div>
            <Magnetic strength={0.18}>
              <Link to="/contact" className={footerLinkClass}>
                Start a project
              </Link>
            </Magnetic>
            <span className="text-xs md:text-sm font-mono text-muted-foreground mt-1">
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Full-bleed wordmark — centered with letter spacing and unclipped outline */}
      <div
        data-gsap="footer-item"
        className="relative z-10 w-full flex justify-center mb-4 md:mb-5 overflow-visible px-4 md:px-8 leading-none"
      >
        <div
          ref={spotRef}
          tabIndex={0}
          role="img"
          aria-label="Divine's"
          className="footer-spot font-display font-black uppercase"
          style={{ fontSize: "clamp(4.5rem, 20vw, 21.5rem)" }}
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
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-4 border-t border-border text-xs md:text-[13px] font-mono uppercase tracking-wider text-muted-foreground"
        >
          <span className="shrink-0 whitespace-nowrap">© {new Date().getFullYear()} Divine&apos;s Code Agency</span>
          <p className="normal-case tracking-normal whitespace-nowrap text-left lg:text-right">
            <span>
              Crafted by{" "}
              <a
                href="https://jayeshbpatil.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Jayesh Patil
              </a>
              {", "}
              <a
                href="https://mahendranagpure.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Mahendra Nagpure
              </a>
              {" and "}
              <a
                href="https://www.linkedin.com/in/apurv-ahire2003/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Apurv Ahire
              </a>
              {" — "}Founders of Divine&apos;s Code
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
