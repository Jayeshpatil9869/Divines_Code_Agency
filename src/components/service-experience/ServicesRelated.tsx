import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getRelatedServices, services, servicePath } from "@/data/services";

/** Compact related lanes — different visual language from ServiceStory. */
export function ServicesRelated({
  fromId = "websites",
}: {
  fromId?: string;
}) {
  const current = services.find((s) => s.id === fromId) ?? services[0];
  const related = getRelatedServices(current.relatedIds).slice(0, 3);

  return (
    <section
      data-gsap="svc-reveal"
      className="py-20 md:py-24 border-t border-border"
      aria-labelledby="services-related-heading"
    >
      <div className="mb-10 md:mb-12">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
          Adjacent lanes
        </p>
        <h3
          id="services-related-heading"
          className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none"
        >
          If this fits, these{" "}
          <span className="font-serif font-light italic normal-case text-primary tracking-tight">
            might too
          </span>
        </h3>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 border-y border-border divide-y md:divide-y-0 md:divide-x divide-border">
        {related.map((service) => (
          <li key={service.id}>
            <Link
              to={servicePath(service.slug)}
              className="group w-full h-full text-left px-0 py-8 md:px-8 md:py-10 flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
                {service.num}
              </span>
              <span className="text-xl font-light italic font-serif normal-case tracking-tight group-hover:text-primary transition-colors">
                {service.title}
              </span>
              <span className="text-[13px] font-light text-muted-foreground leading-relaxed flex-1">
                {service.short}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-foreground/70 group-hover:text-primary transition-colors">
                View service
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
