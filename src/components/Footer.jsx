import React from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import ArrowFillButton from '@/components/ui/arrow-fill-button';

export default function Footer({ onOpenConsultation, onNavigate }) {
  const handleLink = (e, route, hash) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route, hash);
    } else {
      if (route === '/about') {
        window.location.pathname = '/about';
      } else if (route === '/book-call') {
        window.location.pathname = '/book-call';
      } else {
        window.location.href = hash;
      }
    }
  };

  return (
    <footer className="bg-jj-dark text-white pt-16 sm:pt-20 lg:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info & Official Logo */}
          <div className="lg:col-span-6 space-y-6">
            <a 
              href="/" 
              onClick={(e) => handleLink(e, '/', '#hero')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/jj-elevate-logo.png"
                alt="JJ Elevate Logo"
                className="h-10 sm:h-12 w-auto object-contain bg-white p-1 rounded-sm"
              />
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-white">
                JJ ELEVATE
              </span>
            </a>

            <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">
              Digital growth and creative art-direction for ambitious travel & hospitality brands. Helping luxury hotels, heritage resorts, and boutique villas scale direct bookings and reduce OTA commissions.
            </p>

            <div className="space-y-2.5 text-xs text-white/80 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-jj-pink shrink-0 mt-0.5" />
                <span>226, Pal Rd, near 56 Bhog Sweets, opposite Samrat Ashok Udhyan, Keshavnagar, Jodhpur, Rajasthan 342001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-jj-pink shrink-0" />
                <a href="tel:+917850027373" className="hover:text-jj-pink transition-colors font-bold min-h-[36px] flex items-center">
                  +91 78500 27373
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-jj-yellow shrink-0" />
                <a href="mailto:info@jjelevate.com" className="hover:text-jj-pink transition-colors font-bold min-h-[36px] flex items-center">
                  info@jjelevate.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-jj-pink">
              COMPANY
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="/about" onClick={(e) => handleLink(e, '/about', '/about')} className="hover:text-white transition-colors py-1 inline-block font-bold">About Us</a></li>
              <li><a href="/services" onClick={(e) => handleLink(e, '/services', '/services')} className="hover:text-white transition-colors py-1 inline-block">Our Services</a></li>
              <li><a href="/case-studies" onClick={(e) => handleLink(e, '/case-studies', '/case-studies')} className="hover:text-white transition-colors py-1 inline-block">Case Studies</a></li>
              <li><a href="/contact" onClick={(e) => handleLink(e, '/contact', '/contact')} className="hover:text-white transition-colors py-1 inline-block">Contact & Inquiries</a></li>
              <li><a href="/book-call" onClick={(e) => handleLink(e, '/book-call', '/book-call')} className="hover:text-white transition-colors py-1 inline-block font-bold text-jj-pink">Book Strategy Call</a></li>
              <li><button onClick={onOpenConsultation} className="hover:text-white transition-colors text-left py-1 inline-block cursor-pointer">Quick Inquiry Modal</button></li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-jj-pink">
              CONNECT
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-jj-pink transition-colors min-h-[36px]"
              >
                <Instagram className="w-4 h-4 text-jj-pink" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-jj-pink transition-colors min-h-[36px]"
              >
                <Linkedin className="w-4 h-4 text-jj-pink" />
                <span>LinkedIn</span>
              </a>
            </div>
            <div className="pt-3">
              <ArrowFillButton
                btnText="Book Strategy Call"
                size="md"
                variant="pink"
                className="w-full justify-center text-sm font-semibold"
                onClick={() => onNavigate ? onNavigate('/book-call', '/book-call') : onOpenConsultation()}
              />
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <div>
            © 2026 JJ Elevate. All rights reserved. Premium Digital Marketing Agency for Travel & Hospitality.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
