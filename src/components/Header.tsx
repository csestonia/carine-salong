import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenBooking: () => void;
}

export default function Header({ onNavigate, activeSection, onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Avaleht' },
    { id: 'about', label: 'Karine Terzjan' },
    { id: 'services', label: 'Iluteenused' },
    { id: 'brands', label: 'Eksklusiivsed Brändid' },
    { id: 'gallery', label: 'Galerii' },
    { id: 'contact', label: 'Broneerimine ja Kontakt' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 sticky top-0">
      {/* Top micro-bar for contact info */}
      <div className="bg-stone-950 text-gold-50 py-2.5 px-4 sm:px-6 md:px-8 text-xs font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <a href="tel:+3725068412" className="flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Phone size={13} className="text-gold-400" />
              <span>+372 506 8412</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <div className="flex items-center gap-1.5 text-stone-300">
              <MapPin size={13} className="text-gold-400" />
              <span>Narva mnt 12, Tallinn, Eesti</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gold-400" />
              <span>E–R 09:00 – 19:00 | L kokkuleppel</span>
            </div>
            <span className="text-gold-300 font-mono tracking-widest text-[9px] uppercase border border-gold-500/30 px-1.5 py-0.5 rounded">
              CIDESCO Quality
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav
        id="main-nav"
        className={`w-full transition-all duration-300 border-b border-stone-200/40 relative ${
          isScrolled 
            ? 'bg-gold-50/95 backdrop-blur-md py-3 shadow-sm' 
            : 'bg-gold-50 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          {/* Brand/Logo */}
          <button 
            id="logo-button"
            onClick={() => handleItemClick('hero')} 
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-[27px] tracking-[0.12em] uppercase font-light text-stone-900 group-hover:text-gold-600 transition-colors">
              CARINE<span className="font-light text-gold-500">SALONG</span>
            </span>
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-stone-500 font-medium">
              Eksklusiivne Iluteraapia alates 1997
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-sans text-xs tracking-wider uppercase py-2 transition-colors duration-200 cursor-pointer focus:outline-none ${
                    activeSection === item.id || (activeSection === '' && item.id === 'hero')
                      ? 'text-gold-600 font-medium'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                  {(activeSection === item.id || (activeSection === '' && item.id === 'hero')) && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400" />
                  )}
                </button>
              ))}
            </div>

            <button
              id="cta-booking-header"
              onClick={onOpenBooking}
              className="ml-4 px-5 py-2.5 bg-stone-900 text-gold-50 text-[11px] font-sans tracking-widest uppercase hover:bg-gold-600 transition-all duration-300 cursor-pointer shadow-sm rounded-none border border-stone-950 flex items-center gap-1.5 group"
            >
              <Sparkles size={13} className="text-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Broneeri aeg</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-stone-950 focus:outline-none p-1.5 hover:bg-stone-100 rounded-sm"
            aria-label={isMobileMenuOpen ? 'Sulge menüü' : 'Ava menüü'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div id="mobile-menu-panel" className="lg:hidden absolute top-full left-0 w-full bg-gold-50 border-b border-stone-200 py-6 px-5 shadow-lg z-40 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left font-sans text-xs tracking-wider uppercase py-2 border-b border-stone-100 ${
                    activeSection === item.id
                      ? 'text-gold-600 font-semibold'
                      : 'text-stone-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                id="mobile-cta-booking"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-2 w-full py-3 bg-stone-900 text-gold-50 text-xs font-sans tracking-widest uppercase hover:bg-gold-600 text-center transition-colors font-medium"
              >
                BRONEERI KONSULTATSIOON
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
