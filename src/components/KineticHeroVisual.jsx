import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './KineticHeroVisual.css';

const KineticHeroVisual = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const trackRefs = useRef([]);
  const timelineRefs = useRef([]);

  // Words for kinetic typography
  const tracks = [
    ['INNOVATE', 'DESIGN', 'ENGINEER'],
    ['BUILD', 'MANAGE', 'EVOLVE'],
    ['CLOUD', 'DATA', 'TRANSFORM']
  ];

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Cleanup function for GSAP
    const cleanup = () => {
      timelineRefs.current.forEach(tl => tl.kill());
      timelineRefs.current = [];
      gsap.set(image, { clearProps: 'all' });
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(image, { opacity: 1, y: 0, scale: 1 });
      return cleanup;
    }

    // Image entrance animation
    const entranceTl = gsap.fromTo(image, 
      { opacity: 0, y: 30, scale: 0.96 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: 'power2.out',
        delay: 0.3
      }
    );
    timelineRefs.current.push(entranceTl);

    // Setup kinetic typography tracks
    trackRefs.current.forEach((track, index) => {
      if (!track) return;

      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      
      // Calculate distance for seamless loop
      const moveDistance = trackWidth - containerWidth;
      
      // Different speeds for each track
      const durations = [24, 30, 27]; // seconds per loop
      const duration = durations[index] || 24;
      const direction = index % 2 === 0 ? -1 : 1; // alternate directions

      // Initial position
      gsap.set(track, { x: 0 });

      // Infinite loop animation
      const tl = gsap.to(track, {
        x: direction * moveDistance,
        duration: duration,
        ease: 'none',
        repeat: -1
      });
      timelineRefs.current.push(tl);
    });

    // Cleanup on unmount
    return cleanup;
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Recalculate animations on resize
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        timelineRefs.current.forEach(tl => tl.kill());
        timelineRefs.current = [];

        trackRefs.current.forEach((track, index) => {
          if (!track) return;
          const trackWidth = track.scrollWidth;
          const containerWidth = containerRef.current?.clientWidth || 0;
          const moveDistance = trackWidth - containerWidth;
          const durations = [24, 30, 27];
          const duration = durations[index] || 24;
          const direction = index % 2 === 0 ? -1 : 1;

          gsap.set(track, { x: 0 });
          const tl = gsap.to(track, {
            x: direction * moveDistance,
            duration: duration,
            ease: 'none',
            repeat: -1
          });
          timelineRefs.current.push(tl);
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="kinetic-hero-visual" aria-hidden="true">
      {/* Kinetic Typography Background */}
      <div className="kinetic-tracks">
        {tracks.map((words, index) => (
          <div 
            key={index} 
            ref={el => trackRefs.current[index] = el}
            className="kinetic-track"
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="kinetic-word">
                {word}
                <span className="kinetic-separator">•</span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {words.map((word, wordIndex) => (
              <span key={`dup-${index}-${wordIndex}`} className="kinetic-word">
                {word}
                <span className="kinetic-separator">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Hero Image */}
      <div className="kinetic-image-wrapper">
        <img 
          ref={imageRef}
          src="/assets/hero11.png" 
          alt="" 
          className="kinetic-hero-image"
          draggable={false}
        />
      </div>

      {/* Decorative glow */}
      <div className="kinetic-glow" />
    </div>
  );
};

export default KineticHeroVisual;
