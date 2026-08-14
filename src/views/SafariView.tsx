import React from 'react';
import { SAFARI_PACKAGES } from '../data/kilimanjaroData';
import { IMAGES } from '../data/images';
import { CheckCircle2, ArrowRight, Compass, ShieldCheck, Sun, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

import { SafariPackage } from '../types';

interface SafariViewProps {
  packages?: SafariPackage[];
  onBookSafari: (safariId: string) => void;
}

export const SafariView: React.FC<SafariViewProps> = ({ packages, onBookSafari }) => {
  const { t } = useTranslation();
  const safariList = packages && packages.length > 0 ? packages : SAFARI_PACKAGES;
  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-2xs min-h-[36px]"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-amber-700" />
            <span>{t.common.back}</span>
          </button>
        </div>

        {/* Banner */}
        <div className="bg-amber-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl border border-amber-900">
          <img
            src={IMAGES.safariElephants}
            alt="Safari Wildlife"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-900/80 px-2.5 sm:px-3 py-1 rounded-full border border-amber-700 inline-block">
              {t.safariView.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight leading-tight">
              {t.safaris.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-amber-100 font-normal leading-relaxed">
              {t.safariView.subtitle}
            </p>
          </div>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {safariList.map((safari) => (
            <div
              key={safari.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-56">
                  <img
                    src={safari.image}
                    alt={safari.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-slate-950/85 backdrop-blur-md text-amber-300 font-black text-xs px-2.5 sm:px-3 py-1 rounded-lg border border-slate-700">
                    {safari.days} {t.common.days} / ${safari.priceUSD}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase leading-snug">
                    {safari.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {safari.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.safariView.keyHighlights}</span>
                    {safari.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 pt-0">
                <button
                  onClick={() => onBookSafari(safari.id)}
                  className="w-full py-3 sm:py-3.5 bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-black text-xs uppercase rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>{t.safariView.bookThisSafari}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
