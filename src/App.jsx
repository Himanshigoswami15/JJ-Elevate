import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BigStatement from './components/BigStatement';
import ResultsMetrics from './components/ResultsMetrics';
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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash || '';
    }
    return '';
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p === '/about' || h === '#about') return '/about';
      if (p === '/services' || h === '#services' || h.startsWith('#hotel') || h.startsWith('#restaurant') || h === '#services-showcase') return '/services';
      if (p === '/case-studies' || p === '/cases' || p === '/portfolio' || h === '#cases') return '/case-studies';
      if (p === '/contact' || h === '#contact') return '/contact';
    }
    return '/';
  });

  const handleOpenConsultation = () => setConsultationOpen(true);
  const handleCloseConsultation = () => setConsultationOpen(false);

  const handleNavigate = (targetRoute, targetHash = '') => {
    setCurrentRoute(targetRoute);
    setCurrentHash(targetHash);

    if (typeof window !== 'undefined') {
      const cleanHash = targetHash && targetHash !== targetRoute && targetHash !== '#hero' ? targetHash : '';
      const fullPath = targetRoute + cleanHash;
      window.history.pushState(null, '', fullPath || '/');

      const scrollToTarget = () => {
        const navbarHeight = 85;

        // If a specific section hash was requested
        if (cleanHash) {
          const el = document.querySelector(cleanHash);
          if (el) {
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
            return;
          }

          // Fallback if target is on services page
          if (targetRoute === '/services') {
            const showcase = document.querySelector('#services-showcase') || document.querySelector('#service-details');
            if (showcase) {
              const elementPosition = showcase.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
              window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
              });
              return;
            }
          }
        }

        // Default scroll to top for standard page navigations
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      // Slight delay to allow React route transition / rendering
      setTimeout(scrollToTarget, 100);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash;
      setCurrentHash(h || '');

      const hLower = (h || '').toLowerCase();
      if (p === '/about' || hLower === '#about') {
        setCurrentRoute('/about');
      } else if (p === '/services' || hLower === '#services' || hLower.startsWith('#hotel') || hLower.startsWith('#restaurant') || hLower === '#services-showcase') {
        setCurrentRoute('/services');
      } else if (p === '/case-studies' || p === '/cases' || p === '/portfolio' || hLower === '#cases') {
        setCurrentRoute('/case-studies');
      } else if (p === '/contact' || hLower === '#contact') {
        setCurrentRoute('/contact');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [currentRoute]);

  // Global cursor spotlight effect on luxury cards
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const handleCardMouseMove = (e) => {
      const card = e.target.closest('.luxury-spotlight-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };

    window.addEventListener('mousemove', handleCardMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleCardMouseMove);
  }, []);

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
            targetHash={currentHash}
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

          {/* 4. Growth Ecosystem */}
          <GrowthEcosystem onOpenConsultation={handleOpenConsultation} />

          {/* 5. Clients Marquee Ticker */}
          <ClientsMarquee />

          {/* 6. Viral Reel Showcase */}
          <ViralReelShowcase onOpenConsultation={handleOpenConsultation} />

          {/* 7. Why Choose JJ Elevate */}
          <WhyChooseUs onOpenConsultation={handleOpenConsultation} />

          {/* 8. What Our Clients Say */}
          <Testimonials onOpenConsultation={handleOpenConsultation} />

          {/* 9. Yellow Newsletter Subscription CTA */}
          <NewsletterCTA />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onOpenConsultation={handleOpenConsultation}
        onNavigate={handleNavigate}
      />

      {/* 3-Panel Strategy Call Interactive Booking Pop-up Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}
