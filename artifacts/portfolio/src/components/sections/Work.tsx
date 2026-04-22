import { motion, useScroll, useTransform } from "framer-motion";
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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`relative group flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full lg:w-3/5 overflow-hidden bg-muted aspect-[16/9] lg:aspect-[4/3] relative rounded-sm">
        <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
        
        {/* Overlay tech stack tags */}
        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 bg-background/90 backdrop-blur-md text-foreground font-mono text-[10px] uppercase tracking-wider rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-2/5 space-y-8 py-8">
        <div className="flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          <span>0{project.id}</span>
          <span className="w-12 h-[1px] bg-border"></span>
          <span className="text-primary">{project.role}</span>
        </div>
        
        <div className="space-y-4">
          <p className="font-serif italic text-xl text-muted-foreground">{project.client}</p>
          <h3 className="font-display text-4xl lg:text-5xl font-bold uppercase tracking-tighter group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed font-sans font-light">
          {project.description}
        </p>

        <div className="pt-8 border-t border-border">
          <a href={project.link} className="inline-flex items-center gap-4 group/link">
            <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover/link:bg-foreground group-hover/link:text-background group-hover/link:border-foreground transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 group-hover/link:rotate-45 transition-transform duration-300" />
            </span>
            <span className="font-mono text-sm uppercase tracking-widest font-semibold group-hover/link:translate-x-2 transition-transform duration-300">View Project</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                02 // Selected Works
              </h2>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              Archive.
            </h3>
          </div>
          <p className="text-lg text-muted-foreground max-w-sm font-sans font-light">
            Kumpulan studi kasus proyek terpilih. Dari platform e-voting skala kampus hingga portal berita komersial.
          </p>
        </motion.div>

        <div className="space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
