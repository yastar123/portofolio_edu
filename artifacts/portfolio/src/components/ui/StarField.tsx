import { useMemo } from "react";
import { motion } from "framer-motion";

interface StarFieldProps {
  count?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

// Deterministic pseudo-random so SSR/CSR match and stars stay stable across renders
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function StarField({ count = 26, className = "" }: StarFieldProps) {
  const stars = useMemo<Star[]>(() => {
    const rand = seeded(7919);
    return Array.from({ length: count }).map(() => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 1.6,
      delay: rand() * 4,
      duration: 2.8 + rand() * 2.6,
      opacity: 0.25 + rand() * 0.5,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, s.opacity, 0],
            scale: [0.6, 1, 0.6],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
