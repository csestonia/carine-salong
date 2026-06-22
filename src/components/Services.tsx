import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Euro, Check, HelpCircle, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'facials' | 'body' | 'makeup' | 'consultation'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (activeCardId !== null) {
          setActiveCardId(null);
        }
        return;
      }

      const cards = document.querySelectorAll('[id^="service-card-"]');
      let minDistance = Infinity;
      let closestCardId: string | null = null;
      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        // Only count if it's in or close to the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (distance < minDistance) {
            minDistance = distance;
            const idAttr = card.getAttribute('id');
            if (idAttr) {
              closestCardId = idAttr.replace('service-card-', '');
            }
          }
        }
      });

      // Limit how far from center it can be to get active (e.g., within 250px of viewport center)
      if (closestCardId && minDistance < 250) {
        setActiveCardId(closestCardId);
      } else {
        setActiveCardId(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Kõik teenused' },
    { id: 'facials', label: 'Näohoolitsused' },
    { id: 'body', label: 'Kontuur & Lifting' },
    { id: 'makeup', label: 'Meik & Grimmikunst' },
    { id: 'consultation', label: 'Konsultatsioonid' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter(service => service.category === selectedCategory);

  const handleToggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  const handleCardClick = (service: ServiceItem) => {
    if (window.innerWidth < 768) {
      setExpandedServiceId(expandedServiceId === service.id ? null : service.id);
    } else {
      onSelectService(service);
    }
  };

  return (
    <section id="services" className="py-24 bg-gold-50/50 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3 font-medium">Hoolitsuse Menüü</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-normal font-light">
            Eksklusiivne bioloogiline <br />
            <span className="font-serif italic text-gold-500">iluteraapia meile ja teile</span>
          </h2>
          <p className="font-sans text-stone-500 text-xs sm:text-sm mt-4 font-light max-w-xl mx-auto">
            Kõik hoolitsused põhinevad individuaalsel nahatüübi biokeemilisel seadistamisel, parimatel Prantsuse profibrändidel ja CIDESCO kuldsete reeglite järgimisel.
          </p>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              id={`cat-button-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center rounded-none border ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-gold-50 border-stone-950 font-medium'
                  : 'bg-white text-stone-600 border-stone-200/60 hover:text-stone-900 hover:border-gold-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            const isActive = activeCardId === service.id;
            
            return (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                onClick={() => handleCardClick(service)}
                className={`bg-white p-5 md:p-8 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer border ${
                  isActive 
                    ? 'border-gold-400 shadow-md ring-1 ring-gold-400/20' 
                    : 'border-stone-200/55 hover:border-gold-400/80 hover:shadow-md'
                }`}
              >
                {/* Accent line on hover */}
                <div className={`absolute top-0 left-0 w-full h-[3px] bg-gold-400 transition-transform duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />

                <div>
                  {/* Card Meta details - always visible */}
                  <div className="flex justify-between items-center mb-3 text-stone-400 text-xs font-mono font-medium tracking-wide">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-gold-500" />
                      <span>{service.duration}</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-stone-900 font-sans font-semibold text-sm">
                      <Euro size={13} className="text-gold-600" />
                      <span>{service.price}</span>
                    </span>
                  </div>

                  {/* Service Title Container with Chevron */}
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className={`font-serif text-lg sm:text-xl md:text-[22px] transition-colors duration-200 font-light tracking-wide leading-snug ${
                      isActive ? 'text-gold-600' : 'text-stone-900 group-hover:text-gold-600'
                    }`}>
                      {service.name}
                    </h3>
                    {/* Mobile Chevron */}
                    <div className={`md:hidden shrink-0 mt-1.5 transition-colors duration-300 ${
                      isActive ? 'text-gold-600' : 'text-gold-500'
                    }`}>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Collapsible Content - hidden on mobile by default, always visible on desktop */}
                  <div className={`${isExpanded ? 'block animate-fade-in' : 'hidden md:block'}`}>
                    {/* Short Description */}
                    <p className="font-sans text-stone-500 text-xs sm:text-sm leading-relaxed mb-6 mt-2 font-light">
                      {service.description}
                    </p>

                    {/* Highlights Bullet List */}
                    {service.benefits && (
                      <div className="space-y-2 mb-6">
                        <span className="font-sans text-[10px] tracking-widest uppercase text-stone-400 block mb-1 font-medium">Hoolitsuse tulem:</span>
                        {service.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-stone-600 font-light">
                            <Check size={13} className="text-gold-500 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expanded Bio/Recommendation notes details */}
                    {isExpanded && service.recommendedFor && (
                      <div className="mt-4 pt-4 border-t border-stone-100 bg-gold-50/20 p-3 text-xs text-stone-600 leading-relaxed font-light mb-6">
                        <span className="font-sans text-[9px] tracking-wider uppercase text-gold-600 block mb-1 font-semibold">Kellele soovitame:</span>
                        {service.recommendedFor}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submitting buttons grouped - hidden on mobile unless expanded */}
                <div className={`mt-6 pt-4 border-t border-stone-100 flex items-center justify-between ${isExpanded ? 'flex' : 'hidden md:flex'}`}>
                  <button
                    id={`service-expand-${service.id}`}
                    onClick={(e) => handleToggleExpand(service.id, e)}
                    className="text-[11px] font-sans text-stone-400 hover:text-gold-600 flex items-center gap-1 transition-colors focus:outline-none"
                  >
                    <HelpCircle size={13} />
                    <span>{isExpanded ? 'Peida detailid' : 'Loe soovitusi'}</span>
                  </button>

                  <button
                    id={`service-book-action-${service.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="text-xs font-sans text-stone-900 group-hover:text-gold-600 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Vali ja broneeri</span>
                    <ChevronRight size={13} className="text-gold-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom luxury skin advice banner section */}
        <div className="mt-20 border border-gold-300/40 bg-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100 rounded-full blur-2xl opacity-40 -z-10" />
          
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[10px] tracking-widest text-gold-600 uppercase font-semibold">Muretsed valede valikute pärast?</span>
            <h3 className="font-serif text-2xl text-stone-900 font-light tracking-wide">
              Tasuta konsultatsioon sobiva hoolitsuse leidmiseks
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
              Kui sa pole kindel, kas su nahale sobib ultraheli sügavpuhastus või hoopis intensiivsem peptiidi-infusioon, vali meie <strong>Professionaalne Nahaanalüüs</strong>. Kohapeal tehtava nahaanalüüsi tasu on hoolitsuse valikul täielikult kingituseks!
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              id="services-consultation-cta"
              onClick={() => {
                const consultation = SERVICES.find(s => s.id === 'skin-consultation');
                if (consultation) {
                  onSelectService(consultation);
                }
              }}
              className="w-full md:w-auto px-6 py-3.5 bg-stone-900 hover:bg-gold-600 text-gold-50 text-xs font-sans tracking-widest uppercase transition-colors"
            >
              BRONEERI NAHAANALÜÜS (35€)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
