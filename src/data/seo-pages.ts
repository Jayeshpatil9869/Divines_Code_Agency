import { services, servicePath } from "@/data/services";
import { SEO_DESCRIPTION, SEO_TITLE, SITE_NAME } from "@/data/seo";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  robots: "index,follow" | "noindex,follow";
};

export type SeoRoute =
  | { kind: "home" }
  | { kind: "servicesIndex" }
  | { kind: "service"; slug: string }
  | { kind: "pricing" }
  | { kind: "contact" }
  | { kind: "about" }
  | { kind: "work" }
  | { kind: "showcase" }
  | { kind: "notFound" };

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

const SERVICE_SEO: Record<
  string,
  Pick<PageSeo, "title" | "description" | "h1" | "intro">
> = {
  websites: {
    title: `Custom Website Development | ${SITE_NAME}`,
    description:
      "Custom website development for businesses and startups — React, responsive UI, SEO foundation, and clear packages from ₹9,999.",
    h1: "Custom website development",
    intro:
      "Marketing and business sites designed and built end-to-end. Starter, Modern, or Premium packages with responsive UI, production deployment, and an SEO foundation.",
  },
  frontend: {
    title: `React Frontend Engineering | ${SITE_NAME}`,
    description:
      "React frontend engineering when you already have a design or product direction — component systems, motion, accessibility, and performance.",
    h1: "React frontend engineering",
    intro:
      "Design-to-code React interfaces: component architecture, responsive layouts, GSAP motion, and performance polish without rewriting your strategy.",
  },
  apps: {
    title: `Custom Web Applications | ${SITE_NAME}`,
    description:
      "Custom web applications — dashboards, customer portals, booking UIs, and MVP product shells. Browser apps, not native mobile stores.",
    h1: "Custom web applications",
    intro:
      "Dashboards, internal tools, customer portals, and API-backed product slices. Scoped web applications — not iOS or Android app store work.",
  },
  ecommerce: {
    title: `Custom Ecommerce Storefronts | ${SITE_NAME}`,
    description:
      "Custom ecommerce storefronts with catalog clarity, brand storytelling, and maintainable shop UI. Informed by live D2C work.",
    h1: "Custom ecommerce storefronts",
    intro:
      "Catalog, cart paths, and brand-led storefronts. Built as custom work — not as an Adobe Commerce or Shopify Plus partnership page.",
  },
  integrations: {
    title: `Website Integrations | ${SITE_NAME}`,
    description:
      "Website integrations for CMS, booking, APIs, and the tools your operations already use. Documented ownership after launch.",
    h1: "Website integrations",
    intro:
      "Connect the site to how the business already runs: CMS setups, booking flows, CRMs, and third-party APIs — quoted to the brief.",
  },
  care: {
    title: `Website Care Plans | ${SITE_NAME}`,
    description:
      "Website care from ₹999/month — content updates and small fixes after launch. Domain and hosting stay yours.",
    h1: "Website care plans",
    intro:
      "Optional monthly support for content updates, small fixes, and priority help. Website Care is not hosting — infrastructure stays client-paid.",
  },
};

