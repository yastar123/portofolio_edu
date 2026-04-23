import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Tilt3D } from "@/components/ui/Tilt3D";

const projects = [
  {
    id: 1,
    title: "Rental PS Website",
    role: "Full Stack Developer",
    tech: ["Web Development", "Booking System", "UI/UX"],
    image: "/images/project-1.png",
    description: "Website rental PlayStation dengan sistem booking online. Fitur lengkap untuk manajemen penyewaan dan tracking unit PS.",
    client: "Rental PS Service",
    link: "https://rental-ps-gray.vercel.app/"
  },
  {
    id: 2,
    title: "Ayam Geprek Website",
    role: "Web Developer",
    tech: ["Frontend", "Food Ordering", "Responsive Design"],
    image: "/images/project-2.png",
    description: "Website restoran ayam geprek dengan menu interaktif dan sistem pesan antar online.",
    client: "Ayam Geprek Restaurant",
    link: "https://ayam-geprek-theta.vercel.app/"
  },
  {
    id: 3,
    title: "Barbershop Website",
    role: "Frontend Developer",
    tech: ["Booking System", "Service Display", "Mobile First"],
    image: "/images/project-3.png",
    description: "Platform booking untuk barbershop dengan sistem janji temu dan galeri hasil kerja.",
    client: "Local Barbershop",
    link: "https://babershop-eight.vercel.app/"
  },
  {
    id: 4,
    title: "PT SEIIKI Corporate Website",
    role: "Full Stack Developer",
    tech: ["Corporate Web", "CMS", "Professional Design"],
    image: "/images/project-4.png",
    description: "Website corporate profesional untuk PT SEIIIKI dengan fitur company profile dan layanan lengkap.",
    client: "PT SEIIKI",
    link: "https://seyiki.com/"
  },
  {
    id: 5,
    title: "EPIC 2026 Conference",
    role: "Web Developer",
    tech: ["Event Platform", "Registration", "Academic Portal"],
    image: "/images/project-5.png",
    description: "Website konferensi internasional Engineering Physics dengan sistem registrasi dan informasi acara.",
    client: "EPIC 2026 Committee",
    link: "http://epic.itera.ac.id/"
  },
  {
    id: 6,
    title: "SEIIKI Survey System",
    role: "Full Stack Developer",
    tech: ["Survey Platform", "Data Analytics", "Form Builder"],
    image: "/images/project-6.png",
    description: "Platform survei online untuk PT SEIIIKI dengan dashboard analitik dan reporting real-time.",
    client: "PT SEIIKI",
    link: "https://survei.seyiki.com/"
  },
  {
    id: 7,
    title: "SEIIKI Document Management",
    role: "Backend Developer",
    tech: ["Document System", "File Management", "Security"],
    image: "/images/project-7.png",
    description: "Sistem penyimpanan dan management dokumen untuk PT SEIIIKI dengan kontrol akses yang aman.",
    client: "PT SEIIKI",
    link: "http://docs.seyiki.com/"
  },
  {
    id: 8,
    title: "KM-ITERA Platform",
    role: "Full Stack Developer",
    tech: ["Community Platform", "Student Portal", "Integration"],
    image: "/images/project-8.png",
    description: "Platform komunitas mahasiswa ITERA dengan berbagai fitur organisasi dan kegiatan kemahasiswaan.",
    client: "KM ITERA",
    link: "https://www.km-itera.com/"
  },
  {
    id: 9,
    title: "Candidate College Platform",
    role: "Full Stack Developer",
    tech: ["Education Platform", "Learning Management", "Student Portal"],
    image: "/images/project-9.png",
    description: "Platform edukasi untuk persiapan kuliah dengan materi pembelajaran dan tes online.",
    client: "Candidate College",
    link: "https://candidate-college.vercel.app/"
  },
  {
    id: 10,
    title: "PPLK ITERA 2025",
    role: "Frontend Lead",
    tech: ["Event Platform", "Student Orientation", "React.js"],
    image: "/images/project-10.png",
    description: "Website orientasi mahasiswa baru ITERA 2025 dengan informasi lengkap dan registrasi online.",
    client: "PPLK ITERA 2025",
    link: "http://pplkitera.com/"
  },
  {
    id: 11,
    title: "PPLK ITERA 2024",
    role: "Frontend Developer",
    tech: ["Event Website", "Registration System", "Mobile Responsive"],
    image: "/images/project-11.png",
    description: "Platform orientasi mahasiswa baru ITERA 2024 dengan sistem registrasi dan jadwal kegiatan.",
    client: "PPLK ITERA 2024",
    link: "http://pplkitera.com/"
  },
  {
    id: 12,
    title: "IoT Monitoring System",
    role: "IoT Developer",
    tech: ["IoT Platform", "Device Control", "Real-time Monitoring"],
    image: "/images/project-12.png",
    description: "Sistem monitoring dan kontrol lampu serta AC untuk UNILA menggunakan teknologi IoT.",
    client: "Universitas Lampung",
    link: "https://iot.seyiki.com/login"
  },
  {
    id: 13,
    title: "Webcipta Agency",
    role: "Full Stack Developer",
    tech: ["Agency Website", "Service Portfolio", "Contact System"],
    image: "/images/project-13.png",
    description: "Website agency untuk jasa pembuatan website dan aplikasi dengan portfolio lengkap.",
    client: "Webcipta Agency",
    link: "https://web-cipta1.vercel.app/"
  },
  {
    id: 14,
    title: "PEMIRA KM E-Voting",
    role: "System Developer",
    tech: ["E-Voting System", "Security", "Real-time Results"],
    image: "/images/project-14.png",
    description: "Sistem e-voting untuk pemilihan presiden mahasiswa ITERA 2026 dengan keamanan tinggi.",
    client: "PEMIRA KM ITERA",
    link: "https://pemira-km-itera.my.id/"
  },
  {
    id: 15,
    title: "Travel WhatsApp Integration",
    role: "Web Developer",
    tech: ["WhatsApp API", "Booking System", "Tourism"],
    image: "/images/project-15.png",
    description: "Website travel dengan integrasi langsung ke WhatsApp untuk konsultasi dan pemesanan.",
    client: "Travel Agency",
    link: "#"
  },
  {
    id: 16,
    title: "Connect Printing Coupon",
    role: "Full Stack Developer",
    tech: ["Coupon System", "Validation", "Printing Service"],
    image: "/images/project-16.png",
    description: "Sistem validasi kupon untuk layanan printing dengan tracking dan management promo.",
    client: "Connect Printing",
    link: "https://connectprinting.online/"
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
    return scrollYProgress.on("change", (latest) => {
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

      {/* Unified Sticky Scroll Layout — mobile + desktop */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-[100dvh] flex items-center overflow-hidden">
          
          {/* Progress Rail + Jump Dots */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-4">
            <div className="relative w-[2px] h-[300px] bg-border/50 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary origin-top"
                style={{ scaleY: progressSpring, height: "100%" }}
              />
            </div>
            <ul className="flex flex-col gap-3">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      const el = containerRef.current;
                      if (!el) return;
                      const start = el.offsetTop;
                      const segment = el.offsetHeight / projects.length;
                      window.scrollTo({ top: start + segment * i + segment * 0.1, behavior: "smooth" });
                    }}
                    aria-label={`Lihat proyek ${p.title}`}
                    className="group relative flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className={`font-mono text-[10px] tabular-nums uppercase tracking-widest transition-all duration-300 ${
                        activeIndex === i ? "text-foreground opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                      }`}
                    >
                      0{p.id}
                    </span>
                    <span
                      className={`block h-[1px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                        activeIndex === i ? "w-8 bg-primary" : "w-3 bg-border group-hover:w-5 group-hover:bg-foreground"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-24 items-center">

              {/* Text Side */}
              <div className="lg:col-span-5 relative w-full min-h-0 lg:min-h-[560px] flex items-start lg:items-center pb-10 lg:pb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex flex-col justify-center gap-4 sm:gap-5 lg:gap-7"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground relative">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute -bottom-2 left-0 h-[2px] bg-primary w-8 origin-left"
                      />
                      <span className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-none">0{activeProject.id}</span>
                      <span className="w-8 sm:w-12 h-[1px] bg-border ml-1 sm:ml-2"></span>
                      <span className="text-primary truncate">{activeProject.role}</span>
                    </div>

                    <div className="space-y-2 sm:space-y-3 relative">
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 bg-primary/20"
                        />
                      </div>
                      <p className="font-serif italic text-base sm:text-lg lg:text-xl text-muted-foreground relative">{activeProject.client}</p>
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold uppercase tracking-tighter leading-[1] relative pb-1">
                        {activeProject.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base lg:text-base xl:text-lg text-muted-foreground leading-relaxed font-sans font-light max-w-md line-clamp-3 sm:line-clamp-none">
                      {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {activeProject.tech.map(t => (
                        <span key={t} className="px-2 sm:px-3 py-1 bg-muted/50 border border-border text-muted-foreground font-mono text-[9px] sm:text-[10px] uppercase tracking-wider rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-1 sm:pt-2 flex items-center gap-4 sm:gap-6 flex-wrap">
                      <MagneticButton strength={0.4}>
                        <a href={activeProject.link} className="inline-flex items-center gap-3 group/link">
                          <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-border flex items-center justify-center group-hover/link:bg-foreground group-hover/link:text-background group-hover/link:border-foreground transition-all duration-300 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]">
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:rotate-45 transition-transform duration-300" />
                          </span>
                          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold group-hover/link:translate-x-2 transition-transform duration-300">View Case</span>
                        </a>
                      </MagneticButton>
                      <a href={activeProject.link} className="hidden sm:inline-flex items-center gap-2 group/link text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress indicator (mobile + desktop) */}
                <div className="absolute -top-6 lg:top-auto lg:bottom-2 left-0 right-0 lg:right-auto flex justify-between lg:justify-start gap-4 items-center">
                  <div className="flex gap-1 font-mono text-[10px] text-muted-foreground items-center">
                    <span className="text-foreground font-bold text-sm">0{activeIndex + 1}</span>
                    <span className="opacity-50 mx-1">/</span>
                    <span className="opacity-50">0{projects.length}</span>
                  </div>
                  {activeIndex < projects.length - 1 && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                      <span className="w-6 sm:w-8 h-[1px] bg-border"></span>
                      <span>Scroll</span>
                      <ArrowDown className="w-3 h-3 animate-bounce" />
                    </div>
                  )}
                </div>

                {/* Mobile inline progress bar */}
                <div className="lg:hidden absolute -top-2 left-0 right-0 h-[2px] bg-border/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary origin-left"
                    style={{ scaleX: progressSpring }}
                  />
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:col-span-7 relative w-full h-[38vh] sm:h-[42vh] lg:h-[600px] flex items-center justify-end">
                {/* Giant stroke project number — sits behind image, slides in on change */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`num-${activeProject.id}`}
                    aria-hidden
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -30, position: "absolute" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden lg:block pointer-events-none absolute -left-12 top-1/2 -translate-y-1/2 font-display font-bold tracking-tighter text-stroke text-transparent select-none leading-none text-[18rem] xl:text-[22rem] z-0 opacity-90"
                  >
                    {String(activeProject.id).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <Tilt3D max={6} scale={1.012} className="w-full z-10">
                <a
                  href={activeProject.link}
                  className="w-full aspect-[4/3] relative rounded-sm overflow-hidden bg-muted block group ring-1 ring-border/40 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                  data-cursor="view"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        loading={activeProject.id === 1 ? "eager" : "lazy"}
                        className="w-full h-full object-cover grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom gradient + meta on hover */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="pointer-events-none absolute left-6 right-6 bottom-6 flex items-end justify-between text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Open Case Study</span>
                      <span className="font-display text-2xl font-bold uppercase tracking-tight">{activeProject.client}</span>
                    </div>
                    <span className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Corner crosshair markers */}
                  <span aria-hidden className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40" />
                  <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40" />
                  <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40" />
                  <span aria-hidden className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40" />
                </a>
                </Tilt3D>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
