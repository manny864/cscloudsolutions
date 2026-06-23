'use client';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export function FinOpsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('finopsPopup');
  const locale = useLocale();
  const finopsUrl = locale === 'es' ? 'https://finops.cscloudsolutions.com.ar/es/demo' : 'https://finops.cscloudsolutions.com.ar/en/demo';

  useEffect(() => {
    // Show popup after 7 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 border border-white/20">
        
        {/* Diagonal Watermark (Overlay) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl flex items-center justify-center z-[60]">
           <div className="transform -rotate-[45deg] md:-rotate-[35deg] text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-black text-[#0054A6] opacity-15 whitespace-nowrap select-none">
             PROXIMAMENTE
           </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[70] p-2 text-gray-500 hover:text-gray-800 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-10 mt-6 sm:mt-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-heading">
              {t('title')}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Essential */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8 flex flex-col relative overflow-hidden">
               <h3 className="text-lg font-medium text-gray-900 mb-4">{t('essential.name')}</h3>
               <p className="text-sm text-gray-500 mb-6">{t('essential.desc')}</p>
               <ul className="space-y-4 text-sm text-gray-600">
                  {(t.raw('essential.features') as string[]).map((f, i) => (
                    <li key={i} className="flex items-start font-medium text-gray-900">
                      <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className={f.startsWith('Todo lo de') || f.startsWith('Everything in') ? 'font-bold' : ''}>{f}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Professional */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8 flex flex-col relative overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-gray-900">{t('pro.name')}</h3>
                 <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">{t('pro.badge')}</span>
               </div>
               <p className="text-sm text-gray-500 mb-6">{t('pro.desc')}</p>
               <ul className="space-y-4 text-sm text-gray-600">
                  {(t.raw('pro.features') as string[]).map((f, i) => (
                    <li key={i} className="flex items-start font-medium text-gray-900">
                      <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className={f.startsWith('Todo lo de') || f.startsWith('Everything in') ? 'font-bold' : ''}>{f}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Business */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-[#0054A6] p-5 sm:p-8 flex flex-col relative overflow-hidden transform lg:-translate-y-4">
               <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                 <span className="bg-[#0054A6] text-white text-xs font-bold px-3 py-1 rounded-b-lg uppercase tracking-wide">{t('business.badge')}</span>
               </div>
               <h3 className="text-xl font-bold text-[#0054A6] mb-4 mt-2">{t('business.name')}</h3>
               <p className="text-sm text-gray-500 mb-6">{t('business.desc')}</p>
               <ul className="space-y-4 text-sm text-gray-600">
                  {(t.raw('business.features') as string[]).map((f, i) => (
                    <li key={i} className="flex items-start font-medium text-gray-900">
                      <svg className="w-5 h-5 text-[#0054A6] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className={f.startsWith('Todo lo de') || f.startsWith('Everything in') ? 'font-bold' : ''}>{f}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700 p-5 sm:p-8 flex flex-col relative overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-medium text-white">{t('enterprise.name')}</h3>
                 <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2 py-1 rounded">{t('enterprise.badge')}</span>
               </div>
               <p className="text-sm text-gray-300 mb-6">{t('enterprise.desc')}</p>
               <ul className="space-y-4 text-sm text-gray-300">
                  {(t.raw('enterprise.features') as string[]).map((f, i) => (
                    <li key={i} className="flex items-start font-medium text-white">
                      <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className={f.startsWith('Todo lo de') || f.startsWith('Everything in') ? 'font-bold' : ''}>{f}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 text-center pb-4 sm:pb-0">
             <a href={finopsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-sm sm:text-base font-bold rounded-xl text-white bg-[#0054A6] hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl">
               {t('popupCta')}
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}
