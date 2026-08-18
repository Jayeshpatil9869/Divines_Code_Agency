import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { registerGsapPlugins } from "@/animations";
import { useLenis } from "@/hooks/useLenis";
import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";

import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Metrics } from "./components/Metrics";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { WhyMe, Philosophy } from "./components/WhyMe";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Availability } from "./components/Availability";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { CustomCursor } from "./components/CustomCursor";

const INTRO_GREETINGS = [
  { text: "Think." },
  { text: "Create." },
  { text: "Differently." },
];

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [desktopPointer, setDesktopPointer] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  useLenis();

  useEffect(() => {
    registerGsapPlugins();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    setReducedMotion(motionQuery.matches);
    setDesktopPointer(desktopQuery.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onDesktop = (e: MediaQueryListEvent) => setDesktopPointer(e.matches);
    motionQuery.addEventListener("change", onMotion);
    desktopQuery.addEventListener("change", onDesktop);

    return () => {
      motionQuery.removeEventListener("change", onMotion);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, []);

  return (
    <ArcRevealHero
      greetings={INTRO_GREETINGS}
      greetingHold={580}
      revealDuration={1100}
      className="min-h-0 overflow-visible"
      revealClassName="relative"
      onComplete={() => setIntroReady(true)}
    >
      <div className="relative min-h-screen bg-background">
        <div className="noise-overlay" aria-hidden />
        {!reducedMotion && desktopPointer && <CustomCursor />}

        <Navigation introReady={introReady} />

        <main className="relative z-10 flex flex-col w-full overflow-x-hidden">
          <Hero introReady={introReady} />
          <Logos />
          <Metrics />
          <Projects />
          <Services />
          <About />
          <Team />
          <Process />
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
      <Analytics />
    </ArcRevealHero>
  );
}
