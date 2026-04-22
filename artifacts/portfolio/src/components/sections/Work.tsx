import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const projects = [
  {
    id: 1,
    title: "Winnicode News Portal",
    role: "Full Stack Developer",
    tech: ["Next.js", "PostgreSQL", "TailwindCSS"],
    image: "/images/project-1.png",
    description: "Portal berita interaktif dengan sistem manajemen data yang tangguh. Pengembangan end-to-end dengan fokus pada performa dan keamanan data berita.",
    client: "PT. Winnicode Garuda Indonesia",
    link: "#"
  },
  {
    id: 2,
    title: "KM ITERA Web Platform",
    role: "Staff IT Ministry",
    tech: ["Laravel", "ReactJS", "InertiaJS"],
    image: "/images/project-6.png",
    description: "Redesign dan pengembangan ulang platform website untuk Keluarga Mahasiswa ITERA. Mengintegrasikan frontend dan backend secara efisien menggunakan InertiaJS.",
    client: "Kabinet KM ITERA",
    link: "#"
  },
  {
    id: 3,
    title: "PPLK ITERA 2025",
    role: "KaSub Frontend",
    tech: ["React.js", "Laravel API", "Figma"],
    image: "/images/project-3.png",
    description: "Memimpin tim frontend untuk website kegiatan orientasi mahasiswa baru. Mengarahkan integrasi teknis dan memastikan interaktivitas komponen berjalan lancar.",
    client: "PPLK ITERA",
    link: "#"
  },
  {
    id: 4,
    title: "PEMIRA KM E-Voting",
    role: "Head of IMTEK",
    tech: ["Web Tech", "Security", "Database"],
    image: "/images/project-4.png",
    description: "Sistem e-voting aman untuk pemilihan presiden mahasiswa. Mengkoordinasikan sub-divisi voting dan pusat data untuk memastikan integritas pemilihan.",
    client: "PEMIRA KM ITERA",
    link: "#"
  },
  {
    id: 5,
    title: "BidanPreneur",
    role: "Head of Web / Dev",
    tech: ["WordPress", "SEO", "Custom Themes"],
    image: "/images/project-5.png",
    description: "Platform komunitas untuk bidan entrepreneur. Melakukan optimasi SEO dan kustomisasi tema/plugin untuk mendukung pertumbuhan organik.",
    client: "BidanPreneur",
    link: "#"
  }
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.min(
        Math.floor(latest * projects.length),
        projects.length - 1
      );
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  const activeProject = projects[activeIndex];

  return (
    <section id="work" className="relative bg-background">
      <SectionHeader number="02" eyebrow="SELECTED WORKS" title="WORK" />

      <div className="px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          >
            <div>
              <h3 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter">
                Archive.
              </h3>
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-sm font-sans font-light pb-2">
              Kumpulan studi kasus proyek terpilih. Dari platform e-voting skala kampus hingga portal berita komersial.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Stacked Layout (<1024px) */}
      <div className="block lg:hidden px-6 md:px-12 pb-24 space-y-24">
        {projects.map((project, i) => (
          <div key={project.id} className="flex flex-col gap-8">
            <div className="overflow-hidden bg-muted aspect-[4/3] md:aspect-video rounded-sm relative group">
              <img 
                src={project.image} 
                alt={project.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-primary font-bold text-lg">0{project.id}</span>
                <span className="w-12 h-[1px] bg-border"></span>
                <span className="text-primary">{project.role}</span>
              </div>
              <div>
                <p className="font-serif italic text-lg text-muted-foreground">{project.client}</p>
                <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-tight mt-2">
                  {project.title}
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 bg-muted/50 border border-border text-muted-foreground font-mono text-[10px] uppercase tracking-wider rounded-md">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a href={project.link} className="inline-flex items-center justify-between gap-4 group/link w-full sm:w-auto px-6 py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors rounded-sm font-mono text-xs uppercase tracking-widest font-semibold">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Sticky Layout (>=1024px) */}
      <div 
        ref={containerRef} 
        className="hidden lg:block relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Progress Rail */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[2px] h-[400px] bg-border/50 z-20 hidden xl:block rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary origin-top"
              style={{ scaleY: progressSpring, height: "100%" }}
            />
          </div>

          <div className="w-full px-24">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 lg:gap-24 items-center">
              
              {/* Text Side */}
              <div className="col-span-5 relative h-[500px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col justify-center space-y-8"
                  >
                    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground relative">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute -bottom-2 left-0 h-[2px] bg-primary w-8 origin-left"
                      />
                      <span className="text-3xl font-display font-bold text-foreground leading-none">0{activeProject.id}</span>
                      <span className="w-12 h-[1px] bg-border ml-2"></span>
                      <span className="text-primary">{activeProject.role}</span>
                    </div>
                    
                    <div className="space-y-4 relative overflow-hidden">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary/20 z-10"
                      />
                      <p className="font-serif italic text-xl text-muted-foreground">{activeProject.client}</p>
                      <h3 className="font-display text-5xl xl:text-6xl font-bold uppercase tracking-tighter leading-[0.9]">
                        {activeProject.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed font-sans font-light max-w-md">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeProject.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-muted/50 border border-border text-muted-foreground font-mono text-[10px] uppercase tracking-wider rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 flex items-center gap-6">
                      <a href={activeProject.link} className="inline-flex items-center gap-3 group/link">
                        <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover/link:bg-foreground group-hover/link:text-background group-hover/link:border-foreground transition-all duration-300">
                          <ArrowUpRight className="w-5 h-5 group-hover/link:rotate-45 transition-transform duration-300" />
                        </span>
                        <span className="font-mono text-sm uppercase tracking-widest font-semibold group-hover/link:translate-x-2 transition-transform duration-300">View Case</span>
                      </a>
                      <a href={activeProject.link} className="inline-flex items-center gap-2 group/link text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 flex gap-4 items-center">
                  <div className="flex gap-1 font-mono text-[10px] text-muted-foreground items-center">
                    <span className="text-foreground font-bold text-sm">0{activeIndex + 1}</span>
                    <span className="opacity-50 mx-1">/</span>
                    <span className="opacity-50">0{projects.length}</span>
                  </div>
                  {activeIndex < projects.length - 1 && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                      <span className="w-8 h-[1px] bg-border"></span>
                      <span>Scroll</span>
                      <ArrowDown className="w-3 h-3 animate-bounce" />
                    </div>
                  )}
                </div>
              </div>

              {/* Image Side */}
              <div className="col-span-7 relative h-[600px] flex items-center justify-end">
                <div className="w-full aspect-[4/3] relative rounded-sm overflow-hidden bg-muted" data-cursor="view">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full group"
                    >
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title}
                        loading={activeProject.id === 1 ? "eager" : "lazy"}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-background/5 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
