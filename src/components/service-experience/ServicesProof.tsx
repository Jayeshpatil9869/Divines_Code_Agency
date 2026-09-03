import { ArrowUpRight } from "lucide-react";
import { proofProjects } from "@/data/services";
import { Magnetic } from "@/components/ui/magnetic";

export function ServicesProof() {
  const featured = proofProjects[0];
  const rest = proofProjects.slice(1);

  return (
    <section
      data-gsap="svc-reveal"
      className="py-20 md:py-28 border-t border-border"
      aria-labelledby="services-proof-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-12 md:mb-16">
        <div className="lg:col-span-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
            Selected work
          </p>
          <h3
            id="services-proof-heading"
            className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-4"
          >
            Evidence over{" "}
            <span className="font-serif font-light italic normal-case text-primary tracking-tight">
              adjectives
            </span>
          </h3>
          <p className="text-[15px] font-light text-muted-foreground leading-relaxed max-w-sm mb-8">
            Built for clarity. Engineered for performance. Designed for growth —
            then proven in shipped projects.
          </p>
          <Magnetic strength={0.18}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors"
            >
              View all work
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>

        <a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="lg:col-span-7 group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative overflow-hidden border border-border aspect-16/10 bg-surface">
            <img
              src={featured.image}
              alt={`${featured.name} — ${featured.blurb}`}
              loading="lazy"
              decoding="async"
              width={1200}
              height={750}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                {featured.label}
              </p>
              <p className="text-2xl md:text-3xl font-light italic font-serif normal-case tracking-tight mb-2">
                {featured.name}
              </p>
              <p className="text-[13px] font-light text-white/70 max-w-md leading-relaxed">
                {featured.blurb}
              </p>
              <p className="mt-3 text-[10px] font-mono tracking-wider text-white/50">
                {featured.focus}
              </p>
            </div>
          </div>
        </a>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {rest.map((project) => (
          <li key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 sm:gap-6 border border-border p-4 sm:p-5 hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="overflow-hidden aspect-16/10 sm:aspect-4/3 border border-border/60">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center py-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
                  {project.label}
                </p>
                <p className="text-xl font-light italic font-serif normal-case tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </p>
                <p className="text-[13px] font-light text-muted-foreground leading-relaxed mb-3">
                  {project.blurb}
                </p>
                <p className="text-[10px] font-mono tracking-wider text-muted-foreground">
                  {project.focus}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
