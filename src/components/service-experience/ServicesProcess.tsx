import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceProcess } from "@/data/services";
import {
  animateProcessItemClose,
  animateProcessItemOpen,
  prefersReducedMotion,
  gsap,
} from "@/animations";

export function ServicesProcess() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section
      data-gsap="svc-reveal"
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-4">
        <div className="lg:col-span-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
            How we work
          </p>
          <h3
            id={`${baseId}-heading`}
            className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-4"
          >
            Five stages.
            <br />
            <span className="font-serif font-light italic normal-case text-primary tracking-tight">
              One path.
            </span>
          </h3>
          <p className="text-[15px] font-light text-muted-foreground leading-relaxed max-w-sm mb-6">
            Predictable checkpoints from discovery to launch — the same rhythm
            used across website packages and custom builds.
          </p>
          <a
            href="#process"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            See the full process section
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-border">
            {serviceProcess.map((step, i) => (
              <ProcessRow
                key={step.num}
                step={step}
                index={i}
                open={open === i}
                onSelect={() => setOpen(i)}
                baseId={baseId}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProcessRow({
  step,
  index,
  open,
  onSelect,
  baseId,
}: {
  step: (typeof serviceProcess)[number];
  index: number;
  open: boolean;
  onSelect: () => void;
  baseId: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const initialized = useRef(false);
  const panelId = `${baseId}-panel-${index}`;
  const triggerId = `${baseId}-trigger-${index}`;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!initialized.current) {
      initialized.current = true;
      if (open) {
        if (prefersReducedMotion()) {
          panel.style.height = "auto";
          panel.style.opacity = "1";
        } else {
          gsap.set(panel, { height: "auto", opacity: 1 });
        }
        wasOpen.current = true;
      }
      return;
    }

    if (open && !wasOpen.current) {
      animateProcessItemOpen(panel);
    } else if (!open && wasOpen.current) {
      animateProcessItemClose(panel);
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <li className="border-b border-border">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onSelect}
        onMouseEnter={() => {
          if (
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches
          ) {
            onSelect();
          }
        }}
        className={cn(
          "group w-full flex items-start gap-4 md:gap-6 py-5 md:py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <span
          className={cn(
            "text-[10px] font-mono tracking-[0.2em] mt-1.5 shrink-0 transition-colors",
            open ? "text-primary" : "text-muted-foreground"
          )}
        >
          {step.num}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4">
            <span
              className={cn(
                "text-xl md:text-2xl font-light italic font-serif normal-case tracking-tight transition-colors",
                open ? "text-foreground" : "text-foreground/80"
              )}
            >
              {step.title}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                open && "rotate-180 text-primary"
              )}
              aria-hidden
            />
          </div>
          <p className="mt-1 text-[13px] font-light text-muted-foreground">
            {step.summary}
          </p>
        </div>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
        aria-hidden={!open}
      >
        <p className="pb-6 pl-10 md:pl-14 pr-4 text-[14px] font-light text-muted-foreground leading-relaxed max-w-xl">
          {step.detail}
        </p>
      </div>
    </li>
  );
}
