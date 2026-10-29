import React from "react";
import { serviceTechnologies } from "../data/content";

export default function ServiceContent({ service }) {
  const technologies = serviceTechnologies[service.id] || [];

  return (
    <div className="service-content-shared">

      {/* <p className="shared-service-description">
        {service.description}
      </p> */}

      {/* Technology logos */}
      {technologies.length > 0 && (
        <div className="shared-tech-section">
          <span className="shared-label">
            TECHNOLOGIES WE WORK WITH
          </span>

          <div className="shared-tech-logos">
            {technologies.map((tech) => (
              <div className="shared-tech-item" key={tech.name}>
                <img
                  src={tech.logo}
                  alt=""
                  loading="lazy"
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Capabilities */}
      <div className="shared-features">
        <span className="shared-label">
          OUR CAPABILITIES
        </span>

        <ul>
          {service.features.map((feature) => (
            <li key={feature}>
              <span className="shared-check">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Outcomes */}
      <div className="shared-outcome">
        <span>BUSINESS OUTCOMES</span>
        <p>{service.outcome}</p>
      </div>

    </div>
  );
}