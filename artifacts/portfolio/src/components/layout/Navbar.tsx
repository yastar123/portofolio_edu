import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, ArrowUpRight, Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Linkedin as SiLinkedin } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "work", "expertise", "experience", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleThemeToggle = (e: React.MouseEvent) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Check if View Transitions API is supported and prefers-reduced-motion is false
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      
      document.documentElement.animate(
        {
          clipPath: newTheme === "dark" ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: newTheme === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)",
        }
      );
    });
  };

  const navItems = [
    { name: "About", href: "about" },
    { name: "Work", href: "work" },
    { name: "Expertise", href: "expertise" },
    { name: "Experience", href: "experience" },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:font-mono focus:text-xs">
        Skip to main content
      </a>
      
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl py-4 border-b border-border/50" : "bg-transparent py-6"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="font-display font-bold text-xl uppercase tracking-tighter hover:text-primary transition-colors group flex items-center gap-2">
              EJP<span className="text-primary group-hover:opacity-0 transition-opacity">.</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-muted rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border/50">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>ID</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden lg:flex items-center bg-muted/50 backdrop-blur-md rounded-full p-1 border border-border/50 relative">
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
                      className="absolute inset-0 bg-foreground rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {activeSection === item.href && (
                      <motion.div 
                        layoutId="nav-dot" 
                        className="w-1 h-1 rounded-full bg-primary"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {item.name}
                  </span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleThemeToggle}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/50 hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme === "dark" ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              
              <a 
                href="https://wa.me/6285366195381"
                target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest rounded-full hover:bg-primary/90 transition-colors group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hubungi
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-foreground" 
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </a>

              <button 
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border border-border/50 bg-background/50 hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-foreground text-background flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-bold text-xl uppercase tracking-tighter">
                EJP<span className="text-primary">.</span>
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-background/20 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-3xl md:text-4xl font-display uppercase tracking-tighter overflow-y-auto flex-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <button 
                    onClick={() => scrollTo(item.href)}
                    className="hover:text-primary transition-colors flex items-center gap-4"
                  >
                    {item.name}
                    {activeSection === item.href && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </button>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navItems.length * 0.1 }}
                className="mt-8 pt-8 border-t border-background/20 flex flex-col gap-8"
              >
                <a 
                  href="https://wa.me/6285366195381"
                  target="_blank" rel="noopener noreferrer"
                  className="text-primary flex items-center gap-2 w-fit"
                >
                  Hubungi <ArrowUpRight className="w-6 h-6" />
                </a>
                
                <div className="flex items-center gap-6 text-background/60">
                  <a href="https://github.com/yastar123" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
                    <SiGithub className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/edu-juanda-pratama-861249297/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                    <SiLinkedin className="w-6 h-6" />
                  </a>
                  <a href="https://wa.me/6285366195381" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-primary transition-colors">
                    <SiWhatsapp className="w-6 h-6" />
                  </a>
                  <a href="mailto:yastariskandar@gmail.com" aria-label="Email" className="hover:text-primary transition-colors">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
