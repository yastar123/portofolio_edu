import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12">
        <motion.div 
          className="max-w-3xl w-full text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] md:text-[12vw] leading-none font-display font-bold uppercase tracking-tighter text-muted-foreground/20 pointer-events-none select-none">
            404
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mt-8 mb-6">
            Void <span className="italic font-serif lowercase text-primary tracking-normal">Discovered</span>.
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12">
            The architecture you are looking for does not exist in this space. It may have been relocated or dismantled.
          </p>
          
          <Link href="/" className="inline-flex items-center justify-center gap-4 px-8 py-4 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-mono text-sm uppercase tracking-widest group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            <span>Return to Origin</span>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
