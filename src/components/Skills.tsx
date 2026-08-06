import { useRef } from "react";
import { useGsap, animateCards } from "@/animations";

const stacks = [
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind", "Motion"],
  },
  {
    title: "Design",
    items: ["Figma", "Design systems", "Prototyping", "UX research", "Accessibility"],
  },
  {
    title: "Backend & Tools",
    items: ["Supabase", "Firebase", "Node", "Vercel", "CI/CD", "Analytics"],
  },
];

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateCards(root, '[data-gsap="card"]'), []);

  return (
    <section id="skills" ref={rootRef} className="w-full py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase">
            Stack & Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stacks.map((stack) => (
            <div key={stack.title} data-gsap="card">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-6">
                {stack.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {stack.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm uppercase tracking-wider font-medium border-b border-border/60 pb-3 text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
