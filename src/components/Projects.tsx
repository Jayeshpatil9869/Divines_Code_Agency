import { useRef } from "react";
import MusicPortfolio, { type MusicProject } from "@/components/ui/music-portfolio";
import "@/components/ui/music-portfolio.css";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateSectionReveals } from "@/animations";

/** Selected work mapped into the music-portfolio row schema */
const projectsData: MusicProject[] = [
  {
    id: 1,
    artist: "Riyansh",
    album: "Ayurvedic Store",
    category: "Product",
    label: "E-commerce",
    year: "2025",
    image: "/images/projects/riyansh.png",
    url: "https://riyanshamrit.com/",
  },
  {
    id: 2,
    artist: "Gravitatee",
    album: "Masala Brand Site",
    category: "Brand",
    label: "E-commerce · UI",
    year: "2025",
    image: "/images/projects/gravitatee.png",
    url: "https://gravitatee.com/",
  },
  {
    id: 3,
    artist: "Tell Star",
    album: "IT Networks Site",
    category: "Brand",
    label: "React · Marketing",
    year: "2025",
    image: "/images/projects/tellstar.png",
    url: "https://tellstar.in/",
  },
  {
    id: 4,
    artist: "Outpost",
    album: "Design Studio",
    category: "Design",
    label: "Motion · Brand",
    year: "2024",
    image: "/images/projects/outpost.png",
    url: "https://jayeshpatil9869.github.io/Outpost-Project/",
  },
  {
    id: 5,
    artist: "Rethink",
    album: "Creative Studio",
    category: "Design",
    label: "3D · Webflow",
    year: "2024",
    image: "/images/projects/rethink.png",
    url: "https://jayeshpatil9869.github.io/Rethink/",
  },
  {
    id: 6,
    artist: "AnimeVerse",
    album: "Digital Artbook",
    category: "Product",
    label: "React · Motion",
    year: "2024",
    image: "/images/projects/animeverse.png",
    url: "https://jayeshpatil9869.github.io/Anime/",
  },
];

const config = {
  timeZone: "Asia/Kolkata",
  timeUpdateInterval: 1000,
  idleDelay: 4000,
};

const socialLinks = {
  email: "mailto:hello@divinescode.agency",
  x: "https://x.com",
  spotify: "https://github.com",
};

const location = {
  latitude: "19.9975° N",
  longitude: "73.7898° E",
  display: true,
};

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  useGsap(rootRef, (root) => animateSectionReveals(root), []);

  return (
    <section id="work" ref={rootRef} className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-14">
        <div
          data-gsap="reveal"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">
              Selected work
            </h2>
            <p className="text-lg font-light max-w-md">
              <TextShimmer duration={3}>
                Hover or tap a row to preview — tap again to open the live demo.
              </TextShimmer>
            </p>
          </div>
          <a
            href="#contact"
            className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-border pb-1 hover:border-primary hover:text-primary transition-colors"
          >
            Start a project →
          </a>
        </div>
      </div>

      <div data-gsap="reveal" className="max-w-7xl mx-auto px-6">
        <MusicPortfolio
          PROJECTS_DATA={projectsData}
          CONFIG={config}
          SOCIAL_LINKS={socialLinks}
          LOCATION={location}
        />
      </div>
    </section>
  );
}
