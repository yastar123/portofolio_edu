import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'text'>('default');

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

      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
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
    hover: { x: mousePosition.x - 8, y: mousePosition.y - 8, scale: 0, backgroundColor: "hsl(var(--primary))", mixBlendMode: "normal" as any },
    view: { x: mousePosition.x - 32, y: mousePosition.y - 32, scale: 4, backgroundColor: "hsl(var(--background))", mixBlendMode: "normal" as any },
    text: { x: mousePosition.x - 8, y: mousePosition.y - 8, scale: 3, backgroundColor: "#fff", mixBlendMode: "difference" as any }
  };

  const ringVariants = {
    default: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 1, opacity: 0.5 },
    hover: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 1.5, opacity: 1, borderColor: "hsl(var(--primary))" },
    view: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 0, opacity: 0 },
    text: { x: mousePosition.x - 20, y: mousePosition.y - 20, scale: 0, opacity: 0 }
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
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: cursorState === 'view' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[99]"
        variants={ringVariants}
        animate={cursorState}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5
        }}
      />
    </>
  );
}
