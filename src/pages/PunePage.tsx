import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesFaq } from "@/components/service-experience/ServicesFaq";
import { Contact } from "@/components/Contact";
import { Magnetic } from "@/components/ui/magnetic";
import { getPageSeo } from "@/data/seo-pages";
import { pravinRealty, puneFaqs, PUNE_PATH } from "@/data/pune";
import { servicePath } from "@/data/services";

const lanes = [
  {
    href: servicePath("websites"),
    title: "Website development",
    detail: "Business sites on the published Starter, Modern, and Premium packages.",
  },
  {
    href: servicePath("apps"),
    title: "Web applications",
    detail: "Dashboards, portals, and browser product slices. Not native mobile apps.",
  },
  {
    href: servicePath("ecommerce"),
    title: "Custom storefronts",
    detail: "Catalog and shop UI, quoted separately from the website packages.",
  },
] as const;

export function PunePage() {
  const seo = getPageSeo(PUNE_PATH);

  return (
    <>
      <section className="w-full pt-28 md:pt-36 pb-8 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Pune"
            title="Web development for"
            italic="Pune"
            intro={seo.intro}
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Pune" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none mb-5">
                What we take{" "}
                <span className="font-serif font-light italic normal-case text-primary tracking-tight">
                  on
                </span>
              </h2>
              <p className="text-[15px] font-light text-muted-foreground leading-relaxed mb-8">
                Pune companies get the same six lanes as everyone else. The work
                that usually starts here is a website, a web application, or a
                storefront. SEO retainers and native apps are not on the list.
              </p>
              <ul className="flex flex-col border-t border-border">
                {lanes.map((lane) => (
                  <li key={lane.href} className="border-b border-border">
                    <Link
                      to={lane.href}
                      className="group flex items-start justify-between gap-6 py-5"
                    >
                      <span>
                        <span className="block text-lg font-light italic font-serif tracking-tight group-hover:text-primary transition-colors">
                          {lane.title}
                        </span>
                        <span className="block mt-1 text-[13px] font-light text-muted-foreground leading-relaxed">
                          {lane.detail}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <article className="lg:col-span-7">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
                Public project
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none mb-5">
                {pravinRealty.name}
              </h2>
              <p className="text-[15px] font-light text-muted-foreground leading-relaxed mb-6 max-w-xl">
                {pravinRealty.summary}
              </p>
              <a
                href={pravinRealty.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={pravinRealty.image}
                  alt={pravinRealty.imageAlt}
                  width={1920}
                  height={1014}
                  className="w-full h-auto border border-border"
                />
              </a>
              <p className="mt-4 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {pravinRealty.label}
              </p>
              <Magnetic strength={0.18}>
                <a
                  href={pravinRealty.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors"
                >
                  Open Pravin Realty
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
            </article>
          </div>

          <section className="py-16 md:py-20 border-t border-border" aria-labelledby="pune-process-heading">
            <h2
              id="pune-process-heading"
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-black tracking-[-0.02em] uppercase leading-none mb-8"
            >
              How a Pune project{" "}
              <span className="font-serif font-light italic normal-case text-primary tracking-tight">
                runs
              </span>
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <li>
                <p className="text-[10px] font-mono tracking-[0.2em] text-primary mb-2">01</p>
                <h3 className="text-base font-medium mb-2">Write the brief</h3>
                <p className="text-[14px] font-light text-muted-foreground leading-relaxed">
                  Pages or product slice, timeline, and whether you want a website package or a custom quote.
                </p>
              </li>
              <li>
                <p className="text-[10px] font-mono tracking-[0.2em] text-primary mb-2">02</p>
                <h3 className="text-base font-medium mb-2">Build with the founders</h3>
                <p className="text-[14px] font-light text-muted-foreground leading-relaxed">
                  Jayesh Patil and Mahendra Nagpure stay on the work. Calls and WhatsApp replace a local front desk.
                </p>
              </li>
              <li>
                <p className="text-[10px] font-mono tracking-[0.2em] text-primary mb-2">03</p>
                <h3 className="text-base font-medium mb-2">Launch, then optional care</h3>
                <p className="text-[14px] font-light text-muted-foreground leading-relaxed">
                  Deployment and SSL are part of a website build. Hosting stays yours. Website Care is optional and is not an SEO retainer.
                </p>
              </li>
            </ol>
            <p className="mt-10 text-[13px] font-light text-muted-foreground">
              <Link to="/showcase" className="underline underline-offset-4 hover:text-primary">
                Selected work
              </Link>
              <span className="mx-2 text-border">/</span>
              <Link to="/pricing" className="underline underline-offset-4 hover:text-primary">
                Website packages
              </Link>
              <span className="mx-2 text-border">/</span>
              <Link to="/contact" className="underline underline-offset-4 hover:text-primary">
                Start a project
              </Link>
            </p>
          </section>

          <ServicesFaq faqs={puneFaqs} />
        </div>
      </section>
      <Contact />
    </>
  );
}
