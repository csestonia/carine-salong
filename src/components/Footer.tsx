import React from 'react';
import { Facebook, Phone, MapPin, Mail, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-gold-50 pt-20 pb-10 border-t border-stone-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-stone-900 pb-16 mb-12">
        
        {/* Left column - ColumnSpan-4: Brand story */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="space-y-2">
            <span className="font-serif text-2xl tracking-[0.15em] uppercase font-light text-white block">
              CARINE<span className="text-gold-400">SALONG</span>
            </span>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 font-semibold block">
              Sinu Naha Eksklusiivne Kodu Alates 1997
            </span>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
            Eesti Esimese Erakosmeetikakooli ning Šveitsi CIDESCO lennu kulddiplomiga kosmeetik Karine Terzjan pakub teaduslikke, elustavaid ja pinguldavaid näohooldusi ning anatoomilist jumestuskunsti Tallinna südames.
          </p>

          <div className="flex items-center gap-2.5">
            <a 
              id="footer-facebook-icon"
              href="https://www.facebook.com/carinesalong/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-stone-900 border border-stone-850 hover:bg-blue-600 hover:text-white transition-colors duration-200 flex items-center justify-center rounded-none"
              aria-label="Külasta Carine Salongi Facebooki lehte"
            >
              <Facebook size={16} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Middle column - ColumnSpan-3: Structural map check and quick links */}
        <div className="md:col-span-3 space-y-6 text-left">
          <h4 className="font-serif text-lg text-gold-300 font-light tracking-wide uppercase">Teenused</h4>
          <ul className="space-y-2.5 text-xs text-stone-400 font-light">
            <li>
              <a href="#services" className="hover:text-gold-300 transition-colors">CIDESCO Signatuurhoolitsused</a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold-300 transition-colors">Ultraheli ja Bio-Dermatoloogia</a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold-300 transition-colors">Retinooli & Peptiidide Lifting</a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold-300 transition-colors">Pidulik ja Fototehniline Grimm</a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold-300 transition-colors">Naha pH & Kaitseanalüüs</a>
            </li>
          </ul>
        </div>

        {/* Right column - ColumnSpan-4: Direct credentials logo and text representation */}
        <div className="md:col-span-4 space-y-6 text-left">
          <h4 className="font-serif text-lg text-gold-300 font-light tracking-wide uppercase">Asukoht & Detailid</h4>
          
          <div className="space-y-4 text-xs text-stone-400 leading-relaxed font-light">
            <div className="flex items-start gap-3">
              <MapPin size={15} className="text-gold-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-300 block">Carine Salong</strong>
                Narva mnt 12, II korrus (Kesklinn)<br />
                Tallinn, 10117, Eesti
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={15} className="text-gold-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-300 block">Broneerimine</strong>
                <a id="footer-phone-link" href="tel:+3725068412" className="hover:text-gold-300 transition-colors hover:underline">+372 506 8412</a>
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={15} className="text-gold-500 shrink-0 mt-0.5" />
              <span>
                <a id="footer-email-link" href="mailto:info@carinesalong.ee" className="hover:text-gold-300 transition-colors hover:underline">info@carinesalong.ee</a>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Quality markers & Copyright disclaimer block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-xs font-light text-left md:text-center">
        <div className="space-y-1">
          <p>© {new Date().getFullYear()} Carine Salong. Kõik õigused kaitstud.</p>
          <p className="text-[10px] text-stone-600">Disainitud vastavalt parimatele Põhjamaade ilu- ja hooldussalongide standarditele (ecovillabaltic & revilla stiil).</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-start md:justify-center text-[10px] font-mono uppercase tracking-wider text-stone-400">
          <div className="flex items-center gap-1.5 border border-stone-900 px-2.5 py-1 bg-stone-950">
            <CheckCircle size={10} className="text-gold-500" />
            <span>ERKÜ Tegevkosmeetik</span>
          </div>
          <div className="flex items-center gap-1.5 border border-stone-900 px-2.5 py-1 bg-stone-950">
            <CheckCircle size={10} className="text-gold-500" />
            <span>Kutsepedagoog</span>
          </div>
          <div className="flex items-center gap-1.5 border border-stone-900 px-2.5 py-1 bg-stone-950">
            <Award size={11} className="text-gold-500" />
            <span>CIDESCO kvaliteet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
