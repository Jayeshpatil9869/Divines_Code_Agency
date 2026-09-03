import { PageHeader } from "@/components/layout/PageHeader";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { getPageSeo } from "@/data/seo-pages";

export function AboutPage() {
  const seo = getPageSeo("/about");
  return (
    <>
      <section className="w-full pt-28 md:pt-36 pb-8 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Studio"
            title="About Divine's"
            italic="Code"
            intro={seo.intro}
            crumbs={[
              { label: "Home", to: "/" },
              { label: "About" },
            ]}
          />
        </div>
      </section>
      <About />
      <Team />
      <Contact />
    </>
  );
}
