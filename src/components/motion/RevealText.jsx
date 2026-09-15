import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({ children, className = '', tag = 'div', delay = 0, stagger = 0.08 }) {
  const elRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = elRef.current.querySelectorAll('.reveal-line, .reveal-word');
      const itemsToAnimate = targets.length > 0 ? targets : [elRef.current];

      gsap.fromTo(
        itemsToAnimate,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          stagger: stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay, stagger]);

  const Tag = tag;

  return (
    <Tag ref={elRef} className={className}>
      {children}
    </Tag>
  );
}
