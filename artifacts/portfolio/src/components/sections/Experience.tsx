import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const experienceData = [
  {
    type: "Pekerjaan",
    items: [
      {
        year: "Jan 2026 — Skrg",
        yearMarker: "2026",
        role: "Web Developer",
        company: "Freelance",
        description: "Merancang & mengembangkan situs responsif. Mengubah desain Figma menjadi halaman web fungsional dengan fokus pada performa, keamanan, dan UX.",
        tags: ["Kontrak", "WFH"]
      },
      {
        year: "Ags — Sep 2024",
        yearMarker: "2024",
        role: "Full Stack Developer",
        company: "PT. Winnicode Garuda Indonesia",
        description: "Membangun portal berita secara end-to-end. Mengelola database PostgreSQL untuk memastikan performa dan keamanan berita.",
        tags: ["Magang", "WFH", "Next.js", "PostgreSQL"]
      },
      {
        year: "Okt 2024 — Mar 2025",
        yearMarker: "2024",
        role: "Co-Head Div. Frontend",
        company: "Candidate College",
        description: "Memimpin divisi Frontend, melakukan code review, optimisasi, dan debugging. Mencapai 90% unit testing coverage dan memastikan target proyek tercapai.",
        tags: ["Magang", "WFH", "Leadership"]
      },
      {
        year: "Mar — Jun 2025",
        yearMarker: "2025",
        role: "Asisten Praktikum (Pengkom 2)",
        company: "Institut Teknologi Sumatera",
        description: "Mengajar dasar pemrograman C++ & Flowgorithm, menyusun soal latihan, dan rekap nilai praktikum.",
        tags: ["Kontrak", "C++"]
      },
      {
        year: "Ags — Des 2024",
        yearMarker: "2024",
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
        yearMarker: "2025",
        role: "Staff Kemen. TI",
        company: "KM ITERA",
        description: "Redesign & develop website KM ITERA menggunakan Laravel, ReactJS, dan InertiaJS untuk integrasi yang efisien.",
        tags: ["Laravel", "InertiaJS"]
      },
      {
        year: "Des 2024 — Skrg",
        yearMarker: "2024",
        role: "Staff Divisi Desain",
        company: "HMTF Aryacitya",
        description: "Membuat konten visual untuk media sosial, editing video, dan desain poster/feed Instagram.",
        tags: ["Media & Informasi", "Canva", "Premiere"]
      },
      {
        year: "Okt — Des 2024",
        yearMarker: "2024",
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
        yearMarker: "2025",
        role: "KaSub Frontend Developer",
        company: "PPLK ITERA 2025",
        description: "Memimpin tim Frontend, memberi arahan teknis, membagi tugas, dan troubleshooting bug untuk website PPLK.",
        tags: ["Leadership", "React"]
      },
      {
        year: "2025",
        yearMarker: "2025",
        role: "Kepala Divisi IMTEK",
        company: "PEMIRA KM 2025",
        description: "Membangun website e-voting untuk pemilihan presiden mahasiswa, berkoordinasi dengan sub-divisi voting & pusat data.",
        tags: ["E-Voting", "Leadership"]
      },
      {
        year: "Jun — Ags 2024",
        yearMarker: "2024",
        role: "Staff Divisi Frontend",
        company: "PPLK ITERA 2024",
        description: "Mentranslasi Figma ke React.js, membuat komponen interaktif, dan integrasi dengan API Laravel.",
        tags: ["Figma-to-Code"]
      },
      {
        year: "2024",
        yearMarker: "2024",
        role: "Staff Divisi Voting",
        company: "PEMIRA KM 2024",
        description: "Mengelola sistem absensi peserta pemilihan presiden mahasiswa via website internal.",
        tags: ["Data"]
      },
      {
        year: "2024",
        yearMarker: "2024",
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
        yearMarker: "2024",
        role: "Ketua Div. Web & WordPress",
        company: "BidanPreneur",
        description: "Memimpin tim untuk kustomisasi tema dan plugin WordPress serta melakukan optimasi SEO platform.",
        tags: ["WordPress", "SEO"]
      },
      {
        year: "Mar — Jun 2024",
        yearMarker: "2024",
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

  const filterCounts = useMemo(() => {
    const total = experienceData.reduce((acc, g) => acc + g.items.length, 0);
    const counts: Record<string, number> = { Semua: total };
    experienceData.forEach((g) => {
      counts[g.type] = g.items.length;
    });
    return counts;
  }, []);
  
  const timelineItems = useMemo(() => {
    return experienceData.flatMap(group => 
      group.items.map(item => ({ ...item, category: group.type }))
    ).filter(item => activeFilter === "Semua" || item.category === activeFilter)
     .sort((a, b) => {
       if (a.year.includes("Skrg") && !b.year.includes("Skrg")) return -1;
       if (!a.year.includes("Skrg") && b.year.includes("Skrg")) return 1;
       // Sort by yearMarker descending
       if (a.yearMarker > b.yearMarker) return -1;
       if (a.yearMarker < b.yearMarker) return 1;
       return 0;
     });
  }, [activeFilter]);

  // Handle sticky year markers
  const [activeYear, setActiveYear] = useState<string>("");
  
  useEffect(() => {
    const handleScroll = () => {
      const itemElements = document.querySelectorAll('.timeline-item');
      let currentYear = "";
      
      itemElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is roughly in the middle of the screen
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          const year = el.getAttribute('data-year');
          if (year) currentYear = year;
        }
      });
      
      if (currentYear && currentYear !== activeYear) {
        setActiveYear(currentYear);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeYear]);

  return (
    <section id="experience" className="relative bg-card">
      <SectionHeader number="04" eyebrow="TIMELINE & HISTORY" title="EXPERIENCE" />

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24 items-start" ref={containerRef}>
          <div className="lg:sticky lg:top-32 space-y-8 z-20">
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
                  <span className={`relative z-10 inline-flex items-center gap-2 transition-colors ${activeFilter === filter ? 'text-background' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {filter}
                    <span className={`tabular-nums text-[9px] opacity-70 ${activeFilter === filter ? 'text-background' : ''}`}>
                      {String(filterCounts[filter] ?? 0).padStart(2, '0')}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            
            {/* Active Year Marker Display (Desktop) */}
            <div className="hidden lg:block pt-8 mt-8 border-t border-border/50">
              <AnimatePresence mode="popLayout">
                {activeYear && (
                  <motion.div 
                    key={activeYear}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)", position: "absolute" }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-7xl font-bold tracking-tighter text-border select-none"
                  >
                    {activeYear}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative pt-8 md:pt-12">
            {/* Scroll-linked vertical rail */}
            <div className="absolute left-[7px] md:left-[15px] top-0 bottom-0 w-[2px] bg-border/40 overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-primary origin-top rounded-full"
                style={{ scaleY, bottom: 0 }}
              />
            </div>
            
            <div className="space-y-8 md:space-y-12">
              <AnimatePresence mode="popLayout">
                {timelineItems.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    key={`${item.role}-${item.company}-${index}`}
                    data-year={item.yearMarker}
                    className="timeline-item relative pl-8 md:pl-16 group"
                  >
                    <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/30 rounded-2xl -mx-4 transition-colors duration-500 pointer-events-none -z-10" />
                    
                    {/* Animated timeline node — concentric */}
                    <div className="absolute left-0 md:left-[9px] top-2 z-10 transform -translate-x-[2px] md:-translate-x-1/2">
                      <span aria-hidden className="absolute inset-0 -m-2 rounded-full border border-primary/0 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span aria-hidden className="absolute inset-0 -m-1 rounded-full border border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                      <div className="relative w-4 h-4 bg-background border-2 border-border rounded-full group-hover:border-primary group-hover:bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pt-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-muted/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground rounded-full border border-border/50 group-hover:border-primary/30 transition-colors">
                          {item.category}
                        </span>
                        <p className="font-mono text-xs md:text-sm text-primary uppercase tracking-widest font-semibold group-hover:scale-105 origin-left transition-transform duration-300">
                          {item.year}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative inline-block mb-2">
                      <h4 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                        {item.role}
                      </h4>
                      <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 ease-[0.76,0,0.24,1]" />
                    </div>
                    
                    <p className="font-serif italic text-muted-foreground text-xl md:text-2xl mb-6">
                      {item.company}
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl font-sans font-light mb-6 group-hover:text-foreground transition-colors">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] md:text-xs font-mono px-3 py-1.5 bg-background border border-border/50 rounded-sm text-muted-foreground uppercase tracking-widest group-hover:border-border transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
