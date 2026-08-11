/**
 * Divine's Code commercial model — single source of truth.
 *
 * Website packages are one-time build fees.
 * Domain + hosting stay client-paid third-party costs.
 * Website Care is optional monthly support (not hosting).
 */

export type WebsitePackage = {
  id: "starter" | "modern" | "premium" | "custom";
  num: string;
  title: string;
  price: string;
  pages: string;
  bestFor: string;
  desc: string;
  includes: string[];
  popular?: boolean;
};

export type ServiceOffering = {
  num: string;
  title: string;
  desc: string;
  deliverables: string[];
};

export type AddOnNote = {
  title: string;
  detail: string;
};

export const websitePackages: WebsitePackage[] = [
  {
    id: "starter",
    num: "01",
    title: "Starter Website",
    price: "₹9,999+",
    pages: "1–3 pages",
    bestFor: "Landing pages, portfolios, simple businesses",
    desc: "A sharp, responsive site with modern UI, light motion, and WhatsApp-ready contact — live with SSL.",
    includes: [
      "1–3 pages",
      "Responsive design",
      "Modern UI",
      "Mobile optimization",
      "Basic animations",
      "Contact / WhatsApp",
      "Basic SEO",
      "Deployment",
      "SSL setup",
    ],
  },
  {
    id: "modern",
    num: "02",
    title: "Modern Website",
    price: "₹19,999+",
    pages: "4–7 pages",
    bestFor: "Professional business websites",
    desc: "Custom modern design with smooth interactions, forms, SEO foundation, analytics, and performance polish.",
    includes: [
      "4–7 pages",
      "Custom modern design",
      "Responsive development",
      "Smooth animations",
      "Interactive sections",
      "Contact form",
      "Basic technical SEO",
      "Performance optimization",
      "Analytics setup",
      "Deployment",
      "SSL setup",
    ],
    popular: true,
  },
  {
    id: "premium",
    num: "03",
    title: "Premium Website",
    price: "₹34,999+",
    pages: "7–12+ pages",
    bestFor: "Advanced, highly interactive websites",
    desc: "Premium custom UI, GSAP motion, advanced layouts, SEO foundation, and launch QA for a standout presence.",
    includes: [
      "7–12+ pages",
      "Premium custom UI",
      "Advanced interactions",
      "GSAP animations",
      "Custom components",
      "Advanced responsive layouts",
      "Advanced SEO foundation",
      "Performance optimization",
      "Analytics",
      "Deployment",
      "Launch QA",
    ],
  },
  {
    id: "custom",
    num: "04",
    title: "Custom Website",
    price: "Custom Quote",
    pages: "Scoped to need",
    bestFor: "E-commerce, CMS, web apps, special requirements",
    desc: "E-commerce, CMS, booking, APIs, dashboards, and complex product builds — scoped and quoted to your brief.",
    includes: [
      "E-commerce",
      "CMS",
      "Booking systems",
      "API integrations",
      "Dashboards",
      "Web applications",
      "Complex animations",
      "Custom functionality",
    ],
  },
];

/** Priced cards shown in the Pricing section (3-up layout). */
export const pricedPackages = websitePackages.filter(
  (pkg): pkg is WebsitePackage & { id: "starter" | "modern" | "premium" } =>
    pkg.id !== "custom"
);

export const serviceOfferings: ServiceOffering[] = [
  {
    num: "01",
    title: "Frontend / Web Development",
    desc: "Custom React interfaces, component systems, and performance-minded frontend — when you already have a product direction.",
    deliverables: [
      "Custom UI build",
      "Responsive layouts",
      "Component architecture",
      "Motion & interactions",
      "Performance polish",
    ],
  },
  {
    num: "02",
    title: "Full Website / 0-to-1 Build",
    desc: "Blank canvas to a shipped website. Pick Starter, Modern, or Premium — clear scope, clear price, production-ready.",
    deliverables: [
      "Starter ₹9,999+",
      "Modern ₹19,999+",
      "Premium ₹34,999+",
      "Design + development",
      "Deploy & SSL",
    ],
  },
  {
    num: "03",
    title: "Custom Development",
    desc: "Beyond brochure sites — e-commerce, CMS, booking, APIs, dashboards, and web apps with a custom quote.",
    deliverables: [
      "E-commerce",
      "CMS",
      "Booking systems",
      "API integrations",
      "Dashboards & apps",
    ],
  },
  {
    num: "04",
    title: "Website Care",
    desc: "Optional monthly care for updates, small fixes, and peace of mind. Not hosting — infrastructure stays yours.",
    deliverables: [
      "From ₹999/month",
      "Content updates",
      "Small fixes",
      "Priority support",
      "Optional retainers",
    ],
  },
];

export const additionalCosts: AddOnNote[] = [
  {
    title: "Domain",
    detail: "Client pays separately (GoDaddy, Namecheap, Hostinger, etc.)",
  },
  {
    title: "Hosting / Infrastructure",
    detail: "Client pays separately (Vercel, Netlify, Cloudflare, etc.)",
  },
  {
    title: "Website Care",
    detail: "Optional — from ₹999/month. Support & updates, not hosting.",
  },
];
