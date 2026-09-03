import { techGroups } from "@/data/services";

export function ServicesTech() {
  return (
    <section
      data-gsap="svc-reveal"
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="services-tech-heading"
    >
      <div className="mb-12 md:mb-16 max-w-2xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
          Capability layer
        </p>
        <h3
          id="services-tech-heading"
          className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-4"
        >
          Tools we ship{" "}
          <span className="font-serif font-light italic normal-case text-primary tracking-tight">
            with
          </span>
        </h3>
        <p className="text-[15px] font-light text-muted-foreground leading-relaxed">
          Engineering depth organized by role — not a logo wall. Only the stack
          used to deliver DivinesCode work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {techGroups.map((group) => (
          <div key={group.label} className="border-t border-border pt-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-4">
              {group.label}
            </p>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm md:text-base font-light text-foreground/90 tracking-tight"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
