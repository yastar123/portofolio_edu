import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" className="relative bg-card overflow-hidden">
      {/* Section Divider */}
      <div className="py-6 border-y border-border/50 overflow-hidden flex whitespace-nowrap bg-muted/20">
        <motion.div 
          className="flex gap-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>§ 01 / THE PERSONA</span>
              <span className="w-1 h-1 rounded-full bg-border" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24" ref={ref}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[3/4] mx-auto lg:mx-0 overflow-hidden bg-muted group rounded-sm"
          >
            <motion.div style={{ y: imageY, height: "120%", top: "-10%" }} className="absolute inset-0 w-full">
              <img 
                src="/images/portrait.png" 
                alt="Edu Juanda Pratama" 
                className="object-cover w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 ease-out"
              />
            </motion.div>
            <div className="absolute inset-0 bg-foreground/5 pointer-events-none mix-blend-overlay" />
            
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-background/60 border border-border/30 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-sm">
              <div className="flex items-center justify-between text-foreground">
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">Edu Juanda Pratama</span>
                <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 rounded-full">ID_BDL</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
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