const STATIC_PAGES: PageSeo[] = [
  {
    path: "/",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    h1: "Divine's Code — custom website design and development",
    intro:
      "We design and build custom React websites, storefronts, and web app interfaces, with clear packages from ₹9,999 and optional Website Care after launch.",
    robots: "index,follow",
  },
  {
    path: "/services",
    title: `Website & Product Engineering Services | ${SITE_NAME}`,
    description:
      "Website development, React frontend, web applications, ecommerce storefronts, integrations, and website care — six lanes, one studio.",
    h1: "Website and product engineering services",
    intro:
      "Six lanes we actually sell: websites, frontend engineering, web applications, ecommerce storefronts, integrations, and website care.",
    robots: "index,follow",
  },
  {
    path: "/pricing",
    title: `Website Development Cost & Packages | ${SITE_NAME}`,
    description:
      "Website development cost with published packages: Starter ₹9,999+, Modern ₹19,999+, Premium ₹34,999+. Custom work quoted. Hosting not included.",
    h1: "Website packages and cost",
    intro:
      "Published INR packages for website builds. Custom ecommerce, apps, and integrations are quoted. Domain and hosting stay on you.",
    robots: "index,follow",
  },
  {
    path: "/contact",
    title: `Start a Project | ${SITE_NAME}`,
    description:
      "Start a website, frontend, web app, or storefront project with Divine's Code. Form, WhatsApp, or phone — we reply within one business day.",
    h1: "Start a project",
    intro:
      "Tell us what you need, the budget band, and the timeline. A sentence is enough to start. We reply within one business day.",
    robots: "index,follow",
  },
  {
    path: "/about",
    title: `About Divine's Code | ${SITE_NAME}`,
    description:
      "Divine's Code is a website design and development studio founded by Jayesh Patil and Mahendra Nagpure. Custom React sites, storefronts, and web apps.",
    h1: "About Divine's Code",
    intro:
      "A small studio that designs and engineers websites and interfaces. Direct with the founders. We do not sell SEO retainers, ads, or native mobile apps.",
    robots: "index,follow",
  },
  {
    path: "/work",
    title: `Selected Work | ${SITE_NAME}`,
    description:
      "Selected work from Divine's Code — live websites and storefronts including Riyansh, Gravitatee, Pravin Realty, One Capital, Tell Star, Outpost, Rethink, and AnimeVerse.",
    h1: "Selected work",
    intro:
      "Public projects with live URLs. Named work only — no invented case-study metrics.",
    robots: "index,follow",
  },
  {
    path: "/showcase",
    title: `Our Work | ${SITE_NAME}`,
    description:
      "Explore selected live websites and web applications in an interactive 3D WebGL showcase featuring Riyansh, Gravitatee, Pravin Realty, One Capital, Tell Star, Outpost, and more.",
    h1: "Our Work",
    intro:
      "Explore selected projects in an interactive 3D WebGL showcase with kinetic typography and chromatic shaders.",
    robots: "index,follow",
  },
];

export const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: `Page not found | ${SITE_NAME}`,
  description: "That page is not on Divine's Code. Head home or browse services.",
  h1: "Page not found",
  intro: "This URL is not a page on divinescode.com. Use the links below to continue.",
  robots: "noindex,follow",
};

function servicePages(): PageSeo[] {
  return services.map((service) => {
    const extra = SERVICE_SEO[service.slug];
    const path = servicePath(service.slug);
    if (!extra) {
      return {
        path,
        title: `${service.title} | ${SITE_NAME}`,
        description: service.short,
        h1: service.title,
        intro: service.description,
        robots: "index,follow" as const,
      };
    }
    return {
      path,
      ...extra,
      robots: "index,follow" as const,
    };
  });
}

export const PAGE_SEO_LIST: PageSeo[] = [...STATIC_PAGES, ...servicePages()];

const PAGE_SEO_BY_PATH = new Map(PAGE_SEO_LIST.map((page) => [page.path, page]));

export function getPageSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);
  return PAGE_SEO_BY_PATH.get(path) ?? NOT_FOUND_SEO;
}

export function getSeoRoute(pathname: string): SeoRoute {
  const path = normalizePath(pathname);
  switch (path) {
    case "/":
      return { kind: "home" };
    case "/services":
      return { kind: "servicesIndex" };
    case "/pricing":
      return { kind: "pricing" };
    case "/contact":
      return { kind: "contact" };
    case "/about":
      return { kind: "about" };
    case "/work":
      return { kind: "work" };
    case "/showcase":
    case "/projects":
      return { kind: "showcase" };
    default:
      break;
  }

  if (path.startsWith("/services/")) {
    const slug = path.slice("/services/".length);
    if (services.some((service) => service.slug === slug)) {
      return { kind: "service", slug };
    }
  }

  return { kind: "notFound" };
}

/** Paths written as static HTML at build time (excludes 404). */
export const PRERENDER_PATHS = PAGE_SEO_LIST.map((page) => page.path);

export const CRAWL_NAV: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/showcase", label: "Our Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  ...services.map((service) => ({
    href: servicePath(service.slug),
    label: service.title,
  })),
];

