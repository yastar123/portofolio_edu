import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry sent successfully", {
        description: "I'll get back to you within 24-48 hours.",
        duration: 5000,
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto border border-border p-8 md:p-16 lg:p-24 relative overflow-hidden group">
        {/* Subtle background noise/texture effect could go here */}
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              05 — Inquiries
            </h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
              Let's <span className="italic font-serif lowercase text-primary tracking-normal">Build</span>.
            </h3>
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Currently accepting select freelance opportunities for Q3 2024. Reach out to discuss your next project.
            </p>
            
            <div className="space-y-6 font-mono text-sm uppercase tracking-widest">
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <a href="mailto:hello@eliasvance.com" className="hover:text-primary transition-colors text-lg">
                  hello@eliasvance.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Socials</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col justify-end"
          >
            <div className="space-y-2 border-b border-border focus-within:border-foreground transition-colors pb-2">
              <label htmlFor="name" className="sr-only">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground py-2"
              />
            </div>
            
            <div className="space-y-2 border-b border-border focus-within:border-foreground transition-colors pb-2">
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground py-2"
              />
            </div>
            
            <div className="space-y-2 border-b border-border focus-within:border-foreground transition-colors pb-2 h-32">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea 
                id="message" 
                required
                placeholder="PROJECT DETAILS"
                className="w-full h-full bg-transparent border-none outline-none font-mono text-sm uppercase tracking-widest placeholder:text-muted-foreground resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group/btn flex items-center justify-between w-full py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-mono text-sm uppercase tracking-widest px-6">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </span>
              <span className="px-6 border-l border-background group-hover/btn:border-foreground transition-colors">
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
