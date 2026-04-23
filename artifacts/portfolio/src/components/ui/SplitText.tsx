import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, ElementType } from "react";

interface SplitTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  splitBy?: "word" | "char";
  delay?: number;
  stagger?: number;
  yOffset?: string;
  duration?: number;
  once?: boolean;
}

const containerV: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0 },
  }),
};

export function SplitText({
  children,
  as: Tag = "span",
  className = "",
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
  yOffset = "100%",
  duration = 0.9,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const tokens =
    splitBy === "word"
      ? children.split(/(\s+)/) // keep whitespace
      : children.split("");

  const childV: Variants = {
    hidden: { y: yOffset, opacity: 0, rotate: 4 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  const Component = (motion as any).create(Tag) as any;

  return (
    <Component
      ref={ref as any}
      className={className}
      variants={containerV}
      custom={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {tokens.map((token: string, i: number) => {
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>;
        }
        return (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span variants={childV} className="inline-block will-change-transform">
              {token === " " ? "\u00A0" : (token as ReactNode)}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}
