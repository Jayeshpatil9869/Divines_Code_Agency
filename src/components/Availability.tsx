export function Availability() {
  return (
    <section className="w-full py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/10 border border-primary-foreground/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75 duration-[2000ms]"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary-foreground/90">Booking from March</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-display mb-6">Currently booking from March</h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mb-10">
          One project slot open this quarter. I take on four clients a year so each gets real attention.
        </p>
        
        <a 
          href="#contact"
          className="px-6 py-3.5 bg-background text-foreground rounded-lg font-medium transition-transform hover:scale-105"
        >
          Start a conversation
        </a>
      </div>
    </section>
  );
}
