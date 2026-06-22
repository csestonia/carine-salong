import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Check, AlertCircle, Send, Sparkles, RefreshCw } from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem, BookingSubmission } from '../types';
import { sendBooking } from '../utils/bookingApi';

interface ContactProps {
  preselectedService: ServiceItem | null;
  onClearPreselectedService: () => void;
}

export default function Contact({ preselectedService, onClearPreselectedService }: ContactProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: preselectedService?.id || '',
    date: '',
    timeSlot: '12:00–15:00',
    notes: '',
  });

  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<BookingSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto update service selection if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceId: preselectedService.id }));
    }
  }, [preselectedService]);

  const concernsList = [
    { id: 'aging', label: 'Mure kortsukeste ja naha lõtvumisega' },
    { id: 'dryness', label: 'Kuivus, kestendamine ja karedus' },
    { id: 'sensitivity', label: 'Tundlikkus, punetus või kuperoosa' },
    { id: 'congestion', label: 'Ummistunud poorid, komedoonid või akne' },
    { id: 'dullness', label: 'Tuhm jume, stressis nahk või sära puudus' },
    { id: 'makeup', label: 'Pidulik jumestus või grimm nõustamisega' }
  ];

  const handleConcernToggle = (id: string) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter(item => item !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Quick validations
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Palun täitke kõik kohustuslikud väljad (Nimi, Telefon ja E-post).');
      return;
    }

    const selectedServiceObj = SERVICES.find(s => s.id === (formData.serviceId || preselectedService?.id));
    const serviceName = selectedServiceObj?.name || (formData.serviceId === 'custom'
      ? 'Spetsialisti soovitus kohapeal'
      : 'Kohandatud nahaanalüüs ja konsultatsioon');
    const concerns = selectedConcerns.map(c => concernsList.find(cl => cl.id === c)?.label || c);

    setIsSubmitting(true);
    try {
      const referenceId = await sendBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: serviceName,
        date: formData.date,
        time: formData.timeSlot,
        notes: formData.notes,
        concerns,
      });

      const newSubmission: BookingSubmission = {
        id: referenceId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceId: formData.serviceId,
        serviceName,
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.timeSlot,
        notes: formData.notes,
        skinConcerns: concerns,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      setSubmissionSuccess(newSubmission);
      onClearPreselectedService();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Broneeringusoovi saatmine ebaõnnestus.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      date: '',
      timeSlot: '12:00–15:00',
      notes: '',
    });
    setSelectedConcerns([]);
    setSubmissionSuccess(null);
  };

  // Generate personalized skincare tips based on chosen concerns for the success state
  const getPersonalizedTips = () => {
    if (selectedConcerns.length === 0) {
      return "Enne visiiti soovitame vältida tugevate mehaaniliste koorijate kasutamist 48 tundi, et naha tegelik tundlikkus ja rasutase oleksid analüüsiks täpselt nähtavad.";
    }

    let tips: string[] = [];
    if (selectedConcerns.includes('dryness')) {
      tips.push("Väldi eelnevatel päevadel liigset kuuma vett näo puhastamisel ja joo rohkelt vett.");
    }
    if (selectedConcerns.includes('aging')) {
      tips.push("Visiidil teeme kindlaks naha barjääri elastsuse ning valime sobivaima trimmiva peptiid-infusiooni.");
    }
    if (selectedConcerns.includes('congestion')) {
      tips.push("Palun ära kasuta mehaanilisi pigistamisi kodus vähemalt 5 päeva enne visiiti, et vältida põletiku levikut.");
    }
    if (selectedConcerns.includes('sensitivity')) {
      tips.push("Meie kapis on spetsiaalselt tundlikule ja kuperoossele nahale mõeldud Mary Cohr ja Guinot rahustavad aktiivained.");
    }

    return tips.length > 0 ? tips.join(" Samuti ") : "";
  };

  return (
    <section id="contact" className="py-24 bg-gold-50 border-b border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-gold-600 tracking-[0.3em] uppercase block mb-3 font-medium">Külastus ja broneerimine</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-normal font-light">
            Alusta oma naha <br />
            <span className="font-serif italic text-gold-500">uuenduskuuri täna</span>
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-400 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Informational block - Contact and Salong info on Left (ColSpan-5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-white p-8 border border-stone-200/50 shadow-sm rounded-none space-y-6">
              <h3 className="font-serif text-2xl text-stone-900 font-light tracking-wide border-b border-stone-100 pb-4">
                Salongi üksikasjad
              </h3>

              {/* Direct Info list */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-500">Aadress</h4>
                    <p className="font-sans text-sm text-stone-850 font-medium mt-1">Carine Salong</p>
                    <p className="font-sans text-xs text-stone-600">Narva mnt 12 (II korrus), Kesklinn, Tallinn</p>
                    <p className="font-sans text-[11px] text-stone-500 mt-1">Sissepääs otse Narva maanteelt, mugavad parkimisvõimalused lähedal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-500">Telefon</h4>
                    <p className="font-sans text-sm text-stone-850 font-medium mt-1">
                      <a href="tel:+3725068412" className="hover:text-gold-600 transition-colors">+372 506 8412</a>
                    </p>
                    <p className="font-sans text-[11px] text-stone-500">Helista julgelt või saada sõnum konsultatsiooniaja täpsustamiseks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-500">E-post</h4>
                    <p className="font-sans text-sm text-stone-850 font-medium mt-1">
                      <a href="mailto:info@carinesalong.ee" className="hover:text-gold-600 transition-colors">info@carinesalong.ee</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-500">Lahtiolekuajad</h4>
                    <div className="font-sans text-xs text-stone-700 mt-1 space-y-1">
                      <div className="flex justify-between w-48"><span>Esmaspäev – Reede:</span> <span className="font-medium">09:00 – 19:00</span></div>
                      <div className="flex justify-between w-48"><span>Laupäev:</span> <span className="font-medium text-gold-600">kokkuleppel</span></div>
                      <div className="flex justify-between w-48 text-stone-400"><span>Pühapäev:</span> <span>suletud</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical instructions on booking with Karine */}
            <div className="bg-stone-900 text-gold-50 p-8 border border-stone-850 rounded-none space-y-4">
              <h4 className="font-serif text-lg text-gold-300 font-medium tracking-wide">Meie lubadus kliendile</h4>
              <p className="font-sans text-xs text-stone-300 leading-relaxed font-light">
                Broneeringu saatmisel võtab meister Karine teiega ühendust <strong>4–12 tunni jooksul</strong>, et kinnitada täpne kellaaeg või soovitada alternatiive. Me ei kasuta automaatseid roboteid – iga kliendi aeg valitakse ja sobitatakse personaalselt.
              </p>
              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 font-mono flex items-center gap-2">
                <Check size={14} className="text-gold-400 shrink-0" />
                <span>CIDESCO rahvusvahelised hügieeni- ja kvaliteedistandardid.</span>
              </div>
            </div>
          </div>

          {/* Interactive Form panel on Right (ColSpan-7) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-10 shadow-sm rounded-none">
            
            {/* If submission is successful show clean, luxury feedback layout */}
            {submissionSuccess ? (
              <div id="booking-success-layout" className="space-y-6 text-center py-6 animate-fade-in">
                <div className="w-16 h-16 bg-gold-50 text-gold-600 border border-gold-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="animate-spin-slow text-gold-500" />
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 tracking-wide font-light">
                  Aitäh, {submissionSuccess.name}!
                </h3>
                
                <p className="font-sans text-stone-600 text-sm max-w-md mx-auto leading-relaxed font-light">
                  Teie personaalne iluteraapia broneeringusoov on edukalt vastu võetud. Meister Karine Terzjan võtab teiega ühendust telefoni <strong>{submissionSuccess.phone}</strong> või e-posti <strong>{submissionSuccess.email}</strong> teel, et leppida kokku lõplik kellaaeg.
                </p>

                {/* Reservation Summary */}
                <div className="bg-gold-50/50 p-6 border border-gold-200/50 max-w-xl mx-auto space-y-4 text-left">
                  <h4 className="font-serif text-base text-stone-850 font-medium border-b border-gold-200/50 pb-2 flex justify-between">
                    <span>Broneeringu info</span>
                    <span className="font-mono text-xs text-gold-600 bg-gold-100 px-2 py-0.5">{submissionSuccess.id}</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[9px] mb-0.5">Valitud teenus</span>
                      <span className="font-medium text-stone-850">{submissionSuccess.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase tracking-wider text-[9px] mb-0.5">Soovitud kuupäev ja kellaaeg</span>
                      <span className="font-medium text-stone-850">{submissionSuccess.date} soovitud ajavahemikus ({submissionSuccess.time})</span>
                    </div>
                  </div>

                  {submissionSuccess.skinConcerns.length > 0 && (
                    <div className="pt-2 border-t border-gold-200/40">
                      <span className="text-stone-400 block uppercase tracking-wider text-[9px] mb-2 font-medium">Teie esiletoodud nahamured</span>
                      <div className="flex flex-wrap gap-1.5">
                        {submissionSuccess.skinConcerns.map((con, cIdx) => (
                          <span key={cIdx} className="bg-white text-[11px] text-stone-700 px-2.5 py-1 border border-stone-200 rounded-none font-light">
                            {con}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Specialized Skincare advice prior appointment */}
                <div className="p-4 bg-stone-900 text-gold-50 text-xs text-left max-w-xl mx-auto space-y-2 border border-stone-850">
                  <div className="flex items-center gap-1.5 text-gold-400 font-semibold uppercase tracking-wider text-[10px]">
                    <AlertCircle size={14} />
                    <span>Naha ettevalmistamise soovitus</span>
                  </div>
                  <p className="leading-relaxed text-stone-300 font-light font-sans">
                    {getPersonalizedTips() || "Palun saabuge salongi meigivabalt umbes 5 minutit enne määratud kellaaega. Puhastame naha ning viime läbi täpse diagnoosi enne hooldust."}
                  </p>
                </div>

                {/* actions button */}
                <div className="pt-4 flex justify-center">
                  <button
                    id="booking-reset-button"
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-stone-300 hover:border-gold-500 font-sans text-xs text-stone-700 tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    <span>Uus broneering või päring</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Standard form */
              <form id="contact-booking-form" onSubmit={handleSubmit} className="space-y-6 text-left">
                
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-xl text-stone-900 tracking-wide font-light">
                    Koosta oma ilukonsultatsiooni soov
                  </h3>
                  <p className="font-sans text-xs text-stone-500 mt-1 font-light">
                    Täitke allolevad väljad ja valige oma nahale sobivad fookused.
                  </p>
                </div>

                {/* STAGE 1: Check skin concerns */}
                <div className="space-y-3">
                  <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block mb-1">
                    1. Valige oma naha peamised mured või huvid (saab valida mitu)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {concernsList.map((concern) => {
                      const isChecked = selectedConcerns.includes(concern.id);
                      return (
                        <button
                          id={`concern-checkbox-${concern.id}`}
                          type="button"
                          key={concern.id}
                          onClick={() => handleConcernToggle(concern.id)}
                          className={`p-3 border text-left text-xs transition-all duration-200 cursor-pointer flex items-center justify-between rounded-none ${
                            isChecked
                              ? 'bg-gold-50 border-gold-400 text-stone-900 font-medium'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-gold-300'
                          }`}
                        >
                          <span className="font-light">{concern.label}</span>
                          <span className={`w-4 h-4 border flex items-center justify-center shrink-0 ml-2 ${
                            isChecked ? 'bg-gold-500 border-gold-600 text-stone-950' : 'bg-transparent border-stone-300'
                          }`}>
                            {isChecked && <Check size={11} strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STAGE 2: Service select and timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Service selector */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block">
                      2. Valige soovitud iluteenus
                    </label>
                    <select
                      id="form-service-selector"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-stone-300 text-xs sm:text-sm text-stone-800 bg-white rounded-none focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    >
                      <option value="">-- Vali sobiv hoolitsus nimekirjast --</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.duration} / {s.price}€)
                        </option>
                      ))}
                      <option value="custom">Soovin spetsialisti otsust kohapeal (tasuta nõuanne)</option>
                    </select>
                    {preselectedService && (
                      <div className="flex justify-between items-center bg-gold-50 px-2.5 py-1 text-[11px] text-stone-700 border border-gold-200/60 mt-1">
                        <span>Eelseadistatud: {preselectedService.name}</span>
                        <button
                          id="clear-preselected-service"
                          type="button" 
                          onClick={onClearPreselectedService} 
                          className="text-stone-400 hover:text-red-500 font-bold focus:outline-none px-1"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Date picker */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block">
                      Eelistatud kuupäev
                    </label>
                    <div className="relative">
                      <input
                        id="form-date-input"
                        type="date"
                        name="date"
                        value={formData.date}
                        min={new Date().toLocaleDateString('sv-SE')}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 border border-stone-300 text-xs sm:text-sm text-stone-800 bg-white rounded-none focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* STAGE 3: Personal details */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block">
                    3. Sisestage oma kontaktandmed
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Name */}
                    <div>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        placeholder="Teie nimi *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-stone-300 text-xs sm:text-sm text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        id="form-input-phone"
                        type="tel"
                        name="phone"
                        placeholder="Telefoninumber *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-stone-300 text-xs sm:text-sm text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        id="form-input-email"
                        type="email"
                        name="email"
                        placeholder="E-posti aadress *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-3 border border-stone-300 text-xs sm:text-sm text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Time slot toggle and Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  {/* Time slot toggle */}
                  <div className="sm:col-span-5 space-y-1.5">
                    <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block">
                      Sobiv kellaaeg
                    </label>
                    <select
                      id="form-timeslot-selector"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-stone-300 text-xs sm:text-sm text-stone-800 bg-white rounded-none focus:border-gold-400 focus:outline-none"
                    >
                      <option value="Hommik (9:00 - 12:00)">Hommik (9:00 - 12:00)</option>
                      <option value="Lõuna (12:00 - 15:00)">Lõunane aeg (12:00 - 15:00)</option>
                      <option value="Pärastlõuna (15:00 - 19:00)">Pärastlõuna (15:00 - 19:00)</option>
                      <option value="Mis tahes aeg">Mis tahes vaba aeg sel päeval</option>
                    </select>
                  </div>

                  {/* Comments notes */}
                  <div className="sm:col-span-7 space-y-1.5">
                    <label className="font-sans text-xs font-semibold tracking-wider text-stone-700 uppercase block">
                      Märkused või erilised tervislikud asjaolud (valikuline)
                    </label>
                    <textarea
                      id="form-notes-textarea"
                      name="notes"
                      rows={1}
                      placeholder="Nt allergia mõne toimeaine vastu, rasedus, peatselt saabuv üritus jne."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-stone-300 text-xs text-stone-800 bg-white rounded-none focus:border-gold-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button container */}
                <div className="pt-2">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px]"
                  />
                  <button
                    id="booking-form-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-stone-900 border border-stone-950 hover:bg-gold-600 active:bg-gold-700 text-gold-50 text-xs font-sans font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Edastan broneeringusoovi meistrile...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>SAADA PERSONAALNE BRONEERINGUSOOV</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-stone-400 font-sans text-center mt-3 font-light">
                    Kinnitame, et teie sisestatud isikuandmeid töödeldakse ja hoitakse turvaliselt vastavalt salongi eetikakoodeksile ega väljastata kunagi kolmandatele osapooltele.
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
