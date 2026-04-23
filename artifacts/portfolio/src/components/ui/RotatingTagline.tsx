import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingTaglineProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingTagline({
  items,
  intervalMs = 2600,
  className = "",
}: RotatingTaglineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [items.length, intervalMs]);

  return (
    <span
      className={`relative inline-flex overflow-hidden align-baseline ${className}`}
      aria-live="polite"
    >
      <span className="invisible whitespace-nowrap" aria-hidden>
        {items.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
