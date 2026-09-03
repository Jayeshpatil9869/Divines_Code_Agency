import { CONTACT_EMAIL, CONTACT_LINKEDIN, COMPANY_BLURB } from "@/data/contact";
import { websitePackages } from "@/data/offerings";
import {
  FOUNDER_JAYESH,
  FOUNDER_MAHENDRA,
  OG_IMAGE,
  SITE_NAME,
  SITE_NAME_ALT,
  SITE_URL,
} from "@/data/seo";
import {
  CRAWL_NAV,
  getPageSeo,
  getSeoRoute,
  type SeoRoute,
} from "@/data/seo-pages";
import { getServiceBySlug, serviceFaqs, servicePath } from "@/data/services";

type JsonLd = Record<string, unknown>;

function organizationEntities(): JsonLd[] {
  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_NAME_ALT,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      image: OG_IMAGE,
      description: COMPANY_BLURB,
      email: CONTACT_EMAIL,
      founder: [
        { "@id": `${FOUNDER_JAYESH.url}#person` },
        { "@id": `${FOUNDER_MAHENDRA.url}#person` },
      ],
      member: [
        { "@id": `${FOUNDER_JAYESH.url}#person` },
        { "@id": `${FOUNDER_MAHENDRA.url}#person` },
      ],
      areaServed: { "@type": "Place", name: "Worldwide" },
      sameAs: [
        CONTACT_LINKEDIN,
        "https://github.com/Jayeshpatil9869/divines_code_website",
        FOUNDER_JAYESH.url,
        FOUNDER_MAHENDRA.url,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: COMPANY_BLURB,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${FOUNDER_JAYESH.url}#person`,
      name: FOUNDER_JAYESH.name,
      url: FOUNDER_JAYESH.url,
      jobTitle: FOUNDER_JAYESH.jobTitle,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      colleague: { "@id": `${FOUNDER_MAHENDRA.url}#person` },
      sameAs: [...FOUNDER_JAYESH.sameAs],
    },
    {
      "@type": "Person",
      "@id": `${FOUNDER_MAHENDRA.url}#person`,
      name: FOUNDER_MAHENDRA.name,
      alternateName: FOUNDER_MAHENDRA.alternateName,
      url: FOUNDER_MAHENDRA.url,
      jobTitle: FOUNDER_MAHENDRA.jobTitle,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      colleague: { "@id": `${FOUNDER_JAYESH.url}#person` },
      sameAs: [...FOUNDER_MAHENDRA.sameAs],
    },
  ];
}

/** Organization + WebSite + Person entities for JSON-LD (3-way cluster). */
export function buildOrganizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": organizationEntities(),
  };
}

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

function webPageNode(path: string): JsonLd {
  const seo = getPageSeo(path);
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

function breadcrumb(items: { name: string; path: string }[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function graphForRoute(route: SeoRoute): JsonLd[] {
  switch (route.kind) {
    case "home":
      return [...organizationEntities(), webPageNode("/")];
    case "servicesIndex":
      return [
        webPageNode("/services"),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ];
    case "service": {
      const service = getServiceBySlug(route.slug);
      if (!service) return [webPageNode("/services")];
      const path = servicePath(service.slug);
      return [
        webPageNode(path),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path },
        ]),
        {
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          name: service.title,
          description: service.description,
          provider: { "@id": `${SITE_URL}/#organization` },
          url: absoluteUrl(path),
          serviceType: service.title,
          areaServed: { "@type": "Place", name: "Worldwide" },
        },
        {
          "@type": "FAQPage",
          "@id": `${absoluteUrl(path)}#faq`,
          mainEntity: serviceFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        },
      ];
    }
    case "pricing":
      return [
        webPageNode("/pricing"),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]),
        {
          "@type": "OfferCatalog",
          "@id": `${SITE_URL}/pricing#packages`,
          name: "Website packages",
          itemListElement: websitePackages
            .filter((pkg) => pkg.id !== "custom")
            .map((pkg) => ({
              "@type": "Offer",
              name: pkg.title,
              description: pkg.desc,
              priceCurrency: "INR",
              price: pkg.price.replace(/[^\d]/g, ""),
              url: `${SITE_URL}/pricing`,
            })),
        },
      ];
    case "contact":
      return [
        webPageNode("/contact"),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact#contactpage`,
          url: `${SITE_URL}/contact`,
        },
      ];
    case "about":
      return [
        ...organizationEntities(),
        webPageNode("/about"),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ];
    case "work":
      return [
        webPageNode("/work"),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]),
      ];
    case "notFound":
      return [webPageNode("/404")];
    default: {
      const _exhaustive: never = route;
      return _exhaustive;
    }
  }
}

export function buildJsonLdForPath(pathname: string) {
  return {
    "@context": "https://schema.org",
    "@graph": graphForRoute(getSeoRoute(pathname)),
  };
}

export function crawlNavHtml(): string {
  const links = CRAWL_NAV.map(
    (item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`,
  ).join(" ");
  return `<nav aria-label="Site">${links}</nav>`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
