import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cn } from "@/lib/utils";
import { useGsap, animatePricing } from "@/animations";
import { pricedPackages, additionalCosts } from "@/data/offerings";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/data/contact";

export function Pricing() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animatePricing(root), []);

  return (
    <section
      id="pricing"
      ref={rootRef}
      className="relative w-full py-24 md:py-32 border-t border-border overflow-x-clip lg:overflow-hidden"
    >
      {/* Soft focus wash behind the middle plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,42rem)] h-112 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                  <a
                    href="#contact"
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
                  </a>
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

        <div
          data-gsap="pricing-note"
          className="mt-10 md:mt-12 flex flex-col gap-3 max-w-3xl"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-primary">
            Additional costs
          </p>
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground font-light">
            {additionalCosts.map((item) => (
              <li key={item.title}>
                <span className="text-white/80">{item.title}</span>
                <span className="text-white/25"> — </span>
                {item.detail}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground font-light pt-1">
            Need e-commerce, CMS, or a web app?{" "}
            <a
              href="#contact"
              className="text-white/90 border-b border-white/25 hover:border-primary hover:text-primary transition-colors"
            >
              Custom quote →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
