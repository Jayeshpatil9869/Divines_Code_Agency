import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  italic?: string;
  intro: string;
  crumbs: Crumb[];
};

export function PageHeader({
  eyebrow,
  title,
  italic,
  intro,
  crumbs,
}: PageHeaderProps) {
  const words = title.split(" ");
  const last = italic ?? words.at(-1) ?? "";
  const lead = italic ? title : words.slice(0, -1).join(" ");

  return (
    <header className="mb-12 md:mb-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground"
      >
        {crumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`}>
            {index > 0 ? <span className="mx-2 text-border">/</span> : null}
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-primary transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-primary">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      {eyebrow ? (
        <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary mb-5">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92] font-black tracking-[-0.03em] uppercase mb-5">
        {lead ? `${lead} ` : null}
        <span className="font-serif font-light italic normal-case tracking-tight text-primary">
          {last}
        </span>
      </h1>
      <p className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl leading-relaxed">
        {intro}
      </p>
    </header>
  );
}
