"use client";

import { cn } from "@/lib/utils";

export function TextShimmer({
  children,
  className,
  duration = 2.5,
}: {
  children: string;
  className?: string;
  duration?: number;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-[linear-gradient(90deg,#737373_0%,#E5E5E5_40%,#A58B6D_50%,#E5E5E5_60%,#737373_100%)] bg-[length:200%_auto] bg-clip-text text-transparent",
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
