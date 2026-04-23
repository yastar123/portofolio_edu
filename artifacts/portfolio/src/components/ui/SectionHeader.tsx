interface SectionHeaderProps {
  number: string;
  title: string;
  eyebrow: string;
}

export function SectionHeader({ number, title, eyebrow }: SectionHeaderProps) {
  // Render the entry twice — CSS marquee scrolls 0% → -50% for a seamless loop.
  const entries = Array.from({ length: 8 });
  return (
    <div className="group relative py-5 border-y border-border/60 overflow-hidden flex whitespace-nowrap w-full z-10 bg-gradient-to-r from-muted/40 via-muted/10 to-muted/40">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="marquee-track flex text-xs md:text-sm font-mono uppercase tracking-[0.22em] text-muted-foreground">
        {entries.map((_, i) => (
          <span key={i} className="flex items-center pr-10 shrink-0">
            <span className="flex items-center gap-3">
              <span className="text-primary tabular-nums font-semibold">{number}</span>
              <span className="opacity-40">/</span>
              <span className="opacity-70">{eyebrow}</span>
              <span aria-hidden className="opacity-30">—</span>
              <span className="font-bold text-foreground">{title}</span>
            </span>
            <span aria-hidden className="text-primary/70 ml-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
