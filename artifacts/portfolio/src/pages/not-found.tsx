import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          className="max-w-3xl w-full text-center flex flex-col items-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <h1 className="text-[25vw] md:text-[15vw] leading-none font-display font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground/10 to-foreground/5 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-[1px] w-full bg-primary/50 rotate-[-15deg] transform origin-center" />
              <div className="h-[1px] w-full bg-primary/50 rotate-[15deg] transform origin-center absolute" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mt-8 mb-6">
            Rute <span className="italic font-serif lowercase text-primary tracking-normal">Tidak Ditemukan</span>.
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12 font-sans font-light">
            Halaman yang Anda cari mungkin telah dihapus, diubah namanya, atau tidak pernah ada dalam arsitektur sistem ini.
          </p>
          
          <Link href="/">
            <div className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-foreground text-background hover:bg-primary transition-all duration-300 font-mono text-sm uppercase tracking-widest group cursor-pointer">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              <span>Kembali ke Beranda</span>
            </div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
