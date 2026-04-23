import { motion } from "framer-motion";

interface RotatingStampProps {
  text: string;
  size?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
  innerSymbol?: string;
}

export function RotatingStamp({
  text,
  size = 140,
  duration = 22,
  reverse = false,
  className = "",
  innerSymbol = "✦",
}: RotatingStampProps) {
  const id = `stamp-circle-${text.replace(/\s+/g, "-")}`;
  // Repeat text so it fully wraps the circle
  const repeated = `${text} · ${text} · `;

  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size }}
      className={`relative ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="text-foreground"
        aria-hidden
      >
        <defs>
          <path
            id={id}
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          fontSize="13"
          fontFamily="var(--app-font-mono, monospace)"
          letterSpacing="6"
          fill="currentColor"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href={`#${id}`} startOffset="0">
            {repeated}
          </textPath>
        </text>
      </svg>
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display text-2xl text-primary"
      >
        {innerSymbol}
      </span>
    </motion.div>
  );
}
