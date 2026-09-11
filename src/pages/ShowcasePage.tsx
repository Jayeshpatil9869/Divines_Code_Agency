import { useMemo } from "react";
import { SeoHead } from "@/components/SeoHead";
import { StickyShowcaseComponent } from "@/components/showcase/StickyShowcaseComponent";
import { projects } from "@/data/projects";

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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070709]">
      <SeoHead />

      {/* 3D Showcase Core */}
      <StickyShowcaseComponent slides={slides} />
    </div>
  );
}
