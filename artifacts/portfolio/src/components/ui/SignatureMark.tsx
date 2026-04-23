import { motion } from "framer-motion";

interface SignatureMarkProps {
  className?: string;
  strokeColor?: string;
  duration?: number;
}

export function SignatureMark({
  className = "",
  strokeColor = "currentColor",
  duration = 2.4,
}: SignatureMarkProps) {
  return (
    <motion.svg
      viewBox="0 0 320 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Edu Juanda Pratama signature"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.path
        d="M14 78 C 28 38, 60 30, 78 60 C 88 78, 60 92, 50 70 C 46 60, 64 50, 86 56 C 108 62, 110 80, 130 78 C 144 76, 150 56, 132 50 C 118 46, 110 64, 124 78 C 140 92, 168 78, 174 60 C 180 42, 162 32, 150 50"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration, ease: [0.6, 0.05, 0.35, 1] },
          },
        }}
      />
      <motion.path
        d="M186 70 C 200 38, 230 30, 240 60 C 246 80, 220 90, 214 72 C 210 60, 230 52, 250 60 C 268 68, 274 56, 282 38"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: duration * 0.85,
              delay: duration * 0.45,
              ease: [0.6, 0.05, 0.35, 1],
            },
          },
        }}
      />
      <motion.path
        d="M278 84 C 286 80, 296 80, 304 84"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 0.6,
              delay: duration * 0.95,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
      />
      <motion.circle
        cx="310"
        cy="84"
        r="3.5"
        fill="hsl(var(--primary))"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: duration * 1.05,
              type: "spring",
              stiffness: 350,
              damping: 18,
            },
          },
        }}
        style={{ transformOrigin: "310px 84px" }}
      />
    </motion.svg>
  );
}
