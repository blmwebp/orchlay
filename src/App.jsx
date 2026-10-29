import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm.jsx'
import Icon from './components/Icon.jsx'
import { capabilities, acterysServices } from './data/content.js'
import Team from "./components/Team";
import { ComposableMap,Geographies,Geography,Graticule,Marker,Line} from "react-simple-maps";
import ServiceTabs from "./components/ServiceTabs";
import ServiceSlider from "./components/ServiceSlider";
import worldData from "world-atlas/countries-110m.json";

const navigation = [
  ['Our Services', '#services'],
  ['About Us', '#about'],
]

const process = [
  ['01', 'Understand', 'Align technology decisions with business goals and the needs of the people using the solution.'],
  ['02', 'Architect', 'Design secure, scalable, and maintainable solutions built for real business requirements.'],
  ['03', 'Engineer', 'Build and integrate using the appropriate Microsoft technologies and development practices.'],
  ['04', 'Evolve', 'Support, optimize, and enhance applications as business requirements change.'],
]

const reasons = [
  'Deep Microsoft technology expertise',
  'Business-focused solution architecture',
  'End-to-end development and integration',
  'Flexible engagement and support models',
  'Long-term application evolution and support',
]

function Brand({ compact = false }) {
  return (
    <a
      href="#home"
      className={`brand ${compact ? "brand-compact" : ""}`}
      aria-label="Orchlay Solutions - Back to Home"
    >
       <img
        src={
          compact
            ? "/assets/logo_white.png"
            : "/assets/logo_color.png"
        }
        alt="Orchlay Solutions Logo"
        className="brand-logo"
      />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen(value => !value)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <nav id="primary-nav" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-external" href="#acterys" onClick={() => setMenuOpen(false)}>Acterys <Icon name="arrowUp" size={14} /></a>
          <a href="#contact" className="contact-btn">Get in Touch</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero purple-section">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="overline light-overline"><span className="overline-bar" /> MICROSOFT TECHNOLOGY SPECIALISTS</p>
          <h1>Microsoft Technology.<br /><span>Engineered for Business.</span></h1>
          <p className="hero-lede">We help organizations modernize data platforms, build intelligent business applications, automate processes, and unlock more value from Microsoft technology.</p>
          <p className="hero-support">From solution architecture and engineering to ongoing application support, we deliver solutions tailored to your business needs.</p>
          <div className="hero-actions">
            <a className="button button-cyan" href="#contact">Discuss Your Project <Icon name="arrow" size={18} /></a>
            <a className="text-link light-link" href="#services">Explore Our Services <Icon name="arrowUp" size={18} /></a>
          </div>
          <div className="hero-footnote"><span className="footnote-line" /> CONSULTING · ENGINEERING · LONG-TERM SUPPORT</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <img src="/assets/hero11.png" alt="" />
          <span className="floating-badge badge-top">DATA + AI</span>
          <span className="floating-badge badge-bottom">BUILD / MODERNIZE</span>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [expanded, setExpanded] = useState('data-analytics')
  return (
    <section id="services" className="services-section section-pad">
      <div className="container">
        <div className="section-heading centered">
          <p className="overline">WHAT WE DO BEST</p>
          <h2>Our Core Capabilities</h2>
          <p>Practical, business-led technology solutions across the Microsoft ecosystem.</p>
        </div>
        <div className="capability-showcase">
          <div className="service-illustration">
            <img src="/assets/services.svg" alt="Illustration of connected data, cloud applications, and workplace collaboration" />
            <div className="illustration-caption"><span>ORCHLAY SOLUTIONS</span><strong>Technology expertise that moves business forward.</strong></div>
          </div>
          <div className="capability-tiles">
            {capabilities.slice(0, 4).map(item => (
              <a key={item.id} className={`capability-tile tile-${item.color}`}  onClick={() => setExpanded(item.id)}>
                <span className="tile-number">{item.number}</span>
                <Icon name={item.icon} size={43} strokeWidth={1.3} />
                <span className="tile-title">{item.short}</span>
                {/* <span className="tile-arrow"><Icon name="arrowUp" size={18} /></span> */}
              </a>
            ))}
          </div>
        </div>
        <a className="managed-strip"  onClick={() => setExpanded('managed-services')}>
          <span className="managed-icon"><Icon name="support" size={27} /></span>
          <span className="managed-label"><small>05 / AN EXTENSION OF YOUR TEAM</small><strong>Managed Services & Advisory</strong></span>
          <span className="managed-description">Specialist support, flexible engagement, and continuous improvement</span>
          {/* <Icon name="arrowUp" size={20} /> */}
        </a>

            <ServiceTabs/>
        {/* <div className="service-details" aria-label="Detailed service offerings">
          <div className="details-intro">
            <p className="overline">EXPLORE THE EXPERTISE</p>
            <h3>From strategy to support, we cover the full journey.</h3>
            <p>Choose a service to explore how our teams turn requirements into maintainable Microsoft solutions.</p>
          </div>
          <div className="service-accordion">
            {capabilities.map(item => {
              const isOpen = item.id === expanded
              return (
                <div className={`accordion-item ${isOpen ? 'is-expanded' : ''}`} id={`detail-${item.id}`} key={item.id}>
                  <button type="button" onClick={() => setExpanded(isOpen ? '' : item.id)} aria-expanded={isOpen} aria-controls={`content-${item.id}`}>
                    <span className="accordion-number">{item.number}</span>
                    <span>{item.title}</span>
                    <Icon name="chevron" size={20} className="accordion-chevron" />
                  </button>
                  {isOpen && <div id={`content-${item.id}`} className="accordion-content">
                    <p>{item.description}</p>
                    <ul>{item.features.map(feature => <li key={feature}><Icon name="check" size={15} />{feature}</li>)}</ul>
                    <div className="outcome"><strong>Business outcomes</strong><span>{item.outcome}</span></div>
                  </div>}
                </div>
              )
            })}
          </div>
        </div> */}
      </div>
    </section>
  )
}

function Acterys() {
  const [active, setActive] = useState(0)
  const selected = acterysServices[active]

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % acterysServices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="what-we-do" className="acterys-section purple-section section-pad">
      <div className="container">
        <div className="acterys-grid" id="acterys">
          <div className="acterys-visual">

            <p className="overline light-overline">
              PLANNING & ANALYTICS
            </p>

            <h2>
              What we do<span className="cyan-period">.</span>
            </h2>
             {/* Existing planning dashboard */}
            <div className="dashboard-frame">
              <img
                src="/assets/planning.svg"
                alt="Connected planning dashboard"
              />
            </div>
            {/* Partnership badge */}
             <div key={active} className="acterys-highlight" aria-live="off" >
              <span className="highlight-counter">0{active + 1} / 0{acterysServices.length}</span>
               <div key={active} className="acterys-slide-content">
                <h4>{selected.title}</h4>
                <p>{selected.body}</p>
              </div>
            </div>

            

            {/* Existing slider controls */}
            <div
              className="slide-controls"
              aria-label="Acterys service topics"
            >
              {acterysServices.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === active ? "active" : ""}
                  aria-label={`Show ${item.title}`}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>

          </div>
          <div className="acterys-copy">
            <span className="partner-kicker">ACTERYS PLANNING & ANALYTICS</span>
            <h3>Connected Planning.<br /><span>Smarter Decisions.</span></h3>
            <p>We help organizations implement Acterys solutions that bring budgeting, forecasting, financial planning, and operational analysis into an integrated Power BI experience.</p>
            <p>Our work covers solution design, implementation, data integration, reporting, customization, and ongoing support.</p>
           
            <div className="acterys-partnership">

              <div className="partnership-heading">
                <span className="partnership-icon">
                  <Icon name="check" size={15} />
                </span>

                <span>TECHNOLOGY PARTNER</span>
              </div>

              <div className="partnership-logo-wrap">
                <img
                  src="/assets/acterys.svg"
                  alt="Acterys"
                  className="partnership-logo"
                />
              </div>

              <p className="partnership-description">
                As an Acterys technology partner, Orchlay Solutions helps businesses streamline budgeting, forecasting, and financial planning through integrated Power BI and Acterys solutions, enabling smarter, data-driven decisions.
              </p>
            </div>
            <div className="acterys-actions">

              <a
                href="https://acterys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="button acterys-primary-btn"
              >
                Explore Acterys Solutions
                <Icon name="arrowUp" size={18} />
              </a>

              <a
                href="#contact"
                className="button acterys-secondary-btn"
              >
                How We Can Help
                <Icon name="arrow" size={18} />
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


const locations = {
  india: {
    name: "INDIA",
    coordinates: [78.9629, 20.5937],
    labelX: 12,
    labelY: -14,
    anchor: "start",
  },
  usa: {
    name: "UNITED STATES",
    coordinates: [-98.5795, 39.8283],
    labelX: 0,
    labelY: -18,
    anchor: "middle",
  },
  australia: {
    name: "AUSTRALIA",
    coordinates: [133.7751, -25.2744],
    labelX: 0,
    labelY: 25,
    anchor: "middle",
  },
};

const highlightedCountries = new Set([
  "356", // India
  "840", // United States
  "036", // Australia
]);


function ExperienceMap() {
  return (
    <div className="experience-map">

      {/* Header */}
      <div className="map-header">
        <div className="map-header-title">
          <Icon name="globe" size={20} />
          <span>GLOBAL DELIVERY EXPERIENCE</span>
        </div>

        <span className="map-header-badge">
          INDIA-BASED
        </span>
      </div>

      {/* World map */}
      <div className="map-visual">

        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 145,
            center: [15, 5],
          }}
          width={760}
          height={440}
          role="img"
          aria-label="World map showing Orchlay's base in India and delivery experience in the United States and Australia"
        >
          {/* Subtle geographic grid */}
          <Graticule
            stroke="#8FB1C4"
            strokeWidth={0.4}
            opacity={0.12}
          />

          {/* Country shapes */}
          <Geographies geography={worldData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryId = String(geo.id).padStart(3, "0");
                const highlighted =
                  highlightedCountries.has(countryId);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}

                    fill={
                      highlighted
                        ? "#347F87"
                        : "#345A7A"
                    }

                    stroke="#6486A0"
                    strokeWidth={0.45}

                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* India → United States */}
          <path
            d="M 520 178 Q 330 80 148 125"
            fill="none"
            stroke="#52D3C8"
            strokeWidth={2}
            strokeDasharray="5 6"
            strokeLinecap="round"
            opacity={0.8}
            pointerEvents="none"
          />

          {/* India → Australia */}
          <Line
            from={locations.india.coordinates}
            to={locations.australia.coordinates}
            stroke="#52D3C8"
            strokeWidth={2}
            strokeDasharray="5 6"
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Country markers */}
          {Object.entries(locations).map(
            ([key, location]) => {

              const isIndia = key === "india";

              return (
                <Marker
                  key={key}
                  coordinates={location.coordinates}
                >

                  {/* India base pulse */}
                  {isIndia && (
                    <>
                      <circle
                        r={19}
                        fill="#D4AF37"
                        opacity={0.12}
                      />

                      <circle
                        r={12}
                        fill="#D4AF37"
                        opacity={0.20}
                      />
                    </>
                  )}

                  {/* Outer marker */}
                  <circle
                    r={7}
                    fill={
                      isIndia
                        ? "#D4AF37"
                        : "#52D3C8"
                    }
                    opacity={0.28}
                  />

                  {/* Main marker */}
                  <circle
                    r={3.5}
                    fill={
                      isIndia
                        ? "#D4AF37"
                        : "#52D3C8"
                    }
                    stroke="#FFFFFF"
                    strokeWidth={1.1}
                  />

                  {/* Country label */}
                  <text
                    x={location.labelX}
                    y={location.labelY}
                    textAnchor={location.anchor}
                    className={
                      isIndia
                        ? "map-country-label map-label-india"
                        : "map-country-label"
                    }
                  >
                    {location.name}
                  </text>

                </Marker>
              );
            }
          )}

        </ComposableMap>
      </div>

      {/* Footer */}
      <div className="map-footer">

        <div className="map-footer-caption">
          <Icon name="globe" size={19} />

          <span>
            India-based expertise.
            International delivery.
          </span>
        </div>

        <div className="map-legend">

          <span className="legend-item">
            <i className="legend-dot legend-gold" />
            Base
          </span>

          <span className="legend-item">
            <i className="legend-dot legend-teal" />
            Delivery
          </span>

        </div>

      </div>

    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section section-pad">
      <div className="container experience-grid">
        <div className="experience-copy">
          <p className="overline">INTERNATIONAL DELIVERY EXPERIENCE</p>
          <h1>Global Collaboration.<br /><span>Specialized Engineering.</span></h1>
          <p>Our experience includes delivering technology solutions and engineering services for organizations in the United States and Australia.</p>
          <p>We combine technical expertise, close collaboration, and flexible engagement options to support projects, product teams, and ongoing application needs.</p>
          <a className="text-link dark-link" href="#about">More About Orchlay <Icon name="arrowUp" size={18} /></a>
        </div>
        <ExperienceMap />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about-section purple-section section-pad">
      <div className="container">
        <div className="about-top">
          <div className='about-left'>
            <p className="overline light-overline">ABOUT ORCHLAY</p>
            <h2>Microsoft Expertise.<br />Practical Engineering.<br /><span>Lasting Value.</span></h2>
          </div>
          <div className="about-intro">
            <p>Orchlay Solutions Pvt Ltd is a technology services company focused on Microsoft technologies, enterprise applications, data platforms, analytics, and business process automation.</p>
            <p>We translate requirements into practical, maintainable solutions from architecture and implementation through modernization and ongoing support.</p>
          </div>
        </div>
        <div className="process-section">
          <div className="process-title"><span>OUR APPROACH</span><h3>Built around the way your business works.</h3></div>
          <div className="process-grid">
            {process.map(([number, title, body]) => <div className="process-card" key={number}>
              <span className="process-number">{number}</span>
              <h4>{title}</h4>
              <p>{body}</p>
            </div>)}
          </div>
        </div>
        <div className="why-panel">
          <div><p className="overline light-overline">WHY ORCHLAY</p><h3>Thoughtful solutions. Reliable engineering.</h3></div>
          <ul>{reasons.map(reason => <li key={reason}><Icon name="check" size={18} />{reason}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container">
        <div className="section-heading centered contact-heading">
          <p className="overline light-overline">LET'S TALK</p>
          <h2>Get in Touch<span className="cyan-period">.</span></h2>
          <p>Have a Microsoft technology challenge to solve? Let's discuss how Orchlay can help you design, build, modernize, and support the right solution.</p>
        </div>
        <div className="contact-cards">
          <div className="contact-info-card"><span><Icon name="pin" size={28} /></span><h3>Address</h3><p>708 Veronica, Vasant Oasis, Makwana Road, Marol Andheri East Mumbai - 400059</p></div>
          <div className="contact-info-card"><span><Icon name="mail" size={28} /></span><h3>Email</h3><p>info@orchlay.com</p></div>
          <div className="contact-info-card"><span><Icon name="phone" size={28} strokeWidth={1.8}/></span><h3>Call Us</h3><p>+91 2265023396</p></div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand compact />
        <div className='footer-middle'>
        <p>Microsoft technology services,</p> 
        <p>thoughtfully engineered.</p>
        </div>
        <div className="footer-right">
          <span>© {new Date().getFullYear()} Orchlay Solutions Pvt Ltd</span>
          <span>Developed By  <a href='https://blmindia.com/'>Big Leaf Media</a> </span>
         
        </div>
      </div>
       <a
        href="#home"
        className="footer-back-to-top"
        aria-label="Back to top"
      >
        ↑
      </a>
    </footer>
  )
}

export default function App() {
  return <>
    <a className="skip-link" href="#services">Skip to content</a>
    <Header/>
    <main>
      <Hero />
      <Services />

      {/* <ServiceSlider/> */}
      <Acterys />
      <Experience />
      <Team />
      <About />
      <Contact />
    </main>
    <Footer />
   
  </>
}
