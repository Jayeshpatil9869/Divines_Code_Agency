import { PageHeader } from "@/components/layout/PageHeader";
import { Contact } from "@/components/Contact";
import { getPageSeo } from "@/data/seo-pages";

export function ContactPage() {
  const seo = getPageSeo("/contact");
  return (
    <>
      <section className="w-full pt-28 md:pt-36 pb-8 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Contact"
            title="Start a"
            italic="project"
            intro={seo.intro}
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Contact" },
            ]}
          />
        </div>
      </section>
      <Contact hideHeading />
    </>
  );
}
