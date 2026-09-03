import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import {
  servicesTotal,
  servicePath,
  type ServiceItem,
} from "@/data/services";

export function ServiceStory({
  service,
  index,
  showPageLink = true,
}: {
  service: ServiceItem;
  index: number;
  /** Hide self-link when already on the service detail page */
  showPageLink?: boolean;
}) {
  const inverted = index % 2 === 1;

  return (
    <article
      id={`service-${service.id}`}
      data-gsap="svc-story"
      className="scroll-mt-28 py-16 md:py-24 border-t border-border"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 md:mb-10">
        <span
          data-gsap="svc-story-part"
          className="text-[10px] font-mono tracking-[0.25em] text-primary"
        >
          {service.num} / {servicesTotal}
        </span>
        <span
          data-gsap="svc-story-part"
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          Service lane
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-12 md:mb-16">
        <div className={cn("lg:col-span-6", inverted && "lg:order-2")}>
          <h3
            data-gsap="svc-story-part"
            className="text-[clamp(1.75rem,3.5vw,3rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-5"
          >
            {service.title}
          </h3>
          <p
            data-gsap="svc-story-part"
            className="text-xl md:text-2xl font-light italic font-serif normal-case tracking-tight text-primary mb-6 max-w-lg"
          >
            {service.positioning}
          </p>
          <p
            data-gsap="svc-story-part"
            className="text-[15px] font-light text-muted-foreground leading-relaxed max-w-xl"
          >
            {service.description}
          </p>
        </div>

        <div
          className={cn(
            "lg:col-span-6 flex flex-col gap-8",
            inverted && "lg:order-1"
          )}
        >
          <StoryBlock label="Problem" body={service.problem} part />
          <StoryBlock label="Approach" body={service.approach} part />
          <StoryBlock label="Deliverable" body={service.deliverable} part />
        </div>
      </div>

      <div
        data-gsap="svc-story-part"
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start mb-12"
      >
        <div className="md:col-span-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {service.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 border border-border text-muted-foreground font-mono"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 gap-6 md:gap-4">
          <Meta label="Engagement" value={service.engagement} />
          <Meta label="Scope" value={service.scope} />
        </div>
      </div>

      <div data-gsap="svc-story-part" className="mb-10 md:mb-12">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
          What this can look like
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {service.types.map((type) => (
            <li
              key={type.title}
              className="bg-background p-5 md:p-6 flex flex-col gap-2"
            >
              <span className="text-sm md:text-base font-medium tracking-tight normal-case font-sans">
                {type.title}
              </span>
              <span className="text-[12px] font-light text-muted-foreground leading-relaxed">
                {type.blurb}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div data-gsap="svc-story-part" className="flex flex-wrap items-center gap-5">
        {showPageLink && (
          <Magnetic strength={0.2}>
            <Link
              to={servicePath(service.slug)}
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-foreground hover:text-primary transition-colors"
            >
              View full service
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
        )}
        <Magnetic strength={0.18}>
          <Link
            to={service.ctaHref.startsWith("#") ? `/${service.ctaHref}` : service.ctaHref}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {service.ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Magnetic>
      </div>
    </article>
  );
}

function StoryBlock({
  label,
  body,
  part,
}: {
  label: string;
  body: string;
  part?: boolean;
}) {
  return (
    <div data-gsap={part ? "svc-story-part" : undefined}>
      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
        {label}
      </p>
      <p className="text-[14px] font-light text-muted-foreground leading-relaxed max-w-md">
        {body}
      </p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
        {label}
      </p>
      <p className="text-sm font-light text-foreground leading-snug">{value}</p>
    </div>
  );
}
