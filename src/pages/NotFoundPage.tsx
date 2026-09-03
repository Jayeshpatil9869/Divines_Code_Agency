import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPageSeo } from "@/data/seo-pages";

export function NotFoundPage() {
  const seo = getPageSeo("/404");
  return (
    <section className="w-full pt-28 md:pt-36 pb-32 bg-surface min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          eyebrow="404"
          title="Page not"
          italic="found"
          intro={seo.intro}
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Not found" },
          ]}
        />
        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex h-12 items-center px-7 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all"
          >
            Back home
          </Link>
          <Link
            to="/services"
            className="inline-flex h-12 items-center px-7 border border-border text-[11px] uppercase tracking-[0.2em] font-bold hover:border-foreground/40 transition-colors"
          >
            Browse services
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center px-7 border border-border text-[11px] uppercase tracking-[0.2em] font-bold hover:border-foreground/40 transition-colors"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
