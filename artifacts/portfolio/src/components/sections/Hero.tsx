import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Download, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function KineticText({ text }: { text: string }) {
  return (
    <div className="overflow-hidden flex">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.8 + index * 0.03,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 overflow-hidden bg-background">
      <motion.div style={{ y }} className="max-w-7xl mx-auto w-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Currently building @ Freelance + KM ITERA
            </span>
          </div>
        </motion.div>
        
        <h1 className="text-[12vw] md:text-[9vw] lg:text-[8vw] leading-[0.85] font-display font-bold uppercase tracking-tighter flex flex-col gap-2">
          <KineticText text="End-to-End" />
          <div className="flex items-center gap-4 md:gap-8">
            <KineticText text="Web" />
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[8px] md:h-[12px] bg-primary flex-1 origin-left mt-4"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <KineticText text="Architecture" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-primary"
            >
              .
            </motion.span>
          </div>
        </h1>

        <motion.div 
          className="mt-12 md:mt-24 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <div className="max-w-xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans font-light">
              Saya Edu Juanda Pratama, Full Stack Developer dari Bandar Lampung. 
              Membangun solusi digital yang scalable, aman, dan berfokus pada <span className="text-foreground font-medium">performa</span> & <span className="text-foreground font-medium">user experience</span>.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => scrollTo("work")}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-sm uppercase tracking-widest overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Karya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <a 
                href="#" 
                className="group flex items-center justify-center gap-3 px-8 py-4 border border-border hover:border-foreground text-foreground font-mono text-sm uppercase tracking-widest transition-colors"
              >
                <span>Unduh CV</span>
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:ml-auto">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Stack</p>
              <p className="font-display text-lg font-bold">React / Next.js</p>
              <p className="font-display text-lg font-bold">Laravel / PHP</p>
              <p className="font-display text-lg font-bold text-muted-foreground">PostgreSQL</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">Based In</p>
              <p className="font-display text-lg font-bold">Bandar Lampung</p>
              <p className="font-display text-lg font-bold text-muted-foreground">Indonesia</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="writing-vertical rotate-180">Scroll to explore</span>
        <ArrowDownRight className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
