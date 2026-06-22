import React from 'react';
import { getEmailTemplateHtml } from '../utils/emailTemplate';
import { X, Mail, Download } from 'lucide-react';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    name: string;
    serviceName: string;
    date: string;
    time: string;
    referenceId: string;
  };
}

export default function EmailPreviewModal({ isOpen, onClose, bookingData }: EmailPreviewModalProps) {
  if (!isOpen) return null;

  const htmlContent = getEmailTemplateHtml(
    bookingData.name,
    bookingData.serviceName,
    bookingData.date || 'Lähiajal',
    bookingData.time || 'Täpsustamata',
    bookingData.referenceId
  );

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in text-left">
      <div 
        className="bg-stone-100 border border-stone-200 w-full max-w-2xl h-[85vh] sm:h-[80vh] shadow-2xl relative flex flex-col rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white border-b border-stone-200 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-stone-800">
            <Mail size={18} className="text-stone-400" />
            <div>
              <h4 className="font-sans text-sm font-medium">E-kirja näidis (Demo)</h4>
              <p className="font-sans text-[10px] text-stone-500">Nii näeb välja kliendile saadetav automaatne e-kiri</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 text-xs font-medium rounded transition-colors"
              title="Laadi HTML fail alla"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Laadi alla / Kopeeri</span>
            </button>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-900 focus:outline-none p-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-100 rounded transition-colors"
              aria-label="Sule aken"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Email Viewer / Browser frame simulation */}
        <div className="bg-stone-200 border-b border-stone-300 p-2 flex items-center gap-4 shrink-0 font-sans text-xs flex-col sm:flex-row">
           <div className="flex w-full sm:w-auto items-center gap-2 min-w-[200px]">
             <span className="text-stone-500 font-medium inline-block w-12 text-right">Kellele:</span>
             <span className="bg-white px-2 py-1 rounded border border-stone-300 flex-1 truncate">{bookingData.name.toLowerCase().replace(' ', '.')}@email.ee</span>
           </div>
           <div className="flex w-full sm:w-auto items-center gap-2 flex-1">
             <span className="text-stone-500 font-medium inline-block w-12 text-right">Teema:</span>
             <span className="bg-white px-2 py-1 rounded border border-stone-300 truncate font-semibold w-full">Broneeringu Kinnitus - Carine Salong</span>
           </div>
        </div>

        {/* Iframe content */}
        <div className="flex-1 bg-white overflow-auto relative p-4 sm:p-8">
           <div 
             className="w-full max-w-[600px] mx-auto shadow-[0_0_15px_rgba(0,0,0,0.05)]"
             dangerouslySetInnerHTML={{ __html: htmlContent }} 
           />
        </div>
      </div>
    </div>
  );
}
