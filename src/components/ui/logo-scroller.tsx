import { cn } from "@/lib/utils";

type LogoScrollerProps = {
  logos: string[];
  /** Scroll duration, e.g. "40s". Default "40s". */
  speed?: string;
  className?: string;
};

/**
 * Infinite horizontal logo / brand-name scroller with edge fade mask.
 */
export function LogoScroller({
  logos,
  speed = "40s",
  className,
}: LogoScrollerProps) {
  if (!logos.length) return null;

  return (
    <div className={cn("scroller-mask group", className)}>
      <div
        className="scroller-track animate-scroll"
        style={{ ["--scroll-duration" as string]: speed }}
      >
        <div className="scroller-set">
          {logos.map((logo, index) => (
            <span key={`${logo}-${index}`} className="logo-item">
              {logo}
            </span>
          ))}
        </div>
        <div className="scroller-set" aria-hidden="true">
          {logos.map((logo, index) => (
            <span key={`dup-${logo}-${index}`} className="logo-item">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoScroller;
