import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden bg-muted"
        >
          <img 
            src="/images/portrait.png" 
            alt="Elias Vance Portrait" 
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 border border-foreground/10 pointer-events-none" />
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
              01 — The Persona
            </h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
              Bridging <span className="italic font-serif lowercase text-primary tracking-normal">Logic</span> & Art.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm Elias Vance, a multidisciplinary creative developer currently based in Berlin. For the past decade, I've been exploring the intersection of precise engineering and evocative design.
              </p>
              <p>
                My practice is rooted in brutalist architectural principles: exposed structures, honest materials, and functional clarity. I believe that code is a medium for self-expression, not just utility.
              </p>
              <p>
                When I'm not architecting digital experiences, I'm likely collecting vintage synthesizers or exploring generative art algorithms.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-8 pt-8 border-t border-border"
          >
            <div>
              <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-1">Focus</p>
              <p className="font-medium">Creative Direction</p>
              <p className="font-medium">Frontend Engineering</p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-1">Location</p>
              <p className="font-medium">Berlin, DE</p>
              <p className="font-medium text-muted-foreground">Available globally</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
