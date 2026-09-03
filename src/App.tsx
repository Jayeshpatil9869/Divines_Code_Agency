import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { ContactPage } from "@/pages/ContactPage";
import { PricingPage } from "@/pages/PricingPage";
import { AboutPage } from "@/pages/AboutPage";
import { WorkPage } from "@/pages/WorkPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const INTRO_GREETINGS = [
  { text: "Think." },
  { text: "Create." },
  { text: "Differently." },
];

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [introReady, setIntroReady] = useState(!isHome);
  const [skipIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("dc-intro-seen") === "1";
  });

  useEffect(() => {
    if (!isHome) setIntroReady(true);
  }, [isHome]);

  const showIntro = isHome && !skipIntro;

  const shell = (
    <SiteShell introReady={showIntro ? introReady : true}>
      <Routes>
        <Route
          path="/"
          element={<HomePage introReady={showIntro ? introReady : true} />}
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteShell>
  );

  if (!showIntro) {
    return (
      <>
        {shell}
        <Analytics />
      </>
    );
  }

  return (
    <>
      <ArcRevealHero
        greetings={INTRO_GREETINGS}
        greetingHold={580}
        revealDuration={1100}
        className="min-h-0 overflow-visible"
        revealClassName="relative"
        onComplete={() => {
          sessionStorage.setItem("dc-intro-seen", "1");
          setIntroReady(true);
        }}
      >
        {shell}
      </ArcRevealHero>
      <Analytics />
    </>
  );
}
