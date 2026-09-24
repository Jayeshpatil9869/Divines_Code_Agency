/**
 * Selected portfolio — single source of truth for Projects, Logos, and highlights.
 */

export type Project = {
  id: number;
  name: string;
  blurb: string;
  category: string;
  label: string;
  year: string;
  image: string;
  url: string;
  /** Short factual highlight for the marquee (no invented quotes). */
  highlight: string;
  format?: "landscape" | "portrait" | "tall" | "square";
};

export const projects: Project[] = [
  {
    id: 1,
    name: "LinkNest",
    blurb: "Visual Bookmark Archive",
    category: "Product",
    label: "React · Web App",
    year: "2026",
    image: "/images/projects/linknest.png",
    url: "https://linknest.divinescode.com/",
    highlight: "Calm visual archive for URLs and digital bookmarks with instant extraction.",
    format: "landscape",
  },
  {
    id: 2,
    name: "Gravitatee",
    blurb: "Masala Brand Site",
    category: "Brand",
    label: "E-commerce · UI",
    year: "2025",
    image: "/images/projects/gravitatee.png",
    url: "https://gravitatee.com/",
    highlight: "Masala brand site with e-commerce UI and product storytelling.",
    format: "landscape",
  },
  {
    id: 3,
    name: "Riyansh",
    blurb: "Ayurvedic Store",
    category: "Product",
    label: "E-commerce",
    year: "2025",
    image: "/images/projects/riyansh.png",
    url: "https://riyanshamrit.com/",
    highlight: "Ayurvedic e-commerce storefront — product catalog and shop experience.",
    format: "landscape",
  },
  {
    id: 4,
    name: "Pravin Realty",
    blurb: "Pune Real Estate",
    category: "Product",
    label: "React · Real Estate",
    year: "2025",
    image: "/images/projects/pravin-realty.png",
    url: "https://pravin-realty.divinescode.com/",
    highlight: "Real estate platform for luxury & commercial properties in West Pune.",
    format: "landscape",
  },
  {
    id: 5,
    name: "One Capital",
    blurb: "Wealth Management",
    category: "Product",
    label: "React · Fintech",
    year: "2025",
    image: "/images/projects/one-capital.png",
    url: "https://one-capital-premium-website.vercel.app/",
    highlight: "Precision wealth management and family office platform.",
    format: "landscape",
  },
  {
    id: 6,
    name: "Tell Star",
    blurb: "IT Networks Site",
    category: "Brand",
    label: "React · Marketing",
    year: "2025",
    image: "/images/projects/tellstar.png",
    url: "https://tellstar.in/",
    highlight: "IT networks marketing site built in React.",
    format: "landscape",
  },
  {
    id: 7,
    name: "Outpost",
    blurb: "Design Studio",
    category: "Design",
    label: "Motion · Brand",
    year: "2024",
    image: "/images/projects/outpost.png",
    url: "https://jayeshpatil9869.github.io/Outpost-Project/",
    highlight: "Design studio presence with motion and brand-led layout.",
    format: "landscape",
  },
  {
    id: 8,
    name: "Rethink",
    blurb: "Creative Studio",
    category: "Design",
    label: "3D · Webflow",
    year: "2024",
    image: "/images/projects/rethink.png",
    url: "https://jayeshpatil9869.github.io/Rethink/",
    highlight: "Creative studio site with 3D and Webflow craft.",
    format: "landscape",
  },
];

/** Brand names for the logo scroller. */
export const projectBrandNames = projects.map((p) => p.name);
