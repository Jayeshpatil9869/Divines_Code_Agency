"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export function InView({
  children,
  className,
  variants,
  once = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants ?? defaultVariants}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
