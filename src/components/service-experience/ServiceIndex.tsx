import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  services,
  servicesTotal,
  servicePath,
  type ServiceItem,
} from "@/data/services";
import { nudgeArrow } from "@/animations";

export function ServiceIndex() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <nav
      id="service-index"
      aria-label="Service index"
      className="mb-24 md:mb-32 scroll-mt-28"
      data-gsap="svc-reveal"
    >
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">
            Six lanes
          </p>
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none">
            Orient before you{" "}
            <span className="font-serif font-light italic normal-case text-primary tracking-tight">
              dive
            </span>
          </h3>
        </div>
        <p className="hidden sm:block text-[11px] text-muted-foreground font-mono max-w-48 text-right leading-relaxed">
          Open a lane for the full brief
        </p>
      </div>

      <ul className="border-t border-border">
        {services.map((service) => (
          <ServiceIndexRow
            key={service.id}
            service={service}
            active={activeId === service.id}
            onActivate={setActiveId}
          />
        ))}
      </ul>

      <p className="mt-4 text-[10px] font-mono text-muted-foreground tracking-wider">
        {services.length.toString().padStart(2, "0")} / {servicesTotal} offerings
      </p>
    </nav>
  );
}

function ServiceIndexRow({
  service,
  active,
  onActivate,
}: {
  service: ServiceItem;
  active: boolean;
  onActivate: (id: string | null) => void;
}) {
  const [arrowEl, setArrowEl] = useState<HTMLSpanElement | null>(null);

  return (
    <li data-gsap="svc-index-row">
      <Link
        to={servicePath(service.slug)}
        onMouseEnter={() => {
          onActivate(service.id);
          nudgeArrow(arrowEl, true);
        }}
        onMouseLeave={() => {
          onActivate(null);
          nudgeArrow(arrowEl, false);
        }}
        onFocus={() => onActivate(service.id)}
        onBlur={() => onActivate(null)}
        className={cn(
          "group w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-x-4 md:gap-x-8 gap-y-2 items-baseline py-5 md:py-6 border-b border-border text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active ? "border-primary/40" : "hover:border-border"
        )}
      >
        <span
          className={cn(
            "text-[10px] font-mono tracking-[0.2em] transition-colors",
            active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {service.num}
        </span>

        <span
          className={cn(
            "text-lg md:text-2xl font-light italic font-serif normal-case tracking-tight transition-colors duration-300",
            active ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
          )}
        >
          {service.title}
        </span>

        <span
          className={cn(
            "hidden md:block text-[13px] font-light leading-snug transition-opacity duration-300 col-start-3",
            active ? "text-muted-foreground opacity-100" : "text-muted-foreground/70 opacity-80"
          )}
        >
          {service.short}
        </span>

        <span
          ref={setArrowEl}
          className={cn(
            "justify-self-end text-muted-foreground transition-colors duration-300",
            active && "text-primary"
          )}
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
        </span>

        <span className="md:hidden col-span-3 text-[12px] font-light text-muted-foreground leading-snug pl-0">
          {service.short}
        </span>
      </Link>
    </li>
  );
}
