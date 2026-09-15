import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Counter({ value, suffix = '', prefix = '', className = '' }) {
  const [displayVal, setDisplayVal] = useState(0);
  const containerRef = useRef(null);
  const numericTarget = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayVal(numericTarget);
      return;
    }

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true, // run once cleanly
        onEnter: () => {
          gsap.to(counterObj, {
            val: numericTarget,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplayVal(Math.floor(counterObj.val));
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [numericTarget]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {displayVal}
      {suffix}
    </span>
  );
}
