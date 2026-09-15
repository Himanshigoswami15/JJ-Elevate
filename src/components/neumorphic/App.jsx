import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BigStatement from './components/BigStatement';
import ResultsMetrics from './components/ResultsMetrics';
import NeuBookingCalculator from './components/neumorphic/NeuBookingCalculator';
import GrowthEcosystem from './components/GrowthEcosystem';
import ViralReelShowcase from './components/ViralReelShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import ClientsMarquee from './components/ClientsMarquee';
import Testimonials from './components/Testimonials';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import CaseStudiesPage from './components/CaseStudiesPage';
import ContactPage from './components/ContactPage';

import CustomCursor from './components/motion/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/about' || h === '#about') return '/about';
      if (p === '/services' || h === '#services') return '/services';
      if (p === '/case-studies' || p === '/cases' || p === '/portfolio' || h === '#cases') return '/case-studies';
      if (p === '/contact' || h === '#contact') return '/contact';
    }
    return '/';
  });

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  const handleNavigate = (targetRoute, targetHash) => {
    setCurrentRoute(targetRoute);
    if (typeof window !== 'undefined') {
      const fullPath = targetRoute + (targetHash && targetHash !== targetRoute && targetHash !== '#hero' ? targetHash : '');
      window.history.pushState(null, '', fullPath || '/');
      
      if (targetRoute === '/about' || targetRoute === '/services' || targetRoute === '/case-studies' || targetRoute === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/about' || h === '#about') {
        setCurrentRoute('/about');
      } else if (p === '/services' || h === '#services') {
        setCurrentRoute('/services');
      } else if (p === '/case-studies' || p === '/cases' || p === '/portfolio' || h === '#cases') {
        setCurrentRoute('/case-studies');
      } else if (p === '/contact' || h === '#contact') {
        setCurrentRoute('/contact');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [currentRoute]);

  return (
    <div className="min-h-screen bg-jj-bg text-jj-dark font-body selection:bg-jj-pink/20 selection:text-jj-dark relative">

      {/* Navigation */}
      <Navbar 
        onOpenConsultation={handleOpenConsultation}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Conditional Route Rendering */}
      {currentRoute === '/about' ? (
        <main>
          <AboutPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('/', '#hero')}
          />
        </main>
      ) : currentRoute === '/services' ? (
        <main>
          <ServicesPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('/', '#hero')}
          />
        </main>
      ) : currentRoute === '/case-studies' ? (
        <main>
          <CaseStudiesPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('/', '#hero')}
          />
        </main>
      ) : currentRoute === '/contact' ? (
        <main>
          <ContactPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={() => handleNavigate('/', '#hero')}
          />
        </main>
      ) : (
        /* Home Page Flow */
        <main>
          {/* 1. Hero */}
          <Hero onOpenConsultation={handleOpenConsultation} />

          {/* 2. Big Statement */}
          <BigStatement onOpenConsultation={handleOpenConsultation} />

          {/* 3. JJ Elevate Services Suite */}
          <ResultsMetrics onOpenConsultation={handleOpenConsultation} />

          {/* 4. Direct Booking & Commission Recapture Engine (Neumorphic Soft UI) */}
          <NeuBookingCalculator onOpenConsultation={handleOpenConsultation} />

          {/* 5. Growth Ecosystem */}
          <GrowthEcosystem onOpenConsultation={handleOpenConsultation} />

          {/* 6. Clients Marquee Ticker */}
          <ClientsMarquee />

          {/* 7. Viral Reel Showcase */}
          <ViralReelShowcase onOpenConsultation={handleOpenConsultation} />

          {/* 8. Why Choose JJ Elevate */}
          <WhyChooseUs onOpenConsultation={handleOpenConsultation} />

          {/* 9. What Our Clients Say */}
          <Testimonials onOpenConsultation={handleOpenConsultation} />

          {/* 10. Yellow Newsletter Subscription CTA */}
          <NewsletterCTA />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onOpenConsultation={handleOpenConsultation}
        onNavigate={handleNavigate}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
