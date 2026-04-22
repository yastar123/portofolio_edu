import { motion } from "framer-motion";

const skills = [
  {
    category: "Design",
    items: ["Art Direction", "UI/UX Design", "Design Systems", "Motion Graphics", "Typography", "3D Visualization"]
  },
  {
    category: "Engineering",
    items: ["React & Next.js", "WebGL & Three.js", "Framer Motion", "TypeScript", "Tailwind CSS", "Creative Coding"]
  },
  {
    category: "Architecture",
    items: ["Performance Tuning", "Accessibility (a11y)", "Headless CMS", "State Management", "API Design", "Vercel Ecosystem"]
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-background/60 mb-4">
            03 — Capabilities
          </h2>
          <h3 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-background">
            Expertise
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-serif italic text-primary border-b border-background/20 pb-4">
                {skillGroup.category}
              </h4>
              <ul className="space-y-4">
                {skillGroup.items.map((item) => (
                  <li key={item} className="font-mono text-sm uppercase tracking-wider text-background/80 hover:text-background transition-colors cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
