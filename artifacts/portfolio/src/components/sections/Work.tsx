import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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

function ProjectItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="h-screen flex items-center sticky top-0">
      <div className="w-full grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            <span>0{project.id}</span>
            <span className="w-12 h-[1px] bg-border"></span>
            <span className="text-primary">{project.role}</span>
          </div>
          
          <div className="space-y-4">
            <p className="font-serif italic text-xl text-muted-foreground">{project.client}</p>
            <h3 className="font-display text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">
              {project.title}
            </h3>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed font-sans font-light max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 border border-border/50 text-foreground font-mono text-[10px] uppercase tracking-wider rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-8">
            <a href={project.link} className="inline-flex items-center gap-4 group/link">
              <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover/link:bg-foreground group-hover/link:text-background group-hover/link:border-foreground transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover/link:rotate-45 transition-transform duration-300" />
              </span>
              <span className="font-mono text-sm uppercase tracking-widest font-semibold group-hover/link:translate-x-2 transition-transform duration-300">View Case</span>
            </a>
          </div>
        </div>

        {/* Image Content */}
        <motion.div 
          style={{ scale }}
          className="lg:col-span-7 relative group order-1 lg:order-2"
          data-cursor="view"
        >
          <div className="overflow-hidden bg-muted aspect-[4/3] lg:aspect-[3/4] rounded-sm relative">
            <motion.div style={{ y: smoothY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-1000 ease-[0.16,1,0.3,1] grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-[1.05]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-background/10 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="work" ref={containerRef} className="relative bg-background">
      {/* Section Divider */}
      <div className="py-6 border-y border-border/50 overflow-hidden flex whitespace-nowrap bg-muted/20">
        <motion.div 
          className="flex gap-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>§ 02 / SELECTED WORKS</span>
              <span className="w-1 h-1 rounded-full bg-border" />
            </span>
          ))}
        </motion.div>
      </div>

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
              <h3 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter">
                Archive.
              </h3>
            </div>
            <p className="text-lg text-muted-foreground max-w-sm font-sans font-light pb-2">
              Kumpulan studi kasus proyek terpilih. Dari platform e-voting skala kampus hingga portal berita komersial.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Pinned Projects Container */}
      <div className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto relative">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
