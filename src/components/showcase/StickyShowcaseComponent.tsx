import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronUp, ChevronDown, ExternalLink, MoveVertical } from "lucide-react";
import { StickyShowcase, type SlideItem } from "./StickyShowcase";
import "./StickyShowcase.css";

interface StickyShowcaseComponentProps {
  slides: SlideItem[];
}

export function StickyShowcaseComponent({ slides }: StickyShowcaseComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<StickyShowcase | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || slides.length === 0) return;

    const showcase = new StickyShowcase({
      container: containerRef.current,
      slidesData: slides,
      onActiveChange: (idx) => {
        setActiveIndex(idx);
      },
      onMove: (indexFloat) => {
        if (slidesRef.current) {
          // Smoothly translate slides container vertically proportional to index
          slidesRef.current.style.transform = `translateY(${(indexFloat * 100) / slides.length}%)`;
        }
      },
    });

    showcaseRef.current = showcase;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        showcase.next();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        showcase.prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      showcase.destroy();
      showcaseRef.current = null;
    };
  }, [slides]);

  const handlePrev = useCallback(() => {
    showcaseRef.current?.prev();
  }, []);

  const handleNext = useCallback(() => {
    showcaseRef.current?.next();
  }, []);

  const handleGoTo = useCallback((index: number) => {
    showcaseRef.current?.goToIndex(index);
  }, []);

  return (
    <div className="showcase-container" id="showcase-app">
      {/* 3D Canvas Mounting Point */}
      <div className="showcase-canvas-wrap" ref={containerRef} />

      {/* Atmospheric Glow */}
      <div className="showcase-ambient-glow" aria-hidden />

      {/* Kinetic Typography Slides */}
      <div className="showcase-slides" ref={slidesRef}>
        {slides.map((item, idx) => {
          let stateClass = "";
          if (idx === activeIndex) stateClass = "show-meta";
          else if (idx < activeIndex) stateClass = "prev";
          else stateClass = "next";

          return (
            <div key={item.id} className={`showcase-slide ${stateClass}`}>
              <div className="showcase-slide-meta">
                {item.category && (
                  <span className="showcase-slide-meta-badge">{item.category}</span>
                )}
                <span>{item.meta}</span>
                {item.year && <span>· {item.year}</span>}
              </div>

              <h1 className="showcase-slide-title">{item.title}</h1>

              {item.blurb && (
                <p className="showcase-slide-desc">{item.blurb}</p>
              )}

              <div className="showcase-slide-actions">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-explore-btn"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Side Dots Pagination */}
      <div className="showcase-dots" aria-label="Slide indicators">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={`showcase-dot ${idx === activeIndex ? "active" : ""}`}
            onClick={() => handleGoTo(idx)}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
          />
        ))}
      </div>

      {/* Bottom HUD Bar */}
      <div className="showcase-hud">
        <div className="showcase-hud-left">
          <div className="showcase-counter">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="showcase-counter-total">
              {" "}
              / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="showcase-hint">
            <MoveVertical size={13} />
            <span>Drag · Scroll · Arrow Keys</span>
          </div>
        </div>

        <div className="showcase-hud-right">
          <button
            type="button"
            className="showcase-nav-btn"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous Project"
          >
            <ChevronUp size={20} />
          </button>
          <button
            type="button"
            className="showcase-nav-btn"
            onClick={handleNext}
            disabled={activeIndex === slides.length - 1}
            aria-label="Next Project"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
