import React, { useState } from 'react';
import { PlanAdventureWidget } from './PlanAdventureWidget';
import { Compass, Play, Mountain, Calendar, MapPin, Clock, Award, X } from 'lucide-react';
import { IMAGES } from '../data/images';
import { useTranslation } from '../i18n/useTranslation';

interface HeroSectionProps {
  onExploreRoutes: () => void;
  onCheckAvailability: (routeId: string, date: string, climbersCount: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreRoutes,
  onCheckAvailability
}) => {
  const { t } = useTranslation();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-[auto] lg:min-h-[75vh] xl:min-h-[82vh] flex flex-col justify-between overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroBg}
          alt="Mount Kilimanjaro Peak Savannah"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-10 xl:py-14 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Hero Typography & Action Buttons */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 xl:space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Fluid Bold Headline */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tight leading-[1.02] sm:leading-[0.96] font-outfit uppercase drop-shadow-lg">
                <span className="block text-white">{t.hero.climbHigher}</span>
                <span className="block text-emerald-400">{t.hero.dreamBigger}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
              {t.hero.mainSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 xl:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onExploreRoutes}
                id="hero-explore-routes-btn"
                className="flex items-center justify-center gap-2 px-5 xl:px-6 py-2.5 xl:py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-emerald-900/50 transition-all duration-200 active:scale-95 min-h-[42px] xl:min-h-[46px]"
              >
                <Compass className="w-4 h-4 xl:w-5 xl:h-5 text-emerald-200" />
                <span>{t.hero.exploreRoutes}</span>
              </button>

              <a
                href="https://www.youtube.com/@FRANKJOSEHAT"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-watch-video-btn"
                className="flex items-center justify-center gap-2 px-5 xl:px-6 py-2.5 xl:py-3.5 bg-white/90 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 backdrop-blur-sm active:scale-95 min-h-[42px] xl:min-h-[46px] group"
                title="Watch expedition videos on YouTube"
              >
                <div className="w-5 h-5 xl:w-6 xl:h-6 rounded-full bg-[#FF0000] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 xl:w-3.5 xl:h-3.5 ml-0.5 fill-current" />
                </div>
                <span>{t.hero.watchVideo}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Floating Plan Your Adventure Form Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <PlanAdventureWidget onCheckAvailability={onCheckAvailability} />
          </div>

        </div>
      </div>

      {/* Quick Spec Badges Bar under Hero */}
      <div className="relative z-10 bg-slate-950/85 border-t border-slate-800/80 backdrop-blur-md py-2.5 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 xl:gap-4 text-center divide-slate-800/60">
            
            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-slate-900/40 sm:bg-transparent">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base lg:text-lg">
                <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
                <span>{t.hero.peakElevation}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.hero.aboveSeaLevel}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-slate-900/40 sm:bg-transparent">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base lg:text-lg">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
                <span>{t.hero.climbDuration}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.hero.typicalClimb}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-slate-900/40 sm:bg-transparent">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base lg:text-lg">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
                <span>{t.hero.mainRoutes}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.hero.toTheSummit}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-slate-900/40 sm:bg-transparent">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base lg:text-lg">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
                <span>{t.hero.allYearRound}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.hero.climbingSeason}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-slate-900/40 sm:bg-transparent col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base lg:text-lg">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
                <span>{t.hero.successRate}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] xl:text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t.hero.withProperPreparation}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mb-3 sm:mb-4 flex items-center gap-2 pr-8">
              <Play className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="truncate">{t.hero.videoModalTitle}</span>
            </h3>
            <a
              href="https://www.youtube.com/@FRANKJOSEHAT"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center relative group block cursor-pointer"
              title="Open YouTube Channel in new tab"
            >
              <img
                src={IMAGES.heroBg}
                alt="Expedition Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                </div>
                <p className="mt-3 sm:mt-4 text-white font-bold text-base sm:text-lg">{t.hero.videoModalCta}</p>
                <p className="text-xs text-slate-300">{t.hero.videoModalSub} • Click to open @FRANKJOSEHAT</p>
              </div>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
