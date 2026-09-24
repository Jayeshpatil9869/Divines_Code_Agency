"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
          ? "bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.95)_30%,#b45309_45%,#f59e0b_50%,#b45309_55%,rgba(0,0,0,0.95)_70%,rgba(0,0,0,0.45)_100%)]"
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
