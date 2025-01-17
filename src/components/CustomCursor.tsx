import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], .clickable');
      
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });

      return elements;
    };

    // Only add listeners if it's not a touch device
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', onMouseMove);
      const elements = addHoverListeners();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        elements.forEach(el => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    }
  }, []);

  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <div
        className={`cursor-dot ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className={`cursor-dot-outline ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;
