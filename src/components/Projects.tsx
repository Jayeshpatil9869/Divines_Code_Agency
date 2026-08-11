import { useRef } from "react";
import MusicPortfolio, { type MusicProject } from "@/components/ui/music-portfolio";
import "@/components/ui/music-portfolio.css";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useGsap, animateSectionReveals } from "@/animations";
import { CONTACT_EMAIL, CONTACT_LINKEDIN } from "@/data/contact";
import { projects } from "@/data/projects";

const projectsData: MusicProject[] = projects.map((p) => ({
  id: p.id,
  artist: p.name,
  album: p.blurb,
  category: p.category,
  label: p.label,
  year: p.year,
  image: p.image,
  url: p.url,
}));

const config = {
  timeZone: "Asia/Kolkata",
  timeUpdateInterval: 1000,
  idleDelay: 4000,
};

const socialLinks = {
  email: `mailto:${CONTACT_EMAIL}`,
  linkedin: CONTACT_LINKEDIN,
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
