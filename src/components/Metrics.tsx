import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function Counter({ from, to, duration = 1.2, suffix = '' }: { from: number, to: number, duration?: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const update = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Metrics() {
  const metrics = [
    { value: 61, label: "Projects Shipped", suffix: "+" },
    { value: 92, label: "Avg. Retention (Days)", suffix: "" },
    { value: 14, label: "Enterprise Clients", suffix: "" },
    { value: 3, label: "Awards Won", suffix: "" }
  ];

  return (
    <section className="w-full py-20 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          <div className="md:col-span-1 flex flex-col justify-end pb-4 md:border-r border-border md:pr-8">
            <h2 className="text-2xl font-display mb-2">The work, in numbers</h2>
            <p className="text-sm text-muted-foreground">Measured 90 days post-launch, verified with each client.</p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {metrics.map((metric, i) => (
              <div 
                key={i} 
                className="flex flex-col gap-2 md:px-8 md:border-r border-border last:border-0"
              >
                <div className="text-4xl md:text-5xl font-mono text-foreground font-light tracking-tight">
                  <Counter from={0} to={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
