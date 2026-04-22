import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

function Counter({ end, label }: { end: number, label: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === duration ? 1 : 1 - Math.pow(2, -10 * progress / duration);
      
      if (progress < duration) {
        setCount(Math.floor(end * easeProgress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end]);

  return (
    <div className="flex flex-col gap-2">
      <span className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-background">
        {count}+
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-background/60">
        {label}
      </span>
    </div>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                03 // Stack
              </h2>
              <div className="h-[1px] w-12 bg-background/20" />
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-background max-w-2xl">
              Technical <br /> <span className="italic font-serif lowercase text-primary tracking-normal">Capabilities</span>.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-6"
              >
                <div className="border-b border-background/20 pb-4">
                  <h4 className="text-xl font-display font-bold uppercase tracking-tight text-background mb-2">
                    {skillGroup.category}
                  </h4>
                  <p className="text-sm font-sans font-light text-background/60">
                    {skillGroup.description}
                  </p>
                </div>
                
                <ul className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <li 
                      key={item} 
                      className="px-3 py-1.5 border border-background/20 rounded-sm font-mono text-[11px] uppercase tracking-wider text-background/80 hover:bg-background hover:text-foreground hover:border-background transition-colors cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Proof / Stats Strip */}
      <div className="mt-24 md:mt-32 border-y border-background/10 bg-background/5">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter end={10} label="Proyek Diselesaikan" />
            <Counter end={5} label="Organisasi & Panitia" />
            <Counter end={90} label="% Unit Test Cov." />
            <Counter end={3} label="Tahun Pengalaman" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
