import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [113, 0]);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.45)] group"
        >
          {/* Circular progress ring */}
          <svg
            aria-hidden
            viewBox="0 0 40 40"
            className="absolute inset-0 w-full h-full -rotate-90"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="hsl(var(--background) / 0.25)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="113"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <ArrowUp className="relative w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
