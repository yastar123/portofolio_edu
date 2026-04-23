import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
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
      className="fixed inset-0 z-[100] flex items-center justify-between px-6 md:px-12 lg:px-24 bg-background"
      exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Loading System
      </div>
      
      <div className="overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline gap-4">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-8xl font-bold tracking-tighter uppercase"
        >
          EJP<span className="text-primary">.</span>
        </motion.div>
      </div>

      <div className="font-display text-4xl md:text-6xl font-light">
        {progress}%
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Bottom-left meta — keeps top clear for the navbar */}
      <div className="hidden md:flex fixed bottom-6 left-6 lg:bottom-8 lg:left-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 z-40 mix-blend-difference pointer-events-none select-none items-center gap-3">
        <span>EJP / 2026</span>
        <span className="w-6 h-[1px] bg-muted-foreground/30" />
        <span>BDL — GMT+7</span>
      </div>
      {/* Bottom-right scroll progress */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 z-40 mix-blend-difference flex items-center gap-3 pointer-events-none select-none">
        <div className="hidden md:block w-16 h-[1px] bg-muted-foreground/25">
          <motion.div className="h-full bg-primary origin-left" style={{ scaleX }} />
        </div>
        <span className="tabular-nums">{progress.toString().padStart(2, "0")}%</span>
      </div>
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
