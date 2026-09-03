import { PageHeader } from "@/components/layout/PageHeader";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { getPageSeo } from "@/data/seo-pages";

export function WorkPage() {
  const seo = getPageSeo("/work");
  return (
    <>
      <section className="w-full pt-28 md:pt-36 pb-4 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <PageHeader
            eyebrow="Portfolio"
            title="Selected"
            italic="work"
            intro={seo.intro}
            crumbs={[
              { label: "Home", to: "/" },
              { label: "Work" },
            ]}
          />
        </div>
      </section>
      <Projects showHeading={false} />
      <Contact />
    </>
  );
}
