import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";

const experienceData = [
  {
    type: "Pekerjaan",
    items: [
      {
        year: "Jan 2026 — Skrg",
        role: "Web Developer",
        company: "Freelance",
        description: "Merancang & mengembangkan situs responsif. Mengubah desain Figma menjadi halaman web fungsional dengan fokus pada performa, keamanan, dan UX.",
        tags: ["Kontrak", "WFH"]
      },
      {
        year: "Ags — Sep 2024",
        role: "Full Stack Developer",
        company: "PT. Winnicode Garuda Indonesia",
        description: "Membangun portal berita secara end-to-end. Mengelola database PostgreSQL untuk memastikan performa dan keamanan berita.",
        tags: ["Magang", "WFH", "Next.js", "PostgreSQL"]
      },
      {
        year: "Okt 2024 — Mar 2025",
        role: "Co-Head Div. Frontend",
        company: "Candidate College",
        description: "Memimpin divisi Frontend, melakukan code review, optimisasi, dan debugging. Mencapai 90% unit testing coverage dan memastikan target proyek tercapai.",
        tags: ["Magang", "WFH", "Leadership"]
      },
      {
        year: "Mar — Jun 2025",
        role: "Asisten Praktikum (Pengkom 2)",
        company: "Institut Teknologi Sumatera",
        description: "Mengajar dasar pemrograman C++ & Flowgorithm, menyusun soal latihan, dan rekap nilai praktikum.",
        tags: ["Kontrak", "C++"]
      },
      {
        year: "Ags — Des 2024",
        role: "Asisten Praktikum (Pengkom 1)",
        company: "Institut Teknologi Sumatera",
        description: "Membantu dosen, rekap nilai, menyusun soal kuis, serta mengajar Excel & Microsoft Word.",
        tags: ["Kontrak"]
      }
    ]
  },
  {
    type: "Organisasi",
    items: [
      {
        year: "Mar 2025 — Skrg",
        role: "Staff Kemen. TI",
        company: "KM ITERA",
        description: "Redesign & develop website KM ITERA menggunakan Laravel, ReactJS, dan InertiaJS untuk integrasi yang efisien.",
        tags: ["Laravel", "InertiaJS"]
      },
      {
        year: "Des 2024 — Skrg",
        role: "Staff Divisi Desain",
        company: "HMTF Aryacitya",
        description: "Membuat konten visual untuk media sosial, editing video, dan desain poster/feed Instagram.",
        tags: ["Media & Informasi", "Canva", "Premiere"]
      },
      {
        year: "Okt — Des 2024",
        role: "Staff Kemen. TI (Magang)",
        company: "Kabinet KM ITERA",
        description: "Mengembangkan website organisasi dari desain Figma menjadi website responsif dengan Statamic.",
        tags: ["Magang", "Statamic"]
      }
    ]
  },
  {
    type: "Kepanitiaan",
    items: [
      {
        year: "Jun — Ags 2025",
        role: "KaSub Frontend Developer",
        company: "PPLK ITERA 2025",
        description: "Memimpin tim Frontend, memberi arahan teknis, membagi tugas, dan troubleshooting bug untuk website PPLK.",
        tags: ["Leadership", "React"]
      },
      {
        year: "2025",
        role: "Kepala Divisi IMTEK",
        company: "PEMIRA KM 2025",
        description: "Membangun website e-voting untuk pemilihan presiden mahasiswa, berkoordinasi dengan sub-divisi voting & pusat data.",
        tags: ["E-Voting", "Leadership"]
      },
      {
        year: "Jun — Ags 2024",
        role: "Staff Divisi Frontend",
        company: "PPLK ITERA 2024",
        description: "Mentranslasi Figma ke React.js, membuat komponen interaktif, dan integrasi dengan API Laravel.",
        tags: ["Figma-to-Code"]
      },
      {
        year: "2024",
        role: "Staff Divisi Voting",
        company: "PEMIRA KM 2024",
        description: "Mengelola sistem absensi peserta pemilihan presiden mahasiswa via website internal.",
        tags: ["Data"]
      },
      {
        year: "2024",
        role: "Staff Divisi Kreatif",
        company: "First Gathering Teknik Fisika",
        description: "Merancang desain logo 3D untuk acara himpunan.",
        tags: ["3D Design"]
      }
    ]
  },
  {
    type: "Sukarelawan",
    items: [
      {
        year: "Ags 2024 — Skrg",
        role: "Ketua Div. Web & WordPress",
        company: "BidanPreneur",
        description: "Memimpin tim untuk kustomisasi tema dan plugin WordPress serta melakukan optimasi SEO platform.",
        tags: ["WordPress", "SEO"]
      },
      {
        year: "Mar — Jun 2024",
        role: "Frontend Developer",
        company: "Independent Project",
        description: "Membangun UI responsif dengan ReactJS dan TailwindCSS, memastikan kompabilitas cross-browser.",
        tags: ["ReactJS", "Tailwind"]
      }
    ]
  }
];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const filters = ["Semua", "Pekerjaan", "Organisasi", "Kepanitiaan", "Sukarelawan"];
  
  const timelineItems = experienceData.flatMap(group => 
    group.items.map(item => ({ ...item, category: group.type }))
  ).filter(item => activeFilter === "Semua" || item.category === activeFilter)
   .sort((a, b) => {
     if (a.year.includes("Skrg") && !b.year.includes("Skrg")) return -1;
     if (!a.year.includes("Skrg") && b.year.includes("Skrg")) return 1;
     return 0;
   });

  return (
    <section id="experience" className="relative bg-card">
      {/* Section Divider */}
      <div className="py-6 border-y border-border/50 overflow-hidden flex whitespace-nowrap bg-muted/20">
        <motion.div 
          className="flex gap-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>§ 04 / TIMELINE & HISTORY</span>
              <span className="w-1 h-1 rounded-full bg-border" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24 items-start" ref={containerRef}>
          <div className="lg:sticky lg:top-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
                History.
              </h3>
              <p className="text-muted-foreground font-sans font-light max-w-sm">
                Perjalanan karir, kontribusi di organisasi, dan proyek sukarela yang membentuk keahlian saya saat ini.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-full overflow-hidden border border-border/50 transition-colors hover:border-primary/50 group"
                >
                  {activeFilter === filter && (
                    <motion.div 
                      layoutId="filter-bg"
                      className="absolute inset-0 bg-foreground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${activeFilter === filter ? 'text-background' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {filter}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative pt-8 md:pt-12">
            {/* Scroll-linked vertical rail */}
            <div className="absolute left-[7px] md:left-[15px] top-0 bottom-0 w-[1px] bg-border overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-primary origin-top"
                style={{ scaleY, bottom: 0 }}
              />
            </div>
            
            <motion.div layout className="space-y-16 md:space-y-24">
              {timelineItems.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={`${item.role}-${item.company}-${index}`}
                  className="relative pl-8 md:pl-16 group"
                >
                  {/* Animated timeline node */}
                  <div className="absolute left-0 md:left-2 top-2 w-4 h-4 bg-background border border-primary rounded-full group-hover:scale-150 group-hover:bg-primary transition-all duration-500 z-10 ease-[0.76,0,0.24,1]" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-muted/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground rounded-full border border-border/50">
                        {item.category}
                      </span>
                      <p className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest font-semibold">
                        {item.year}
                      </p>
                    </div>
                  </div>
                  
                  <h4 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mt-3 mb-2 group-hover:text-primary transition-colors">
                    {item.role}
                  </h4>
                  
                  <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mb-6">
                    {item.company}
                  </p>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl font-sans font-light mb-6 group-hover:text-foreground transition-colors">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] md:text-xs font-mono px-3 py-1.5 bg-background border border-border/50 rounded-sm text-muted-foreground uppercase tracking-widest">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
