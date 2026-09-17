import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenConsultation, currentRoute = '/', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Sourced authentically from https://www.jjelevate.com/services
  const serviceItems = [
    { name: 'Hotel Social Media Marketing', id: 'HOTELSOCIALMEDIA' },
    { name: 'High-Intent Hotel Ads & PPC', id: 'HotelADS' },
    { name: 'Hotel & Resort SEO Dominance', id: 'HOTELSEO' },
    { name: 'Hotel OTA Optimization & Revenue', id: 'HotelOTA' },
    { name: 'Restaurant & F&B Social Media', id: 'RESTAURANTSOCIALMEDIA' },
    { name: 'Restaurant Performance Ads', id: 'RestaurantGOOGLE' },
  ];

  const navLinks = [
    { name: 'HOME', route: '/', href: '/' },
    { name: 'ABOUT', route: '/about', href: '/about' },
    { name: 'SERVICES', route: '/services', href: '/services', hasDropdown: true },
    { name: 'CASE STUDIES', route: '/case-studies', href: '/case-studies' },
    { name: 'CONTACT', route: '/contact', href: '/contact' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (onNavigate) {
      onNavigate(link.route, link.href);
    } else {
      window.location.pathname = link.route;
    }
  };

  const handleServiceSelect = (e, serviceId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (onNavigate) {
      onNavigate('/services', `#${serviceId}`);
    } else {
      window.location.href = `/services#${serviceId}`;
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || currentRoute === '/about' || currentRoute === '/services' || currentRoute === '/case-studies' || currentRoute === '/contact'
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-black/[0.04]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, { route: '/', href: '/' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img
              src="/jj-elevate-logo.png"
              alt="JJ Elevate Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-jj-dark">
              JJ ELEVATE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors relative py-1 flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'text-jj-pink after:w-full font-bold'
                          : 'text-jj-dark/80 hover:text-jj-pink'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-jj-pink' : ''
                        }`}
                      />
                    </a>

                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 z-50 overflow-hidden"
                        >
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5 border-b border-gray-100">
                            SPECIALIZED SERVICES
                          </div>
                          
                          <div className="py-1">
                            {serviceItems.map((item) => (
                              <a
                                key={item.id}
                                href={`/services#${item.id}`}
                                onClick={(e) => handleServiceSelect(e, item.id)}
                                className="group/item flex items-center justify-between px-3 py-2 text-xs font-medium text-jj-dark hover:bg-jj-pink/5 hover:text-jj-pink rounded-xl transition-all cursor-pointer"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform duration-150">
                                  {item.name}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-jj-pink opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                              </a>
                            ))}
                          </div>

                          <div className="pt-2.5 mt-1.5 border-t border-gray-100">
                            <a
                              href="/services#services-showcase"
                              onClick={(e) => {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                setServicesDropdownOpen(false);
                                if (onNavigate) {
                                  onNavigate('/services', '#services-showcase');
                                } else {
                                  window.location.href = '/services#services-showcase';
                                }
                              }}
                              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-jj-pink hover:bg-jj-dark transition-colors rounded-full shadow-sm cursor-pointer"
                            >
                              <span>EXPLORE ALL SERVICES</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-jj-pink after:transition-all cursor-pointer ${
                    isActive
                      ? 'text-jj-pink after:w-full font-bold'
                      : 'text-jj-dark/80 hover:text-jj-pink after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button - Opens Strategy Call Pop-up */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-body text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white bg-jj-pink rounded-full hover:bg-jj-dark transition-all duration-300 shadow-none hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                BOOK STRATEGY CALL
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-jj-dark hover:text-jj-pink transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Subtle Luxury Reading Progress Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-jj-pink via-jj-yellow to-jj-pink origin-left pointer-events-none transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </header>

      {/* Mobile/Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-jj-dark text-white flex flex-col justify-between p-6 sm:p-8 pt-24 sm:pt-28 lg:hidden h-[100dvh] max-h-[100dvh] overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/jj-elevate-logo.png"
                  alt="JJ Elevate Logo"
                  className="h-10 sm:h-12 w-auto bg-white p-1 rounded-sm"
                />
                <span className="text-xs uppercase tracking-widest text-jj-pink font-bold">
                  NAVIGATION
                </span>
              </div>

              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {navLinks.map((link) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.name} className="border-b border-white/10 pb-2.5 sm:pb-3">
                        <div className="flex items-center justify-between">
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link)}
                            className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide hover:text-jj-pink transition-colors"
                          >
                            {link.name}
                          </a>
                          <button
                            onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                            className="p-2 text-jj-pink hover:text-white"
                            aria-label="Toggle services list"
                          >
                            <ChevronDown
                              className={`w-6 h-6 transition-transform ${
                                mobileServicesExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {mobileServicesExpanded && (
                          <div className="mt-3 pl-3 border-l-2 border-jj-pink/40 space-y-2 py-2">
                            {serviceItems.map((item) => (
                              <a
                                key={item.id}
                                href={`/services#${item.id}`}
                                onClick={(e) => handleServiceSelect(e, item.id)}
                                className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-jj-pink py-1"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide hover:text-jj-pink transition-colors flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 min-h-[44px]"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-jj-pink" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-5 pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 sm:py-4 bg-jj-pink text-white font-body text-sm sm:text-base font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-none min-h-[48px] rounded-full hover:bg-white hover:text-jj-pink transition-all cursor-pointer"
              >
                <span>BOOK A STRATEGY SESSION</span>
                <ArrowUpRight className="w-5 h-5 text-jj-yellow" />
              </button>
              <div className="text-center text-[11px] sm:text-xs text-white/50 tracking-wider pb-2">
                © 2026 JJ ELEVATE. DIGITAL GROWTH FOR HOSPITALITY.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
