
import React, {
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import Icon from "./Icon.jsx";
import "./ProfessionalFlipCard.css";

export default function ProfessionalFlipCard({
  service,
  technologies = [],
}) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [suppressHover, setSuppressHover] = useState(false);

  const [cardHeight, setCardHeight] = useState(null);

  const frontRef = useRef(null);
  const backRef = useRef(null);

  const isFlipped =
    isPinned || (isHovered && !suppressHover);

  // Measure both faces whenever their content changes.
  useLayoutEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;

    if (!front || !back) return;

    const updateHeight = () => {
      const activeFace = isFlipped ? back : front;

      const contentHeight = Math.ceil(
        activeFace.scrollHeight
      );

      setCardHeight(Math.max(175, contentHeight + 2));
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);

    observer.observe(front);
    observer.observe(back);

    return () => observer.disconnect();
  }, [isFlipped, service, technologies]);

  const handlePointerEnter = (event) => {
    if (event.pointerType === "mouse") {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setSuppressHover(false);
  };

  const handleClick = () => {
    if (isPinned) {
      setIsPinned(false);
      setSuppressHover(true);
    } else {
      setIsPinned(true);
      setSuppressHover(false);
    }
  };

  return (
    <button
      id={service.id}
      type="button"
      className={`professional-flip-card ${
        isFlipped ? "is-flipped" : ""
      }`}
      style={
        cardHeight !== null
          ? { height: `${cardHeight}px` }
          : undefined
      }
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      aria-pressed={isFlipped}
    //   aria-label={
    //     isFlipped
    //       ? `${service.title}: Back to Service`
    //       : `${service.title}: Explore Technologies`
    //   }
    >
      <span className="professional-flip-inner">

        {/* FRONT — SERVICE DESCRIPTION */}
        <span
          ref={frontRef}
          className="professional-flip-face professional-flip-front"
          aria-hidden={isFlipped}
        >
          <span className="professional-flip-header">
            <span className="professional-flip-title">
              {service.title}
            </span>

            <span className="professional-flip-icon">
              <Icon name="refreshCw" size={16} />
            </span>
          </span>

          <span className="professional-flip-description">
            {service.description}
          </span>

          {/* <span className="professional-flip-action">
            <Icon name="refreshCw" size={14} />
            Explore Technologies
          </span> */}
        </span>

        {/* BACK — TECHNOLOGY LOGOS */}
        <span
          ref={backRef}
          className="professional-flip-face professional-flip-back"
          aria-hidden={!isFlipped}
        >
          <span className="professional-flip-back-header">
            <span className="professional-flip-kicker">
              TECHNOLOGIES WE WORK WITH
            </span>

            <span className="professional-flip-back-title">
              {service.title}
            </span>
          </span>

          {technologies.length > 0 ? (
            <span className="professional-flip-logo-grid">
              {technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="professional-flip-logo-tile"
                >
                  <img
                    src={tech.logo}
                    alt=""
                    className="professional-flip-logo"
                    loading="lazy"
                  />

                  <span className="professional-flip-logo-name">
                    {tech.name}
                  </span>
                </span>
              ))}
            </span>
          ) : (
            <span className="professional-flip-empty">
              Technology consulting, solution
              architecture and delivery advisory.
            </span>
          )}

          {/* <span className="professional-flip-return">
            <Icon name="refreshCw" size={14} />
            Back to Service
          </span> */}
        </span>

      </span>
    </button>
  );
}
