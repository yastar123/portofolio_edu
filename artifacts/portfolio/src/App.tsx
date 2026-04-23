import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SectionRail } from "@/components/ui/SectionRail";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Lenis from 'lenis';

const queryClient = new QueryClient();

const LOADER_STATUSES = [
  "INITIALIZING",
  "LOADING TYPEFACES",
  "WARMING ANIMATIONS",
  "ALMOST THERE",
];

function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;

    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      const nextIdx = Math.min(
        Math.floor((currentProgress / 100) * LOADER_STATUSES.length),
        LOADER_STATUSES.length - 1
      );
      setStatusIndex(nextIdx);

      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  const fullName = "EDU JUANDA PRATAMA";
  const letters = fullName.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,_black_20%,_transparent_70%)] opacity-70"
      />

      {/* Decorative crosshairs (corners) */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
          className={`absolute w-4 h-4 border-foreground/40 ${c}`}
        />
      ))}

      {/* Top meta row */}
      <div className="relative flex items-center justify-between px-6 md:px-12 lg:px-24 pt-8 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-primary"
            />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={statusIndex}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {LOADER_STATUSES[statusIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground tabular-nums"
        >
          PORTFOLIO / 2026
        </motion.div>
      </div>

      {/* Centerpiece — split-letter name reveal */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="block w-12 h-[2px] bg-primary origin-left"
        />

        <h1
          aria-label={fullName}
          className="font-display font-bold uppercase tracking-tighter text-center leading-[0.85] text-[clamp(2.25rem,9vw,7rem)] flex flex-wrap justify-center max-w-[90vw]"
        >
          {letters.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden align-baseline">
              <motion.span
                initial={{ y: "110%", rotate: 8, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.55 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="font-serif italic text-muted-foreground text-sm md:text-base"
        >
          full stack developer · <span className="text-primary not-italic font-mono uppercase tracking-widest text-xs">v2026.04</span>
        </motion.p>
      </div>

      {/* Progress rail + counter */}
      <div className="relative px-6 md:px-12 lg:px-24 pb-8 md:pb-10 flex items-end justify-between gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            <span>End-to-End Web Architecture</span>
            <span className="tabular-nums text-foreground font-bold">
              {progress.toString().padStart(3, "0")}
              <span className="text-primary">%</span>
            </span>
          </div>
          <div className="relative h-[2px] w-full bg-border/60 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary origin-left"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
              style={{ transformOrigin: "0% 50%", width: "100%" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary/40 origin-left blur-sm"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
              style={{ transformOrigin: "0% 50%", width: "100%" }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 tabular-nums">
            <span>00 · idle</span>
            <span>·</span>
            <span>FF · ready</span>
          </div>
        </div>
        <div className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-muted-foreground tabular-nums">
          BDL — GMT+7
        </div>
      </div>
    </motion.div>
  );
}

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

function CornerAnnotations() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Hide corner meta while still in the Hero so it doesn't collide with the marquee
      const threshold = typeof window !== "undefined" ? window.innerHeight * 0.6 : 400;
      setPastHero(latest > threshold);
    });
  }, [scrollY]);

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60] pointer-events-none"
        style={{ scaleX }}
      />
      {/* Bottom-left meta — only shown after the Hero to avoid overlapping the marquee */}
      <motion.div
        className="hidden md:flex fixed bottom-6 left-6 lg:bottom-8 lg:left-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 z-40 mix-blend-difference pointer-events-none select-none items-center gap-3"
        animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>EJP / 2026</span>
        <span className="w-6 h-[1px] bg-muted-foreground/30" />
        <span>BDL — GMT+7</span>
      </motion.div>
      {/* Bottom-right scroll progress */}
      <motion.div
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 z-40 mix-blend-difference flex items-center gap-3 pointer-events-none select-none"
        animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : 8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hidden md:block w-16 h-[1px] bg-muted-foreground/25">
          <motion.div className="h-full bg-primary origin-left" style={{ scaleX }} />
        </div>
        <span className="tabular-nums">{progress.toString().padStart(2, "0")}%</span>
      </motion.div>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasVisited || prefersReducedMotion) {
      setLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SmoothScrollProvider>
            <div className="noise-overlay"></div>
            <CornerAnnotations />
            <SectionRail />
            <ScrollToTop />
            <div className="cursor-none-global">
              <CustomCursor />
              <AnimatePresence mode="wait">
                {loading ? (
                  <InitialLoader key="loader" onComplete={handleLoaderComplete} />
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                      <Router />
                    </WouterRouter>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Toaster />
          </SmoothScrollProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
