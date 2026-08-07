import { useRef } from "react";
import { LogoScroller } from "@/components/ui/logo-scroller";
import {
  useGsap,
  animateSectionReveals,
  bindLightSectionBackground,
} from "@/animations";

const brands = [
  "Nimbus",
  "Arc Labs",
  "PulsePay",
  "Vertex",
  "Northwind",
  "Helix",
  "Orbit",
  "Cascade",
];

export function Logos() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(
    rootRef,
    (root) => {
      bindLightSectionBackground(root);
      animateSectionReveals(root);
    },
    []
  );

  return (
    <section
      ref={rootRef}
      className="w-full py-16 md:py-20 overflow-hidden text-black border-y border-black/10"
    >
      <div data-gsap="reveal">
        <LogoScroller logos={brands} speed="35s" />
      </div>
    </section>
  );
}
