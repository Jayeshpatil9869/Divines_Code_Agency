import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, servicePath, servicesTotal } from "@/data/services";

type ServicesMegaMenuProps = {
  open: boolean;
  onClose: () => void;
  id?: string;
};

/**
 * Desktop Services mega-menu — DivinesCode tokens (bronze/black),
 * inspired by reference IA (numbered grid + undecided CTA), not a clone.
 */
export function ServicesMegaMenu({ open, onClose, id }: ServicesMegaMenuProps) {
  return (
    <div
      id={id}
      role="region"
      aria-label="Services menu"
      aria-hidden={!open}
      className={cn(
        "absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,40rem)] -translate-x-1/2 transition-[opacity,transform] duration-300 ease-out",
        open
          ? "pointer-events-auto opacity-100 translate-y-0 visible"
          : "pointer-events-none opacity-0 -translate-y-2 invisible"
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-background/95 shadow-lift backdrop-blur-xl">
        <div className="px-5 pt-5 pb-3 md:px-6 md:pt-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground mb-4">
            — {servicesTotal} services, one studio
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  to={servicePath(service.slug)}
                  onClick={onClose}
                  className="group flex gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="text-[10px] font-mono tracking-[0.15em] text-muted-foreground mt-1 shrink-0 w-6">
                    {service.num}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-sm font-medium tracking-tight normal-case font-sans text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                      <ArrowUpRight className="h-3 w-3 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="mt-0.5 block text-[12px] font-light text-muted-foreground leading-snug">
                      {service.short}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border bg-white/[0.02] px-5 py-4 md:px-6">
          <p className="text-[12px] font-light text-muted-foreground">
            Not sure where you fit?
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              onClick={onClose}
              className="text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              View all services
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-bold text-primary hover:brightness-110 transition-all"
            >
              Tell us the problem
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
