import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from './Icon.jsx';
import './HeroServiceEcosystem.css';

const heroServices = [
  {
    id: 'cloud',
    title: 'Cloud Services',
    icon: 'globe',
    href: '#cloud',
  },
  {
    id: 'acterys',
    title: 'Acterys',
    icon: 'home',
    href: '#acterys',
  },
  {
    id: 'managed-it',
    title: 'Managed IT Services',
    icon: 'support',
    href: '#managed',
  },
  {
    id: 'professional',
    title: 'Professional Services',
    icon: 'code',
    href: '#professional',
  },
  {
    id: 'infrastructure',
    title: 'IT Infrastructure',
    icon: 'database',
    href: '#infrastructure',
  },
];

function HeroServiceEcosystem() {
  const rootRef = useRef(null);
  const centerImageRef = useRef(null);
  const orbitRefs = useRef([]);
  const serviceRefs = useRef([]);
  const nodeRefs = useRef([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Always show elements first, then animate
      gsap.set('.ecosystem-center', { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set('.ecosystem-service-inner', { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set('.ecosystem-orbit-path', { strokeDashoffset: 0 });

      if (prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      });

      // Animation A: Central Illustration Entrance
      timeline.from('.ecosystem-center', {
        autoAlpha: 0,
        y: 20,
        scale: 0.94,
        duration: 1.1,
      });

      // Animation B: Orbit Line Drawing
      orbitRefs.current.forEach((orbit, index) => {
        if (!orbit) return;
        const length = orbit.getTotalLength();
        gsap.set(orbit, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        timeline.to(
          orbit,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          index === 0 ? '-=0.6' : '-=1.2'
        );
      });

      // Animation C: Staggered Service Card Entrance
      timeline.from(
        '.ecosystem-service-inner',
        {
          autoAlpha: 0,
          y: 14,
          scale: 0.96,
          stagger: 0.12,
          duration: 0.65,
          clearProps: 'opacity,visibility,transform',
        },
        '-=1.0'
      );

      // Animation D: Moving Orbit Nodes
      const orbitConfig = {
        cx: 300,
        cy: 300,
        rx: 235,
        ry: 220,
      };

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const startAngle = (index * Math.PI * 2) / nodeRefs.current.length;
        const proxy = { angle: startAngle };

        gsap.to(proxy, {
          angle: startAngle + Math.PI * 2,
          duration: 22 + index * 3,
          repeat: -1,
          ease: 'none',
          onUpdate: () => {
            const x = orbitConfig.cx + orbitConfig.rx * Math.cos(proxy.angle);
            const y = orbitConfig.cy + orbitConfig.ry * Math.sin(proxy.angle);
            gsap.set(node, {
              attr: {
                cx: x,
                cy: y,
              },
            });
          },
        });
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-service-ecosystem" ref={rootRef} aria-hidden="true">
      {/* Orbit SVG */}
      <svg className="ecosystem-orbit-svg" viewBox="0 0 600 600" aria-hidden="true">
        <ellipse
          ref={el => orbitRefs.current[0] = el}
          className="ecosystem-orbit-path ecosystem-orbit-path--outer"
          cx="300"
          cy="300"
          rx="235"
          ry="220"
          fill="none"
          stroke="#008C83"
          strokeOpacity="0.35"
          strokeWidth="1.4"
        />
        <ellipse
          ref={el => orbitRefs.current[1] = el}
          className="ecosystem-orbit-path ecosystem-orbit-path--inner"
          cx="300"
          cy="300"
          rx="190"
          ry="177"
          fill="none"
          stroke="#5FBBC4"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        {/* Moving orbit nodes */}
        <circle
          ref={el => nodeRefs.current[0] = el}
          className="ecosystem-orbit-node ecosystem-orbit-node--teal"
          r="4"
          fill="#008C83"
        />
        <circle
          ref={el => nodeRefs.current[1] = el}
          className="ecosystem-orbit-node ecosystem-orbit-node--gold"
          r="3"
          fill="#D4AF37"
        />
        <circle
          ref={el => nodeRefs.current[2] = el}
          className="ecosystem-orbit-node ecosystem-orbit-node--teal"
          r="4"
          fill="#008C83"
        />
      </svg>

      {/* Central Technology Illustration */}
      <div className="ecosystem-center-wrapper">
        <img
          ref={centerImageRef}
          src="/assets/hero_center.png"
          alt="Orchlay technology ecosystem representing cloud, infrastructure, analytics and professional services"
          className="ecosystem-center ecosystem-center-image"
          draggable={false}
        />
      </div>

      {/* Service Cards */}
      {heroServices.map((service, index) => (
        <div
          key={service.id}
          className="ecosystem-service-position"
          style={{
            left: `${getServicePosition(service.id).x}%`,
            top: `${getServicePosition(service.id).y}%`,
          }}
        >
          <a
            ref={el => serviceRefs.current[index] = el}
            href={service.href}
            className="ecosystem-service ecosystem-service-inner"
            aria-label={`Explore ${service.title}`}
          >
            <Icon name={service.icon} size={18} />
            <span className="ecosystem-service-title">{service.title}</span>
          </a>
        </div>
      ))}
    </div>
  );
}

function getServicePosition(id) {
  const positions = {
    cloud: { x: 50, y: 12 },
    acterys: { x: 13, y: 32 },
    'managed-it': { x: 87, y: 32 },
    professional: { x: 15, y: 77 },
    infrastructure: { x: 85, y: 77 },
  };
  return positions[id] || { x: 50, y: 50 };
}

export default HeroServiceEcosystem;
