import React, { useState } from 'react';
import { Award, GraduationCap, Compass, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import portraitImg from '../assets/images/carine_facial_therapy_1781786536756.webp';
import { EXPERIENCE_TIMELINE } from '../data';

export default function About() {
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);

  const credentials = [
    {
      icon: <Award className="text-gold-500" size={24} />,
      title: "CIDESCO Rahvusvaheline Diplom",
      desc: "Zürichis 2001. a väljastatud diplom – kõrgeim ülemaailmne iluteraapia ja kosmetoloogia sertifikaat."
    },
    {
      icon: <Compass className="text-gold-500" size={24} />,
      title: "EKA Joonistuskunst",
      desc: "Eesti Kunstiakadeemia avatud akadeemia joonistusõpingud. Kunstioskused tagavad veatu anatoomilise meigivalguse ja varjude tunnetuse."
    },
    {
      icon: <GraduationCap className="text-gold-500" size={24} />,
      title: "Kutsepedagoogika",
      desc: "Tallinna Ülikooli kutsepedagoogiline haridus. Karine vahendab teadmisi nahatervisest selgelt ja teaduslikult korrektselt."
    },
    {
      icon: <BookOpen className="text-gold-500" size={24} />,
      title: "ERKÜ Liige ja Ekspert",
      desc: "Eesti Rahvusvahelise Kosmeetikute Ühenduse (ERKÜ) eksamikomisjoni liige ja pikaajaline juhatuse ekspert."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gold-50 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3 font-medium">Asutaja lugu</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-normal font-light">
            Sinu nahka usalda vaid <br />
            <span className="font-serif italic text-gold-500">meistri kätesse</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        {/* Narrative & Image Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Elegant Floating Image Frame on Left */}
          <div className="lg:col-span-5 relative group z-0">
            <div className="absolute -inset-3 border border-gold-300/60 translate-x-2 translate-y-2 sm:-inset-4 sm:translate-x-3 sm:translate-y-3 z-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 sm:group-hover:translate-x-1.5 sm:group-hover:translate-y-1.5" />
            <div className="bg-stone-100 overflow-hidden shadow-xl aspect-square sm:aspect-[4/5] relative z-10">
              <img
                src={portraitImg}
                alt="Karine Terzjan CIDESCO kosmeetik teostamas näohoolitsust"
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-stone-950/90 text-gold-50 p-5 backdrop-blur-sm border-l-2 border-gold-400">
                <p className="font-serif italic text-base text-gold-300">"Ilu ei ole juhus, see on teadlike valikute ja anatoomilise täpsuse tulemus."</p>
                <p className="font-sans text-[11px] tracking-widest uppercase text-stone-400 mt-2 font-medium">— Karine Terzjan</p>
              </div>
            </div>
          </div>

          {/* Biography Content on Right */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light tracking-wide">
              Karine Terzjan <span className="text-gold-500 font-sans text-sm tracking-wider uppercase inline-block ml-2 align-middle font-medium">Kvalifitseeritud kosmeetik-grimeerija</span>
            </h3>
            
            <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Karine Terzjan on pühendanud üle veerand sajandi naha bioloogia, esteetika ja hariduse edendamisele Eestis. Tema asutatud <strong>Carine Salong (alates 1997)</strong> on olnud esmaklassiliste näo- ja kehahoolitsuste maamärgiks Tallinnas. Tema hooldused ei ole standardtooted, vaid peenelt häälestatud teraapiakavad.
            </p>

            <div className="space-y-4 text-stone-600 text-sm leading-relaxed font-light">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-500 shrink-0 mt-1" />
                <span><strong>Zürichi CIDESCO diplom (2001):</strong> Eesti Esimese Erakosmeetikakooli rahvusvahelise CIDESCO lennu kasvandik. Kosmetoloogia kuldstandard.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-500 shrink-0 mt-1" />
                <span><strong>Grimmikunst & Maalikunst:</strong> Tiiu Luhti Grimmikoolis litsentseeritud grimmeerija. Eesti Kunstiakadeemia joonistusstuudiod annavad nahale kontuuride voolimisel haruldase skulpturaalse täpsuse.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-500 shrink-0 mt-1" />
                <span><strong>Akadeemiline taust:</strong> Tallinna Ülikooli kutsepedagoogika stuudium. Karine juhendab ka riiklikke kutseeksami komisjone ning seisab hea Eesti iluvaldkonna kutse-eetika eest.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-gold-500 shrink-0 mt-1" />
                <span><strong>Rahvusvahelised Kongressid:</strong> Pidev täiendus globaalselt, sh London FACE (Facial Aesthetic Conference & Exhibition), et tuua uusimad vananemisvastased lahendused kohe Tallinna kliendini.</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-gold-600 block">29+</span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-stone-500">aastat kogemust</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-gold-600 block">15k+</span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-stone-500">teostatud hoolitust</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-gold-600 block">100%</span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-stone-500">Cidesco standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-stone-900 text-gold-50 p-8 sm:p-10 border border-stone-850 my-16 rounded-none">
          {credentials.map((cred, idx) => (
            <div key={idx} className="space-y-3">
              <div className="w-12 h-12 bg-stone-850 border border-stone-800 flex items-center justify-center">
                {cred.icon}
              </div>
              <h4 className="font-serif text-lg text-gold-200 tracking-wide font-medium">{cred.title}</h4>
              <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">{cred.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Biography Timeline */}
        <div className="bg-stone-950 text-gold-50 p-8 sm:p-12 border border-stone-900 rounded-none relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none scale-150">
            <Award size={300} className="text-gold-400" />
          </div>
          
          <div className="relative z-10">
            <h4 className="font-serif text-2xl text-gold-300 tracking-wide mb-8 font-light text-center">Teekond Iluteaduses ja Maailmakongressidel</h4>
            
            {/* Timeline Header Tabs Selector */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 border-b border-stone-800 pb-4 mb-8">
              {EXPERIENCE_TIMELINE.map((step, idx) => (
                <button
                  id={`timeline-tab-${idx}`}
                  key={idx}
                  onClick={() => setActiveTimelineStep(idx)}
                  className={`px-4 py-2 font-mono text-xs tracking-wider transition-colors cursor-pointer border-b-2 focus:outline-none ${
                    activeTimelineStep === idx
                      ? 'border-gold-400 text-gold-400 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-300'
                  }`}
                >
                  {step.year}
                </button>
              ))}
            </div>

            {/* Selected Timeline Content Panel */}
            <div className="min-h-[140px] flex flex-col md:flex-row items-start gap-6 max-w-4xl mx-auto animate-fade-in">
              <div className="w-14 h-14 shrink-0 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-gold-400 font-serif text-lg font-medium">
                {EXPERIENCE_TIMELINE[activeTimelineStep].year}
              </div>
              <div className="space-y-3">
                <h5 className="font-serif text-xl text-gold-100 font-medium tracking-wide">
                  {EXPERIENCE_TIMELINE[activeTimelineStep].title}
                </h5>
                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {EXPERIENCE_TIMELINE[activeTimelineStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
