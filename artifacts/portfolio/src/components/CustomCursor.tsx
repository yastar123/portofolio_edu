import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'link' | 'view' | 'text'>('default');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
      
      if (isClickable) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const variants = {
    default: { x: mousePosition.x - 8, y: mousePosition.y - 8, scale: 1, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" as any },
    hover: { x: mousePosition.x - 8, y: mousePosition.y - 8, scale: 0.5, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" as any },
    link: { x: mousePosition.x - 16, y: mousePosition.y - 16, scale: 2, backgroundColor: "hsl(var(--foreground))", mixBlendMode: "normal" as any },
    view: { x: mousePosition.x - 32, y: mousePosition.y - 32, scale: 4, backgroundColor: "hsl(var(--background))", mixBlendMode: "normal" as any },
    text: { x: mousePosition.x - 8, y: mousePosition.y - 8, scale: 3, backgroundColor: "#fff", mixBlendMode: "difference" as any }
  };

  const ringVariants = {
    default: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 1, opacity: 0.5, borderColor: "hsl(var(--border))" },
    hover: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 1.5, opacity: 1, borderColor: "hsl(var(--primary))" },
    link: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 0, opacity: 0, borderColor: "transparent" },
    view: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 0, opacity: 0, borderColor: "transparent" },
    text: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 0, opacity: 0, borderColor: "transparent" }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] flex items-center justify-center text-[3px] font-mono font-bold text-foreground uppercase tracking-widest overflow-hidden"
        variants={variants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5
        }}
      >
        <AnimatePresence mode="wait">
          {cursorState === 'view' && (
            <motion.span 
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              View
            </motion.span>
          )}
          {cursorState === 'link' && (
            <motion.div
              key="link"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="text-background"
            >
              <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[99] flex items-center justify-center text-primary"
        variants={ringVariants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5
        }}
      >
        <AnimatePresence>
          {cursorState === 'hover' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Plus className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
