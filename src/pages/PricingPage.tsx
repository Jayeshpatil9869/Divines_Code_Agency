import { PageHeader } from "@/components/layout/PageHeader";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { getPageSeo } from "@/data/seo-pages";

export function PricingPage() {
  const seo = getPageSeo("/pricing");
  return (
    <>
      <section className="w-full pt-28 md:pt-36 pb-4 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Pricing"
            title="Website packages and"
            italic="cost"
            intro={seo.intro}
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Pricing" },
            ]}
          />
        </div>
      </section>
      <Pricing hideHeading />
      <Contact />
    </>
  );
}
