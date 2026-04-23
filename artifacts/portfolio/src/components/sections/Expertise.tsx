import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

type SkillItem = { name: string; level: "Expert" | "Advanced" | "Proficient" };

const skills: { category: string; description: string; items: SkillItem[] }[] = [
  {
    category: "Frontend",
    description: "Membangun antarmuka interaktif dan responsif",
    items: [
      { name: "ReactJS", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "InertiaJS", level: "Advanced" },
      { name: "TailwindCSS", level: "Expert" },
      { name: "HTML5/CSS3", level: "Expert" },
      { name: "JavaScript (ES6+)", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Figma-to-Code", level: "Advanced" },
    ],
  },
  {
    category: "Backend & DB",
    description: "Arsitektur server dan manajemen data",
    items: [
      { name: "Laravel", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
      { name: "REST API", level: "Expert" },
      { name: "PHP", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MongoDB", level: "Proficient" },
    ],
  },
  {
    category: "Tools & CMS",
    description: "Alat pendukung siklus pengembangan",
    items: [
      { name: "Git", level: "Expert" },
      { name: "WordPress", level: "Advanced" },
      { name: "Statamic", level: "Proficient" },
      { name: "Figma", level: "Advanced" },
      { name: "Adobe Premiere Pro", level: "Proficient" },
      { name: "CapCut", level: "Proficient" },
      { name: "Canva", level: "Advanced" },
    ],
  },
  {
    category: "Practices",
    description: "Standar industri dan metodologi",
    items: [
      { name: "Clean Code", level: "Expert" },
      { name: "UX-focused", level: "Advanced" },
      { name: "Unit Testing", level: "Proficient" },
      { name: "SEO Optimization", level: "Advanced" },
      { name: "Team Leadership", level: "Advanced" },
    ],
  },
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
                    
                    <div className="flex flex-wrap gap-2.5">
                      {skillGroup.items.map((item) => {
                        const dots =
                          item.level === "Expert" ? 3 : item.level === "Advanced" ? 2 : 1;
                        return (
                          <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.04, y: -3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 14 }}
                            className="group/chip relative inline-flex items-center gap-2.5 pl-3 pr-3.5 py-2 border border-background/20 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] text-background/80 hover:bg-background hover:text-foreground hover:border-background transition-colors cursor-default"
                          >
                            <span className="flex items-center gap-1" aria-label={`${item.level} level`}>
                              {[0, 1, 2].map((i) => (
                                <span
                                  key={i}
                                  className={`w-1 h-1 rounded-full transition-colors ${
                                    i < dots
                                      ? "bg-primary"
                                      : "bg-background/25 group-hover/chip:bg-foreground/20"
                                  }`}
                                />
                              ))}
                            </span>
                            <span>{item.name}</span>
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2.5 py-1 text-[9px] tracking-[0.15em] rounded opacity-0 group-hover/chip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                              {item.level.toUpperCase()}
                              <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-primary" />
                            </span>
                          </motion.div>
                        );
                      })}
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
