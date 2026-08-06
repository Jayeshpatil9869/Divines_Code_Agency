"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InfiniteSlider({
  children,
  gap = 24,
  duration = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  gap?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          reverse ? "[animation-direction:reverse]" : ""
        )}
        style={
          {
            gap: `${gap}px`,
            animation: `marquee ${duration}s linear infinite`,
            ["--gap" as string]: `${gap}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
