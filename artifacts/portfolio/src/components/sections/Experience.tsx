import { motion } from "framer-motion";

const timeline = [
  {
    year: "2021 — Present",
    role: "Senior Creative Engineer",
    company: "Studio Vektor",
    description: "Leading technical execution for global luxury brands. Bridging the gap between the design team and engineering."
  },
  {
    year: "2018 — 2021",
    role: "Frontend Developer",
    company: "Nexus Digital",
    description: "Architected scalable frontend solutions for fintech startups. Championed the adoption of functional animation."
  },
  {
    year: "2015 — 2018",
    role: "Interactive Designer",
    company: "Freelance",
    description: "Designed and developed bespoke portfolio sites for artists, photographers, and boutique architecture firms."
  }
];

export default function Experience() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
            04 — History
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter sticky top-32">
            Experience
          </h3>
        </motion.div>

        <div className="space-y-16">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group border-l border-border pl-8 py-2 hover:border-primary transition-colors"
            >
              <div className="absolute w-3 h-3 bg-background border border-border rounded-full -left-[6.5px] top-4 group-hover:border-primary group-hover:bg-primary transition-colors" />
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                <h4 className="text-2xl font-display font-bold uppercase tracking-tight">
                  {item.role}
                </h4>
                <span className="font-serif italic text-muted-foreground text-lg">
                  at {item.company}
                </span>
              </div>
              
              <p className="font-mono text-sm text-primary uppercase tracking-widest mb-4">
                {item.year}
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
