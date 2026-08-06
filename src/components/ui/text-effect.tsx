"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Preset = "fade" | "blur" | "slide" | "blur-slide";

const presets: Record<Preset, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "blur-slide": {
    hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function TextEffect({
  children,
  className,
  preset = "blur-slide",
  per = "word",
  delay = 0,
  as: Tag = "p",
}: {
  children: string;
  className?: string;
  preset?: Preset;
  per?: "word" | "char" | "line";
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}) {
  const segments =
    per === "char"
      ? children.split("")
      : per === "line"
        ? children.split("\n")
        : children.split(" ");

  const variants = presets[preset];

  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{children}</span>
      <motion.span
        initial="hidden"
        animate="visible"
        aria-hidden
        transition={{ staggerChildren: per === "char" ? 0.02 : 0.06, delayChildren: delay }}
        className="inline"
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${segment}-${i}`}
            variants={variants}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block whitespace-pre"
          >
            {segment}
            {per === "word" ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
