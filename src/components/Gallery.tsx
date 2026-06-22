import React, { useState, useEffect } from 'react';
import { Camera, Facebook, ZoomIn, Eye, X } from 'lucide-react';

import skincareImg from '../assets/images/carine_hero_skincare_1781786516442.webp';
import therapyImg from '../assets/images/carine_facial_therapy_1781786536756.webp';
import interiorImg from '../assets/images/carine_salon_interior_1781786551258.webp';
import textureImg from '../assets/images/carine_cosmetics_closeup_1781786702518.webp';

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (activeCardIdx !== null) {
          setActiveCardIdx(null);
        }
        return;
      }

      const cards = document.querySelectorAll('[id^="gallery-item-"]');
      let minDistance = Infinity;
      let closestIdx: number | null = null;
      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (distance < minDistance) {
            minDistance = distance;
            const idAttr = card.getAttribute('id');
            if (idAttr) {
              const matched = idAttr.match(/gallery-item-(\d+)/);
              if (matched) {
                closestIdx = parseInt(matched[1], 10);
              }
            }
          }
        }
      });

      if (closestIdx !== null && minDistance < 220) {
        setActiveCardIdx(closestIdx);
      } else {
        setActiveCardIdx(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const galleryItems = [
    {
      src: skincareImg,
      title: "Premium hooldustooted",
      desc: "Ainult kliiniliselt kontrollitud ja puhtaimad toimeained sinu nahale.",
      size: "md:col-span-2"
    },
    {
      src: therapyImg,
      title: "CIDESCO näoteraapia protsess",
      desc: "Väga täpne manuaalne massaaž ja toimeainete süvainfusioon.",
      size: "md:col-span-1"
    },
    {
      src: interiorImg,
      title: "Salongi rahulikkuse oaas",
      desc: "Puhas, minimalistlik ja väärikas ruum täielikuks lõõgastuseks.",
      size: "md:col-span-1"
    },
    {
      src: textureImg,
      title: "Bioloogilised tekstuurid",
      desc: "Koorivad ensüümid ja rikkad maskid, mis äratavad naha uuele elule.",
      size: "md:col-span-2"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3 font-medium">Visuaalne rännak</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-normal font-light">
            Elegants ja salongielu <br />
            <span className="font-serif italic text-gold-500">meie kaamera läbi</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Elegant Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => {
            const isActive = activeCardIdx === idx;
            
            return (
              <div
                id={`gallery-item-${idx}`}
                key={idx}
                className={`relative overflow-hidden group aspect-[4/3] sm:aspect-video md:aspect-[3/2] cursor-pointer ${item.size} border shadow-sm transition-all duration-300 ${
                  isActive ? 'border-gold-300 scale-[1.01] ring-1 ring-gold-400/20' : 'border-stone-100 hover:border-gold-300'
                }`}
                onClick={() => setActivePhoto(item.src)}
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Minimal Dark Hover Mask */}
                <div className={`absolute inset-0 bg-stone-950/75 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />

                {/* Text overlays on hover */}
                <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-300 text-left z-10 pointer-events-none ${
                  isActive 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100'
                }`}>
                  <span className="text-[10px] font-mono text-gold-300 uppercase tracking-widest mb-1.5 font-medium">Carine Salong</span>
                  <h3 className="font-serif text-xl md:text-[22px] text-gold-50 tracking-wide font-light mb-2">{item.title}</h3>
                  <p className="font-sans text-stone-300 text-xs leading-relaxed font-light">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gold-400 font-medium">
                    <ZoomIn size={14} />
                    <span>Suurenda pilti</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Lightbox Modal */}
        {activePhoto && (
          <div
            id="lightbox-backdrop"
            onClick={() => setActivePhoto(null)} 
            className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          >
            <button
              id="lightbox-close-button"
              className="absolute top-6 right-6 text-gold-50 hover:text-gold-300 focus:outline-none p-2 bg-stone-900 border border-stone-800"
              onClick={() => setActivePhoto(null)}
              aria-label="Sule pilt"
            >
              <X size={24} />
            </button>
            <div className="max-w-4xl max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <img
                src={activePhoto}
                alt="Suurendatud salongigalerii pilt"
                className="w-full h-full object-contain max-h-[80vh] border border-stone-800"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Facebook Social Feed Promo Segment */}
        <div className="mt-16 bg-stone-50 border border-stone-200/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-none">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-blue-50/60 text-blue-600 rounded-none flex items-center justify-center border border-blue-200/40">
              <Facebook size={24} fill="currentColor" className="text-blue-700" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-stone-900 tracking-wide font-medium">Oleme püsivalt aktiivsed Facebookis</h4>
              <p className="font-sans text-xs text-stone-500 leading-relaxed font-light">
                Jälgi meie ametlikku lehte, kus jagame igapäevaseid nahahoolduse saladusi, tulemusi enne/pärast ning viimase hetke vabu aegu!
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto text-left md:text-right">
            <a
              id="facebook-cta-link"
              href="https://www.facebook.com/carinesalong/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-sans tracking-wider uppercase font-semibold transition-colors w-full md:w-auto text-center"
            >
              <Facebook size={14} fill="currentColor" />
              <span>Külasta Facebooki lehte</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
