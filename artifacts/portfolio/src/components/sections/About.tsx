import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Linkedin as SiLinkedin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" className="relative bg-card overflow-hidden">
      <SectionHeader number="01" eyebrow="THE PERSONA" title="ABOUT" />

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative" ref={ref}>
        {/* Giant outlined backdrop typography */}
        <div aria-hidden className="pointer-events-none absolute -top-4 right-6 md:right-12 lg:right-24 select-none">
          <span className="font-display font-bold uppercase tracking-tighter text-stroke leading-none text-[18vw] md:text-[14vw] lg:text-[12vw] opacity-[0.07]">
            EJP.
          </span>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[3/4] mx-auto lg:mx-0 overflow-hidden bg-muted group rounded-sm ring-1 ring-border/50 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
          >
            <motion.div style={{ y: imageY, height: "120%", top: "-10%" }} className="absolute inset-0 w-full">
              <img 
                src="/images/portrait.png" 
                alt="Edu Juanda Pratama" 
                className="object-cover w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 ease-out"
              />
            </motion.div>
            <div className="absolute inset-0 bg-foreground/5 pointer-events-none mix-blend-overlay" />

            {/* Always-visible top metadata strip */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                ©EJP / 2026
              </span>
              <span>ID_BDL · 05°25'S</span>
            </div>

            {/* Corner crosshair markers */}
            <span aria-hidden className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40" />
            <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40" />
            <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40" />
            <span aria-hidden className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40" />

            {/* Bottom info card on hover */}
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-background/70 border border-border/30 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-sm">
              <div className="flex items-center justify-between text-foreground">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Subject</span>
                  <span className="font-display text-base font-bold uppercase tracking-tight">Edu Juanda Pratama</span>
                </div>
                <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 rounded-full">FULL STACK</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
                Architecting <br />
                <span className="italic font-serif lowercase text-primary tracking-normal">Clean</span> Digital <br />
                Systems.
              </h3>
              
              <div className="space-y-6 text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans font-light max-w-2xl">
                <p>
                  Sebagai Full Stack Developer, saya membangun aplikasi web dari frontend interaktif hingga arsitektur backend yang kokoh. Fokus utama saya adalah <strong className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary transition-colors">clean code, performa, dan user experience</strong>.
                </p>
                <p>
                  Saya nyaman bekerja secara mandiri maupun berkolaborasi dalam tim, selalu cepat beradaptasi dengan teknologi baru, dan terus mengejar solusi yang efisien dan scalable untuk setiap tantangan teknis.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 pt-12 border-t border-border/50"
            >
              <div className="space-y-4 group">
                <MapPin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border/30 inline-block pb-1">Base</p>
                  <p className="font-display text-xl font-bold mt-2">Bandar Lampung</p>
                </div>
              </div>
              
              <div className="space-y-4 group">
                <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border/30 inline-block pb-1">Email</p>
                  <a href="mailto:yastariskandar@gmail.com" className="flex items-center gap-2 font-display text-xl font-bold mt-2 hover:text-primary transition-colors break-all">
                    yastariskandar@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="space-y-4 group">
                <SiWhatsapp className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border/30 inline-block pb-1">WhatsApp</p>
                  <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" className="font-display text-xl font-bold mt-2 hover:text-primary transition-colors flex items-center gap-2">
                    +62 853 6619 5381
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </a>
                </div>
              </div>

              <div className="space-y-4 group">
                <div className="flex gap-4">
                  <SiLinkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <SiGithub className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1 border-b border-border/30 inline-block pb-1">Socials</p>
                  <div className="flex items-center gap-4 mt-2">
                    <a href="https://www.linkedin.com/in/edu-juanda-pratama-861249297/" target="_blank" rel="noopener noreferrer" className="font-display text-xl font-bold hover:text-primary transition-colors flex items-center gap-1">
                      LinkedIn <ExternalLink className="w-4 h-4 opacity-50" />
                    </a>
                    <a href="https://github.com/yastar123" target="_blank" rel="noopener noreferrer" className="font-display text-xl font-bold hover:text-primary transition-colors flex items-center gap-1">
                      GitHub <ExternalLink className="w-4 h-4 opacity-50" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
