import { useEffect, useRef } from 'react';

const MouseEffect = () => {
  const bgRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let targetX = 0, targetY = 0;
    let outlineX = 0, outlineY = 0;
    let hasMoved = false;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        outlineX = targetX;
        outlineY = targetY;
        if (cursorOutlineRef.current) cursorOutlineRef.current.style.opacity = 1;
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = 1;
        if (bgRef.current) bgRef.current.style.opacity = 1;
      }
      
      if (bgRef.current) {
        bgRef.current.style.background = `radial-gradient(600px circle at ${targetX}px ${targetY}px, rgba(59, 130, 246, 0.12), transparent 80%)`;
      }
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      outlineX += (targetX - outlineX) * 0.15;
      outlineY += (targetY - outlineY) * 0.15;
      
      if (cursorOutlineRef.current && hasMoved) {
        cursorOutlineRef.current.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Spotlight effect in the background */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 hidden md:block opacity-0"
      />
      
      {/* Trailing cursor outline */}
      <div
        ref={cursorOutlineRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-8 h-8 border border-blue-500/50 rounded-full hidden md:block opacity-0 transition-opacity duration-300"
      />
      
      {/* Main cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-2 h-2 bg-blue-500 rounded-full hidden md:block opacity-0 transition-opacity duration-300"
      />
    </>
  );
};

export default MouseEffect;
