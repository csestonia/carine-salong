import React, { useEffect, useState } from 'react';
import { X, Sparkles, Send, ShieldAlert, AlertCircle } from 'lucide-react';
import { SERVICES } from '../data';
import { sendBooking } from '../utils/bookingApi';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    notes: '',
  });
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.serviceId) {
      setErrorMessage('Palun täitke kõik kohustuslikud väljad.');
      return;
    }

    setLoading(true);
    try {
      const serviceName = SERVICES.find((s) => s.id === formData.serviceId)?.name
        || (formData.serviceId === 'custom_analysis' ? 'Nahaanalüüs ja individuaalne soovituskava' : 'Üldine kosmeetiline nõustamine');
      const referenceId = await sendBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: serviceName,
        notes: formData.notes,
      });
      setGeneratedRefId(referenceId);
      setIsDone(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Broneeringusoovi saatmine ebaõnnestus.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      notes: '',
    });
    setIsDone(false);
    setErrorMessage('');
    setGeneratedRefId('');
    onClose();
  };

  return (
    <div id="booking-modal-overlay" onClick={onClose} className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in text-left" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div 
        id="booking-modal-container"
        className="bg-white border border-stone-200 w-full max-w-lg shadow-2xl relative flex flex-col rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-gold-500" />
        
        {/* Close button */}
        <button
          id="booking-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 focus:outline-none p-1 bg-stone-50 border border-stone-100"
          aria-label="Sule aken"
        >
          <X size={18} />
        </button>

        {isDone ? (
          /* Finished State */
          <div className="p-8 sm:p-10 text-center space-y-5">
            <div className="w-12 h-12 bg-gold-50 text-gold-600 border border-gold-300 rounded-full flex items-center justify-center mx-auto">
               <Sparkles size={24} className="animate-spin-slow text-gold-500" />
            </div>
            
            <h3 className="font-serif text-2xl text-stone-900 font-light tracking-wide">
              Broneeringusoov saadetud!
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Suur tänu, {formData.name}. Meister Karine vaatab salongi kalendri üle ja vastab teile SMS või e-kirja teel järgmise <strong>4–12 tunni jooksul</strong>. Kui teil on kiiremaid muresid, võite ka kohe helistada <a href="tel:+3725068412" className="text-gold-600 font-medium">+372 506 8412</a>.
            </p>

            <p className="font-mono text-xs text-gold-600">Viide: {generatedRefId}</p>

            <button
              id="booking-modal-done"
              onClick={handleReset}
              className="w-full py-3 bg-stone-900 hover:bg-gold-500 text-gold-50 text-xs font-sans tracking-widest uppercase transition-colors font-medium cursor-pointer"
            >
              Sulge aken ja naase lehele
            </button>
          </div>
        ) : (
          /* Input Form State */
          <form id="booking-modal-form" onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-widest uppercase text-gold-600 font-bold block">Kiirbroneerimine</span>
              <h3 id="booking-modal-title" className="font-serif text-xl sm:text-2xl text-stone-900 font-light tracking-wide">
                Küsi sobivat visiiti
              </h3>
              <p className="font-sans text-xs text-stone-500 font-light">
                Saada meile oma soov ning me võtame kinnituseks peagi ühendust.
              </p>
            </div>

            <div className="space-y-4">
              {/* Nimi */}
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">Teie Täisnimi *</label>
                <input
                  id="modal-input-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Ees- ja perekonnanimi"
                  className="w-full px-3 py-2.5 border border-stone-300 text-xs text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Sähis ja Telefon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">Telefoninumber *</label>
                  <input
                    id="modal-input-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+372 ..."
                    className="w-full px-3 py-2.5 border border-stone-300 text-xs text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">E-post *</label>
                  <input
                    id="modal-input-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="nimi@leht.ee"
                    className="w-full px-3 py-2.5 border border-stone-300 text-xs text-stone-850 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Teenuse valik */}
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">Soovitud iluteenus *</label>
                <select
                  id="modal-service-select"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-stone-300 text-xs text-stone-800 rounded-none bg-white focus:border-gold-400 focus:outline-none"
                >
                  <option value="">-- Palun vali üks teenustest --</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.duration} / {s.price}€)
                    </option>
                  ))}
                  <option value="custom_analysis">Nahaanalüüs ja individuaalne soovituskava (35€)</option>
                  <option value="general_consultation">Üldine kosmeetiline nõustamine (tasuta)</option>
                </select>
              </div>

              {/* Märkused */}
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">Lisaküsimused või soovid</label>
                <textarea
                  id="modal-input-notes"
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Nt. rasedus, peagi saabuv oluline pulmapäev, naha tugev tundlikkus jne."
                  className="w-full px-3 py-2 border border-stone-300 text-xs text-stone-800 rounded-none bg-white focus:border-gold-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" />
              {errorMessage && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <button
                id="modal-submit-button"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-stone-900 border border-stone-950 hover:bg-gold-600 text-gold-50 text-xs font-sans font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span>TÖÖTLEN PÄRINGUT...</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>EDASTA SISSESOOV MEISTRILE</span>
                  </>
                )}
              </button>

              <div className="mt-4 p-3 bg-gold-50/50 border border-gold-200/40 text-[10px] text-stone-500 flex items-start gap-2">
                <ShieldAlert size={14} className="text-gold-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">
                  Carine Salong järgib CIDESCO hügieeniprotokolle. Kui teil esineb ägedaid gripilaadseid sümptomeid või herpes, soovitame visiit edasi lükata.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
