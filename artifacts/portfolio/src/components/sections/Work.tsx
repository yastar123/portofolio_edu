import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Aura Glass",
    category: "Web3 Protocol Interface",
    year: "2024",
    image: "/images/project-1.png",
    description: "An immersive, hardware-accelerated interface for a decentralized exchange, using custom WebGL shaders to visualize liquidity pools as fluid glass structures.",
    link: "#"
  },
  {
    id: 2,
    title: "Onyx Health",
    category: "Mobile Application",
    year: "2023",
    image: "/images/project-2.png",
    description: "A minimalist health tracking application designed to reduce anxiety around biometric data. Featuring bespoke typographic layouts and micro-interactions.",
    link: "#"
  },
  {
    id: 3,
    title: "Neue Brutalism",
    category: "Typography Exhibition",
    year: "2023",
    image: "/images/project-3.png",
    description: "Digital catalog for a touring typography exhibition. The site uses scroll-linked variable fonts to distort and respond to user movement.",
    link: "#"
  },
  {
    id: 4,
    title: "System 04",
    category: "Data Visualization",
    year: "2022",
    image: "/images/project-4.png",
    description: "A high-density data dashboard for institutional traders. Balancing intense information density with calm, glowing aesthetics and clear hierarchy.",
    link: "#"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div 
      ref={ref}
      className={`relative group flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full md:w-3/5 overflow-hidden bg-muted aspect-[16/9] relative">
        <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%]">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500 pointer-events-none" />
      </div>

      <div className="w-full md:w-2/5 space-y-6">
        <div className="flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          <span>0{project.id}</span>
          <span className="w-8 h-[1px] bg-border"></span>
          <span>{project.year}</span>
        </div>
        
        <h3 className="font-display text-4xl font-bold uppercase tracking-tighter group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-mono text-sm uppercase tracking-widest">{project.category}</span>
          <a href={project.link} className="p-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12"
        >
          <div>
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              02 — Selected Works
            </h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              Archive
            </h3>
          </div>
          <p className="text-lg text-muted-foreground max-w-sm">
            A curated selection of digital platforms, immersive experiences, and engineered interfaces from 2022–Present.
          </p>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
