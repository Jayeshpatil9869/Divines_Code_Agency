import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-black tracking-[-0.02em] uppercase mb-4">Tell me what you're building.</h2>
        <p className="text-[11px] font-sans text-muted-foreground mb-16 max-w-md uppercase tracking-widest font-bold">
          A sentence is enough to start. I reply within one business day — always personally.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                required 
                className="block w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none focus:border-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
              >
                Name
              </label>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>

            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                required 
                className="block w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none focus:border-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
              >
                Email
              </label>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 ease-out peer-focus:w-full"></div>
            </div>
          </div>

          <div className="relative group">
            <textarea 
              id="message" 
              required 
              rows={4}
              className="block w-full bg-transparent border-b border-border py-4 text-foreground focus:outline-none focus:border-transparent peer resize-none"
              placeholder=" "
            ></textarea>
            <label 
              htmlFor="message" 
              className="absolute left-0 top-4 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs pointer-events-none"
            >
              What are you building?
            </label>
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 ease-out peer-focus:w-full"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className="w-full sm:w-auto px-8 h-12 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.2em] rounded-none transition-all hover:brightness-110 flex items-center justify-center overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span 
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    Send it &rarr;
                  </motion.span>
                )}
                {status === 'submitting' && (
                  <motion.span 
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin block"></span>
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span 
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {status === 'success' ? (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-success text-sm font-medium"
              >
                Received. I'll be in touch shortly.
              </motion.span>
            ) : (
              <span className="text-muted-foreground text-sm">
                or <a href="#" className="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary">Book 20 minutes</a> directly.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
