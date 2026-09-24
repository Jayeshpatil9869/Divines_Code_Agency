"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function TextShimmer({
  children,
  className,
  duration = 2.8,
  variant = "dark",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  variant?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-block bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]",
        variant === "light"
          ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,#000000_30%,hsl(32_28%_45%)_45%,#e8d5b5_50%,hsl(32_28%_45%)_55%,#000000_70%,rgba(0,0,0,0.55)_100%)]"
          : "bg-[linear-gradient(90deg,#000000_0%,#ffffff_35%,var(--shimmer-color,#e8d5b5)_50%,#ffffff_65%,#000000_100%)]",
        className
      )}
      style={{
        animation: `text-shimmer ${duration}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
