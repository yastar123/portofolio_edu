import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDownRight, Download, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Linkedin as SiLinkedin } from "lucide-react";
import { Mail } from "lucide-react";

function KineticText({ text, delay = 0, yOffset = "100%", mouseX, mouseY }: { text: string, delay?: number, yOffset?: string, mouseX: any, mouseY: any }) {
  // Parallax effect based on mouse position (hooks always called for stable order)
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const parallaxX = useTransform(mouseX, [0, winW], [-10, 10]);
  const parallaxY = useTransform(mouseY, [0, winH], [-10, 10]);

  // Disable parallax if prefers reduced motion or on touch devices
  const isTouch = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const x = !isTouch && !prefersReducedMotion ? parallaxX : 0;
  const yParallax = !isTouch && !prefersReducedMotion ? parallaxY : 0;

  return (
    <motion.div className="overflow-hidden flex" style={{ x, y: yParallax }}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: yOffset, rotate: prefersReducedMotion ? 0 : 10, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + index * 0.04,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-foreground text-background py-3 md:py-4 flex items-center mt-auto border-t border-border/20 z-20 group">
      <motion.div 
        className="flex whitespace-nowrap gap-8 pr-8 text-xs md:text-sm font-mono uppercase tracking-widest group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>FULL STACK DEVELOPER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>BANDAR LAMPUNG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>AVAILABLE FOR WORK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  
  // Use spring for smoother scroll-linked transforms
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Mouse position for parallax
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="home" ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-between pt-32 overflow-hidden bg-background">

      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_75%)]" />

      {/* Background ambient gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={prefersReducedMotion ? {} : { 
            rotate: [0, 360], 
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--primary),0.08)_0%,rgba(var(--background),0)_25%,rgba(var(--primary),0.02)_50%,rgba(var(--background),0)_75%,rgba(var(--primary),0.08)_100%)] rounded-full blur-[80px] mix-blend-screen" 
        />
        <motion.div 
          animate={prefersReducedMotion ? {} : { 
            rotate: [360, 0], 
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(var(--foreground),0.05)_0%,rgba(var(--background),0)_70%)] rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
        />
      </div>

      <motion.div 
        style={{ y: smoothY, opacity, scale }} 
        className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full z-10 relative flex-1 flex flex-col justify-center pb-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-8 md:mb-12"
        >
          <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 bg-muted/80 backdrop-blur-sm rounded-full border border-border/50 group hover:border-primary/50 transition-colors">
            <div className="relative flex h-2 w-2 items-center justify-center">
              <motion.span 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inline-flex h-full w-full rounded-full bg-primary"
              ></motion.span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </div>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              Currently building @ Freelance + KM ITERA
            </span>
          </a>
        </motion.div>
        
        <h1 className="text-[clamp(3rem,14vw,12rem)] md:text-[11vw] lg:text-[10vw] leading-[0.8] font-display font-bold uppercase tracking-tighter flex flex-col gap-1 md:gap-3 relative">
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay z-10" />
          <KineticText text="End-to-End" delay={0.5} yOffset="120%" mouseX={mouseX} mouseY={mouseY} />
          <div className="flex items-center gap-4 md:gap-8 relative z-0">
            <KineticText text="Web" delay={0.7} yOffset="120%" mouseX={mouseX} mouseY={mouseY} />
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="h-[10px] md:h-[1vw] bg-primary flex-1 origin-left mt-2 md:mt-[2vw]"
            />
          </div>
          <div className="flex items-baseline gap-2 relative z-0">
            <KineticText text="Architecture" delay={0.9} yOffset="120%" mouseX={mouseX} mouseY={mouseY} />
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
              className="text-primary"
            >
              .
            </motion.span>
          </div>
        </h1>

        <motion.div 
          className="mt-12 md:mt-24 grid lg:grid-cols-12 gap-12 lg:gap-8 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lg:col-span-7 max-w-xl">
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-sans font-light">
              Saya Edu Juanda Pratama, Full Stack Developer dari Bandar Lampung. 
              Membangun solusi digital yang scalable, aman, dan berfokus pada <span className="text-foreground font-medium underline decoration-primary/50 underline-offset-4">performa</span> & <span className="text-foreground font-medium underline decoration-primary/50 underline-offset-4">user experience</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10">
              <a 
                href="https://wa.me/6285366195381"
                target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 min-h-[44px] bg-foreground text-background font-mono text-xs uppercase tracking-widest rounded-full w-full sm:w-auto hover:text-background"
              >
                <div className="absolute inset-0 bg-primary translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                <span className="relative z-10 flex items-center gap-2">
                  Hubungi Saya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <button 
                onClick={() => scrollTo("work")}
                className="group flex items-center justify-center gap-3 px-8 py-4 min-h-[44px] border border-border hover:border-foreground text-foreground font-mono text-xs uppercase tracking-widest rounded-full transition-colors duration-500 w-full sm:w-auto"
              >
                <span>Lihat Karya</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-8 border-t border-border/50 pt-6">
              <a href="https://github.com/yastar123" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <SiGithub className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/edu-juanda-pratama-861249297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a href="mailto:yastariskandar@gmail.com" aria-label="Email" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:ml-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] w-4 bg-primary" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Stack</p>
              </div>
              <p className="font-display text-xl md:text-2xl font-bold tracking-tight">React / Next.js</p>
              <p className="font-display text-xl md:text-2xl font-bold tracking-tight">Laravel / PHP</p>
              <p className="font-display text-xl md:text-2xl font-bold tracking-tight text-muted-foreground">PostgreSQL</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] w-4 bg-primary" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Based In</p>
              </div>
              <p className="font-display text-xl md:text-2xl font-bold tracking-tight">Bandar Lampung</p>
              <p className="font-display text-xl md:text-2xl font-bold tracking-tight text-muted-foreground">Indonesia</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Marquee />

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-16 md:bottom-24 right-6 md:right-12 lg:right-24 flex flex-col items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="writing-vertical rotate-180">Scroll to explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-border relative overflow-hidden"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-primary"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
