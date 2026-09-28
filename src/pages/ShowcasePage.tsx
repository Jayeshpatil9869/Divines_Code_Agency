import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "@/components/SeoHead";
import { StickyShowcaseComponent } from "@/components/showcase/StickyShowcaseComponent";
import { projects } from "@/data/projects";
import { getPageSeo } from "@/data/seo-pages";

export function ShowcasePage() {
  const slides = useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      title: p.name,
      meta: p.label || p.category,
      category: p.category,
      year: p.year,
      image: p.image,
      url: p.url,
      blurb: p.highlight || p.blurb,
    }));
  }, []);

  const seo = getPageSeo("/showcase");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070709]">
      <SeoHead />

      <header className="absolute top-24 left-6 z-30 max-w-xs">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-white">{seo.h1}</span>
        </nav>
        <h1 className="text-[11px] font-mono uppercase tracking-[0.35em] text-white">
          {seo.h1}
        </h1>
        <p className="mt-3 text-xs font-light text-white/70 leading-relaxed">{seo.intro}</p>
      </header>

      <StickyShowcaseComponent slides={slides} />
    </div>
  );
}
