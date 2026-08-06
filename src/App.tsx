import { useEffect, useState } from "react";
import { registerGsapPlugins } from "@/animations";
import { useLenis } from "@/hooks/useLenis";

import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Metrics } from "./components/Metrics";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Skills } from "./components/Skills";
import { Testimonials } from "./components/Testimonials";
import { WhyMe, Philosophy } from "./components/WhyMe";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Availability } from "./components/Availability";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useLenis();

  useEffect(() => {
    registerGsapPlugins();
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" aria-hidden />
      {!reducedMotion && <CustomCursor />}

      <Navigation />

      <main className="relative z-10 flex flex-col w-full overflow-x-hidden">
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
