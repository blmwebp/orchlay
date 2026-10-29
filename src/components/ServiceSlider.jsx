import React, { useEffect, useState } from "react";
import { capabilities } from "../data/content";
import ServiceContent from "./ServiceContent";

export default function ServiceSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);

  const total = capabilities.length;
  const service = capabilities[active];

  // Automatic slide every 5 seconds
  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = setInterval(() => {
      setDirection("next");
      setActive((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, total]);

  const nextSlide = () => {
    setDirection("next");
    setActive((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection("prev");
    setActive((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index) => {
    setDirection(index >= active ? "next" : "prev");
    setActive(index);
  };

  return (
    <section className="service-slider-section">
      <div className="container">

        <div className="service-design-heading">
          <span className="design-label">
            OPTION 02 / HORIZONTAL SLIDER
          </span>
        </div>

        <div
          className="service-slider-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >

          <div className="slider-topbar">
            {/* <span>OUR TECHNOLOGY EXPERTISE</span> */}

            <span className="slider-count">
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Animated slide content */}
          <div
            key={service.id}
            className={`slider-content ${
              direction === "next"
                ? "slide-from-left"
                : "slide-from-right"
            }`}
          >

            {/* <div className="slider-heading">
              <span>SERVICE {service.number}</span>
              <h3>{service.title}</h3>
            </div> */}

            <ServiceContent service={service} />

          </div>

          {/* Navigation */}
          <div className="service-slider-footer">

            <div className="slider-arrows">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous service"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next service"
              >
                →
              </button>
            </div>

            <div className="slider-dots">
              {capabilities.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={active === index ? "active" : ""}
                  onClick={() => goToSlide(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={active === index ? "true" : undefined}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}