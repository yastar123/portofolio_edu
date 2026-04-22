import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/5] mx-auto lg:mx-0 overflow-hidden bg-muted group"
        >
          <img 
            src="/images/portrait.png" 
            alt="Edu Juanda Pratama" 
            className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-foreground/5 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
          <div className="absolute inset-0 border border-border pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-background/80 border border-border/50 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest">Edu Juanda Pratama</span>
              <span className="font-mono text-xs text-primary">ID_Bdl</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                01 // The Persona
              </h2>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[1.1]">
              Architecting <span className="italic font-serif lowercase text-primary tracking-normal">Clean</span> <br /> Digital Systems.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-sans font-light">
              <p>
                Sebagai Full Stack Developer, saya membangun aplikasi web dari frontend interaktif hingga arsitektur backend yang kokoh. Fokus utama saya adalah <strong className="font-medium text-foreground">clean code, performa, dan user experience</strong>.
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
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-border"
          >
            <div className="space-y-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Base</p>
                <p className="font-medium text-foreground">Bandar Lampung</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Contact</p>
                <a href="mailto:yastariskandar@gmail.com" className="font-medium text-foreground hover:text-primary transition-colors break-all">yastariskandar@...</a>
              </div>
            </div>
            
            <div className="space-y-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Phone</p>
                <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  +62 853 6619 5381
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
