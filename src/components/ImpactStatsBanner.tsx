import React from 'react';
import { ShieldCheck, Heart, Award, Users, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface ImpactStatsBannerProps {
  onLearnImpact: () => void;
}

export const ImpactStatsBanner: React.FC<ImpactStatsBannerProps> = ({ onLearnImpact }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-emerald-900 text-white py-8 sm:py-12 border-y border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Side: WE CARE FOR KILIMANJARO */}
          <div className="text-left space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-emerald-800 rounded-md text-emerald-200 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
              <span>{t.impact.badge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-outfit uppercase tracking-tight leading-tight">
              {t.conservation.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-normal leading-relaxed">
              {t.impact.description}
            </p>
            <button
              onClick={onLearnImpact}
              id="learn-impact-btn"
              className="pt-1 sm:pt-2 group inline-flex items-center gap-2 text-xs font-black text-white hover:text-emerald-200 uppercase tracking-widest min-h-[36px]"
            >
              <span>{t.impact.learnImpact}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Impact Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto text-center divide-x-0 sm:divide-x divide-emerald-800/60">
            
            <div className="p-2 sm:px-3 rounded-xl bg-emerald-950/40 sm:bg-transparent">
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-outfit">
                {t.impact.yearsValue}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-wider block mt-0.5">
                {t.impact.yearsExperience}
              </span>
            </div>

            <div className="p-2 sm:px-3 rounded-xl bg-emerald-950/40 sm:bg-transparent">
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-outfit">
                {t.impact.climbersValue}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-wider block mt-0.5">
                {t.impact.happyClimbers}
              </span>
            </div>

            <div className="p-2 sm:px-3 rounded-xl bg-emerald-950/40 sm:bg-transparent">
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-outfit">
                {t.impact.countriesValue}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-wider block mt-0.5">
                {t.impact.countriesServed}
              </span>
            </div>

            <div className="p-2 sm:px-3 rounded-xl bg-emerald-950/40 sm:bg-transparent">
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 font-outfit">
                {t.impact.localValue}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-200 uppercase tracking-wider block mt-0.5">
                {t.impact.localCompany}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
