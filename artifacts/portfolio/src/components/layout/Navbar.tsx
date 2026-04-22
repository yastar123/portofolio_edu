import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "work", "expertise", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "About", href: "about" },
    { name: "Work", href: "work" },
    { name: "Expertise", href: "expertise" },
    { name: "Experience", href: "experience" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl py-4 border-b border-border/50" : "bg-transparent py-6"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display font-bold text-xl uppercase tracking-tighter hover:text-primary transition-colors group flex items-center gap-2">
            EJP<span className="text-primary group-hover:opacity-0 transition-opacity">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-muted rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>ID</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center bg-muted/50 backdrop-blur-md rounded-full p-1 border border-border/50">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className={`relative px-5 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded-full ${
                  activeSection === item.href ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-foreground rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/50 hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button 
              onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest rounded-full hover:bg-primary/90 transition-colors group"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
