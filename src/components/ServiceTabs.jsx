import React, { useState } from "react";
import { capabilities } from "../data/content";
import ServiceContent from "./ServiceContent";

export default function ServiceTabs() {
  const [active, setActive] = useState(0);

  const service = capabilities[active];

  return (
    <section className="service-design-section">
      <div className="container">

        <div className="service-design-heading">
          <span className="design-label">
            EXPLORE THE EXPERTISE
          </span>
        </div>

        <div className="service-tabs-layout">

          {/* Left navigation */}
          <div
            className="service-tabs-nav"
            aria-label="Service categories"
          >
            {capabilities.map((item, index) => (
                <button
                    key={item.id}
                    type="button"
                    className={`service-tab-btn ${active === index ? "active" : ""
                        }`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={active === index}
                >
                <span className="tab-number">
                  {item.number}
                </span>

                <span className="tab-title">
                  {item.title}
                </span>

                <span className="tab-arrow">→</span>
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="service-tabs-panel">

            <div
              key={service.id}
              className="service-tab-transition"
            >
              {/* <div className="service-tab-panel-header">
                //  <span className="service-tab-eyebrow">
                //   SERVICE {service.number}
                // </span> 

                <h3>{service.title}</h3>
              </div> */}

              <ServiceContent service={service} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}