import React, { useState, useEffect, useRef } from 'react'
import ContactForm from './components/ContactForm.jsx'
import Icon from './components/Icon.jsx'
import TextType from './components/TextType.jsx'
import ProfessionalFlipCard from './components/ProfessionalFlipCard.jsx'
import HeroServiceEcosystem from './components/HeroServiceEcosystem.jsx'
import 'animate.css';
import Particles from "./components/Particles";
import CircularText from "./components/CircularText/CircularText";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

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

// Demo LinkedIn URL - replace with official company page URL when available
const LINKEDIN_URL = " https://www.linkedin.com/company/orchlay/";

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
  const [servicesOpen, setServicesOpen] = useState(false)
  const [professionalSubmenuOpen, setProfessionalSubmenuOpen] = useState(false)
  const servicesTimeoutRef = useRef(null)
  const submenuTimeoutRef = useRef(null)

  function closeNavigation() {
    setMenuOpen(false)
    setServicesOpen(false)
    setProfessionalSubmenuOpen(false)
  }

  function toggleNavigation() {
    setServicesOpen(false)
    setProfessionalSubmenuOpen(false)
    setMenuOpen(open => !open)
  }

  function toggleServicesDropdown() {
    setServicesOpen(open => !open)
    setProfessionalSubmenuOpen(false)
  }

  function toggleProfessionalSubmenu(event) {
    event.stopPropagation()
    setProfessionalSubmenuOpen(open => !open)
  }

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
      }
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }
    }
  }, [])

  function handleServicesEnter() {
    if (window.matchMedia('(min-width: 901px)').matches) {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
      }
      setServicesOpen(true)
    }
  }

  function handleServicesLeave() {
    if (window.matchMedia('(min-width: 901px)').matches) {
      servicesTimeoutRef.current = setTimeout(() => {
        setServicesOpen(false)
        setProfessionalSubmenuOpen(false)
      }, 150)
    }
  }

  function handleSubmenuEnter() {
    if (window.matchMedia('(min-width: 901px)').matches) {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current)
      }
      setProfessionalSubmenuOpen(true)
    }
  }

  function handleSubmenuLeave() {
    if (window.matchMedia('(min-width: 901px)').matches) {
      submenuTimeoutRef.current = setTimeout(() => {
        setProfessionalSubmenuOpen(false)
      }, 150)
    }
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

  // Navigation data structure for future scalability
  const navigationData = {
    services: {
      label: 'Services Offered',
      items: [
        {
          id: 'professional',
          label: 'Professional Services',
          href: '#professional',
          hasSubmenu: true,
          submenu: [
            { id: 'professional-overview', label: 'Professional Services Overview', href: '#professional' },
            { id: 'data-bi', label: 'Data & BI', href: '#data-bi' },
            { id: 'modern-workplace', label: 'Modern Workplace', href: '#modern-workplace' },
            { id: 'app-engineering', label: 'Application Engineering', href: '#app-engineering' },
            { id: 'modernisation', label: 'Modernisation', href: '#modernisation' },
            { id: 'emerging-tech', label: 'AI & Emerging Technologies', href: '#emerging-tech' },
            { id: 'advisory', label: 'Advisory & Architecture', href: '#advisory' },
          ]
        },
        { id: 'acterys', label: 'Acterys', href: '#acterys' },
        { id: 'managed', label: 'Managed IT Services', href: '#managed' },
        { id: 'infrastructure', label: 'IT Infrastructure Services', href: '#infrastructure' },
        { id: 'cloud', label: 'Cloud Services', href: '#cloud' },
      ]
    },
    otherLinks: [
      { id: 'about', label: 'About', href: '#about' },
      { id: 'team', label: 'Our Team', href: '#team' },
    ]
  }

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
            {/* Services Offered Dropdown */}
            <div
              className={`nav-dropdown ${servicesOpen ? 'is-open' : ''}`}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={toggleServicesDropdown}
              >
                Services Offered
                <Icon name="chevron" size={14} />
              </button>

              <div
                id="services-menu"
                className="nav-dropdown-menu nav-dropdown-menu-wide"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                {navigationData.services.items.map((item) => (
                  <div
                    key={item.id}
                    className={`nav-dropdown-item ${item.hasSubmenu ? 'has-submenu' : ''} ${item.hasSubmenu && professionalSubmenuOpen ? 'submenu-open' : ''}`}
                    onMouseEnter={() => {
                      if (item.hasSubmenu && window.matchMedia('(min-width: 901px)').matches) {
                        handleSubmenuEnter()
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.hasSubmenu && window.matchMedia('(min-width: 901px)').matches) {
                        handleSubmenuLeave()
                      }
                    }}
                  >
                    {item.hasSubmenu ? (
                      <>
                        <button
                          type="button"
                          className="nav-submenu-trigger"
                          aria-expanded={professionalSubmenuOpen}
                          aria-controls={`${item.id}-submenu`}
                          onClick={toggleProfessionalSubmenu}
                        >
                          {item.label}
                          <Icon name="chevron" size={12} />
                        </button>
                        <div
                          id={`${item.id}-submenu`}
                          className="nav-submenu"
                          onMouseEnter={handleSubmenuEnter}
                          onMouseLeave={handleSubmenuLeave}
                        >
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem.id}
                              href={subItem.href}
                              onClick={closeNavigation}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </>
                    ) : (
                      <a href={item.href} onClick={closeNavigation}>
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Other Links */}
            {navigationData.otherLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeNavigation}
              >
                {link.label}
              </a>
            ))}
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
    <section id="home" className="hero  purple-section">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="overline light-overline"><span className="overline-bar" /> ORCHLAY SOLUTIONS</p>
          <h1 className="animate__animated animate__zoomInDown">Technology.<br /><span>Expertise. Transformation.</span></h1>
          <p className="hero-lede">
            <TextType
              as="span"
              text="We help organisations build, manage and evolve their technology environments — combining specialist people, professional services, infrastructure and cloud capabilities to solve real business challenges."
              typingSpeed={100}
              initialDelay={700}
              pauseDuration={5000}
              loop={false}
              showCursor={false}
              typeEffect="fade"
              mistakes={0}
              variableSpeed={{ min: 25, max: 45 }}
            />
          </p>
          <div className="hero-actions">
            <a className="button button-cyan" href="#contact">Talk to our team <Icon name="arrow" size={18} /></a>
            <a className="text-link light-link" href="#services">Explore our services <Icon name="arrowUp" size={18} /></a>
          </div>
          <div className="hero-footnote"><span className="footnote-line" /> PROFESSIONAL EXPERTISE · RELIABLE DELIVERY · BUSINESS-FOCUSED OUTCOMES</div>
        </div>
        <HeroServiceEcosystem />
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
          <a
            href="#how-we-work"
            className="primary-service-card delivery-card"
            aria-label="Explore How We Work - Delivery Approach"
          >
            <span className="primary-service-number">+</span>
            <h3>Designed around your needs</h3>
            <p>Flexible engagement models — project delivery, specialist augmentation, advisory and ongoing service support.</p>
            <strong className="primary-service-name">Delivery Approach</strong>
            <span className="delivery-card-arrow" aria-hidden="true">
              <Icon name="arrowDown" size={18} />
            </span>
          </a>
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
  <section
    id="professional-detail"
    className="professional-section section-pad"
  >
    <div className="container">
      <div className="detail-layout" id="professional">

        {/* LEFT SECTION — UNCHANGED */}
        <div className="detail-intro">
          <p className="overline">
            01 / PROFESSIONAL SERVICES
          </p>

          <h2>
            Deep expertise across platforms and technologies.
          </h2>

          <p>
            Our professional services bring together
            consulting, solution design and engineering to
            help organisations solve complex problems and
            get more from their technology investments.
          </p>

          <ul className="detail-points">
            <li>
              <Icon name="check" size={16} />
              Business-led discovery, architecture and
              solution design
            </li>

            <li>
              <Icon name="check" size={16} />
              Implementation, integration, testing
              and deployment
            </li>

            <li>
              <Icon name="check" size={16} />
              Application lifecycle, optimisation
              and support
            </li>

            <li>
              <Icon name="check" size={16} />
              Microsoft expertise complemented by
              modern and emerging technologies
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION — FLIP CARDS */}
        <div className="professional-subservices">
          {professionalSubservices.map((service) => (
            <ProfessionalFlipCard
              key={service.id}
              service={service}
              technologies={professionalTechnologies[service.id] ?? []}
            />
          ))}
        </div>

      </div>
    </div>
  </section>
);

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
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

