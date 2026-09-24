import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { services, servicePath, servicesTotal } from "@/data/services";

// Monochrome Black & White alternating theme
const LANE_STYLES = [
  {
    bg: "#000000",
    text: "#ffffff",
    hr: "border-white/30",
    subColor: "rgba(255,255,255,0.75)",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.12)",
    badgeBg: "rgba(255,255,255,0.1)",
    btnBg: "#ffffff",
    btnText: "#000000",
  },
  {
    bg: "#ffffff",
    text: "#000000",
    hr: "border-black/25",
    subColor: "rgba(0,0,0,0.75)",
    cardBg: "rgba(0,0,0,0.03)",
    cardBorder: "rgba(0,0,0,0.12)",
    badgeBg: "rgba(0,0,0,0.08)",
    btnBg: "#000000",
    btnText: "#ffffff",
  },
  {
    bg: "#080808",
    text: "#ffffff",
    hr: "border-white/30",
    subColor: "rgba(255,255,255,0.75)",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.12)",
    badgeBg: "rgba(255,255,255,0.1)",
    btnBg: "#ffffff",
    btnText: "#000000",
  },
  {
    bg: "#f7f7f7",
    text: "#000000",
    hr: "border-black/25",
    subColor: "rgba(0,0,0,0.75)",
    cardBg: "rgba(0,0,0,0.03)",
    cardBorder: "rgba(0,0,0,0.12)",
    badgeBg: "rgba(0,0,0,0.08)",
    btnBg: "#000000",
    btnText: "#ffffff",
  },
  {
    bg: "#0c0c0c",
    text: "#ffffff",
    hr: "border-white/30",
    subColor: "rgba(255,255,255,0.75)",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.12)",
    badgeBg: "rgba(255,255,255,0.1)",
    btnBg: "#ffffff",
    btnText: "#000000",
  },
  {
    bg: "#ffffff",
    text: "#000000",
    hr: "border-black/25",
    subColor: "rgba(0,0,0,0.75)",
    cardBg: "rgba(0,0,0,0.03)",
    cardBorder: "rgba(0,0,0,0.12)",
    badgeBg: "rgba(0,0,0,0.08)",
    btnBg: "#000000",
    btnText: "#ffffff",
  },
];

export function Services() {
  return (
    <section id="services" className="w-full relative bg-black">
      {/* 6-Lane Story Scroll Flow in Black & White */}
      <FlowArt aria-label="01 / Services / How we help">
        {services.map((service, index) => {
          const style = LANE_STYLES[index % LANE_STYLES.length];

          return (
            <FlowSection
              key={service.id}
              aria-label={`${service.num} — ${service.title}`}
              style={{ backgroundColor: style.bg, color: style.text }}
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded font-mono"
                    style={{ backgroundColor: style.badgeBg }}
                  >
                    01 / Services / How we help
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-75">
                    Lane {service.num} of {servicesTotal}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="opacity-75">SCOPE: {service.scope}</span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 font-bold uppercase tracking-wider hover:opacity-75 transition-opacity"
                  >
                    Explore all services <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <hr className={`my-[1.5vw] border-none border-t ${style.hr} opacity-100`} />

              {/* Main Headline Block */}
              <div>
                <p className="text-sm md:text-base font-serif italic tracking-wide mb-3 opacity-80">
                  {service.num} — {service.short}
                </p>
                <h2 className="text-[clamp(3rem,8vw,9.5rem)] font-black leading-[0.88] uppercase tracking-tight">
                  {service.title.split(" ")[0]}
                  <br />
                  {service.title.split(" ").slice(1).join(" ")}
                </h2>
              </div>

              <hr className={`my-[1.5vw] border-none border-t ${style.hr} opacity-100`} />

              {/* Description Paragraph */}
              <p
                className="max-w-[62ch] text-[clamp(1rem,1.8vw,1.45rem)] font-normal leading-relaxed"
                style={{ color: style.subColor }}
              >
                {service.description}
              </p>

              <hr className={`my-[1.5vw] border-none border-t ${style.hr} opacity-100`} />

              {/* Sub-Offerings / Types Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {service.types.map((type, tIdx) => (
                  <div
                    key={type.title}
                    className="p-3 rounded flex flex-col justify-between min-h-[90px] border"
                    style={{
                      backgroundColor: style.cardBg,
                      borderColor: style.cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono opacity-65">
                        0{tIdx + 1}
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 opacity-85" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm tracking-tight line-clamp-1">
                        {type.title}
                      </h4>
                      <p className="text-[11px] font-light leading-snug line-clamp-2 mt-0.5 opacity-75">
                        {type.blurb}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className={`my-[1.5vw] border-none border-t ${style.hr} opacity-100`} />

              {/* Bottom Footer & Navigation */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="text-xs font-mono opacity-80">
                  <span>06 / 06 offerings · Deliverable: {service.deliverable}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    to={servicePath(service.slug)}
                    className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-[0.2em] transition-transform hover:scale-105 inline-flex items-center gap-2"
                    style={{
                      backgroundColor: style.btnBg,
                      color: style.btnText,
                    }}
                  >
                    View {service.title} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}

export default Services;
