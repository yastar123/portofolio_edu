import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
          <div className="w-full md:w-auto">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,20vw,12rem)] md:text-[12vw] leading-none font-display font-bold uppercase tracking-tighter"
            >
              EJP<span className="text-primary">.</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-16 h-16 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all duration-500 group"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="text-left md:text-right font-mono text-sm uppercase tracking-widest text-background/60">
              <p>Bandar Lampung</p>
              <p>ID — GMT+7</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-background/20">
          <div className="font-mono text-xs uppercase tracking-widest text-background/60">
            &copy; {currentYear} Edu Juanda Pratama
          </div>
          
          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-background/60">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-background transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-background transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-background transition-colors">Twitter</a>
          </div>
        </div>
      </div>
      
      {/* Huge subtle background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-bold text-background/5 pointer-events-none select-none whitespace-nowrap z-0">
        ARCHITECT
      </div>
    </footer>
  );
}
