import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  max = 8,
  scale = 1.015,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springCfg = { stiffness: 180, damping: 18, mass: 0.5 };
  const xSpring = useSpring(x, springCfg);
  const ySpring = useSpring(y, springCfg);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-max, max]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glareX, glareY] as any,
              ([gx, gy]: [string, string]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
