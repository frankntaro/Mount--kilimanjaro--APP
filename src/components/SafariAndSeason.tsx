import React from 'react';
import { SAFARI_PACKAGES, TESTIMONIALS } from '../data/kilimanjaroData';
import { IMAGES } from '../data/images';
import { ArrowRight, Star, Quote, CheckCircle2, UserCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface SafariAndSeasonProps {
  onExploreSafaris: () => void;
  onClimbingSeasonInfo: () => void;
  onViewAllReviews: () => void;
}

export const SafariAndSeason: React.FC<SafariAndSeasonProps> = ({
  onExploreSafaris,
  onClimbingSeasonInfo,
  onViewAllReviews
}) => {
  const { t } = useTranslation();
  const featuredTestimonial = TESTIMONIALS[0];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 xl:gap-8 items-stretch">
          
          {/* Left Column: Safari & Tours + Climbing Season cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 xl:gap-6">
            
            {/* Card 1: Safari & Tours */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 xl:p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 mb-1.5 sm:mb-2">
                  <span className="p-1 sm:p-1.5 bg-emerald-100 rounded-md text-emerald-800 font-bold text-[9.5px] sm:text-xs uppercase">
                    {t.safariAndSeason.safariBadge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg xl:text-xl font-black text-slate-900 font-outfit uppercase mb-1 sm:mb-1.5">
                  {t.safaris.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2.5 sm:mb-3 line-clamp-3">
                  {t.safaris.serengetiDesc}
                </p>
                <button
                  onClick={onExploreSafaris}
                  id="explore-safaris-btn"
                  className="group inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-900 uppercase tracking-wider min-h-[34px]"
                >
                  <span>{t.safariAndSeason.exploreSafaris}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-3 sm:mt-4 h-28 sm:h-32 xl:h-36 rounded-xl overflow-hidden relative">
                <img
                  src={IMAGES.safariElephants}
                  alt="Tanzania Safari Elephants"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Card 2: Climbing Season */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 xl:p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 mb-1.5 sm:mb-2">
                  <span className="p-1 sm:p-1.5 bg-emerald-100 rounded-md text-emerald-800 font-bold text-[9.5px] sm:text-xs uppercase">
                    {t.safariAndSeason.seasonBadge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg xl:text-xl font-black text-slate-900 font-outfit uppercase mb-1 sm:mb-1.5">
                  {t.safariAndSeason.seasonTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2.5 sm:mb-3 line-clamp-3">
                  {t.safariAndSeason.seasonDesc}
                </p>
                <button
                  onClick={onClimbingSeasonInfo}
                  id="learn-more-season-btn"
                  className="group inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 hover:text-emerald-900 uppercase tracking-wider min-h-[34px]"
                >
                  <span>{t.safariAndSeason.learnMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-3 sm:mt-4 h-28 sm:h-32 xl:h-36 rounded-xl overflow-hidden relative">
                <img
                  src={IMAGES.climbingSeason}
                  alt="Kilimanjaro Snowy Peak"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* Right Column: WHAT OUR CLIMBERS SAY */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 xl:p-7 shadow-sm border border-slate-200 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-base sm:text-lg xl:text-xl font-black text-slate-900 font-outfit uppercase tracking-wide">
                  {t.safariAndSeason.climbersSayTitle}
                </h3>
                <button
                  onClick={onViewAllReviews}
                  id="view-all-reviews-btn"
                  className="text-[11px] sm:text-xs font-extrabold text-emerald-800 hover:text-emerald-900 uppercase flex items-center gap-1 min-h-[34px]"
                >
                  <span>{t.safariAndSeason.viewAllReviews}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quote Card */}
              <div className="bg-emerald-50/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 xl:p-5 border border-emerald-100 relative">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300 absolute top-2.5 right-2.5 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed relative z-10">
                  "{featuredTestimonial.quote}"
                </p>

                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold text-slate-900">
                    — {featuredTestimonial.author}, {featuredTestimonial.country}
                  </span>
                </div>
              </div>
            </div>

            {/* TripAdvisor Rating & Avatar Stack */}
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  oo
                </div>
                <div>
                  <span className="block text-xs font-black text-slate-900">{t.safariAndSeason.tripadvisor}</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold">{t.safariAndSeason.tripadvisorRating}</span>
                </div>
              </div>

              {/* Climber Avatars Stack */}
              <div className="flex items-center -space-x-2">
                {TESTIMONIALS.map((test) => (
                  <img
                    key={test.id}
                    src={test.avatar}
                    alt={test.author}
                    className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full border-2 border-white object-cover shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full bg-emerald-800 text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center border-2 border-white">
                  +
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
