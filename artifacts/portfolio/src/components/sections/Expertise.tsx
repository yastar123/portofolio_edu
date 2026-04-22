import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const skills = [
  {
    category: "Frontend",
    description: "Membangun antarmuka interaktif dan responsif",
    items: ["ReactJS", "Next.js", "InertiaJS", "TailwindCSS", "HTML5/CSS3", "JavaScript (ES6+)", "TypeScript", "Figma-to-Code"]
  },
  {
    category: "Backend & DB",
    description: "Arsitektur server dan manajemen data",
    items: ["Laravel", "Node.js", "REST API", "PHP", "MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    category: "Tools & CMS",
    description: "Alat pendukung siklus pengembangan",
    items: ["Git", "WordPress", "Statamic", "Figma", "Adobe Premiere Pro", "CapCut", "Canva"]
  },
  {
    category: "Practices",
    description: "Standar industri dan metodologi",
    items: ["Clean Code", "UX-focused", "Unit Testing", "SEO Optimization", "Team Leadership"]
  }
];

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary), 0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

function Counter({ end, label }: { end: number, label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // easeOutBack with slight overshoot
      const easeProgress = progress === duration ? 1 : 1 + 2.70158 * Math.pow(progress/duration - 1, 3) + 1.70158 * Math.pow(progress/duration - 1, 2);
      const clampedProgress = Math.max(0, Math.min(1, easeProgress));
      
      if (progress < duration) {
        setCount(Math.floor(end * clampedProgress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, isInView]);

  return (
    <div ref={ref} className="flex flex-col gap-2 relative group">
      <motion.span 
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-background group-hover:text-primary transition-colors duration-500"
      >
        {count}+
      </motion.span>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-mono text-xs md:text-sm uppercase tracking-widest text-background/60 border-t border-background/20 pt-4"
      >
        {label}
      </motion.span>
    </div>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" className="relative bg-foreground text-background overflow-hidden">
      
      <SectionHeader number="03" eyebrow="TECHNICAL CAPABILITIES" title="EXPERTISE" />

      {/* Decorative background element */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3" />
      
      <div className="px-6 md:px-12 lg:px-24 pt-32 pb-24 md:pt-48 md:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:mb-32"
          >
            <h3 className="font-display text-[10vw] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter text-background max-w-4xl">
              Technical <br /> <span className="italic font-serif lowercase text-primary tracking-normal">Capabilities</span>.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="p-8 rounded-2xl border border-background/10 bg-background/5 h-full">
                  <div className="space-y-8 relative z-10">
                    <div className="border-b border-background/20 pb-4 flex justify-between items-end">
                      <h4 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-background">
                        {skillGroup.category}
                      </h4>
                      <span className="font-mono text-sm text-primary">0{index + 1}</span>
                    </div>
                    
                    <p className="text-lg font-sans font-light text-background/60">
                      {skillGroup.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((item, i) => (
                        <motion.div 
                          key={item} 
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="px-4 py-2.5 border border-background/20 rounded-full font-mono text-xs uppercase tracking-widest text-background/80 hover:bg-background hover:text-foreground hover:border-background transition-colors cursor-default relative group"
                        >
                          {item}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Experienced
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-primary" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Proof / Stats Strip */}
      <div className="border-t border-background/10 bg-background/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
            <Counter end={10} label="Proyek Selesai" />
            <Counter end={5} label="Organisasi" />
            <Counter end={90} label="% Test Coverage" />
            <Counter end={3} label="Tahun Exp." />
          </div>
        </div>
      </div>
    </section>
  );
}
