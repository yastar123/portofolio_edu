export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display font-bold text-xl uppercase tracking-tighter">
          Edu Juanda Pratama &copy; {currentYear}
        </div>
        
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center md:text-right">
          <p>Built with React & Vite. Engineered with intent.</p>
          <p className="mt-1">All rights reserved.</p>
        </div>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors"
        >
          Back to Top [^]
        </button>
      </div>
    </footer>
  );
}
