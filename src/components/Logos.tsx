import { useRef } from "react";
import { Marquee } from "@/components/ui/marquee";
import { useGsap, animateSectionReveals } from "@/animations";

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
  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  return (
    <section ref={rootRef} className="w-full py-16 md:py-20 border-y border-border overflow-hidden">
      <div data-gsap="reveal" className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
          Trusted by teams shipping something serious
        </h2>
      </div>

      <Marquee pauseOnHover className="[--duration:35s]">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center px-8 py-2 opacity-40 hover:opacity-100 transition-opacity grayscale"
          >
            <span className="font-display text-2xl md:text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
