import { services, servicePath } from "@/data/services";
import {
  HOME_H1,
  HOME_INTRO,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SITE_NAME,
} from "@/data/seo";
import {
  PUNE_DESCRIPTION,
  PUNE_H1,
  PUNE_INTRO,
  PUNE_PATH,
  PUNE_TITLE,
} from "@/data/pune";

export type SearchIntent =
  | "commercial"
  | "commercial-investigation"
  | "local-commercial"
  | "navigational"
  | "informational";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  robots: "index,follow" | "noindex,follow";
  primaryTopic: string;
  intent: SearchIntent;
};

export type SeoRoute =
  | { kind: "home" }
  | { kind: "servicesIndex" }
  | { kind: "service"; slug: string }
  | { kind: "pricing" }
  | { kind: "contact" }
  | { kind: "about" }
  | { kind: "showcase" }
  | { kind: "location"; slug: "pune" }
  | { kind: "notFound" };

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

const SERVICE_SEO: Record<
  string,
  Pick<PageSeo, "title" | "description" | "primaryTopic" | "intent">
> = {
  websites: {
    title: `Professional Website Development | ${SITE_NAME}`,
    description:
      "Professional website development for businesses and small teams. React sites, responsive UI, and published packages from ₹9,999.",
    primaryTopic: "professional website development company",
    intent: "commercial",
  },
  frontend: {
    title: `React Frontend Engineering | ${SITE_NAME}`,
    description:
      "React frontend engineering when you already have a design or product direction — component systems, motion, accessibility, and performance.",
    primaryTopic: "react frontend engineering",
    intent: "commercial",
  },
  apps: {
    title: `Web Application Development | ${SITE_NAME}`,
    description:
      "Web application development for dashboards, portals, and browser-based product shells. Not native iOS or Android apps.",
    primaryTopic: "web application development companies in india",
    intent: "commercial",
  },
  ecommerce: {
    title: `Custom Ecommerce Storefronts | ${SITE_NAME}`,
    description:
      "Custom ecommerce storefronts with catalog clarity and brand storytelling. Informed by Riyansh and Gravitatee — not a Shopify or WooCommerce partnership.",
    primaryTopic: "custom ecommerce storefronts",
    intent: "commercial",
  },
  integrations: {
    title: `Website Integrations | ${SITE_NAME}`,
    description:
      "Website integrations for CMS, booking, APIs, and the tools your operations already use. Documented ownership after launch.",
    primaryTopic: "website integrations",
    intent: "commercial",
  },
  care: {
    title: `Website Care Plans | ${SITE_NAME}`,
    description:
      "Website care from ₹999/month — content updates and small fixes after launch. Not an SEO retainer. Domain and hosting stay yours.",
    primaryTopic: "website care plans",
    intent: "commercial",
  },
};

const SERVICES_H1 = "Built for clarity. Engineered to ship.";
const SERVICES_INTRO =
  "Websites, frontend systems, product surfaces, commerce, and care — scoped so founders and teams know exactly what lands.";

const STATIC_PAGES: PageSeo[] = [
  {
    path: "/",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    h1: HOME_H1,
    intro: HOME_INTRO,
    robots: "index,follow",
    primaryTopic: "web development agency in india",
    intent: "commercial",
  },
  {
    path: "/services",
    title: `Website & Product Engineering Services | ${SITE_NAME}`,
    description:
      "Website development, React frontend, web applications, ecommerce storefronts, integrations, and website care — six lanes, one studio.",
    h1: SERVICES_H1,
    intro: SERVICES_INTRO,
    robots: "index,follow",
    primaryTopic: "website and product engineering services",
    intent: "navigational",
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
    primaryTopic: "website development cost",
    intent: "commercial-investigation",
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
    primaryTopic: "start a project",
    intent: "navigational",
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
    primaryTopic: "about divine's code",
    intent: "navigational",
  },
  {
    path: "/showcase",
    title: `Selected Work | ${SITE_NAME}`,
    description:
      "Selected live websites and web applications from Divine's Code, including Pravin Realty in West Pune, Riyansh, Gravitatee, LinkNest, and Tell Star.",
    h1: "Our Work",
    intro:
      "Selected live websites and web applications, including Pravin Realty in West Pune, Riyansh, Gravitatee, and LinkNest.",
    robots: "index,follow",
    primaryTopic: "selected work",
    intent: "commercial-investigation",
  },
  {
    path: PUNE_PATH,
    title: PUNE_TITLE,
    description: PUNE_DESCRIPTION,
    h1: PUNE_H1,
    intro: PUNE_INTRO,
    robots: "index,follow",
    primaryTopic: "web development company in pune",
    intent: "local-commercial",
  },
];

export const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: `Page not found | ${SITE_NAME}`,
  description: "That page is not on Divine's Code. Head home or browse services.",
  h1: "Page not found",
  intro: "This URL is not a page on divinescode.com. Use the links below to continue.",
  robots: "noindex,follow",
  primaryTopic: "page not found",
  intent: "navigational",
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
        intro: service.positioning,
        robots: "index,follow" as const,
        primaryTopic: service.title.toLowerCase(),
        intent: "commercial" as const,
      };
    }
    return {
      path,
      title: extra.title,
      description: extra.description,
      h1: service.title,
      intro: service.positioning,
      robots: "index,follow" as const,
      primaryTopic: extra.primaryTopic,
      intent: extra.intent,
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
    case "/showcase":
      return { kind: "showcase" };
    case PUNE_PATH:
      return { kind: "location", slug: "pune" };
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
  { href: PUNE_PATH, label: "Pune" },
  ...services.map((service) => ({
    href: servicePath(service.slug),
    label: service.title,
  })),
];

export { SERVICES_H1, SERVICES_INTRO };
