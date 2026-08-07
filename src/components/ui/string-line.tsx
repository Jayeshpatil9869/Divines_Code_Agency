import { useRef, type MouseEvent } from "react";
import { gsap, prefersReducedMotion } from "@/animations";
import { cn } from "@/lib/utils";

const FINAL_PATH = "M 10 100 Q 500 100 990 100";

type StringLineProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
};

/**
 * Interactive SVG string — bends toward the cursor, elastic snap on leave.
 */
export function StringLine({
  className,
  stroke = "white",
  strokeWidth = 1.5,
}: StringLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const rect = container.getBoundingClientRect();
    const scaleX = 1000 / rect.width;
    const scaleY = 200 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    const d = `M 10 100 Q ${mouseX} ${mouseY} 990 100`;

    gsap.to(path, {
      attr: { d },
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion()) return;
    const path = pathRef.current;
    if (!path) return;

    gsap.to(path, {
      attr: { d: FINAL_PATH },
      duration: 1.2,
      ease: "elastic.out(1.75, 0.2)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-16 w-full cursor-pointer items-center justify-center md:h-20",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
    >
      <svg
        viewBox="0 0 1000 200"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={FINAL_PATH}
          stroke={stroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
