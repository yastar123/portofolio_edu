import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
      const probe = window.scrollY + window.innerHeight / 2.5;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && probe >= el.offsetTop) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Section navigation"
          className="hidden xl:flex fixed top-1/2 -translate-y-1/2 right-5 z-40 flex-col items-end gap-3 pointer-events-auto"
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex items-center gap-3 py-1"
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 mix-blend-difference ${
                    isActive
                      ? "opacity-100 text-foreground translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <motion.span
                    animate={{
                      scale: isActive ? 1 : 0.5,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`block rounded-full ${
                      isActive ? "bg-primary w-2 h-2" : "bg-muted-foreground/60 w-1.5 h-1.5 group-hover:bg-foreground"
                    }`}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="rail-ring"
                      className="absolute inset-0 rounded-full border border-primary/60"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
