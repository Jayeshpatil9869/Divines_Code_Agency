import { useEffect, useState } from 'react';

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full pt-32 pb-8 overflow-hidden bg-background relative border-t border-border">
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center pb-24 z-0">
        <h2 
          className="font-display font-bold leading-none tracking-tighter opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem, 20vw, 22rem)' }}
        >
          NAME.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col min-h-[40vh] justify-between">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-xl font-black tracking-tighter uppercase mb-6">NAME<span className="text-primary">.</span></h3>
            <p className="text-[11px] text-muted-foreground max-w-[200px] font-sans">
              Independent product designer and frontend engineer.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-4">Work</h4>
            <a href="#work" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Selected Projects</a>
            <a href="#services" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Services</a>
            <a href="#process" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Process</a>
            <a href="#pricing" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Pricing</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-4">Connect</h4>
            <a href="#contact" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Start a project</a>
            <a href="#" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Twitter / X</a>
            <a href="#" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">GitHub</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-4">Details</h4>
            <a href="#" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">hello@example.com</a>
            <a href="#" className="text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors">Read CV</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              Available for select projects
            </span>
            <span className="hidden md:inline">&middot;</span>
            <span className="font-mono uppercase tracking-wide">{time}</span>
          </div>
          
          <div>
            &copy; {new Date().getFullYear()} Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
