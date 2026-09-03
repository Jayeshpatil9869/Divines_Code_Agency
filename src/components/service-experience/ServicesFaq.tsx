import { useEffect, useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceFaqs } from "@/data/services";
import {
  animateProcessItemClose,
  animateProcessItemOpen,
  gsap,
} from "@/animations";

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === 0) {
        gsap.set(panel, { height: "auto", opacity: 1 });
      } else {
        gsap.set(panel, { height: 0, opacity: 0 });
      }
    });
  }, []);

  const toggle = (index: number) => {
    const next = openIndex === index ? null : index;
    const prev = openIndex;

    if (prev !== null && prev !== next) {
      const prevPanel = panelRefs.current[prev];
      if (prevPanel) animateProcessItemClose(prevPanel);
    }

    if (next !== null) {
      const panel = panelRefs.current[next];
      if (panel) animateProcessItemOpen(panel);
    } else if (prev !== null) {
      const panel = panelRefs.current[prev];
      if (panel) animateProcessItemClose(panel);
    }

    setOpenIndex(next);
  };

  return (
    <section
      data-gsap="svc-reveal"
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="services-faq-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
            FAQ
          </p>
          <h3
            id="services-faq-heading"
            className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-4"
          >
            Things people ask{" "}
            <span className="font-serif font-light italic normal-case text-primary tracking-tight">
              first
            </span>
          </h3>
          <p className="text-[14px] font-light text-muted-foreground leading-relaxed max-w-xs">
            Straight answers about scope, hosting, redesigns, and how to begin.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-border">
            {serviceFaqs.map((faq, i) => {
              const open = openIndex === i;
              const triggerId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <li key={faq.q} className="border-b border-border">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="w-full flex items-start gap-4 md:gap-6 py-5 md:py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span
                      className={cn(
                        "text-[10px] font-mono tracking-[0.2em] mt-1 shrink-0",
                        open ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm md:text-base font-medium tracking-tight normal-case font-sans leading-snug">
                      {faq.q}
                    </span>
                    <Plus
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 mt-0.5",
                        open && "rotate-45 text-primary"
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    role="region"
                    aria-labelledby={triggerId}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                    aria-hidden={!open}
                  >
                    <p className="pb-6 pl-10 md:pl-14 pr-8 text-[14px] font-light text-muted-foreground leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
