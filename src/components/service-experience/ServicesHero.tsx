import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Magnetic } from "@/components/ui/magnetic";
import { TextShimmer } from "@/components/ui/text-shimmer";

export function ServicesHero() {
  return (
    <header className="mb-20 md:mb-28">
      <p
        data-gsap="svc-hero"
        className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-6"
      >
        01 / Services / How we help
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <h1
            data-gsap="svc-hero"
            className="text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[0.92] font-black tracking-[-0.03em] uppercase"
          >
            Built for clarity.
            <br />
            <span className="font-serif font-light italic normal-case tracking-tight text-primary">
              Engineered
            </span>{" "}
            to ship.
          </h1>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <p
            data-gsap="svc-hero"
            className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-md"
          >
            <TextShimmer duration={3.2}>
              Websites, frontend systems, product surfaces, commerce, and care —
              scoped so founders and teams know exactly what lands.
            </TextShimmer>
          </p>

          <div data-gsap="svc-hero" className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.22}>
              <Link
                to="/#contact"
                className="inline-flex h-12 items-center px-7 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all"
              >
                Start a conversation
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#service-index"
                className="group inline-flex h-12 items-center gap-2 px-4 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore services
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </header>
  );
}
