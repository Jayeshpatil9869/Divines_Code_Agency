import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Magnetic } from "@/components/ui/magnetic";
import { useGsap, animateServicesExperience } from "@/animations";
import { services, servicePath, servicesTotal } from "@/data/services";
import { cn } from "@/lib/utils";

/** Homepage services teaser — full experience lives at /services. */
export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateServicesExperience(root), []);

  return (
    <section
      id="services"
      ref={rootRef}
      className="w-full py-24 md:py-32 bg-surface border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-14 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p
              data-gsap="svc-hero"
              className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-5"
            >
              01 / Services / How we help
            </p>
            <h2
              data-gsap="svc-hero"
              className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] font-black tracking-[-0.02em] uppercase"
            >
              Six lanes.
              <br />
              <span className="font-serif font-light italic normal-case tracking-tight text-primary">
                One studio.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5">
            <p
              data-gsap="svc-hero"
              className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-md"
            >
              <TextShimmer duration={3}>
                Websites, frontend systems, product surfaces, commerce,
                integrations, and care — pick a lane or explore the full map.
              </TextShimmer>
            </p>
            <div data-gsap="svc-hero">
              <Magnetic strength={0.2}>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors"
                >
                  Explore all services
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </header>

        <ul className="border-t border-border" data-gsap="svc-reveal">
          {services.map((service) => (
            <li key={service.id} data-gsap="svc-index-row">
              <Link
                to={servicePath(service.slug)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-x-4 md:gap-x-8 gap-y-2 items-baseline py-5 md:py-6 border-b border-border transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  {service.num}
                </span>
                <span className="text-lg md:text-2xl font-light italic font-serif normal-case tracking-tight">
                  {service.title}
                </span>
                <span className="hidden md:block text-[13px] font-light text-muted-foreground leading-snug">
                  {service.short}
                </span>
                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 justify-self-end" />
                <span className="md:hidden col-span-3 text-[12px] font-light text-muted-foreground leading-snug">
                  {service.short}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[10px] font-mono text-muted-foreground tracking-wider">
          {services.length.toString().padStart(2, "0")} / {servicesTotal} offerings
        </p>
      </div>
    </section>
  );
}
