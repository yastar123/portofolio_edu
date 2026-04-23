import { motion } from "framer-motion";

interface LiveWaveBadgeProps {
  label?: string;
  href?: string;
  className?: string;
}

const BARS = 14;

export function LiveWaveBadge({
  label = "Currently building @ Freelance + KM ITERA",
  href,
  className = "",
}: LiveWaveBadgeProps) {
  const Inner = (
    <span
      className={`inline-flex items-center gap-3 px-4 py-2 bg-muted/80 backdrop-blur-sm rounded-full border border-border/50 group hover:border-primary/50 transition-colors ${className}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.6, 1], opacity: [0.55, 0.1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-primary"
        />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
      </span>

      <span
        aria-hidden
        className="hidden sm:flex items-end gap-[2px] h-3 w-[44px]"
      >
        {Array.from({ length: BARS }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.25 }}
            animate={{
              scaleY: [0.25, 0.4 + ((i * 37) % 70) / 100, 0.25],
            }}
            transition={{
              duration: 1.2 + (i % 5) * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.07,
            }}
            style={{ transformOrigin: "bottom" }}
            className="block w-[2px] flex-1 bg-primary/70 group-hover:bg-primary rounded-full"
          />
        ))}
      </span>

      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
