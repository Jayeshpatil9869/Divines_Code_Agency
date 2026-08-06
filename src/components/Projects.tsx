import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.a
      href={`#case-study-${index}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full bg-surface border border-border rounded-none overflow-hidden md:even:mt-24 transition-colors hover:border-border/80"
      style={{
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`,
      } as any}
    >
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'var(--glow-primary)' }} />
      
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated z-10 border-b border-border">
        <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1] grayscale-[15%]" 
          />
        </motion.div>
      </div>

      <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4 bg-surface">
        <div className="flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-widest text-primary">Project 0{index + 1}</div>
            <h3 className="text-3xl font-light italic tracking-tight font-serif group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        <div className="flex justify-between items-end gap-4 mt-4">
          <p className="text-muted-foreground text-[11px] leading-relaxed flex-1 font-sans pr-4">{project.outcome}</p>
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors font-sans shrink-0">
            &rarr;
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[9px] uppercase tracking-wider font-mono px-2 py-1 bg-surface-elevated border border-border rounded-none text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const projects = [
    {
      title: "Fintech Dashboard",
      outcome: "Cut onboarding drop-off from 61% to 34% in eleven weeks.",
      tags: ["UX Design", "React", "2025"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800"
    },
    {
      title: "DevTools CLI Interface",
      outcome: "Redesigned core terminal flows leading to 3x feature adoption.",
      tags: ["Product Strategy", "TypeScript", "2024"],
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200&h=800"
    },
    {
      title: "Healthcare Portal",
      outcome: "Unified 3 legacy systems into one React application.",
      tags: ["Frontend Architecture", "UI Design", "2024"],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200&h=800"
    }
  ];

  return (
    <section id="work" className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display mb-4">Selected work</h2>
            <p className="text-lg text-muted-foreground">Three projects, each with the reasoning behind it.</p>
          </div>
          <a href="#all-work" className="text-sm font-medium border-b border-foreground/30 hover:border-foreground pb-1 transition-colors">
            View all case studies &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
