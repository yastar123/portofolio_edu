import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  eyebrow: string;
}

export function SectionHeader({ number, title, eyebrow }: SectionHeaderProps) {
  return (
    <div className="py-6 border-y border-border/50 overflow-hidden flex whitespace-nowrap bg-muted/20 relative w-full z-10">
      <motion.div 
        className="flex gap-8 text-xs md:text-sm font-mono uppercase tracking-widest text-muted-foreground"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <span className="text-primary">{number}</span>
              <span className="opacity-50">/</span>
              <span>{eyebrow}</span>
              <span className="font-bold ml-2 text-foreground">{title}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
