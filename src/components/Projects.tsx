import { useRef } from "react";
import MusicPortfolio, { type MusicProject } from "@/components/ui/music-portfolio";
import "@/components/ui/music-portfolio.css";
import { useGsap, animateSectionReveals } from "@/animations";

/** Selected work mapped into the music-portfolio row schema */
const projectsData: MusicProject[] = [
  {
    id: 1,
    artist: "PulsePay",
    album: "Fintech Onboarding",
    category: "Product",
    label: "UX · React",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    artist: "Arc Labs",
    album: "DevTools CLI",
    category: "Strategy",
    label: "TypeScript",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    artist: "Helix Health",
    album: "Healthcare Portal",
    category: "Systems",
    label: "Architecture",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    artist: "Northwind",
    album: "Growth Dashboard",
    category: "Design",
    label: "Next.js · UI",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 5,
    artist: "Cascade",
    album: "Design System",
    category: "Systems",
    label: "Tokens · React",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 6,
    artist: "Vertex",
    album: "Launch Site",
    category: "Brand",
    label: "Vite · Motion",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
  },
];

const config = {
  timeZone: "America/New_York",
  timeUpdateInterval: 1000,
  idleDelay: 4000,
};

const socialLinks = {
  email: "mailto:hello@divinescode.agency",
  x: "https://x.com",
  spotify: "https://github.com",
};

const location = {
  latitude: "40.7128° N",
  longitude: "74.0060° W",
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
            <p className="text-lg text-muted-foreground font-light max-w-md">
              Hover a row — image and scramble reveal the case study.
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
