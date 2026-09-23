import { useRef } from "react";
import { LogoScroller } from "@/components/ui/logo-scroller";
import { useGsap, animateLogos, animateSectionReveals } from "@/animations";
import { projectBrandNames } from "@/data/projects";

export function Logos() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(
    rootRef,
    (root) => {
      animateLogos(root);
      animateSectionReveals(root);
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      className="w-full py-12 md:py-12 overflow-hidden bg-black text-white"
    >
      <div data-gsap="reveal">
        <LogoScroller logos={projectBrandNames} scrollLinked />
      </div>
    </section>
  );
}
