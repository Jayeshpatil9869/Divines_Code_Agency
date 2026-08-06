import { useState } from 'react';

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"]
    },
    {
      name: "Design",
      skills: ["Figma", "Design Systems", "Wireframing", "Prototyping", "User Research"]
    },
    {
      name: "Backend & Tools",
      skills: ["Node.js", "Supabase", "Git", "Vercel", "Vitest", "Playwright"]
    }
  ];

  return (
    <section className="w-full py-24 border-t border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-sm text-muted-foreground font-mono uppercase tracking-wider">Stack & Capabilities</h2>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {categories.map(cat => (
              <div key={cat.name} className="flex flex-col gap-6">
                <h3 className="font-mono text-xs text-muted-foreground uppercase">{cat.name}</h3>
                <div className="flex flex-col items-start gap-3">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`text-sm md:text-base cursor-default transition-opacity duration-300 ${
                        hoveredSkill && hoveredSkill !== skill ? 'opacity-40' : 'opacity-100'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
