import React from "react";
import { teamMembers } from "../data/team";

function Team() {
  return (
    <section
      id="team"
      className="team-section section-pad"
      aria-labelledby="team-title"
    >
      <div className="container">

        {/* Section heading */}
        <div className="team-header">

          <p className="team-overline">
            <span className="team-overline-line" />
            THE PEOPLE BEHIND ORCHLAY
          </p>

          <h2 id="team-title">
            Meet Our <span>Team.</span>
          </h2>

          <p className="team-intro">
            Meet the people bringing together technology,
            engineering expertise, and practical thinking
            to deliver meaningful business solutions.
          </p>

        </div>

        {/* Team cards */}
        <div className="team-grid">

          {teamMembers.map((member) => (

            <article
              className="team-card"
              key={member.id}
            >

              {/* Team photograph */}
              <div className="team-image-wrapper">

                <img
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  className="team-image"
                  loading="lazy"
                />

                <div className="team-image-accent" />

              </div>

              {/* Team details */}
              <div className="team-card-content">

                <div className="team-card-heading">

                  <h3>{member.name}</h3>

                  <span className="team-role">
                    {member.role}
                  </span>

                </div>

                <div className="team-card-divider" />

                <p className="team-description">
                  {member.desc}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Team;