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
};

export const projects: Project[] = [
  {
    id: 1,
    name: "Riyansh",
    blurb: "Ayurvedic Store",
    category: "Product",
    label: "E-commerce",
    year: "2025",
    image: "/images/projects/riyansh.png",
    url: "https://riyanshamrit.com/",
    highlight: "Ayurvedic e-commerce storefront — product catalog and shop experience.",
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
  },
  {
    id: 3,
    name: "Pravin Realty",
    blurb: "Pune Real Estate",
    category: "Product",
    label: "React · Real Estate",
    year: "2025",
    image: "/images/projects/pravin-realty.png",
    url: "https://pravin-realty.divinescode.com/",
    highlight: "Real estate platform for luxury & commercial properties in West Pune.",
  },
  {
    id: 4,
    name: "One Capital",
    blurb: "Wealth Management",
    category: "Product",
    label: "React · Fintech",
    year: "2025",
    image: "/images/projects/one-capital.png",
    url: "https://one-capital-premium-website.vercel.app/",
    highlight: "Precision wealth management and family office platform.",
  },
  {
    id: 5,
    name: "Tell Star",
    blurb: "IT Networks Site",
    category: "Brand",
    label: "React · Marketing",
    year: "2025",
    image: "/images/projects/tellstar.png",
    url: "https://tellstar.in/",
    highlight: "IT networks marketing site built in React.",
  },
  {
    id: 6,
    name: "Outpost",
    blurb: "Design Studio",
    category: "Design",
    label: "Motion · Brand",
    year: "2024",
    image: "/images/projects/outpost.png",
    url: "https://jayeshpatil9869.github.io/Outpost-Project/",
    highlight: "Design studio presence with motion and brand-led layout.",
  },
  {
    id: 7,
    name: "Rethink",
    blurb: "Creative Studio",
    category: "Design",
    label: "3D · Webflow",
    year: "2024",
    image: "/images/projects/rethink.png",
    url: "https://jayeshpatil9869.github.io/Rethink/",
    highlight: "Creative studio site with 3D and Webflow craft.",
  },
  {
    id: 8,
    name: "AnimeVerse",
    blurb: "Digital Artbook",
    category: "Product",
    label: "React · Motion",
    year: "2024",
    image: "/images/projects/animeverse.png",
    url: "https://jayeshpatil9869.github.io/Anime/",
    highlight: "Digital artbook experience in React with motion.",
  },
];

/** Brand names for the logo scroller. */
export const projectBrandNames = projects.map((p) => p.name);
