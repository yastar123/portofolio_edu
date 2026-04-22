import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    { name: "Work", href: "work" },
    { name: "About", href: "about" },
    { name: "Expertise", href: "expertise" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl uppercase tracking-tighter hover:text-primary transition-colors">
          E.Vance
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
