import { useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useGsap, animateServicesExperience } from "@/animations";
import {
  getServiceBySlug,
  getRelatedServices,
  servicePath,
  servicesTotal,
} from "@/data/services";
import { ServiceStory } from "@/components/service-experience/ServiceStory";
import { ServicesProcess } from "@/components/service-experience/ServicesProcess";
import { ServicesFaq } from "@/components/service-experience/ServicesFaq";
import { ServicesCta } from "@/components/service-experience/ServicesCta";
import { Magnetic } from "@/components/ui/magnetic";
import { Contact } from "@/components/Contact";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const service = useMemo(() => getServiceBySlug(slug), [slug]);
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateServicesExperience(root), [slug]);

  if (!service) {
    return <NotFoundPage />;
  }

  const related = getRelatedServices(service.relatedIds).slice(0, 3);

  return (
    <>
      <section
        ref={rootRef}
        className="w-full pt-28 md:pt-36 pb-20 md:pb-28 bg-surface"
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-border">/</span>
            <Link to="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-primary">{service.title}</span>
          </nav>

          <header className="mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7" data-gsap="svc-hero">
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-5">
                {service.num} / {servicesTotal} / {service.title}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92] font-black tracking-[-0.03em] uppercase mb-5">
                {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="font-serif font-light italic normal-case tracking-tight text-primary">
                  {service.title.split(" ").slice(-1)[0]}
                </span>
              </h1>
              <p className="text-lg md:text-xl font-light text-muted-foreground max-w-xl leading-relaxed">
                {service.positioning}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-5" data-gsap="svc-hero">
              <p className="text-[15px] font-light text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic strength={0.22}>
                  <Link
                    to="/contact"
                    className="inline-flex h-12 items-center px-7 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all"
                  >
                    Start a conversation
                  </Link>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <Link
                    to="/services"
                    className="group inline-flex h-12 items-center gap-2 px-4 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    All services
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </header>

          <ServiceStory service={service} index={0} showPageLink={false} />

          <ServicesProcess />

          <section
            data-gsap="svc-reveal"
            className="py-16 md:py-20 border-t border-border"
            aria-labelledby="detail-related-heading"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
              Adjacent lanes
            </p>
            <h2
              id="detail-related-heading"
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none mb-10"
            >
              If this fits, these{" "}
              <span className="font-serif font-light italic normal-case text-primary tracking-tight">
                might too
              </span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 border-y border-border divide-y md:divide-y-0 md:divide-x divide-border">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={servicePath(item.slug)}
                    className="group flex flex-col gap-3 px-0 py-8 md:px-8 md:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
                      {item.num}
                    </span>
                    <span className="text-xl font-light italic font-serif normal-case tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[13px] font-light text-muted-foreground leading-relaxed">
                      {item.short}
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

          <ServicesFaq />
          <ServicesCta />
        </div>
      </section>
      <Contact />
    </>
  );
}
