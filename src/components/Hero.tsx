import React from 'react';
import { Calendar, ChevronRight, Award, ShieldCheck, Heart } from 'lucide-react';
import heroBg from '../assets/images/carine_hero_skincare_1781786516442.webp';

interface HeroProps {
  onNavigateToServices: () => void;
  onOpenBooking: () => void;
}

export default function Hero({ onNavigateToServices, onOpenBooking }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center bg-stone-900 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Eksklusiivsed kosmeetikatooted Carine Salongis"
          className="w-full h-full object-cover object-center opacity-65 scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Soft, custom warm-gradient over the image for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/80 to-transparent" />
        <div className="absolute inset-0 bg-stone-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-20 lg:py-28 text-left">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Accent micro-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-400/30 text-gold-300 text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8 rounded-none">
            <Award size={13} className="text-gold-400 animate-pulse" />
            <span>Rahvusvaheline CIDESCO kvaliteet</span>
          </div>

          {/* Premium Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold-50 tracking-normal leading-[1.12] mb-6 font-light">
            Sinu naha <span className="font-serif italic text-gold-300">loomulik ilu </span> 
            ja tervis tipptasemel teaduselt
          </h1>

          {/* Elegant Intro paragraph */}
          <p className="font-sans text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light">
            Carine Salong Tallinnas pakub akrediteeritud CIDESCO iluteraapiat, individuaalset naharakkude morfoloogiast lähtuvat diagnostikat ja väärikat jumestuskunsti. Meister Karine Terzjan'ilt, pühendunult aastast 1997.
          </p>

          {/* Conversion CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              id="hero-cta-primary"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-stone-950 text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 border border-gold-400 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Calendar size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Broneeri personaalne aeg</span>
            </button>

            <button
              id="hero-cta-secondary"
              onClick={onNavigateToServices}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-gold-50/5 text-gold-50 text-xs font-sans tracking-widest uppercase transition-all duration-300 border border-stone-600 hover:border-gold-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tutvu teenustega</span>
              <ChevronRight size={14} className="text-gold-400" />
            </button>
          </div>

          {/* Quality Proof Points */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-stone-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-850 border border-stone-800 flex items-center justify-center text-gold-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="text-xs text-gold-50 font-sans tracking-wide uppercase font-medium">Asutatud 1997</h3>
                <p className="text-[11px] text-stone-400">Kohalik ja usaldusväärne ilutraditsioon</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-850 border border-stone-800 flex items-center justify-center text-gold-400">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-xs text-gold-50 font-sans tracking-wide uppercase font-medium">CIDESCO Diplom</h3>
                <p className="text-[11px] text-stone-400">Zürichi rahvusvaheline kuldstandard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-850 border border-stone-800 flex items-center justify-center text-gold-400">
                <Heart size={18} />
              </div>
              <div>
                <h3 className="text-xs text-gold-50 font-sans tracking-wide uppercase font-medium">Individuaalne</h3>
                <p className="text-[11px] text-stone-400">Kohandatud naha pH ja struktuuri analüüs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
