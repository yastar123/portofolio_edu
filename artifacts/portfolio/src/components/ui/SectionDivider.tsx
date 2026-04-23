import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "default" | "invert";
  label?: string;
}

export function SectionDivider({ variant = "default", label }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const isInvert = variant === "invert";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full overflow-hidden ${
        isInvert ? "bg-foreground" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6 md:py-8 flex items-center gap-4 md:gap-6">
        <motion.div
          className={`h-[1px] flex-1 origin-left ${
            isInvert ? "bg-background/20" : "bg-border"
          }`}
          style={{ scaleX }}
        />
        {label && (
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.25em] whitespace-nowrap ${
              isInvert ? "text-background/40" : "text-muted-foreground/70"
            }`}
          >
            {label}
          </span>
        )}
        <span
          aria-hidden
          className={`text-base leading-none ${
            isInvert ? "text-primary/70" : "text-primary"
          }`}
        >
          ✦
        </span>
        <motion.div
          className={`h-[1px] w-12 md:w-24 origin-right ${
            isInvert ? "bg-background/20" : "bg-border"
          }`}
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}