useLayoutEffect(() => {
  const section = sectionRef.current;
  const panel = panelRef.current;

  if (!section || !panel) return;

  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const ctx = gsap.context(() => {
        const labels = gsap.utils.toArray(
          ".infra-diagram__label",
          panel
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.5}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        labels.forEach((label) => {
          const heading = label.querySelector("h3");
          const description = label.querySelector("p");

          if (!heading || !description) return;

          timeline.fromTo(
            [heading, description],
            {
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "none",
            }
          );

          timeline.to({}, { duration: 0.35 });
        });
      }, section);

      return () => ctx.revert();
    }
  );

  return () => mm.revert();
}, []);


  return (
    <section  ref={sectionRef} id="infrastructure-detail" className="infrastructure-section section-pad">
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
          <div className="infra-diagram__panel" ref={panelRef}>
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
  <section
    id="what-we-do"
    className="acterys-section purple-section section-pad"
  >
    {/* ========================================
        REACT BITS PARTICLES BACKGROUND
        ======================================== */}
    <div
      className="acterys-particles-bg"
      aria-hidden="true"
    >
      <Particles
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        alphaParticles={true}
        moveParticlesOnHover={false}
        particleHoverFactor={1}
        sizeRandomness={1}
        cameraDistance={20}
        pixelRatio={1}
      />
    </div>

    {/* ========================================
        EXISTING ACTERYS CONTENT
        ======================================== */}
    <div className="container">
      <div className="acterys-grid" id="acterys">

        {/* LEFT SIDE — VISUAL AND SLIDER */}
        <div className="acterys-visual">

          <p className="overline light-overline">
            02 / ACTERYS
          </p>

          <h2>
            Planning that connects with your data
            <span className="cyan-period">.</span>
          </h2>

          {/* Existing planning dashboard */}
          <div className="dashboard-frame">
            <img
              src="/assets/planning.svg"
              alt="Connected planning dashboard"
            />
          </div>

          {/* Existing service highlight / rotating text */}
          <div
            key={active}
            className="acterys-highlight"
            aria-live="off"
          >
            <span className="highlight-counter">
              0{active + 1} / 0{acterysServices.length}
            </span>

            <div
              key={active}
              className="acterys-slide-content"
            >
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

        {/* RIGHT SIDE — ACTERYS CONTENT */}
        <div className="acterys-copy">

          <span className="partner-kicker">
            PLANNING &amp; DECISION INTELLIGENCE
          </span>

          <h3>
            Connect planning, performance
            <br />
            <span>and analytics.</span>
          </h3>

          <p>
            Orchlay supports Acterys-related planning and
            analytics initiatives, helping organisations
            design and implement connected planning
            workflows using Acterys and Microsoft
            technologies.
          </p>

          <ul className="acterys-capabilities">
            <li>
              <Icon name="check" size={16} />
              Budgeting, forecasting and financial planning
            </li>

            <li>
              <Icon name="check" size={16} />
              Power BI-based planning and write-back scenarios
            </li>

            <li>
              <Icon name="check" size={16} />
              Data integration, modelling and reporting
              alignment
            </li>

            <li>
              <Icon name="check" size={16} />
              Implementation, enablement and ongoing
              optimisation
            </li>
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
              Certified provider for connected planning,
              budgeting and analytics solutions powered by
              Acterys and Microsoft technologies.
            </p>
          </div>

          {/* Action Buttons */}
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
);

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
          {Object.entries(locations).map(([key, location]) => {
            const isIndia = key === "india";

            return (
              <Marker
                key={key}
                coordinates={location.coordinates}
              >
                {/* Continuous expanding pulse */}
                <circle
                  className={`map-marker-pulse ${isIndia ? "pulse-india" : "pulse-delivery"
                    }`}
                  r={7}
                  fill="none"
                  stroke={isIndia ? "#D4AF37" : "#52D3C8"}
                  strokeWidth={1.8}
                />

                {/* Soft outer glow */}
                <circle
                  className={`map-marker-glow ${isIndia ? "glow-india" : "glow-delivery"
                    }`}
                  r={11}
                  fill={isIndia ? "#D4AF37" : "#52D3C8"}
                  opacity={0.12}
                />

                {/* Outer marker */}
                <circle
                  r={7}
                  fill={isIndia ? "#D4AF37" : "#52D3C8"}
                  opacity={0.28}
                />

                {/* Main blinking dot */}
                <circle
                  className={`map-marker-dot ${isIndia ? "dot-india" : "dot-delivery"
                    }`}
                  r={7.5}
                  fill={isIndia ? "#D4AF37" : "#52D3C8"}
                  stroke="#FFFFFF"
                  strokeWidth={2.1}
                />

                {/* Country label — unchanged */}
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
          })}


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
      <header className="about-profile__hero section-pad">
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

      <div className="container section-pad about-profile__body">
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
        
      <section
        id="how-we-work"
        className="work-sequence section-pad"
        aria-labelledby="about-process-title"
      >
        {/* Top-left decorative rotating text circle */}
        <div
          className="work-sequence__circle work-sequence__circle--top"
          aria-hidden="true"
        >
          <CircularText
            text="DISCOVER • DESIGN • DELIVER • EVOLVE • "
            spinDuration={25}
            direction="clockwise"
            size={170}
            fontSize={18}
            fontWeight={800}
            color="#55706e"
            ring={true}
            ringColor="rgba(0, 140, 131, 0.18)"
            draggable={false}
            hoverTilt={0}
            className="work-sequence__circular-text"
          />
        </div>

        {/* Bottom-right decorative rotating text circle */}
        <div
          className="work-sequence__circle work-sequence__circle--bottom"
          aria-hidden="true"
        >
          <CircularText
            text="COLLABORATE • IMPROVE • TRANSFORM • "
            spinDuration={30}
            direction="counterclockwise"
            size={170}
            fontSize={17}
            fontWeight={800}
            color="#55706e"
            ring={true}
            ringColor="rgba(212, 175, 55, 0.25)"
            draggable={false}
            hoverTilt={0}
            className="work-sequence__circular-text"
          />
        </div>

        {/* Existing section content — unchanged */}
        <div className="container">
          <p className="work-sequence__eyebrow">
            HOW WE WORK
          </p>

          <h3 id="about-process-title">
            From understanding to continuous improvement.
          </h3>

          <p className="work-sequence__intro">
            A clear, collaborative delivery approach that takes
            each engagement from the initial business need
            through to ongoing improvement.
          </p>

          <ol className="work-sequence__list">
            {process.map(([number, title, body]) => (
              <li key={number}>
                <span
                  className="work-sequence__number"
                  aria-hidden="true"
                >
                  {String(number).padStart(2, "0")}
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

          {/* Footer links + LinkedIn */}
          <div className="footer-navigation">

            {/* Navigation links — two columns on mobile */}
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#professional">Professional Services</a>
              <a href="#acterys">Acterys</a>
              <a href="#managed">Managed IT</a>
              <a href="#infrastructure">IT Infrastructure</a>
              <a href="#cloud">Cloud Services</a>
            </nav>

            {/* Separate social icons column */}
            <div className="footer-social">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orchlay Solutions on LinkedIn"
                className="footer-social-link"
              >
                <Icon name="linkedin" size={20} />
              </a>
            </div>

          </div>


        </div>

        <div className="footer-bottom">
          <small className="footer-copyright">
            © {new Date().getFullYear()} Orchlay Solutions Pvt Ltd.
            All rights reserved.
          </small>

          <small className="footer-credit">
            Developed by{" "}
            <a href="https://blmindia.com/">Big Leaf Media</a>
          </small>

          <div className="footer-end">
            <small>
              United States · Australia · India delivery experience
            </small>

            <a
              href="#home"
              className="footer-back-to-top"
              aria-label="Back to top"
            >
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
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
