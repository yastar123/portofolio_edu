import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ArrowRight, ArrowUpRight, Mail, Phone, Linkedin as SiLinkedin, Copy, Check, ExternalLink, Calendar, Clock } from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";

function KineticText({ text }: { text: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="overflow-hidden flex flex-wrap justify-center">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%", rotate: 10, opacity: 0 }}
          animate={isInView ? { y: 0, rotate: 0, opacity: 1 } : { y: "100%", rotate: 10, opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.04,
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

function SpotlightContactCard({ children, href, canCopy, onClickCopy }: { children: React.ReactNode, href: string, canCopy?: boolean, onClickCopy?: (e: React.MouseEvent) => void }) {
  const divRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col justify-between p-6 h-[200px] border border-border bg-card rounded-sm overflow-hidden hover:border-primary transition-colors cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.18), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] z-0" />
      
      {children}
    </motion.a>
  );
}

const MAX_MESSAGE = 600;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Pesan terkirim!", {
        description: "Saya akan merespon secepat mungkin.",
        duration: 5000,
      });
      (e.target as HTMLFormElement).reset();
      setMessageLength(0);

      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleCopy = (e: React.MouseEvent, text: string, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast("Disalin ke clipboard", {
      icon: <Check className="w-4 h-4 text-green-500" />,
      description: text,
    });
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const contactLinks = [
    {
      id: "email",
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "yastariskandar@gmail.com",
      copyText: "yastariskandar@gmail.com",
      href: "mailto:yastariskandar@gmail.com",
      canCopy: true
    },
    {
      id: "whatsapp",
      icon: <SiWhatsapp className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+62 853 6619 5381",
      copyText: "+6285366195381",
      href: "https://wa.me/6285366195381",
      canCopy: true
    },
    {
      id: "linkedin",
      icon: <SiLinkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "Edu Juanda Pratama",
      href: "https://www.linkedin.com/in/edu-juanda-pratama-861249297/",
      canCopy: false
    },
    {
      id: "github",
      icon: <SiGithub className="w-6 h-6" />,
      label: "GitHub",
      value: "yastar123",
      href: "https://github.com/yastar123",
      canCopy: false
    }
  ];

  return (
    <section id="contact" className="relative bg-background overflow-hidden pt-24 pb-24 md:pb-32">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-foreground/5 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />

      <SectionHeader number="05" eyebrow="INQUIRIES" title="CONTACT" />

      <div className="px-6 md:px-12 lg:px-24 mt-12 md:mt-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
            <h3 className="font-display text-[clamp(2.5rem,12vw,8rem)] md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter mb-6 flex flex-wrap justify-center">
              <KineticText text="LET'S BUILD" />
              <div className="w-full h-0"></div>
              <span className="text-primary italic font-serif lowercase tracking-normal">
                <KineticText text="something." />
              </span>
            </h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans font-light"
            >
              Tertarik untuk berkolaborasi? Silakan hubungi saya melalui form atau kontak langsung di bawah.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col"
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-border focus:border-transparent outline-none font-display text-2xl md:text-4xl py-4 transition-colors placeholder:text-transparent relative z-10"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 peer-focus:w-full" />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-4 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground pointer-events-none"
                  >
                    Nama Lengkap
                  </label>
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-border focus:border-transparent outline-none font-display text-2xl md:text-4xl py-4 transition-colors placeholder:text-transparent relative z-10"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 peer-focus:w-full" />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-4 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground pointer-events-none"
                  >
                    Alamat Email
                  </label>
                </div>
                
                <div className="relative group">
                  <textarea
                    id="message"
                    required
                    maxLength={MAX_MESSAGE}
                    onChange={(e) => setMessageLength(e.target.value.length)}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-border focus:border-transparent outline-none font-display text-2xl md:text-4xl py-4 min-h-[150px] resize-none transition-colors placeholder:text-transparent relative z-10"
                  />
                  <div className="absolute bottom-[4px] left-0 h-[2px] w-0 bg-primary transition-all duration-500 peer-focus:w-full" />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-4 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-6 peer-valid:text-xs peer-valid:text-foreground pointer-events-none"
                  >
                    Detail Proyek / Pesan
                  </label>
                  <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 tabular-nums">
                    <div className="flex-1 h-[2px] bg-border/60 rounded-full overflow-hidden max-w-[60%]">
                      <motion.div
                        className={`h-full rounded-full origin-left ${
                          messageLength > MAX_MESSAGE * 0.95 ? "bg-red-500" : messageLength > MAX_MESSAGE * 0.85 ? "bg-primary" : "bg-foreground"
                        }`}
                        animate={{ scaleX: messageLength / MAX_MESSAGE }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <span className="flex items-center gap-1">
                      <span className={messageLength > MAX_MESSAGE * 0.85 ? "text-primary" : ""}>
                        {messageLength.toString().padStart(3, "0")}
                      </span>
                      <span className="opacity-50">/ {MAX_MESSAGE}</span>
                    </span>
                  </div>
                </div>

                <MagneticButton className="inline-block w-full md:w-auto" strength={0.3}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn inline-flex items-center justify-between gap-8 py-6 px-12 rounded-full border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative w-full md:w-auto mt-8 shadow-[0_20px_50px_-20px_hsl(var(--foreground)/0.45)]"
                  >
                    <span className="font-mono text-sm uppercase tracking-widest relative z-10 font-bold">
                      {isSubmitting ? 'MENGIRIM...' : isSuccess ? 'TERKIRIM!' : 'KIRIM PESAN'}
                    </span>
                    <span className="relative z-10">
                      {isSuccess ? <Check className="w-5 h-5 text-green-500" /> : <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-primary translate-y-[100%] rounded-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                  </button>
                </MagneticButton>
              </form>

              <div className="mt-8 pt-8 border-t border-border flex items-center gap-3">
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <motion.span 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inline-flex h-full w-full rounded-full bg-primary"
                  ></motion.span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Tersedia untuk proyek freelance & kontrak</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="relative bg-card border border-border p-8 rounded-sm overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
                <div aria-hidden className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Now</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Live</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 relative flex h-3 w-3 items-center justify-center shrink-0">
                      <motion.span
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inline-flex h-full w-full rounded-full bg-green-500"
                      />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </div>
                    <h4 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter leading-[0.9]">
                      Available <br /><span className="text-primary italic font-serif lowercase tracking-normal">for work</span>
                    </h4>
                  </div>

                  <div className="h-[1px] w-full bg-border" />

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Response</p>
                        <p className="font-display text-base font-bold mt-0.5">~ 24 jam · Mon–Sat</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Booking</p>
                        <p className="font-display text-base font-bold mt-0.5">Q3 2026 onwards</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Base · GMT+7</p>
                        <p className="font-display text-base font-bold mt-0.5">Bandar Lampung, ID</p>
                      </div>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-display text-3xl font-bold tabular-nums">15<span className="text-primary">+</span></p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Projects shipped</p>
                    </div>
                    <div>
                      <p className="font-display text-3xl font-bold tabular-nums">3<span className="text-primary">y</span></p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Building on web</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Signature Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactLinks.map((link, index) => (
              <SpotlightContactCard
                href={link.href}
                key={link.id}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {link.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <div className="relative z-10">
                  <p className="font-display text-2xl font-bold uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{link.label}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-muted-foreground truncate pr-2">{link.value}</p>
                    {link.canCopy && (
                      <button 
                        onClick={(e) => handleCopy(e, link.copyText!, link.id)}
                        className="shrink-0 p-1.5 bg-background border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        aria-label={`Copy ${link.label}`}
                      >
                        {copiedField === link.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </SpotlightContactCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
