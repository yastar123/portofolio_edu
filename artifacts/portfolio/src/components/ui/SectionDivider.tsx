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
  const dotX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const isInvert = variant === "invert";

  // Try to extract a leading "NN" from the label for a number badge
  const match = label?.match(/^(\d{2})\s*[—-]?\s*(.*)$/);
  const number = match?.[1];
  const text = match?.[2] ?? label;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full overflow-hidden ${
        isInvert ? "bg-foreground" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-10 flex items-center gap-4 md:gap-6">
        {number && (
          <span
            className={`relative inline-flex items-center justify-center font-mono text-[10px] tabular-nums tracking-[0.2em] w-9 h-9 md:w-10 md:h-10 rounded-full border ${
              isInvert
                ? "border-background/20 text-background/80 bg-background/5"
                : "border-border text-foreground bg-card"
            }`}
          >
            <span
              aria-hidden
              className={`absolute -inset-[1px] rounded-full border ${
                isInvert ? "border-primary/30" : "border-primary/40"
              } [mask-image:linear-gradient(to_bottom,black,transparent)]`}
            />
            {number}
          </span>
        )}
        <div className="relative h-[1px] flex-1">
          <div
            className={`absolute inset-0 ${
              isInvert ? "bg-background/15" : "bg-border"
            }`}
          />
          <motion.div
            className={`absolute inset-0 origin-left ${
              isInvert ? "bg-background/60" : "bg-foreground/60"
            }`}
            style={{ scaleX }}
          />
          <motion.span
            aria-hidden
            style={{ left: dotX }}
            className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.6)] -translate-x-1/2"
          />
        </div>
        {text && (
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.25em] whitespace-nowrap ${
              isInvert ? "text-background/50" : "text-muted-foreground/80"
            }`}
          >
            {text}
          </span>
        )}
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className={`text-base leading-none ${
            isInvert ? "text-primary/70" : "text-primary"
          }`}
          aria-hidden
        >
          ✦
        </motion.span>
      </div>
    </div>
  );
}
