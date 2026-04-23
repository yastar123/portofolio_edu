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

function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    
    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 300);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-background overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 pt-6 md:pt-8">
        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inline-flex h-full w-full rounded-full bg-primary"
            />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Loading System
        </div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground tabular-nums">
          EJP / 2026
        </div>
      </div>

      {/* Centerpiece */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="overflow-hidden flex items-baseline">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter uppercase"
          >
            EJP<span className="text-primary">.</span>
          </motion.div>
        </div>
      </div>

      {/* Progress rail + counter */}
      <div className="px-6 md:px-12 lg:px-24 pb-6 md:pb-8 flex items-end justify-between gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-end justify-between mb-3 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            <span>End-to-End Web Architecture</span>
            <span className="tabular-nums text-foreground">{progress.toString().padStart(3, "0")}%</span>
          </div>
          <div className="h-[2px] w-full bg-border/60 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-primary origin-left"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
              style={{ transformOrigin: "0% 50%" }}
            />
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
