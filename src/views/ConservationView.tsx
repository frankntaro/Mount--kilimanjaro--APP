import React from 'react';
import { Heart, ShieldCheck, Award, Trees, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import { IMAGES } from '../data/images';
import { useTranslation } from '../i18n/useTranslation';

export const ConservationView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-2xs min-h-[36px]"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>{t.common.back}</span>
          </button>
        </div>

        {/* Banner */}
        <div className="bg-emerald-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl border border-emerald-900">
          <img
            src={IMAGES.conservationGroup}
            alt="Conservation & Porter Welfare"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest bg-emerald-900/80 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-700 inline-block">
              {t.conservation.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight leading-tight">
              {t.conservation.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 font-normal leading-relaxed">
              {t.conservation.intro}
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-rose-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase leading-snug">
              {t.conservation.kpapTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.conservation.kpapDesc}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Trees className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase leading-snug">
              {t.conservation.leaveNoTraceTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.conservation.leaveNoTraceDesc}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase leading-snug">
              {t.conservation.localOwnershipTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.conservation.localOwnershipDesc}
            </p>
          </div>

          <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-2.5 sm:space-y-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-outfit uppercase leading-snug">
              {t.conservation.treePlantingTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.conservation.treePlantingDesc}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
