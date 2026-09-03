import { Hero } from "@/components/Hero";
import { Logos } from "@/components/Logos";
import { Metrics } from "@/components/Metrics";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { WhyMe, Philosophy } from "@/components/WhyMe";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Availability } from "@/components/Availability";
import { Contact } from "@/components/Contact";

export function HomePage({ introReady = true }: { introReady?: boolean }) {
  return (
    <>
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
    </>
  );
}
