import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, Linkedin, Copy, Check } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Pesan terkirim!", {
        description: "Saya akan merespon secepat mungkin.",
        duration: 5000,
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const handleCopy = (text: string, field: string) => {
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
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "yastariskandar@gmail.com",
      copyText: "yastariskandar@gmail.com"
    },
    {
      id: "phone",
      icon: <Phone className="w-5 h-5" />,
      label: "WhatsApp",
      value: "+62 853 6619 5381",
      copyText: "+6285366195381",
      href: "https://wa.me/6285366195381"
    },
    {
      id: "linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "Edu Juanda Pratama",
      copyText: "https://www.linkedin.com/in/edu-juanda-pratama-861249297/",
      href: "https://www.linkedin.com/in/edu-juanda-pratama-861249297/"
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto border border-border p-8 md:p-16 lg:p-24 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                05 // Inquiries
              </h2>
              <div className="h-[1px] w-12 bg-border" />
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
              Mari <span className="italic font-serif lowercase text-primary tracking-normal">Berdiskusi</span>.
            </h3>
            <p className="text-xl text-muted-foreground mb-12 max-w-md font-sans font-light">
              Tertarik untuk membangun sesuatu bersama? Silakan hubungi saya melalui form atau kontak di bawah.
            </p>
            
            <div className="space-y-4 mt-auto">
              {contactLinks.map((link) => (
                <div key={link.id} className="group flex items-center justify-between p-4 border border-border bg-muted/30 hover:border-primary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-background flex items-center justify-center border border-border text-muted-foreground group-hover:text-primary transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">{link.label}</p>
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline">
                          {link.value}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{link.value}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(link.copyText, link.id)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Copy ${link.label}`}
                  >
                    {copiedField === link.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col justify-end bg-card p-8 border border-border"
          >
            <div className="space-y-2 border-b border-border focus-within:border-primary transition-colors pb-2">
              <label htmlFor="name" className="sr-only">Nama</label>
              <input 
                type="text" 
                id="name" 
                required
                placeholder="NAMA LENGKAP"
                className="w-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground/50 py-2"
              />
            </div>
            
            <div className="space-y-2 border-b border-border focus-within:border-primary transition-colors pb-2">
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                placeholder="ALAMAT EMAIL"
                className="w-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground/50 py-2"
              />
            </div>
            
            <div className="space-y-2 border-b border-border focus-within:border-primary transition-colors pb-2 h-32">
              <label htmlFor="message" className="sr-only">Pesan</label>
              <textarea 
                id="message" 
                required
                placeholder="DETAIL PROYEK ATAU PESAN"
                className="w-full h-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground/50 resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group/btn flex items-center justify-between w-full py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            >
              <span className="font-mono text-sm uppercase tracking-widest px-6 relative z-10">
                {isSubmitting ? 'MENGIRIM...' : 'KIRIM PESAN'}
              </span>
              <span className="px-6 border-l border-background group-hover/btn:border-foreground transition-colors relative z-10 h-full flex items-center">
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
