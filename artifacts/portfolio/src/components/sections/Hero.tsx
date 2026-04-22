import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 overflow-hidden">
      <motion.div style={{ y }} className="max-w-6xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm md:text-base text-muted-foreground uppercase tracking-widest mb-6">
            Elias Vance — Creative Developer & Designer
          </p>
        </motion.div>
        
        <motion.h1 
          className="text-[12vw] leading-[0.85] md:text-[8vw] lg:text-[10vw] font-display font-bold uppercase tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting <br />
          <span className="text-primary italic font-serif lowercase tracking-normal">Digital</span><br />
          Architecture
        </motion.h1>

        <motion.div 
          className="mt-12 md:mt-24 grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="max-w-md">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I build immersive interfaces and engineered systems that feel authored, not assembled. Blending brutalist principles with precise engineering.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center gap-4 text-sm font-mono uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <ArrowDownRight className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
