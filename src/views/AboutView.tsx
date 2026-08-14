import React from 'react';
import { IMAGES } from '../data/images';
import { Mountain, Layers, CloudSun, ShieldCheck, Award, Trees, Thermometer, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface AboutViewProps {
  onPlanClimb: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onPlanClimb }) => {
  const { t } = useTranslation();
  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-left">
        
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

        {/* Header Banner */}
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <img
            src={IMAGES.heroBg}
            alt="Kilimanjaro Summit"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-800 inline-block">
              {t.about.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight leading-tight">
              {t.hero.mainTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
              {t.about.intro}
            </p>
          </div>
        </div>

        {/* 5 Climate Zones Section */}
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto px-2">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">{t.about.ecoEyebrow}</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit uppercase">
              {t.about.ecoTitle}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {t.about.ecoSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase">{t.about.zone1Title}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">{t.about.zone1Range}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.about.zone1Desc}</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase">{t.about.zone2Title}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">{t.about.zone2Range}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.about.zone2Desc}</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase">{t.about.zone3Title}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">{t.about.zone3Range}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.about.zone3Desc}</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                4
              </span>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase">{t.about.zone4Title}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">{t.about.zone4Range}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.about.zone4Desc}</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 col-span-1 sm:col-span-2 md:col-span-1 xl:col-span-1">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                5
              </span>
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase">{t.about.zone5Title}</h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">{t.about.zone5Range}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.about.zone5Desc}</p>
            </div>

          </div>
        </div>

        {/* Mountain Geology & Volcanoes */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">{t.about.geologyEyebrow}</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit uppercase leading-tight">
              {t.about.geologyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.about.geologyIntro}
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-emerald-800 shrink-0">• {t.about.kiboLabel}</span>
                <span>{t.about.kiboDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-emerald-800 shrink-0">• {t.about.mawenziLabel}</span>
                <span>{t.about.mawenziDesc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-emerald-800 shrink-0">• {t.about.shiraLabel}</span>
                <span>{t.about.shiraDesc}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md h-52 sm:h-64 border border-slate-200">
            <img
              src={IMAGES.lemosho}
              alt="Mawenzi and Kibo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-black uppercase font-outfit leading-tight">{t.about.ctaTitle}</h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            {t.about.ctaDesc}
          </p>
          <button
            onClick={onPlanClimb}
            className="px-6 py-3 bg-white text-emerald-900 font-extrabold text-xs uppercase rounded-xl shadow-md hover:bg-emerald-50 transition-colors min-h-[40px]"
          >
            {t.about.ctaButton}
          </button>
        </div>

      </div>
    </div>
  );
};
