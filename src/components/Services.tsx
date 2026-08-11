import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateCards, gsap, EASE } from "@/animations";
import { serviceOfferings } from "@/data/offerings";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateCards(root, '[data-gsap="card"]'), []);

  return (
    <section
      id="services"
      ref={rootRef}
      className="w-full py-24 md:py-32 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
            How we can help
          </h2>
          <p className="text-lg font-light max-w-lg">
            <TextShimmer duration={3}>
              Frontend builds, full websites from scratch, custom product work, and
              optional care — pick the lane that fits.
            </TextShimmer>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceOfferings.map((s, i) => (
            <div key={s.num} data-gsap="card">
              <ServiceCard {...s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  num,
  title,
  desc,
  deliverables,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  deliverables: string[];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  const expand = () => {
    if (openRef.current) return;
    openRef.current = true;
    const panel = panelRef.current;
    const card = cardRef.current;
    if (!panel) return;

    gsap.killTweensOf(panel);
    const tags = panel.querySelectorAll<HTMLElement>("[data-service-tag]");

    gsap.set(panel, { height: "auto", opacity: 1 });
    const fullH = panel.offsetHeight;
    gsap.fromTo(
      panel,
      { height: 0, opacity: 0 },
      {
        height: fullH,
        opacity: 1,
        duration: 0.5,
        ease: EASE.expo,
        overwrite: "auto",
        onComplete: () => gsap.set(panel, { height: "auto" }),
      }
    );

    gsap.fromTo(
      tags,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
        delay: 0.12,
        ease: EASE.out,
        overwrite: "auto",
      }
    );

    if (card) {
      gsap.to(card, {
        backgroundColor: "rgba(0,0,0,1)",
        duration: 0.35,
        ease: EASE.soft,
        overwrite: "auto",
      });
    }
  };

  const collapse = () => {
    if (!openRef.current) return;
    openRef.current = false;
    const panel = panelRef.current;
    const card = cardRef.current;
    if (!panel) return;

    gsap.killTweensOf(panel);
    const tags = panel.querySelectorAll<HTMLElement>("[data-service-tag]");
    gsap.to(tags, { opacity: 0, y: 6, duration: 0.2, stagger: 0.02, ease: EASE.soft });

    gsap.set(panel, { height: panel.offsetHeight });
    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    if (card) {
      gsap.to(card, {
        backgroundColor: "rgba(0,0,0,1)",
        duration: 0.3,
        ease: EASE.soft,
        overwrite: "auto",
      });
    }
  };

  const toggle = () => {
    if (openRef.current) collapse();
    else expand();
  };

  const isFinePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col p-6 md:p-8 bg-background border border-border overflow-hidden h-full cursor-pointer"
      onMouseEnter={() => {
        if (isFinePointer()) expand();
      }}
      onMouseLeave={() => {
        if (isFinePointer()) collapse();
      }}
      onClick={(e) => {
        if (isFinePointer()) return;
        if ((e.target as HTMLElement).closest("a")) return;
        toggle();
      }}
      onFocus={expand}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) collapse();
      }}
      tabIndex={0}
      role="button"
      aria-expanded={openRef.current}
    >
      <BorderBeam
        size={55}
        duration={8 + index}
        delay={index * 1.8}
        initialOffset={index * 22}
        borderWidth={1.5}
      />
      <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-4">
        Service {num}
      </div>
      <h3 className="text-2xl md:text-3xl font-light italic tracking-tight font-serif mb-3 normal-case">
        {title}
      </h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed font-light">
        {desc}
      </p>

      <div
        ref={panelRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
        aria-hidden={!openRef.current}
      >
        <div className="pt-6 mt-6 border-t border-border flex flex-wrap gap-2">
          {deliverables.map((d) => (
            <span
              key={d}
              data-service-tag
              className="text-[9px] uppercase tracking-wider px-2 py-1 bg-surface text-muted-foreground border border-border font-mono"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
