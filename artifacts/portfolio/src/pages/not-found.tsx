import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useRef } from "react";

function KineticText({ text }: { text: string }) {
  return (
    <div className="overflow-hidden flex justify-center">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%", rotate: Math.random() * 20 - 10, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2 + index * 0.1,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden relative">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        
        <motion.div 
          style={{ y }}
          className="max-w-4xl w-full text-center flex flex-col items-center relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative mb-12">
            <h1 className="text-[30vw] md:text-[25vw] leading-none font-display font-bold uppercase tracking-tighter text-foreground mix-blend-overlay select-none flex">
              <KineticText text="404" />
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="h-[2px] w-full bg-primary origin-left rotate-[-10deg] absolute" 
              />
            </div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-6"
          >
            Halaman ini <span className="italic font-serif lowercase text-primary tracking-normal">hilang</span> di tengah hutan Sumatera.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-sans font-light"
          >
            Mungkin rute telah diubah, dihapus, atau Anda berada di koordinat yang salah dalam arsitektur sistem ini.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="/">
              <div className="group relative overflow-hidden inline-flex items-center justify-center gap-4 px-10 py-5 bg-foreground text-background rounded-full font-mono text-sm uppercase tracking-widest cursor-pointer border border-foreground hover:bg-background hover:text-foreground transition-colors duration-500">
                <div className="absolute inset-0 bg-primary translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                <span className="relative z-10 flex items-center gap-3">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  Mari Kembali
                </span>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Noise overlay specific to 404 */}
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-50"></div>
    </div>
  );
}
