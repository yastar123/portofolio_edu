import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, MapPin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Linkedin as SiLinkedin } from "lucide-react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatterLocal = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatterBdl = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  });

  return (
    <span>Anda: {formatterLocal.format(time)} / Saya: {formatterBdl.format(time)} GMT+7</span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());

  const ejpRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ejpScroll } = useScroll({
    target: ejpRef,
    offset: ["start end", "end start"],
  });
  const ejpX = useTransform(ejpScroll, [0, 1], ["8%", "-32%"]);

  return (
    <footer className="bg-foreground text-background pt-24 pb-6 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full blur-[120px] opacity-50"
        style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.18), transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <h3 className="font-display text-4xl font-bold uppercase tracking-tighter">Edu Juanda Pratama<span className="text-primary">.</span></h3>
            <p className="font-sans font-light text-background/60 max-w-sm text-lg">
              Building scalable end-to-end web applications with a focus on clean architecture and crafted user experiences.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-background/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-background/80">Available for work — Q2 2026</span>
            </div>
          </div>
          
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-background/40">Navigation</h4>
            <nav className="flex flex-col gap-3 font-display text-xl uppercase tracking-tighter">
              <button onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-primary transition-colors w-fit">Home</button>
              <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-primary transition-colors w-fit">About</button>
              <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-primary transition-colors w-fit">Work</button>
              <button onClick={() => document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-primary transition-colors w-fit">Expertise</button>
              <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-primary transition-colors w-fit">Experience</button>
            </nav>
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-6 lg:items-end">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-background/40">Connect</h4>
            <div className="flex flex-col gap-3 lg:items-end">
              <a href="mailto:yastariskandar@gmail.com" className="font-display text-xl hover:text-primary transition-colors">yastariskandar@gmail.com</a>
              <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" className="font-display text-xl hover:text-primary transition-colors">+62 853 6619 5381</a>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <a href="https://github.com/yastar123" target="_blank" rel="noopener noreferrer" className="p-3 border border-background/20 rounded-full hover:bg-background hover:text-foreground transition-colors" aria-label="GitHub">
                <SiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/edu-juanda-pratama-861249297/" target="_blank" rel="noopener noreferrer" className="p-3 border border-background/20 rounded-full hover:bg-background hover:text-foreground transition-colors" aria-label="LinkedIn">
                <SiLinkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" className="p-3 border border-background/20 rounded-full hover:bg-background hover:text-foreground transition-colors" aria-label="WhatsApp">
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mb-16 w-full overflow-hidden relative" ref={ejpRef}>
          <motion.div
            style={{ x: ejpX }}
            className="flex items-baseline gap-10 whitespace-nowrap will-change-transform"
          >
            <h2 className="text-[clamp(4rem,22vw,18rem)] leading-[0.8] font-display font-bold uppercase tracking-tighter text-background">
              EJP<span className="text-primary">.</span>
            </h2>
            <h2 aria-hidden className="text-[clamp(4rem,22vw,18rem)] leading-[0.8] font-display font-bold uppercase tracking-tighter text-stroke text-transparent">
              EJP<span className="text-primary">.</span>
            </h2>
            <h2 aria-hidden className="text-[clamp(4rem,22vw,18rem)] leading-[0.8] font-display font-bold uppercase tracking-tighter text-background/30">
              EJP<span className="text-primary/40">.</span>
            </h2>
          </motion.div>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-foreground to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-foreground to-transparent" />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-background/20">
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-background/60 flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span>&copy; {currentYear} Edu Juanda Pratama</span>
            <span className="hidden md:inline text-background/20">|</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Crafted in Bandar Lampung</span>
            <span className="hidden md:inline text-background/20">|</span>
            <span>Update Terakhir: {lastUpdated}</span>
          </div>
          
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-background/60 flex items-center gap-4">
            <Clock />
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-background hover:text-primary transition-colors group"
              aria-label="Back to Top"
            >
              Back to top
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
