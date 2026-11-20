import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm.jsx'
import Icon from './components/Icon.jsx'
import {
  acterysServices,
  primaryServices,
  professionalSubservices,
  professionalTechnologies,
  managedITServices,
  infrastructureServices,
  cloudServices,
} from './data/content.js'
import Team from "./components/Team";
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from "react-simple-maps";
import worldData from "world-atlas/countries-110m.json";

const process = [
  ['01', 'Understand', 'Clarify business goals, user needs, challenges and constraints.'],
  ['02', 'Design', 'Shape the right solution, architecture and delivery approach.'],
  ['03', 'Deliver', 'Build, implement, validate and transition with accountability.'],
  ['04', 'Evolve', 'Support, optimise and adapt as needs and technologies change.'],
]

const values = [
  ['Focused Expertise', 'Specialist skills and practical experience in the technologies and disciplines that matter to your business.'],
  ['Agility by Nature', 'A responsive, adaptable approach that keeps collaboration close and decisions moving.'],
  ['AI-ready Mindset', 'Continuously evolving our capabilities and applying AI and emerging technologies where they create real value.'],
  ['Direct Accountability', 'Clear communication, ownership and meaningful involvement from experienced professionals.'],
]

function Brand({ compact = false, light = false }) {
  const logoSrc =
    compact || light
      ? '/assets/logo_white.png'
      : '/assets/logo_color.png'

  return (
    <a
      href="#home"
      className={`brand${compact ? ' brand-compact' : ''}`}
      aria-label="Orchlay Solutions - Back to Home"
    >
      <img
        src={logoSrc}
        alt="Orchlay Solutions"
        className="brand-logo"
      />
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [professionalOpen, setProfessionalOpen] = useState(false)

  function closeNavigation() {
    setMenuOpen(false)
    setProfessionalOpen(false)
  }

  function toggleNavigation() {
    setProfessionalOpen(false)
    setMenuOpen(open => !open)
  }

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeNavigation()
      }
    }

    // Restore the regular header when a phone rotates to desktop width.
    const desktopQuery = window.matchMedia('(min-width: 901px)')

    function handleDesktopChange(event) {
      if (event.matches) {
        closeNavigation()
      }
    }

    document.addEventListener('keydown', handleEscape)
    desktopQuery.addEventListener('change', handleDesktopChange)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      desktopQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  return (
    <header className={`site-header${menuOpen ? ' mobile-menu-open' : ''}`}>
      <div className="container header-inner">
        <Brand light={menuOpen} />

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={toggleNavigation}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          <div className="nav-scroll-area">
            <div
              className={`nav-dropdown${professionalOpen ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={professionalOpen}
                aria-controls="professional-services-menu"
                onClick={() => setProfessionalOpen(open => !open)}
              >
                Professional Services
                <Icon name="chevron" size={14} />
              </button>

              <div
                id="professional-services-menu"
                className="nav-dropdown-menu"
              >
                <a href="#professional" onClick={closeNavigation}>
                  Professional Services overview
                </a>
                <a href="#data-bi" onClick={closeNavigation}>
                  Data &amp; BI
                </a>
                <a href="#modern-workplace" onClick={closeNavigation}>
                  Modern Workplace
                </a>
                <a href="#app-engineering" onClick={closeNavigation}>
                  Application Engineering
                </a>
                <a href="#modernisation" onClick={closeNavigation}>
                  Modernisation
                </a>
                <a href="#emerging-tech" onClick={closeNavigation}>
                  AI &amp; Emerging Technologies
                </a>
              </div>
            </div>

            <a href="#acterys" onClick={closeNavigation}>Acterys</a>
            <a href="#managed" onClick={closeNavigation}>Managed IT</a>
            <a href="#infrastructure" onClick={closeNavigation}>
              IT Infrastructure
            </a>
            <a href="#cloud" onClick={closeNavigation}>Cloud Services</a>
            <a href="#about" onClick={closeNavigation}>About</a>
            <a href="#team" onClick={closeNavigation}>Our Team</a>
          </div>

          <a
            href="#contact"
            className="contact-btn"
            onClick={closeNavigation}
          >
            Contact us
          </a>
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
          <p className="overline light-overline"><span className="overline-bar" /> ORCHLAY SOLUTIONS</p>
          <h1>Technology.<br /><span>Expertise. Transformation.</span></h1>
          <p className="hero-lede">We help organisations build, manage and evolve their technology environments — combining specialist people, professional services, infrastructure and cloud capabilities to solve real business challenges.</p>
          <div className="hero-actions">
            <a className="button button-cyan" href="#contact">Talk to our team <Icon name="arrow" size={18} /></a>
            <a className="text-link light-link" href="#services">Explore our services <Icon name="arrowUp" size={18} /></a>
          </div>
          <div className="hero-footnote"><span className="footnote-line" /> PROFESSIONAL EXPERTISE · RELIABLE DELIVERY · BUSINESS-FOCUSED OUTCOMES</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <img src="/assets/hero11.png" alt="" />
          <span className="floating-badge badge-top">DATA + AI</span>
          <span className="floating-badge badge-bottom">BUILD / MODERNIZE</span>
        </div>
      </div>
      <div className="container portfolio-section">
        <div className="portfolio-heading">
          <span>Our service portfolio</span>
        </div>
        <div className="portfolio-grid">
          <div><strong>Professional Services</strong><span>Consulting · Engineering · Modernisation</span></div>
          <div><strong>Acterys</strong><span>Planning · Budgeting · Analytics</span></div>
          <div><strong>Managed IT Services</strong><span>Technical staffing · Augmentation</span></div>
          <div><strong>IT Infrastructure</strong><span>Networking · Enterprise compute</span></div>
          <div><strong>Cloud Services</strong><span>Assessment · Migration · Management</span></div>
          <div><strong>Technology Advisory</strong><span>Architecture · Roadmaps · Optimisation</span></div>
        </div>
        <p className="portfolio-footer">The right expertise. The right technology. A delivery model built around your business.</p>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="services-section section-pad">
      <div className="container">
        <div className="section-heading centered">
          <p className="overline">OUR SERVICE AREAS</p>
          <h2>One Service Provider. Five core service areas.</h2>
          <p>From specialist consulting to ongoing operations, Orchlay supports the technology that keeps your organisation moving.</p>
        </div>
        <div className="primary-services-grid">
          {primaryServices.map((service, index) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className={`primary-service-card primary-service-${index + 1}`}
            >
              <span className="primary-service-number">{service.number}</span>
              <h3>{service.heading}</h3>
              <p>{service.description}</p>
              <strong className="primary-service-name">{service.short}</strong>
            </a>
          ))}
          <div className="primary-service-card delivery-card">
            <span className="primary-service-number">+</span>
            <h3>Designed around your needs</h3>
            <p>Flexible engagement models — project delivery, specialist augmentation, advisory and ongoing service support.</p>
            <strong className="primary-service-name">Delivery Approach</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProfessionalServices() {
  const [hoveredService, setHoveredService] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [isTouch, setIsTouch] = useState(false)
  const activeService = hoveredService ?? selectedService


  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
    window.addEventListener('touchstart', checkTouch, { once: true })
    return () => window.removeEventListener('touchstart', checkTouch)
  }, [])

  const handleCardClick = (serviceId) => {
    setHoveredService(null)
    setSelectedService((current) => current === serviceId ? null : serviceId)
  }

  const handleCardEnter = (event, serviceId) => {
    if (
      event.pointerType === 'mouse' &&
      window.matchMedia('(min-width: 769px)').matches
    ) {
      setHoveredService(serviceId)
    }
  }

  const handleCardLeave = () => {
    setHoveredService(null)
  }

  const handleAreaLeave = () => {
    if (!selectedService) {
      setHoveredService(null)
    }
  }

  const closePanel = () => {
    setHoveredService(null)
    setSelectedService(null)
  }

  const technologies = professionalTechnologies[activeService] ?? []

  return (
    <section id="professional-detail" className="professional-section section-pad">
      <div className="container">
        <div className="detail-layout" id="professional" onMouseLeave={handleAreaLeave}>
          <div className="detail-intro">
            <p className="overline">01 / PROFESSIONAL SERVICES</p>
            <h2>Deep expertise across platforms and technologies.</h2>
            <p>Our professional services bring together consulting, solution design and engineering to help organisations solve complex problems and get more from their technology investments.</p>
            <ul className="detail-points">
              <li><Icon name="check" size={16} />Business-led discovery, architecture and solution design</li>
              <li><Icon name="check" size={16} />Implementation, integration, testing and deployment</li>
              <li><Icon name="check" size={16} />Application lifecycle, optimisation and support</li>
              <li><Icon name="check" size={16} />Microsoft expertise complemented by modern and emerging technologies</li>
            </ul>
          </div>
          <div className="professional-subservices"  onPointerLeave={() => setHoveredService(null)}>
            {professionalSubservices.map((service, index) => {
              const isSelected = selectedService === service.id
              const isOpen = activeService === service.id
              const cardRow = Math.floor(index / 2) * 2 + 1
              return (
                <React.Fragment key={service.id}>
                  <button
                    id={service.id}
                    className={`professional-card${isOpen ? ' is-active' : ''}${isSelected ? ' is-selected' : ''}`}
                    style={{
                      '--card-row': cardRow,
                      '--card-column': (index % 2) + 1,
                    }}
                    onClick={() => handleCardClick(service.id)}
                    onPointerEnter={(event) => handleCardEnter(event, service.id)}
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? `tech-panel-${service.id}` : undefined}
                    type="button"
                  >
                    <div className="professional-card-inner">
                      <div className="professional-card-header">
                        <h3>{service.title}</h3>
                        <span className="professional-card-arrow" aria-hidden="true">
                          <Icon name="arrowDown" size={16} />
                        </span>
                      </div>
                      <p>{service.description}</p>
                      <span className="professional-card-explore">Explore technologies</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`tech-panel-${service.id}`}
                      className="tech-panel-inline"
                      style={{ '--panel-row': cardRow + 1 }}
                      role="region"
                      aria-label={`Technologies for ${service.title}`}
                    >
                      <div className="tech-panel-inner">
                        <div className="tech-panel-header">
                          <p className="tech-panel-kicker">TECHNOLOGIES WE WORK WITH</p>
                          {/* <h2>{service.title}</h2> */}
                          {/* <button
                            className="tech-panel-close"
                            onClick={() => setSelectedService(null)}
                            aria-label="Close technology panel"
                            type="button"
                          >
                            <Icon name="close" size={20} />
                          </button> */}
                        </div>
                        <div className="tech-panel-logos">
                          {technologies.map((tech) => (
                            <div key={tech.name} className="tech-logo-item">
                              <img
                                src={tech.logo}
                                alt={tech.name}
                                className="tech-logo"
                                loading="lazy"
                              />
                              <span className="tech-logo-name">{tech.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ManagedIT() {
  const serviceIcons = {
    'Technical Staffing': (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4.6V20" />
      </>
    ),
    'Resource Augmentation': (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    'Managed Support': (
      <>
        <path d="M4 14v-3a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-3" />
        <rect x="3" y="11" width="4" height="7" rx="2" />
        <rect x="17" y="11" width="4" height="7" rx="2" />
      </>
    ),
    'Delivery Continuity': (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5" />
      </>
    ),
  }

  return (
    <section id="managed-detail" className="managed-section section-pad">
      <div className="container">
        <div id="managed" className="managed-it-band">
          <div className="managed-it-band__intro">
            <div className="managed-it-band__heading">
              <p className="overline">03 / MANAGED IT SERVICES</p>
              <h2>
                <span>Extend your team.</span>{' '}
                <span>Strengthen delivery.</span>
              </h2>
            </div>

            <div className="managed-it-band__summary">
              <p>
                Access specialist technology skills and flexible capacity through
                technical staffing and resource augmentation. We help you scale
                delivery teams, fill capability gaps and support ongoing
                technology operations.
              </p>

              <a className="button button-cyan" href="#contact">
                Discuss your resourcing needs
                <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>

          <div className="managed-it-band__services">
            {managedITServices.map((service) => (
              <article
                key={service.title}
                className="managed-it-band__service"
              >
                {serviceIcons[service.title] && (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {serviceIcons[service.title]}
                  </svg>
                )}

                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
function Infrastructure() {
  return (
    <section id="infrastructure-detail" className="infrastructure-section section-pad">
      <div className="container">
        <div className="infra-diagram" id="infrastructure">
          <div className="detail-intro">
            <p className="overline">04 / IT INFRASTRUCTURE SERVICES</p>
            <h2>Build dependable technology foundations.</h2>
            <p>We support the technology foundations that enable your business — from enterprise networking and datacenter infrastructure through to enterprise compute environments.</p>
            <ul className="detail-points">
              <li><Icon name="check" size={16} />Infrastructure assessment and solution planning</li>
              <li><Icon name="check" size={16} />Network and compute implementation</li>
              <li><Icon name="check" size={16} />Infrastructure upgrades and lifecycle support</li>
              <li><Icon name="check" size={16} />Operational reliability and performance focus</li>
            </ul>
            <a className="button button-cyan" href="#contact">Discuss infrastructure requirements <Icon name="arrow" size={18} /></a>
          </div>
          <div className="infra-diagram__panel">
            <img
              className="infra-diagram__tower"
              src="/images/infrastructure-tower.png"
              alt=""
            />

            <div className="infra-diagram__labels">
              {infrastructureServices.map((service) => (
                <article className="infra-diagram__label" key={service.title}>
                  <svg
                    className="infra-diagram__connector"
                    viewBox="0 0 48 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M2 21 13 6h32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="2" cy="21" r="2" fill="currentColor" />
                    <circle cx="45" cy="6" r="2" fill="currentColor" />
                  </svg>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CloudServices() {
  const [hoveredTitle, setHoveredTitle] = useState(null)
  const [pinnedTitle, setPinnedTitle] = useState(null)
  const activeTitle = hoveredTitle ?? pinnedTitle
  // Decorative icons follow the lifecycle sequence shown in Design 1.
 const iconPaths = {
  'Cloud Assessment':
    'M9 5H6a1 1 0 0 0-1 1v14h14V6a1 1 0 0 0-1-1h-3 M9 3h6v4H9z M8 13l2 2 5-5',

  'Cloud Migration':
    'M7 18H6a4 4 0 0 1-.6-8 6.5 6.5 0 0 1 12.4-1.5A4.8 4.8 0 0 1 19 18h-2 M12 21V12m-3 3 3-3 3 3',

  'Cloud Optimisation':
    'M3 21h18 M4 13h3v8H4z M10 9h3v12h-3z M16 4h3v17h-3z',

  'Cloud Management':
    'M3 6h4m4 0h10 M3 12h10m4 0h4 M3 18h6m4 0h8 M11 6a2 2 0 1 1-4 0 2 2 0 1 1 4 0 M17 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0 M13 18a2 2 0 1 1-4 0 2 2 0 1 1 4 0',

  // Connected nodes for hybrid infrastructure
  'Hybrid & Integration':
    'M9 3h6v5H9z M12 8v5 M5 16v-3h14v3 M2 16h6v5H2z M16 16h6v5h-6z',

  // Compass for advisory and strategy
  'Cloud Advisory':
    'M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0 M16 8l-2.5 5.5L8 16l2.5-5.5z',
}

function toggleService(title) {
  setHoveredTitle(null)
  setPinnedTitle((current) => current === title ? null : title)
}

  return (
    <section id="cloud-detail" className="cloud-section section-pad">
      <div className="container">
        <div className="cloud-lifecycle" id="cloud">
          <div className="cloud-lifecycle__header">
            <div>
              <p className="overline">05 / CLOUD SERVICES</p>
              <h2>Assess. Migrate. Optimise. Manage.</h2>
            </div>

            <p className="cloud-lifecycle__intro">
              Make informed cloud decisions and get lasting value from your
              cloud environment with services across the cloud lifecycle.
            </p>
          </div>

          <ol
            className="cloud-lifecycle__rail"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setHoveredTitle(null)
                setPinnedTitle(null)
              }
            }}
          >
            {cloudServices.map((service, index) => {
              const isOpen = activeTitle === service.title
              const descriptionId = `cloud-service-description-${index}`

              return (
                <li
                  key={service.title}
                  className="cloud-lifecycle__stage"
                  onPointerLeave={() => setHoveredTitle(null)}
                >
                  <button
                    type="button"
                    className="cloud-lifecycle__node"
                    aria-label={`${service.title} details`}
                    aria-expanded={isOpen}
                    aria-controls={descriptionId}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') {
                        setHoveredTitle(service.title)
                      }
                    }}
                    onClick={() => toggleService(service.title)}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d={iconPaths[service.title]} />
                    </svg>
                  </button>

                  <div className="cloud-lifecycle__copy">
                    <h3>{service.title}</h3>
                    <p id={descriptionId} hidden={!isOpen}>
                      {service.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Acterys() {
  const [active, setActive] = useState(0)
  const selected = acterysServices[active]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
              02 / ACTERYS
            </p>

            <h2>
              Planning that connects with your data<span className="cyan-period">.</span>
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
            <span className="partner-kicker">PLANNING & DECISION INTELLIGENCE</span>
            <h3>Connect planning, performance<br /><span>and analytics.</span></h3>
            <p>Orchlay supports Acterys-related planning and analytics initiatives, helping organisations design and implement connected planning workflows using Acterys and Microsoft technologies.</p>
            <ul className="acterys-capabilities">
              <li><Icon name="check" size={16} />Budgeting, forecasting and financial planning</li>
              <li><Icon name="check" size={16} />Power BI-based planning and write-back scenarios</li>
              <li><Icon name="check" size={16} />Data integration, modelling and reporting alignment</li>
              <li><Icon name="check" size={16} />Implementation, enablement and ongoing optimisation</li>
            </ul>
            {/* Technology Partner */}
            <div className="acterys-partnership">
              <div className="partnership-heading">
                <div className="partnership-icon">
                  <Icon name="check" size={14} />
                </div>
                <span>SERVICE PROVIDER</span>
              </div>
              <div className="partnership-logo-wrap">
                <img
                  src="/assets/acterys.svg"
                  alt="Acterys"
                  className="partnership-logo"
                />
              </div>
              <p className="partnership-description">
                Certified provider for connected planning, budgeting and analytics solutions powered by Acterys and Microsoft technologies.
              </p>
            </div>
            <div className="acterys-actions">

              <a
                href="#contact"
                className="button acterys-primary-btn"
              >
                Discuss an Acterys project
                <Icon name="arrow" size={18} />
              </a>

              <a
                href="https://acterys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="button acterys-secondary-btn"
              >
                Explore Acterys
                <Icon name="arrowUp" size={18} />
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

// function Experience() {
//   return (
//     <section
//       id="experience"
//       className="orchlay-about__experience"
//       aria-labelledby="experience-heading"
//     >
//       <div className="container">
//         <p className="overline">INTERNATIONAL DELIVERY EXPERIENCE</p>
//         <h3 id="experience-heading">
//           Global Collaboration.<br />
//           Specialized Engineering.
//         </h3>

//         <div className="orchlay-about__map">
//           <ExperienceMap />
//         </div>

//         <div className="orchlay-about__experience-copy">
//           <p>
//             Our experience includes delivering technology solutions and
//             engineering services for organizations in the United States
//             and Australia.
//           </p>
//           <p>
//             We combine technical expertise, close collaboration, and flexible
//             engagement options to support projects, product teams, and ongoing
//             application needs.
//           </p>
//         </div>

//         <a className="orchlay-about__link" href="#about">
//           More About Orchlay <Icon name="arrowUp" size={18} />
//         </a>
//       </div>
//     </section>
//   )
// }

function About() {
  return (
    <section id="about" className="about-profile" aria-labelledby="about-title">
      <header className="about-profile__hero">
        <div className="container about-profile__hero-inner">
          <div className="about-profile__brief">
            <p className="about-profile__eyebrow">ABOUT ORCHLAY</p>

            <h2 id="about-title">
              Focused expertise.<br />
              Agile by nature.<br />
              Ready for what's next.
            </h2>

            <p>
              Technology is evolving at an extraordinary pace. AI, cloud, data
              and digital platforms are changing how organisations operate. We
              believe businesses need partners who combine deep specialist
              knowledge with the agility to adapt and deliver.
            </p>

            <p>
              Orchlay brings together experienced professionals and niche
              expertise across professional services, Acterys, managed IT,
              infrastructure and cloud. We focus on close collaboration,
              practical execution and outcomes that matter to our clients.
            </p>
          </div>

          <div id="experience" className="about-profile__map">
            <ExperienceMap />
          </div>
        </div>
      </header>

      <div className="container about-profile__body">
        <section aria-labelledby="about-values-title">
          <p className="about-profile__eyebrow">WHY ORCHLAY</p>
          <h3 id="about-values-title">Our value proposition</h3>
          <p className="about-profile__summary">
            The strengths we bring to every client engagement.
          </p>

          <div className="about-profile__values">
            {values.map(([title, body]) => (
              <article className="about-profile__value" key={title}>
                <h4>{title}</h4>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
</div>
        <section className="work-sequence" aria-labelledby="about-process-title">
          <div className="container">
            <p className="work-sequence__eyebrow">HOW WE WORK</p>

            <h3 id="about-process-title">
              From understanding to continuous improvement.
            </h3>

            <p className="work-sequence__intro">
              A clear, collaborative delivery approach that takes each engagement
              from the initial business need through to ongoing improvement.
            </p>

            <ol className="work-sequence__list">
              {process.map(([number, title, body]) => (
                <li key={number}>
                  <span className="work-sequence__number" aria-hidden="true">
                    {String(number).padStart(2, '0')}
                  </span>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container">
        <div className="section-heading centered contact-heading">
          <p className="overline light-overline">LET'S TALK</p>
          <h2>Tell us what you need to achieve<span className="cyan-period">.</span></h2>
          <p>Share a few details about your requirement and our team can follow up to discuss the right service and engagement approach.</p>
        </div>
        <div className="contact-cards">
          <div className="contact-info-card"><span><Icon name="pin" size={28} /></span><h3>Address</h3><p>708 Veronica, Vasant Oasis, Makwana Road, Marol Andheri East Mumbai - 400059</p></div>
          <div className="contact-info-card"><span><Icon name="mail" size={28} /></span><h3>Email</h3><p>info@orchlay.com</p></div>
          <div className="contact-info-card"><span><Icon name="phone" size={28} strokeWidth={1.8} /></span><h3>Call Us</h3><p>+91 2265023396</p></div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="closing-cta section-pad">
      <div className="container closing-cta-inner">
        <div>
          <p className="overline">START A CONVERSATION</p>
          <h2>Let's solve your next technology challenge.</h2>
        </div>
        <div>
          <p>Whether you need specialist skills, a new solution, infrastructure support or a clearer cloud roadmap, start a conversation with Orchlay.</p>
          <a className="button button-cyan" href="#contact">Talk to Orchlay <Icon name="arrow" size={18} /></a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand compact />

            <p className="footer-description">
              Technology. Expertise. Transformation. Professional services,
              Acterys, managed IT, infrastructure and cloud services.
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#professional">Professional Services</a>
            <a href="#acterys">Acterys</a>
            <a href="#managed">Managed IT</a>
            <a href="#infrastructure">IT Infrastructure</a>
            <a href="#cloud">Cloud Services</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <small className="footer-copyright">
            © {new Date().getFullYear()} Orchlay Solutions Pvt Ltd. All rights
            reserved.
          </small>

          <small className="footer-credit">
            Developed by <a href="https://blmindia.com/">Big Leaf Media</a>
          </small>

          <div className="footer-end">
            <small>United States · Australia · India delivery experience</small>

            <a href="#home" className="footer-back-to-top" aria-label="Back to top">
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default function App() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">
      <Hero />
      <Services />
      <ProfessionalServices />
      <Acterys />
      <ManagedIT />
      <Infrastructure />
      <CloudServices />
      <About />
      <Team />
      <ClosingCTA />
      <Contact />
    </main>
    <Footer />

  </>
}
