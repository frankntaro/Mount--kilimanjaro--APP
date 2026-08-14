import React from 'react';
import { Route } from '../types';
import { KILIMANJARO_ROUTES } from '../data/kilimanjaroData';
import { Clock, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface PopularRoutesProps {
  onSelectRoute: (route: Route) => void;
  onViewAllRoutes: () => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({
  onSelectRoute,
  onViewAllRoutes
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-widest uppercase block mb-1">
              {t.popularRoutes.eyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-outfit uppercase">
              {t.popularRoutes.popularRoutes}
            </h2>
          </div>

          <button
            onClick={onViewAllRoutes}
            id="view-all-routes-link-btn"
            className="group flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-emerald-800 hover:text-emerald-900 uppercase tracking-wide transition-colors min-h-[36px]"
          >
            <span>{t.popularRoutes.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Routes Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-6">
            {KILIMANJARO_ROUTES.map((route) => (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route)}
                id={`route-card-${route.id}`}
                className="group cursor-pointer bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-800 flex flex-col justify-between transform hover:-translate-y-1"
              >
                {/* Card Header Image with Badge */}
                <div className="relative h-40 sm:h-44 xl:h-48 overflow-hidden">
                  <img
                    src={route.heroImage}
                    alt={route.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge Top Left */}
                  {route.badgeText && (
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-emerald-700 text-white text-[8.5px] sm:text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">
                      {route.badgeText}
                    </span>
                  )}

                  {/* Price Tag Bottom Right */}
                  <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-slate-950/85 backdrop-blur-md text-emerald-300 font-extrabold text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-slate-700">
                    {t.popularRoutes.fromPrice}{route.priceUSD}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 sm:p-4 xl:p-5 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-sm sm:text-base xl:text-lg font-black text-white group-hover:text-emerald-400 transition-colors uppercase font-outfit tracking-wide leading-snug">
                      {route.name}
                    </h3>

                    {/* Metadata Badges: Duration & Difficulty */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-300 mt-1.5 sm:mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{route.days} {t.common.days}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{route.difficulty}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {route.shortDescription}
                    </p>
                  </div>

                  {/* Success Rate Footer */}
                  <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium text-[10.5px] sm:text-xs">{t.popularRoutes.summitSuccess}</span>
                    <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{route.successRate}%</span>
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
