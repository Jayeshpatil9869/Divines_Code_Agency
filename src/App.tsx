import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import { Hero } from './components/Hero';
import { Logos } from './components/Logos';
import { Metrics } from './components/Metrics';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { About } from './components/About';
import { Process } from './components/Process';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';
import { WhyMe, Philosophy } from './components/WhyMe';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Availability } from './components/Availability';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay"></div>
      {!reducedMotion && <CustomCursor />}
      
      <Navigation />

      <main className="flex flex-col w-full overflow-hidden">
        <Hero />
        <Logos />
        <Metrics />
        <Projects />
        <Services />
        <About />
        <Process />
        <Skills />
        <Testimonials />
        <WhyMe />
        <Philosophy />
        <Pricing />
        <FAQ />
        <Availability />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
