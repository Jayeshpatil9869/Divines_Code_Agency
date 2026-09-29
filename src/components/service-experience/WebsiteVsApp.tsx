import { Link } from "react-router-dom";
import { servicePath } from "@/data/services";

const columns = [
  {
    title: "Marketing website",
    body: "Pages that explain the business, show the work, and give someone a way to enquire. Starter, Modern, and Premium are this lane.",
    href: servicePath("websites"),
    label: "Website development",
  },
  {
    title: "Web application",
    body: "Software in the browser: a dashboard, a customer portal, or a product people log into. Scoped and quoted after the workflow is clear. Not a native mobile app.",
    href: servicePath("apps"),
    label: "Web applications",
  },
] as const;

export function WebsiteVsApp() {
  return (
    <section
      className="py-16 md:py-24 border-t border-border"
      aria-labelledby="website-vs-app-heading"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-4">
        Two different jobs
      </p>
      <h2
        id="website-vs-app-heading"
        className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-black tracking-[-0.02em] uppercase leading-[0.95] mb-4 max-w-3xl"
      >
        A website is not a{" "}
        <span className="font-serif font-light italic normal-case text-primary tracking-tight">
          web application
        </span>
      </h2>
      <p className="text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl mb-10">
        Divine&apos;s Code builds both. A marketing website publishes the business.
        A web application runs a workflow in the browser. The package prices apply
        to websites. Applications are quoted separately.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 border-y border-border divide-y md:divide-y-0 md:divide-x divide-border">
        {columns.map((column) => (
          <article key={column.href} className="py-8 md:px-8 md:first:pl-0">
            <h3 className="text-xl font-light italic font-serif tracking-tight mb-3">
              {column.title}
            </h3>
            <p className="text-[14px] font-light text-muted-foreground leading-relaxed mb-6">
              {column.body}
            </p>
            <Link
              to={column.href}
              className="text-[11px] uppercase tracking-[0.18em] font-bold hover:text-primary transition-colors"
            >
              {column.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
