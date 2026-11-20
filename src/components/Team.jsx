
import React from "react";
import { teamMembers } from "../data/team";

function Team() {
  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

  return (
    <section
      id="team"
      className="team-section section-pad"
      aria-labelledby="team-title"
    >
      <div className="container">

        <div className="team-header">
          <p className="team-overline">
            <span className="team-overline-line" />
            THE PEOPLE BEHIND ORCHLAY
          </p>

          <h2 id="team-title">
            Experience that brings technology and business <span>together.</span>
          </h2>

          <p className="team-intro">
            Our leadership and consulting team combines business perspective with specialist technology expertise.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.id}>

              <div className="team-avatar">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                  />
                ) : (
                  <span>{getInitials(member.name)}</span>
                )}
              </div>

              <div className="team-card-content">
                <p className="team-role">
                  {member.role}
                </p>

                <h3>{member.name}</h3>

                <p className="team-description">
                  {member.desc}
                </p>

                {member.expertise?.length > 0 && (
                  <div
                    className="team-tags"
                    aria-label={`${member.name} expertise`}
                  >
                    {member.expertise.map((tag) => (
                      <span className="team-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Team;
