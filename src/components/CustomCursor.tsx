import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isInteractable = window.getComputedStyle(target).cursor === 'pointer' || 
                             target.tagName.toLowerCase() === 'a' ||
                             target.tagName.toLowerCase() === 'button' ||
                             target.closest('a') ||
                             target.closest('button');
                             
      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-foreground rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-foreground/50 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'hsl(var(--foreground))' : 'transparent',
          borderWidth: isHovering ? '0px' : '1px'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 20,
          mass: 0.5
        }}
      />
    </>
  );
}
