import { motion } from "framer-motion";
import { useState } from "react";

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
  
  const filters = ["Semua", "Pekerjaan", "Organisasi", "Kepanitiaan", "Sukarelawan"];
  
  // Flatten and filter timeline items
  const timelineItems = experienceData.flatMap(group => 
    group.items.map(item => ({ ...item, category: group.type }))
  ).filter(item => activeFilter === "Semua" || item.category === activeFilter)
   .sort((a, b) => {
     // A very simple sort to keep 'Skrg' items at top, otherwise mostly keeping original order
     if (a.year.includes("Skrg") && !b.year.includes("Skrg")) return -1;
     if (!a.year.includes("Skrg") && b.year.includes("Skrg")) return 1;
     return 0;
   });

  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card border-t border-border relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                04 // History
              </h2>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <h3 className="font-display text-5xl font-bold uppercase tracking-tighter mb-6">
              Timeline.
            </h3>
            <p className="text-muted-foreground font-sans font-light">
              Perjalanan karir, kontribusi di organisasi, dan proyek sukarela yang membentuk keahlian saya saat ini.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-full border transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Vertical line connecting timeline */}
          <div className="absolute left-[7px] md:left-[15px] top-0 bottom-0 w-[1px] bg-border" />
          
          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              <motion.div
                key={`${item.role}-${item.company}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-2 top-2 w-4 h-4 bg-background border-2 border-primary rounded-full group-hover:scale-150 group-hover:bg-primary transition-all duration-300 z-10" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-muted text-[10px] font-mono uppercase tracking-widest text-muted-foreground rounded-sm border border-border">
                      {item.category}
                    </span>
                    <p className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                      {item.year}
                    </p>
                  </div>
                </div>
                
                <h4 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mt-3 mb-1 group-hover:text-primary transition-colors">
                  {item.role}
                </h4>
                
                <p className="font-serif italic text-muted-foreground text-lg mb-4">
                  {item.company}
                </p>
                
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-sans font-light mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 bg-background border border-border/50 rounded-sm text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
