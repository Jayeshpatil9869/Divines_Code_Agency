/**
 * Services experience — content model grounded in DivinesCode offerings.
 * Pricing lives in offerings.ts; this file shapes storytelling only.
 */

export type ServiceType = {
  title: string;
  blurb: string;
};

export type ServiceItem = {
  id: string;
  /** URL segment under /services/:slug */
  slug: string;
  num: string;
  title: string;
  short: string;
  positioning: string;
  description: string;
  problem: string;
  approach: string;
  deliverable: string;
  capabilities: string[];
  engagement: string;
  scope: string;
  types: ServiceType[];
  relatedIds: string[];
  ctaHref: string;
  ctaLabel: string;
};

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

export type ProcessStep = {
  num: string;
  title: string;
  summary: string;
  detail: string;
};

export type TechGroup = {
  label: string;
  items: string[];
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ProofProject = {
  name: string;
  label: string;
  blurb: string;
  image: string;
  url: string;
  focus: string;
};

export const servicesTotal = "06";

export const services: ServiceItem[] = [
  {
    id: "websites",
    slug: "websites",
    num: "01",
    title: "Website Development",
    short: "Marketing and business sites shipped end-to-end",
    positioning: "Sites that look intentional and load like product work.",
    description:
      "From blank canvas to a live presence — Starter, Modern, or Premium packages with clear scope, responsive UI, and production deployment.",
    problem:
      "Most brochure sites feel templated, slow, or unfinished the moment the brief leaves Figma.",
    approach:
      "We design and build in the same loop — structure, UI, motion, SEO foundation, and launch QA as one engagement.",
    deliverable:
      "A responsive website with contact paths, performance polish, SSL setup, and ownership you can maintain.",
    capabilities: [
      "React",
      "Responsive UI",
      "Motion",
      "SEO foundation",
      "Analytics",
      "Deployment",
    ],
    engagement: "Fixed-scope packages",
    scope: "1–12+ pages",
    types: [
      { title: "Landing pages", blurb: "Focused offers with clear conversion paths." },
      { title: "Portfolio sites", blurb: "Work-led layouts that let craft speak." },
      { title: "Business websites", blurb: "Multi-page presence for services and trust." },
      { title: "Startup sites", blurb: "Sharp narrative for early-stage products." },
      { title: "Content platforms", blurb: "Readable structures ready to grow." },
      { title: "Premium interactive", blurb: "GSAP-led sections when presence matters." },
    ],
    relatedIds: ["frontend", "ecommerce", "care"],
    ctaHref: "/pricing",
    ctaLabel: "View website packages",
  },
  {
    id: "frontend",
    slug: "frontend",
    num: "02",
    title: "Frontend Engineering",
    short: "Custom React interfaces when direction already exists",
    positioning: "Component systems that stay fast, accessible, and maintainable.",
    description:
      "Bring a design or product direction — we implement custom UI, responsive layouts, motion, and performance polish without rewriting your strategy.",
    problem:
      "Hand-offs break when frontend is treated as a static export instead of a living system.",
    approach:
      "We build component architecture first, then layer interaction and polish so the interface can evolve with the product.",
    deliverable:
      "Production-ready React frontend with clear structure, responsive behavior, and motion that respects performance.",
    capabilities: [
      "React",
      "TypeScript",
      "Component systems",
      "GSAP",
      "Accessibility",
      "Performance",
    ],
    engagement: "Scoped build or sprint",
    scope: "UI systems & pages",
    types: [
      { title: "Design-to-code", blurb: "Faithful builds from existing design systems." },
      { title: "Component libraries", blurb: "Reusable UI that teams can extend." },
      { title: "Marketing frontends", blurb: "Campaign and product storytelling surfaces." },
      { title: "Motion systems", blurb: "Scroll and interaction choreography with GSAP." },
      { title: "Performance passes", blurb: "Load, layout, and interaction polish." },
      { title: "Responsive rebuilds", blurb: "Mobile-first corrections for broken layouts." },
    ],
    relatedIds: ["websites", "apps", "care"],
    ctaHref: "/contact",
    ctaLabel: "Discuss frontend scope",
  },
  {
    id: "apps",
    slug: "apps",
    num: "03",
    title: "Web Applications",
    short: "Dashboards, portals, and product surfaces",
    positioning: "Interfaces for real workflows — not marketing mockups.",
    description:
      "Custom-quoted product work: dashboards, internal tools, customer portals, and web apps wired to APIs and business logic.",
    problem:
      "Spreadsheets and bolted-on tools slow teams down long after the first version ships.",
    approach:
      "We map the workflow, define the information model, then build the interface and integrations as a maintainable product slice.",
    deliverable:
      "A scoped web application with clear flows, API connections, and a path for iteration after launch.",
    capabilities: [
      "React",
      "APIs",
      "Dashboards",
      "Auth flows",
      "Forms",
      "Data views",
    ],
    engagement: "Custom quote",
    scope: "Product slices",
    types: [
      { title: "Admin dashboards", blurb: "Operational views with clear hierarchy." },
      { title: "Internal tools", blurb: "Workflow UIs that replace spreadsheet friction." },
      { title: "Customer portals", blurb: "Account and self-serve experiences." },
      { title: "Booking systems", blurb: "Scheduling and confirmation flows." },
      { title: "API-backed products", blurb: "Frontends that speak to your services." },
      { title: "MVP product shells", blurb: "Lean first versions ready for feedback." },
    ],
    relatedIds: ["frontend", "integrations", "care"],
    ctaHref: "/contact",
    ctaLabel: "Start a product conversation",
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    num: "04",
    title: "E-commerce Development",
    short: "Storefronts built to sell and stay maintainable",
    positioning: "Catalog, cart, and brand storytelling in one coherent build.",
    description:
      "E-commerce experiences scoped as custom work — product catalogs, shop UI, and brand-led storefronts informed by live projects like Riyansh and Gravitatee.",
    problem:
      "Stores that only look good still leak conversion when structure, speed, and checkout paths are afterthoughts.",
    approach:
      "We prioritize product storytelling, catalog clarity, and responsive shop flows before decorative extras.",
    deliverable:
      "A storefront experience aligned to your catalog and brand — ready for the platform and integrations in scope.",
    capabilities: [
      "Product catalogs",
      "Shop UI",
      "Responsive checkout paths",
      "Brand storytelling",
      "Performance",
      "Analytics",
    ],
    engagement: "Custom quote",
    scope: "Storefront builds",
    types: [
      { title: "Brand storefronts", blurb: "Commerce with editorial product narrative." },
      { title: "Catalog experiences", blurb: "Browse and filter paths that stay clear." },
      { title: "D2C product sites", blurb: "Direct-to-customer brand shops." },
      { title: "Collection storytelling", blurb: "Campaign pages that feed the cart." },
      { title: "Mobile-first shops", blurb: "Touch-first layouts for real purchase paths." },
      { title: "Store redesigns", blurb: "Rebuilds when the current shop underperforms." },
    ],
    relatedIds: ["websites", "frontend", "care"],
    ctaHref: "/work",
    ctaLabel: "See commerce work",
  },
  {
    id: "integrations",
    slug: "integrations",
    num: "05",
    title: "Custom Integrations",
    short: "CMS, booking, APIs, and system connections",
    positioning: "Connect the site to how the business already runs.",
    description:
      "Beyond brochure pages — CMS setups, booking systems, third-party APIs, and operational integrations quoted to your brief.",
    problem:
      "Manual handoffs between site, CRM, and ops tools create friction customers never see — until they leave.",
    approach:
      "We identify the critical path, choose the lightest durable integration, and document ownership after launch.",
    deliverable:
      "Working integrations with clear boundaries: what syncs, what stays manual, and how to maintain it.",
    capabilities: [
      "CMS",
      "Booking",
      "API integrations",
      "Forms & automation",
      "Third-party tools",
      "Documentation",
    ],
    engagement: "Custom quote",
    scope: "Systems & workflows",
    types: [
      { title: "CMS setups", blurb: "Editable content without breaking design." },
      { title: "Booking flows", blurb: "Appointments and confirmations online." },
      { title: "CRM connections", blurb: "Leads that land where sales already works." },
      { title: "Payment hooks", blurb: "Scoped payment and confirmation paths." },
      { title: "Automation bridges", blurb: "Reduce copy-paste between tools." },
      { title: "Legacy replacements", blurb: "Modernize one painful workflow at a time." },
    ],
    relatedIds: ["apps", "websites", "care"],
    ctaHref: "/contact",
    ctaLabel: "Map an integration",
  },
  {
    id: "care",
    slug: "care",
    num: "06",
    title: "Website Care",
    short: "Optional monthly support after launch",
    positioning: "Updates and small fixes without owning your hosting bill.",
    description:
      "From ₹999/month — content updates, small fixes, and priority help. Domain and hosting stay client-paid third-party costs.",
    problem:
      "Sites drift after launch when nobody owns content tweaks, small bugs, or seasonal updates.",
    approach:
      "Keep a light retainer focused on support — not infrastructure. You stay in control of domain and hosting.",
    deliverable:
      "Predictable monthly care with clear response expectations and optional deeper retainers when needed.",
    capabilities: [
      "Content updates",
      "Small fixes",
      "Priority support",
      "Optional retainers",
      "Launch follow-up",
    ],
    engagement: "Monthly retainer",
    scope: "From ₹999/month",
    types: [
      { title: "Content updates", blurb: "Copy, images, and page tweaks on request." },
      { title: "Small fixes", blurb: "UI and interaction issues after launch." },
      { title: "Seasonal refreshes", blurb: "Campaign and offer page updates." },
      { title: "Priority support", blurb: "Faster turnaround when something breaks." },
      { title: "Light iteration", blurb: "Incremental improvements without a full rebuild." },
      { title: "Handover support", blurb: "Help your team take ownership confidently." },
    ],
    relatedIds: ["websites", "frontend", "apps"],
    ctaHref: "/contact",
    ctaLabel: "Ask about care plans",
  },
];

export const serviceProcess: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    summary: "Goals, audience, constraints, and opportunity.",
    detail:
      "We align on business goals, technical constraints, and what success looks like before a single screen is designed.",
  },
  {
    num: "02",
    title: "Architecture",
    summary: "Structure that stays maintainable.",
    detail:
      "Flows, information architecture, and a structural skeleton — decisions that keep the build extendable.",
  },
  {
    num: "03",
    title: "Design",
    summary: "Visual language with intent.",
    detail:
      "Typography, spacing, components, and interaction rules — opinionated, not decorative.",
  },
  {
    num: "04",
    title: "Build",
    summary: "Production-quality frontend.",
    detail:
      "Clean, performant, accessible React. We design in code when it saves weeks of handoff waste.",
  },
  {
    num: "05",
    title: "Launch & care",
    summary: "Deploy, verify, then support.",
    detail:
      "Deployment, SSL, and launch QA — with optional Website Care for updates after you go live.",
  },
];

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    label: "Motion",
    items: ["GSAP", "ScrollTrigger", "Lenis"],
  },
  {
    label: "Experience",
    items: ["Three.js", "Responsive UI", "Accessibility"],
  },
  {
    label: "Delivery",
    items: ["Vercel-ready", "SSL setup", "Analytics", "SEO foundation"],
  },
];

