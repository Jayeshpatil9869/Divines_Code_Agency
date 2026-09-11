import { useRef } from "react";
import { Link } from "react-router-dom";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cn } from "@/lib/utils";
import { useGsap, animatePricing } from "@/animations";
import { Globe, Server, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { pricedPackages } from "@/data/offerings";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/data/contact";

export function Pricing({ hideHeading = false }: { hideHeading?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animatePricing(root), []);

  return (
    <section
      id="pricing"
      ref={rootRef}
      className={cn(
        "relative w-full border-t border-border overflow-x-clip lg:overflow-hidden",
        hideHeading ? "pt-8 pb-24 md:pb-32" : "py-24 md:py-32",
      )}
    >
      {/* Soft focus wash behind the middle plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,42rem)] h-112 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {hideHeading ? null : (
        <div data-gsap="pricing-header" className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-4">
            Website Packages
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            Clear packages. Clear prices.
          </h2>
          <p className="text-lg font-light text-muted-foreground">
            <TextShimmer duration={3}>
              One-time website builds — Starter to Premium. Custom work is quoted
              separately. Domain and hosting stay on you; Website Care is optional.
            </TextShimmer>
          </p>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 md:items-stretch">
          {pricedPackages.map((pkg, i) => (
            <article
              key={pkg.id}
              data-gsap="pricing-card"
              data-popular={pkg.popular ? "true" : undefined}
              className={cn(
                "group relative flex flex-col overflow-hidden p-6 sm:p-8 min-h-80 sm:min-h-90 lg:min-h-100 transition-[border-color,background-color,transform,box-shadow] duration-500 ease-out will-change-transform",
                "border bg-black/80 backdrop-blur-[2px] hover:-translate-y-2",
                pkg.popular
                  ? "border-primary/70 lg:-translate-y-3 lg:hover:-translate-y-5 lg:min-h-110 shadow-[0_0_0_1px_color-mix(in_srgb,hsl(32_28%_55%)_35%,transparent),0_24px_60px_-28px_rgba(0,0,0,0.9)]"
                  : "border-white/12 hover:border-white/35"
              )}
            >
              <BorderBeam
                size={pkg.popular ? 110 : 70}
                duration={pkg.popular ? 5.5 : 8 + i}
                delay={i * 1.6}
                initialOffset={i * 28}
                borderWidth={pkg.popular ? 2 : 1.5}
              />

              {pkg.popular && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary/15 to-transparent"
                />
              )}

              <div
                data-gsap-part="meta"
                className="relative flex items-start justify-between gap-3 mb-8"
              >
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-[0.2em]",
                    pkg.popular ? "text-primary" : "text-white/40"
                  )}
                >
                  {pkg.num}
                </span>
                {pkg.popular && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-1 bg-primary text-primary-foreground">
                    Most booked
                  </span>
                )}
              </div>

              <h3
                data-gsap-part="title"
                className={cn(
                  "relative text-2xl md:text-[1.75rem] font-light italic font-serif normal-case mb-3 tracking-tight transition-colors duration-300",
                  pkg.popular ? "text-white" : "text-white/90 group-hover:text-white"
                )}
              >
                {pkg.title}
              </h3>

              <div
                data-gsap-part="scope"
                className="relative flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6"
              >
                <span>{pkg.pages}</span>
                <span className="text-white/25">·</span>
                <span>{pkg.bestFor.split(",")[0]}</span>
              </div>

              <p
                data-gsap-part="desc"
                className="relative text-sm text-muted-foreground font-light leading-relaxed flex-1 mb-8"
              >
                {pkg.desc}
              </p>

              <div
                data-gsap-part="price"
                className={cn(
                  "relative text-[1.75rem] md:text-3xl font-black tracking-tight mb-6 origin-left will-change-transform",
                  pkg.popular ? "text-white" : "text-white/95"
                )}
              >
                {pkg.price}
              </div>

              <div
                className={cn(
                  "relative mt-auto flex flex-col gap-3",
                  pkg.popular ? "w-full" : "w-fit items-start"
                )}
              >
                <Magnetic
                  strength={0.25}
                  className={cn(pkg.popular ? "w-full" : "w-fit")}
                >
                  <Link
                    to="/contact"
                    className={cn(
                      "relative inline-flex items-center text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
                      pkg.popular
                        ? "w-full justify-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground hover:brightness-110"
                        : "w-fit justify-start gap-2 text-white hover:text-primary"
                    )}
                  >
                    {pkg.popular ? (
                      <>
                        Inquire <span aria-hidden>→</span>
                      </>
                    ) : (
                      <>
                        <span className="border-b border-current pb-0.5">Inquire</span>
                        <span aria-hidden>→</span>
                      </>
                    )}
                  </Link>
                </Magnetic>

                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className={cn(
                    "relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-300",
                    pkg.popular
                      ? "justify-center text-white/80 hover:text-primary"
                      : "text-white/70 hover:text-primary"
                  )}
                >
                  <span className="border-b border-current pb-0.5">
                    Call {CONTACT_PHONE_DISPLAY}
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Costs & Infrastructure Transparent Policy */}
        <div
          data-gsap="pricing-note"
          className="mt-14 sm:mt-16 lg:mt-20 relative rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-black/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 overflow-hidden"
        >
          {/* Subtle decorative glow in top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          />

          {/* Header row with eyebrow and title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-primary">
                  Transparent Commercials
                </p>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Additional Costs & Infrastructure
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-md sm:text-right">
              Direct third-party costs with zero agency markups. You retain 100% full ownership and control of your assets.
            </p>
          </div>

          {/* 3 Modular Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
            <div className="group relative p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                    Client-Owned
                  </span>
                </div>
                <h5 className="text-base font-semibold text-white mb-1.5">
                  Domain Name
                </h5>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Client pays separately (GoDaddy, Namecheap, Hostinger, etc.). You keep full DNS ownership and control.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/40">
                Direct Registrar Billing
              </div>
            </div>

            <div className="group relative p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                    Zero Markup
                  </span>
                </div>
                <h5 className="text-base font-semibold text-white mb-1.5">
                  Hosting & Infrastructure
                </h5>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Client pays separately (Vercel, Netlify, Cloudflare, etc.). Free tiers often cover launch and early traffic.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/40">
                Cloud Provider Direct
              </div>
            </div>

            <div className="group relative p-5 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary">
                    Optional Care
                  </span>
                </div>
                <h5 className="text-base font-semibold text-white mb-1.5">
                  Website Care Plan
                </h5>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Optional from <span className="text-white font-medium">₹999/month</span>. Continuous support, content updates, and maintenance (not hosting).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-primary/80">
                Cancel Anytime
              </div>
            </div>
          </div>

          {/* Bottom custom quote callout banner */}
          <div className="relative rounded-xl border border-primary/25 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-white">
                  Need e-commerce, custom CMS, or a full-stack web application?
                </p>
                <p className="text-xs text-muted-foreground font-light">
                  Tailored scopes with custom architecture, backend APIs, and database integrations.
                </p>
              </div>
            </div>

            <Magnetic strength={0.25}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shrink-0 shadow-[0_0_20px_rgba(232,213,181,0.2)]"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
