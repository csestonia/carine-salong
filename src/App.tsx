import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import { SERVICES, TESTIMONIALS, BRANDS } from './data';
import { ServiceItem } from './types';
import { Sparkles, Trophy, Star, ShieldAlert, Check, HelpCircle, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Monitor active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'brands', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service);
    handleNavigate('contact');
  };

  const handleClearPreselectedService = () => {
    setPreselectedService(null);
  };

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden bg-gold-50 font-sans text-stone-900 selection:bg-gold-300 selection:text-stone-950 flex flex-col justify-between">
      
      {/* Header element */}
      <Header 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <Hero 
          onNavigateToServices={() => handleNavigate('services')}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* ABOUT / BIOGRAPHY SECTION */}
        <About />

        {/* SERVICES / PRICING GRID */}
        <Services onSelectService={handleSelectService} />

        {/* ACTIVE BRANDS / COSMETICAL TECHNOLOGY WORKSPACE SECTION */}
        <section id="brands" className="py-24 bg-stone-900 text-gold-50 overflow-hidden border-b border-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Brands Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs text-gold-400 tracking-[0.3em] uppercase block mb-3 font-medium">Luksuslik Ilutehnoloogia</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 tracking-normal font-light">
                Rahvusvaheliselt tunnustatud <br />
                <span className="font-serif italic text-gold-300">profibrändide sinfoonia</span>
              </h2>
              <p className="font-sans text-stone-400 text-xs sm:text-sm mt-3 font-light">
                Tulemused saavutatakse vaid teaduspõhise ja sügavatoimelise Prantsuse iluteadusega. Carine Salong ei tee kvaliteedis järeleandmisi.
              </p>
              <div className="w-12 h-[1.5px] bg-gold-500/50 mx-auto mt-6" />
            </div>

            {/* Brands detailed list layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANDS.map((brand, idx) => (
                <div 
                  id={`brand-card-${idx}`}
                  key={idx} 
                  className="bg-stone-850 p-8 border border-stone-800 text-left hover:border-gold-500/40 hover:bg-stone-850/80 transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div className="space-y-4">
                    <div className="font-serif text-2xl tracking-[0.1em] text-white uppercase font-light border-b border-stone-800 pb-3 group-hover:text-gold-300 transition-colors">
                      {brand.name}
                    </div>
                    <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                      {brand.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-1.5 text-[10px] text-gold-400 font-mono tracking-wider uppercase">
                    <Check size={12} className="text-gold-500" />
                    <span>Litsentseeritud kasutus</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Statement bar */}
            <div className="mt-16 p-6 sm:p-8 bg-stone-950 border border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left max-w-xl">
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-gold-200 tracking-wide">Meie kosmeetika on 100% säilitusainetevaba ja hüpoallergeenne</h4>
                  <p className="font-sans text-xs text-stone-400 font-light mt-0.5">
                    Kõik tooted on dermatoloogiliselt testitud, sobides ka kõige tundlikuma naha, rosaatsea või kuperoosa hoolduseks.
                  </p>
                </div>
              </div>
              <button
                id="brands-cta-booking"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-stone-950 text-xs font-sans tracking-widest uppercase font-semibold transition-colors shrink-0"
              >
                KÜSI TOOTESOOVITUST
              </button>
            </div>

          </div>
        </section>

        {/* ELEGANT PHOTO GALLERY SECTION */}
        <Gallery />

        {/* CLIENT TESTIMONIALS (Tagasiside) */}
        <section className="py-24 bg-gold-50/30 border-b border-stone-200/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3 font-medium">Kliendid räägivad</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-normal font-light">
                Usaldus ja imelised <br />
                <span className="font-serif italic text-gold-500">nahauuenduse lood</span>
              </h2>
              <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
            </div>

            {/* Testimonial grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((test) => (
                <div 
                  id={`testimonial-card-${test.id}`}
                  key={test.id} 
                  className="bg-white border border-stone-200/40 p-8 flex flex-col justify-between text-left shadow-sm rounded-none hover:border-gold-300 transition-colors duration-300"
                >
                  <div className="space-y-4">
                    {/* Stars and date */}
                    <div className="flex justify-between items-center text-gold-500">
                      <div className="flex items-center gap-0.5">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-stone-400">{test.date}</span>
                    </div>

                    {/* Content Quote */}
                    <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed font-light italic">
                      "{test.content}"
                    </p>
                  </div>

                  {/* Profile footer */}
                  <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-50 text-gold-600 border border-gold-200 flex items-center justify-center font-serif text-xs font-semibold">
                      {test.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-stone-900">{test.author}</h4>
                      <p className="font-sans text-[10px] text-stone-500">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick trust prompt */}
            <div className="mt-12 text-center">
              <p className="font-sans text-stone-500 text-xs font-light max-w-lg mx-auto leading-relaxed">
                Soovid samuti kogeda tipptasemel CIDESCO iluhoolitsusi Tallinnas Narva maanteel? Meie eesmärk on teie naha püsiv ja pikaajaline elastsus.
              </p>
              <button
                id="testimonials-cta"
                onClick={() => handleNavigate('contact')}
                className="mt-4 text-xs font-sans text-stone-900 hover:text-gold-600 font-semibold inline-flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Liitu meie õnnelike püsiklientidega</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>

        {/* CONTACT / DYNAMIC FORM BUILDER */}
        <Contact 
          preselectedService={preselectedService}
          onClearPreselectedService={handleClearPreselectedService}
        />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* QUICK FLOATING BOOKING MODAL */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

    </div>
  );
}
