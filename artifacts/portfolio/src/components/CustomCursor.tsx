import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'link' | 'view' | 'text'>('default');
  const [enabled, setEnabled] = useState(false);

  // Use motion values + spring instead of React state — avoids re-rendering every mouse move.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotSpring = { stiffness: 500, damping: 30, mass: 0.4 };
  const ringSpring = { stiffness: 200, damping: 22, mass: 0.6 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isProjectImage = target.closest('[data-cursor="view"]');
      if (isProjectImage) {
        setCursorState('view');
        return;
      }

      const isText = target.tagName.toLowerCase() === 'h1' ||
                     target.tagName.toLowerCase() === 'h2' ||
                     target.tagName.toLowerCase() === 'p';
      if (isText && !target.closest('button') && !target.closest('a')) {
        setCursorState('text');
        return;
      }

      const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a') !== null;
      if (isLink) {
        setCursorState('link');
        return;
      }

      const isClickable =
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setCursorState(isClickable ? 'hover' : 'default');
    };

    const handleMouseLeaveDoc = () => {
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  // Per-state visual config (offsets are applied via translate(-50%) so x/y points to centre)
  const dotConfig: Record<typeof cursorState, { scale: number; backgroundColor: string; mixBlendMode: string }> = {
    default: { scale: 1, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" },
    hover:   { scale: 0.5, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" },
    link:    { scale: 2, backgroundColor: "hsl(var(--foreground))", mixBlendMode: "normal" },
    view:    { scale: 5, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" },
    text:    { scale: 3, backgroundColor: "#fff", mixBlendMode: "difference" },
  };
  const ringConfig: Record<typeof cursorState, { scale: number; opacity: number; borderColor: string }> = {
    default: { scale: 1, opacity: 0.55, borderColor: "hsl(var(--border))" },
    hover:   { scale: 1.6, opacity: 1, borderColor: "hsl(var(--primary))" },
    link:    { scale: 0, opacity: 0, borderColor: "transparent" },
    view:    { scale: 0, opacity: 0, borderColor: "transparent" },
    text:    { scale: 0, opacity: 0, borderColor: "transparent" },
  };

  const dot = dotConfig[cursorState];
  const ring = ringConfig[cursorState];

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] flex items-center justify-center font-mono font-bold uppercase tracking-widest will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: dot.mixBlendMode as React.CSSProperties["mixBlendMode"],
        }}
        animate={{ scale: dot.scale, backgroundColor: dot.backgroundColor }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {cursorState === 'view' && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="text-[3px] text-primary-foreground"
            >
              View
            </motion.span>
          )}
          {cursorState === 'link' && (
            <motion.div
              key="link"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="text-background"
            >
              <ArrowUpRight className="w-2 h-2" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[99] flex items-center justify-center text-primary will-change-transform"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: ring.scale, opacity: ring.opacity, borderColor: ring.borderColor }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        <AnimatePresence>
          {cursorState === 'hover' && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