export const serviceFaqs: ServiceFaq[] = [
  {
    q: "What type of projects does DivinesCode work on?",
    a: "Marketing and business websites, custom React frontends, e-commerce storefronts, dashboards and web apps, plus CMS, booking, and API integrations. Website Care is available after launch.",
  },
  {
    q: "How does a project usually begin?",
    a: "Share the problem, pages or product slice you need, and any existing design or content. We confirm scope, package or custom quote, and checkpoints before build starts.",
  },
  {
    q: "Can you work from an existing design?",
    a: "Yes. Frontend Engineering covers design-to-code builds — component systems, responsive layouts, motion, and performance polish from your direction.",
  },
  {
    q: "Do you redesign existing websites?",
    a: "Yes. We can rebuild structure, UI, and interaction while keeping what still works — scoped as a package or custom engagement depending on complexity.",
  },
  {
    q: "Do you provide frontend and backend development?",
    a: "We specialize in frontend and full website delivery. Custom work can include API integrations, dashboards, and connected workflows — scoped in the brief.",
  },
  {
    q: "Is hosting included in the price?",
    a: "No. Domain and hosting stay client-paid third-party costs. Website Care is optional monthly support for updates and small fixes — not hosting.",
  },
  {
    q: "How long does a typical project take?",
    a: "Depends on package and scope. Fixed website packages move through clear checkpoints; custom product and integration work is quoted with a timeline after discovery.",
  },
  {
    q: "How do we start?",
    a: "Use the contact form, WhatsApp, or phone. Tell us what you’re building — idea, redesign, product slice, or care need — and we’ll reply with next steps.",
  },
];

/** Editorial proof — real portfolio entries only. */
export const proofProjects: ProofProject[] = [
  {
    name: "Riyansh",
    label: "E-commerce",
    blurb: "Ayurvedic storefront — product catalog and shop experience.",
    image: "/images/projects/riyansh.png",
    url: "https://riyanshamrit.com/",
    focus: "Commerce UI · Catalog clarity",
  },
  {
    name: "Tell Star",
    label: "Marketing",
    blurb: "IT networks marketing site built in React.",
    image: "/images/projects/tellstar.png",
    url: "https://tellstar.in/",
    focus: "React · Service storytelling",
  },
  {
    name: "Outpost",
    label: "Motion · Brand",
    blurb: "Design studio presence with motion-led layout.",
    image: "/images/projects/outpost.png",
    url: "https://jayeshpatil9869.github.io/Outpost-Project/",
    focus: "Motion · Brand presence",
  },
];

export function getServiceById(id: string): ServiceItem | undefined {
  return services.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(ids: string[]): ServiceItem[] {
  return ids
    .map((id) => getServiceById(id))
    .filter((s): s is ServiceItem => Boolean(s));
}
