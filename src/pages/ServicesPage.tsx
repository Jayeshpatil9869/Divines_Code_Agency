import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGsap, animateServicesExperience } from "@/animations";
import { services } from "@/data/services";
import { ServicesHero } from "@/components/service-experience/ServicesHero";
import { ServiceIndex } from "@/components/service-experience/ServiceIndex";
import { ServiceStory } from "@/components/service-experience/ServiceStory";
import { ServicesProcess } from "@/components/service-experience/ServicesProcess";
import { ServicesTech } from "@/components/service-experience/ServicesTech";
import { ServicesProof } from "@/components/service-experience/ServicesProof";
import { ServicesFaq } from "@/components/service-experience/ServicesFaq";
import { ServicesRelated } from "@/components/service-experience/ServicesRelated";
import { ServicesCta } from "@/components/service-experience/ServicesCta";
import { Contact } from "@/components/Contact";

/** Full Services overview at /services */
export function ServicesPage() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateServicesExperience(root), []);

  return (
    <>
      <section
        id="services"
        ref={rootRef}
        className="w-full pt-28 md:pt-36 pb-24 md:pb-32 bg-surface"
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
            <span className="text-primary">Services</span>
          </nav>

          <ServicesHero />
          <ServiceIndex />

          <div className="flex flex-col">
            {services.map((service, index) => (
              <ServiceStory key={service.id} service={service} index={index} />
            ))}
          </div>

          <ServicesProcess />
          <ServicesTech />
          <ServicesProof />
          <ServicesFaq />
          <ServicesRelated />
          <ServicesCta />
        </div>
      </section>
      <Contact />
    </>
  );
}
